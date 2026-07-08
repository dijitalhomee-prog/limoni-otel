import os
import json
import urllib.request
import sys
import time

# Load RAILWAY_TOKEN from master.env first
RAILWAY_TOKEN = None
env_path = "/Users/egemengunes/Desktop/Antigravity/_knowledge/credentials/master.env"
if os.path.exists(env_path):
    with open(env_path) as f:
        for line in f:
            if line.strip().startswith("RAILWAY_TOKEN="):
                RAILWAY_TOKEN = line.split("=", 1)[1].strip().strip('"').strip("'")
                break

if not RAILWAY_TOKEN:
    RAILWAY_TOKEN = os.environ.get("RAILWAY_TOKEN")

if not RAILWAY_TOKEN:
    print("❌ HATA: master.env veya environment variables içinde RAILWAY_TOKEN bulunamadı.")
    sys.exit(1)

print(f"🔑 Kullanılan Token (Maskeli): {RAILWAY_TOKEN[:4]}...{RAILWAY_TOKEN[-4:] if len(RAILWAY_TOKEN) > 4 else ''}")

HEADERS = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {RAILWAY_TOKEN}",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}
URL = "https://backboard.railway.com/graphql/v2"

# Git repository is expected to be named: dijitalhomee-prog/limoni-otel
REPO = "dijitalhomee-prog/limoni-otel"

def run_query(query, variables=None):
    payload = {"query": query}
    if variables:
        payload["variables"] = variables
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(URL, data=data, headers=HEADERS)
    try:
        with urllib.request.urlopen(req) as response:
            resp_data = json.loads(response.read().decode())
            return resp_data
    except Exception as e:
        print("Error:", e)
        if hasattr(e, 'read'):
            try:
                error_body = e.read().decode('utf-8')
                print("Response Body:", error_body)
            except Exception as read_err:
                print("Could not read response body:", read_err)
        return {}

STATE_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'railway_state.json')

# 1. Check if we need to clean up the old project to avoid service conflicts
if os.path.exists(STATE_FILE):
    try:
        with open(STATE_FILE, 'r') as sf:
            state = json.load(sf)
            old_project_id = state.get('project_id')
            if old_project_id:
                print(f"🧹 Eski Railway Projesi temizleniyor (ID: {old_project_id})...")
                q_delete = f'mutation {{ projectDelete(id: "{old_project_id}") }}'
                res_d = run_query(q_delete)
                if 'errors' in res_d:
                    print("   - Eski proje temizlenirken uyarı:", res_d['errors'][0].get('message'))
                else:
                    print("   ✅ Eski proje silindi.")
    except Exception as e:
        print("Warning cleaning up state:", e)
    
    # Remove old state file
    try:
        os.remove(STATE_FILE)
    except:
        pass

# 2. Get Workspace ID
print("\n1. Workspace tespiti yapılıyor...")
q_workspaces = 'query { me { workspaces { id name } } }'
res_w = run_query(q_workspaces)
workspace_id = None
if res_w.get('data', {}).get('me', {}).get('workspaces'):
    workspaces = res_w['data']['me']['workspaces']
    if workspaces:
        workspace_id = workspaces[0]['id']
        workspace_name = workspaces[0]['name']
        print(f"ℹ️ Workspace: {workspace_name} (ID: {workspace_id})")

# 3. Create Project
print("\n2. Yeni Railway Projesi oluşturuluyor...")
if workspace_id:
    q_project = f'mutation {{ projectCreate(input: {{ name: "Limoni Otel", description: "Limoni Otel Alaçatı & Köyiçi Web Sitesi", workspaceId: "{workspace_id}" }}) {{ id environments {{ edges {{ node {{ id }} }} }} }} }}'
else:
    q_project = 'mutation { projectCreate(input: { name: "Limoni Otel", description: "Limoni Otel Alaçatı & Köyiçi Web Sitesi" }) { id environments { edges { node { id } } } } }'

res_p = run_query(q_project)
if 'errors' in res_p or not res_p.get('data'):
    print("❌ Proje oluşturulamadı:", res_p)
    sys.exit(1)

project_id = res_p['data']['projectCreate']['id']
env_id = res_p['data']['projectCreate']['environments']['edges'][0]['node']['id']
print(f"✅ Proje Oluşturuldu. ID: {project_id}")

# 4. Define our three services and their configurations
services_config = {
    "web-portal": {
        "branch": "portal",
        "domains": ["limoniotel.com", "www.limoniotel.com"]
    },
    "web-alacati": {
        "branch": "alacati",
        "domains": ["limoniotelalacati.com", "www.limoniotelalacati.com"]
    },
    "web-koyici": {
        "branch": "koyici",
        "domains": ["limoniotelkoyici.com", "www.limoniotelkoyici.com"]
    }
}

state_services = {}

# 5. Create Services, Variables, and Custom Domains
print("\n3. Servisler oluşturuluyor ve yapılandırılıyor (2 Custom Domain sınırı aşılacak)...")
for s_name, config in services_config.items():
    print(f"\n📦 Servis: {s_name} oluşturuluyor...")
    
    # A. Create Service
    q_service = f'mutation {{ serviceCreate(input: {{ projectId: "{project_id}", name: "{s_name}", source: {{ repo: "{REPO}" }}, branch: "main" }}) {{ id }} }}'
    res_s = run_query(q_service)
    if 'errors' in res_s or not res_s.get('data'):
        print(f"❌ '{s_name}' servisi oluşturulurken hata:", res_s)
        continue
        
    s_id = res_s['data']['serviceCreate']['id']
    state_services[s_name] = s_id
    print(f"   ✅ Servis oluşturuldu. ID: {s_id}")
    
    # B. Set BRANCH variable
    print(f"   ⚙️ 'BRANCH={config['branch']}' ortam değişkeni tanımlanıyor...")
    var_mutation = """
    mutation($projectId: String!, $environmentId: String!, $serviceId: String!, $name: String!, $value: String!) {
      variableUpsert(input: {
        projectId: $projectId
        environmentId: $environmentId
        serviceId: $serviceId
        name: $name
        value: $value
      })
    }
    """
    res_v = run_query(var_mutation, {
        "projectId": project_id,
        "environmentId": env_id,
        "serviceId": s_id,
        "name": "BRANCH",
        "value": config["branch"]
    })
    
    if 'errors' in res_v:
        print("     ⚠️ Ortam değişkeni kaydedilemedi:", res_v['errors'][0].get('message'))
    else:
        print("     ✅ Ortam değişkeni kaydedildi.")
        
    # C. Bind Custom Domains (Maximum 2 domains per service, which fits perfectly!)
    for domain in config["domains"]:
        print(f"   🌐 Domain ekleniyor: {domain}...")
        q_domain = f'mutation {{ customDomainCreate(input: {{ projectId: "{project_id}", environmentId: "{env_id}", serviceId: "{s_id}", domain: "{domain}" }}) {{ id domain }} }}'
        res_d = run_query(q_domain)
        if 'errors' in res_d:
            print(f"     ⚠️ Domain eklenirken uyarı: {res_d['errors'][0].get('message')}")
        else:
            print(f"     ✅ {domain} başarıyla eklendi.")

# Save state
try:
    with open(STATE_FILE, 'w') as sf:
        json.dump({
            'project_id': project_id,
            'environment_id': env_id,
            'services': state_services
        }, sf, indent=2)
except Exception as e:
    print("Error saving state file:", e)

print("\n🚀 --- YAYINA ALMA (DEPLOYMENT) BAŞLATILDI ---")
print("Project ID:", project_id)
print("\n👉 Sonraki Adım: Squarespace Domains panelinde DNS CNAME ve A kayıtlarını Railway yönlendirmelerine göre ayarlayın.")

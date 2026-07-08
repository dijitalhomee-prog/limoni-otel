/**
 * Limoni Otel - Interactivity and Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Navbar Scroll Effect ---
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once at start
    handleScroll();
  }

  // --- Mobile Menu Toggle ---
  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('open');
      
      // Animate the hamburger button spans
      const spans = navToggle.querySelectorAll('span');
      if (mobileMenu.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !navToggle.contains(e.target)) {
        mobileMenu.classList.remove('open');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // --- Scroll Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once animated, stop observing
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // --- Lightbox Image Popup with Slideshow Gallery ---
  const ROOM_GALLERIES = {
    'kahvalti-gallery': [
      'images/alacati/kahvaltı/kapak.jpg',
      'images/alacati/kahvaltı/0CD172B9-D91C-4109-AF45-E30BE1C700B0.jpg',
      'images/alacati/kahvaltı/24BFA896-6A0A-4F14-9B67-AA0BDDC8072B.jpg',
      'images/alacati/kahvaltı/300990C1-3657-4B45-91F8-4D46DDBB0583.jpg',
      'images/alacati/kahvaltı/660A1E7D-BDCF-43B2-A7BE-01ABBE230956.jpg',
      'images/alacati/kahvaltı/6D7F84F3-7CF1-4049-9FD6-55691985B348.jpg'
    ],
    'otel_genel': [
      'images/alacati/otel_genel/kapak.jpg',
      'images/alacati/otel_genel/3412B968-AC45-4C6A-89A7-7106B10802AC.jpg',
      'images/alacati/otel_genel/3EA5E9E1-CA73-445D-BE24-765568408C06.jpg',
      'images/alacati/otel_genel/B4EB34F1-53F9-4F2B-B529-204C6DC8EA12.jpg',
      'images/alacati/otel_genel/C0278338-8CE9-400A-A9C2-6BD2A589E7D9.jpg',
      'images/alacati/otel_genel/C5358A21-CBDD-4493-8BDB-96CE37F2BFB0.jpg',
      'images/alacati/otel_genel/C66FCB3B-F225-409D-9813-F93916DEAA6F.jpg',
      'images/alacati/otel_genel/E3A27B9C-9281-4F85-8636-77955CA8E606.jpg',
      'images/alacati/otel_genel/EA61E8BD-58B8-44A7-80DD-A4D9CC2A1ABA.jpg',
      'images/alacati/otel_genel/FB34DDEE-129E-478D-9356-72131DBFF396.jpg',
      'images/alacati/otel_genel/WhatsApp Image 2026-07-03 at 19.17.32.jpeg',
      'images/alacati/otel_genel/WhatsApp Image 2026-07-03 at 19.17.33.jpeg',
      'images/alacati/otel_genel/WhatsApp Image 2026-07-03 at 19.17.41.jpeg',
      'images/alacati/otel_genel/WhatsApp Image 2026-07-03 at 19.17.43.jpeg',
      'images/alacati/otel_genel/otel_genel_01.jpg',
      'images/alacati/otel_genel/otel_genel_02.jpg',
      'images/alacati/otel_genel/otel_genel_03.jpg',
      'images/alacati/otel_genel/otel_genel_04.jpg',
      'images/alacati/otel_genel/otel_genel_05.jpg',
      'images/alacati/otel_genel/otel_genel_06.jpg'
    ],
    'oda_101': [
      'images/alacati/oda_101/kapak.jpg',
      'images/alacati/oda_101/2345488E-3543-461A-AA92-2E199A986C2A.jpg',
      'images/alacati/oda_101/720DBBC4-7AF6-47A2-9F6E-21F08FAE9D8B.jpg',
      'images/alacati/oda_101/72A70472-1F7E-4AE0-A1E4-A0AC3DC2A52D.jpg',
      'images/alacati/oda_101/8CE1B06D-BB52-4C43-8AFA-BD0E04428A2D.jpg',
      'images/alacati/oda_101/91760DF1-E7AF-4B5B-94DC-0EFBB545BD94.jpg',
      'images/alacati/oda_101/A9FBF5B1-5CD0-40E1-89F0-F297D3214676.jpg',
      'images/alacati/oda_101/BECA4014-4656-43F1-8A82-153C1B078AE2.jpg',
      'images/alacati/oda_101/CF9AD396-7985-4662-A85B-8B89D44F4CCC.jpg',
      'images/alacati/oda_101/D90183BE-C7E8-4ABE-846F-836CFD49A35A.jpg',
      'images/alacati/oda_101/F1249AB0-0C40-4A9B-B231-7B9172C93DB3.jpg',
      'images/alacati/oda_101/FFD90072-9343-466A-958E-B9E10A7E5BD5.jpg',
      'images/alacati/oda_101/IMG_8456.jpg',
      'images/alacati/oda_101/IMG_8460.jpg'
    ],
    'oda_102': [
      'images/alacati/oda_102/kapak.jpg',
      'images/alacati/oda_102/IMG_8453.jpg',
      'images/alacati/oda_102/IMG_8454.jpg',
      'images/alacati/oda_102/IMG_8455.jpg',
      'images/alacati/oda_102/IMG_8456.jpg',
      'images/alacati/oda_102/IMG_8457.jpg',
      'images/alacati/oda_102/IMG_8458.jpg',
      'images/alacati/oda_102/IMG_8459.jpg',
      'images/alacati/oda_102/IMG_8460.jpg',
      'images/alacati/oda_102/IMG_8462.jpg'
    ],
    'oda_103': [
      'images/alacati/oda_103/kapak.jpg',
      'images/alacati/oda_103/03320FFB-4844-44CF-813D-A2841A440E5C.jpg',
      'images/alacati/oda_103/08A0ECE9-0A72-49B8-8191-833F8C1D31BE.jpg',
      'images/alacati/oda_103/2B7AF3E2-8147-49F1-AAF6-01E58B2F1122.jpg',
      'images/alacati/oda_103/34057853-BC6D-4949-8A50-4343AA8EC64E.jpg',
      'images/alacati/oda_103/3CF8AF77-FDCC-476B-8A1F-A3AA12E86F58.jpg',
      'images/alacati/oda_103/43D62287-095C-475A-A85A-5926316FD82B.jpg',
      'images/alacati/oda_103/4918A35B-0A66-47E7-85AA-4FB897B269B7.jpg',
      'images/alacati/oda_103/54A420D6-8942-4CA2-96BB-234848B21533.jpg',
      'images/alacati/oda_103/5A2580CD-C7D4-4CBD-ABCF-0709DE623324.jpg',
      'images/alacati/oda_103/8AEC2BBF-1FF6-49C7-BB31-E942EC07990C.jpg',
      'images/alacati/oda_103/9C7092D0-5AE1-4536-8946-20C272F6F023.jpg',
      'images/alacati/oda_103/B4168165-9DDB-4016-AEAB-FE6D9B2DF626.jpg',
      'images/alacati/oda_103/B6DBD901-50F9-40FD-88F5-617827ED7F41.jpg',
      'images/alacati/oda_103/BC359CD9-EEAC-42A1-B4FD-F76626CACB20.jpg',
      'images/alacati/oda_103/C9A49901-E3BC-46FF-BBF5-968C9ADF3D69.jpg',
      'images/alacati/oda_103/CD6D2E58-82A4-4D45-BB0D-8FE033B4DF71.jpg',
      'images/alacati/oda_103/D3E9B4D1-D83E-4496-82AC-9D86269F71DD.jpg',
      'images/alacati/oda_103/D4C6FDA1-56DC-4C84-99C6-766B8D28AF65.jpg',
      'images/alacati/oda_103/E09EA3F7-252E-4B4E-80E9-4E106FEDA247.jpg',
      'images/alacati/oda_103/EBC2538C-A3C2-4B89-85E7-E9399F53C827.jpg',
      'images/alacati/oda_103/FB4E814C-43DC-470A-85FE-6DC8B5A59DA7.jpg',
      'images/alacati/oda_103/FC5D2210-8CA0-49D3-B801-2A66560CB14B.jpg'
    ],
    'oda_201': [
      'images/alacati/oda_201/kapak.jpg',
      'images/alacati/oda_201/17491B6F-6B5B-4FEE-A5D1-A4C63317E773.jpg',
      'images/alacati/oda_201/893E1849-4E76-45AF-AC59-29D44973714F.jpg',
      'images/alacati/oda_201/9230DBF7-4AAC-432F-83C3-88DFC535ABCC.jpg',
      'images/alacati/oda_201/A7859E99-11C5-4FDE-AD5A-CE8F59A884BF.jpg',
      'images/alacati/oda_201/AB3B450F-C06C-49AF-B2AB-FF53B23CB9A9.jpg',
      'images/alacati/oda_201/AFF598B5-CDC1-4198-9273-3E5671F75A9B.jpg',
      'images/alacati/oda_201/BABD226A-3DF0-4F6D-AD65-0F0FE80C875E.jpg',
      'images/alacati/oda_201/E4BBC772-C02E-4F76-B348-517DF63A6B77.jpg'
    ],
    'oda_202': [
      'images/alacati/oda_202/kapak.jpg',
      'images/alacati/oda_202/067CAEBC-335C-47B4-A5D8-DAC2E904AFB2.jpg',
      'images/alacati/oda_202/24F40C50-A2AF-4368-91C7-0DE759E31839.jpg',
      'images/alacati/oda_202/692CB737-9115-4BDD-9BD4-C9AAA1002A04.jpg',
      'images/alacati/oda_202/7A01E1F3-C5B2-4251-99E5-0BF57393FB1A.jpg',
      'images/alacati/oda_202/9B358557-1301-48A1-80E7-8D616A495876.jpg',
      'images/alacati/oda_202/CB686612-719E-464F-A6C1-6E98E2F42336.jpg',
      'images/alacati/oda_202/D122430D-8C37-4BA9-919D-DBB0ADE64D85.jpg',
      'images/alacati/oda_202/D7D0FFDC-8E5F-4633-8709-64B00159CB0E.jpg'
    ],
    'oda_203': [
      'images/alacati/oda_203/kapak.jpg',
      'images/alacati/oda_203/15E0F390-D179-4572-85A9-D6F22F81859B.jpg',
      'images/alacati/oda_203/3CF52653-DC52-4E1A-9140-A52B860AC5A9.jpg',
      'images/alacati/oda_203/3DD90B95-BC95-4213-BBFF-FC286BE5BFD9.jpg',
      'images/alacati/oda_203/99B1BCE6-CBA2-47BE-B7D2-E10751D9EC8A.jpg',
      'images/alacati/oda_203/9E46D79C-5B78-4061-810D-A96C35D016DD.jpg',
      'images/alacati/oda_203/B92DB824-85BE-478D-8CDB-8778BCF9B5D1.jpg',
      'images/alacati/oda_203/DDD8CF1B-0ECC-49B0-97B2-2EB868409758.jpg'
    ],
    'koyici_oda_101': [
      'images/koyici/oda_101/kapak.jpg',
      'images/koyici/oda_101/IMG_9538.jpg',
      'images/koyici/oda_101/IMG_9545.jpg',
      'images/koyici/oda_101/IMG_9546.jpg',
      'images/koyici/oda_101/IMG_9547.jpg',
      'images/koyici/oda_101/IMG_9548.jpg',
      'images/koyici/oda_101/IMG_9549.jpg',
      'images/koyici/oda_101/IMG_9550.jpg',
      'images/koyici/oda_101/IMG_9551.jpg',
      'images/koyici/oda_101/IMG_9552.jpg',
      'images/koyici/oda_101/IMG_9553.jpg',
      'images/koyici/oda_101/IMG_9554.jpg',
      'images/koyici/oda_101/IMG_9555.jpg'
    ],
    'koyici_oda_102': [
      'images/koyici/oda_102/kapak.jpg',
      'images/koyici/oda_102/IMG_8079.jpeg',
      'images/koyici/oda_102/IMG_8080.jpeg',
      'images/koyici/oda_102/IMG_8081.jpeg',
      'images/koyici/oda_102/IMG_8082.jpeg',
      'images/koyici/oda_102/IMG_8083.jpeg',
      'images/koyici/oda_102/IMG_8084.jpeg',
      'images/koyici/oda_102/IMG_8085.jpeg',
      'images/koyici/oda_102/IMG_8086.jpeg',
      'images/koyici/oda_102/IMG_8088.jpeg'
    ],
    'koyici_oda_201': [
      'images/koyici/oda_201/kapak.jpg',
      'images/koyici/oda_201/IMG_8066.jpeg',
      'images/koyici/oda_201/IMG_8067.jpeg',
      'images/koyici/oda_201/IMG_8068.jpeg',
      'images/koyici/oda_201/IMG_8069.jpeg',
      'images/koyici/oda_201/IMG_8070.jpeg',
      'images/koyici/oda_201/IMG_8071.jpeg',
      'images/koyici/oda_201/IMG_8072.jpeg',
      'images/koyici/oda_201/IMG_8073.jpeg',
      'images/koyici/oda_201/IMG_8074.jpeg',
      'images/koyici/oda_201/IMG_8075.jpeg',
      'images/koyici/oda_201/IMG_8076.jpeg',
      'images/koyici/oda_201/IMG_8078.jpeg'
    ],
    'koyici_oda_202': [
      'images/koyici/oda_202/kapak.jpg',
      'images/koyici/oda_202/IMG_8036.jpeg',
      'images/koyici/oda_202/IMG_8037.jpeg',
      'images/koyici/oda_202/IMG_8038.jpeg',
      'images/koyici/oda_202/IMG_8039.jpeg',
      'images/koyici/oda_202/IMG_8041.jpeg',
      'images/koyici/oda_202/IMG_8043.jpeg',
      'images/koyici/oda_202/IMG_8044.jpeg',
      'images/koyici/oda_202/IMG_8045.jpeg',
      'images/koyici/oda_202/IMG_8046.jpeg',
      'images/koyici/oda_202/IMG_8047.jpeg',
      'images/koyici/oda_202/IMG_8049.jpeg',
      'images/koyici/oda_202/IMG_8050.jpeg',
      'images/koyici/oda_202/IMG_8051.jpeg',
      'images/koyici/oda_202/kapak.jpeg',
      'images/koyici/oda_202/odfalmgalsfş.jpg'
    ],
    'koyici_oda_203': [
      'images/koyici/oda_203/kapak.jpg',
      'images/koyici/oda_203/IMG_8052.jpeg',
      'images/koyici/oda_203/IMG_8053.jpeg',
      'images/koyici/oda_203/IMG_8054.jpeg',
      'images/koyici/oda_203/IMG_8055.jpeg',
      'images/koyici/oda_203/IMG_8056.jpeg',
      'images/koyici/oda_203/IMG_8057.jpeg',
      'images/koyici/oda_203/IMG_8058.jpeg',
      'images/koyici/oda_203/IMG_8059.jpeg',
      'images/koyici/oda_203/IMG_8060.jpeg',
      'images/koyici/oda_203/IMG_8061.jpeg',
      'images/koyici/oda_203/IMG_8062.jpeg',
      'images/koyici/oda_203/IMG_8063.jpeg',
      'images/koyici/oda_203/IMG_8064.jpeg',
      'images/koyici/oda_203/kapak.png',
      'images/koyici/oda_203/sfkmgksafd.jpg'
    ],
    'koyici_otel_genel': [
      'images/koyici/otel_genel/kapak.jpg',
      'images/koyici/otel_genel/IMG_8089.jpeg',
      'images/koyici/otel_genel/IMG_8091.jpeg',
      'images/koyici/otel_genel/IMG_8096.jpeg',
      'images/koyici/otel_genel/IMG_8106.jpeg',
      'images/koyici/otel_genel/IMG_8107.jpeg',
      'images/koyici/otel_genel/IMG_8111.jpeg',
      'images/koyici/otel_genel/IMG_8112.jpeg',
      'images/koyici/otel_genel/IMG_8116.jpeg'
    ],
    'koyici_kahvalti-gallery': [
      'images/koyici/kahvaltı/kapak.jpg',
      'images/koyici/kahvaltı/IMG_9510.jpg',
      'images/koyici/kahvaltı/IMG_9511.jpg',
      'images/koyici/kahvaltı/IMG_9512.jpg',
      'images/koyici/kahvaltı/IMG_9513.jpg',
      'images/koyici/kahvaltı/IMG_9514.jpg',
      'images/koyici/kahvaltı/IMG_9515.jpg',
      'images/koyici/kahvaltı/IMG_9516.jpg'
    ]
  };

  let currentGallery = [];
  let currentGalleryIndex = 0;

  const zoomableImages = document.querySelectorAll('.ticker-item img, .room-card-img img, .breakfast-slide img');
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <div class="lightbox-close">&times;</div>
    <div class="lightbox-prev">&#10094;</div>
    <div class="lightbox-next">&#10095;</div>
    <div class="lightbox-content">
      <img src="" alt="Limoni Otel Büyük Görsel">
    </div>
    <div class="lightbox-counter"></div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('.lightbox-content img');
  const lightboxClose = lightbox.querySelector('.lightbox-close');
  const lightboxPrev = lightbox.querySelector('.lightbox-prev');
  const lightboxNext = lightbox.querySelector('.lightbox-next');
  const lightboxCounter = lightbox.querySelector('.lightbox-counter');

  const updateLightboxImage = () => {
    if (currentGallery.length > 0) {
      lightboxImg.setAttribute('src', currentGallery[currentGalleryIndex]);
      lightboxCounter.textContent = `${currentGalleryIndex + 1} / ${currentGallery.length}`;
      
      const isMulti = currentGallery.length > 1;
      lightboxPrev.style.display = isMulti ? 'block' : 'none';
      lightboxNext.style.display = isMulti ? 'block' : 'none';
      lightboxCounter.style.display = isMulti ? 'block' : 'none';
    } else {
      lightboxPrev.style.display = 'none';
      lightboxNext.style.display = 'none';
      lightboxCounter.style.display = 'none';
    }
  };

  if (zoomableImages.length > 0) {
    zoomableImages.forEach(img => {
      img.addEventListener('click', () => {
        const roomId = img.getAttribute('data-room-id');
        const src = img.getAttribute('src');
        
        if (roomId && ROOM_GALLERIES[roomId]) {
          currentGallery = ROOM_GALLERIES[roomId];
          const index = currentGallery.indexOf(src);
          currentGalleryIndex = index !== -1 ? index : 0;
        } else {
          currentGallery = [src];
          currentGalleryIndex = 0;
        }
        
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => {
        lightboxImg.setAttribute('src', '');
      }, 500);
    };

    const showPrev = (e) => {
      if (e) e.stopPropagation();
      if (currentGallery.length > 1) {
        currentGalleryIndex = (currentGalleryIndex - 1 + currentGallery.length) % currentGallery.length;
        updateLightboxImage();
      }
    };

    const showNext = (e) => {
      if (e) e.stopPropagation();
      if (currentGallery.length > 1) {
        currentGalleryIndex = (currentGalleryIndex + 1) % currentGallery.length;
        updateLightboxImage();
      }
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrev);
    lightboxNext.addEventListener('click', showNext);
    
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
          closeLightbox();
        } else if (e.key === 'ArrowLeft') {
          showPrev();
        } else if (e.key === 'ArrowRight') {
          showNext();
        }
      }
    });
  }

  // --- Lemon Transition Animation ---
  const spawnLemons = (count, onComplete) => {
    const overlay = document.createElement('div');
    overlay.className = 'lemon-transition-overlay';
    document.body.appendChild(overlay);

    for (let i = 0; i < count; i++) {
      const lemon = document.createElement('div');
      lemon.className = 'falling-lemon';
      lemon.textContent = '🍋';

      // Randomize position, size, delay, and speed
      const leftPos = Math.random() * 100; // 0% to 100%
      const fontSize = 1.5 + Math.random() * 2.5; // 1.5rem to 4rem
      const animDelay = Math.random() * 0.4; // 0s to 0.4s
      const animDuration = 0.8 + Math.random() * 0.6; // 0.8s to 1.4s

      lemon.style.left = `${leftPos}%`;
      lemon.style.fontSize = `${fontSize}rem`;
      lemon.style.animationDelay = `${animDelay}s`;
      lemon.style.animationDuration = `${animDuration}s`;

      overlay.appendChild(lemon);
    }

    // Remove overlay after animations finish
    setTimeout(() => {
      overlay.remove();
      if (onComplete) onComplete();
    }, 1500);
  };

  // Run a small welcome shower of lemons on page load
  spawnLemons(8);

  // Intercept links for hotel transitions
  const localLinks = document.querySelectorAll('a[href]');
  localLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Filter links that represent navigating between pages
      if (
        href && 
        !href.startsWith('#') && 
        !href.startsWith('tel:') && 
        !href.startsWith('mailto:') &&
        !link.getAttribute('target') &&
        (href.includes('index.html') || href.includes('alacati.html') || href.includes('koyici.html') || href === '/' || href === '')
      ) {
        e.preventDefault();
        
        // Spawn transition lemons (dense shower)
        spawnLemons(28);

        // Redirect after the shower is at peak (approx 650ms)
        setTimeout(() => {
          window.location.href = href;
        }, 650);
      }
    });
  });

  // --- Click Lemon Particle Effect ---
  document.addEventListener('click', (e) => {
    // Only spawn particles if it's not a lightbox navigation or close click
    if (
      e.target.closest('.lightbox-prev') || 
      e.target.closest('.lightbox-next') || 
      e.target.closest('.lightbox-close')
    ) {
      return;
    }

    const lemonCount = 8;
    for (let i = 0; i < lemonCount; i++) {
      const lemon = document.createElement('span');
      lemon.className = 'click-lemon';
      lemon.textContent = '🍋';
      
      lemon.style.left = `${e.clientX}px`;
      lemon.style.top = `${e.clientY}px`;
      
      const angle = Math.random() * Math.PI * 2;
      const distance = 45 + Math.random() * 75; // 45px to 120px
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance - 15;
      const rot = (Math.random() - 0.5) * 720;
      
      lemon.style.setProperty('--tx', `${tx}px`);
      lemon.style.setProperty('--ty', `${ty}px`);
      lemon.style.setProperty('--rot', `${rot}deg`);
      
      document.body.appendChild(lemon);
      
      setTimeout(() => {
        lemon.remove();
      }, 800);
    }
  });

  // --- Breakfast Slider ---
  const breakfastSliderContainer = document.querySelector('.breakfast-slider-container');
  if (breakfastSliderContainer) {
    const slides = breakfastSliderContainer.querySelectorAll('.breakfast-slide');
    const dots = breakfastSliderContainer.querySelectorAll('.slider-dots .dot');
    const prevBtn = breakfastSliderContainer.querySelector('.prev-btn');
    const nextBtn = breakfastSliderContainer.querySelector('.next-btn');
    let currentIndex = 0;
    let autoPlayInterval;

    const showSlide = (index) => {
      slides.forEach((slide, idx) => {
        if (idx === index) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

      dots.forEach((dot, idx) => {
        if (idx === index) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
      currentIndex = index;
    };

    const nextSlide = () => {
      let nextIdx = (currentIndex + 1) % slides.length;
      showSlide(nextIdx);
    };

    const prevSlide = () => {
      let prevIdx = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(prevIdx);
    };

    const startAutoPlay = () => {
      autoPlayInterval = setInterval(nextSlide, 4500);
    };

    const stopAutoPlay = () => {
      clearInterval(autoPlayInterval);
    };

    // Events
    nextBtn.addEventListener('click', () => {
      nextSlide();
      stopAutoPlay();
      startAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
      prevSlide();
      stopAutoPlay();
      startAutoPlay();
    });

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        showSlide(idx);
        stopAutoPlay();
        startAutoPlay();
      });
    });

    // Start auto scroll
    startAutoPlay();

    // Pause on hover
    breakfastSliderContainer.addEventListener('mouseenter', stopAutoPlay);
    breakfastSliderContainer.addEventListener('mouseleave', startAutoPlay);
  }
});

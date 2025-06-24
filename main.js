import './assets/scss/all.scss';
// Import Bootstrap's JS bundle
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

document.addEventListener('DOMContentLoaded', function () {
  const helpModal = document.getElementById('helpModal');
  let helpSwiper;
  if (helpModal) {
    helpModal.addEventListener('shown.bs.modal', function () {
      if (!helpSwiper) {
        helpSwiper = new Swiper('.help-swiper', {
          loop: false,
          allowTouchMove: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-btn-next',
            prevEl: '.swiper-btn-prev',
          },
        });
      } else {
        helpSwiper.update();
      }
    });
    // 每次開啟 modal 都回到第一頁
    helpModal.addEventListener('show.bs.modal', function () {
      if (helpSwiper) helpSwiper.slideTo(0, 0);
    });
  }
});
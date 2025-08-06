// document.addEventListener('contextmenu', function (e) {
//   e.preventDefault();
// });

// document.addEventListener('keydown', function (e) {
//   // F12
//   if (e.key === 'F12') {
//     e.preventDefault();
//   }

//   // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
//   if ((e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) || 
//       (e.ctrlKey && e.key === 'U')) {
//     e.preventDefault();
//   }
// });

let selectCallingAgentForm = new Select({
    obj: '.calling__select',
    input: '.calling__wrapper_way',
    options: '.calling__item'
})

let selectCallbackForm = new Select({
    obj: '.callback__select',
    input: '.callback__wrapper_way',
    options: '.callback__item'
})

let menu = new Menu({
    burger: '.header__btn_burger',
    navbar: '.navbar'
})

let accordion = new Accordion({
  name: '.answers__list',
  btns: '.answers__subtitle',
  collapse: false
})


let callAgentForm = new FormModal({
    form: '.calling',
    openBtn: '.hero__btn',
    sendBtn: '.calling__btn',
    closeBtn: '.calling__close',
    countClick: 1, //Счетчик с какого раза при нажатии на submit отправить
})


let lst = document.querySelectorAll('.navbar__link')


let body = document.querySelector('.body')

// body.addEventListener('click', (e) => {
//     if (e.target.classList.contains('blackout')) {
//         body.classList.remove('blackout')
//     }
// })



let reviewsSlider = new Swiper('.reviews__slider', {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 2,
  spaceBetween:  10,
  wrapperClass: 'reviews__wrapper',
  slideClass: 'reviews__slide',
  watchSlidesProgress: true,
  breakpoints: {
    540: {
      slidesPerView: 2
    },
    320: {
      slidesPerView: 1
    }
  },
  on: {
    progress(reviewsSlider) {
      reviewsSlider.slides.forEach((slide) => {
        const slideProgress = slide.progress;
        const scale = 1 - Math.abs(slideProgress) * 0.2;
        slide.style.transform = `scale(${scale})`;
        slide.style.transition = 'transform 0.3s ease';
      });
    },
    setTransition(reviewsSlider, duration) {
      reviewsSlider.slides.forEach(slide => {
        slide.style.transitionDuration = `${duration}ms`;
      });
    }
  }
});






// new Slider({
//     obj: '.reviews__slider',
//     slide: '.reviews__slide'
// })



// for (let link of lst) {
//     link.addEventListener('keyup', elem => {
//         let subParent = link.parentElement.children[1]
//         subParent.classList.add('open-script')
//         let lst = subParent.children
//         console.dir(elem.key)
//         if (elem.key === 'ArrowDown' && !elem.shiftKey && link.matches(':focus-visible')) {
//             lst[0].focus()
//         }
        
//     })
// }
// console.dir(lst)


// document.querySelectorAll('.navbar__link').forEach(link => {
//   // Открываем меню и переносим фокус на первую ссылку
//   link.addEventListener('keydown', e => {
//     console.log(e.key, link.matches(':focus-visible'), !e.shiftKey)
//     if (e.key === 'Tab' && !e.shiftKey && link.matches(':focus-visible')) {
//         console.dir(link.parentElement.querySelector('.navbar__sublink'))
//       const subFirst = link.nextElementSibling.querySelector('.navbar__sublink');
//       subFirst.focus();
//       console.log(subFirst)
      
//       if (subFirst) {
        
//         e.preventDefault();   // не уходим дальше по DOM
//         subFirst.focus();     // сразу ставим фокус внутрь меню
//       }
//     }
//   });
// });
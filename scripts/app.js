let select = new Select({
    obj: '.calling__select',
    input: '.calling__wrapper_way',
    options: '.calling__item'
})

let menu = new Menu({
    burger: '.header__btn_burger',
    navbar: '.navbar'
})


if (window.innerWidth <= 1200) {
    let callAgentForm = new Form({
        form: '.calling',
        openBtn: '.hero__btn',
        sendBtn: '.calling__btn',
        closeBtn: '.calling__close',
        
        countClick: 1, //Счетчик с какого раза при нажатии на submit отправить
    })
}


let lst = document.querySelectorAll('.navbar__link')


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
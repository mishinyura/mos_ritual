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
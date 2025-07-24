class Select{
    constructor(settings) {
        this.container = document.querySelector(settings.obj)
        this.wrapper = this.container.querySelector(settings.input)
        this.selected = this.wrapper.querySelector('input')
        this.choices = this.container.querySelectorAll(settings.options)
        this.list = this.choices[0].parentElement
        
        this.handlerShowList = this.showList.bind(this)
        this.handlerHideList = this.hideList.bind(this)

        this.wrapper.addEventListener('click', this.handlerShowList)

        for (let item of this.choices) {
            item.addEventListener('click', this.handlerHideList)
        }
    }

    setChoice(elem) {
        let data = elem.dataset.way
        let value = elem.innerText
        this.selected.dataset.way = data
        this.selected.value = value

        for (let item of this.choices) {
            item.classList.remove('selected')
        }
        elem.classList.add('selected')
    }

    showList() {
        if (!this.list.classList.contains('active')){
            this.list.classList.add('active')
        }
            
    }

    hideList(elem) {
        this.list.classList.remove('active')
        this.setChoice(elem.target)
    }
}


class Menu{
    constructor(settings) {
        this.burger = document.querySelector(settings.burger)
        this.navbar = document.querySelector(settings.navbar)

        this.handlerEditConditionMenu = this.editContionMenu.bind(this)

        this.burger.addEventListener('click', this.handlerEditConditionMenu)
    }

    editContionMenu(){
        this.navbar.classList.toggle('open')
        this.burger.classList.toggle('open')
    }
}

class Form{
    constructor(settings) {
        this.body = document.querySelector('body');
        this.form = document.querySelector(settings.form);
        this.inputs = this.form.querySelectorAll('input');
        this.countStopSend = settings.countClick || 0;
        this.classActive = 'open';
        this.openBtn = document.querySelector(settings.openBtn) || NaN;
        this.sendBtn = document.querySelector(settings.sendBtn);
        this.closeBtn = document.querySelector(settings.closeBtn) || NaN;
        this.handlerShowForm = this.show.bind(this);
        this.handlerHideForm = this.hide.bind(this);
        this.handlerSendForm = this.send.bind(this);

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
        });

        console.log(this.openBtn)

        
        if (this.openBtn) {
            this.openBtn.addEventListener('click', this.handlerShowForm)
        }
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', this.handlerHideForm)
        }
        this.sendBtn.addEventListener('click', this.handlerSendForm)
        
        
        console.log(this.inputs)
    }

    send() {
        if (this.form.classList.contains(this.classActive)) {
            console.log('Send')
        }
    }

    validate() {

    }

    show() {
        if (!this.form.classList.contains(this.classActive)) {
            this.form.classList.add(this.classActive)
            this.body.classList.add('blackout')
        }
        console.log('show')
    }

    hide() {
        if (this.form.classList.contains(this.classActive)) {
            this.form.classList.remove(this.classActive)
            this.body.classList.remove('blackout')
        } 
        console.log('hide')
    }
}
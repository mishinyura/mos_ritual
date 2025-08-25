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
        this.handleOutside = (e) => this.closeIfOutside(e);
        document.addEventListener('click', this.handleOutside);
    }

    closeIfOutside(e) {
        if (this.container.contains(e.target)) return;

        this.list.classList.remove('active');
        document.removeEventListener('click', this.handleOutside);
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

class FormModal{
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

class Accordion{
    constructor({name, btns, collapse}){
        this.accordion = document.querySelector(name)
        this.btns = this.accordion.querySelectorAll(btns)
        this.collapse = collapse

        this.handlerClickBtn = this.clickBtn.bind(this)


        for (let btn of this.btns) {
            btn.addEventListener('click', this.handlerClickBtn)
        }
    }

    open(btn){
        let detail = btn.nextElementSibling
        detail.classList.add('open')
        btn.classList.add('open')
        console.log(detail)
    }

    close(btn){
        btn.classList.remove('open')
        btn.nextElementSibling.classList.remove('open')
    }

    closeAll() {
        for (let btn of this.btns) {
            btn.classList.remove('open')
            btn.nextElementSibling.classList.remove('open')
        }
    }

    clickBtn(btn) {
        if (this.collapse) {
            this.closeAll()
            this.open(btn.currentTarget)
        } else {
            if (btn.currentTarget.classList.contains('open')) {
                this.close(btn.currentTarget)
            } else {
                this.open(btn.currentTarget)
            }
        }
        
    }
}


class Basket{
    constructor() {
        this.basket = {}
    }
}


/** 
 * Класс конструктор HTML элементов карточки товара
*/
class CardBuilder {
    /**
     * @param {Product} product
     */
    constructor(product) {
        /** @type {Product} */
        this.product = product;
        /** @type {Object} */
        this.refs = {}; // Содержит все ссылки на созданные HTML объекты
    }

    /**
     * Создает HTML карточки товара
     * @returns {CardBuilder} Возвращает свой экзмепляр
     */
    createCard() {
        const card = document.createElement('article');
        card.classList.add('cards__card');
        this.refs.card = card;

        return this
    }

    /**
     * Создает HTML лейбла со скидкой
     * @returns {CardBuilder} Возвращает свой экзмепляр
     */
    createDiscount() {
        
        if (this.product.oldPrice) {
            const discount = Math.ceil(100 - this.product.newPrice / this.product.oldPrice * 100);
            const labelDiscount = document.createElement('span');
            labelDiscount.classList.add('cards__label');
            labelDiscount.classList.add('cards__label_yellow');
            labelDiscount.innerText = `Скидка ${discount}%`;

            this.refs.card.appendChild(labelDiscount)
        }
        
        return this
    }

    /**
     * Создает HTML ссылку на детальную страницу, фото и пагинацию фото товара
     * @returns {CardBuilder} Возвращает свой экзмепляр
     */
    createImage() {
        const link = document.createElement('a');
        
        if (this.product.images.length > 0) {
            let mark;
            const img = document.createElement('img');
            const counter = document.createElement('span');
            const markActive = document.createElement('span');

            counter.classList.add('cards__counter');
            markActive.classList.add('active');

            link.append(img, counter);
            counter.appendChild(markActive);

            img.src = this.product.images ? this.product.images[0] : '';
            img.alt = this.product.description;
            

            if (this.product.images.length > 1) {
                link.dataset.images = this.product.images.slice(1)
                for (let i=1; this.product.images.length > i; ++i) {
                    mark = document.createElement('span')
                    counter.appendChild(mark)
                }
            };

            this.refs.image = img;
            this.refs.images = this.product.images;
            this.refs.counter = counter; 
        };

        link.classList.add('cards__img');

        link.href = `/products/coffins/${this.product.slug}`;
        

        this.refs.link = link;
        
        this.refs.card.appendChild(link)

        return this
    }

    /**
     * Создает HTML заголовка (Наименования товара)
     * @returns {CardBuilder} Возвращает свой экзмепляр
     */
    createTitle() {
        const title = document.createElement('h3');
        title.classList.add('cards__title');
        title.innerText = this.product.name;
        this.refs.card.appendChild(title)

        return this
    }

    /**
     * Создает HTML блок с ценами на товар
     * @returns {CardBuilder} Возвращает свой экзмепляр
     */
    createPrice() {
        const block = document.createElement('div');
        const newPrice = document.createElement('span');
        block.classList.add('cards__prices');
        newPrice.classList.add('cards__price', 'cards__price_new');
        newPrice.innerText = this.product.newPrice;
        block.appendChild(newPrice);
        if (this.product.oldPrice) {
            const oldPrice = document.createElement('span')
            oldPrice.classList.add('cards__price', 'cards__price_old')
            oldPrice.innerText = this.product.oldPrice
            block.appendChild(oldPrice)

            this.refs.oldPrice = oldPrice
        };

        
        this.refs.newPrice = newPrice
        this.refs.card.appendChild(block)

        return this
    }

    /**
     * Создает HTML кнопки управления количеством товара в корзине
     * @returns {CardBuilder} Возвращает свой экзмепляр
     */
    createButtons() {
        const block = document.createElement('div');
        const downBtn = document.createElement('button');
        const upBtn = document.createElement('button');
        const input = document.createElement('input');

        block.classList.add('cards__btns');
        downBtn.classList.add('cards__btn', 'cards__btn_down');
        upBtn.classList.add('cards__btn', 'cards__btn_up');
        input.classList.add('cards__input');

        input.type = 'number';
        input.min = 1;
        input.max = 99;
        input.value = 0;

        block.append(downBtn, input, upBtn);

        this.refs.downBtn = downBtn
        this.refs.upBtn = upBtn
        this.refs.input = input
        this.refs.card.appendChild(block)

        return this
    }

    /**
     * Вызывает все функции для сбора полноценной карточки товара
     * @returns {Object} HTML узел карточки товара, созданной в createCard 
     * и ссылки на элементы внутри карточки
     */
    build() {
        this.createCard()
            .createDiscount()
            .createImage()
            .createTitle()
            .createPrice()
            .createButtons();
        
        return {
            card: this.refs.card,
            refs: this.refs
        };
    }
}

/**
 * Класс управления карточкой товара, который отвечает за функционал карточки.
 * Класс накладывает обработчики, управляет количеством, показами других фото
 * и вызовом модального окна управления параметрами товара.
 */
class Card{
    /**
     * @param {Product} product 
     */
    constructor(product) {
        const { card, refs } = new CardBuilder(product).build();
        this.product = product
        this.card = card
        this.refs = refs
        
        this.modalParams = document.querySelector('.settings-product')
        const container = document.querySelector('.cards')
        container.appendChild(card)

        this.marks = this.refs.images ? this.setMarks() : null;

        this.eventInit()
    }

    /**
     * Устанавливает обработчики события на элементы карточки товара
     */
    eventInit() {
        if (this.marks) {
            this.refs.link.addEventListener('pointermove', this.editPhoto.bind(this));
        }
        this.refs.upBtn.addEventListener('click', this.editBtn.bind(this));
        this.refs.downBtn.addEventListener('click', this.editBtn.bind(this));
    }

    /**
     * Устанавливает условные метки для переключения фото товара
     * @returns {Object} Объект с информацией о метке
     */
    setMarks() {
        const marks = this.refs.images.map((url, i) => ({
            index: i, //Индекс фото, которое принадлежит метке
            url: `${window.location.origin}${url}`, //Адрес фото
            from: (this.refs.link.offsetWidth / this.refs.images.length) * i, //Координаты начала метки
            to  : (this.refs.link.offsetWidth / this.refs.images.length) * (i + 1) //Координаты окончания метки
        }));

        return marks
    }

    /**
     * Меняет состояние кнопок управления количеством товара
     * @param {HTMLElement} btn 
     */
    editBtn(btn) {
        let delta = 1
        if (btn.target == this.refs.downBtn) {
            delta = -1
        }
        if (this.refs.input.value == 0 && this.product.params) {
            // this.modalParams.showModal();
            this.modalParams.classList.add('active')
            document.querySelector('.settings-product__btn').addEventListener('click', () => {
                // document.querySelector('.settings-product').close();
                this.modalParams.classList.remove('active')
            });
        }
        const value = Math.max(0, +this.refs.input.value + delta);
        this.refs.input.value = value;
        this.refs.input.setAttribute('value', value)
        this.refs.upBtn.parentElement.classList.toggle('open', value > 0);
    }

    /**
     * Меняет вид фотографий в зависимости от наведения на конкретную метку
     * @param {*} e 
     */
    editPhoto(e) {
        const rect = this.refs.link.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const obj = this.marks.find(val => x >= val.from && x < val.to)
        if (obj) {
            this.refs.image.src = obj.url;
            for (let child of this.refs.counter.children) {
                child.classList.remove('active')
            }

            this.refs.counter.children[obj.index].classList.add('active')
        }
        
    }
}






class Filters {
    constructor(settings) {
        this.checkboxClass = settings.checkboxClass
    }

    createCheckboxs(lst) {
        let lable, input, checkbox, text
        for (let name of lst) {
            lable = document.createElement('label')
            input = lable.createElement('input')
            checkbox = lable.createElement('span')
            text = lable.createElement('span')

            text.innerText = name
        }
        
    }
}
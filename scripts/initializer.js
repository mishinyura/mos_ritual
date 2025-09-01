// const { createApp, ref, computed } = Vue;
// import coffins from "./data.json" assert { type: "json" };



class CatalogPage {

    selectCatalogSort = new Select({
        obj: '.view__select',
        input: '.view__wrapper_sort',
        options: '.view__item'
    });

    selectSettingsProductModal = new Select({
        obj: '.settings-product__select',
        input: '.settings-product__wrapper',
        options: '.settings-product__item'
    })

    

    initVue() {
        const { createApp, ref, computed } = Vue

        createApp({
            setup() {
                const products = ref([
                {
                    article: "AR1234",
                    category: 'Гробы',
                    subcategory: 'Гробы лакированные',
                    name: 'Стандарт Б-4',
                    description: 'Какое то описание гроба',
                    params: {
                    price: 12000,
                    height: [1.7, 1.8, 1.9, 2.0],
                    type: ['Стандарт', 'Колода']
                    }
                },
                {
                    article: "OB1234",
                    category: 'Гробы',
                    subcategory: 'Гробы обитые тканью',
                    name: 'Гладь',
                    description: 'Какое то описание гроба',
                    params: {
                    price: 8000,
                    height: [1.7, 1.8, 1.9, 2.0, 2.1],
                    type: ['Стандарт', 'Колода'],
                    color: ['#fff', '#c9c9c9']
                    }
                },
                {
                    article: "KR1234",
                    category: 'Кресты',
                    subcategory: 'Металлические кресты',
                    name: 'Метал стандарт',
                    description: 'Какое то описание креста',
                    params: {
                    price: 1000
                    }
                }
                ])

                // Получаем уникальные значения для фильтров
                const categories = [...new Set(products.value.map(p => p.category))]
                const subcategories = [...new Set(products.value.map(p => p.subcategory))]
                const types = [...new Set(products.value.flatMap(p => p.params.type || []))]
                const heights = [...new Set(products.value.flatMap(p => p.params.height || []))].sort()

                const filters = ref({
                selectedCategories: [],
                selectedSubcategories: [],
                selectedTypes: [],
                selectedHeights: [],
                maxPrice: 20000
                })

                const filteredProducts = computed(() => {
                return products.value.filter(p => {
                    const priceOk = p.params.price <= filters.value.maxPrice
                    const catOk = filters.value.selectedCategories.length === 0 || filters.value.selectedCategories.includes(p.category)
                    const subOk = filters.value.selectedSubcategories.length === 0 || filters.value.selectedSubcategories.includes(p.subcategory)

                    const typeOk = filters.value.selectedTypes.length === 0 || !p.params.type || p.params.type.some(t => filters.value.selectedTypes.includes(t))
                    const heightOk = filters.value.selectedHeights.length === 0 || !p.params.height || p.params.height.some(h => filters.value.selectedHeights.includes(h))

                    return priceOk && catOk && subOk && typeOk && heightOk
                })
                })

                return {
                products,
                categories,
                subcategories,
                types,
                heights,
                filters,
                filteredProducts
                }
            }
            }).mount('#filters')
    }

    constructor() {
        // this.initVue()
        this.initFilterBtns()
        this.getData()
    }

    initFilterBtns() {
        this.filterBtns = document.querySelectorAll('.control__name');

        for (let btn of this.filterBtns) {
            btn.addEventListener('click', (e) => {
                e.target.classList.toggle('open')
                let lst = e.target.nextElementSibling
                if (lst.classList.contains('open')) {
                    lst.style.height = 0
                    lst.classList.remove('open')
                } else {
                    let height = lst.children[0].offsetHeight * lst.children.length
                    lst.style.height = `${height}px`
                    lst.classList.add('open')
                }
            })
        }
    }

    async getData() {
        const res = await fetch("./scripts/data.json");
        const config = await res.json();

        for (let card of config.coffins) {
            new Card(card)
        }
    }
}

class IndexPage {
    selectCallingAgentForm = new Select({
        obj: '.calling__select',
        input: '.calling__wrapper_way',
        options: '.calling__item'
    })

    selectCallbackForm = new Select({
        obj: '.callback__select',
        input: '.callback__wrapper_way',
        options: '.callback__item'
    })

    menu = new Menu({
        burger: '.header__btn_burger',
        navbar: '.navbar'
    })

    accordion = new Accordion({
        name: '.answers__list',
        btns: '.answers__subtitle',
        collapse: false
    })


    callAgentForm = new FormModal({
        form: '.calling',
        openBtn: '.hero__btn',
        sendBtn: '.calling__btn',
        closeBtn: '.calling__close',
        countClick: 1, //Счетчик с какого раза при нажатии на submit отправить
    })


    lst = document.querySelectorAll('.navbar__link')


    body = document.querySelector('.body')

    // body.addEventListener('click', (e) => {
    //     if (e.target.classList.contains('blackout')) {
    //         body.classList.remove('blackout')
    //     }
    // })



    reviewsSlider = new Swiper('.reviews__slider', {
        direction: 'horizontal',
        loop: true,
        slidesPerView: 2,
        spaceBetween: 10,
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
}

class ProductDetailPage {
    constructor() {
        // reviewsSlider = new Swiper('.product__slider', {
        //     direction: 'horizontal',
        //     loop: true,
        //     slidesPerView: 1,
        //     spaceBetween: 10,
        //     watchSlidesProgress: true
        // });
        let galleryThumbs = new Swiper('#thumps', {
            direction: 'vertical',
            spaceBetween: 10,
            slidesPerView: 4,
            loop: true,
            freeMode: true,
            loopedSlides: 5,
            watchSlidesProgress: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });
        let galleryTop = new Swiper('#photo', {
            spaceBetween: 10,
            loop: true,
            loopedSlides: 5,
            thumbs: {
                swiper: galleryThumbs,
            }
        });

        new Tabs('.tabs')
    }
    
}
// let chromeBrowser = navigator.userAgent.match(/Chrome/);
// let myEffect = chromeBrowser ? 'coverflow' : 'cube'; //cube loadMore click fails on chrome

// < !--Initialize Swiper-- >
var swiper = new Swiper(".mySwiper", {
    // direction: 'vertical',
    // loop: true,
    // parallax: true,
    // mousewheel: true,
    // autoHeight: true,
    effect: 'coverflow',
    coverflowEffect: {
        rotate: 50,
        // slideShadows: false,
    },
    // effect: myEffect,
    pagination: {
        el: ".swiper-pagination",
        type: "progressbar",
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true
    }
});

///---- make cards using cards Array loaded from jokes.js

function getCount() {
    let perLoadCount = 30;
    return cards.length >= perLoadCount ? perLoadCount : cards.length
}

function loadCards() {
    swiper.slideTo(0, 1000);//index, animate time ms
    swiper.removeAllSlides();
    for (let index = 0; index < getCount(); index++) {
        let pos = Math.floor(Math.random() * cards.length);
        let card = cards.splice(pos, 1)[0];
        swiper.appendSlide([
            `<div class="swiper-slide">${card.setup}</div>`,
            `<div class="swiper-slide">${card.punchline}</div>`,
        ]);
    }
    addLastSlide();
}

function addLastSlide() {
    let msg = (getCount() < 1) ? "This is the end." : "Tap for a new set.";
    swiper.appendSlide(`<div id="loadMore" class="swiper-slide" onclick="loadCards()"><i>${msg}</i></div>`);
}
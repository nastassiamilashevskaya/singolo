const NAV = document.getElementById('nav');
const BUTTON = document.getElementById('btn');
const CLOSE_BUTTON = document.getElementById('close-btn');

NAV.addEventListener('click', (event) => {
    NAV.querySelectorAll('a').forEach(el => el.classList.remove('active-link'));
    event.target.classList.add('active-link');
});


const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    
    const blockID = anchor.getAttribute('href').substr(1)
    
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}

document.addEventListener('scroll', onScroll);

function onScroll(event) {
    const currentPosition = window.scrollY;
    const divs = document.querySelectorAll('#wrapper>div');
    const links = document.querySelectorAll('#nav a');

    divs.forEach((el) => {
        if ((el.offsetTop - 94.8) <= currentPosition && (el.offsetTop + el.offsetHeight) > currentPosition) {
            links.forEach((a) => {
                a.classList.remove('active-link');
                if (el.getAttribute('id') === a.getAttribute('href').substring(1)) {
                    a.classList.add('active-link');
                }
            })
        }
    });
}

const items = document.querySelectorAll('.item');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem (n) {
    currentItem  = (n + items.length) % items.length ;
}

function previousItem (n) {
    hideItem('to-right');
    changeCurrentItem(n - 1);
    showItem('from-left');
}

function nextItem (n) {
    hideItem('to-left');
    changeCurrentItem(n + 1);
    showItem('from-right');
}

function hideItem (direction) {
    isEnabled = false;
    items[currentItem].classList.add(direction);
    items[currentItem].addEventListener('animationend', function () {
        this.classList.remove('active', direction);
    })
}

function showItem (direction) {
    items[currentItem].classList.add('next', direction);
    items[currentItem].addEventListener('animationend', function () {
        this.classList.remove('next', direction);
        this.classList.add('active');
        isEnabled = true;
    })
}

document.querySelector('.control.left').addEventListener('click', function () {
    if (isEnabled) {
        previousItem(currentItem)
    }
});

document.querySelector('.control.right').addEventListener('click', function () {
    if (isEnabled) {
        nextItem(currentItem)
    }
});

let verticalOn = true;
let horizontalOn = true;

document.getElementById('vertical-phone').addEventListener('click', function () {
    if (verticalOn) {
        document.getElementById('vertical-screen').classList.remove('hidden');
        verticalOn = false;
    } else {
        document.getElementById('vertical-screen').classList.add('hidden');
        verticalOn = true;
    }
});

document.getElementById('horizontal-phone').addEventListener('click', function () {
    if (horizontalOn) {
        document.getElementById('horizontal-screen').classList.remove('hidden');
        horizontalOn = false;
    } else {
        document.getElementById('horizontal-screen').classList.add('hidden');
        horizontalOn = true;
    }
});

const WORKS = document.getElementById('works');

WORKS.addEventListener('click', (event) => {
    if (event.target.classList.contains('active-img')) {
        event.target.classList.remove('active-img');
    } else {
        WORKS.querySelectorAll('.portfolio__image').forEach(el => el.classList.remove('active-img'));
        event.target.classList.add('active-img');
    }
});

const PORTFOLIO_NAV = document.getElementById('portfolio__nav');
const PORTFOLIO_NAV_LINKS = document.querySelectorAll('.portfolio__nav-link');
let PORTFOLIO_IMAGES = Array.from(document.querySelectorAll('.portfolio__image'));

PORTFOLIO_NAV_LINKS.forEach(element => {
    element.addEventListener('click', (event) => {
        console.log(PORTFOLIO_NAV_LINKS);
        event.preventDefault();
        PORTFOLIO_NAV.querySelectorAll('a').forEach(el => el.classList.remove('portfolio__nav-link--active'));
        event.target.classList.add('portfolio__nav-link--active');
    
        let shuffledArr = PORTFOLIO_IMAGES.sort(function(){
            return Math.random() - 0.5;
        });
    
        WORKS.innerHTML = "";
        shuffledArr.forEach(el => WORKS.appendChild(el));
    
    });
});

BUTTON.addEventListener('click', (event) => {
    const subject = document.getElementById('subject').value.toString();
    const text = document.getElementById('text').value.toString();
    let required = [...document.querySelectorAll("[required]")];
    let checkValid = el => el.checkValidity();

    if (required.every(checkValid)) {
        event.preventDefault();

        if (subject === '') {
            document.getElementById('result-subject').innerText = 'No subject';
        } else {
            document.getElementById('result-subject').innerText = 'Subject: ' + subject;
        }
    
        if (text === '') {
            document.getElementById('result-text').innerText = 'No description';
        } else {
            document.getElementById('result-text').innerText = 'Description: ' + text;
        }
    
        document.getElementById('message-block').classList.remove('hidden');    
    }
});

CLOSE_BUTTON.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('form').reset();
    document.getElementById('message-block').classList.add('hidden');
});

// Menu mobile

MENU_BUTTON = document.getElementById('nav-img');
MOBILE_LINKS = document.querySelectorAll('.mobile-nav__link');
MOBILE_MENU = document.getElementById('mobile-nav');
MOBILE_BG = document.getElementById('mobile-bg');

MOBILE_LINKS.forEach( element => {
    element.addEventListener('click', (event) => {
        document.getElementById('mobile-nav').classList.remove('open');
        document.getElementById('mobile-bg').classList.remove('open');
        MENU_BUTTON.style.transform = 'rotate(90deg)';
        document.getElementById('singolo__title').classList.remove('mobile-title'); 
        MOBILE_LINKS.forEach(element => {
            element.classList.add('hidden');
        });
    })
});

MENU_BUTTON.addEventListener('click', (event) => {
    if (MOBILE_MENU.classList.contains('open')) {
        MOBILE_MENU.classList.remove('open');
        document.getElementById('mobile-bg').classList.remove('open');
        MOBILE_LINKS.forEach(element => {
            element.classList.add('hidden');
        });
        MENU_BUTTON.style.transform = 'rotate(90deg)';
        document.getElementById('singolo__title').classList.remove('mobile-title');    
    } else {
        MOBILE_MENU.classList.add('open');
        document.getElementById('mobile-bg').classList.add('open');
        MENU_BUTTON.style.transform = 'rotate(0deg)';
        document.getElementById('singolo__title').classList.add('mobile-title'); 
        MOBILE_LINKS.forEach(element => {
            element.classList.remove('hidden');
        });
    }
});

document.addEventListener('scroll', onScrollMobile);
function onScrollMobile(event) {
    const currentPosition = window.scrollY;
    const divs = document.querySelectorAll('#wrapper>div');
    const links = document.querySelectorAll('#mobile-nav a');

    divs.forEach((el) => {
        if ((el.offsetTop - 94.8) <= currentPosition && (el.offsetTop + el.offsetHeight) > currentPosition) {
            links.forEach((a) => {
                a.classList.remove('active-link');
                if (el.getAttribute('id') === a.getAttribute('href').substring(1)) {
                    a.classList.add('active-link');
                }
            })
        }
    });
}










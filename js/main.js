$(function () {

/********FULL PAGE*********/

    var fullPageHeight = $(window).innerHeight() - $('nav').height();
    $('.bar').css('min-height',fullPageHeight);



/*********** BANNER CAROUSEL ************/
//
// function bannerCarousel(){
//    var amountImages = 3;
//    var banner = $('.parallax_header');
//    console.log(banner);
//
//    // for (var imageIndex=1; imageIndex<=amountImages; imageIndex++) {
//    //    if (imageIndex == amountImages) imageIndex=1;
//
//
//    }
// }
//
// bannerCarousel();


/***********SCROLL MENU****************/

    var scrollMenu = function (checkClick) {
        var menuWidth = $('nav ul').width() / 2;
        var ratio = (($(window).width() - menuWidth) / $(document).height()) / 3.5;
        var margin = $(window).scrollTop() * ratio;
        $('nav ul').css('marginRight', margin);
    };

    var fadeScrollTop = function () {
        var marginRight = parseInt($('nav ul').css('marginRight'));
        if (marginRight > 22)
            $('.home').fadeIn();
        else $('.home').fadeOut(10);
    };



    /***BURGER_NAV***/

    var menuButton = document.getElementById('burger_nav');
    var menu = document.querySelector('header nav');
    var body = document.querySelector('body');

    menuButton.addEventListener('click', openMenu);

    function openMenu() {
        menu.classList.toggle('open');
        menuButton.classList.toggle('active');
        body.classList.toggle('no-scrollY');
    }


    /************STICKY NAV***********/

        var stickyNav = function () {
            var scrollY = $(window).scrollTop();
            var windowHeight = $(window).innerHeight();
            if (scrollY > windowHeight - 100) {
                $('nav').addClass('sticky')
            } else {
                $('nav').removeClass('sticky');
                menu.classList.remove('open');
                menuButton.classList.remove('active');
            }
        };




/****************************
        **SCROLL_TO**
 *****************************/

    var checkClick = false;

    $('a[href*="#"]').click(function (e) {
      e.preventDefault();

        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

            var link = this;
            checkClick = true;
            switchNav(checkClick, link);

            var target = this.hash;
            var idDiv = $(this.hash);

            var navBurger = $('#burger_nav');
            var nav = $('header nav');
            var heightNav = $('nav').css('height');


            if (navBurger.hasClass('active') == true) {
                heightNav = 40;
            } else {
                heightNav = parseInt(heightNav);
            };

            var divTop = idDiv.offset().top;
            // if (target == '#o-mnie') divTop += 65;

            scrollPosition = divTop - heightNav;

            if (idDiv.length) {
                $(navBurger).removeClass('active');
                nav.removeClass('open');
                body.classList.remove('no-scrollY');
                $('html, body').animate({
                    scrollTop: scrollPosition,
                }, 800, function () {
                    checkClick = false;
                });
            };
        };
    });



    /************************************
     ********SWITCH NAV+URL CURRENT*******
     *************************************/

    function switchNav(checkClick, link) {

        var navLinks = $('header a:not(.not-link)');
        var divTop;
        var currentURL = '';

        if (checkClick) {

            if(link)

            currentURL = $(link).attr('href');
            $('nav ul li').removeClass('current');

            if ($(link).hasClass('down')) {
               $('header #o-mnie-link').addClass('current');
            } else {
               $(link).parent().addClass('current');

            }
            history.pushState(null, null, currentURL);

        } else {

            $(navLinks).each(function () {

                var divLink = $(this).attr('href');

                if ($(divLink).length) {
                    divTop = $(divLink).offset().top;
                }

                var scrollY = $(window).scrollTop();
                var distance = Math.abs(scrollY - divTop);
                var endScrollY = $(window).height();
                var hash = location.hash;

                if (distance < 50 && hash !== currentURL) {

                    currentURL = divLink;
                    $('nav ul li').removeClass('current');
                    $(this).parent().addClass('current');
                    history.pushState(null, null, currentURL);
                };

                if (scrollY + $(window).height() == $(document).height()) {

                    currentURL = $('nav ul li a[href="#kontakt"]').attr('href');
                    $('nav ul li').removeClass('current');
                    $('nav ul li a[href="#kontakt"]').parent().addClass('current');
                    history.pushState(null, null, currentURL);
                }
            });
        };
    };

    scrollMenu();
    stickyNav();

    $(window).scroll(function () {
        stickyNav();
        scrollMenu();
        fadeScrollTop();
        if (!checkClick) {
            switchNav(checkClick);
        };
    });
});


/******** FADE OUT HEADER WHEN SCROLL DOWN ********/
function header_fade_out() {
var header = document.getElementsByClassName('parallax_header')[0];
var main_section = document.getElementsByTagName('main')[0];
var main_section_top = main_section.offsetTop;
var scrollY = window.scrollY;

  if(scrollY < main_section_top) {
    header.style.opacity = 1 - 1.2 * scrollY / main_section_top;
  };
}






/******** ANIMATION ELEMENT WHEN SCROLL ********/

function sliderElement() {

    const sliderElements = document.querySelectorAll('.slide-in');
    const distance = 350;
    let parentElement, elementTop;

     sliderElements.forEach(sliderElement => {
       let windowHalf = window.scrollY + (window.innerHeight / 2);
       console.log('window: ', windowHalf);

       if (sliderElement.classList.contains('bar')){ // if element = bar
          elementTop = sliderElement.offsetTop;
          console.log(sliderElement, ': ', elementTop);

       } else {                         // if element is in bar
          parentElement = sliderElement.parentElement;

          // find closest div with .bar
         while (!(parentElement.classList.contains('bar'))) {
           parentElement = parentElement.parentElement;
         }

         let parentElementTop = parentElement.offsetTop;
         elementTop = sliderElement.offsetTop + parentElementTop;
       }

       let isShown = (Math.abs(elementTop - windowHalf) <= distance);
       if (isShown){
         sliderElement.classList.add('active');
       } else {
         sliderElement.classList.remove('active');
       };
     });
};
  window.addEventListener('scroll', function(){
    sliderElement();
    header_fade_out();
});



/***** HOBBIES ANIMATION ******/

/***** MUSIC *****/
var musicSVG = document.getElementById('music');
var musicAudio = document.getElementById('musicAudio');
var pageElements = document.querySelectorAll('.move');
var jazz = document.getElementById('video');


musicSVG.addEventListener('click', function(){
    if (!musicAudio.paused) {
        musicAudio.pause();
        musicAudio.currentTime = 0;
        this.classList.remove('music_animacja');
      /*  jazz.classList.remove('visible');
        pageElements.forEach(pageElement => {
          pageElement.classList.remove('move_out');
        });
      */
     }
    else {
        musicAudio.play();
        this.classList.add('music_animacja');
    /*    jazz.classList.add('visible');
        pageElements.forEach(pageElement => {
        pageElement.classList.add('move_out');
      });
    */
    };
});




/****FORMULARZ*****/


const form = document.querySelector('#contactForm');
const inputs = form.querySelectorAll('input[required], textarea[required]');

form.setAttribute('novalidate', true);

const displayFieldError = function (elem) {
    const fieldRow = elem.closest('.form-row');
    const fieldError = fieldRow.querySelector('.field-error');

    if (fieldError === null) {
        const errorText = elem.dataset.error;
        const divError = document.createElement('div');
        divError.classList.add('field-error');
        divError.innerText = errorText;
        fieldRow.appendChild(divError);
    }
};

const hideFieldError = function (elem) {
    const fieldRow = elem.closest('.form-row');
    const fieldError = fieldRow.querySelector('.field-error');

    if (fieldError !== null) {
        fieldError.remove();
    }
};

[...inputs].forEach(elem => {
    elem.addEventListener('input', function () {
        if (!this.checkValidity()) {
            this.classList.add('error');
        } else {
            this.classList.remove('error');
            hideFieldError(this);
        }
    });
});

const checkFieldsError = function (elements) {
    let fieldsAreValid = true;

    [...elements].forEach(elem => {
        if (elem.checkValidity()) {
            hideFieldError(elem);
            elem.classList.remove('error');
        } else {
            displayFieldError(elem);
            elem.classList.add('error');
            fieldsAreValid = false;
        }
    });

    return fieldsAreValid;
};

form.addEventListener('submit', e => {
    e.preventDefault();

    if (checkFieldsError(inputs)) {
        const elements = form.querySelectorAll('input:not(:disabled), textarea:not(:disabled)');

        const dataToSend = new FormData();
        [...elements].forEach(el => dataToSend.append(el.name, el.value));

        const submit = form.querySelector('[type="submit"]');
        submit.disabled = true;
        submit.classList.add('element-is-busy');

        const url = form.getAttribute('action');
        const method = form.getAttribute('method');


        fetch(url, {
                method: method.toUpperCase(),
                body: dataToSend
            })
            .then(ret => ret.json())
            .then(ret => {
                submit.disabled = false;
                submit.classList.remove('element-is-busy');

                if (ret.errors) {
                    ret.errors.map(function (el) {
                        return '[name="' + el + '"]'
                    });

                    const badFields = form.querySelectorAll(ret.errors.join(','));
                    checkFieldsErrors(badFields);
                } else {

                    if (ret.status === 'ok') {
                        const div = document.createElement('div');
                        div.classList.add('form-send-success');

                        form.parentElement.insertBefore(div, form);
                        div.innerHTML = '<strong>Wiadomość została wysłana</strong><span>Dzięki za kontakt. Postaram się odpowiedzieć jak najszybciej.</span>';
                        form.remove();
                    }

                    if (ret.status === 'error') {

                        if (document.querySelector('.send-error')) {
                            document.querySelector('.send-error').remove();
                        }
                        const div = document.createElement('div');
                        div.classList.add('send-error');
                        div.innerText = 'Wysłanie wiadomości nie powiodło się';
                        submit.parentElement.appendChild(div);
                    }
                }

            }).catch(_ => {
                submit.disabled = false;
                submit.classList.remove('element-is-busy');
            });
    }
});

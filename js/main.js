$(document).ready(function () {
    /*****************STICKY NAV****************/
    var NavY = $('.nav').offset().top;
    var stickyNav = function () {
        var ScrollY = $(window).scrollTop();       

        if (ScrollY > NavY) {
            $('.nav').addClass('sticky');
            
        } else {
            $('.nav').removeClass('sticky');
           
        }
    };

    var scrollBack = function () {
        if ($(this).scrollTop() > 300) $('.home').fadeIn();
        else $('.home').fadeOut();
    };

    stickyNav();

/**SCROLL_TO**/    
    
    $.scrollTo(0);

    $('#link1').click(function () {
        $.scrollTo($('#o_mnie'), 1000);
    });
    $('#link2').click(function () {
        $.scrollTo($('#portfolio'), 1000);
    });
    $('#link3').click(function () {
        $.scrollTo($('#wiedza'), 1000);
    });
    $('#link4').click(function () {
        $.scrollTo($('#kontakt'), 1000);
    });
    $('.home').click(function () {
        $.scrollTo($('body'), 1000);
    });

    $(window).scroll(function () {
        stickyNav();
        scrollBack();
    });

    
});

$(document).ready(function () {

    $('.main-header__link[href^="#"]').click(function(){
    var target = $(this).attr('href');
    $('html, body').animate({scrollTop: $(target).offset().top - $('.main-header__menu').height()}, 800);
    return false;
  });

 $(".page-project__box").click(function() {
    $('.shop__gallery').slick('setPosition');
    $(".page-project__box").removeClass("page-project__box--active").eq($(this).index()).addClass("page-project__box--active");
    var index = $(this).index();
    $(".gallery__wrap").hide().eq(index).fadeIn();
  }).eq(0).addClass("page-project__box--active");

$('.mobile-wrap').on('click', function () {
    $(this).find('.main-nav__toggle').toggleClass('open');
    $('.main-header__list').slideToggle();
});

$(window).resize(function () {

    if ($(window).width() >= 780) {
        $('.main-header__list').attr('style', '');
        $('.main-nav__toggle').removeClass('open');
    }

    changeElem();
});

  var  gallery = $('.gallery__wrap');
    let arrows = $('.gallery__block').find('.gallery__arrow');
    gallery.slick({
      infinite: true,
      // speed: 600,
      slidesToShow: 1,
      // autoplay: true,
      //autoplaySpeed:5000,
      draggable: true,
      fade: false,
      arrows: true,
      appendArrows: $('.gallery__arrows'),
      prevArrow: '<button class="gallery__arrow gallery__arrow--dir_left"></button>',
     nextArrow: '<button class="gallery__arrow gallery__arrow--dir_right"></button>',
      dots: false,
    });


(function() {
    setTimeout(function() {
        var text = $('.animation_title').data('text');
        var text_arr = text.split('');
        var count = 0;
        var end = text_arr.length;
        var timer = setInterval(function() {
            var self_text = $('.animation_title').text();
            $('.animation_title').text(self_text + text_arr[count]);
            count++;
            if(count == end) {
                clearInterval(timer);
            }
        }, 200);
    }, 1000);
})();

let clients_slider = $('.clients__holder');
clients_slider.slick({
    slidesPerRow: 3,
    rows: 3,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    responsive: [{
            breakpoint: 780,
            settings: {
               slidesPerRow: 2,
               rows: 4
            }
        }
    ]
});

$('.clients__arrow--dir_left').click(function(){
    $('.clients__holder').slick("slickPrev");
})

$('.clients__arrow--dir_right').click(function(){
    $('.clients__holder').slick("slickNext");
})

let slider = $('.reviews__slider');

slider.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    let i = (currentSlide ? currentSlide : 0) + 1;
    let current = $('.reviews__current');
    let all = $('.reviews__all');

    current.text(i);
    all.text(slick.slideCount);
});


slider.slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    appendArrows: $('.reviews__arrows'),
    prevArrow: '<button class="reviews__arrow reviews__arrow--dir_left"></button>',
    nextArrow: '<button class="reviews__arrow reviews__arrow--dir_right"></button>',

    responsive: [{
            breakpoint: 960,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 781,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }

    ]
});

$(".single__box").click(function () {
    var link = window.location.origin + window.location.pathname;
    var tab = $(this).data('tab');
    var index = $(this).index();
    $(".single__box").removeClass("single__box--active").eq(index).addClass("single__box--active");
    $(".single__item").hide().eq(index).show();
     $(".services__wrap").hide().eq(index).show()
    history.pushState({slug: tab, index: index}, '', link + '?way=' + tab);
});

$(window).on('popstate', function(e) {
    index = history.state.index;

    $(".single__box").removeClass("single__box--active").eq(index).addClass("single__box--active");
    $(".single__item").hide().eq(index).show();
});

function changeElem() {

    let boxes = $('[data-mobile]');

    boxes.each((idx, box) => {
        if ($(window).width() <= 780) {
            $(box).html($(box).data('mobile'));
        } else {
            $(box).html($(box).data('desktop'));
        }

    })
}

changeElem();

if (document.querySelectorAll('.stages__elem').length > 0) {
    // ???????????????? ???????????? ??????????????
    var elements = document.querySelectorAll('.stages__first, .stages__elem');
    var isResizeble = false;

    var Visible = function (target) {
        // ?????? ?????????????? ????????????????
        var targetPosition = {
                top: window.pageYOffset + target.getBoundingClientRect().top,
                left: window.pageXOffset + target.getBoundingClientRect().left,
                right: window.pageXOffset + target.getBoundingClientRect().right,
                bottom: window.pageYOffset + target.getBoundingClientRect().bottom
            },
            // ???????????????? ?????????????? ????????
            windowPosition = {
                top: window.pageYOffset,
                left: window.pageXOffset,
                right: window.pageXOffset + document.documentElement.clientWidth,
                bottom: window.pageYOffset + document.documentElement.clientHeight
            };



        if (targetPosition.bottom > windowPosition.top && // ???????? ?????????????? ???????????? ?????????? ???????????????? ???????????? ?????????????? ?????????????? ?????????? ????????, ???? ?????????????? ?????????? ????????????
            targetPosition.top < windowPosition.bottom && // ???????? ?????????????? ?????????????? ?????????? ???????????????? ???????????? ?????????????? ???????????? ?????????? ????????, ???? ?????????????? ?????????? ??????????
            targetPosition.right > windowPosition.left && // ???????? ?????????????? ???????????? ?????????????? ???????????????? ???????????? ?????????????? ?????????? ?????????? ????????, ???? ?????????????? ?????????? ??????????
            targetPosition.left < windowPosition.right) { // ???????? ?????????????? ?????????? ?????????????? ???????????????? ???????????? ?????????????? ???????????? ?????????? ????????, ???? ?????????????? ?????????? ????????????
            // ???????? ?????????????? ?????????????????? ??????????, ???? ?????????????????? ?????????????????? ??????

            console.log('???? ???????????? ?????????????? :)');
            target.classList.add('active');

        } else {
            target.classList.remove('active');
        }

    }

    // ?????????????????? ?????????????? ?????? ?????????????????? ????????????????
    window.addEventListener('scroll', function () {
        for (let elem of elements) {
            Visible(elem);
        }
    });

    // ?? ?????????? ???????????????? ?????????????? ??????????. ?? ???? ??????????, ?????????????? ???????????????????? ??????????

    for (let elem of elements) {
        Visible(elem);
    }

}

function validate(input, length, regExp, error, phone) {

    $(input).on('blur keyup', function () {
        var value = $(this).val();
        var that = $(this);

        regExp = regExp == '' ? /./ : regExp;

        if (phone === true) {
            bool_reg = !regExp.test(value);
        } else {
            bool_reg = regExp.test(value);
        }

        if (value.length > length && value !== '' && bool_reg) {
            that.removeClass('form-fail').addClass('form-done');
            $(error).slideUp();
        } else {
            that.removeClass('form-done').addClass('form-fail');
            $(error).slideDown();
        }
    });

}

// ?????????????????????? ???????????? ???????? ???????? ???????? ?? ??????????????

function disBtn(input, btn) {
    var input = $(input);
    input.on('blur keyup', function () {

        if (input.hasClass('form-fail')) {
            $(btn).attr('disabled', 'disabled');
        } else {
            $(btn).removeAttr('disabled');
        }

    });

}

// ?????? ???????????????? ?????? ??????????????

function valClick(input, length, regExp, error, btn, phone) {
    var value = $(input).val();

    regExp = regExp == '' ? /./ : regExp;

    if (phone === true) {
        bool_reg = regExp.test(value);
    } else {
        bool_reg = !regExp.test(value);
    }

    if (value.length < length && value === '' && bool_reg) {
        $(input).addClass('form-fail');
        $(error).slideDown();
    }
}

//  ?????????????????????? ???????????? ?????? ??????????????

function disBtnClick(input, btn) {
    var input = $(input);

    if (input.hasClass('form-fail')) {
        $(btn).attr('disabled', 'disabled');
        return false;
    } else {
        return true;
    }

}

$('input[type="tel"]').mask("+38 (999) 999-99-99");

var regName = /^[\D]+/i;
var regEmail = /[-.\w]+@[-.\w]+\.[-.\w]+/i;
var regPhone = /[_]/i;
// ???????????? ??????????????????????????

// validate('#m_name', 1, regName, '.main-footer__fail-name');
// validate('#m_email', 1, regEmail, '.main-footer__fail-email');
// validate('#m_phone', 1, regPhone, '.main-footer__fail-phone', true);
// disBtn('#m_name, #m_email, #m_phone', '.main-footer__btn');

// $('.main-footer__btn').on('click', function() {
//     var name = $('#m_name').val();
//     var email = $('#m_email').val();
//     var phone = $('#m_phone').val();

//     valClick('#m_name', 1, regName, '.main-footer__fail-name');
//     valClick('#m_email', 1, regEmail, '.main-footer__fail-email');
//     valClick('#m_phone', 1, regPhone, '.main-footer__fail-phone', true);
//     var btn_bool = disBtnClick('#m_name, #m_email, #m_phone', '.main-footer__btn');

//     if( btn_bool ) {
//         $.ajax({
//             url: myajax.url,
//             type: 'POST',
//             data: {
//                 action: 'contact',
//                 name: name,
//                 email: email,
//                 phone: phone,
//             },
//         }).done(function(data) {
//             $('#m_name, #m_email, #m_phone').val('').removeClass('form-done');
//             var text = "???????? ???????????????????????? ?????????????? ??????????????????????!";

//             $('.msg-modal').html(text).addClass('msg-modal-active');
//             setTimeout(function() {
//                 $('.msg-modal').removeClass('msg-modal-active');
//             }, 2500); 
//         });
//     }
//     return false;
// });

function validation(options) {
    let inputs = options.inputs;
    let btn = options.button;
    let msg = options.msg;
    let ajax = options.ajax;
    let click = false;
    let check = [];
    let data = {action: ajax.action};
    let first_check = true;
    let clear = new Set();

    $(btn).on('click', function() {
        click = true;
        validate();
        return false;
    });

    for(let key in inputs) {
        $(inputs[key].id).on('input blur', function() {
            isValid(inputs[key]);
            activeBtn();
        });
    }

    function activeBtn() {
        let checkBtn = [];
        for(let key in inputs) {
            let value = $(inputs[key].id).val();

            if(value !== '') {
                checkBtn.push(true)
            } else {
                checkBtn.push(false);
            }
        }

        if(checkBtn.indexOf(false) === -1) {
            $(btn).removeAttr('disabled');
        } else {
            $(btn).attr('disabled', 'disabled');
        }
    }
    
    function isValid(input) {
        let el = $(input.id);
        let value = el.val();
        data[el.attr('name')] = value;

        if(first_check) {
            clear.add(input.id);
        }
        
        if(input.validate && click) {
            let regExp = input.regExp == '' ? /./ : input.regExp;
            let checkInput = [];

            if(input.phone === true) {
                checkInput.push( !regExp.test(value) );
            } else {
                checkInput.push( regExp.test(value) )
            }

            if(value.length >= input.minLength && value !== '') {
                checkInput.push(true)
            } else {
                checkInput.push(false);
            }

            if(checkInput.indexOf(false) === -1) {
                $(el).removeClass('form-fail').addClass('form-done');
                $(input.error).slideUp();
                check.push(true);
            } else {
                $(el).addClass('form-fail').removeClass('form-done');
                $(input.error).slideDown();
                check.push(false);
            }
        }
    }

    function validate() {
        check = [];

        for(let key in inputs) {
            isValid(inputs[key]);
        }

        first_check = false; 

        if(check.indexOf(false) === -1) {
            $.ajax({
                url: ajax.url,
                type: 'POST',
                data: data,
            }).done(function(data) {
                $(Array.from(clear).join(',')).val('').removeClass('form-done');

                $('.msg-modal').html(msg).addClass('msg-modal-active');
                setTimeout(function() {
                    $('.msg-modal').removeClass('msg-modal-active');
                }, 2500); 
            });
        }
    }
}

validation({
    inputs: [
        {
            id: '#m_name',
            minLength: 1, 
            regExp: regName,
            error: '.main-footer__fail-name',
            validate: true
        },
        {
            id: '#m_email',
            minLength: 1, 
            regExp: regEmail,
            error: '.main-footer__fail-email',
            validate: true
        },
        {
            id: '#m_phone',
            minLength: 1, 
            regExp: regPhone,
            phone: true,
            error: '.main-footer__fail-phone',
            validate: true
        },
    ],
    button: '.main-footer__btn',
    msg: '???????? ???????????????????????? ?????????????? ??????????????????????!',
    ajax: {
        action: 'contact',
        url: myajax.url
    }
});

});
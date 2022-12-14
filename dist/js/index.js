$(document).ready(function(){
  $('.galery__slydes').slick({
    speed: 1200,
    adaptiveHeight: true,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true,
    prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrow_left.svg"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="icons/arrow_right.svg"></button>'
  });

  $('.experiments__galery').slick({
    dots: false,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrow_left_dark.svg"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="icons/arrow_right_dark.svg"></button>'
  });

   // smooth scroll and pageup
   $(window).scroll(function() {
    if($(this).scrollTop() > 1200) {
      $(".pageup").fadeIn();
    }
    else {
      $(".pageup").fadeOut();
    }

    if($(this).scrollTop() > 400 && window.matchMedia('(max-width: 950px)').matches) {
      $(".header__nav-logo").fadeIn();
    }
    else {
      $(".header__nav-logo").fadeOut();
    }

  });

    // modal windows
    $("[data-modal=order-pic]").on("click", function() {
      $(".overlay, #order").fadeIn("slow");
    });
    $(".modal__close").on("click", function() {
      $("form").trigger("reset");
      $(".overlay, #order, #thanks").fadeOut("slow");
    });

    function valideForms(form) {
      $(form).validate({
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          contact: {
            required: true,
            minlength: 2
          }
        },
        messages: {
          name: {
            required: "Пожалуйста, представьтесь",
            minlength: jQuery.validator.format("Введите минимум {0} символа!")
          },
          contact: {
            required: "Пожалуйста, как с вами связаться?",
            minlength: jQuery.validator.format("Не реально короткий контакт!")
          }
        }
      });
    };
  
    valideForms("#order-form");
  

    $("form").submit(function(e) {
      e.preventDefault();
  

      $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
      }).done(function() {
        $(this).find("input").val("");
        $(this).find("textaria").val("");

        $("#order").fadeOut();
        $(".overlay, #thanks").fadeIn("slow");
  
        $("form").trigger("reset");
      });
      return false;
    });


  tippy('#tippy-mail', {
    content: 'Это просто иконка! Адрес скопируй и напиши мне со своей почты, но удобней нажать кнопку Заказать!'
  });
  
  tippy('#tippy-telegram', {
    content: 'Это просто иконка! Найди меня в телеграм по нику, но можно нажать кнопку Заказать!'
  });
  
  //burger menu
  const menu = document.querySelector('.header__nav-list-burger'),
    menuItem = document.querySelectorAll('.header__nav-item'),
    hamburger = document.querySelector('.header__burger');
  
  hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('header__burger_active');
      menu.classList.toggle('header__nav-list-burger_active');
  });

  menuItem.forEach(item => {
      item.addEventListener('click', () => {
          hamburger.classList.toggle('header__burger_active');
          menu.classList.toggle('header__nav-list-burger_active');
      });
  });


  //picture zoom modal

  const iconZoomPlus = document.querySelectorAll(".galery__zoom-plus");
    
  iconZoomPlus.forEach((item) => {
    item.addEventListener("click", (e) => {
      const pic = e.target.previousElementSibling.querySelector("img").getAttribute("src");
      const modalPic = document.createElement("div");
      modalPic.innerHTML = `
      <div class="overlay overlay-active" data-zoomPic>
        <div class="picture-modal">
          <img class="pic-contain" src="${pic}">
          <img class="zoom-off" src="icons/zoom_search_minus.png" alt="кнопка возврата к нормальному размеру картинки">
        </div>
      </div>
      `;
      document.body.append(modalPic);
      document.body.style.overflow = "hidden";
  
      const iconZoomOff = document.querySelector(".zoom-off");
      iconZoomOff.addEventListener("click", (e) => {
        modalPic.remove();
        document.body.style.overflow = "";
      });
    });
  });

  

  









});




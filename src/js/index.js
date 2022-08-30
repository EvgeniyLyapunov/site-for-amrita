$(document).ready(function(){
  $('.galery__slydes').slick({
    speed: 1200,
    adaptiveHeight: true,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true,
    // dots: true,
    // infinite: true,
    // speed: 500,
    // fade: true,
    // cssEase: 'linear',
    prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrow_left.svg"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="icons/arrow_right.svg"></button>'
  });

   // smooth scroll and pageup
   $(window).scroll(function() {
    if($(this).scrollTop() > 1600) {
      $(".pageup").fadeIn();
    }
    else {
      $(".pageup").fadeOut();
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
});


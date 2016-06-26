/* ===========================================================
 * jquery-subscribe-better.js v1
 * ===========================================================
 * Copyright 2014 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 *
 * Create a better, highly customizable subscription modal or
 * newsletter signup window with jQuery Subscribe Better
 *
 * https://github.com/peachananr/subscribe-better
 *
 * ========================================================== */

!function($){

  var defaults = {
    trigger: "atendpage", // atendpage | onload | onidle
    animation: "fade", // fade | flyInRight | flyInLeft | flyInUp | flyInDown
    delay: 0,
    showOnce: true,
    autoClose: false,
    scrollableModal: false
	};

  $.fn.subscribeBetter = function(options){
    var settings = $.extend({}, defaults, options),
        el = $(this),
        shown = false,
        animating = false;

    el.addClass("sb");

    $.fn.openWindow = function() {
      var el = $(this);
      if(el.is(":hidden") && shown == false && animating == false) {
        shown = true;
        el.fancybox({
          autoScale: true,
          autoDimensions: true,
          centerOnScroll: settings.scrollableModal
        }).trigger('click');

      }
    }

    $.fn.closeWindow = function() {
      $.fancybox.close();
    }

    $.fn.scrollDetection = function (trigger, onDone) {
      var t, l = (new Date()).getTime();

      $(window).scroll(function(){
          var now = (new Date()).getTime();

          if(now - l > 400){
              $(this).trigger('scrollStart');
              l = now;
          }

          clearTimeout(t);
          t = setTimeout(function(){
              $(window).trigger('scrollEnd');
          }, 300);
      });
      if (trigger == "scrollStart") {
        $(window).bind('scrollStart', function(){
          $(window).unbind('scrollEnd');
          onDone();
        });
      }

      if (trigger == "scrollEnd") {
        $(window).bind('scrollEnd', function(){
          $(window).unbind('scrollStart');
          onDone();
        });
      }
    }

    switch(settings.trigger) {
      case "atendpage":
        $(window).scroll(function(){
          var yPos = $(window).scrollTop();
          if (yPos >= ($(document).height() - $(window).height()) ) {
            el.openWindow();
          } else {
            if (yPos + 300 < ($(document).height() - $(window).height()) ) {
              if(settings.autoClose == true) {
                el.closeWindow();
              }
            }
          }

        });
        break;
      case "onload":

        $(window).load(function(){
          el.openWindow();
          if(settings.autoClose == true) {
            el.scrollDetection("scrollStart", function() {
              el.closeWindow();
            });

          }
        });

        break;
      case "onidle":

        $(window).load(function(){
          el.scrollDetection("scrollEnd", function() {
            el.openWindow();
          });

          if(settings.autoClose == true) {
              el.scrollDetection("scrollStart", function() {
                el.closeWindow();
              });
          }
        });

        break;
    }


  }

}(window.jQuery);

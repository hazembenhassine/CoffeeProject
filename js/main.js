var ww,wh,ws;

var pageNavHover = false;
var pageNavClick = false;

var pushStateTo;

function us() {
  ww = $(window).width();
  wh = $(window).height();
  ws = $(window).scrollTop();
}

function deactivate_activate(item, indexNo) {
  $('.' + item + '.this-active').removeClass('this-active');
  $('.' + item + '[data-id="' + indexNo + '"]').addClass('this-active');
}

function isInViewport() {
  $('.js-reveal:not(.reveal)').each(function(){
    var elementTop = $(this).offset().top;
    var viewportBottom = ws + wh;
    if (ww >= 992) {
      var triggerPos = viewportBottom - wh*0.1;
    } else {
      var triggerPos = viewportBottom - 40;
    }
    if ( elementTop < triggerPos) {
      $(this).addClass('reveal');
    }
  });
}


function stick_page_left() {
  if ($('.js-page-left').length > 0 && ww >= 992) {
    setTimeout(function(){
      var triggerPos = $('.js-page-right').outerHeight() - wh;
      var triggerBgPos = $('.js-page-right').outerHeight() - wh/2;
      $('.js-page-left').toggleClass('unstick', ws >= triggerPos);
      $(window).on('scroll', function(){
        $('.js-page-left').toggleClass('unstick', ws >= triggerPos && $('.js-page-left').length > 0 && ww > 768);
        $('.breadcrumb:not(.breadcrumb--shop)').toggleClass('grad', ws >= triggerPos && $('.js-page-left').length > 0 && ww > 768);
      });
    }, 100);
  }
}

function handle_page_nav() {
  $('.js-section').unbind();
  console.log($('.js-section').length);
  if ($('.js-section').length > 0 && ww >= 992) {
    $('.js-section').each(function(){
      var triggerPos = $(this).offset().top + wh*0.28 - wh*0.85;
      var sectionIndex = $(this).attr('data-id');
      if ( $(this).hasClass('page-section--full') ) {
        var lastIndex = $(this).attr('data-id');
      }
      $(window).on('scroll', function(){
        var activeMediaIndex = $('.page-left__media.this-active').attr('data-id');

        if (ws >= triggerPos && pageNavHover == false && pageNavClick == false) {

          var data_href = $('.js-section[data-id="'+sectionIndex+'"]').attr('data-href');
          var data_headerTitle = $('.js-section[data-id="'+sectionIndex+'"]').attr('data-headerTitle');
          clearTimeout(pushStateTo);
          pushStateTo = setTimeout(function() {
            // www_update_state(data_href);
            if(data_headerTitle) {
              // www_update_header_title(data_headerTitle);
            }
          }, 150);

          deactivate_activate('js-section',sectionIndex);
          deactivate_activate('page-nav__no',sectionIndex);
          deactivate_activate('page-nav__lbl',sectionIndex);
          $('.page-nav__lbl').css({opacity: '0'});
          $('.page-nav__lbl.this-active').css({opacity: '1'});
        }
        if (ws >= triggerPos && sectionIndex != lastIndex && sectionIndex != activeMediaIndex) {
          deactivate_activate('page-left__media',sectionIndex);
        }
      });
    });
  } else if (ww < 992) {
    console.log("test");
    $('.js-section').each(function(){
      var triggerPos = $(this).offset().top - 58;
      var sectionIndex = $(this).attr('data-id');
      $(window).on('scroll', function(){
        if (ws >= triggerPos) {
          $('.m-page-nav__select:not(.m-page-filter)').val(sectionIndex);
        }
      });
    });
  }
}

function on_scroll() {
  $(window).on('scroll', function() {
    us();
    isInViewport();
    $('.breadcrumb:not(.breadcrumb--shop)').toggleClass('grad', ww <= 768 && ws >= ww);
    $('.scroll-btn').toggleClass('this-hide', ww >= 992 && ws >= wh*0.35);
  });
}


us();
stick_page_left();
isInViewport();
on_scroll();
handle_page_nav();

/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/

function wrap (element,fontawesomeClass,social,type) {
  type = type !== undefined ? type : "";
  var link = $('<a/>');
  link.attr('href', type + social);
  link.text(social);
  var icon = $('<i/>')
  icon.attr('class', fontawesomeClass);
  link.prepend(icon);
  element.append(link);
}

function inview(element)
{
 var hT = element.offset().top,
 hH = element.outerHeight(),
 wH = $(window).height(),
 wS = $(this).scrollTop();    
 if (wS > (hT+hH-wH)){
  return true;
}
return false;
}

function animateSkill(element)
{
  element.find('.skillbar').each(function(){
    var container = jQuery(this);
    container.find('.skillbar-bar').animate({
      width:container.attr('data-percent')
    },2000,function(){
      container.find('.skill-bar-percent').fadeIn();
    });
  });
}
jQuery(document).ready(function($) {

  jQuery(window).scroll(function() {
    if(inview(jQuery('.skill-lang')))
    {
      animateSkill(jQuery('.skill-lang'));
    }
    if(inview(jQuery('.skill-api')))
    {
      animateSkill(jQuery('.skill-api'));
    }
    if(inview(jQuery('.skill-os')))
    {
      animateSkill(jQuery('.skill-os'));
    }
  });


  $('ul.social li').click(function(e) 
  { 
    var classname = $(this).find("i").attr('class');
    var span = $('span.social-links');
    span.empty();
    if(classname.indexOf("facebook") > -1)
    {
      wrap(span,classname,"https://www.facebook.com/naveedmurtuza");
    }
    else if(classname.indexOf("stack-overflow") > -1)
    {
      wrap(span,classname,"http://stackoverflow.com/users/722965/naveed-quadri");
    }
    else if(classname.indexOf("twitter") > -1)
    {
      wrap(span,classname,"https://www.twitter.com/naveedquadri");
    }
    else if(classname.indexOf("google") > -1)
    {
      wrap(span,classname,"naveedmurtuza@gmail.com","mailto:");
    }
    else if(classname.indexOf("linkedin") > -1)
    {
      wrap(span,classname,"https://sa.linkedin.com/in/naveedquadri");
    }
    else if(classname.indexOf("github") > -1)
    {
      wrap(span,classname,"https://www.github.com/naveedmurtuza");
    }
    else if(classname.indexOf("skype") > -1)
    {
      wrap(span,classname,"naveedmurtuza","callto:");
    }
    $( span).animate({opacity: 1}, 700);
    e.preventDefault();
  });

/*----------------------------------------------------*/
/* FitText Settings
------------------------------------------------------ */

setTimeout(function() {
  $('h1.responsive-headline').fitText(1, { minFontSize: '40px', maxFontSize: '90px' });
}, 100);


/*----------------------------------------------------*/
/* Smooth Scrolling
------------------------------------------------------ */

$('.smoothscroll').on('click',function (e) {
 e.preventDefault();

 var target = this.hash,
 $target = $(target);

 $('html, body').stop().animate({
   'scrollTop': $target.offset().top
 }, 800, 'swing', function () {
   window.location.hash = target;
 });
});


/*----------------------------------------------------*/
/* Highlight the current section in the navigation bar
------------------------------------------------------*/

var sections = $("section");
var navigation_links = $("#nav-wrap a");

sections.waypoint({

  handler: function(event, direction) {

   var active_section;

   active_section = $(this);
   if (direction === "up") active_section = active_section.prev();

   var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');

   navigation_links.parent().removeClass("current");
   active_link.parent().addClass("current");

 },
 offset: '35%'

});


/*----------------------------------------------------*/
/*	Make sure that #header-background-image height is
/* equal to the browser height.
------------------------------------------------------ */

$('header').css({ 'height': $(window).height() });
$(window).on('resize', function() {

  $('header').css({ 'height': $(window).height() });
  $('body').css({ 'width': $(window).width() })
});


/*----------------------------------------------------*/
/*	Fade In/Out Primary Navigation
------------------------------------------------------*/

$(window).on('scroll', function() {

  var h = $('header').height();
  var y = $(window).scrollTop();
  var nav = $('#nav-wrap');

  if ( (y > h*.20) && (y < h) && ($(window).outerWidth() > 768 ) ) {
   nav.fadeOut('fast');
 }
 else {
   if (y < h*.20) {
    nav.removeClass('opaque').fadeIn('fast');
  }
  else {
    nav.addClass('opaque').fadeIn('fast');
  }
}

});


/*----------------------------------------------------*/
/*	Modal Popup
------------------------------------------------------*/

$('.item-wrap a').magnificPopup({

 type:'inline',
 fixedContentPos: false,
 removalDelay: 200,
 showCloseBtn: false,
 mainClass: 'mfp-fade'

});

$(document).on('click', '.popup-modal-dismiss', function (e) {
  e.preventDefault();
  $.magnificPopup.close();
});


/*----------------------------------------------------*/
/*	Flexslider
/*----------------------------------------------------*/
$('.flexslider').flexslider({
  namespace: "flex-",
  controlsContainer: ".flex-container",
  animation: 'slide',
  controlNav: true,
  directionNav: false,
  smoothHeight: true,
  slideshowSpeed: 7000,
  animationSpeed: 600,
  randomize: false,
});

/*----------------------------------------------------*/
/*	contact form
------------------------------------------------------*/

$('form#contactForm button.submit').click(function() {

  $('#image-loader').fadeIn();

  var contactName = $('#contactForm #contactName').val();
  var contactEmail = $('#contactForm #contactEmail').val();
  var contactSubject = $('#contactForm #contactSubject').val();
  var contactMessage = $('#contactForm #contactMessage').val();

  var data = 'contactName=' + contactName + '&contactEmail=' + contactEmail +
  '&contactSubject=' + contactSubject + '&contactMessage=' + contactMessage;

  $.ajax({

   type: "POST",
   url: "inc/sendEmail.php",
   data: data,
   success: function(msg) {

            // Message was sent
            if (msg == 'OK') {
             $('#image-loader').fadeOut();
             $('#message-warning').hide();
             $('#contactForm').fadeOut();
             $('#message-success').fadeIn();   
           }
            // There was an error
            else {
             $('#image-loader').fadeOut();
             $('#message-warning').html(msg);
             $('#message-warning').fadeIn();
           }

         }

       });
  return false;
});


});









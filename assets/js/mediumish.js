jQuery(document).ready(function(a){var n;a('a.smoothscroll[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(t){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var n=a(this.hash);(n=n.length?n:a("[name="+this.hash.slice(1)+"]")).length&&(t.preventDefault(),a("html, body").animate({scrollTop:n.offset().top},1e3,function(){var t=a(n);if(t.focus(),t.is(":focus"))return!1;t.attr("tabindex","-1"),t.focus()}))}});var e=0,o=a("nav").outerHeight();a(window).scroll(function(t){n=!0}),setInterval(function(){n&&(!function(){var t=a(this).scrollTop();a(".brandrow").css("height");if(Math.abs(e-t)<=5)return;e<t&&o<t?(a("nav").removeClass("nav-down").addClass("nav-up"),a(".nav-up").css("top",-a("nav").outerHeight()+"px")):t+a(window).height()<a(document).height()&&(a("nav").removeClass("nav-up").addClass("nav-down"),a(".nav-up, .nav-down").css("top","0px"));e=t}(),n=!1)},250),a(".site-content").css("margin-top",a("header").outerHeight()+"px")});
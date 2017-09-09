"use strict";

var ScrollLinks = {
  scrollAnimation: null,
  init: function init(selector) {
    var _this = this;

    var links = document.querySelectorAll(selector);

    links.forEach(function (link) {
      return link.addEventListener("click", function (e) {
        var href = this.getAttribute("href");

        if (!href.startsWith("#")) return;
        e.preventDefault();

        if (href === "#") ScrollLinks.to(0); else ScrollLinks.to(href);

        history.replaceState(null, null, href);
      });
    });

    var pause = function pause() {
      return _this.scrollAnimation && _this.scrollAnimation.pause();
    };
    window.addEventListener("wheel", pause);
    window.addEventListener("touchstart", pause);
  },
  to: function to(selectorOrNumber) {
    var scrollTop = 0;

    if (typeof selectorOrNumber === "number") {
      scrollTop = selectorOrNumber;
    } else {
      var element = document.querySelector(selectorOrNumber);
      scrollTop = scrollY + element.getBoundingClientRect().top;
    }

    this.scrollAnimation = anime({
      targets: [document.body, document.documentElement],
      scrollTop: scrollTop,
      duration: 600,
      easing: "easeInOutQuart"
    });
  }
};

ScrollLinks.init(".js-scroll-to");


const typeWriter = selector => {
  const el = document.querySelector(selector)
  const text = el.innerText

    ; (function _type(i = 0) {
      if (i === text.length) return

      el.innerHTML =
        text.substring(0, i + 1) + '<span aria-hidden="true"></span>'
      setTimeout(() => _type(i + 1), 100)
    })()
}

// typeWriter(".js-type-writer")

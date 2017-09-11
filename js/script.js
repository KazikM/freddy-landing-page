"use strict"

var ScrollLinks = {
  scrollAnimation: null,
  init: function init(selector) {
    var _this = this

    var links = document.querySelectorAll(selector)
    ;[].forEach.call(links, function(link) {
      return link.addEventListener("click", function(e) {
        var href = this.getAttribute("href")

        if (href[0] !== "#") return
        e.preventDefault()

        if (href === "#") ScrollLinks.to(0)
        else ScrollLinks.to(href)

        history.replaceState(null, null, href)
      })
    })

    var pause = function pause() {
      return _this.scrollAnimation && _this.scrollAnimation.pause()
    }
    window.addEventListener("wheel", pause)
    window.addEventListener("touchstart", pause)
  },
  to: function to(selectorOrNumber) {
    var scrollTop = 0

    if (typeof selectorOrNumber === "number") {
      scrollTop = selectorOrNumber
    } else {
      var element = document.querySelector(selectorOrNumber)
      scrollTop =
        (window.scrollY || document.documentElement.scrollTop) +
        element.getBoundingClientRect().top
    }

    this.scrollAnimation = anime({
      targets: [document.body, document.documentElement],
      scrollTop: scrollTop,
      duration: 600,
      easing: "easeInOutQuart"
    })
  }
}

ScrollLinks.init(".js-scroll-to")

// const typeWriter = selector => {
//   const el = document.querySelector(selector)
//   const text = el.innerText

//     ; (function _type(i = 0) {
//       if (i === text.length) return

//       el.innerHTML =
//         text.substring(0, i + 1) + '<span aria-hidden="true"></span>'
//       setTimeout(() => _type(i + 1), 100)
//     })()
// }

// typeWriter(".js-type-writer")

var textarea = document.querySelector("textarea")

textarea.addEventListener("keydown", function() {
  var el = this
  setTimeout(function() {
    el.style.padding = "0"
    el.style.height = el.scrollHeight + "px"
  }, 0)
})

var observePosition = function observePosition(_ref) {
  var collapse = _ref.collapse
  var elements = _ref.elements
  var onChange = _ref.onChange

  var supportsIO = window.IntersectionObserver !== undefined
  var destroy = undefined

  elements = [].map.call(elements, function(el) {
    return el
  })

  if (supportsIO) {
    ;(function() {
      var observe = function observe(entries) {
        return entries.forEach(function(entry) {
          var isVisible = entry.intersectionRatio > 0.5

          onChange(entry.target, isVisible)
          if (isVisible && !collapse) io.unobserve(entry.target)
        })
      }

      var io = new IntersectionObserver(observe, { threshold: 0.5 })
      elements.forEach(function(el) {
        return io.observe(el)
      })

      destroy = function destroy() {
        return elements.forEach(function(el) {
          return io.unobserve(el)
        })
      }
    })()
  } else {
    ;(function() {
      var windowHeight = window.innerHeight || document.body.clientHeight
      var isVisible = function isVisible(el) {
        var BCR = el.getBoundingClientRect()
        var margin = BCR.height / 2
        var bottom = BCR.top < windowHeight - margin
        var top = BCR.top > margin - BCR.height

        return bottom && top
      }

      var observe = function observe() {
        return elements.forEach(function(el) {
          var _isVisible = isVisible(el)
          onChange(el, _isVisible)

          if (_isVisible && !collapse) {
            ;(function() {
              var indexToRemove = elements.indexOf(el)
              elements = elements.filter(function(_, i) {
                return i !== indexToRemove
              })
            })()
          }
        })
      }

      observe()
      window.addEventListener("scroll", observe)

      destroy = function destroy() {
        return window.removeEventListener("scroll", observe)
      }
    })()
  }

  return { destroy: destroy }
}

observePosition({
  collapse: false,
  elements: document.querySelectorAll(".js-reveal"),
  onChange: function onChange(element, isVisible) {
    isVisible && element.classList.add("js-visible")
  }
})

var form = document.querySelector("#contact-form")
var btn = form.querySelector("[type='submit']")

btn.addEventListener("click", function(e) {
  if (!form.checkValidity()) return
  e.preventDefault()
  grecaptcha.execute()
})

var sendForm = function sendForm() {
  return fetch(form.action, { method: "POST", body: new FormData(form) })
    .then(function(res) {
      return res.json()
    })
    .then(onResponse)
    .catch(onResponse)
}

var onResponse = function onResponse(res) {
  res.success && form.reset()
  showMessage(res)
  grecaptcha.reset()
}

var showMessage = function showMessage(success) {
  var el = success
    ? document.querySelector(".success-message")
    : document.querySelector(".error-message")

  el.style.height = el.scrollHeight + "px"
}

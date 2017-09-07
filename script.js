const arrow = document.querySelector('.js-scroll')
const content = document.querySelector('#experience')

arrow.addEventListener('click', () => {
  content.scrollIntoView({ behavior: "smooth" })
})

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

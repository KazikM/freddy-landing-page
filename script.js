const arrow = document.querySelector('.js-scroll-arrow')
const experience = document.querySelector('#experience')
const meetBtn = document.querySelector('.js-scroll-btn')
const meetFreddy = document.querySelector('#meet-freddy')

arrow.addEventListener('click', () => {
  experience.scrollIntoView({ behavior: "smooth" })
})

meetBtn.addEventListener('click', () => {
  meetFreddy.scrollIntoView({ behavior: "smooth" })
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

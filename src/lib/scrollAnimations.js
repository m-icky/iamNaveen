import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initTextReveal(selector, trigger) {
  const elements = document.querySelectorAll(selector)
  elements.forEach((el) => {
    gsap.from(el, {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: trigger || el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })
  })
}

export function initParallax(selector, speed = 0.5) {
  const elements = document.querySelectorAll(selector)
  elements.forEach((el) => {
    gsap.to(el, {
      yPercent: -20 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  })
}

export function scrollVideoInit(videoEl, triggerEl) {
  if (!videoEl || !videoEl.duration) return null
  videoEl.pause()
  videoEl.currentTime = 0

  return ScrollTrigger.create({
    trigger: triggerEl,
    start: 'top top',
    end: 'bottom+=2000 top',
    scrub: 1,
    onUpdate: (self) => {
      if (isFinite(videoEl.duration)) {
        videoEl.currentTime = videoEl.duration * self.progress
      }
    },
  })
}

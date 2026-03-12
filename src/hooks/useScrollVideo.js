import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollVideo(triggerSelector = '.hero-section') {
  const videoRef = useRef(null)
  const stRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.pause()
    video.currentTime = 0

    const setup = () => {
      if (!isFinite(video.duration) || video.duration === 0) return

      stRef.current = ScrollTrigger.create({
        trigger: triggerSelector,
        start: 'top top',
        end: 'bottom+=2000 top',
        scrub: 1,
        onUpdate: (self) => {
          video.currentTime = video.duration * self.progress
        },
      })
    }

    if (video.readyState >= 1) {
      setup()
    } else {
      video.addEventListener('loadedmetadata', setup, { once: true })
    }

    return () => {
      stRef.current?.kill()
    }
  }, [triggerSelector])

  return videoRef
}

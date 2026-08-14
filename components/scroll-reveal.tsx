'use client'

import { useEffect } from 'react'

/**
 * ScrollReveal is a global observer that watches for elements with the
 * `reveal` class and adds `reveal-visible` when they enter the viewport.
 * Element-level stagger is handled via `.reveal-delay-*` classes.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    const elements = document.querySelectorAll('.reveal')
    elements.forEach((el) => observer.observe(el))

    // Also observe elements added dynamically after initial render
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            if (node.classList?.contains('reveal')) {
              observer.observe(node)
            }
            node.querySelectorAll?.('.reveal').forEach((el) => observer.observe(el))
          }
        })
      })
    })

    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  return null
}


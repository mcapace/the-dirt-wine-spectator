/** Inbox for “submit your story” / winery interest (navbar, hero, closing CTA). */
export const SUBMIT_STORY_EMAIL = 'ebain@mshanken.com' as const

const SUBJECT = 'The Dirt - Winery Story Submission'

const BODY = `Hi,

I'm interested in sharing my winery's story for The Dirt video series.

Winery Name:
Location:
Contact Information:

I'd love to discuss how we can showcase our unique terroir and winemaking story through your vertical video format.

Best regards,
[Your Name]`

/** Full mailto URL for use in <a href>, Mail apps, etc. */
export function getSubmitStoryMailtoHref(): string {
  const subject = encodeURIComponent(SUBJECT)
  const body = encodeURIComponent(BODY)
  return `mailto:${SUBMIT_STORY_EMAIL}?subject=${subject}&body=${body}`
}

/**
 * Opens the default mail client without navigating the app tab to `mailto:`.
 * `location.assign(mailto:…)` unloads the SPA and is unreliable; a real link click
 * does not replace the page URL in most browsers.
 */
export function openSubmitStoryMailto(): void {
  if (typeof document === 'undefined') return
  const href = getSubmitStoryMailtoHref()
  const a = document.createElement('a')
  a.href = href
  a.setAttribute('aria-hidden', 'true')
  a.tabIndex = -1
  a.style.cssText = 'position:fixed;left:-9999px;top:0;'
  document.body.appendChild(a)
  a.click()
  a.remove()
}

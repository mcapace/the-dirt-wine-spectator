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
 * Opens the default mail client. Avoids `window.open(..., '_blank')`, which browsers
 * often block for mailto and prevents the composer from opening.
 */
export function openSubmitStoryMailto(): void {
  if (typeof window === 'undefined') return
  window.location.assign(getSubmitStoryMailtoHref())
}

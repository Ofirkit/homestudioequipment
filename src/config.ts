/**
 * Site-wide settings. Change AMAZON_TAG to your Amazon Associates tracking ID.
 */
export const AMAZON_TAG = 'homemusicequipment-20'; // TODO: replace with your real Associates tag
export const AMAZON_DOMAIN = 'https://www.amazon.com';

export const SITE = {
  name: 'HomeStudioEquipment',
  url: 'https://homestudioequipment.com',
  description:
    'Honest, beginner-friendly reviews and comparisons of home studio gear: audio interfaces, MIDI keyboards, pad controllers, mics, and studio monitors.',
  author: 'Ophir',
  email: 'hello@homestudioequipment.com', // TODO: confirm contact address
  logo: '/favicon.svg',
  /** Default social sharing image (1200x630) for pages without their own. */
  ogImage: '/og-default.png',
} as const;

export const CATEGORIES = [
  { slug: 'audio-interfaces', name: 'Audio Interfaces', blurb: 'Get clean sound in and out of your computer.' },
  { slug: 'midi-keyboards', name: 'MIDI Keyboards', blurb: 'Play melodies, chords, and control your DAW.' },
  { slug: 'pad-controllers', name: 'Pad Controllers', blurb: 'Finger-drum beats and trigger clips.' },
  { slug: 'microphones', name: 'Microphones', blurb: 'Vocals, podcasts, and instruments.' },
  { slug: 'studio-monitors', name: 'Studio Monitors', blurb: 'Hear your mix the way it really is.' },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];

export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);

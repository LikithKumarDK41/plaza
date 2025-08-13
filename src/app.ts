// src/app/config.dynamic.ts (or wherever your config lives)
'use client';

import { getI18n } from '~/lib/i18n.client';

/** Fallbacks used while translations are not loaded or on the server */
const SEO_FALLBACK = {
  name: 'GIFT PLAZA',
  fullName: 'GIFT PLAZA – Digital Gift Card Store',
  slogan: 'A store that brings joy to every celebration.',
  description:
    'Gift Plaza is a modern digital gift card platform built with Next.js and powerful web technologies. It offers a seamless gifting experience with beautifully designed categories for every occasion.',
} as const;

const SYSTEM_TEXT_FALLBACK = {
  repoName: 'Gift Plaza',
  repoOwner: 'Likith Kumar D K',
} as const;

/** Safe translator: returns fallback on server or when key is missing */
function tr(key: string, fallback: string): string {
  // Avoid fetching /locales/* on the server
  if (typeof window === 'undefined') return fallback;
  try {
    const i = getI18n();
    const val = i.t(key);
    return val && val !== key ? val : fallback;
  } catch {
    return fallback;
  }
}

/** === Dynamic, translated text via getters === */
export const SEO_CONFIG = {
  get name() {
    return tr('seo.name', SEO_FALLBACK.name);
  },
  get fullName() {
    return tr('seo.fullName', SEO_FALLBACK.fullName);
  },
  get slogan() {
    return tr('seo.slogan', SEO_FALLBACK.slogan);
  },
  get description() {
    return tr('seo.description', SEO_FALLBACK.description);
  },
};

/** Non-text stays static; text fields use getters */
export const SYSTEM_CONFIG = {
  redirectAfterSignIn: '/dashboard/uploads',
  redirectAfterSignUp: '/dashboard/uploads',
  get repoName() {
    return tr('system.repoName', SYSTEM_TEXT_FALLBACK.repoName);
  },
  get repoOwner() {
    return tr('system.repoOwner', SYSTEM_TEXT_FALLBACK.repoOwner);
  },
  repoStars: true, // optional toggle for GitHub stars display
};

export const ADMIN_CONFIG = {
  displayEmails: false, // Toggle email visibility in admin panel
};

export const DB_DEV_LOGGER = false; // Disable SQL logs in dev

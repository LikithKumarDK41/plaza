// src/lib/i18n.client.ts
'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export type Locale = 'ja' | 'en';
const SUPPORTED: Locale[] = ['ja', 'en'];
const NAMESPACES = ['common'] as const;

let initialized = false;

async function loadNS(lng: Locale, ns: (typeof NAMESPACES)[number]) {
    // Prevent server-side fetch of /locales/*
    if (typeof window === 'undefined') return;

    const res = await fetch(`/locales/${lng}/${ns}.json`, { cache: 'no-store' });
    if (!res.ok) return;
    const data = await res.json();
    // merge = true, overwrite = true
    i18n.addResourceBundle(lng, ns, data, true, true);
}

export async function loadLocale(lng: Locale) {
    if (typeof window === 'undefined') return; // client only
    await Promise.all(NAMESPACES.map((ns) => loadNS(lng, ns)));
    await i18n.changeLanguage(lng);
}

export function getI18n() {
    if (!initialized) {
        i18n.use(initReactI18next).init({
            resources: {},              // load from /public at runtime
            lng: 'ja',                  // default UI language
            fallbackLng: 'en',
            supportedLngs: SUPPORTED,
            ns: NAMESPACES as unknown as string[],
            defaultNS: 'common',
            interpolation: { escapeValue: false },
            react: { useSuspense: false }
        });

        // Kick off initial load only on the client
        if (typeof window !== 'undefined') {
            void loadLocale('ja');
        }

        initialized = true;
    }
    return i18n;
}

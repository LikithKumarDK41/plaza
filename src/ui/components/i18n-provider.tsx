'use client';

import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { getI18n, loadLocale } from '~/lib/i18n.client';

export function I18nProvider({ children }: { children: React.ReactNode }) {
    const i18n = React.useMemo(() => getI18n(), []);
    // optional: preload on mount (already called inside getI18n, but harmless)
    React.useEffect(() => { void loadLocale(i18n.language as 'ja' | 'en'); }, [i18n.language]);
    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

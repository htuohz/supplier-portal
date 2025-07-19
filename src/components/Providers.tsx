'use client';

import { ReactNode } from 'react';
import I18nProvider from './I18nProvider';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return <I18nProvider>{children}</I18nProvider>;
}

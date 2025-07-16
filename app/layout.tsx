import type { Metadata } from 'next'
import './globals.css'
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import React from 'react';
import Script from "next/script";

export const metadata: Metadata = {
  title: 'Monica Botero IPS',
  description: 'Created with v0',
  generator: 'v0.dev',
  icons: {
    icon: '/ico/monica-botero-logo.ico',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Script src="https://static.elfsight.com/platform/platform.js" strategy="lazyOnload" />
        <SessionProviderWrapper>
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}

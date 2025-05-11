import React from 'react';
import { Github } from 'lucide-react';

export const FOOTER_LINKS = [
  {
    label: 'Generate',
    href: '/generate',
  },
  {
    label: 'Analyzer',
    href: '/analyzer',
  },
  {
    label: 'Docs',
    href: '/docs',
  },
  {
    label: 'Examples',
    href: '/examples',
  },
];

export const FOOTER_SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/aBacoding/secure-code-app',
    icon: <Github size={26} />,
  },
];

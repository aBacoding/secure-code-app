import React, { type FC } from 'react';
import { Link } from 'react-router-dom';
import { FOOTER_LINKS, FOOTER_SOCIAL_LINKS } from '@/widgets/footer';

export const Footer: FC = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 py-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">SecuGen</h3>
          <span className="text-muted-foreground text-sm">
            Making code security accessible and manageable for everyone.
            <br />
            &copy; {new Date().getFullYear()} SecuGen. All rights reserved.
          </span>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
          <ul className="space-y-2">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link to={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Connect With Us</h3>
          <ul className="flex space-x-4">
            {FOOTER_SOCIAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  className="hover:opacity-75 transition-opacity duration-300"
                  to={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

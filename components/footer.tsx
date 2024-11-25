import { ArrowUp } from "lucide-react";

import { MaxWidthWrapper } from "./max-width-wrapper";

const footerLinks = [
  { title: "Twitter", href: "#" },
  { title: "Instagram", href: "#" },
];

export const Footer = () => {
  return (
    <footer className="bg-white sm:py-6">
      <MaxWidthWrapper>
        <div className="flex border-t border-gray-200 flex-col items-center gap-8 py-6 text-sm md:justify-between md:flex-row">
          <div className="text-black/80">&copy; 2024. All rights reserved.</div>
          <nav className="flex flex-col items-center gap-8 md:flex-row">
            {footerLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 cursor-pointer text-black/60 hover:text-black/80 transition-colors"
              >
                <span className="font-semibold">{link.title}</span>
                <ArrowUp className="size-4 rotate-45" />
              </a>
            ))}
          </nav>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

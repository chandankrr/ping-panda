import { Check } from 'lucide-react';

import { Heading } from '@/components/heading';
import { MaxWidthWrapper } from '@/components/max-width-wrapper';
import { ShinyButton } from '@/components/shiny-button';

export default function Home() {
  return (
    <>
      <section className="relative py-24 sm:py-32 bg-brand-25">
        <MaxWidthWrapper className="text-center">
          <div className="relative flex flex-col items-center gap-10 mx-auto text-center">
            <div>
              <Heading>
                <span>Real-Time SaaS Insights,</span>
                <br />
                <span className="relative text-transparent bg-gradient-to-r from-brand-700 to-brand-800 bg-clip-text">
                  Delivered to Your Discord
                </span>
              </Heading>
            </div>

            <p className="text-center text-gray-600 text-base/7 max-w-prose text-pretty">
              Ping Panda is the easiest way to mointor your SaaS. Get instant
              notifications for{" "}
              <span className="font-semibold text-gray-700">
                sales, new users, or any other event
              </span>{" "}
              sent directly to your Discord.
            </p>

            <ul className="flex flex-col items-start space-y-2 text-left text-gray-600 text-base/7">
              {[
                "Real-time Discord alerts for critical events",
                "Buy once, use forever",
                "Track sales, new users, or any other events",
              ].map((item, index) => (
                <li key={index} className="flex gap-1.5 items-center text-left">
                  <Check className="size-5 shrink-0 text-brand-700" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="w-full max-w-80">
              <ShinyButton
                href="/sign-up"
                className="relative z-10 w-full text-base transition-shadow duration-300 shadow-lg h-14 hover:shadow-lg"
              >
                Start For Free Today
              </ShinyButton>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      <section></section>
      <section></section>
      <section></section>
    </>
  );
}

import { Check, Star } from "lucide-react";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { DiscordMessage } from "@/components/discord-message";
import { Heading } from "@/components/heading";
import { Icons } from "@/components/icons";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { MockDiscordUI } from "@/components/mock-discord-ui";
import { ShinyButton } from "@/components/shiny-button";
import { AnimatedList } from "@/components/ui/animated-list";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const codeSnippet = `await fetch("http://localhost:3000/api/v1/events", {
  method: "POST",
  body: JSON.stringify({
    category: "sale",
    fields: {
      plan: "PRO",
      email: "john.doe2001@email.com",
      amount: 49.00
    }
  }),
  headers: {
    Authorization: "Bearer <YOUR_API_KEY>"
  }
})`;

  const user = await currentUser();
  const href = user ? "/dashboard" : "/sign-up";

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
                href={href}
                className="relative z-10 w-full text-base transition-shadow duration-300 shadow-lg h-14 hover:shadow-lg"
              >
                Start For Free Today
              </ShinyButton>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="relative pb-4 bg-brand-25">
        <div className="absolute inset-x-0 bottom-24 top-24 bg-brand-700" />
        <div className="relative mx-auto">
          <MaxWidthWrapper className="relative">
            <MockDiscordUI>
              <AnimatedList>
                <DiscordMessage
                  avatarSrc="/brand-asset-profile-picture.png"
                  avatarAlt="PingPanda Avatar"
                  username="PingPanda"
                  timestamp="Today at 12:10PM"
                  badgeText="SignUp"
                  badgeColor="#43b581"
                  title="👤 New user signed up"
                  content={{
                    name: "Shweta Sharma",
                    email: "sharmashweta15@gmail.com",
                  }}
                />
                <DiscordMessage
                  avatarSrc="/brand-asset-profile-picture.png"
                  avatarAlt="PingPanda Avatar"
                  username="PingPanda"
                  timestamp="Today at 01:50PM"
                  badgeText="Revenue"
                  badgeColor="#faa61a"
                  title="💰 Payment received"
                  content={{
                    amount: "$49.00",
                    email: "chandankrr.91@gmail.com",
                    plan: "PRO",
                  }}
                />
                <DiscordMessage
                  avatarSrc="/brand-asset-profile-picture.png"
                  avatarAlt="PingPanda Avatar"
                  username="PingPanda"
                  timestamp="Today at 05:50AM"
                  badgeText="Milestone"
                  badgeColor="#5865f2"
                  title="🚀 Revenue Milestone Achieved"
                  content={{
                    recurringRevenue: "$5000 USD",
                    growth: "+8.2%",
                  }}
                />
              </AnimatedList>
            </MockDiscordUI>
          </MaxWidthWrapper>
        </div>
      </section>

      <section className="relative py-24 sm:py-32 bg-brand-25">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-20">
          <div>
            <h2 className="font-semibold text-center text-base/7 text-brand-600">
              Intuitive Monitoring
            </h2>
            <Heading className="text-center">
              Stay Ahead with Real-Time Insights
            </Heading>
          </div>

          <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
            {/* first bento grid element */}
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]" />

              <div className="relative flex flex-col h-full overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pb-0 sm:pt-10">
                  <p className="mt-2 font-medium tracking-tight text-lg/7 text-brand-950 max-lg:text-center">
                    Real-time notifications
                  </p>
                  <p className="max-w-lg mt-2 text-gray-600 text-sm/6 max-lg:text-center">
                    Get notified about critical events the moment they happen,
                    no matter if you&apos;re at home or on the go.
                  </p>
                </div>

                <div className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
                  <div className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                    <Image
                      src="/phone-screen.png"
                      alt="Phone screen displaying app interface"
                      fill
                      className="object-cover object-top size-full"
                    />
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]" />
            </div>

            {/* second bento grid element */}
            <div className="relative max-lg:row-start-1">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 font-medium tracking-tight text-lg/7 text-brand-950 max-lg:text-center">
                    Track Any Event
                  </p>
                  <p className="max-w-lg mt-2 text-gray-600 text-sm/6 max-lg:text-center">
                    From new user signups to successful payments, PingPand
                    notifies you for all critical events in your SaaS.
                  </p>
                </div>
                <div className="flex items-center justify-center flex-1 px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                  <Image
                    className="w-full max-lg:max-w-xs"
                    src="/bento-any-event.png"
                    alt="Bento box illustrating event tracking"
                    width={500}
                    height={300}
                  />
                </div>
              </div>

              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]" />
            </div>

            {/* third bento grid element */}
            <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
              <div className="absolute bg-white rounded-lg inset-px" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 font-medium tracking-tight text-lg/7 text-brand-950 max-lg:text-center">
                    Track Any Properties
                  </p>
                  <p className="max-w-lg mt-2 text-gray-600 text-sm/6 max-lg:text-center">
                    Add any custom data you like to an event, such as a user
                    email, a purchase amount or an exceeded quota.
                  </p>
                </div>

                <div className="flex items-center justify-center flex-1 px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                  <Image
                    className="w-full max-lg:max-w-xs"
                    src="/bento-custom-data.png"
                    alt="Bento box illustrating custom data tracking"
                    width={500}
                    height={300}
                  />
                </div>
              </div>

              <div className="absolute rounded-lg shadow pointer-events-none inset-px ring-1 ring-black/5" />
            </div>

            {/* fourth bento grid element */}
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />

              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pb-0 sm:pt-10">
                  <p className="mt-2 font-medium tracking-tight text-lg/7 text-brand-950 max-lg:text-center">
                    Easy Integration
                  </p>
                  <p className="max-w-lg mt-2 text-gray-600 text-sm/6 max-lg:text-center">
                    Connect PingPanda with your existing workflows in minutes
                    and call our intuitive logging API from any language.
                  </p>
                </div>

                <div className="relative min-h-[30rem] w-full grow">
                  <div className="absolute bottom-0 right-0 overflow-hidden bg-gray-900 shadow-2xl left-10 top-10 rounded-tl-xl">
                    <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                      <div className="flex -mb-px font-medium text-gray-400 text-sm/6">
                        <div className="px-4 py-2 text-white border-b border-r border-b-white/20 border-r-white/10 bg-white/5">
                          pingpanda.ts
                        </div>
                      </div>
                    </div>

                    <div className="overflow-hidden">
                      <div className="max-h-[30rem]">
                        <SyntaxHighlighter
                          language="typescript"
                          style={{
                            ...oneDark,
                            'pre[class*="language-"]': {
                              ...oneDark['pre[class*="language-"]'],
                              background: "transparent",
                              overflow: "hidden",
                            },
                            'code[class*="language-"]': {
                              ...oneDark['code[class*="language-"]'],
                              background: "transparent",
                            },
                          }}
                        >
                          {codeSnippet}
                        </SyntaxHighlighter>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-r-[2rem] max-lg:rounded-b-[2rem]" />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="relative py-24 sm:py-32 bg-white">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-20">
          <div>
            <h2 className="text-center text-base/7 font-semibold text-brand-600">
              Real-World Experiences
            </h2>
            <Heading className="text-center">What Our Customers Say</Heading>
          </div>

          <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
            {/* first customer review */}
            <div className="flex flex-auto flex-col gap-4 bg-brand-25 p-6 sm:p-8 lg:p-16 rounded-t-[2rem] lg:rounded-tr-none lg:rounded-l-[2rem]">
              <div className="flex gap-0.5 mb-2 justify-center lg:justify-start">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <Star
                    key={i}
                    className="size-5 fill-brand-600 text-brand-600"
                  />
                ))}
              </div>

              <p className="text-base sm:text-lg lg:text-lg/8 font-medium tracking-tight text-brand-950 text-center lg:text-left text-pretty">
                PingPanda has been a game-changer for me. I&apos;ve been using
                it for two months now and seeing sales pop up in real-time is
                super satisfying.
              </p>

              <div className="flex flex-col justify-center lg:justify-start sm:flex-row items-center sm:items-start gap-4 mt-2">
                <Image
                  src="/user-1.png"
                  className="rounded-full object-cover"
                  alt="Random user"
                  width={48}
                  height={48}
                />
                <div className="flex flex-col items-center sm:items-start">
                  <p className="font-semibold flex items-center">
                    Gurjeet Singh
                    <Icons.verificatinBadge className="size-4 ml-1.5 inline-block" />
                  </p>
                  <p className="text-sm text-gray-600">@imgurjeet</p>
                </div>
              </div>
            </div>

            {/* second customer review */}
            <div className="flex flex-auto flex-col gap-4 bg-brand-25 p-6 sm:p-8 lg:p-16 rounded-b-[2rem] lg:rounded-bl-none lg:rounded-r-[2rem]">
              <div className="flex gap-0.5 mb-2 justify-center lg:justify-start">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <Star
                    key={i}
                    className="size-5 fill-brand-600 text-brand-600"
                  />
                ))}
              </div>

              <p className="text-base sm:text-lg lg:text-lg/8 font-medium tracking-tight text-brand-950 text-center lg:text-left text-pretty">
                PingPanda&apos;s been paying off for our SaaS. Nice to have
                simple way to see how we&apos;re doing day-to-day. Definitely
                makes our lives easier.
              </p>

              <div className="flex flex-col justify-center lg:justify-start sm:flex-row items-center sm:items-start gap-4 mt-2">
                <Image
                  src="/user-2.png"
                  className="rounded-full object-cover"
                  alt="Random user"
                  width={48}
                  height={48}
                />
                <div className="flex flex-col items-center sm:items-start">
                  <p className="font-semibold flex items-center">
                    Pallvi Singh
                    <Icons.verificatinBadge className="size-4 ml-1.5 inline-block" />
                  </p>
                  <p className="text-sm text-gray-600">@pallvi11</p>
                </div>
              </div>
            </div>
          </div>

          <ShinyButton
            href={href}
            className="relative z-10 h-14 w-full max-w-xs text-base shadow-lg transition-shadow duration-300 hover:shadow-xl "
          >
            Start For Free Today
          </ShinyButton>
        </MaxWidthWrapper>
      </section>
    </>
  );
}

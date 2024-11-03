import {
  Cog,
  Gift,
  Headphones,
  HelpCircle,
  Inbox,
  Menu,
  Mic,
  Phone,
  PlusCircle,
  Search,
  Smile,
  Sticker,
  UserCircle,
  Video,
} from "lucide-react";
import Image from "next/image";
import { PropsWithChildren } from "react";

import { Icons } from "./icons";

export const MockDiscordUI = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-[800px] w-full max-w-[1200px] bg-discord-background text-white rounded-lg overflow-hidden">
      {/* server list */}
      <div className="hidden sm:flex w-[72px] bg-[#202225] py-3 flex-col items-center">
        <div className="flex items-center justify-center mb-2 transition-all duration-200 size-12 bg-discord-brand-color rounded-2xl hover:rounded-xl">
          <Icons.discord className="text-white size-3/5" />
        </div>

        <div className="w-8 h-[2px] bg-discord-background rounded-full my-2" />

        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-center mb-3 transition-all duration-200 cursor-not-allowed size-12 bg-discord-background rounded-3xl hover:rounded-xl hover:bg-discord-brand-color"
          >
            <span className="text-lg font-semibold text-gray-400">
              {String.fromCharCode(65 + i)}
            </span>
          </div>
        ))}

        <div className="group mt-auto size-12 bg-discord-background rounded-3xl flex items-center justify-center mb-3 hover:rounded-xl transition-all duration-200 hover:bg-[#3ba55c] cursor-not-allowed">
          <PlusCircle className="text-[#3ba55c] group-hover:text-white" />
        </div>
      </div>

      {/* dm list */}
      <div className="hidden md:flex w-60 bg-[#2f3136] flex-col">
        <div className="px-4 h-16 border-b border-[#202225] flex items-center shadow-sm">
          <div className="w-full bg-[#202225] text-sm rounded px-2 h-8 flex items-center justify-center text-gray-500 cursor-not-allowed">
            Find or start a conversation
          </div>
        </div>

        <div className="flex-1 pt-4 overflow-y-auto">
          <div className="px-2 mb-4">
            <div className="flex items-center text-sm px-2 py-1.5 rounded hover:bg-[#393c43] text-[#dcddee] cursor-not-allowed">
              <UserCircle className="mr-4 size-8 text-[#b9bbbe]" />{" "}
              <span className="text-sm font-medium">Friends</span>
            </div>
            <div className="flex items-center text-sm px-2 py-1.5 rounded hover:bg-[#393c43] text-[#dcddee] cursor-not-allowed">
              <Inbox className="mr-4 size-8 text-[#b9bbbe]" />{" "}
              <span className="text-sm font-medium">Nitro</span>
            </div>
          </div>

          <div className="px-2 mb-4">
            <h3 className="text-xs font-semibold text-[#8e9297] px-2 mb-2 uppercase">
              Direct Messages
            </h3>

            <div className="flex items-center px-2 py-1.5 rounded bg-[#393c43] text-white cursor-pointer">
              <Image
                src="/brand-asset-profile-picture.png"
                alt="PingPanda Avatar"
                width={32}
                height={32}
                className="object-cover mr-3 rounded-full"
              />
              <span className="font-medium">PingPanda</span>
            </div>

            <div className="my-1 space-y-px">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center px-2 py-1.5 rounded text-gray-600 cursor-not-allowed"
                >
                  <div className="mr-3 rounded-full size-8 bg-discord-background " />
                  <span className="font-medium">User {i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-2 bg-[#292b2f] flex items-center">
          <div className="mr-2 rounded-full size-8 bg-brand-700" />
          <div className="flex-1">
            <p className="text-sm font-medium text-white">You</p>
            <p className="text-xs text-[#b9bbbe] flex items-center">
              @your_account
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Mic className="size-5 text-[#b9bbbe] hover:text-white cursor-pointer" />
            <Headphones className="size-5 text-[#b9bbbe] hover:text-white cursor-pointer" />
            <Cog className="size-5 text-[#b9bbbe] hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>

      {/* main content */}
      <div className="flex flex-col flex-1">
        {/* dm header */}
        <div className="h-16 bg-[#36393f] flex items-center px-4 shadow-sm border-b border-[#202225]">
          <div className="mr-4 md:hidden">
            <Menu className="size-6 text-[#b9bbbe] hover:text-white cursor-pointer" />
          </div>

          <div className="flex items-center">
            <div className="relative">
              <Image
                src="/brand-asset-profile-picture.png"
                alt="PingPanda Avatar"
                width={40}
                height={40}
                className="object-cover mr-3 rounded-full"
              />
              <div className="absolute bottom-0 right-3 size-3 bg-green-500 rounded-full border-2 border-[#36393f]" />
            </div>

            <p className="font-semibold text-white">PingPanda</p>
          </div>

          <div className="ml-auto flex items-center space-x-4 text-[#b9bbbe]">
            <Search className="hidden cursor-not-allowed size-5 hover:text-white sm:block" />
            <Phone className="hidden cursor-not-allowed size-5 hover:text-white sm:block" />
            <Video className="hidden cursor-not-allowed size-5 hover:text-white sm:block" />
            <Inbox className="hidden cursor-not-allowed size-5 hover:text-white sm:block" />
            <UserCircle className="hidden cursor-not-allowed size-5 hover:text-white sm:block" />
            <HelpCircle className="hidden cursor-not-allowed size-5 hover:text-white sm:block" />
          </div>
        </div>

        {/* message history */}
        <div className="flex flex-col-reverse flex-1 p-4 overflow-y-auto bg-discord-background">
          {children}
        </div>

        {/* message input */}
        <div className="p-4">
          <div className="flex items-center bg-[#40444b] rounded-lg p-1">
            <PlusCircle className="mx-3 text-[#b9bbbe] hover:text-white cursor-not-allowed" />
            <input
              readOnly
              type="text"
              placeholder="Message @PingPanda"
              className="flex-1 bg-transparent py-2.5 px-1 text-white placeholder-[#72767d] focus:outline-none cursor-not-allowed"
            />
            <div className="flex items-center space-x-3 mx-3 text-[#b9bbbe]">
              <Gift className="hidden cursor-not-allowed size-5 hover:text-white sm:block" />
              <Sticker className="hidden cursor-not-allowed size-5 hover:text-white sm:block" />
              <Smile className="hidden cursor-not-allowed size-5 hover:text-white sm:block" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

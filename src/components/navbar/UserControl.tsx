"use client";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { LogOut, Rss, User } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

export default function UserControl({
  picture,
  name,
  profile,
}: {
  picture: string;
  name: string;
  profile: string;
}) {
  const menuItems = [
    {
      link: `/user/${profile}`,
      icon: <User className="mr-4 h-4 w-4" />,
      text: "My Profile",
    },
    {
      link: "/me/channels",
      icon: <Rss className="mr-4 h-4 w-4" />,
      text: "Manage Channels",
    },
  ];
  return (
    <section className="hover:brightness-[75%] transition-[filter] rounded-full cursor-pointer">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src={picture} alt={name} />
            <AvatarFallback>
              {name
                ?.split(" ")
                .map((name) => name.charAt(0))
                .join("")}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          {menuItems.map((menuItem) => (
            <Link key={menuItem.text} href={menuItem.link}>
              <DropdownMenuItem>
                {menuItem.icon && menuItem.icon}
                <span>{menuItem.text}</span>
              </DropdownMenuItem>
            </Link>
          ))}
          <DropdownMenuItem
            onClick={() => {
              signOut();
            }}
          >
            <LogOut className="mr-4 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
}

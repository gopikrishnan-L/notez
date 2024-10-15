"use client";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import Image from "next/image";

export default function UserControl({ picture }: { picture: string }) {
  const [open, setOpen] = useState(null);
  return (
    <section className="hover:brightness-[75%] transition-[filter] rounded-full cursor-pointer">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="w-10 aspect-square rounded-full bg-white">
            <Image
              src={picture}
              className="rounded-full"
              alt=""
              width={40}
              height={40}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
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

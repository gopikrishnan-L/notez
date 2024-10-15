"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Discover",
    link: "/discover",
  },
  {
    name: "Blog",
    link: "/blog",
  },
  {
    name: "Contact",
    link: "/contact",
  },
];

export default function NavLinks() {
  const path = usePathname();
  return (
    <section className="flex flex-[0.5] justify-between">
      {navLinks.map((nav) => (
        <Link key={nav.name} href={nav.link}>
          <span
            className={`${
              path === nav.link
                ? "font-semibold"
                : "opacity-60 after:absolute after:bottom-0 after:h-[1px] after:w-full after:bg-black after:z-1 after:left-0 after:scale-0 after:hover:scale-100 after:transition-transform after:origin-left after:duration-200   "
            } relative hover:opacity-100 transition-opacity`}
          >
            {nav.name}
          </span>
        </Link>
      ))}
    </section>
  );
}

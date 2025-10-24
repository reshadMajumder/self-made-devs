"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";

const navItems = [
  {
    path: "/",
    label: "Home",
  },
  // {
  //   path: "/program",
  //   label: "Program",
  // },
  {
    path: "/register",
    label: "Register",
  },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Only use pathname for active-link styling after client mount to avoid
  // server/client HTML mismatches during hydration.
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full">
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      {/* Shadow overlay */}
      <div className="absolute inset-0 shadow-[0_1px_0_0_rgba(255,255,255,0.1)]" />

      {/* Content */}
      <nav className="relative mx-auto flex h-14 max-w-screen-xl items-center justify-between px-6">
        <div className="flex flex-1 items-center justify-start">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight hover:opacity-80"
          >
            Self Made Devs
          </Link>
        </div>

        <div className="flex items-center justify-center gap-6">
          {navItems.map(({ path, label }) => {
            const isActive = mounted && pathname === path;
            return (
              <Link
                key={path}
                href={path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive ? "text-foreground" : "text-foreground/60"
                )}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <div className="flex flex-1 items-center justify-end gap-4">
          <ThemeToggle />
          <Button asChild>
            <Link
              href="/register"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 hover:scale-105 font-semibold text-white"
            >
              Join Now
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}

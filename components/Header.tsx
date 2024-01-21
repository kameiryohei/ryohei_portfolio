"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { motion } from "framer-motion";

const Header = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };
  const { setTheme } = useTheme();
  const components: { title: string; href: string; description: string }[] = [
    {
      title: "Alert Dialog",
      href: "/docs/primitives/alert-dialog",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Hover Card",
      href: "/docs/primitives/hover-card",
      description:
        "For sighted users to preview content available behind a link.",
    },
    {
      title: "Progress",
      href: "/docs/primitives/progress",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
      title: "Scroll-area",
      href: "/docs/primitives/scroll-area",
      description: "Visually or semantically separates content.",
    },
    {
      title: "Tabs",
      href: "/docs/primitives/tabs",
      description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
      title: "Tooltip",
      href: "/docs/primitives/tooltip",
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
  ];
  const Modal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
      <motion.div
        className="fixed inset-0 bg-indigo-600 bg-opacity-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white p-5 rounded-3xl text-center text-black w-80 h-75"
          initial={{ y: -300, opacity: 0, scale: 1 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -300, opacity: 0 }}
        >
          {children}
        </motion.div>
      </motion.div>
    );
  };
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="py-8 px-5 lg:px-20 flex items-center justify-between">
        <div className="text-3xl font-bold">
          <Link href={"/"}>RYO.</Link>
        </div>
        <div className="flex items-center gap-8">
          <Button
            variant="outline"
            onClick={handleClick}
            className="block md:hidden"
          >
            MENU
          </Button>
          {showModal && (
            <Modal>
              <p className="text-2xl">メニュー</p>
              <hr className="border-t-2 border-double border-black" />
              <div className="flex flex-col">
                <Link href="/univ-hack">
                  <Button
                    className="mt-4 bg-black text-white"
                    onClick={() => setShowModal(false)}
                  >
                    大学内開発について
                  </Button>
                </Link>
                <Link href="/hackathon">
                  <Button
                    className="mt-2 bg-black text-white"
                    onClick={() => setShowModal(false)}
                  >
                    課外活動について
                  </Button>
                </Link>
                <Link href="/screen1">
                  <Button
                    className="mt-2 bg-black text-white"
                    onClick={() => setShowModal(false)}
                  >
                    写真共有サイト
                  </Button>
                </Link>
                <Button
                  className="mt-2 bg-black text-white"
                  onClick={() => setShowModal(false)}
                >
                  CLOSE
                </Button>
              </div>
            </Modal>
          )}
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList>
              <NavigationMenuItem className="ml-[200px]">
                <NavigationMenuTrigger>About me</NavigationMenuTrigger>
                <NavigationMenuContent className="">
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] max-w-screen">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <Image
                            src="/takegram.jpg"
                            alt="亀井涼平"
                            width={120}
                            height={240}
                            className="rounded-full"
                          />
                          <div className="mb-2 mt-4 text-lg font-medium ">
                            亀井涼平
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Belongs to the Faculty of Information Engineering,
                            Meijo University
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/univ-hack" title="授業内開発">
                      研究開発リテラシやPBL概論での開発経験について書いています
                    </ListItem>
                    <ListItem href="/hackathon" title="課外活動">
                      自主的に参加したハッカソンについて書いています
                    </ListItem>
                    <ListItem href="/screen1" title="写真投稿">
                      私の好きな写真を見たり、あなたの好きな写真を投稿できるページです
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/screen1" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Photos
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

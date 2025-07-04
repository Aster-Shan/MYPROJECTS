import * as React from "react";
import { Link } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { siteConfig } from "@/config/site";
import type { MainNavItem } from "@/types";
import { Icons } from "../ui/icons";

interface MainNavigationProps {
  items?: MainNavItem[];
}

export function MainNavigation({ items }: MainNavigationProps) {
  return (
    <div className="hidden lg:flex gap-6">
      <Link to={"/"} className="items-center space-x-2 flex">
        <Icons.logo className="size-7" aria-hidden="true"></Icons.logo>
        <span className="font-bold inline-block">{siteConfig.name}</span>
        <span className="sr-only">Home</span>
      </Link>
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          {items?.[0]?.card ? (
            <NavigationMenuItem>
              <NavigationMenuTrigger>{items[0].title}</NavigationMenuTrigger>
              <NavigationMenuContent>
                {
                  <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="from-muted/50 to-muted flex size-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                          to="/"
                        >
                          <Icons.logo
                            className="h-6 w-6"
                            aria-hidden="true"
                          ></Icons.logo>
                          <div className="mt-4 mb-2 text-lg font-medium">
                            {siteConfig.name}
                          </div>
                          <p className="text-muted-foreground text-sm leading-tight">
                            {siteConfig.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>

                    {items[0].card.map((item) => (
                      <ListItem
                        key={item.title}
                        href={String(item.href)}
                        title={item.title}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                }
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : null}
          {items?.[0]?.menu &&
            items[0].menu.map((item) => (
              <NavigationMenuItem key={item.title}>
                <Link to={String(item.href)}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

function ListItem({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  className,
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link to={String(href)}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export default MainNavigation;

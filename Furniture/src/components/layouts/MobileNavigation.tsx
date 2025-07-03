import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import type { MainNavItem } from "@/types";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";

interface MainNavigationProps {
  items?: MainNavItem[];
}

export default function MobileNavigation({ items = [] }: MainNavigationProps) {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="ml-4 size-5">
            <Icons.menu aria-hidden="true" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pl-1 pr-0 pt-9">
          <SheetClose asChild>
            <Link to={"/"} className="flex items-center gap-2 ml-2">
              <Icons.logo className="size-7 " />
              <span className="font-bold inline-block">{siteConfig.name}</span>
              <span className="sr-only">Home</span>
            </Link>
          </SheetClose>
          <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-8">
            <Accordion type="multiple" className="w-full" defaultValue="item-1">
              <AccordionItem value={items?.[0]?.title} className="ml-2">
                <AccordionTrigger className="text-base">
                  {items?.[0]?.title}
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <div className="flex flex-col space-y-2 ml-2">
                    {items[0].card?.map((item) => (
                      <SheetClose asChild key={item.title}>
                        <Link
                          to={String(item.href)}
                          className="text-foreground/70"
                        >
                          {item.title}{" "}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="flex flex-col space-y-2 ml-2">
              {items[0].menu?.map((item) => (
                <SheetClose asChild key={item.title}>
                  <Link to={String(item.href)}>{item.title} </Link>
                </SheetClose>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}

import { siteConfig } from "@/config/site";
import { Link } from "react-router-dom";
import NewsLetterForm from "../news-letter";
import { Icons } from "../ui/icons";
function Footer() {
  return (
    <footer className="w-full border-1 ml-4 lg:ml-0">
      <div className="container mx-auto pb-8 pt-6 lg:py-6 px-4">
        <section className="flex flex-col lg:flex-row gap-10 lg:justify-between lg:gap-20">
          <section className="">
            <Link to={"/"} className="items-center space-x-2 flex">
              <Icons.logo className="size-6" aria-hidden="true"></Icons.logo>
              <span className="font-bold">{siteConfig.name}</span>
              <span className="sr-only">Home</span>
            </Link>
          </section>
          <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-10">
            {siteConfig.footerNav.map((foot) => (
              <div key={foot.title} className="space-y-3">
                <h4 className="font-medium">{foot.title}</h4>
                <ul>
                  {foot.items.map((item) => (
                    <li key={item.title}>
                      <Link
                        to={item.href}
                        target={item.external ? "_blank" : undefined}
                        className="text-muted-foreground font-small hover:font-semibold"
                      >
                        {item.title}
                        <span className="sr-only">{item.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
          <section className="space-y-3">
            <h4 className="font-medium">Subscribe to our NewsLetter </h4>
            <NewsLetterForm></NewsLetterForm>
          </section>
        </section>
      </div>
    </footer>
  );
}

export default Footer;

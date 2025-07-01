import { siteConfig } from "@/config/site";
import MainNavigation from "./MainNavigation";

function Header() {
  return (
    <header className="w-full border-b border-gray-200">
      <nav className="container flex items-center h-18">
        <MainNavigation items={siteConfig.mainNav} />
      </nav>
    </header>
  );
}

export default Header;

import { siteConfig } from "@/config/site";
import { ModeToggle } from "../mode-toggle";
import MainNavigation from "./MainNavigation";
import MobileNavigation from "./MobileNavigation";

function Header() {
  return (
    <header className="w-full border-b border-gray-200 fixed top-0 bg-white">
      <nav className="container flex items-center h-18 mx-auto">
        <MainNavigation items={siteConfig.mainNav} />
        <MobileNavigation items={siteConfig.mainNav}></MobileNavigation>
        <div className="flex flex-1 items-center justify-end space-x-4 mr-8 lg:mr-0">
          <ModeToggle></ModeToggle>
        </div>
      </nav>
    </header>
  );
}

export default Header;

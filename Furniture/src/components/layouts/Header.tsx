import MainNavigation from "./MainNavigation";

function Header() {
  return (
    <>
      <header className="w-full border-b"></header>
      <div className="continer flex items-center h-16"></div>
      <MainNavigation></MainNavigation>
    </>
  );
}

export default Header;

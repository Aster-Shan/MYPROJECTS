export interface NavItem {
  title: string;
  href?: string;
  description?: string;
}
export interface NavItemWithChildren extends NavItem {
  //title: string;(for title 'products')no need to declare coz already included
  card: NavItemWithChildren[];
  menu: NavItemWithChildren[];
}

export type MainNavItem = NavItemWithChildren;

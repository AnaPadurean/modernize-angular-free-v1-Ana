import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },
  {
    navCap: 'Administrare Clienti',
  },
  {
    displayName: 'Lista clienti',
    iconName: 'list',
    route: '/clients',
  },
  
  {
    navCap: 'Administare masini',
  },
  {
    displayName: 'Lista masini',
    iconName: 'badge',
    route: '/masini',
  },

  {
    navCap: 'Istoric service',
  },
  {
    displayName: 'Formular programari',
    iconName: 'menu',
    route: '/formular',
  },

  {
    displayName: 'Inregistrare reparatii',
    iconName: 'list',
    route: '/reparatii',
  },
  {
    displayName: 'Liste reparatii',
    iconName: 'badge',
    route: '/listaReparatii',
  },
  

];

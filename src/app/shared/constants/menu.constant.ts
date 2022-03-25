let role = localStorage.getItem('role');

export const MENUITEMS = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    enabled: true,
  },
  {
    path: '/admin',
    title: 'Admin',
    enabled: role == '1' ? true : false,
  },
  {
    path: '/user',
    title: 'User',
    enabled: role == '1' || role == '2' ? true : false,
  },
];

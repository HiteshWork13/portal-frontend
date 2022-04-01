// let current_user_details: any = localStorage.getItem('current_user_details');
// console.log('current_user_details: ', current_user_details);
// let user_data = JSON.parse(current_user_details);
// console.log('user_data: ', user_data);
// let role = user_data.role;

export const MENUITEMS = [
  {
    id: 'dashboard',
    path: '/dashboard',
    title: 'Dashboard',
    enabled: true,
  },
  {
    id: 'admin',
    path: '/admin',
    title: 'Admin',
    enabled: true,
  },
  // role == 1 ? true : false,
  {
    id: 'user',
    path: '/user',
    title: 'User',
    enabled: true,
  },
  // role == 1 || role == 2 ? true : false,
];

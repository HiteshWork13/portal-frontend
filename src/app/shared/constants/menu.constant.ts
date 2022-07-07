import { APP_CONST } from "./app.constant";

export const MENUITEMS = [
  {
    id: 'admin',
    path: '/admin',
    title: 'Admin',
    enablesIn: [APP_CONST.Role.SuperAdmin]
  },
  {
    id: 'sub_admin',
    path: '/sub-admin',
    title: 'Sub Admin',
    enablesIn: [APP_CONST.Role.Admin]
  },
  {
    id: 'user',
    path: '/user',
    title: 'User',
    enablesIn: [APP_CONST.Role.SuperAdmin, APP_CONST.Role.Admin, APP_CONST.Role.SubAdmin]
  },
  {
    id: 'identity_cloak',
    path: '/history-export',
    title: 'Identity Cloak',
    enablesIn: [APP_CONST.Role.User]
  }
];

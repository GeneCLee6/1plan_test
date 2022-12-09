import { lazy } from 'react';
export const Sidebar = lazy(() => import('./SidebarLeft'));
export const Dashboard = lazy(() => import('./Dashboard'));
export const InviteUser = lazy(() => import('./InviteUser'));
export const CompanyInfo = lazy(() => import('./CompanyInfo'));
export const Profile = lazy(() => import('./Profile'));

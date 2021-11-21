// routes
import { ROUTES } from "@/constants/routers";
import Classes from "@/pages/Class/class";
// pages
import Home from "@/pages/Home";
import Signin from "@/pages/SignIn";
import Student from "@/pages/Student/student";
import Subject from "@/pages/Subject/subject";
import System from "@/pages/System/system";
import Teacher from "@/pages/Teacher/teacher";

/**
 * define main pages routes
 */
const appRoutes = [
  {
    path: ROUTES.HOME,
    exact: true,
    component: Home,
  },
  {
    path: ROUTES.SIGN_IN,
    exact: true,
    component: Signin,
  },
  {
    path: ROUTES.SYSTEM,
    exact: true,
    component: System,
  },
  {
    path: ROUTES.STUDENT,
    exact: true,
    component: Student,
  },
  {
    path: ROUTES.TEACHER,
    exact: true,
    component: Teacher,
  },
  {
    path: ROUTES.CLASS,
    exact: true,
    component: Classes,
  },
  {
    path: ROUTES.SUBJECT,
    exact: true,
    component: Subject,
  },
];

export default appRoutes;

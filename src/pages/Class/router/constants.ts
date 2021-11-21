import Classmanager from "@/pages/Class/component/ClassManager/classManager";

const ROUTES = {
  CLASSMANAGER: "/class/classManager",
};
const RoutesTeacher = [
  {
    path: ROUTES.CLASSMANAGER,
    exact: true,
    component: Classmanager,
  },
];
export default RoutesTeacher;

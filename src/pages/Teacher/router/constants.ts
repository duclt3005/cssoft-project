// import Home from "@/pages/Teacher/Page/Home";
// import Point from "@/pages/Teacher/component/Point/point";
// import InfoSV from "@/pages/Teacher/component/InfoSV/InfoSV";
// import Schedule from "../component/Schedule/Schedule";
// import Tuition from "../component/Tuition/Tuition";
// import Class from "../component/Class/Class";
// import InfoTeacher from "../component/InfoTeacher/InfoTeacher";
// import Attendance from "../component/Attendance/Attendance";
// import Lesson from "../component/Lesson/Lesson";
// import CalendarTeacher from "../component/CalendarTeacher/CalendarTeacher";
// import CalendarStudent from "../component/CalendarStudent/CalendarStudent";
import Score from "@/pages/Teacher/component/Score";
import Account from "@/pages/Teacher/component/Account";

const ROUTES = {
//   INFOSTUDENT: "/teacher/infostudent",
//   SCHEDULE: "/teacher/schedule",
//   TUITION: "/teacher/tuition", // hoc phi
//   POINT: "/teacher/point", // diểm
//   ATTENDANCE: "/teacher/attendance", // điểm danh
//   INFO: "/teacher/info",
//   LESSON: "/teacher/lesson",
//   CLASS: "/teacher/class",
//   CALENDARTEACHER: "/teacher/calendarTeacher",
//   CALENDARSTUDENT: "/teacher/calendarStudent",
  ACCOUNT: "/teacher/account/",
  SCORE: "/teacher/score",
};
const RoutesTeacher = [
//   {
//     path: ROUTES.INFOSTUDENT,
//     // exact: true,
//     component: InfoSV,
//   },
//   {
//     path: ROUTES.SCHEDULE,
//     // exact: true,
//     component: Schedule,
//   },
//   {
//     path: ROUTES.CALENDARTEACHER,
//     // exact: true,
//     component: CalendarTeacher,
//   },
//   {
//     path: ROUTES.CALENDARSTUDENT,
//     // exact: true,
//     component: CalendarStudent,
//   },
//   {
//     path: ROUTES.TUITION,
//     // exact: true,
//     component: Tuition,
//   },
//   {
//     path: ROUTES.POINT,
//     // exact: true,
//     component: Point,
//   },
//   {
//     path: ROUTES.ATTENDANCE,
//     // exact: true,
//     component: Attendance,
//   },
//   {
//     path: ROUTES.CLASS,
//     exact: true,
//     component: Class,
//   },
//   {
//     path: ROUTES.INFO,
//     exact: true,
//     component: InfoTeacher,
//   },
//   {
//     path: ROUTES.LESSON,
//     exact: true,
//     component: Lesson,
//   },
  {
    path: ROUTES.SCORE,
    exact: true,
    component: Score,
  },
  {
    path: ROUTES.ACCOUNT,
    exact: true,
    component: Account,
  },
];
export default RoutesTeacher;

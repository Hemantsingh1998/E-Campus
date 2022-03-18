import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { setNavigator } from './navigationnRef'
import { Provider as AuthContext} from './src/context/AuthContext'
import splashScreen from './src/screens/Splash'  
import loginScreen from './src/screens/Login'
import registerScreen from './src/screens/Register'
import AdminHome from './src/screens/adminFlow/AdminHome'
import Profile from './src/screens/Profile'
import AnnounceMent from './src/screens/adminFlow/Announcement'
import TimeTable from './src/screens/TimeTable'
import Attendance from './src/screens/Attendance'
import OnlineClass from './src/screens/OnlineClass'
import OnlineExams from './src/screens/OnlineExams'
import Results from './src/screens/Results'
import Fees from './src/screens/Fees'
import AboutUs from './src/screens/AboutUs'
import Application from './src/screens/adminFlow/Application'
import Ecard from './src/screens/ECard'
import Events from "./src/screens/Events";
import ManageTeacher from "./src/screens/adminFlow/ManageTeacher";
import { LogBox } from 'react-native';
import AddCourse from "./src/screens/adminFlow/AddCourse";
import TeacherHome from "./src/screens/teacherflow/TeacherHome";
import StudentHome from './src/screens/studentFlow/StudentHome'
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const switchNavigator = createSwitchNavigator({
  splashScreen : splashScreen,
  adminFlow: createStackNavigator({
    AdminHome: AdminHome,
    Profile: Profile,
    AddCourse: AddCourse,
    Events: Events,
    AnnounceMent: AnnounceMent,
    TimeTable: TimeTable,
    Attendance: Attendance,
    OnlineClass: OnlineClass,
    OnlineExams: OnlineExams,
    Results: Results,
    Fees: Fees,
    AboutUs: AboutUs,
    Application: Application,
    ManageTeacher: ManageTeacher,
    Ecard: Ecard
  }),
  teacherFlow: createStackNavigator({
    TeacherHome: TeacherHome
  }),
  studentFlow: createStackNavigator({
    StudentHome: StudentHome,
    Profile: Profile,
    AddCourse: AddCourse,
    Events: Events,
    AnnounceMent: AnnounceMent,
    TimeTable: TimeTable,
    Attendance: Attendance,
    OnlineClass: OnlineClass,
    OnlineExams: OnlineExams,
    Results: Results,
    Fees: Fees,
    AboutUs: AboutUs,
    Application: Application,
    ManageTeacher: ManageTeacher,
    Ecard: Ecard
  }),
  authFlow: createStackNavigator({
    loginScreen : loginScreen,
    registerScreen : registerScreen,
  })
})

const App = createAppContainer(switchNavigator)

export default () => {
  return(
    <AuthContext>
      <App ref={(navigator) => {setNavigator(navigator)}}/>
    </AuthContext>
  )
}
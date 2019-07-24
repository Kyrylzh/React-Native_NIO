/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, BackHandler } from "react-native";
import { createStackNavigator } from "react-navigation";

import Login from "./src/authScreen/login/Login";
import ForgotPassword from "./src/authScreen/forgotPassword/ForgotPassword";
import TabNavigator from "./src/navigation/tabNavigation/TabNavigator";
import DrawerNavigator from "./src/navigation/drawerNavigation/DrawerNavigator";
import WhatIsDiscussion from "./src/screens/discussion/whatIsDiscussion/whatIsDiscussion";
import DiscussionInfo from "./src/screens/discussion/discussionInfo";
import ModifyDiscussion from "./src/screens/discussion/modifyDiscussion";
import CreateDiscussion from "./src/screens/discussion/createDiscussion";
import ShowFinishedTask from "./src/screens/task/showFinishedTask";
import WhatIsTask from "./src/screens/task/whatIsTask";
import TaskInfo from "./src/screens/task/taskInfo";
import SignUp from "./src/authScreen/signUp/SignUp";
import CreateTaskAdmin from "./src/screens/task/createTaskAdmin";
import Test from "./src/screens/test";
import TaskSLAPAdminList from "./src/screens/task/taskSLAPAdminList";
import TaskCalendar from "./src/screens/task/taskCalendar";
import drawerNavigatorSLA from "./src/navigation/drawerNavigation/drawerNavigatorSLA";
import CreateSubTask from "./src/screens/task/createSubTask";

import NewsPage from "./src/screens/news/newsPage";
import TabScreen3 from "./src/screens/tabscreen/TabScreen3";
import NewsHome from "./src/screens/news/newsHome";
import loading from "./src/screens/drawerScreen/loading";
import verifyPage from "./src/screens/drawerScreen/verifyPage";

import AddDiscussionUser from "./src/screens/discussion/addDiscussionUsers";

import CreateTaskAdminUser from "./src/screens/task/createTaskAdminUser";
import createNews from "./src/screens/news/createNews";
import CreateSubTaskUses from "./src/screens/task/createSubTaskUses";
import TaskCalendarAgenda from "./src/screens/task/taskCalendarAgenda";
import SplachScreen from "./src/screens/splashScreen";
import EditSubTask from "./src/screens/task/editSubTask";
import UpdateDiscussion from "./src/screens/discussion/updateDiscussion";
import DrawerScreen2 from "./src/screens/drawerScreen/DrawerScreen2";
import tabNavigationSLA from "./src/navigation/tabNavigation/tabNavigationSLA";

export default class App extends Component {
  // componentDidMount() {
  //  BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  // }

  // componentWillUnmount() {
  //   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  // }

  // handleBackButton() {
  //   return true;
  // }

  render() {
    return <AppStackNavigator />;
  }
}

const AppStackNavigator = createStackNavigator(
  {
    // CreateSubTaskUses: {
    //   screen: CreateSubTaskUses
    // },
    // TaskCalendar: {
    //   screen: TaskCalendar
    // },
    // TaskCalendarAgenda: {
    //   screen: TaskCalendarAgenda
    // },
    // Test: {
    //   screen: Test
    // },
    // TaskCalendar: {
    //   screen: TaskCalendar
    // },
    // UpdateDiscussion:{
    //   screen:UpdateDiscussion
    // },
    SplachScreen: {
      screen: SplachScreen
    },

    // TaskCalendarAgenda: {
    //   screen: TaskCalendarAgenda
    // },
    // CreateDiscussion: {
    //   screen: CreateDiscussion
    // },
    // TaskCalendar: {
    //   screen: TaskCalendar
    // },
    // CreateTaskAdminUser: {
    //   screen: CreateTaskAdminUser
    // },
    // AddDiscussionUser: {
    //   screen: AddDiscussionUser
    // },
    // NewsHome: {
    //   screen: NewsHome
    // },
    // NewsPage: {
    //   screen: NewsPage
    // },
    // Tab1: {
    //   screen: TabScreen3
    // },
    // TaskInfo: {
    //   screen: TaskInfo
    // },
    // WhatIsDiscussion: {
    //   screen: WhatIsDiscussion
    // },
    // NewsPage: {
    //   screen: NewsPage
    // },
    // CreateDiscussion: {
    //   screen: CreateDiscussion
    // },

    // Test: {
    //   screen: Test
    // },
    // CreateSubTask: {
    //   screen: CreateSubTask
    // },

    // CreateTaskAdmin: {
    //   screen: CreateTaskAdmin
    // },
    // TaskSLAPAdminList: {
    //   screen: TaskSLAPAdminList
    // },
    Login: {
      screen: Login
    },

    ForgotPassword: {
      screen: ForgotPassword
    },

    TabNav: {
      screen: TabNavigator
    },
    TabNavSLA: {
      screen: tabNavigationSLA
    },

    SignUp: {
      screen: SignUp
    },

    DrewerNav: {
      screen: DrawerNavigator
    },

    DrewerNavSLA: {
      screen: drawerNavigatorSLA
    },

    // WhatIsDiscussion: {
    //   screen: WhatIsDiscussion
    // },

    // DiscussionInfo: {
    //   screen: DiscussionInfo
    // },

    // ModifyDiscussion: {
    //   screen: ModifyDiscussion
    // },

    // CreateDiscussion: {
    //   screen: CreateDiscussion
    // },

    // WhatIsTask: {
    //   screen: WhatIsTask
    // },

    // ShowFinishedTask: {
    //   screen: ShowFinishedTask
    // },

    // TaskInfo: {
    //   screen: TaskInfo
    // },

    TaskCalendar: {
      screen: TaskCalendar
    },

    TaskCalendarAgenda: {
      screen: TaskCalendarAgenda
    },

    // CreateTaskAdmin: {
    //   screen: CreateTaskAdmin
    // },
    // CreateSubTask: {
    //   screen: CreateSubTask
    // },
    // TaskSLAPAdminList: {
    //   screen: TaskSLAPAdminList
    // },

    NewsPage: {
      screen: NewsPage
    },

    loading: {
      screen: loading
    },
    verifyPage: {
      screen: verifyPage
    },

    Loginhandler: {
      screen: Login
    },
    // AddDiscussionUser: {
    //   screen: AddDiscussionUser
    // },
    // CreateTaskAdminUser: {
    //   screen: CreateTaskAdminUser
    // },

    createNews: {
      screen: createNews
    },

    // CreateSubTaskUses: {
    //   screen: CreateSubTaskUses
    // },
    TaskCalendarAgenda: {
      screen: TaskCalendarAgenda
    }
    // EditSubTask: {
    //   screen: EditSubTask
    // },
    // UpdateDiscussion: {
    //   screen: UpdateDiscussion
    // }
    // DrawerScreen2: {
    //   screen: DrawerScreen2
    // }
  },
  (navigationOptions = {
    headerMode: "none"
  })
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

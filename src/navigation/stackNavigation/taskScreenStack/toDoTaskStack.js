// import React from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   ScrollView,
//   Dimensions,
//   Image
// } from "react-native";
// import { createDrawerNavigator, DrawerItems } from "react-navigation";

// import TabNavigator from "../tabNavigation/TabNavigator";
// import DrawerScreen1 from "../../screens/drawerScreen/DrawerScreen1";
// import DrawerScreen2 from "../../screens/drawerScreen/DrawerScreen2";
// import DrawerScreen3 from "../../screens/drawerScreen/DrawerScreen3";
// // import { Right } from 'native-base';
// import Home from "./../../screens/drawerScreen/home";
// import Logout from "./../../authScreen/logout.js/logout";
// import UserAccount from "./../../screens/drawerScreen/userAccount";
// import Icon from "react-native-vector-icons/FontAwesome5";

// data = [
//   {
//     role: "second_admin"
//   }
// ];

// const CustomDrawerComponent = props => (
//   <SafeAreaView>
//     <View
//       style={{
//         height: 150,
//         backgroundColor: "#d1d1d1",
//         alignItems: "center",
//         justifyContent: "center"
//       }}
//     >
//       <Image
//         source={require("../../Images/logo.png")}
//         style={{ height: 155, width: 155, borderRadius: 50 }}
//       />
//     </View>
//     <ScrollView>
//       <DrawerItems {...props} />
//     </ScrollView>
//   </SafeAreaView>
// );

// export default createDrawerNavigator(
//   {
//     Home: {
//       screen: Home,
//       navigationOptions: {
//         drawerLabel: "Home",
//         drawerIcon: ({ tintColor }) => <Icon name="cog" size={17} />
//       }
//     },

//     DrawerScreen1: {
//       screen: DrawerScreen1,
//       navigationOptions: {
//         drawerLabel: "News Feed",
//         drawerIcon: ({ tintColor }) => <Icon name="newspaper" size={17} />
//       }
//     },

//     DrawerScreen2: {
//       screen: DrawerScreen2,
//       navigationOptions: {
//         drawerLabel: "Discussion Feed",
//         drawerIcon: ({ tintColor }) => <Icon name="weixin" size={17} />
//       }
//     },

//     DrawerScreen3: {
//       screen: TabNavigator,
//       navigationOptions: {
//         drawerLabel: "Task Feed",
//         drawerIcon: ({ tintColor }) => <Icon name="marker" size={17} />
//       }
//     },

//     UserAccount: {
//       screen: UserAccount,
//       navigationOptions: {
//         drawerLabel: "User Account",
//         drawerIcon: ({ tintColor }) => <Icon name="user-circle" size={17} />
//       }
//     },
//     DrawerScreen4: {
//       screen: Logout,
//       navigationOptions: {
//         drawerLabel: "Logout",
//         drawerIcon: ({ tintColor }) => <Icon name="key" size={17} />
//       }
//     }
//   },

//   {
//     drawerPosition: "left",
//     contentOptions: {
//       drawerWidth: 200,
//       drawerType: "slide",
//       labelStyle: {
//         fontSize: 12,
//         fontFamily: "Myriad"
//       }
//     }
//   },
//   {
//     contentComponent: CustomDrawerComponent
//   }
// );
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,

//     backgroundColor: "#d1d1d1"
//   },
//   labelStyle: {
//     fontSize: 12,
//     fontFamily: "Myriad"
//   }
// });

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image
} from "react-native";
import { createStackNavigator } from "react-navigation";
import TabScreen3 from "../../../screens/tabscreen/TabScreen3";
// import Icon from "react-native-vector-icons/FontAwesome5";
// import TabNavigator from "../tabNavigation/TabNavigator";
// import DrawerScreen1 from "../../screens/drawerScreen/DrawerScreen1";
// import DrawerScreen2 from "../../screens/drawerScreen/DrawerScreen2";
// import DrawerScreen3 from "../../screens/drawerScreen/DrawerScreen3";
// // import { Right } from 'native-base';
// import Home from "./../../screens/drawerScreen/home";
// import Logout from "./../../authScreen/logout.js/logout";
// import tabNavigationSLA from "../tabNavigation/tabNavigationSLA";
// import UserAccount from "./../../screens/drawerScreen/userAccount";
import CreateSubTask from "./../../../screens/task/createSubTask";
import CreateSubTaskUses from "./../../../screens/task/createSubTaskUses";
import TabScreen1 from "./../../../screens/tabscreen/TabScreen1";
import CreateTaskAdmin from "./../../../screens/task/createTaskAdmin";
import CreateTaskAdminUser from "./../../../screens/task/createTaskAdminUser";
import EditSubTask from "./../../../screens/task/editSubTask";
import ShowFinishedTask from "./../../../screens/task/showFinishedTask";
import TaskInfo from "./../../../screens/task/taskInfo";
import TaskSLAPAdminList from "./../../../screens/task/taskSLAPAdminList";
import TabScreen2 from "./../../../screens/tabscreen/TabScreen2";
import ReCreateSubTask from "./../../../screens/task/reCreateSubTask";
import ReCreateSubTaskUses from "./../../../screens/task/reCreateSubTaskUser";

export default createStackNavigator(
  {
    // PendingTask: {
    //   screen: TabScreen3
    // },

    ToDoTask: {
      screen: TabScreen1
    },
    CreateTaskAdmin: {
      screen: CreateTaskAdmin
    },
    CreateTaskAdminUser: {
      screen: CreateTaskAdminUser
    },
    EditSubTask: {
      screen: EditSubTask
    },
    ShowFinishedTask: {
      screen: ShowFinishedTask
    },
    // TaskInfo: {
    //   screen: TaskSLAPAdminList
    // }
    TaskSLAPAdminList: {
      screen: TaskSLAPAdminList
    },
    ReCreateSubTask: {
      screen: ReCreateSubTask
    },

    ReCreateSubTaskUses: {
      screen: ReCreateSubTaskUses
    }

    // CreateSubTask: {
    //   screen: CreateSubTask
    // },

    // CreateSubTaskUses: {
    //   screen: CreateSubTaskUses
    // }
    // TabNavSLA: {
    //   screen: tabNavigationSLA
    // }
    // FinishedTask: {
    //   screen: TabScreen2
    // }
  },
  (navigationOptions = {
    headerMode: "none"
  })
);

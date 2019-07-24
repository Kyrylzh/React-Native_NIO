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
import DrawerScreen2 from "./../../../screens/drawerScreen/DrawerScreen2";
import CreateDiscussion from "./../../../screens/discussion/createDiscussion";
import AddDiscussionUser from "./../../../screens/discussion/addDiscussionUsers";
import WhatIsDiscussion from "./../../../screens/discussion/whatIsDiscussion/whatIsDiscussion";
import DiscussionInfo from "./../../../screens/discussion/discussionInfo";
import ModifyDiscussion from "./../../../screens/discussion/modifyDiscussion";
import UpdateDiscussion from "./../../../screens/discussion/updateDiscussion";

export default createStackNavigator(
  {
    Discussion: {
      screen: DrawerScreen2
    },

    CreateDiscussion: {
      screen: CreateDiscussion
    },

    AddDiscussionUser: {
      screen: AddDiscussionUser
    },

    WhatIsDiscussion: {
      screen: WhatIsDiscussion
    },

    DiscussionInfo: {
      screen: DiscussionInfo
    },

    ModifyDiscussion: {
      screen: ModifyDiscussion
    },

    UpdateDiscussion: {
      screen: UpdateDiscussion
    }
  },
  (navigationOptions = {
    headerMode: "none"
  })
);

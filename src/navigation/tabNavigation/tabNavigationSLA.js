import React from "react";
import { TouchableOpacity, Text } from "react-native";
import {
  createMaterialTopTabNavigator,
  createStackNavigator,
  NavigationActions
} from "react-navigation";
import IconIonic from "react-native-vector-icons/Ionicons";
import TabScreen1 from "../../screens/tabscreen/TabScreen1";
import TabScreen2 from "../../screens/tabscreen/TabScreen2";
// import TabScreen3 from "../../screens/tabscreen/TabScreen3";
import colors from "../../styles/colors";
import TabScreen3 from "./../../screens/tabscreen/TabScreen3";
import Icon from "react-native-vector-icons/FontAwesome5";
import pendingTaskStack from "../stackNavigation/taskScreenStack/pendingTaskStack";
import toDoTaskStack from "../stackNavigation/taskScreenStack/toDoTaskStack";

const data = [(role = "second_level_admin")];

const TabNavigation = createMaterialTopTabNavigator(
  {
    // Screen1: {
    //   screen: TabScreen3,
    //   navigationOptions: {
    //     tabBarLabel: "Pending",

    //     tabBarIcon: ({ tintColor }) => (
    //       <Icon name="question" size={25} color="white" />
    //     )
    //   }
    // },
    Screen1: {
      screen: pendingTaskStack,
      navigationOptions: {
        tabBarLabel: "Pending",

        tabBarIcon: ({ tintColor }) => (
          <Icon name="question" size={25} color="white" />
        )
      }
    },

    // Screen2: {
    //   screen: TabScreen1,
    //   navigationOptions: {
    //     tabBarLabel: "To Do",
    //     tabBarIcon: ({ tintColor }) => (
    //       <Icon name="pencil-alt" size={25} color="white" />
    //     )
    //   }
    // },

    Screen2: {
      screen: toDoTaskStack,
      navigationOptions: {
        tabBarLabel: "To Do",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="pencil-alt" size={25} color="white" />
        )
      }
      // navigationOptions: ({ navigation }) => ({
      //   tabBarLabel: "To Do",
      //   tabBarLabel: ({ tintColor }) => (
      //     <TouchableOpacity
      //       onPress={() =>
      //         navigation.navigate("toDoTaskStack", { date: new Date() })
      //       }
      //       style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      //     >
      //       <Text>All</Text>
      //     </TouchableOpacity>
      //   )
      // })
    },

    Screen3: {
      screen: TabScreen2,
      navigationOptions: {
        tabBarLabel: "Finished",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="check" size={25} color="white" />
        )
      }
    }
  },
  {
    tabBarPosition: "bottom",
    // initialRouteName:'Notice',
    animationEnabled: true,
    tabBarOptions: {
      showIcon: true,
      indicatorStyle: {
        backgroundColor: "white"
      },
      labelStyle: {
        fontSize: 12,
        fontFamily: "Myriad"
      },
      // tabStyle: {
      //   width: 100,
      // },
      style: {
        backgroundColor: "#6D0F49",
        height: 60,
        fontFamily: "Myriad"
      }
    },
    // navigationOptions: ({ navigation }) => ({
    //   tabBarOnPress: (scene, jumpToIndex) => {
    //     console.log("onPress:", scene.route);
    //     scene.jumpToIndex(scene.index);
    //   }
    // })
    // navigationOptions: ({ navigation }) => ({

    //   tabBarOnPress: args => {
    //     if (args.scene.focused) {
    //       // if tab currently focused tab
    //       if (args.scene.route.index !== 0) {
    //         // if not on first screen of the StackNavigator in focused tab.
    //         navigation.dispatch(
    //           NavigationActions.reset({
    //             index: 0,
    //             actions: [
    //               NavigationActions.navigate({
    //                 routeName: args.scene.route.routes[0].routeName
    //               }) // go to first screen of the StackNavigator
    //             ]
    //           })
    //         );
    //       }
    //     } else {
    //       args.jumpToIndex(args.scene.index); // go to another tab (the default behavior)
    //     }
    //   }
    // })
    navigationOptions: {
      // generic handler for all tabs
      // can be overriden by individual screens
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        defaultHandler();
      }
    },
    lazy: false
  }
);

export default createStackNavigator({ TabNavigation }, { headerMode: "none" });

import React from "react";
import {
  createMaterialTopTabNavigator,
  createStackNavigator
} from "react-navigation";
import IconIonic from "react-native-vector-icons/Ionicons";
import TabScreen1 from "../../screens/tabscreen/TabScreen1";
import TabScreen2 from "../../screens/tabscreen/TabScreen2";
import TabScreen3 from "../../screens/tabscreen/TabScreen3";
import Icon from "react-native-vector-icons/FontAwesome5";
import colors from "../../styles/colors";
import toDoTaskStack from "../stackNavigation/taskScreenStack/toDoTaskStack";

const data = [(role = "second_level_admin")];

const TabNavigation = createMaterialTopTabNavigator(
  {
    // Screen1: {
    //   screen: TabScreen1,
    //   navigationOptions: {
    //     tabBarLabel: "To Do",
    //     tabBarIcon: ({ tintColor }) => (
    //       <Icon name="pencil-alt" size={25} color="white" />
    //     )
    //   }
    // },

    Screen1: {
      screen: toDoTaskStack,
      navigationOptions: {
        tabBarLabel: "To Do",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="pencil-alt" size={25} color="white" />
        )
      }
    },

    FinishTaskScreen: {
      screen: TabScreen2,
      navigationOptions: {
        tabBarLabel: "Finished",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="check" size={25} color="white" />
        )
      }
    }

    // Screen3: {
    //   screen: TabScreen3,
    //   navigationOptions: {
    //     tabBarLabel: "",
    //     tabBarIcon: ({ tintColor }) => (
    //       <IconIonic name="md-locate" size={30} color={tintColor} />
    //     )
    //   }
    // }
  },
  {
    tabBarPosition: "bottom",
    // initialRouteName:'Notice',
    animationEnabled: true,
    tabBarOptions: {
      showIcon: true,
      labelStyle: {
        fontSize: 12,
        fontFamily: "Myriad"
      },
      // tabStyle: {
      //   width: 100,
      // },
      style: {
        backgroundColor: "#6D0F49",
        height: 60
      }
    }
  }
);

export default createStackNavigator({ TabNavigation }, { headerMode: "none" });

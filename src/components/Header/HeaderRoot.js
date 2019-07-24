import React, { Component } from "react";
import { PropTypes } from "prop-types";
import {
  View,
  // Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import {
  Button,
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Title,
  Left,
  Right
} from "native-base";
// import DrawerNavigation from '../../navigations/DrawerNavigation';
import colors from "../../styles/colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icon_Ionicons from "react-native-vector-icons/Ionicons";
import Icon_Entypo from "react-native-vector-icons/Entypo";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";

// dots-three-vertical

class CustomHeaderRoot extends Component {
  constructor(props) {
    super(props);
  }

  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  gotoDiscussion = () => {
    this._menu.hide();
    // alert("nbbb");
    this.props.navigation.navigate("DiscussionInfo");
  };

  deleteHandler = () => {
    this._menu.hide();
    alert("deleteHandler");
  };

  closeHandler = () => {
    this._menu.hide();
    alert("closeHandler");
  };

  gotoTask = () => {
    this._menu.hide();
    alert("Task info");
    this.props.navigation.navigate("TaskInfo");
  };

  option1Click = () => {
    this._menu.hide();
    this.props.option1Click();
  };

  render() {
    const {
      title,
      sub,
      openDotMenu,
      dotMenu,
      openDrawer,
      iconName,
      leftPress,
      type,
      iconNameRight,
      gotoDiscussion,
      navigation,
      add,
      goCreateDiscussion,
      screen,
      isAuthor,
      q_id,
      user_id,
      deleteHandler,
      closeHandler
    } = this.props;
    const rightIcon =
      type === "sub" ? (
        <Icon_Ionicons
          name="ios-arrow-back"
          size={45}
          color="white"
          onPress={openDrawer}
        />
      ) : (
        <Button transparent onPress={openDrawer}>
          <Icon name="bars" size={30} color="white" />
        </Button>
      );

    return (
      <View>
        <Header
          style={{ backgroundColor: "#6D0F49" }}
          androidStatusBarColor={"#6D0F49"}
        >
          <Left>{rightIcon}</Left>
          <Body style={{}}>
            <Title style={{ textAlign: "center",fontFamily:"Myriad", }}>{title}</Title>
          </Body>
          
            
            
          
        </Header>
      </View>
    );
  }
}

export default CustomHeaderRoot;

CustomHeaderRoot.propsTypes = {
  title: PropTypes.string,
  openDrawer: PropTypes.func.isRequired,
  iconName: PropTypes.string,
  leftPress: PropTypes.func,
  type: PropTypes.string,
  iconNameRight: PropTypes.string,
  sub: PropTypes.string,
  openDotMenu: PropTypes.func,
  gotoDiscussion: PropTypes.func,
  add: PropTypes.string,
  goCreateDiscussion: PropTypes.func,
  screen: PropTypes.string,
  isAuthor: PropTypes.bool,
  closeHandler: PropTypes.func,
  deleteHandler: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  headerCenter: {
    textAlign: "center"
  }
});

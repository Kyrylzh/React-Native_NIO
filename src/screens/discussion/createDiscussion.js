import React, { Component } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icon_Ionicons from "react-native-vector-icons/Ionicons";
import {
  Container,
  Header,
  Content,
  Button,
  Text,
  Input,
  Label,
  Item,
  Form
} from "native-base";
import SearchInput, { createFilter } from "react-native-search-filter";
const KEYS_TO_FILTERS = ["user.name", "subject", "description"];
import { CheckBox } from "react-native-elements";
import Icon_MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import CustomHeader from "./../../components/Header/Header";
import NextArrorButton from "./../../components/button/NextArrorButton";
import CustomHeaderRoot from "./../../components/Header/HeaderRoot";

class CreateDiscussion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      searchTerm: "",
      checked: true,
      valueArray: [],
      disabled: false,
      allUsers: null,
      isLoading: false,
      userDetails: null
    };

    this.getUserDetails();
  }

  async getUserDetails() {
    // alert("getUserDetails in createDiscussion");
    try {
      let userDeatails = await AsyncStorage.getItem("userDetails");
      console.log("In Discussion : " + userDeatails + " ********** ");
      let userDeatailsJson = JSON.parse(userDeatails);

      console.log(
        "In  CReate Discussion state :",
        userDeatailsJson,
        " ********** "
      );
      console.log(
        "In Discussion : Role ",
        userDeatailsJson.name,
        " ********** "
      );

      this.setState({
        userDetails: userDeatailsJson
      });
      console.log(
        "End of In Create Discussion :********** ",
        this.state.userDetails.name
      );
    } catch (error) {
      alert(error);
    }
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }

  FloatingButtonEvent = () => {
    Alert.alert("Floating Button Clicked");
  };

  renderArray = () => {
    console.log("in render array function ", this.state.valueArray);
  };

  async createDis() {
    const topic = this.state.text;
    console.log("Topic : " + topic);

    if (topic === "") {
      alert("Please add Discussion Topic");
    } else {
      var data = {
        user_id: this.state.userDetails.id,
        question: topic
      };

      try {
        let response = await fetch(
          " http://cupdes.com/api/v1/create-question",
          {
            method: "POST",
            headers: {
              "X-AUTH-TOKEN": "Px7zgU79PYR9ULEIrEetsb",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          }
        )
          .then(response => response.json())
          .then(responseJson => {
            alert(responseJson.message);
            this.dataHandler(responseJson);
          });
      } catch (errors) {
        alert(errors);
      }
      this.props.navigation.navigate("AddDiscussionUser");
    }
  }

  //  this.props.navigation.navigate('DrewerNav');

  dataHandler = data => {
    console.log("In data Handler create Discussion : ", data);
    this.setDiscussionId(data.data.id);
  };

  setDiscussionId = async id => {
    console.log("setSubTaskId async ", id);
    try {
      await AsyncStorage.setItem("discussionId", JSON.stringify(id));
      console.log("setSubTaskId saves asyn");
    } catch (error) {
      alert("discussionId store error");
    }
    console.log("End the discussionId");
  };

  clickHandler = () => {
    // alert("clickHandler");
    this.createDis();
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.containerWait}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <ScrollView
          style={{
            backgroundColor: "white"
          }}
        >
          <CustomHeaderRoot
            title="Create Discussion"
            alignItems="center"
            type="sub"
            // sub="dotMenu"
            openDrawer={() => this.props.navigation.goBack(null)}
          />

          <Form style={styles.inputwrapper}>
            <Item>
              <Icon name="plus" size={25} color="#7a7e7f" />
              <Input
                style={styles.input}
                placeholder="Create Group Desscusion here"
                placeholderTextColor={"#7a7e7f"}
                name="name"
                multiline={true}
                onChangeText={text => this.setState({ text })}
                autoFocus={true}
                maxLength={175}
              />
            </Item>
          </Form>
          <TouchableOpacity>
            <Button style={styles.btnLogin1} onPress={this.clickHandler}>
              <Text style={{ color: "#222" }}>CREATE</Text>
            </Button>
          </TouchableOpacity>
        </ScrollView>
      );
    }
  }
}

export default CreateDiscussion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start"
  },
  emailItem: {
    borderBottomWidth: 0.5,
    borderColor: "rgba(0,0,0,0.3)",
    padding: 10
  },
  emailSubject: {
    color: "rgba(0,0,0,0.5)"
  },
  searchInput: {
    padding: 10
    //   borderColor: '#CCC',
    //   borderWidth: 1
  },

  cardContainer: {
    // margin:10,
    textAlign: "center",
    alignItems: "center"
  },
  card: {
    // borderLeftColor: '#6D0F49',
    // borderLeftWidth: 10,
  },
  headerBlock: {
    // flex:1,
    flexDirection: "row",
    backgroundColor: "#e1e6ef"
  },
  header: {
    fontSize: 24
  },

  textContainer: {
    padding: 10,
    backgroundColor: "#c7ccd6"
  },

  text: {},

  TouchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30
  },

  FloatingButtonStyle: {
    resizeMode: "contain",
    width: 90,
    height: 90
    //backgroundColor:'black'
  },

  inputwrapper: {
    marginTop: 250,
    marginBottom: 40,

    paddingLeft: 25,
    paddingRight: 30
  },

  input: {
    minHeight: 5,
    fontSize: 15,
    color: "#7a7e7f",
    textAlign: "center"
  },
  btnLogin1: {
    width: 150,
    height: 35,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    borderColor: "#2222",
    opacity: 0.7,
    borderWidth: 2,
    borderRadius: 28
  }
});

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
import { StackActions } from "react-navigation";

const pushAction = StackActions.push({
  routeName: "Discussion"
  // params: {
  //   myUserId: 9,
  // },
});

class UpdateDiscussion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "dfgdfgdf",
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
    // alert("getUserDetails");
    try {
      let userDeatails = await AsyncStorage.getItem("userDetails");
      let discussionDetails = await AsyncStorage.getItem("discussionDetails");
      console.log("In What is Discussion : " + userDeatails + " ********** ");
      console.log(
        "In What is Discussion : " + discussionDetails + " ********** "
      );

      // let userDeatails = JSON.stringify(userDeatails);
      let userDeatailsJson = JSON.parse(userDeatails);
      let discussionDetailsJson = JSON.parse(discussionDetails);

      console.log("In What is Discussion : ", userDeatailsJson, " ********** ");
      console.log(
        "In What is Discussion : discussionDetails ",
        discussionDetails,
        " ********** "
      );

      console.log(
        "In What is Discussion : Role ",
        userDeatailsJson.name,
        " ********** "
      );
      console.log(
        "In What is Discussion : id ",
        userDeatailsJson.id,
        " ********** "
      );

      console.log(
        "In What is Discussion : Question Details ",
        discussionDetailsJson.question_id,
        " ********** "
      );

      this.setState({
        userDetails: userDeatailsJson,
        discussionDetails: discussionDetailsJson
      });
      console.log(
        "End of In What is Discussion : ",
        this.state.userDetails,
        "********** ",
        this.state.userDetails.name,
        " user ID ",
        this.state.userDetails.id
      );

      console.log(
        "End of In What is Discussion : discussionDetails updated Discussion ",
        this.state.discussionDetails,
        "********** Question ",
        this.state.discussionDetails.question_id
      );
      //alert(a)
      // if (thistoken != null) {
      //   this.handletoken(thistoken);
      // } else {
      //   this.props.navigation.Login();
      // }
    } catch (error) {
      alert(error);
      // this.props.navigation.Login();

      // this.fetchDiscussionUser();
    }

    this.setDiscussion(this.state.discussionDetails.question);
  }

  setDiscussion(data) {
    this.setState({
      text: data
    });
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

  async updateDis() {
    const topic = this.state.text;
    console.log("Topic : " + topic);

    // if (topic === "") {

    //   alert("Please add Discussion Topic");
    // } else {

    var data = {
      user_id: this.state.userDetails.id,
      question_id: this.state.discussionDetails.question_id,
      question: this.state.text
    };

    console.log("Body Update : ", JSON.stringify(data));

    try {
      let response = await fetch(" http://cupdes.com/api/v1/update-question", {
        method: "POST",
        headers: {
          "X-AUTH-TOKEN": "Px7zgU79PYR9ULEIrEetsb",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(responseJson => {
          // alert(responseJson.message);
          this.dataHandler(responseJson);
        });
    } catch (errors) {
      alert(errors);
    }
    //   this.props.navigation.navigate("AddDiscussionUser");
    // this.props.navigation.navigate("Discussion");
    this.props.navigation.dispatch(pushAction);
  }
  //   }

  //  this.props.navigation.navigate('DrewerNav');

  dataHandler = data => {
    console.log("In data Handler Update  Discussion response : ", data);
    alert(data.message);
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
    alert("clickHandler");
    this.updateDis();
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
            title="Update Discussion"
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
                value={this.state.text}
                onChangeText={text => this.setState({ text })}
                autoFocus={true}
                maxLength={175}
              />
            </Item>
          </Form>
          <TouchableOpacity>
            <Button style={styles.btnLogin1} onPress={this.clickHandler}>
              <Text style={{ color: "#222" }}>Update</Text>
            </Button>
          </TouchableOpacity>
        </ScrollView>
      );
    }
  }
}

export default UpdateDiscussion;

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

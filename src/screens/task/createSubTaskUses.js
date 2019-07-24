import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon_Ionicons from "react-native-vector-icons/Ionicons";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Subtitle
} from "native-base";
import SearchInput, { createFilter } from "react-native-search-filter";
const KEYS_TO_FILTERS = ["user.name", "subject", "description"];
import { CheckBox } from "react-native-elements";
import Icon_MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CustomHeader from "./../../components/Header/Header";
import NextArrorButton from "./../../components/button/NextArrorButton";
import CustomHeaderRoot from "./../../components/Header/HeaderRoot";
import { StackActions } from "react-navigation";

// const pushAction = StackActions.push({
//   routeName: "Discussion"
//   // params: {
//   //   myUserId: 9,
//   // },
// });

const popAction = StackActions.pop({
  n: 2
});

user_list = [
  {
    id: 1,
    user: {
      name: "Juniper"
    },
    subject: "Hello World!",
    description:
      "Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator."
  },
  {
    id: 2,
    user: {
      name: "Robert"
    },
    subject: "React is <3",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. .... To take a trivial example, which of us ever undertakes laborious physical exercise  "
  },
  {
    id: 3,
    user: {
      name: "Dulanga"
    },
    subject: "What's Up?",
    description:
      "Reference site about Lorem Ipsum, giving  chanaka information on its origins, as well as a random Lipsum generator."
  },
  {
    id: 4,
    user: {
      name: "Georgia"
    },
    subject: "How are you today?",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. .... To take a trivial example, which of us ever undertakes laborious physical exercise  "
  },
  {
    id: 5,
    user: {
      name: "Albert"
    },
    subject: "Hey!",
    description:
      "Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator."
  },
  {
    id: 6,
    user: {
      name: "Zoey"
    },
    subject: "React Native!",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. .... To take a trivial example, which of us ever undertakes laborious physical exercise  "
  },
  {
    id: 7,
    user: {
      name: "Cody"
    },
    subject: "is super!",
    description:
      "Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator."
  },
  {
    id: 8,
    user: {
      name: "Chili"
    },
    subject: "Awesome!",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. .... To take a trivial example, which of us ever undertakes laborious physical exercise  "
  }
];

const pushAction = StackActions.push({
  routeName: "PendingTask"
  // routeName: "DrewerNavSLA"
  // routeName: "DrawerScreen2"

  // params: {
  //   myUserId: 9,
  // },
});

class CreateSubTaskUses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      searchTerm: "",
      checked: true,
      valueArray: [],
      subTask_userId: [],
      disabled: false,
      allUsers: null,
      isLoading: true
    };

    this.index = 0;

    this.animatedValue = new Animated.Value(0);

    this.renderArray();
    this.getUserDetails();
    // this.getAllUsers();
  }

  // async getUserDetails() {
  //   // alert("getUserDetails in createDiscussion user Adder");
  //   try {
  //     let userDeatails = await AsyncStorage.getItem("userDetails");
  //     let discussionId = await AsyncStorage.getItem("discussionId");

  //     console.log("In Discussion add user : " + userDeatails + " ********** ");
  //     console.log("In Discussion add user : " + discussionId + " ********** ");

  //     let discussionIdJson = JSON.parse(discussionId);
  //     let userDeatailsJson = JSON.parse(userDeatails);

  //     console.log(
  //       "In  CReate Discussion state :",
  //       userDeatailsJson,
  //       " ********** "
  //     );
  //     console.log(
  //       "In Discussion : Role ",
  //       userDeatailsJson.name,
  //       " ********** "
  //     );
  //     console.log(
  //       "In  CReate Discussion state :",
  //       discussionIdJson,
  //       " ********** "
  //     );

  //     this.setState({
  //       userDetails: userDeatailsJson,
  //       discussionId: discussionIdJson
  //     });
  //     console.log(
  //       "End of In Create Discussion :********** ",
  //       this.state.userDetails.name,
  //       " discussionId in state " + this.state.discussionId
  //     );
  //   } catch (error) {
  //     alert(error);
  //   }

  //   this.getAllUsers();
  // }

  async getUserDetails() {
    // alert("getUserDetails");
    try {
      let userDeatails = await AsyncStorage.getItem("userDetails");
      let subTaskId = await AsyncStorage.getItem("subTaskId");
      console.log("In Create Task Admin  : " + userDeatails + " ********** ");
      console.log(
        "In Create Task Sub Task ID  : " + subTaskId + " ********** "
      );

      // let userDeatails = JSON.stringify(userDeatails);
      let userDeatailsJson = JSON.parse(userDeatails);
      let subTaskIdJson = JSON.parse(subTaskId);

      console.log("In Create Task Admin  : ", userDeatailsJson, " ********** ");
      console.log(
        "In Create Task subTaskIdJson  : ",
        subTaskIdJson,
        " ********** "
      );

      console.log(
        "In Create Task Admin  :  Role ",
        userDeatailsJson.name,
        " ********** "
      );

      this.setState({
        userDetails: userDeatailsJson,
        subTaskId: subTaskIdJson
      });
      console.log(
        "End of the Create Task Admin  ********** ",
        this.state.userDetails.name
      );

      console.log(
        "End of the Create Task subTaskId  ********** ",
        this.state.subTaskId
      );
    } catch (error) {
      alert(error);
    }

    this.getAllUsers();
  }

  getAllUsers = async () => {
    console.log("Fetching.... getAllUsers");
    const id = this.state.userDetails.id;
    await fetch(`http://cupdes.com/api/v1/get-allusers/${id}`, {
      method: "GET",
      headers: {
        "X-AUTH-TOKEN": "Px7zgU79PYR9ULEIrEetsb",
        "Content-Type": "XMLHttpRequest"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        this.datahandler(responseJson.data);
      })
      .done();
  };

  datahandler(data) {
    console.log("in dataHandler getAllUsers ", data);

    this.setState({
      allUsers: data,
      isLoading: false
    });

    console.log(this.state.discussions, " ***********");

    console.log(" ***********", this.state.allUsers, " ***********");
  }
  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }

  FloatingButtonEvent = () => {
    Alert.alert("Floating Button Clicked");
  };

  clickHandler = () => {
    // alert("Clicked");
    // () => this.requestCreateDiscussion;
    this.requestCreateDiscussion();
    // this.props.navigation.navigate("DrawerScreen2");
    // this.renderArray();

    // this.props.navigation.goBack(null);
  };

  async requestCreateDiscussion() {
    console.log("requestCreateDiscussion ");
    const subTask_userId = this.state.subTask_userId;
    console.log("subTask_userId : ", subTask_userId);
    console.log("subTask_userId dicision : " + (subTask_userId.length != 0));

    if (subTask_userId.length == 0) {
      alert("Please Add at least one for the discussion");
    } else {
      var data = {
        subtask_id: this.state.subTaskId,
        user_ids: this.state.subTask_userId
      };

      console.log(" create sub task add user details ", JSON.stringify(data));

      try {
        let response = await fetch(
          "http://cupdes.com/api/v1/create-subtaskusers",
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
            this.userCeatedataHandler(responseJson);
          });
      } catch (errors) {
        alert(errors);
      }
      // this.props.navigation.navigate("DrawerScreen2");DrewerNavSLA
      // this.props.navigation.navigate("DrewerNavSLA");
      this.props.navigation.dispatch(pushAction);
      // this.props.navigation.dispatch(popAction);
    }
  }

  //  this.props.navigation.navigate('DrewerNav');

  userCeatedataHandler = data => {
    console.log("In data Handler create Discussion : ", data);
  };

  checkDuplicate(data) {
    var res = false;
    console.log("checkDuplicate ", data);
    console.log(" newArray with check Duplicates ", this.state.valueArray);
    console.log(
      " newArray with check Duplicates length ",
      this.state.valueArray.length
    );
    const len = this.state.valueArray.length;
    console.log(" for loop lenght ", len);
    for (let i = 0; i < len; i++) {
      console.log("data printing iteration ", i);
      console.log(
        "data printing iteration ",
        this.state.valueArray[i].user.name
      );
      console.log(
        "this.state.valueArray[i].user.name ",
        this.state.valueArray[i].user.name
      );
      console.log("data.name ", data.name);
      console.log(
        "this.state.valueArray[i].user.name === data.name ",
        this.state.valueArray[i].user.name === data.name
      );

      if (this.state.valueArray[i].user.name === data.name) {
        console.log("Catch Duplicate");
        res = true;
        break;
      }
    }
    return res;
  }

  addUserHandler(data) {
    // alert("addUserHandler", data);
    console.log("addUserHandler data", data);

    if (this.checkDuplicate(data)) {
      alert("Already add the " + data.name + " Please pick another one");
    } else {
      this.animatedValue.setValue(0);

      // let newlyAddedValue = { user: { index: this.index, name: name } };

      // let newlyAddedValue = { id: user.id };

      let newlyAddedValue = {
        user: {
          index: this.index,
          name: data.name,
          id: data.id
          // image_path: data.image_path
        }
        // user: { id: data.id }
        // id: data.id
      };

      let newUser_id = {
        id: data.id
      };

      // let newlyAddedValue = { id: user.id };
      console.log(" newlyAddedValue ", newlyAddedValue);
      this.state.valueArray.push(newlyAddedValue);
      this.state.subTask_userId.push(newUser_id);

      // let newlyAddedValue = { name: name };

      this.setState(
        {
          disabled: true
          // valueArray: [...this.state.valueArray, newlyAddedValue]
        },

        () => {
          Animated.timing(this.animatedValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
          }).start(() => {
            this.index = this.index + 1;
            this.setState({ disabled: false });
          });
        }
      );

      console.log(" ^^^^^^^^^^^^^ ", this.state.valueArray);

      console.log("New Value Array ", this.state.valueArray);
      console.log(
        "New Value Array second Level Admin subTask_userId ",
        this.state.subTask_userId
      );
      console.log("after calling addUser function");
    }
  }

  addUser() {
    console.log("addUser function");
  }

  renderArray = () => {
    console.log("in render array function ", this.state.valueArray);
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.containerWait}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      const animationValue = this.animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-59, 0]
      });

      let newArray = this.state.valueArray.map((item, key) => {
        if (key == this.index) {
          return (
            <Animated.View
              key={item.user.name}
              style={[
                styles.viewHolder,
                {
                  opacity: this.animatedValue,
                  transform: [{ translateY: animationValue }]
                }
              ]}
            >
              <Text style={styles.text}>Image {item.user.name}</Text>
            </Animated.View>
          );
        } else {
          return (
            // <View key={key} style={styles.viewHolder}>
            //   <Text style={styles.text}>Row {item.user.index}</Text>
            //   <Text style={styles.text}>Row {item.user.name}</Text>
            // </View>

            <View key={item.user.name} style={styles.cardContainer}>
              {console.log(" Add Discussion User ", item.user)}

              <View style={styles.card}>
                <View style={styles.headerBlock}>
                  <View
                    style={{
                      height: 75,
                      backgroundColor: "white",
                      paddingTop: 10,
                      paddingRight: 3
                    }}
                  >
                    {/* <Icon_Ionicons
                      name="md-contact"
                      size={25}
                      color="#6D0F49"
                    /> */}
                    {/* <Image
                      source={{ uri: item.user.image_path }}
                      style={{ height: 25, width: 25, borderRadius: 25 }}
                    /> */}

                    <Badge style={{ backgroundColor: "#6D0F49" }}>
                      <Text style={{ color: "white" }}>
                        {item.user.name.charAt(0).toUpperCase()}
                      </Text>
                    </Badge>
                  </View>
                  {/* <View style={{width: '25%', height: 75, backgroundColor: 'powderblue',  padding:10,}} >
                    <Text style={styles.header}>
                         {email.user.name}
                    </Text>
                  </View> */}
                  <View
                    style={{
                      height: 75,
                      backgroundColor: "white",
                      paddingTop: 10,
                      paddingRight: 6
                    }}
                  >
                    {/* <CheckBox
                        title={email.user.name}
                        iconRight
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checkedColor="red"
                        checked={() =>
                          this.setState({ checked: !this.state.checked })
                        }
                      /> */}
                    {console.log(" &&&&&&&&&&&&&&777 ", item.user)}
                    <Text>{item.user.name}</Text>
                  </View>
                </View>
              </View>
            </View>
          );
        }
      });

      // const filteredEmails = user_list.filter(this.state.allUsers
      // const filteredEmails = this.state.allUsers.filter(
      let users = this.state.allUsers;
      console.log("All user : ", users);
      console.log("All user data : ", user_list);

      const filteredEmails = users.filter(
        createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
      );
      return (
        <View>
          <ScrollView
            style={{
              backgroundColor: "white"
              // flexDirection: "column"
            }}
          >
            <CustomHeaderRoot
              title="Add User"
              alignItems="center"
              type="sub"
              // sub="dotMenu"
              openDrawer={() => this.props.navigation.goBack(null)}
            />
            <View>
              <View>
                <Text style={{ marginTop: "2%" }}>Add Your Participant...</Text>

                <ScrollView horizontal={true} style={{ marginTop: "3%" }}>
                  <View style={{ flex: 1, flexDirection: "row", padding: 4 }}>
                    {newArray}
                  </View>
                </ScrollView>
                <SearchInput
                  onChangeText={term => {
                    this.searchUpdated(term);
                  }}
                  style={styles.searchInput}
                  placeholder="Type a message to search"
                />
              </View>
              <ScrollView>
                {filteredEmails.map(email => {
                  console.log(" &&&&&&& " + email.name + "   " + email.id);
                  return (
                    <View key={email.id} style={styles.cardContainer}>
                      <TouchableOpacity
                        onPress={() => this.addUserHandler(email)}
                      >
                        <View style={styles.card}>
                          <View style={styles.headerBlock}>
                            <View
                              style={{
                                width: "20%",
                                height: 75,
                                backgroundColor: "white",
                                paddingLeft: 10
                              }}
                            >
                              {/* <Icon_Ionicons
                                name="md-contact"
                                size={45}
                                color="#6D0F49"
                              /> */}
                              {/* <Image
                                source={{ uri: email.image_path }}
                                style={{
                                  height: 25,
                                  width: 25,
                                  borderRadius: 25
                                }}
                              /> */}

                              <Badge style={{ backgroundColor: "#6D0F49" }}>
                                <Text style={{ color: "white" }}>
                                  {email.name.charAt(0).toUpperCase()}
                                </Text>
                              </Badge>
                            </View>
                            <View
                              style={{
                                width: "80%",
                                height: 75,
                                backgroundColor: "white",

                                paddingTop: 12
                              }}
                            >
                              <Text>{email.name}</Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </ScrollView>

          <View
            style={{
              position: "absolute",
              bottom: 0,
              right: 0
            }}
          >
            <NextArrorButton handleNextButton={this.clickHandler} />
          </View>
        </View>
      );
    }
  }
}

export default CreateSubTaskUses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start"
  },
  emailItem: {
    borderBottomWidth: 0.5,
    borderColor: "rgba(0,0,0,0.3)"
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
    // marginTop: "50%",
    // marginBottom: "40%"
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
  }
});

import React, { Component } from "react";
import {
  Text,
  Platform,
  StyleSheet,
  View,
  Image,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableHighlight,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title
} from "native-base";
import CustomHeader from "../../../components/Header/Header";
import DiscussedCard from "./discussedCard";
import Icon_Ionicons from "react-native-vector-icons/Ionicons";
import Icon_Material from "react-native-vector-icons/MaterialCommunityIcons";
import Icon_MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import BackgroundTimer from "react-native-background-timer";
// class WhatIsTask extends Component {

import { StackActions } from "react-navigation";

const pushAction = StackActions.push({
  routeName: "Discussion"
  // params: {
  //   myUserId: 9,
  // },
});

class WhatIsDiscussion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      isLoading: true,
      isAnswer: "yes",
      answers: null,
      isAuthor: false,
      isLoadingAnswer: true,
      intervalId: "",
      isLoadingUserDetails: true
    };
    console.log("Here What is");

    // this.fetchAnswer();

    this.getUserDetails();
    // this.fetchDiscussion();

    () => console.log("Helooo Time Out");
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
    alert("gotoDiscussion");
  };

  fetchDiscussion = async () => {
    console.log("Fetching.... Discussion");
    let q_id = this.state.discussionDetails.question_id;
    console.log(
      "Fetching.... Discussion discussion Info ",
      this.state.discussionDetails
    );
    await fetch(`http://cupdes.com/api/v1/get-question/${q_id}`, {
      method: "GET",
      headers: {
        "X-AUTH-TOKEN": "Px7zgU79PYR9ULEIrEetsb",
        "Content-Type": "XMLHttpRequest"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        this.datahandler(responseJson);
      })
      .done();
  };

  datahandler(data) {
    console.log("in dataHandler what is discussions fetchDiscussion ", data);

    this.setState({
      discussions: data,
      isLoading: false
    });

    if (data.data.user_id == this.state.userDetails.id) {
      this.setState({
        isAuthor: true
      });
    }

    console.log(this.state.discussions, " fetchDiscussion ***********");
    console.log(
      this.state.discussions.data,
      " Data fetchDiscussion ***********"
    );

    console.log(
      this.state.discussions.data.closed,
      " Data closed fetchDiscussion ***********"
    );

    console.log(
      this.state.discussions.data.user_id,
      " fetchDiscussion ***********"
    );

    console.log(
      " User Details in fetchDiscussion ",
      this.state.userDetails.id,
      " fetchDiscussion ***********"
    );

    console.log(
      " Disission ",
      parseInt(this.state.userDetails.id) ===
        this.state.discussions.data.user_id
    );

    // console.log(this.state.discussions.data.question, " ***********");
  }

  fetchAnswer = async () => {
    let q_id = this.state.discussionDetails.question_id;
    console.log("q_id in fetch Answer " + q_id);

    console.log("Fetching.... Discussion Answer");
    await fetch(`http://cupdes.com/api/v1/get-answers/${q_id}`, {
      // await fetch(`http://cupdes.com/api/v1/get-answers/3`, {
      method: "GET",
      headers: {
        "X-AUTH-TOKEN": "Px7zgU79PYR9ULEIrEetsb",
        "Content-Type": "XMLHttpRequest"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        this.ansdatahandler(responseJson);
      })
      .done();
  };

  ansdatahandler(data) {
    console.log("in dataHandler what is discussions answers data ", data);
    console.log("in dataHandler what is discussions answers data ", data.data);

    console.log(
      "in dataHandler what is discussions answers data ",
      data.data.length
    );

    {
      data.data.length === 0
        ? this.setState({
            isAnswer: "no"
          })
        : null;
      // alert("HAve");
    }

    console.log("state is Andswer " + this.state.isAnswer);
    console.log("state is data in ansdatahandler ", data);

    this.setState({
      answers: data,
      isLoadingAnswer: false
    });

    console.log(
      "in state what is discussion fetch answer",
      this.state.answers,
      " ***********"
    );
    console.log(this.state.answers.data, " ***********");

    // console.log(this.state.discussions.data.question, " ***********");
  }

  createAnswer() {
    // alert(this.state.text);
    this.putAnswer();
    // onContentSizeChange={(contentWidth, contentHeight) => {
    this.scrollView.scrollToEnd({ animated: true });
    // }}
  }

  async putAnswer() {
    console.log("Data to the put answer : user_id" + this.state.userDetails.id);
    console.log(
      "Data to the put answer : question_id " +
        this.state.discussionDetails.question_id
    );

    var data = {
      // email: this.state.email,
      // password: this.state.password

      // user_id: 5,
      user_id: this.state.userDetails.id,
      // user_id: 7,
      question_id: this.state.discussionDetails.question_id,
      answer: this.state.text
    };

    try {
      let response = await fetch("http://cupdes.com/api/v1/create-answer", {
        method: "POST",
        headers: {
          "X-AUTH-TOKEN": "Px7zgU79PYR9ULEIrEetsb",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log("Put answer: ", responseJson);
          // alert(responseJson.message);
        });
    } catch (errors) {
      alert(errors);
      console.log("Errors occurs in whats discussion ", errors);
    }
    // this.getUserDetails();
    // fetchAnswer
    // this.fetchDiscussion();
    this.fetchAnswer();
    console.log("Answer put to the backend");
    this.setState({
      text: "",
      isAnswer: "yes"
    });
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
        "In What is Discussion : ",
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
        "End of In What is Discussion : discussionDetails ",
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
    }

    // this.fetchDiscussion();
    this.fetchAnswer();
    this.fetchDiscussion();

    this.backGroundTask();
    this.fetchUserDiscussion();
  }

  fetchUserDiscussion = async () => {
    console.log("Fetching.... Discussion");
    let data = this.state.discussionDetails;
    console.log("Fetching.... Discussion discussion Info ", data);

    console.log("Fetching.... Discussion discussion Info userID ");

    // console.log("Fetching.... Discussion discussion Info ", data);
    console.log(
      "Fetching.... Discussion discussion Info userID ",
      data.question_id
    );

    await fetch(
      `http://cupdes.com/api/v1/get-questionusers/${data.question_id}`,
      {
        method: "GET",
        headers: {
          "X-AUTH-TOKEN": "Px7zgU79PYR9ULEIrEetsb",
          "Content-Type": "XMLHttpRequest"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log("Response of getUser Question ", responseJson);

        this.discussionUserdatahandler(responseJson);
      })
      .done();
  };

  discussionUserdatahandler(data) {
    console.log(
      "in dataHandler what is discussions fetchDiscussionUser ",
      data
    );

    this.setState({
      discussionsUser: data
      // isLoading: false
    });

    console.log(this.state.discussionsUser, " fetchDiscussion ***********");
    console.log(
      this.state.discussionsUser.data,
      " Data fetchDiscussion user Data ***********"
    );

    this.setState({
      // discussionsUser: data,
      isLoadingUserDetails: false
    });
  }

  backGroundTask() {
    const intervalId = BackgroundTimer.setInterval(() => {
      // this will be executed every 200 ms
      // even when app is the the background
      console.log("tic");
      this.fetchAnswer();
    }, 5000);

    // Cancel the timer when you are done with it
    // BackgroundTimer.clearInterval(intervalId);
    this.setState({
      intervalId
    });
  }

  deleteHandler = () => {
    // alert("in Whats is discussion deleteHandler");
    BackgroundTimer.clearInterval(this.state.intervalId);
    this.deleteRequest();
  };

  deleteRequest = async () => {
    console.log("Fetching.... deleteRequest ", this.state.discussionDetails);
    let q_id = this.state.discussionDetails.question_id;
    let user_id = this.state.userDetails.id;

    console.log("Fetching.... deleteRequest " + q_id + " user_id " + user_id);

    var data = {
      user_id: this.state.userDetails.id,
      question_id: this.state.discussionDetails.question_id
    };

    try {
      let response = await fetch("http://cupdes.com/api/v1/delete-question", {
        method: "POST",
        headers: {
          "X-AUTH-TOKEN": "Px7zgU79PYR9ULEIrEetsb",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log("Delete Post is  : ", responseJson);
          alert(responseJson.message);
          this.deleteDatahandler(responseJson);
        });
    } catch (errors) {
      alert(errors);
    }
    // this.props.navigation.goBack(null);
    this.props.navigation.dispatch(pushAction);
  };

  deleteDatahandler(data) {
    console.log("in dataHandler delete Quetion user %%%%% ", data);
  }

  closeHandler = () => {
    // alert("in Whats is discussion closeHandler");
    BackgroundTimer.clearInterval(this.state.intervalId);
    this.closeRequest();
  };

  closeRequest = async () => {
    console.log("Fetching.... closeRequest ", this.state.discussionDetails);
    let q_id = this.state.discussionDetails.question_id;
    let user_id = this.state.userDetails.id;

    console.log("Fetching.... closeRequest " + q_id + " user_id " + user_id);

    var data = {
      user_id: this.state.userDetails.id,
      question_id: this.state.discussionDetails.question_id
    };

    try {
      let response = await fetch("http://cupdes.com/api/v1/close-question", {
        method: "POST",
        headers: {
          "X-AUTH-TOKEN": "Px7zgU79PYR9ULEIrEetsb",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log("closeRequest Post is  : ", responseJson);
          alert(responseJson.message);
          this.closeDatahandler(responseJson);
        });
    } catch (errors) {
      alert(errors);
    }
    this.props.navigation.goBack(null);
  };

  closeDatahandler(data) {
    console.log("in closeDatahandler Close Quetion user %%%%% ", data);
  }

  discussionInfoHandler = () => {
    // alert("discussionInfoHandler");
    BackgroundTimer.clearInterval(this.state.intervalId);
    this._menu.hide();
    // alert("nbbb");
    this.props.navigation.navigate("DiscussionInfo");
  };

  render() {
    if (
      this.state.isLoading ||
      this.state.isLoadingAnswer ||
      this.state.isLoadingUserDetails
    ) {
      return (
        <View style={styles.containerWait}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, paddingBottom: 75, backgroundColor: "#fff" }}>
          <CustomHeader
            title=""
            alignItems="center"
            type="sub"
            sub="dotMenu"
            openDotMenu={() => alert("Clicked")}
            openDrawer={() => {
              this.props.navigation.goBack(null);
              BackgroundTimer.clearInterval(this.state.intervalId);
              // BackgroundTimer.stop();
              console.log("Back Press");
            }}
            navigation={this.props.navigation}
            isAuthor={this.state.isAuthor}
            // q_id={this.state.discussionDetails.question_id}
            // user_id={this.state.userDetails.id}
            deleteHandler={this.deleteHandler}
            closeHandler={this.closeHandler}
            discussionInfoHandler={this.discussionInfoHandler}
            // intervalId={this.state.intervalId}
          />
          <View style={{ height: 2, backgroundColor: "#222" }} />
          <View
            style={{
              height: 65,
              backgroundColor: "#9F035C",
              flexDirection: "row"
            }}
            androidStatusBarColor={"#6D0F49"}
          >
            {/* <SearchBar /> */}

            <Left style={{ paddingLeft: 10 }}>
              <TouchableOpacity transparent>
                {/* <Icon name='md-contact' /> */}
                <Icon_Ionicons name="md-contact" color="white" size={30} />
              </TouchableOpacity>
            </Left>
            <Body>
              <View style={{ width: 280, paddingLeft: 15, paddingRight: 15 }}>
                {/* <Title>Header</Title> */}
                <ScrollView horizontal={true} style={{ paddingTop: 10 }}>
                  <Text style={styles.title}>
                    {this.state.discussionDetails.question}
                  </Text>
                </ScrollView>
              </View>
            </Body>
            <Right style={{ paddingRight: 10 }}>
              {/* <TouchableOpacity transparent>
                    <Icon_Ionicons name="md-contacts" color="white" size={30} />
                    <Text style={{ color: "white" }}>05</Text>
                  </TouchableOpacity> */}

              <TouchableOpacity
              // onPress={() => alert("Clicked")}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Menu
                    ref={this.setMenuRef}
                    button={
                      <View>
                        <Icon_Ionicons
                          name="md-contacts"
                          color="white"
                          size={30}
                        />
                        <Text style={{ color: "white" }}>
                          {this.state.discussionsUser.data.length}
                        </Text>
                      </View>
                    }
                  >
                    <MenuItem onPress={this.gotoDiscussion}>
                      Discussion
                    </MenuItem>
                    <MenuItem onPress={this.hideMenu}>Group Media</MenuItem>
                    <MenuItem onPress={this.hideMenu} disabled>
                      Search
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem onPress={this.hideMenu}>
                      Mute Notification
                    </MenuItem>
                    <MenuItem onPress={this.hideMenu}>More</MenuItem>
                  </Menu>
                </View>
                {/* <Icon_Entypo  name="dots-three-vertical"    
              
              size={25} color="white"
              />  */}
              </TouchableOpacity>
            </Right>
          </View>

          <ScrollView
            style={{ paddingBottom: 300 }}
            ref={ref => (this.scrollView = ref)}
            // onContentSizeChange={(contentWidth, contentHeight) => {
            //   this.scrollView.scrollToEnd({ animated: true });
            // }}
          >
            {/* <DiscussedCard /> */}
            {/* <Text>hjdfhjdhghfdjkgh dfdf</Text> */}
            {this.state.isAnswer === "no" ? (
              <Text />
            ) : (
              <View>
                {this.state.answers.data.reverse().map(email => {
                  return (
                    <View key={email.id} style={styles.cardContainer}>
                      {email.user_id === this.state.userDetails.id ? (
                        <View style={styles.card1}>
                          <View style={styles.headerBlock}>
                            <View style={styles.discription}>
                              <Text style={styles.header1}>{email.answer}</Text>
                            </View>
                          </View>
                        </View>
                      ) : (
                        <View>
                          <View style={{ flexDirection: "row" }}>
                            <View>
                              {/* <Image
                                style={{
                                  width: 30,
                                  height: 30,
                                  borderRadius: 30,
                                  marginTop: 10
                                }}
                                source={{
                                  uri:
                                    "https://i.pinimg.com/originals/7d/1a/3f/7d1a3f77eee9f34782c6f88e97a6c888.jpg"
                                }}
                              /> */}
                              <Image
                                source={{ uri: email.user.image_path }}
                                // style={{
                                //   width: 120,
                                //   height: 120,
                                //   position: "absolute",
                                //   borderRadius: 60
                                // }}
                                style={{
                                  width: 30,
                                  height: 30,
                                  borderRadius: 30,
                                  marginTop: 10
                                }}
                              />
                            </View>
                            <View style={styles.discription1}>
                              <Text style={styles.header}>{email.answer}</Text>
                            </View>
                          </View>
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            )}
          </ScrollView>
          {
            (console.log(
              "Here is the render method : discussion  ",
              this.state.discussions
            ),
            console.log(
              "Here is the render method : ",
              this.state.discussions.data.closed
            ))
          }
          {this.state.discussions.data.closed === "0" ? (
            <View
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                alignSelf: "flex-end"
              }}
            >
              <View style={styles.card}>
                <View style={styles.headerBlock}>
                  <View
                    style={{
                      width: "85%",
                      height: 75,
                      backgroundColor: "#9F035C",
                      padding: 10
                    }}
                  >
                    <TextInput
                      style={styles.textArea}
                      onChangeText={text => this.setState({ text })}
                      value={this.state.text}
                      placeholder={"Input your Discussion"}
                    />
                  </View>
                  <View
                    style={{
                      width: "15%",
                      height: 75,
                      backgroundColor: "#9F035C",
                      padding: 10
                    }}
                  >
                    <TouchableOpacity onPress={this.createAnswer.bind(this)}>
                      <Icon_Ionicons name="md-send" size={40} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ) : null}
        </View>
      );
    }
  }
}

export default WhatIsDiscussion;

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10
  },
  card: {
    // borderLeftColor: "#6D0F49",
    // borderLeftWidth: 10
  },
  card1: {
    // borderLeftColor: "#6D0F49",
    // borderLeftWidth: 10
    alignItems: "flex-end"
  },
  headerBlock: {
    // flex:1,
    flexDirection: "row",
    backgroundColor: "#fff"
  },
  header: {
    marginTop: "10%",
    // backgroundColor: "#c4c2c3",
    backgroundColor: "#e6e3e4",

    height: "auto",
    borderRadius: 5,
    padding: 15,
    alignItems: "flex-start",
    marginLeft: 10
  },
  header1: {
    backgroundColor: "#c4c2c3",
    height: "auto",
    borderRadius: 5,
    padding: 15
  },

  textContainer: {
    padding: 10,
    backgroundColor: "#c7ccd6"
  },

  text: {},

  discription1: {
    width: "75%",
    paddingRight: 10
    // height: 75,
  },

  textArea: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    width: "100%",
    color: "white"
  },

  title: {
    color: "white",

    fontSize: 14
  }
});

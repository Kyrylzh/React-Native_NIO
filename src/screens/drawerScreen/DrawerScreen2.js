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
  Title,
  Badge
} from "native-base";
// import DiscussionCard from "./discussionCard/discussionCard";
// import SearchBar from "./search/search";
import Icon_Ionicons from "react-native-vector-icons/Ionicons";
import Icon_Material from "react-native-vector-icons/MaterialCommunityIcons";
import SearchInput, { createFilter } from "react-native-search-filter";
import CustomHeader from "../../components/Header/Header";
import NextArrorButton from "../../components/button/NextArrorButton";
// import CreateDiscussion from "./../discussion/createDiscussion";
import Icon from "react-native-vector-icons/FontAwesome5";
import CustomHeaderRoot from "./../../components/Header/HeaderRoot";
const KEYS_TO_FILTERS = ["user.name", "subject", "description"];

//const  { width: WIDTH } = Dimentions.get()
export default class DrawerScreen2 extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.state = {
      searchTerm: "",
      discussions: "",
      isLoading: true,
      role: ""
    };
    // this.fetchDiscussion();
    this.getUserDetails();
  }

  // componentWillUnmount() {
  //   this.getUserDetails();
  // }

  iconHandler = () => {
    // alert("iconHandler");
    this.handleNextButton();
  };

  async getUserDetails() {
    // alert("getUserDetails");
    try {
      let userDeatails = await AsyncStorage.getItem("userDetails");
      console.log("In Discussion : " + userDeatails + " ********** ");
      let userDeatailsJson = JSON.parse(userDeatails);

      console.log("In Discussion :", userDeatailsJson, " ********** ");
      console.log(
        "In Discussion : Role ",
        userDeatailsJson.name,
        " ********** "
      );

      this.setState({
        userDetails: userDeatailsJson
      });
      console.log(
        "End of In Discussion :********** ",
        this.state.userDetails.name
      );
    } catch (error) {
      alert(error);
    }

    this.fetchDiscussion();
  }

  fetchDiscussion = async () => {
    const { userDetails } = this.state;
    console.log("User details : ", userDetails);

    console.log("Fetching.... Discussion");
    await fetch(
      `http://cupdes.com/api/v1/get-userquestions/${userDetails.id}`,
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
        this.datahandler(responseJson);
      })
      .done();
  };

  datahandler(data) {
    console.log("in dataHandler discussions ", data);

    this.setState({
      discussions: data,
      isLoading: false
    });

    console.log(this.state.discussions, " ***********");

    console.log(" ***********", this.state.discussions.data, " ***********");
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }

  clickHandler = () => {
    // alert("clicked add");
    // this.props.navigation.navigate("CreateDiscussion");
  };
  createkHandler() {
    // alert("clicked");
    this.props.navigation.navigate("loading");
    // this.props.navigation.navigate("SignUp");
  }

  gotoDiscussion = () => {
    this._menu.hide();
    // this.props.navigation.navigate("WhatIsDiscussion");WhatIsDiscussionStack
    this.props.navigation.navigate("WhatIsDiscussionStack");
    // alert("Clicked");
  };

  putQuestionDetails = async data => {
    console.log("In put Question Details ", data);
    try {
      await AsyncStorage.setItem("questionDetails", JSON.stringify(data));
      console.log("questionDetails saves asyn");
    } catch (error) {
      alert("questionDetails store error");
    }
    console.log("End the putQuestionDetails");
  };

  ignoHandler = () => {
    // alert("ignoHandler");
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
    this.props.navigation.goBack(null);
  };

  deleteDatahandler(data) {
    console.log("in dataHandler delete Quetion user %%%%% ", data);
  }

  approveHandler = () => {
    alert("approveHandler");
  };

  handleNextButton = () => {
    // console.log("handleNextRoundButton " + this.state.userDetails.name === "user");
    // alert("handleNextButton");
    this.props.navigation.navigate("CreateDiscussion");
  };

  // componentDidMount () {
  //   this.fetchData();
  // }

  // discussionsApprove = data => {
  //   alert(data);
  // };

  async discussionsApprove(questionDetails) {
    this.setDiscussionInfo(questionDetails);
    console.log("questionDetails in  discussionsApprove ", questionDetails);
    const { userDetails } = this.state;
    // alert("discussionsApprove");
    console.log("userDetails in  discussionsApprove ", userDetails);
    console.log("userDetails in  discussionsApprove id ", userDetails.id);

    var data = {
      user_id: userDetails.id,
      // user_id: 7,
      // userquestion_id: "8"
      userquestion_id: questionDetails.userquestion_id
    };

    try {
      let response = await fetch(
        "http://cupdes.com/api/v1/approve-userquestion",
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
          // this.dataHandler(responseJson);
          console.log("discussionsApprove ", responseJson);
          alert(responseJson.message);
          // }
        });
    } catch (errors) {
      alert(errors);
    }

    this.props.navigation.navigate("WhatIsDiscussion");
  }

  discussionsIgnore = async questionDetails => {
    // alert("discussionsIgnore");
    console.log(" in discussionsIgnore ", questionDetails);

    console.log("questionDetails in  discussionsIgnore ", questionDetails);
    const { userDetails } = this.state;
    // alert("discussionsApprove");
    console.log("userDetails in  discussionsIgnore ", userDetails);
    console.log("userDetails in  discussionsIgnore id ", userDetails.id);

    var data = {
      // user_id: parseInt(userDetails.id),
      user_id: userDetails.id,
      // user_id: 7,
      // userquestion_id: "8"
      // Question_id: parseInt(questionDetails.question_id)
      question_id: questionDetails.question_id
    };

    console.log("discussionsIgnore body api ", JSON.stringify(data));

    try {
      let response = await fetch(" http://cupdes.com/api/v1/delete-question", {
        method: "POST",
        headers: {
          "X-AUTH-TOKEN": "Px7zgU79PYR9ULEIrEetsb",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(responseJson => {
          // this.dataHandler(responseJson);
          console.log("discussionsIgnore ", responseJson);
          alert(responseJson.message);
          // }
        });
    } catch (errors) {
      alert(errors);
    }

    this.fetchDiscussion();
  };

  handlerDiscussion(data) {
    // alert("handlerDiscussion");
    console.log("In discussionHandler data : ", data);
    this.setDiscussionInfo(data);
  }

  setDiscussionInfo = async data => {
    console.log("setDiscussionInfo ", data);
    try {
      await AsyncStorage.setItem("discussionDetails", JSON.stringify(data));
      console.log("setDiscussionInfo saves asyn");
    } catch (error) {
      alert("setDiscussionInfo store error");
    }
    console.log("End the setDiscussionInfo");
    this.props.navigation.navigate("WhatIsDiscussion");
  };

  // componentDidMount() {
  //   console.log("Components Did Mount in Drawer Screen 2 : ");
  //   console.log(
  //     "Components Did Mount in Drawer Screen 2 : ",
  //     this.state.isLoading
  //   );

  //   this.state.isLoading = false;

  //   console.log(
  //     "Components Did Mount in Drawer Screen 2 : ",
  //     this.state.isLoading
  //   );
  // }

  // componentWillUnmount() {
  //   console.log("componentWillUnmount in Drawer Screen 2 : ");
  //   console.log(
  //     "componentWillUnmount in Drawer Screen 2 : ",
  //     this.state.isLoading
  //   );

  //   this.state.isLoading = false;

  //   console.log(
  //     "componentWillUnmount in Drawer Screen 2 : ",
  //     this.state.isLoading
  //   );
  // }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.containerWait}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      this.state.isLoading = true;
      const filteredEmails = this.state.discussions.data.filter(
        createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
      );
      return (
        <View>
          <View>
            <CustomHeaderRoot
              alignItems="center"
              title="Discussion"
              openDrawer={() => this.props.navigation.openDrawer()}
              // sub="dotMenu"
              gotoDiscussion={this.gotoDiscussion}
              navigation={this.props.navigation}
            />
          </View>

          <ScrollView>
            <View>
              {/* <SearchBar /> */}
              <Header
                style={{ backgroundColor: "#9F035C", alignItems: "center" }}
                androidStatusBarColor={"#6D0F49"}
              >
                {/* <Left>
                      <Button transparent>
                      <Icon name='arrow-back' />
                      </Button>
                  </Left> */}
                <Body>
                  {/* <Title>Header</Title> */}
                  <SearchInput
                    onChangeText={term => {
                      this.searchUpdated(term);
                    }}
                    style={styles.searchInput}
                    placeholder="Search"
                  />
                </Body>
              </Header>
            </View>

            <ScrollView>
              {filteredEmails.map(email => {
                {
                  console.log("in map Question ", email);
                  // this.putQuestionDetails(email);
                }
                return (
                  <View key={email.question_id + email.userquestion_id}>
                    {email.is_approved === "0" ? (
                      <View
                        style={styles.cardContainer}
                        // onPress={() =>
                        //   this.props.navigation.navigate("WhatIsDiscussion")
                        // }
                        // onPress={() => this.handlerDiscussion(email)}
                      >
                        <View style={styles.card}>
                          <View style={styles.headerBlock}>
                            <View
                              style={{
                                width: "25%",
                                height: 75,
                                backgroundColor: "#F5F5F5",
                                padding: 10
                              }}
                            >
                              {/* <Icon_Ionicons
                                name="md-contact"
                                size={45}
                                color="#6D0F49"
                              /> */}
                              <Image
                                source={{ uri: email.image }}
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
                            <View
                              style={{
                                width: "40%",
                                height: 75,
                                backgroundColor: "#F5F5F5",
                                padding: 10
                              }}
                            >
                              <Text style={styles.header}>{email.creator}</Text>
                              {/* <Text>Today, 12 AM</Text> */}
                              <Text
                                style={{ fontSize: 9, fontFamily: "Myriad" }}
                              >
                                {email.created_at}
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: "row-reverse",
                                width: "35%",
                                height: 75,
                                backgroundColor: "#F5F5F5",
                                padding: 10
                              }}
                            >
                              {/* <Text>{email.notification}</Text> */}
                              {/* <Text>"notify"</Text> */}
                              <View
                                style={{
                                  backgroundColor: "white",
                                  height: 40,
                                  width: 45,
                                  borderBottomRightRadius: 15,
                                  borderTopRightRadius: 15,
                                  alignItems: "center",
                                  marginTop: "10%"
                                }}
                              >
                                <TouchableOpacity
                                  style={{
                                    marginTop: "15%",
                                    alignItems: "center"
                                  }}
                                  onPress={() => this.discussionsIgnore(email)}
                                >
                                  <Icon
                                    name="times"
                                    size={26}
                                    color="#6D0F49"
                                  />
                                </TouchableOpacity>
                              </View>
                              <View
                                style={{
                                  backgroundColor: "#6D0F49",
                                  height: 40,
                                  width: 45,
                                  borderTopLeftRadius: 15,
                                  borderBottomLeftRadius: 15,
                                  alignItems: "center",
                                  marginTop: "10%"
                                }}
                              >
                                <TouchableOpacity
                                  style={{
                                    marginTop: "15%",
                                    alignItems: "center"
                                  }}
                                  onPress={() => this.discussionsApprove(email)}
                                >
                                  <Icon name="check" size={25} color="white" />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>

                          <View style={styles.textContainer}>
                            <Text style={styles.text}>{email.question}</Text>
                          </View>
                        </View>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={styles.cardContainer}
                        // onPress={() =>
                        //   this.props.navigation.navigate("WhatIsDiscussion")
                        // }
                        onPress={() => this.handlerDiscussion(email)}
                      >
                        <View style={styles.card}>
                          <View style={styles.headerBlock}>
                            <View
                              style={{
                                width: "25%",
                                height: 75,
                                backgroundColor: "#F5F5F5",
                                padding: 10
                              }}
                            >
                              {/* <Icon_Ionicons
                                name="md-contact"
                                size={45}
                                color="#6D0F49"
                              /> */}

                              {/* {console.log("email.image !== ", email.image)} */}
                              {email.image != "" ? (
                                <Image
                                  source={{ uri: email.image }}
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
                              ) : (
                                <Icon_Ionicons
                                  name="md-contact"
                                  size={45}
                                  color="#6D0F49"
                                />
                              )}
                              {/* <Image
                                source={{ uri: email.image }}
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
                              /> */}
                            </View>
                            <View
                              style={{
                                width: "40%",
                                height: 75,
                                backgroundColor: "#F5F5F5",
                                padding: 10
                              }}
                            >
                              <Text style={styles.header}>{email.creator}</Text>
                              {/* <Text>Today, 12 AM</Text> */}
                              <Text
                                style={{ fontSize: 9, fontFamily: "Myriad" }}
                              >
                                {email.created_at}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: "35%",
                                height: 75,
                                backgroundColor: "#F5F5F5",
                                padding: 10
                              }}
                            >
                              {/* <Text>{email.notification}</Text> */}
                              {/* <Text>"notify"</Text> */}
                            </View>
                          </View>

                          <View style={styles.textContainer}>
                            <Text style={styles.text}>{email.question}</Text>
                          </View>
                        </View>
                        {/* <View style={{ flexDirection: "row" }}>
                          <View style={{ width: "50%" }}>
                            <TouchableOpacity>
                              <Button
                                success
                                onPress={() => this.discussionsApprove(email)}
                              >
                                <Text> Success </Text>
                              </Button>
                            </TouchableOpacity>
                          </View>
                          <View style={{ width: "50%" }}>
                            <TouchableOpacity>
                              <Button
                                danger
                                onPress={() => this.discussionsIgnore(email)}
                              >
                                <Text> Danger </Text>
                              </Button>
                            </TouchableOpacity>
                          </View>
                        </View> */}
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })}

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.clickHandler}
                style={styles.TouchableOpacityStyle}
              >
                {/* <Image
                  source={{
                    uri:
                      "https://aboutreact.com/wp-content/uploads/2018/08/bc72de57b000a7037294b53d34c2cbd1.png"
                  }}
                  style={styles.FloatingButtonStyle}
                /> */}
                {/* <Text>Add</Text> */}
              </TouchableOpacity>
            </ScrollView>
          </ScrollView>

          <View
            style={{
              position: "absolute",
              bottom: 40,
              right: 0
            }}
          >
            {this.state.userDetails.name === "user" ? (
              <Text>{""}</Text>
            ) : (
              <NextArrorButton
                handleNextButton={this.handleNextButton}
                iconName="message-bulleted"
                iconType="MaterialCommunityIcons"
                style={{ backgroundColor: "yellow", height: 70 }}
              />
            )}
          </View>
        </View>
      );
    }
  }
}

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
    borderColor: "#CCC",
    height: 40,
    borderRadius: 24.5,
    width: 300,
    backgroundColor: "#6D0F49",
    fontFamily: "Myriad",
    color: "white"
  },

  cardContainer: {
    margin: 10
  },
  card: {
    borderLeftColor: "#6D0F49",
    borderLeftWidth: 10,
    borderRadius: 24
  },
  headerBlock: {
    // flex:1,
    flexDirection: "row",
    backgroundColor: "#e1e6ef"
  },
  header: {
    fontSize: 23
  },

  textContainer: {
    padding: 10,
    backgroundColor: "#EEEEEE"
  },

  text: { color: "#707070", fontSize: 12 },

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
    width: 50,
    height: 50
    //backgroundColor:'black'
  }
});

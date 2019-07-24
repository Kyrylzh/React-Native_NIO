import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  AsyncStorage,
  ActivityIndicator,
  Image,
  BackHandler
} from "react-native";
import { Container, Content, CardItem, Right, Card, Button } from "native-base";
import { ThemeProvider, Header } from "react-native-elements";
// import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome5";
import Swiper from "react-native-swiper";
import CustomHeader from "./../../components/Header/Header";
import CustomHeaderRoot from "./../../components/Header/HeaderRoot";

class home extends Component {
  constructor(props) {
    super(props);
    this.getUserDetails();
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  async getUserDetails() {
    // alert("getUserDetails");
    try {
      let userDeatails = await AsyncStorage.getItem("userDetails");
      console.log("In Create Task Admin  : " + userDeatails + " ********** ");

      let userDeatailsJson = JSON.parse(userDeatails);

      console.log("In Create Task Admin  : ", userDeatailsJson, " ********** ");

      console.log(
        "In Create Task Admin  :  Role ",
        userDeatailsJson.name,
        " ********** "
      );

      this.setState({
        userDetails: userDeatailsJson
      });
      console.log(
        "End of the Create Task Admin  ********** ",
        this.state.userDetails.name
      );
      console.log(
        "End of the Create Task Admin  ********** ",
        this.state.userDetails.id
      );
    } catch (error) {
      alert(error);
    }

    this.fetchHomeScreenDetails();
  }

  fetchHomeScreenDetails = async () => {
    // alert("fetchHomeScreenDetails");

    const { userDetails } = this.state;
    console.log("User details : ", userDetails);

    console.log("Fetching.... Discussion");
    await fetch(`http://cupdes.com/api/v1/get-home/${userDetails.id}`, {
      method: "GET",
      headers: {
        "X-AUTH-TOKEN": "Px7zgU79PYR9ULEIrEetsb",
        "Content-Type": "XMLHttpRequest"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        this.homePageDatahandler(responseJson);
      })
      .done();
  };

  homePageDatahandler(data) {
    console.log("in dataHandler homePageDatahandler ", data);

    this.setState({
      homeData: data,
      isLoading: false
    });

    console.log(" this state Home Screen ", this.state.homeData);

    console.log(
      " this state Home Screen  Discussion "
      // this.state.homeData.data.question.question
    );
  }

  loadingHandler = () => {
    this.props.navigation.navigate(loading);
  };
  DisHandler = () => {
    this.props.navigation.navigate("Disnav");
  };

  calendarHandler = () => {
    this.props.navigation.navigate("TaskCalendar");
    // this.props.navigation.navigate("TaskCalendarAgenda");
  };

  discussionHandler = () => {
    // alert("Discussion clicked");
    this.props.navigation.navigate("DrawerScreen2");
  };

  taskHandler = () => {
    this.props.navigation.navigate("DrawerScreen3");
  };
  newsHandler = () => {
    this.props.navigation.navigate("createNews");
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
        <ImageBackground
          source={require("./../../Images/backgroundimage.jpg")}
          style={{ width: "100%", height: "100%" }}
          androidStatusBarColor={"#6D0F49"}
        >
          <ScrollView>
            {/* <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }} 
            colors={["#9F035C", "#6D0F49"]}
            style={styles.linearGradient}
          > */}
            <View>
              <View>
                <CustomHeaderRoot
                  title="WELCOME"
                  openDrawer={() => this.props.navigation.openDrawer()}
                />
              </View>
              <View>
                <View
                  style={styles.discusscontainer}
                  onPress={() => alert("Clicked")}
                >
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <TouchableOpacity
                      onPress={this.discussionHandler}
                      style={styles.leftlay}
                    >
                      <View>
                        <View style={styles.iconpos}>
                          <Icon
                            name="microphone-alt"
                            size={50}
                            color="#9F035C"
                          />
                          <Text style={styles.Distext}>Discussion</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                    {console.log(
                      "Dicision for new user : ",
                      this.state.homeData.data.question
                    )}
                    {console.log(
                      "Dicision for new user : ",
                      this.state.homeData.data.question === null
                    )}

                    {this.state.homeData.data.question === null ? (
                      // console.log("New user havent discussion")
                      <View style={styles.rightlay}>
                        <View
                          style={{
                            alignItems: "flex-start",
                            paddingTop: 15,
                            paddingLeft: 15
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 8,
                              textAlign: "center"
                            }}
                          >
                            {/* Create At :{" "} */}
                            {/* {this.state.homeData.data.question.created_at} */}
                          </Text>
                        </View>
                        <View
                          style={{
                            alignItems: "flex-start",
                            paddingTop: 5,
                            paddingLeft: 15,
                            height: 55,
                            overflow: "hidden"
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 14,

                              fontFamily: "Myriad"
                            }}
                          >
                            Discussion is not Available.
                          </Text>
                        </View>
                        <View
                          style={{
                            alignItems: "flex-start",
                            paddingTop: 25,
                            paddingLeft: 15
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 9,
                              textAlign: "center"
                            }}
                          >
                            Create by :{" "}
                            {/* {this.state.homeData.data.question.creator} */}
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <View style={styles.rightlay}>
                        <View
                          style={{
                            alignItems: "flex-start",
                            paddingTop: 15,
                            paddingLeft: 15
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 8,
                              textAlign: "center"
                            }}
                          >
                            Create At :{" "}
                            {this.state.homeData.data.question.created_at}
                          </Text>
                        </View>
                        <View
                          style={{
                            alignItems: "flex-start",
                            paddingTop: 5,
                            paddingLeft: 15,
                            height: 55,
                            overflow: "hidden"
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 14,

                              fontFamily: "Myriad"
                            }}
                          >
                            {this.state.homeData.data.question.question}
                          </Text>
                        </View>
                        <View
                          style={{
                            alignItems: "flex-start",
                            paddingTop: 25,
                            paddingLeft: 15
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 9,
                              textAlign: "center"
                            }}
                          >
                            Create by :{" "}
                            {this.state.homeData.data.question.creator}
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.wrapper}>
                  <View style={styles.discusscontainer}>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <TouchableOpacity
                        onPress={this.taskHandler}
                        style={styles.leftlay}
                      >
                        <View style={styles.iconpos}>
                          <Icon name="tasks" size={50} color="#9F035C" />
                          <Text style={styles.Distext}>Task</Text>
                        </View>
                      </TouchableOpacity>
                      {this.state.homeData.data.task === null ? (
                        <View style={styles.rightlay1}>
                          <View
                            style={{
                              alignItems: "flex-start",
                              paddingTop: 15,
                              paddingLeft: 15,
                              height: 65,
                              overflow: "hidden"
                            }}
                          >
                            {/* <Text>Organize anual General Meeting</Text> */}
                            <Text
                              style={{
                                fontSize: 14,

                                fontFamily: "Myriad"
                              }}
                            >
                              Task is not Available
                            </Text>
                          </View>
                        </View>
                      ) : (
                        <View style={styles.rightlay1}>
                          <View
                            style={{
                              alignItems: "flex-start",
                              paddingTop: 15,
                              paddingLeft: 15,
                              height: 65,
                              overflow: "hidden"
                            }}
                          >
                            {/* <Text>Organize anual General Meeting</Text> */}
                            <Text
                              style={{
                                fontSize: 14,

                                fontFamily: "Myriad"
                              }}
                            >
                              {this.state.homeData.data.task.task}
                            </Text>
                          </View>
                          <View
                            style={{
                              alignItems: "flex-start",
                              paddingTop: 25,
                              paddingLeft: 15
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 8,
                                textAlign: "center"
                              }}
                            >
                              Start: :{" "}
                              {this.state.homeData.data.task.start_date}
                            </Text>
                            <Text
                              style={{
                                fontSize: 8,
                                textAlign: "center"
                              }}
                            >
                              End : {this.state.homeData.data.task.end_date}
                            </Text>
                          </View>
                        </View>
                      )}
                      <TouchableOpacity
                        onPress={this.calendarHandler}
                        style={styles.rightlay2}
                      >
                        <View style={styles.iconpos0}>
                          <Icon
                            name="calendar-alt"
                            size={55}
                            color="#9F035C"
                            alignItems="center"
                          />
                          <Text
                            style={{
                              fontSize: 10,
                              textAlign: "center",
                              fontFamily: "Myriad"
                            }}
                          >
                            {" "}
                            check here
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.wrapper1}>
                <TouchableOpacity>
                  <Button style={styles.btnLogin1}>
                    <Icon
                      name="newspaper"
                      size={25}
                      color="white"
                      alignItems="center"
                    />
                    <Text style={styles.text} onPress={this.newsHandler}>
                      Report Your News{" "}
                    </Text>
                  </Button>
                </TouchableOpacity>
              </View>
              <View style={styles.Swipercon}>
                <Swiper style={styles.wrapper2}>
                  <View style={styles.slide1}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ width: "50%", paddingLeft: 10 }}>
                        <Image
                          source={{
                            uri: this.state.homeData.data.news[0].image1
                          }}
                          style={{ width: 140, height: 140, borderRadius: 20 }}
                        />
                      </View>
                      <View style={{ width: "50%" }}>
                        <Text style={styles.text}>
                          {this.state.homeData.data.news[0].topic}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.slide2}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ width: "50%", paddingLeft: 10 }}>
                        <Image
                          source={{
                            uri: this.state.homeData.data.news[1].image1
                          }}
                          style={{ width: 140, height: 140, borderRadius: 20 }}
                        />
                      </View>
                      <View style={{ width: "50%" }}>
                        <Text style={styles.text}>
                          {this.state.homeData.data.news[1].topic}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.slide3}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ width: "50%", paddingLeft: 10 }}>
                        <Image
                          source={{
                            uri: this.state.homeData.data.news[2].image1
                          }}
                          style={{ width: 140, height: 140, borderRadius: 20 }}
                        />
                      </View>
                      <View style={{ width: "50%" }}>
                        <Text style={styles.text}>
                          {this.state.homeData.data.news[2].topic}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {/* <View style={styles.slide2}>
                    <Text style={styles.text}>Beautiful</Text>
                  </View>
                  <View style={styles.slide3}>
                    <Text style={styles.text}>And simple</Text>
                  </View> */}
                </Swiper>
              </View>
            </View>
            {/* </LinearGradient> */}
          </ScrollView>
        </ImageBackground>
      );
    }
  }
}

export default home;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
    fontFamily: "Myriad"
  },
  wrapper2: {},
  wrapper1: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 5
  },
  containerstyle: {
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 30,
    marginTop: 10
  },
  containerstyle2: {
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 30,
    marginTop: 10
  },
  containerstyle1: {
    backgroundColor: "#ffa811",
    borderColor: "#222",
    borderWidth: 1,
    borderRadius: 30,
    fontFamily: "Myriad"
  },
  linearGradient: {
    flex: 1
  },
  discusscontainer: {
    borderColor: "#2222",
    borderRadius: 28,
    alignItems: "center",
    fontFamily: "Myriad"
  },
  leftlay: {
    top: 25,
    width: "30%",
    height: 130,
    backgroundColor: "white",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    fontFamily: "Myriad",

    overflow: "hidden",
    // borderWidth: 2,
    borderColor: "#ddd",
    borderTopWidth: 0,
    borderRightWidth: 0,

    borderColor: "#ddd",

    shadowColor: "#222",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.9
  },
  rightlay: {
    top: 25,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
    width: "60%",
    height: 130,
    backgroundColor: "white",

    // borderWidth: 2,
    borderColor: "#ddd",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    shadowColor: "#222",
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.9
  },
  rightlay1: {
    top: 25,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
    width: "40%",
    height: 130,
    backgroundColor: "white",

    //   borderWidth: 2,
    borderColor: "#ddd",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    shadowColor: "#222",
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.9,
    shadowRadius: 15
  },
  rightlay2: {
    top: 25,
    borderRadius: 15,

    overflow: "hidden",
    width: "20%",
    height: 120,
    backgroundColor: "white",
    marginLeft: 2,
    //  borderWidth: 2,
    borderColor: "#ddd",
    marginTop: 5,
    shadowColor: "#222",
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.9,
    shadowRadius: 15
  },
  iconpos0: {
    marginTop: 20,
    alignItems: "center"
  },
  iconpos: {
    alignItems: "center",
    marginTop: 20
  },
  iconpos1: {
    marginTop: 10,
    marginLeft: 5,
    alignItems: "flex-start"
  },
  Distext: {
    fontSize: 17,
    marginTop: 20,
    textAlign: "center",
    color: "#70111e",
    fontFamily: "Myriad"
  },
  btnLogin1: {
    width: 320,
    height: 40,
    backgroundColor: "#d8087f",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    borderColor: "#2222",
    opacity: 0.9,
    borderWidth: 2,
    borderRadius: 28,
    opacity: 0.8
  },
  text: {
    marginLeft: 10,
    color: "#474747",
    fontSize: 14,
    fontFamily: "Myriad"
  },

  Swipercon: {
    height: 155,
    marginTop: 20,
    paddingLeft: 30,
    paddingRight: 30
  },
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 25,
    borderColor: "#222",
    borderWidth: 0.5,
    overflow: "hidden"
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 25,
    borderColor: "#222",
    borderWidth: 0.5,
    overflow: "hidden"
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 25,
    borderColor: "#222",
    borderWidth: 0.5,
    overflow: "hidden"
  }
});

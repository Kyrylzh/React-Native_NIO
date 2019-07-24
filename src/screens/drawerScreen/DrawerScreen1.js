import React, { Component } from "react";
import {
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
  Content,
  Button,
  Text,
  Input,
  Label,
  Item,
  Form,
  Body
} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome5";
import ImagePicker from "react-native-image-picker";
import Swiper from "react-native-swiper";
import CustomHeaderRoot from "./../../components/Header/HeaderRoot";

class DrawerScreen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: "",
      description: "",
      isLoading: true,
      image1: null,
      image2: null,
      image3: null,
      topic: "",
      user_id: "",
      name: "",
      isLoading: true,

      errors: [],
      showProgress: false
    };
    this.fetchNews();
  }

  fetchNews = async () => {
    console.log("Fetching.... updateUser");
    await fetch("http://cupdes.com/api/v1/get-news", {
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
    console.log("in dataHandler what is discussions ", data);
    console.log("in dataHandler what is discussions ", data.data);

    this.setState({
      news: data.data,
      isLoading: false
      // name:this.state.user.name
    });

    console.log("his.state.user, ***********");
    console.log(this.state.news, " news ***********");
    console.log(this.state.news.topic, " ***********");
    console.log(this.state.news.image1, "***********");
    console.log(this.state.news.image2, "***********");
    console.log(this.state.news.image3, "***********");
    console.log(this.state.news.created_at, "***********");

    // // this.fillDetails;
    // this.setState({
    //   topic: this.state.news.topic,
    //   description: this.state.news.description,
    //   image1: this.state.news.image1,
    //   image2: this.state.news.image2,
    //   image3: this.state.news.image3,
    //   image3: this.state.news.image3,
    //   name: this.state.news.user.name,
    //   created_at: this.state.news.created_at
    // });
  }

  newsHandler = data => {
    console.log("News Details : ", data);
    this.setNewsDetails(data);
    alert("newsHandler");
    this.props.navigation.navigate("NewsPage");
  };

  setNewsDetails = async data => {
    console.log("setNewsDetails ", data);
    try {
      await AsyncStorage.setItem("newsDetails", JSON.stringify(data));
      console.log("questionDetails saves asyn");
    } catch (error) {
      alert("setNewsDetails store error");
    }
    console.log("End the setNewsDetails");
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
        <View>
          <ScrollView>
            <CustomHeaderRoot
              title="News Feed"
              alignItems="center"
              openDrawer={() => this.props.navigation.openDrawer()}
            />

            {this.state.news.map(email => {
              return (
                <TouchableOpacity
                  key={email.id}
                  onPress={() => this.newsHandler(email)}
                >
                  <View style={styles.scrollView1}>
                    <View>
                      <View style={{ height: 70, backgroundColor: "#999999" }}>
                        <Body
                          style={{
                            flexDirection: "row"
                          }}
                        >
                          <Text
                            style={{
                              marginTop: "3%",
                              fontSize: 20,
                              textAlign: "center",
                              fontFamily: "Myriad",
                              color: "#3d3d3d"
                            }}
                          >
                            {email.topic}
                          </Text>
                        </Body>
                      </View>
                      <View
                        style={{
                          height: 17,
                          backgroundColor: "#999999",
                          flexDirection: "row"
                        }}
                      >
                        <Body
                          style={{
                            flexDirection: "row"
                            // marginRight: "85%",
                            // marginTop:"1%",
                          }}
                        >
                          <Icon name="user" size={10} color="#9F035C" />
                          <Text
                            style={{
                              fontSize: 10,
                              textAlign: "left",
                              paddingLeft: 4,
                              fontFamily: "Myriad"
                            }}
                          >
                            {email.user.name}
                          </Text>
                        </Body>

                        <Body
                          style={{
                            flexDirection: "row-reverse",
                            alignItems: "flex-end"
                          }}
                        >
                          <Icon
                            name="calendar-alt"
                            size={10}
                            color="#9F035C"
                            alignItems="center"
                          />
                          <Text
                            style={{
                              fontSize: 10,
                              textAlign: "right",
                              paddingRight: 4,
                              fontFamily: "Myriad"
                            }}
                          >
                            {email.created_at}
                          </Text>
                        </Body>
                      </View>
                      <View
                        style={{ height: "1%", backgroundColor: "#6D0F49" }}
                      />
                      <View style={{ height: 200, backgroundColor: "#494a4c" }}>
                        <View style={styles.Swipercon}>
                          <Swiper style={styles.wrapper2} showsButtons={true}>
                            <View style={styles.slide1}>
                              <Image
                                source={{ uri: email.image1 }}
                                style={{ height: "100%", width: "100%" }}
                              />
                            </View>
                            <View style={styles.slide2}>
                              <Image
                                source={{ uri: email.image2 }}
                                style={{ height: "100%", width: "100%" }}
                              />
                            </View>
                            <View style={styles.slide3}>
                              <Image
                                source={{ uri: email.image3 }}
                                style={{ height: "100%", width: "100%" }}
                              />
                            </View>
                          </Swiper>
                        </View>
                      </View>

                      <View style={styles.inputwrapper2}>
                        <ScrollView stlye={{ alignItems: "flex-start" }}>
                          <Body>
                            <Text
                              style={{
                                marginTop: "2%",
                                fontSize: 12,
                                color: "#707070",
                                paddingLeft: 10,
                                paddingRight: 10,
                                textAlign: "center"
                              }}
                            >
                              {email.description}
                            </Text>
                          </Body>
                        </ScrollView>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      );
    }
  }
}

export default DrawerScreen1;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,

    backgroundColor: "white",
    position: "relative"
  },
  scrollViewWrapper: {
    //  marginTop:70,
    flex: 1
  },
  scrollView1: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15
    // flex:1
  },
  Logo: {
    marginTop: 12,
    width: 100,
    height: 100,
    borderRadius: 80,

    alignItems: "center",
    position: "absolute"
  },

  LogoContainer: {
    marginTop: 5,
    alignItems: "center",
    position: "relative"
  },
  LogoText: {
    fontSize: 30,
    textAlign: "center",
    position: "relative",
    top: "-26%",
    // fontFamily: 'Titillium Web',
    fontFamily: "Myriad",
    color: "#050404"
  },
  LogoText1: {
    fontSize: 30,
    textAlign: "center",
    position: "relative",
    top: "-10%",
    // fontFamily: 'Titillium Web',
    fontFamily: "Myriad",
    color: "#050404"
  },
  inputwrapper: {
    marginTop: 15,

    alignItems: "flex-start",

    color: "#dee7e8"
  },
  inputwrapper2: {
    backgroundColor: "white",
    height: 100,
    overflow: "hidden"
  },

  input: {
    minHeight: 5,
    fontSize: 15,
    color: "#7a7e7f",
    textAlign: "center",
    fontFamily: "Myriad"
  },

  btnLogin: {
    marginTop: 25,
    width: 220,
    height: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    borderColor: "#2222",
    opacity: 0.9,
    borderWidth: 2,
    borderRadius: 28
  },
  text: {
    marginLeft: 10,
    color: "white",
    fontSize: 17,
    fontFamily: "Myriad"
  },
  forgot: {
    paddingTop: 25,
    color: "#fff",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto"
  },
  createNew: {
    textAlign: "center",

    marginLeft: "auto",
    marginRight: "auto",
    color: "white",
    opacity: 0.9,
    fontSize: 14,
    fontFamily: "Myriad"
  },
  createNew1: {
    marginTop: 80,

    textAlign: "auto",

    color: "white",
    fontFamily: "Myriad",
    fontSize: 20,
    position: "relative"
  },
  disContainer: {
    paddingTop: 2,
    paddingLeft: 30,
    paddingRight: 30,
    borderWidth: 2,
    borderColor: "#222",
    backgroundColor: "blue",
    marginTop: 20,
    textAlign: "left"
  },
  textAreaContainer: {
    borderColor: "#222",
    borderWidth: 1,
    paddingLeft: 30,
    paddingRight: 30
  },
  textArea: {
    height: 160,
    justifyContent: "flex-start"
  },
  btnLogin1: {
    width: 220,
    height: 40,
    backgroundColor: "#9F035C",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    borderColor: "#2222",
    opacity: 0.9,
    borderWidth: 2,
    borderRadius: 28
  },
  wrapper1: {
    alignItems: "center"
  },
  Swipercon: {
    height: 200
  },
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  }
});

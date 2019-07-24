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
  AsyncStorage
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

import CustomHeader from "../../components/Header/Header";

class NewsPage extends Component {
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

      errors: [],
      showProgress: false
    };
    // this.fetchNews();
    this.getNewsDetails();
  }

  async getNewsDetails() {
    alert("getNewsDetails");
    try {
      let newsDetails = await AsyncStorage.getItem("newsDetails");
      console.log("In newsDetails : " + newsDetails + " ********** ");
      let newsDetailsJson = JSON.parse(newsDetails);

      console.log("In Discussion :", newsDetailsJson, " ********** ");
      console.log(
        "In Discussion : Role ",
        newsDetailsJson.name,
        " ********** "
      );

      this.setState({
        newsDetails: newsDetailsJson
      });
      console.log(
        "End of News page fetch :********** ",
        this.state.newsDetails,
        " ******** news id ",
        this.state.newsDetails.id
      );
    } catch (error) {
      alert(error);
    }
    this.fetchNews();
  }

  fetchNews = async () => {
    news_id = this.state.newsDetails.id;
    console.log("Fetching.... updateUser", news_id);
    await fetch(`http://cupdes.com/api/v1/get-newsbyid/${news_id}`, {
      method: "GET",
      headers: {
        "X-AUTH-TOKEN": "Px7zgU79PYR9ULEIrEetsb",
        "Content-Type": "XMLHttpRequest"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        // this.datahandler(console.log(responseJson.data, " jjjjjjjjjjjjjj "));
        this.datahandler(responseJson);

        // console.log("Fetch Discussion ", responseJson);
      })
      // .then((res) => {
      //     console.log("############ "+res+" ########### ")
      //     if (res.state === true) {
      //       this.removeToken()

      //     } else {
      //         alert(res.msg)
      //     }
      // })
      .done();
  };

  datahandler(data) {
    //console.log("in dataHandler what is discussions ", data.data);
    console.log("in dataHandler news Page ", data);
    console.log("in dataHandler news Page ", data.data);

    this.setState({
      news: data.data,
      isLoading: false
      // name:this.state.user.name
    });

    console.log("his.state.user, ***********");
    console.log(this.state.news, " news in state ***********");
    console.log(this.state.news.topic, " ***********");
    console.log(this.state.news.image1, "***********");
    console.log(this.state.news.image2, "***********");
    console.log(this.state.news.image3, "***********");

    // this.fillDetails;
    // this.setState({
    //   topic: this.state.news.topic,
    //   description: this.state.news.description,
    //   image1: this.state.news.image1,
    //   image2: this.state.news.image2,
    //   image3: this.state.news.image3
    // });
  }

  addNews = () => {
    alert("addNews");
  };

  render() {
    const { photo } = this.state;
    return (
      <KeyboardAvoidingView style={styles.wrapper}>
        {/* <CustomHeader title="News Page" alignItems="center" /> */}

        <CustomHeader
          title="News Page"
          alignItems="center"
          type="sub"
          sub="participant"
          // goCreateDiscussion={this.addNews}
          // onPress={() => this.addNews}
          openDrawer={() => this.props.navigation.goBack(null)}
          goCreateDiscussion={
            () => {
              console.log("Click News Create");
              this.props.navigation.navigate("createNews");
              console.log("after navigation Click News Create");
            }
            // alert("Add")
          }
        />

        <ScrollView>
          <View
            style={{
              flex: 1,
              flexDirection: "column"
            }}
          >
            <View
              style={{
                height: 80,
                backgroundColor: "white",
                alignItems: "center"
              }}
            >
              <Body>
                <Text
                  style={{
                    marginTop: "2%",
                    fontSize: 16,
                    fontFamily: "Myriad",
                    textAlign: "center",
                    color: "#222"
                  }}
                >
                  {this.state.news.topic}
                </Text>
              </Body>
            </View>
            <View style={{ height: 200, backgroundColor: "#494a4c" }}>
              <View style={styles.Swipercon}>
                <Swiper style={styles.wrapper2} showsButtons={true}>
                  <View style={styles.slide1}>
                    <Image
                      source={{ uri: this.state.news.image1 }}
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: 10
                      }}
                    />
                  </View>
                  <View style={styles.slide2}>
                    <Image
                      source={{ uri: this.state.news.image2 }}
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: 10
                      }}
                    />
                  </View>
                  <View style={styles.slide3}>
                    <Image
                      source={{ uri: this.state.news.image3 }}
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: 10
                      }}
                    />
                  </View>
                </Swiper>
              </View>
            </View>

            <View style={styles.inputwrapper2}>
              <Body>
                <Text
                  style={{
                    marginTop: "2%",
                    fontSize: 14,
                    textAlign: "center",
                    color: "#707070"
                  }}
                >
                  {this.state.news.description}
                </Text>
              </Body>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default NewsPage;

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
  scrollView: {
    paddingLeft: 25,
    paddingRight: 30,
    paddingTop: 20
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
    fontFamily: "sans-serif",
    color: "#050404"
  },
  LogoText1: {
    fontSize: 30,
    textAlign: "center",
    position: "relative",
    top: "-10%",
    // fontFamily: 'Titillium Web',
    fontFamily: "sans-serif",
    color: "#050404"
  },
  inputwrapper: {
    marginTop: 15,

    color: "#dee7e8"
  },
  inputwrapper2: {
    backgroundColor: "white"
  },

  input: {
    minHeight: 5,
    fontSize: 15,
    color: "#7a7e7f",
    textAlign: "center"
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
    fontSize: 17
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
    fontWeight: "bold"
  },
  createNew1: {
    marginTop: 80,

    textAlign: "auto",

    color: "white",
    fontWeight: "bold",
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

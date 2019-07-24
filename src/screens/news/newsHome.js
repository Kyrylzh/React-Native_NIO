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

import CustomHeader from "../../components/Header/Header";

class NewsHome extends Component {
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
    console.log("in dataHandler what is discussions ", data[0]);

    this.setState({
      news: data.data[0],
      isLoading: false
      // name:this.state.user.name
    });

    console.log("his.state.user, ***********");
    console.log(this.state.news, " ***********");
    console.log(this.state.news.topic, " ***********");
    console.log(this.state.news.image1, "***********");
    console.log(this.state.news.image2, "***********");
    console.log(this.state.news.image3, "***********");
    console.log(this.state.news.created_at, "***********");

    // this.fillDetails;
    this.setState({
      topic: this.state.news.topic,
      description: this.state.news.description,
      image1: this.state.news.image1,
      image2: this.state.news.image2,
      image3: this.state.news.image3,
      image3: this.state.news.image3,
      name: this.state.news.user.name,
      created_at: this.state.news.created_at
    });
  }

  render() {
    const { photo } = this.state;
    return (
      <ScrollView style={styles.scrollView1}>
        <CustomHeader title="News Feed" alignItems="center" />

       
          <View>
            <View style={{ height: 70, backgroundColor: "#6e6e6e" }}>
             
              <ScrollView horizontal={true}>
                <Text
                  style={{ marginTop: "15%", fontSize: 15,  fontFamily:'Myriad', }}
                >
                  {this.state.news.topic}
                </Text>
                </ScrollView>
              
              <Body
                style={{
                  flexDirection: "row",
                  marginTop: "9.9%",
                  marginRight: "50%"
                }}
              >
                <Icon
                  name="user"
                  size={10}
                  color="#9F035C"
                  alignItems="center"
                  marginTop="9.5%"
                />
                <Text
                  style={{
                    fontSize: 10,
                    textAlign: "left",
                    alignItems: "flex-start",
                    fontFamily:'Myriad',
                  }}
                >
                  {this.state.news.topic}
                </Text>
              </Body>

              <Body style={{ flexDirection: "row", marginLeft: "65%" }}>
                <Text style={{ fontSize: 10, fontFamily:'Myriad', }}>
                  {this.state.news.created_at}
                </Text>
                <Icon
                  name="calendar-alt"
                  size={10}
                  color="#9F035C"
                  alignItems="center"
                  marginTop="6.5%"
                />
              </Body>
            </View>
            <View style={{ height:40,backgroundColor: "red" }}/>
            <View style={{ height: "1%", backgroundColor: "red" }} />
            <View style={{ height: 200, backgroundColor: "#494a4c" }}>
              <View style={styles.Swipercon}>
                <Swiper style={styles.wrapper2} showsButtons={true}>
                  <View style={styles.slide1}>
                    <Image
                      source={{ uri: this.state.news.image1 }}
                      style={{ height: "100%", width: "100%" }}
                    />
                  </View>
                  <View style={styles.slide2}>
                    <Image
                      source={{ uri: this.state.news.image2 }}
                      style={{ height: "100%", width: "100%" }}
                    />
                  </View>
                  <View style={styles.slide3}>
                    <Image
                      source={{ uri: this.state.news.image3 }}
                      style={{ height: "100%", width: "100%" }}
                    />
                  </View>
                </Swiper>
              </View>
            </View>

            <View style={styles.inputwrapper2}>
              <ScrollView stlye={{ alignItems: "flex-start" }}>
                <Body>
                  <Text style={{ marginTop: "2%", fontSize: 12, fontFamily:'Myriad', }}>
                    {this.state.news.description}
                  </Text>
                </Body>
              </ScrollView>
            </View>
          </View>
        </ScrollView>
     
    );
  }
}

export default NewsHome;

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
    fontFamily:'Myriad',
    color: "#050404"
  },
  LogoText1: {
    fontSize: 30,
    textAlign: "center",
    position: "relative",
    top: "-10%",
    // fontFamily: 'Titillium Web',
    fontFamily:'Myriad',
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
    fontFamily:'Myriad',
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
    fontFamily:'Myriad',
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
    fontFamily:'Myriad',
  },
  createNew1: {
    marginTop: 80,

    textAlign: "auto",

    color: "white",
    fontFamily:'Myriad',
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
    justifyContent: "flex-start",
    fontFamily:'Myriad',
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

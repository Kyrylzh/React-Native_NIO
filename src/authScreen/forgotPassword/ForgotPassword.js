import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  ImageBackground,
  ScrollView,
  Linking,
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
  Form
} from "native-base";

import colors from "../../styles/colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import InputField from "./../../components/inputField/InputField";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      validEmail: false
    };
  }

  onPressSubmitButton() {
    this.onFetchLoginRecords();
  }
  onclickuri() {
    Linking.canOpenURL("http://www.cupdes.com/password/reset")
      .then(supported => {
        if (!supported) {
          console.log(
            "Can't handle url: " + "http://www.cupdes.com/password/reset"
          );
        } else {
          return Linking.openURL("http://www.cupdes.com/password/reset");
        }
      })
      .catch(err => console.error("An error occurred", err));
  }

  async onFetchLoginRecords() {
    var data = {
      email: this.state.email,
      password: this.state.password

      //  email : "admin@admin.com",
      // password : "password"
    };

    try {
      let response = await fetch("http://cupdes.com/api/v1/login-user", {
        method: "POST",
        headers: {
          "X-AUTH-TOKEN": "Px7zgU79PYR9ULEIrEetsb",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson, "rtghj");
          this.datahandler(responseJson);
          console.log(responseJson.success, "success");

          if (responseJson.success === "true") {
            this.props.navigation.navigate("DrewerNav");
          } else {
            alert("authentication data Invalid!!!");
          }
        });
    } catch (errors) {
      alert(errors);
    }
  }

  //  this.props.navigation.navigate('DrewerNav');

  LoginHandler = () => {
    this.props.navigation.navigate("Login");
  };

  handleEmailChange(email) {
    const emailCheckRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    this.setState({ email: email });

    if (!this.state.validEmail) {
      if (emailCheckRegex.test(email)) {
        this.setState({ validEmail: true });
      } else {
        if (!emailCheckRegex.test(email)) {
          this.setState({ validEmail: false });
        }
      }
    }
  }

  render() {
    return (
      <ImageBackground
        source={require("../../Images/backgroundimage.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <KeyboardAvoidingView style={styles.wrapper}>
          <View style={styles.scrollWrapper}>
            <ScrollView style={styles.scrollView}>
              <View style={styles.LogoContainer}>
                <Image
                  source={require("../../Images/logo.png")}
                  style={styles.Logo}
                />
                <Text style={styles.createNew1}>
                  You can change your password through this link{" "}
                </Text>
              </View>

              <View>
                <TouchableHighlight>
                  <Button
                    style={styles.btnLogin}
                    onPress={this.onclickuri}
                    //onPress={this.loginHandler
                  >
                    <Text style={styles.text}>Click Here </Text>
                  </Button>
                </TouchableHighlight>

                <TouchableOpacity onPress={this.LoginHandler}>
                  <Text style={styles.createNew}> Go back To LOGIN Page</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    top: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#222",

    borderWidth: 1,
    paddingLeft: 10
  },
  wrapper: {
    flex: 1,
    //backgroundColor:'#6D0F49',
    position: "relative"
  },
  scrollViewWrapper: {
    marginTop: 70,
    flex: 1
  },
  scrollView: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20
    // flex:1
  },
  Logo: {
    width: 150,
    height: 150
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
    paddingTop: 30,
    position: "relative",
    alignItems: "center"
  },
  input: {
    minHeight: 5,
    fontSize: 13,
    color: "white"
  },
  btnLogin: {
    marginTop: 25,
    width: 160,
    height: 40,
    backgroundColor: "#ffffff",
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
    color: "#2222",
    fontSize: 14,
    fontFamily: "Myriad"
  },
  forgot: {
    paddingTop: 18,
    color: "#fff",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 14
  },
  createNew: {
    marginTop: 30,
    textAlign: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    color: "white",
    textDecorationLine: "underline",
    fontSize: 14,
    fontFamily: "Myriad"
  },
  createNew1: {
    marginTop: 30,
    textAlign: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    color: "white",

    fontSize: 13
  }
});

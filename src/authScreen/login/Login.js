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
// import { TextInput } from "react-native-paper";
// import colors from "../../styles/colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import InputField from "./../../components/inputField/InputField";
const host = require("../../config/config");

data = [
  {
    role: "second_admin"
  }
];

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      role: "",
      validEmail: false,
      validPassword: false,
      isLoading: true
    };

    // this.getToken();
  }

  async getToken() {
    try {
      let userDetails = await AsyncStorage.getItem("userDetails");
      //let a=JSON.stringify(thistoken)
      //alert(a)
      let userDetailsJson = JSON.parse(userDetails);

      if (userDetails != null) {
        // Actions.screen1()
        {
          console.log("userDetails.name in getToken ", userDetailsJson.name);
          console.log("userDetails.name in getToken ", userDetailsJson);
        }
        {
          userDetailsJson.name === "Second_admin"
            ? this.props.navigation.navigate("DrewerNavSLA")
            : this.props.navigation.navigate("DrewerNav");
        }
      }
    } catch (error) {
      alert("token get error");
    }
  }

  onPressSubmitButton() {
    const validation = this.state.validEmail && this.state.validPassword;
    console.log("Validation " + validation);
    if (!validation) {
      alert("Please Check User Name and Password");
    } else {
      this.onFetchLoginRecords();
    }

    // this.props.navigation.navigate("DrewerNav");
    // {
    //   this.state.role === "second_admin"
    //     ? this.props.navigation.navigate("DrewerNavSLA")
    //     : this.props.navigation.navigate("DrewerNav");
    // }
  }

  setUserDetails = async data => {
    console.log("setUserDetails", data.data);
    try {
      await AsyncStorage.setItem("userDetails", JSON.stringify(data.data));
      //   await AsyncStorage.setItem('@MySuperStore:key1',mytoken);
      console.log("userDetals saves asyn");

      //   await AsyncStorage.setItem('@MySuperStore:key2',user_id);

      //   console.log('user_id saves asyn');
      //   await AsyncStorage.setItem("userID",user_id);
      //   console.log('user_id saves asyn');

      //   alert('Token saves asyn');
      // this.getToken();
    } catch (error) {
      alert("Role store error");
    }

    console.log("End the setUserDetails");
  };

  async onFetchLoginRecords() {
    var data = {
      email: this.state.email,
      password: this.state.password

      // email: "test@test.com",
      // password: "password"

      // email: "admin@admin.com",
      // password: "password"

      //  email: "user2@nio.com",
      // password: "password"

      // email: "tharin@test.com",
      // password: "password"

      // email: "chanakauomfit@gmail.com",
      // password: "123456"
    };

    console.log("Login data ", data);

    try {
      // let response = await fetch("http://cupdes.com/api/v1/login-user", {
      let response = await fetch(host.config.hostname + "/login-user", {
        method: "POST",
        headers: {
          "X-AUTH-TOKEN": "Px7zgU79PYR9ULEIrEetsb",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(responseJson => {
          this.dataHandler(responseJson);

          // console.log(responseJson, "rtghj");
          // // this.datahandler(responseJson)
          // console.log(responseJson.success, "success");

          // if (responseJson.success === "true") {
          //   this.setUserDetails(responseJson);
          //   this.props.navigation.navigate("DrewerNav");
          // } else {
          //   alert("authentication data Invalid!!!");
          // }
        });
    } catch (errors) {
      alert("Login Error", errors);
    }
  }

  //  this.props.navigation.navigate('DrewerNav');

  dataHandler = data => {
    console.log("In data Handler : ", data);
    console.log("In data Handler : ", data.data.name);
    this.setState({
      role: data.data.name
      // email: "",
      // password: ""
      // role: "Second_admin"
    });

    console.log("in state : ", this.state.role);

    if (data.success === "true") {
      this.setUserDetails(data);
      {
        this.state.role === "Second_admin"
          ? this.props.navigation.navigate("DrewerNavSLA")
          : this.props.navigation.navigate("DrewerNav");
      }
    } else {
      alert("authentication data Invalid!!!");
    }
  };
  SignUpHandler = () => {
    this.props.navigation.navigate("SignUp");
  };

  ForgotHandler = () => {
    this.props.navigation.navigate("ForgotPassword");
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

  handlePasswordChange(password) {
    this.setState({ password });

    if (!this.state.validPassword) {
      if (password.length >= 6) {
        //Password has to be at least 6 character long
        this.setState({ validPassword: true });
      } else if (password < 6) {
        this.setState({ validPassword: false });
      }
    }
  }

  render() {
    return (
      <ImageBackground
        source={require("../../Images/backgroundimage.jpg")}
        style={{ width: "100%", height: "100%" }}
        androidStatusBarColor={"#6D0F49"}
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
                  Welcome to National Intellectuals Organization
                </Text>
              </View>

              <View>
                <Form style={styles.inputwrapper}>
                  <Item>
                    <Icon name="user" size={25} color="white" />
                    {/* <Input
                      style={styles.input}
                      placeholder="E-mail"
                      placeholderTextColor={"white"}
                      name="email"
                      onChangeText={text => this.setState({ email: text })}
                    /> */}
                    <InputField
                      labelText="EMAIL ADDRESS"
                      placeholderText="E-MAIL"
                      placeholderTextColor={"white"}
                      labelTextSize={14}
                      labelColor="#ffffff"
                      textColor="#ffffff"
                      borderBottomColor="#ffffff"
                      inputType="email"
                      customStyle={{ width: "90%" }}
                      onChangeText={text => this.handleEmailChange(text)}
                      showCheckmark={this.state.validEmail}
                      // autoFocus={true}
                    />
                  </Item>
                  <Item>
                    <Icon name="unlock" size={25} color="white" />
                    {/* <Input
                      style={styles.input}
                      secureTextEntry
                      placeholder="Confirm password"
                      placeholderTextColor={"white"}
                      name="password"
                      onChangeText={text => this.setState({ password: text })}
                    /> */}
                    <InputField
                      style={styles.input}
                      labelText="PASSWORD"
                      labelTextSize={14}
                      placeholderText="PASSWORD"
                      placeholderTextColor={"white"}
                      labelColor="#ffffff"
                      textColor="#ffffff"
                      borderBottomColor="#ffffff"
                      inputType="password"
                      customStyle={{ width: "90%" }}
                      onChangeText={text => this.handlePasswordChange(text)}
                      showCheckmark={this.state.validPassword}
                    />
                  </Item>
                </Form>
              </View>
              <View>
                <TouchableHighlight>
                  <Button
                    style={styles.btnLogin}
                    onPress={this.onPressSubmitButton.bind(this)}
                    //onPress={this.loginHandler
                  >
                    <Text style={styles.text}>Sign In</Text>
                  </Button>
                </TouchableHighlight>
                <TouchableOpacity>
                  <Text style={styles.forgot} onPress={this.ForgotHandler}>
                    Forgot your details?
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.SignUpHandler}>
                  <Text style={styles.createNew}>
                    {" "}
                    Don't you have an account ? SIGN UP
                  </Text>
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
    alignItems: "center",
    display: "flex"
  },
  input: {
    minHeight: 5,
    fontSize: 15,
    color: "white",
    fontFamily: "Myriad"
  },
  btnLogin: {
    marginTop: 25,
    width: 200,
    height: 50,
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
    fontSize: 17
  },
  forgot: {
    paddingTop: 18,
    color: "#fff",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 14,
    textDecorationLine: "underline",
    fontFamily: "Myriad"
  },
  createNew: {
    marginTop: 30,
    textAlign: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    color: "white",

    fontSize: 14,
    textDecorationLine: "underline",
    fontFamily: "Myriad"
  },
  createNew1: {
    marginTop: 30,
    textAlign: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    color: "white",

    fontSize: 16,
    fontFamily: "Myriad"
  }
});

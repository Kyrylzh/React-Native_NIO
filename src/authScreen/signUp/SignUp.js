/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

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
  Form
} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome5";
import InputField from "./../../components/inputField/InputField";
var ImagePicker = require("react-native-image-picker");

//const  { width: WIDTH } = Dimentions.get()
export default class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      photo: null,
      filePath: {},
      errors: [],
      showProgress: false,
      validEmail: false,
      validPassword: false,
      validConfirmPassword: false,
      validName: false
    };
  }

  chooseFile = () => {
    var options = {
      title: "Select Image",
      customButtons: [
        { name: "customOptionKey", title: "Choose Photo from Custom Option" }
      ],

      maxWidth: 2000,
      maxHeight: 2000,
      quality: 0.5,

      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          filePath: source
        });
      }
    });
  };

  onPressSubmitButton() {
    // console.log(
    //   "validation : " +
    //     (this.state.validName &&
    //       this.state.validEmail &&
    //       this.state.validPassword &&
    //       this.state.validConfirmPassword &&
    //       this.state.photo !== null)
    // );
    const validation =
      this.state.validName &&
      this.state.validEmail &&
      this.state.validPassword &&
      this.state.validConfirmPassword &&
      this.state.filePath.fileName !== undefined;

    console.log("Validation : " + validation);

    console.log("file Path : ", this.state.filePath);
    console.log("file Path : ", this.state.filePath.fileName);
    console.log("file Path : ", this.state.filePath.fileName !== undefined);

    if (!validation) {
      alert("PLease Check Input");
    } else {
      console.log(
        "Image ",
        this.state.filePath,
        this.state.email,
        this.state.password,
        this.state.name
      );
      this.onFetchLoginRecords();
    }
  }

  async onFetchLoginRecords() {
    const createFormData = () => {
      var data = new FormData();
      data.append("name", this.state.name);
      data.append("password", this.state.password);
      data.append("email", this.state.email);

      data.append("image", {
        name: this.state.filePath.fileName,
        type: this.state.filePath.type,
        uri:
          Platform.OS === "android"
            ? this.state.filePath.uri
            : this.state.filePath.uri.replace("file://", "")
      });

      console.log("adaddda", data);
      return data;
    };

    try {
      let response = await fetch("http://cupdes.com/api/v1/create-user", {
        method: "POST",
        headers: {
          "X-AUTH-TOKEN": "Px7zgU79PYR9ULEIrEetsb",
          "Content-Type": "multipart/form-data",
          Accept: "application/json"
        },

        //body: JSON.stringify(data)

        body: createFormData()
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson, "rtghj");
          //this.datahandler(responseJson)
          console.log(responseJson.success, "success");

          if (responseJson.success === "true") {
            this.props.navigation.navigate("loading");
            alert("Account Create Successfully");
          } else {
            alert("authentication data Invalid!!!");
            this.props.navigation.navigate("loading");
          }
        });
    } catch (errors) {
      // alert("somtihng wrong!!! Check Your Entered Data");
      console.log("Error in SignUp : ", errors);
    }
  }

  SignupHandler = () => {
    this.props.navigation.navigate("DrewerNav");
  };
  SignuptologinHandler = () => {
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

  handleConfirmPasswordChange(confirmPassword) {
    this.setState({ confirmPassword });

    // if (!this.state.validPassword) {
    //   if (password.length >= 6) {
    //     this.setState({ validPassword: true });
    //   } else if (password < 6) {
    //     this.setState({ validPassword: false });
    //   }
    // }

    if (!this.state.validConfirmPassword) {
      if (confirmPassword === this.state.password) {
        this.setState({ validConfirmPassword: true });
      } else {
        this.setState({ validConfirmPassword: false });
      }
    }
  }

  handleNameChange(name) {
    this.setState({ name });

    if (!this.state.validName) {
      if (name.length >= 3) {
        //Password has to be at least 6 character long
        this.setState({ validName: true });
      } else if (name < 3) {
        this.setState({ validName: false });
      }
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.wrapper}>
        <View style={styles.scrollWrapper}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.LogoContainer}>
              {/*<Image source={require('../../Images/avatar.png')} style={styles.Logo}  onPress={this.handleChoosePhoto} />*/}

              <View style={{ flex: 1, alignItems: "center" }}>
                <Image
                  source={{ uri: this.state.filePath.uri }}
                  style={{
                    width: 120,
                    height: 120,
                    position: "absolute",
                    borderRadius: 60
                  }}
                />
                <TouchableOpacity>
                  <Button style={styles.btnLogin2}>
                    <Text
                      style={{
                        textAlign: "center",

                        color: "white",
                        fontSize: 10,
                        textAlign: "center"
                      }}
                      onPress={this.chooseFile.bind(this)}
                    >
                      {" "}
                      choose
                    </Text>
                  </Button>
                </TouchableOpacity>
              </View>

              <Text style={styles.createNew1}> CREATE ACCOUNT</Text>
            </View>

            <View>
              <Form style={styles.inputwrapper}>
                <Item>
                  <Icon name="user" size={25} color="white" />
                  {/* <Input
                    style={styles.input}
                    placeholder="Your name"
                    placeholderTextColor={"white"}
                    name="name"
                    onChangeText={text => this.setState({ name: text })}
                  /> */}
                  <InputField
                    labelText="NAME"
                    placeholderText="NAME"
                    placeholderTextColor={"white"}
                    labelTextSize={14}
                    labelColor="#ffffff"
                    textColor="#ffffff"
                    borderBottomColor="#ffffff"
                    inputType="text"
                    customStyle={{ width: "90%" }}
                    onChangeText={text => this.handleNameChange(text)}
                    showCheckmark={this.state.validName}
                    autoFocus={true}
                  />
                </Item>
                <Item>
                  <Icon name="mail-bulk" size={25} color="white" />
                  {/* <Input
                    style={styles.input}
                    placeholder="Your e-mail"
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
                  <Icon name="lock" size={25} color="white" />
                  {/* <Input
                    style={styles.input}
                    secureTextEntry
                    placeholder="Your password"
                    placeholderTextColor={"white"}
                    name="password"
                    onChangeText={text => this.setState({ password: text })}
                  /> */}
                  <InputField
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
                <Item>
                  <Icon name="unlock" size={25} color="white" />
                  {/* <Input
                    style={styles.input}
                    secureTextEntry
                    placeholder="Confirm password"
                    placeholderTextColor={"white"}
                    name="password"
                  /> */}
                  <InputField
                    labelText="CONFIRM PASSWORD"
                    labelTextSize={14}
                    placeholderText="CONFIRM PASSWORD"
                    placeholderTextColor={"white"}
                    labelColor="#ffffff"
                    textColor="#ffffff"
                    borderBottomColor="#ffffff"
                    inputType="password"
                    customStyle={{ width: "90%" }}
                    onChangeText={text =>
                      this.handleConfirmPasswordChange(text)
                    }
                    showCheckmark={this.state.validConfirmPassword}
                  />
                </Item>
              </Form>
            </View>
            <View>
              <TouchableOpacity>
                <Button
                  style={styles.btnLogin}
                  onPress={this.onPressSubmitButton.bind(this)}
                  // onPress={this.SignupHandler
                >
                  <Text style={styles.text}>Sign Up </Text>
                </Button>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.SignuptologinHandler}>
                <Text style={styles.createNew}> Have an account ?LOG IN</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#6D0F49",

    position: "relative"
  },
  scrollViewWrapper: {
    marginTop: 70,
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
    alignItems: "center"
  },
  input: {
    minHeight: 5,
    fontSize: 15,
    color: "white",
    fontFamily: "Myriad"
  },

  btnLogin: {
    marginTop: 25,
    width: 180,
    height: 40,
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
    color: "#2222",
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
    marginTop: "5%",
    marginLeft: "auto",
    marginRight: "auto",
    color: "white",
    opacity: 0.9,
    fontSize: 14,
    fontFamily: "Myriad",
    textDecorationLine: "underline"
  },
  createNew1: {
    textAlign: "auto",

    color: "white",
    fontFamily: "Myriad",
    fontSize: 20,
    position: "relative"
  },
  btnLogin2: {
    width: 120,
    height: 120,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    borderColor: "#2222",
    opacity: 0.9,
    borderWidth: 2,
    borderRadius: 60
  }
});

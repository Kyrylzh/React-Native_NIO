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
  ActivityIndicator,
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
var ImagePicker = require("react-native-image-picker");
import CustomHeaderRoot from "../../components/Header/HeaderRoot";

//const  { width: WIDTH } = Dimentions.get()
class UserAccount extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      name: "",
      profession: "",
      phone_number: "",
      user: null,
      isLoading: true,
      filePath: {},
      image: "",
      image_path: "",

      errors: [],
      showProgress: false
    };
    this.getUserDetails();
    // this.fetchUser();
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

    this.fetchUser();
  }

  chooseFile = () => {
    var options = {
      title: "Select Image",
      customButtons: [
        { name: "customOptionKey", title: "Choose Photo from Custom Option" }
      ],
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

  gotUser = () => {
    alert("gotUser");
  };

  fetchUser = async () => {
    console.log("Fetching.... updateUser");
    const user_id = this.state.userDetails.id;
    await fetch(`http://cupdes.com/api/v1/get-user/${user_id}`, {
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
    console.log("in dataHandler what is discussions ", data.data);

    this.setState({
      user: data.data,
      isLoading: false

      // name:this.state.user.name
    });

    console.log("his.state.user, ***********");
    console.log(this.state.user, " ***********");
    console.log(" name ", this.state.user.name, " ***********");
    console.log(this.state.user.profession, " ***********");
    console.log(this.state.user.image_path, " 111111");

    // this.fillDetails;
    this.setState({
      name: this.state.user.name,
      email: this.state.user.email,
      profession: this.state.user.profession,
      phone_number: this.state.user.phone_number,
      image_path: this.state.user.image_path
    });
  }

  onPressSubmitButton() {
    console.log("Image ", this.state.photo);
    this.onFetchLoginRecords();
  }

  fillDetails = () => {
    alert("Fill details");
  };

  async onFetchLoginRecords() {
    const createFormData = () => {
      var data = new FormData();
      data.append("name", this.state.name);
      data.append("email", this.state.email);
      data.append("profession", this.state.profession);
      data.append("phone_number", this.state.phone_number);
      data.append("user_id", this.state.userDetails.id);

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
      let response = await fetch("http://cupdes.com/api/v1/update-user", {
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
            this.props.navigation.navigate("DrewerNav");
            alert("success");
          } else {
            alert(" Data Invalid!!!");
          }
        });
    } catch (errors) {
      alert("Something Is Wrong.Check entered Data");
      console.log("Error occurs in update user acc ", errors);
    }
  }

  SignupHandler = () => {
    this.props.navigation.navigate("DrewerNav");
  };
  SignuptologinHandler = () => {
    this.props.navigation.navigate("SigntoLogin");
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
        <KeyboardAvoidingView style={styles.wrapper}>
          <View style={styles.scrollWrapper}>
            <CustomHeaderRoot
              alignItems="center"
              title="Settings"
              openDrawer={() => this.props.navigation.openDrawer()}
              // sub="dotMenu"
              gotoDiscussion={this.gotoDiscussion}
              navigation={this.props.navigation}
            />
            <ScrollView style={styles.scrollView}>
              <Text style={styles.createNew1}> Account Setting</Text>

              <View style={styles.LogoContainer}>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Image
                    source={{ uri: this.state.user.image_path }}
                    style={{
                      width: 120,
                      height: 120,
                      position: "absolute",
                      borderRadius: 60
                    }}
                  />

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
              </View>
              <View>
                <Form style={styles.inputwrapper}>
                  <Item>
                    <Icon name="user" size={25} color="#222" />
                    <Input
                      style={styles.input}
                      placeholder={"Edit Your Name"}
                      placeholderTextColor={"#222"}
                      name="name"
                      value={this.state.name}
                      onChangeText={text => this.setState({ name: text })}
                    />
                  </Item>
                  <Item>
                    <Icon name="user-tie" size={25} color="#222" />
                    <Input
                      style={styles.input}
                      placeholder={"Add your Profession"}
                      placeholderTextColor={"#222"}
                      name="Profession"
                      value={this.state.profession}
                      onChangeText={text => this.setState({ profession: text })}
                    />
                  </Item>
                  <Item>
                    <Icon name="mail-bulk" size={25} color="#222" />
                    <Input
                      style={styles.input}
                      placeholder={"Edit Your Email"}
                      placeholderTextColor={"#222"}
                      name="email"
                      value={this.state.email}
                      onChangeText={text => this.setState({ email: text })}
                    />
                  </Item>
                  <Item>
                    <Icon name="phone" size={25} color="#222" />
                    <Input
                      style={styles.input}
                      placeholder={"Add your Phone number"}
                      placeholderTextColor={"#222"}
                      name="phone_number"
                      value={this.state.phone_number}
                      onChangeText={text =>
                        this.setState({ phone_number: text })
                      }
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
                    <Text style={styles.text}>save & Exit </Text>
                  </Button>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      );
    }
  }
}
export default UserAccount;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "white",

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
    width: 125,
    height: 125,
    borderRadius: 70,
    marginLeft: 35,
    marginRight: 25
  },

  LogoContainer: {
    marginTop: 10,
    alignItems: "flex-start",
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
    alignItems: "center"
  },
  input: {
    minHeight: 5,
    fontSize: 13,
    color: "#222",
    fontFamily: "Myriad"
  },

  btnLogin: {
    marginTop: 25,
    width: 150,
    height: 35,
    backgroundColor: "#222",
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
    color: "white",
    fontSize: 14,
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
    paddingTop: 29,
    textAlign: "center",

    marginLeft: "auto",
    marginRight: "auto",
    color: "#222",
    opacity: 0.9,
    fontSize: 14,
    fontFamily: "Myriad"
  },
  createNew1: {
    marginTop: "3%",

    textAlign: "auto",

    color: "#222",

    fontSize: 20,
    position: "relative",
    fontFamily: "Myriad"
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

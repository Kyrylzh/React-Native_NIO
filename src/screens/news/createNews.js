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
var ImagePicker = require("react-native-image-picker");

import CustomHeaderRoot from "./../../components/Header/HeaderRoot";

class CreateNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: "",
      description: "",
      user_id: "",
      filePath: {},
      filePath1: {},
      filePath2: {},

      errors: [],
      showProgress: false
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

  chooseFile1 = () => {
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
          filePath1: source
        });
      }
    });
  };

  chooseFile2 = () => {
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
          filePath2: source
        });
      }
    });
  };

  onPressSubmitButton() {
    console.log(
      "Image ",
      this.state.filePath,
      this.state.filePath1,
      this.state.filePath2,
      this.state.topic,
      this.state.description
    );

    this.onFetchLoginRecords();
  }

  async onFetchLoginRecords() {
    const createFormData = () => {
      var data = new FormData();

      data.append("image1", {
        name: this.state.filePath.fileName,
        type: this.state.filePath.type,
        uri:
          Platform.OS === "android"
            ? this.state.filePath.uri
            : this.state.filePath.uri.replace("file://", "")
      });

      data.append("image2", {
        name: this.state.filePath1.fileName,
        type: this.state.filePath1.type,
        uri:
          Platform.OS === "android"
            ? this.state.filePath1.uri
            : this.state.filePath1.uri.replace("file://", "")
      });

      data.append("image3", {
        name: this.state.filePath2.fileName,
        type: this.state.filePath2.type,
        uri:
          Platform.OS === "android"
            ? this.state.filePath2.uri
            : this.state.filePath2.uri.Freplace("file://", "")
      });
      data.append("topic", this.state.topic);
      data.append("description", this.state.description);
      data.append("user_id", 1);

      console.log("aaaa", data);
      return data;
    };

    try {
      let response = await fetch("http://cupdes.com/api/v1/create-news", {
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
            alert(
              "Successfully reported.This will be added after Admin comfirmation."
            );
            this.props.navigation.navigate("DrewerNav");
          } else {
            alert("authentication data Invalid!!!");
          }
        });
    } catch (errors) {
      alert("Check your Data before Submit");
    }
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response });
      }
    });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.wrapper}>
        <CustomHeaderRoot
          title="News Feed"
          alignItems="center"
          type="sub"
          openDrawer={() => this.props.navigation.goBack(null)}
        />

        <ScrollView>
          <Form style={styles.inputwrapper}>
            <Item>
              <Icon name="plus" size={25} color="#7a7e7f" />
              <Input
                style={styles.input}
                placeholder="Add Your News Topic Here"
                placeholderTextColor={"#7a7e7f"}
                name="name"
                multiline={true}
                onChangeText={text => this.setState({ topic: text })}
              />
            </Item>
          </Form>

          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "stretch",
              marginTop: "2%"
            }}
          >
            <View style={{ height: 180, backgroundColor: "#494a4c" }}>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: "2%",
                  color: "white",
                  fontFamily: "Myriad"
                }}
              >
                Upload Your Images Here
              </Text>
              <View
                style={{
                  flex: 1,
                  top: "27.4%",
                  marginRight: "6%",
                  alignItems: "flex-end"
                }}
              >
                <Image
                  source={{ uri: this.state.filePath2.uri }}
                  style={{
                    width: 90,
                    height: 90,
                    position: "absolute",
                    borderRadius: 20
                  }}
                />

                <TouchableOpacity>
                  <Button style={styles.btnLogin2}>
                    <Text
                      style={{
                        textAlign: "center",
                        marginTop: "2%",
                        color: "white",
                        fontSize: 10,
                        textAlign: "center"
                      }}
                      onPress={this.chooseFile2.bind(this)}
                    >
                      {" "}
                      Image 3
                    </Text>
                  </Button>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Image
                  source={{ uri: this.state.filePath1.uri }}
                  style={{
                    width: 90,
                    height: 90,
                    position: "absolute",
                    borderRadius: 20
                  }}
                />

                <TouchableOpacity>
                  <Button style={styles.btnLogin2}>
                    <Text
                      style={{
                        textAlign: "center",
                        marginTop: "2%",
                        color: "white",
                        fontSize: 10
                      }}
                      onPress={this.chooseFile1.bind(this)}
                    >
                      {" "}
                      Image2
                    </Text>
                  </Button>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                  marginLeft: "6%",
                  alignItems: "flex-start",
                  bottom: "27.6%"
                }}
              >
                <Image
                  source={{ uri: this.state.filePath.uri }}
                  style={{
                    width: 90,
                    height: 90,
                    position: "absolute",
                    borderRadius: 20
                  }}
                />
                <TouchableOpacity>
                  <Button style={styles.btnLogin2}>
                    <Text
                      style={{
                        textAlign: "center",
                        marginTop: "2%",
                        color: "white",
                        fontSize: 10
                      }}
                      onPress={this.chooseFile.bind(this)}
                    >
                      {" "}
                      Image 1
                    </Text>
                  </Button>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder="Add Your News description here"
              placeholderTextColor="grey"
              numberOfLines={10}
              multiline={true}
              onChangeText={text => this.setState({ description: text })}
            />
          </View>
        </ScrollView>
        <View style={styles.wrapper1}>
          <TouchableOpacity>
            <Button
              style={styles.btnLogin1}
              onPress={this.onPressSubmitButton.bind(this)}
            >
              <Icon
                name="newspaper"
                size={20}
                color="#222"
                alignItems="center"
              />
              <Text style={styles.text}>Report News </Text>
            </Button>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default CreateNews;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#eff1f2",
    height: "100%",
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
  },

  inputwrapper: {
    marginTop: 15,
    backgroundColor: "#dee7e8"
  },

  input: {
    minHeight: 5,
    fontSize: 15,
    color: "#7a7e7f",
    textAlign: "center",
    fontFamily: "Myriad"
  },

  text: {
    marginLeft: "2%",
    color: "#222",
    fontSize: 13,
    textAlign: "center",
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
    fontWeight: "bold",
    fontSize: 20,
    position: "relative"
  },
  //disContainer:{
  //  paddingTop:2,
  //  paddingLeft:30,
  //  paddingRight:30,
  //  borderWidth:1,
  //  borderColor:'#222'
  // },
  textAreaContainer: {
    borderColor: "#222",
    borderWidth: 1,
    paddingRight: 30,
    marginLeft: "3%",
    marginRight: "3%",
    marginTop: "2%"
  },
  textArea: {
    height: 240,
    color: "#707070"
  },
  btnLogin1: {
    width: 190,
    height: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    borderColor: "#2222",
    opacity: 0.7,
    borderWidth: 2,
    borderRadius: 28,
    marginTop: "2%"
  },
  btnLogin2: {
    width: 90,
    height: 25,
    backgroundColor: "transparent",
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
    alignItems: "center",
    backgroundColor: "#9F035C",
    height: 80,
    marginTop: "2%",
    bottom: 0
  }
});

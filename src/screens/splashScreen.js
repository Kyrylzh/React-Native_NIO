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
  Text,
  View,
  Animated,
  Image,
  Easing,
  Dimensions,
  ImageBackground,
  AsyncStorage
} from "react-native";

// import LinearGradient from "react-native-linear-gradient";

const { width, height } = Dimensions.get("window");

export default class SplachScreen extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0.4);
    this.animatedValue2 = new Animated.Value(0);
    // this.getToken();
  }

  async componentDidMount() {
    Animated.spring(this.animatedValue, {
      toValue: 1,
      friction: 2,
      delay: 2500
    }).start();

    Animated.timing(this.animatedValue2, {
      toValue: 1,
      delay: 200,
      duration: 3000
    }).start();

    // this.props.navigation.navigate("Login");

    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      // this.setState({ isLoading: false });
      // this.props.navigation.navigate("Login");
      this.getToken();
    }
  }

  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve("result");
      }, 3000)
    );
  };

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
      } else {
        this.props.navigation.navigate("Login");
      }
    } catch (error) {
      alert("token get error");
    }
  }

  render() {
    const truckStyle = {
      transform: [{ scale: this.animatedValue }]
    };

    const scaleText = {
      transform: [{ scale: this.animatedValue2 }]
    };

    return (
      <ImageBackground
        source={require("../Images/backgroundimage.jpg")}
        style={{ width: "100%", height: "100%" }}
        androidStatusBarColor={"#6D0F49"}
      >
        <View>
          <View style={styles.LogoContainer}>
            <Image source={require("../Images/logo.png")} style={styles.Logo} />
          </View>

          <Animated.View
            style={[
              {
                justifyContent: "center",

                bottom: 0,
                width: width / 2,
                height: 3,
                backgroundColor: "#fff",
                borderRadius: 2,
                marginLeft: "25%",
                marginRight: "20%"
              },
              scaleText
            ]}
          />
          {/* </LinearGradient> */}
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0277BD"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "red",
    marginBottom: 5
  },
  ring: {},
  starStyle: {
    width: 100,
    height: 100
  },
  Logo: {
    width: 155,
    height: 155
  },

  LogoContainer: {
    marginTop: "50%",
    alignItems: "center",
    position: "relative"
  }
});

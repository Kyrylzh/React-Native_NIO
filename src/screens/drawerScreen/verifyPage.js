import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView, Image,
  
} from "react-native";
import { Container, Content, CardItem, Right, Card, Button,} from "native-base";
import { ThemeProvider, Header } from "react-native-elements";
// import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome5";


class home extends Component {
  constructor(props) {
    super(props);
  }
  LoginHandler = () => {
    this.props.navigation.navigate("Login");
  };
 
  render() {
    return (
      <ScrollView style={{ backgroundColor: '#6D0F49' }}>

        <View>
          <View style={{ height: 150, backgroundColor: '#6D0F49' }} >

            <View style={styles.LogoContainer}>

              <Image source={require('../../Images/logo.png')} style={styles.Logo} />


            </View>

          </View>

          <View style={{
              alignItems: 'center',
              
              marginTop: 30
            }}>

            <Text style={styles.createNew1}  >Welcome to National Intellectuals Organization</Text>

            <View style={{
              alignItems: 'center',
              marginLeft:'10%',
              marginRight:'10%',
              marginTop: 20
            }}>
              <Text style={styles.createNew3}  >Wait for Account Activaion.Your Account Will verify within 24 Hours</Text>
              <TouchableOpacity    >
              <Button  style={styles.btnLogin1} onPress={this.LoginHandler}>
              <Text style={styles.createNew2}  >Go back to LOGIN page</Text>
              </Button>
              </TouchableOpacity>
            </View>
          </View>
        </View>




      </ScrollView>
    );
  }
}

export default home;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
    fontFamily: "Myriad"
  },
 
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
  
  btnLogin1: {
    
    width:170,    
    height: 35,                 
    backgroundColor:'#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderColor: '#2222',
    opacity:0.7,
      borderWidth:2,
      borderRadius:28,
    marginTop: 30,
  },
  text: {
    marginLeft: 10,
    color: "white",
    fontSize: 17
  },
 
  createNew1: {

    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontFamily:'Myriad',
  

  },
  createNew2: {
    color: '#222',
    fontSize: 13,
    position: 'relative',
    
    textAlign: 'center',
    fontFamily:'Myriad',

  },
  createNew3: {
    color: 'white',
    fontSize: 13,
    position: 'relative',
   
    textAlign: 'center',

  },

  Logo: {
    width: 150,
    height: 150,
  },
  LogoContainer: {
    marginTop: '10%',
    alignItems: 'center',
    position: 'relative'
  },

});
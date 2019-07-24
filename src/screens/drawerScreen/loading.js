import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,Image
} from "react-native";
import { Container, Content, CardItem, Right, Card, Button } from "native-base";
import { ThemeProvider, Header } from "react-native-elements";
// import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome5";
import Swiper from "react-native-swiper";
import CustomHeader from "./../../components/Header/Header";

class home extends Component {
  constructor(props) {
    super(props);
  }
  
  DisHandler = () => {
    this.props.navigation.navigate("Disnav");
  };

  calendarHandler = () => {
    this.props.navigation.navigate("TaskCalendar");
  };

  discussionHandler = () => {
    // alert("Discussion clicked");
    this.props.navigation.navigate("DrawerScreen2");
  };

  taskHandler = () => {
    this.props.navigation.navigate("DrawerScreen3");
  };

  SkipHandler=()=>{
    this.props.navigation.navigate('verifyPage')
};
  render() {
    return (
      <ScrollView style={{ backgroundColor: '#6D0F49' }}>
        {/* <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }} 
          colors={["#9F035C", "#6D0F49"]}
          style={styles.linearGradient}


        > */}
          <View> 
                 <View style={{height: 150, backgroundColor: '#6D0F49'}} >
                
                   <View style={styles.iconpos0} style={{flex: 1,
                    flexDirection: 'row-reverse',
                    marginTop:30}}
                    onPress={this.SkipHandler}>
                  
                 <Icon  name="angle-double-right" 
                 size={25}  
                 color="white"/>
                 <Text style= {styles.createNew2} onPress={this.SkipHandler} >Skip</Text>
                 
                 </View>
                 
      </View>
                  </View>
                  <View style={styles.header}>
<Text style= {styles.createNew1}>THIS IS NIO APP</Text>
</View>
             
          
          <View>
           
          <View style={styles.Swipercon}>
            <Swiper style={styles.wrapper2} >
              <View style={styles.slide1}>
                <View>
              <Image
                                style={{
                                  width: 350,
                                  height: 330,
                                  
                                  
                                }}
                               
                                  source={require('./../../Images/1.png')}
                               
                              />
                            </View>
               
              </View>
              <View style={styles.slide2}>
              <View>
              <Image
                                style={{
                                  width: 350,
                                  height: 330,
                                }}
                                source={require('./../../Images/2.png')}
                              />
                            </View>
                
              </View>
              <View style={styles.slide3}>
              <View>
              <Image
                                style={{
                                  width: 350,
                                  height: 330,
                                }}
                                source={require('./../../Images/3.png')}
                              />
                              
                            </View>
               
              </View>
            </Swiper>
          </View>
        </View>
        {/* </LinearGradient> */}
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
  wrapper2: {},
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
  linearGradient: {
    flex: 1
  },
  discusscontainer: {
    borderColor: "#2222",
    borderRadius: 28,
    alignItems: "center",
    fontFamily: "Myriad"
  },
  leftlay: {
    top: 25,
    width: "30%",
    height: 130,
    backgroundColor: "white",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    fontFamily: "Myriad",

    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#ddd",
    borderTopWidth: 0,
    borderRightWidth: 0,

    borderColor: "#ddd",

    shadowColor: "#222",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.9,
    shadowRadius: 2
  },
  rightlay: {
    top: 25,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
    width: "60%",
    height: 130,
    backgroundColor: "white",

    borderWidth: 2,
    borderColor: "#ddd",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    shadowColor: "#222",
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.9,
    shadowRadius: 15
  },
  rightlay1: {
    top: 25,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
    width: "40%",
    height: 130,
    backgroundColor: "white",

    borderWidth: 2,
    borderColor: "#ddd",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    shadowColor: "#222",
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.9,
    shadowRadius: 15
  },
  rightlay2: {
    top: 25,
    borderRadius: 15,

    overflow: "hidden",
    width: "20%",
    height: 120,
    backgroundColor: "white",
    marginLeft: 2,
    borderWidth: 2,
    borderColor: "#ddd",
    marginTop: 5,
    shadowColor: "#222",
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.9,
    shadowRadius: 15
  },
  iconpos0: {
    marginTop: 10,
    alignItems: "center"
  },
  iconpos: {
    alignItems: "center",
    marginTop: 20
  },
  iconpos1: {
    marginTop: 10,
    marginLeft: 5,
    alignItems: "flex-start"
  },
  Distext: {
    fontSize: 17,
    marginTop: 20,
    textAlign: "center",
    color: "#70111e",
    fontWeight: "bold"
  },
  btnLogin1: {
    width: 320,
    height: 40,
    backgroundColor: "#d8087f",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    borderColor: "#2222",
    opacity: 0.9,
    borderWidth: 2,
    borderRadius: 28,
    opacity: 0.8
  },
  text: {
    marginLeft: 10,
    color: "white",
    fontSize: 17
  },
  Swipercon: {
    height: 330,
    
  },
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
   
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
   
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    
  },
  createNew1:{
   

    textAlign:'center',
    
    color:'white',
    fontFamily:'Myriad',
    fontSize: 30,
    

    

  },
  createNew2:{
    
    color:'white',
    fontFamily:'Myriad',
    fontSize: 16,
    position:'relative'

    

  },
  header:{
    
  position:'absolute',
  marginTop:'20%',
  alignItems:'center',
  marginLeft:'15%',
  marginRight:'15%'


   
  }

});
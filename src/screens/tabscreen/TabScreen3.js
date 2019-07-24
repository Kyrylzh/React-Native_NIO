// import React, { Component } from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import CustomHeader from "../../components/Header/Header";

// class TabScreen2 extends Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <View>
//         <CustomHeader
//           title="Finished Task"
//           openDrawer={() => this.props.navigation.openDrawer()}
//           iconName="md-checkmark-circle"
//         />
//         <Text> TabScreen2 </Text>
//       </View>
//     );
//   }
// }

// export default TabScreen2;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center"
//   }
// });

import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
// import CustomHeader from "../../components/Header/Header";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title
} from "native-base";
// import { createBottomTabNavigator } from 'react-navigation';
// import {
//   createMaterialTopTabNavigator,
//   createStackNavigator
// } from "react-navigation";
// import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import SearchInput, { createFilter } from "react-native-search-filter";
import Icon_Material from "react-native-vector-icons/MaterialCommunityIcons";
import Icon_Ionicons from "react-native-vector-icons/Ionicons";
import CustomHeaderRoot from "./../../components/Header/HeaderRoot";

const KEYS_TO_FILTERS = ["user.name", "subject", "description"];

finished = [
  {
    id: 1,
    user: {
      name: "Juniper"
    },
    subject: "Hello World!",
    description:
      "Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator."
  },
  {
    id: 2,
    user: {
      name: "Robert"
    },
    subject: "React is <3",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. .... To take a trivial example, which of us ever undertakes laborious physical exercise  "
  },
  {
    id: 3,
    user: {
      name: "you can search for me using a regex : `java$`"
    },
    subject: "What's Up?",
    description:
      "Reference site about Lorem Ipsum, giving  chanaka information on its origins, as well as a random Lipsum generator."
  }
];

data = [
  {
    id: 4,
    user: {
      name: "Georgia"
    },
    subject: "How are you today?",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. .... To take a trivial example, which of us ever undertakes laborious physical exercise  "
  },
  {
    id: 5,
    user: {
      name: "Albert"
    },
    subject: "Hey!",
    description:
      "Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator."
  },
  {
    id: 6,
    user: {
      name: "Zoey"
    },
    subject: "React Native!",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. .... To take a trivial example, which of us ever undertakes laborious physical exercise  "
  },
  {
    id: 7,
    user: {
      name: "Cody"
    },
    subject: "is super!",
    description:
      "Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator."
  },
  {
    id: 8,
    user: {
      name: "Chili"
    },
    subject: "Awesome!",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. .... To take a trivial example, which of us ever undertakes laborious physical exercise  "
  }
];

class TabScreen3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      userDetails: null,
      pendingTask: null,
      isLoading: true
    };

    this.getUserDetails();
  }

  async getUserDetails() {
    // alert("getUserDetails");
    try {
      let userDeatails = await AsyncStorage.getItem("userDetails");
      console.log("In Pending Task : " + userDeatails + " ********** ");
      let userDeatailsJson = JSON.parse(userDeatails);

      console.log("In Pending Task : ", userDeatailsJson, " ********** ");
      console.log(
        "In Pending Task : Role ",
        userDeatailsJson.name,
        " ********** "
      );

      this.setState({
        userDetails: userDeatailsJson
      });
      console.log(
        "End of the Pending Task ********** tab3",
        this.state.userDetails.name
      );
    } catch (error) {
      alert(error);
      this.props.navigation.Login();
    }

    this.fetchPendingTask();
  }

  fetchPendingTask = async () => {
    console.log("Fetching.... Discussion");
    await fetch("http://cupdes.com/api/v1/get-pendingtasks/2", {
      method: "GET",
      headers: {
        "X-AUTH-TOKEN": "Px7zgU79PYR9ULEIrEetsb",
        "Content-Type": "XMLHttpRequest"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        this.datahandler(responseJson);
      })
      .done();
  };

  datahandler(data) {
    console.log("in dataHandler PENDING task ", data);

    this.setState({
      pendingTask: data,
      isLoading: false
    });

    console.log(this.state.pendingTask, " ***********");

    console.log(
      " *********** IN pending Task",
      this.state.pendingTask.data,
      " ***********"
    );
  }

  fetchPendingTask() {
    alert("fetch pending TASK");
  }

  finishedTaskHandler = () => {
    alert("Finished Task Handler");
    // this.props.navigation.navigate("ShowFinishedTask");
  };

  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }

  taskHandler = data => {
    // alert("taskHandler Admin data ");
    console.log("taskHandler Admin data ", data);
    this.setTaskInfo(data);
  };

  setTaskInfo = async data => {
    console.log("setTaskInfo ", data);
    try {
      await AsyncStorage.setItem("taskDetails", JSON.stringify(data));
      console.log("setTaskInfo saves asyn");
    } catch (error) {
      alert("setTaskInfo store error");
    }
    console.log("End the setTaskInfo");
    this.props.navigation.navigate("CreateSubTasks");
    // this.props.navigation.navigate("TaskSLAPAdminList");
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.containerWait}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else if (this.state.pendingTask.data.length == 0) {
      return (
        <ScrollView>
          <CustomHeaderRoot
            title="Pending Task"
            openDrawer={() => this.props.navigation.openDrawer()}
            iconName="md-checkmark-circle"
          />
          <View>
            {/* <SearchBar /> */}
            {/* <Text>Hello</Text> */}
            <Header
              style={{ backgroundColor: "#9F035C" }}
              androidStatusBarColor={"#6D0F49"}
            >
              {/* <Left>
                      <Button transparent>
                      <Icon name='arrow-back' />
                      </Button>
                  </Left> */}
              <Body>
                {/* <Title>Header</Title> */}
                <SearchInput
                  onChangeText={term => {
                    this.searchUpdated(term);
                  }}
                  style={styles.searchInput}
                  placeholder="Search"
                />
              </Body>
              {console.log(
                "Pencil Dicision in Pending Task : ",
                this.state.userDetails.name === "administraion"
              )}
              {console.log(
                "Pencil Dicision in Pending Task : ",
                this.state.userDetails.name
              )}

              {this.state.userDetails.name === "administraion" ? (
                <Right>
                  <Button transparent>
                    {/* <Icon name="pencil" /> */}
                    <Icon_Material name="pencil" color="white" size={25} />
                  </Button>
                </Right>
              ) : null}
            </Header>
          </View>
        </ScrollView>
      );
    } else {
      const task = this.state.pendingTask.data.filter(
        // const task = finished.filter(
        createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
      );

      return (
        <ScrollView>
          <CustomHeaderRoot
            title="Pending Task"
            openDrawer={() => this.props.navigation.openDrawer()}
            iconName="md-checkmark-circle"
          />
          <View>
            {/* <SearchBar /> */}
            <Header
              style={{ backgroundColor: "#9F035C" }}
              androidStatusBarColor={"#6D0F49"}
            >
              {/* <Left>
                      <Button transparent>
                      <Icon name='arrow-back' />
                      </Button>
                  </Left> */}
              <Body>
                {/* <Title>Header</Title> */}
                <SearchInput
                  onChangeText={term => {
                    this.searchUpdated(term);
                  }}
                  style={styles.searchInput}
                  placeholder="Search"
                />
              </Body>
              {console.log(
                "Pencil Dicision in Pending Task : ",
                this.state.userDetails.name === "administraion"
              )}
              {console.log(
                "Pencil Dicision in Pending Task : ",
                this.state.userDetails.name
              )}

              {this.state.userDetails.name === "administraion" ? (
                <Right>
                  <Button transparent>
                    {/* <Icon name="pencil" /> */}
                    <Icon_Material name="pencil" color="white" size={25} />
                  </Button>
                </Right>
              ) : null}
            </Header>
          </View>

          {task.map(email => {
            return (
              <View key={email.id} style={styles.cardContainer}>
                {/* <TouchableOpacity onPress={this.finishedTaskHandler}>
                  <View style={styles.card}>
                    <View style={styles.headerBlock}>
                      <View
                        style={{
                          width: "25%",
                          height: 75,
                          backgroundColor: "white",
                          padding: 10
                        }}
                      >
                        <Text>Image</Text>
                      </View>
                      <View style={styles.discription}>
                        <Text style={styles.header}>{email.description}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity> */}
                <TouchableOpacity
                  key={email.id}
                  style={styles.cardContainer}
                  onPress={() => this.taskHandler(email)}
                >
                  <View style={styles.card}>
                    <View style={styles.headerBlock}>
                      <View
                        style={{
                          width: "25%",
                          height: 75,
                          backgroundColor: "#F5F5F5",
                          padding: 10
                        }}
                      >
                        <Icon_Ionicons
                          name="md-contact"
                          size={45}
                          color="#6D0F49"
                        />
                      </View>
                      <View
                        style={{
                          width: "50%",
                          height: 75,
                          backgroundColor: "#F5F5F5",
                          padding: 10
                        }}
                      >
                        <Text style={styles.header}>{email.topic}</Text>
                        {/* <Text>Today, 12 AM</Text> */}
                      </View>
                      <View
                        style={{
                          width: "25%",
                          height: 75,
                          backgroundColor: "#F5F5F5",
                          padding: 10
                        }}
                      >
                        <Text>{email.notification}</Text>
                        {email.notification == 10 ? (
                          <Text>{email.notification}</Text>
                        ) : (
                          <Text />
                        )}
                      </View>
                    </View>

                    <View style={styles.textContainer}>
                      <Text style={{ fontSize: 10 }}>
                        {"Start Date : " + email.start_date}
                      </Text>
                      <Text style={{ fontSize: 10 }}>
                        {"End Date:  " + email.end_date}
                      </Text>
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={{ fontSize: 12 }}>{email.description}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      );
    }
  }
}

export default TabScreen3;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start"
  },
  emailItem: {
    borderBottomWidth: 0.5,
    borderColor: "rgba(0,0,0,0.3)",
    padding: 10
  },
  emailSubject: {
    color: "rgba(0,0,0,0.5)"
  },
  searchInput: {
    borderColor: "#CCC",
    height: 40,
    borderRadius: 24.5,
    width: 300,
    backgroundColor: "#6D0F49",
    color: "white"
  },

  // cardContainer: {
  //   margin: 10
  // },
  // card: {
  //   borderLeftColor: "#6D0F49",
  //   borderLeftWidth: 10
  // },
  // headerBlock: {
  //   // flex:1,
  //   flexDirection: "row",
  //   backgroundColor: "#e1e6ef"
  // },
  // header: {
  //   // fontSize:24,
  // },

  // textContainer: {
  //   padding: 10,
  //   backgroundColor: "#c7ccd6"
  // },

  // text: {},

  // TouchableOpacityStyle: {
  //   position: "absolute",
  //   width: 50,
  //   height: 50,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   right: 30,
  //   bottom: 30
  // },

  // FloatingButtonStyle: {
  //   resizeMode: "contain",
  //   width: 50,
  //   height: 50
  //   //backgroundColor:'black'
  // }

  cardContainer: {
    margin: 10
  },
  card: {
    borderLeftColor: "#6D0F49",
    borderLeftWidth: 10
  },
  headerBlock: {
    // flex:1,
    flexDirection: "row",
    backgroundColor: "#e1e6ef"
  },
  header: {
    fontSize: 13,
    fontFamily: "Myriad"
  },

  textContainer: {
    padding: 10,
    backgroundColor: "#EEEEEE"
  },

  text: {},

  TouchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30
  },

  FloatingButtonStyle: {
    resizeMode: "contain",
    width: 50,
    height: 50
    //backgroundColor:'black'
  }
});

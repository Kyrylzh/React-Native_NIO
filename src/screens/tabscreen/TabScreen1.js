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
import {
  createMaterialTopTabNavigator,
  createStackNavigator
} from "react-navigation";
// import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import SearchInput, { createFilter } from "react-native-search-filter";
import Icon_Material from "react-native-vector-icons/MaterialCommunityIcons";
const KEYS_TO_FILTERS = ["user.name", "subject", "description"];
import Icon_Ionicons from "react-native-vector-icons/Ionicons";
import CustomHeaderRoot from "./../../components/Header/HeaderRoot";

class TabScreen1 extends Component {
  static navigationOptions = () => {
    return {
      // this handler will override the generic one defined at Navigator level
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        console.log("IN toDO Tab bar Options ", navigation);

        if (navigation.isFocused()) {
          console.log("IN toDO Tab bar Options ", navigation);
          alert("subsequent focus on Settings");
          return;
        }

        navigation.state.params.onTabFocus();
        defaultHandler();
      }
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      foo: 1,
      userDetails: null,
      isLoading: true,
      taskToDo: null
    };
    this.getUserDetails();
    {
      console.log("This is constructor of TabScreen 1 of Task ToDo");
    }
    props.navigation.setParams({
      onTabFocus: this.handleTabFocus
    });
  }

  handleTabFocus = () => {
    alert(`first focus on Settings, state.foo is ${this.state.foo}`);
  };

  componentWillReceiveProps() {
    console.log("rerender here componentWillReceiveProps");
    //this.yourFunction()
    //this.setState({})
  }

  async getUserDetails() {
    // alert("getUserDetails");
    try {
      let userDeatails = await AsyncStorage.getItem("userDetails");
      console.log("In Task to do : " + userDeatails + " ********** ");
      let userDeatailsJson = JSON.parse(userDeatails);

      console.log("In Task to do : : ", userDeatailsJson, " ********** ");
      console.log(
        "In Task to do :  Role ",
        userDeatailsJson.name,
        " ********** "
      );

      this.setState({
        userDetails: userDeatailsJson
      });
      console.log(
        "End of the In Task to do :  ********** tab3",
        this.state.userDetails.name
      );
    } catch (error) {
      alert(error);
      this.props.navigation.Login();
    }

    this.fetchFinishedTask();
  }

  fetchFinishedTask = async () => {
    console.log("Fetching.... In Task to do :");
    const role = this.state.userDetails.name;
    const user_id = this.state.userDetails.id;

    console.log(" User Role : " + role + " user_d " + user_id);
    {
      role === "user"
        ? (url = `http://cupdes.com/api/v1/get-subtasks/${user_id}`)
        : (url = `http://cupdes.com/api/v1/get-tasks/${user_id}`);
    }

    {
      role === "administrator"
        ? (url = `http://cupdes.com/api/v1/get-tasks/${user_id}`)
        : null;
    }

    console.log(" Url is tab screen 1 ", url);

    await fetch(url, {
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
    console.log("in dataHandler In Task to do :", data);

    this.setState({
      taskToDo: data,
      isLoading: false
    });

    console.log(this.state.taskToDo, " ***********");

    console.log(
      " *********** In Task to do :",
      this.state.taskToDo.data,
      " ***********",
      this.state.taskToDo.data.length
    );
  }

  taskHandler(data) {
    // alert("Task Handler");
    console.log("Task Handler Data ", data);
    this.setTaskInfo(data);
    // this.props.navigation.navigate("taskHandler data ", data);
  }
  setTaskInfo = async data => {
    console.log("setTaskInfo ", data);
    try {
      await AsyncStorage.setItem("taskDetails", JSON.stringify(data));
      console.log("setTaskInfo saves asyn");
    } catch (error) {
      alert("setTaskInfo store error");
    }
    console.log("End the setTaskInfo");
    // this.props.navigation.navigate("CreateSubTask");
    this.props.navigation.navigate("TaskSLAPAdminList");
  };

  // finishedHandler(data) {
  //   alert("finishedHandler " + data);
  // }

  async finishedHandler(data) {
    console.log("finishedHandler  ", data);
    // const { userDetails } = this.state;
    // alert("finishedHandler");

    var data = {
      subtask_id: data.id
    };

    try {
      let response = await fetch("http://cupdes.com/api/v1/finish-subtask", {
        method: "POST",
        headers: {
          "X-AUTH-TOKEN": "Px7zgU79PYR9ULEIrEetsb",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(responseJson => {
          // this.dataHandler(responseJson);
          console.log("finishedHandler response ", responseJson);
          alert(responseJson.message);
          // }
        });
    } catch (errors) {
      alert(errors);
    }
    // this.constructor();
    // this.props.navigation.navigate("Screen2"); FinishTaskScreen
    this.props.navigation.navigate("FinishTaskScreen");
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }

  createTaskHandler = () => {
    // alert("In createTaskHandler");
    this.props.navigation.navigate("CreateTaskAdmin");
  };
  // componentDidMount() {
  // this.constructor();
  // }
  // componentDidUpdate(prevProps) {
  //   // if (!prevProps.isLoading) {
  //   //   // this.setState({
  //   //   //   isLoading:true
  //   //   // })
  //   //   this.fetchFinishedTask();
  //   // }
  // }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.containerWait}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else if (this.state.taskToDo.data.length == 0) {
      {
        console.log("Render method in Tab Screen TODO in else if");
      }
      return (
        <ScrollView>
          <CustomHeaderRoot
            title="Task to do"
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
                  placeholder=" Search"
                />
              </Body>
              {console.log("Pencil Dicision : " + this.state.userDetails.name)}
              {/* {this.state.userDetails.name === "user" ? null : (
                <Right>
                  <TouchableOpacity
                    onPress={this.createTaskHandler}
                    transparent
                  >
                    <Icon_Material name="pencil" color="white" size={25} />
                  </TouchableOpacity>
                </Right>
              )} */}
              {this.state.userDetails.name === "administrator" ? (
                <Right>
                  <TouchableOpacity
                    onPress={this.createTaskHandler}
                    transparent
                  >
                    <Icon_Material name="pencil" color="white" size={25} />
                  </TouchableOpacity>
                </Right>
              ) : null}
            </Header>
          </View>
        </ScrollView>
      );
    } else {
      {
        console.log("Render method in Tab Screen TODO in else");
      }
      const task = this.state.taskToDo.data.filter(
        createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
      );

      return (
        <ScrollView>
          <CustomHeaderRoot
            title="Task to do"
            openDrawer={() => this.props.navigation.openDrawer()}
            iconName="md-checkmark-circle"
          />
          <View style={{ height: 60 }}>
            {/* <SearchBar /> */}
            {/* <Text>Hello</Text> */}
            <Header
              style={{ backgroundColor: "#9F035C", height: 70, padding: 15 }}
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
                  placeholder=" Search"
                />
              </Body>
              {/* <Right>
                <TouchableOpacity onPress={this.createTaskHandler} transparent>
                  <Icon_Material name="pencil" color="white" size={25} />
                </TouchableOpacity>
              </Right> */}
              {console.log("Pencil Dicision : " + this.state.userDetails.name)}
              {/* {this.state.userDetails.name === "user" ? null : (
                <Right>
                  <TouchableOpacity
                    onPress={this.createTaskHandler}
                    transparent
                  >
                    <Icon_Material name="pencil" color="white" size={25} />
                  </TouchableOpacity>
                </Right>
              )} */}

              {this.state.userDetails.name === "administrator" ? (
                <Right>
                  <TouchableOpacity
                    onPress={this.createTaskHandler}
                    transparent
                  >
                    <Icon_Material name="pencil" color="white" size={25} />
                  </TouchableOpacity>
                </Right>
              ) : null}
            </Header>
          </View>

          {this.state.userDetails.name === "user"
            ? // <Text>User</Text>
              task.map(email => {
                return (
                  <View
                    key={email.id}
                    style={styles.cardContainer}
                    // onPress={this.taskHandler}
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
                          <Text style={styles.header}>{email.subtask}</Text>
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
                          {/* <Text>{email.notification}</Text>*/}

                          <View
                            stlye={{
                              flexDirection: "flex-end",
                              marginRight: 4
                            }}
                          >
                            <TouchableOpacity>
                              <Button
                                style={styles.btnLogin1}
                                onPress={() => this.finishedHandler(email)}
                              >
                                <Text style={{ fontSize: 9 }}>Finish</Text>
                              </Button>
                            </TouchableOpacity>
                          </View>
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
                    </View>
                  </View>
                );
              })
            : task.map(email => {
                return (
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
                          <Text>{email.createDate}</Text>
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
                    </View>
                  </TouchableOpacity>
                );
              })}
        </ScrollView>
      );
    }
  }
}

export default TabScreen1;
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
  btnLogin1: {
    width: 70,
    height: 30,
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

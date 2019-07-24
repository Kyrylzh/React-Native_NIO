import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import SearchInput, { createFilter } from "react-native-search-filter";
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
import Icon_Material from "react-native-vector-icons/MaterialCommunityIcons";
import Icon_Ionicons from "react-native-vector-icons/Ionicons";
import NextArrorButton from "./../../components/button/NextArrorButton";
import CustomHeaderRoot from "./../../components/Header/HeaderRoot";
const KEYS_TO_FILTERS = ["user.name", "subject", "description"];
import { StackActions } from "react-navigation";

const pushAction = StackActions.push({
  routeName: "ToDoTask"
  // params: {
  //   myUserId: 9,
  // },
});

const data = [
  {
    id: 1,
    name: "Hall Booking"
  },

  {
    id: 2,
    name: "Sound Arrangement"
  },
  {
    id: 3,
    name: "Lighting Arrangement"
  },
  {
    id: 4,
    name: "Meal Arrangement"
  },
  {
    id: 5,
    name: "Tarnsport"
  }
];

class TaskSLAPAdminList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      subTask: null,
      isLoading: true,
      isLoadingTask: false,
      taskDetails: null
    };

    this.getTaskDetails();
    // this.fetchTaskInfo();
    // this.fetchSubTaskInfo();
  }

  componentDidMount() {
    this.getTaskDetails();
  }

  async getTaskDetails() {
    // alert("getTaskDetails");
    try {
      let userDetails = await AsyncStorage.getItem("userDetails");
      let taskDetails = await AsyncStorage.getItem("taskDetails");
      console.log("In Create Task Admin  : " + taskDetails + " ********** ");
      // let userDeatails = JSON.stringify(userDeatails);
      let taskDetailsJson = JSON.parse(taskDetails);
      let userDetailsJson = JSON.parse(userDetails);

      console.log("In Create Task Admin  : ", taskDetailsJson, " ********** ");
      console.log("In Create Task Admin  : ", userDetailsJson, " ********** ");

      console.log(
        "In Create Task Admin  :  ID ",
        taskDetailsJson.id,
        " ********** "
      );

      this.setState({
        taskDetails: taskDetailsJson,
        userDetails: userDetailsJson
      });
      console.log(
        "End of the Create Task Admin task Details  ********** ",
        this.state.taskDetails
      );
    } catch (error) {
      console.log("Error ", error);
      alert(error);
    }
    this.fetchTaskInfo();
  }

  fetchSubTaskInfo = async () => {
    const taskID = this.state.taskDetails.id;
    console.log("Fetching.... taskID " + taskID);
    await fetch(`http://cupdes.com/api/v1/get-subtasksbytaskid/${taskID}`, {
      method: "GET",
      headers: {
        "X-AUTH-TOKEN": "Px7zgU79PYR9ULEIrEetsb",
        "Content-Type": "XMLHttpRequest"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        this.subTaskInfoDatahandler(responseJson);
      })
      .done();
  };

  subTaskInfoDatahandler(data) {
    console.log("in dataHandler subTaskInfoDatahandler ", data);
    console.log("in dataHandler subTaskInfoDatahandler ", data.data);

    this.setState({
      subTask: data
      // isLoading: false
    });

    console.log(this.state.subTask, " sub task in state ***********");

    console.log(
      " *********** IN subTask Task",
      this.state.subTask.data,
      " ***********"
    );

    this.setState({
      isLoading: false
    });
  }

  fetchTaskInfo = async () => {
    const taskID = this.state.taskDetails.id;
    console.log("Fetching.... Task info");
    await fetch(`http://cupdes.com/api/v1/get-taskbyid/${taskID}`, {
      method: "GET",
      headers: {
        "X-AUTH-TOKEN": "Px7zgU79PYR9ULEIrEetsb",
        "Content-Type": "XMLHttpRequest"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        this.taskInfoDatahandler(responseJson);
      })
      .done();
  };

  taskInfoDatahandler(data) {
    console.log("in dataHandler TaskInfoDatahandler ", data);

    this.setState({
      task: data
      // isLoadingTask: false
    });

    console.log(this.state.task, " ***********");

    console.log(" *********** IN Task", this.state.task, " ***********");

    this.fetchSubTaskInfo();
    this.setState({
      isLoadingTask: false
    });
  }

  // taskFinishedHandler() {
  //   console.log("taskFinishedHandler ");
  // }

  async taskRemoveHandler() {
    console.log("finishedHandler ID  ", this.state.taskDetails);
    console.log("finishedHandler ID  ", this.state.taskDetails.id);

    var data = {
      user_id: this.state.userDetails.id,
      task_id: this.state.taskDetails.id
    };

    try {
      let response = await fetch("http://cupdes.com/api/v1/delete-task", {
        method: "POST",
        headers: {
          "X-AUTH-TOKEN": "Px7zgU79PYR9ULEIrEetsb",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log("Delete Task by Admin : ", responseJson);
          alert(responseJson.message);
          this.deleteTaskDatahandler(responseJson);
        });
    } catch (errors) {
      alert(errors);
    }
    // this.props.navigation.goBack(null);
    this.props.navigation.dispatch(pushAction);
    // this.props.navigation.navigate(ToDoTask);DrewerNav
    // this.props.navigation.navigate(DrewerNav);
  }

  deleteTaskDatahandler(data) {
    console.log("in dataHandler delete  Task by admin  ", data);
  }

  async taskFinishedHandler() {
    console.log("finishedHandler  ", data);
    // const { userDetails } = this.state;
    // alert("finishedHandler");

    if (this.state.subTask.data.length == 0) {
      alert("Wait Sub Task is not over yet");
    } else {
      var data = {
        task_id: this.state.taskDetails.id
      };

      try {
        let response = await fetch("http://cupdes.com/api/v1/finish-task", {
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
            console.log(
              "finishedHandler finished Task response ",
              responseJson
            );
            alert(responseJson.message);
            // }
          });
      } catch (errors) {
        alert(errors);
      }
      // this.constructor();
      // this.props.navigation.navigate("FinishTaskScreen");
      this.props.navigation.dispatch(pushAction);
    }
  }

  handleNextButton = () => {
    // alert("Next Clicked");
    this.props.navigation.navigate("Screen2");
  };

  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }

  addTaskHandler = () => {
    // alert("addTaskHandler");
    this.props.navigation.navigate("ReCreateSubTask");
  };

  editTaskHandler = data => {
    // alert("clicked editTaskHandler");
    console.log("editTaskHandler data ", data);
    this.setSubTaskInfo(data);
    // this.setState({
    //   isLoading: true
    // });
  };

  setSubTaskInfo = async data => {
    console.log("setTaskInfo ", data);
    try {
      await AsyncStorage.setItem("subTaskDetails", JSON.stringify(data));
      console.log("subTaskDetails saves asyn");
    } catch (error) {
      alert("subTaskDetails store error");
    }
    console.log("End the subTaskDetails");
    this.props.navigation.navigate("EditSubTask");
  };

  removeTaskHandler(data) {
    // alert("removeTaskHandler ", data);
    console.log("removeTaskHandler ", data.id);

    this.deleteRequest(data.id);
  }

  // deleteHandler = () => {
  //   alert("in Whats is discussion deleteHandler");
  //   this.deleteRequest();
  // };

  deleteRequest = async id => {
    console.log("Fetching.... deleteRequest ", id);

    var data = {
      user_id: this.state.userDetails.id,
      task_id: id
    };

    try {
      let response = await fetch("http://cupdes.com/api/v1/delete-subtask", {
        method: "POST",
        headers: {
          "X-AUTH-TOKEN": "Px7zgU79PYR9ULEIrEetsb",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log("Delete Post is  : ", responseJson);
          alert(responseJson.message);
          this.deleteDatahandler(responseJson);
        });
    } catch (errors) {
      alert(errors);
    }
    // this.props.navigation.goBack(null);
    // this.props.navigation.dispatch(pushAction);
    this.props.navigation.dispatch(pushAction);
  };

  deleteDatahandler(data) {
    console.log("in dataHandler delete Sub Task user %%%%% ", data);
  }
  render() {
    console.log(" render dicision  isLoading " + this.state.isLoading);
    console.log(" render dicision isLoadingTask " + this.state.isLoadingTask);
    console.log(
      " render dicision " + (this.state.isLoading && this.state.isLoadingTask)
    );
    if (this.state.isLoading || this.state.isLoadingTask) {
      return (
        <View style={styles.containerWait}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <View style={{ backgroundColor: "white", height: "100%" }}>
          <ScrollView>
            <CustomHeaderRoot
              title="Sub Task info"
              type="sub"
              openDrawer={() => this.props.navigation.goBack(null)}
              iconName="md-checkmark-circle"
            />

            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  alignItems: "flex-start",
                  height: 75,
                  backgroundColor: "#EEEEEE"
                }}
              >
                <View style={{ width: "60%", paddingLeft: 15, paddingTop: 10 }}>
                  <Text style={{ fontSize: 17, fontFamily: "Myriad" }}>
                    {/* {this.state.task.data.topic} */}
                    {this.state.taskDetails.topic}
                  </Text>
                </View>
                <View
                  style={{ width: "40%", paddingRight: 15, paddingTop: 10 }}
                >
                  {this.state.userDetails.name === "administrator" ? (
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        style={styles.btnLogin1}
                        onPress={() => this.taskFinishedHandler()}
                      >
                        <Text style={{ fontSize: 9 }}>Finish</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.btnLogin1}
                        onPress={() => this.taskRemoveHandler()}
                      >
                        <Text style={{ fontSize: 9 }}>Remove</Text>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </View>
              </View>
            </View>
            {console.log("Length " + this.state.subTask.data.length)}
            {console.log("Length " + this.state.subTask.data.length == 0)}

            {this.state.subTask.data.length == 0 ? (
              <View>
                <Text>All Sub Task is Done. You can Finish the Task Now</Text>
              </View>
            ) : (
              <View>
                <View style={{ alignItems: "center", marginTop: "5%" }}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 15,
                      fontFamily: "Myriad"
                    }}
                  >
                    Sub Tasks
                  </Text>
                </View>

                <View>
                  {this.state.subTask.data.map(data => {
                    console.log("In render method in SLAPAdmin List : ", data);
                    console.log(
                      "In render method in SLAPAdmin List : ",
                      data.id
                    );

                    return (
                      <View key={data.id} style={styles.cardContainer}>
                        <View style={styles.card}>
                          <View style={styles.headerBlock}>
                            <View
                              style={{
                                width: "65%",
                                height: 75,
                                backgroundColor: "#F5F5F5",
                                padding: 10
                              }}
                            >
                              <Text style={styles.name}>{data.subtask}</Text>
                              {/* <Text>Today, 12 AM</Text> */}
                            </View>
                            {this.state.userDetails.name ===
                            "administrator" ? null : (
                              <View
                                style={{
                                  flexDirection: "row-reverse",
                                  width: "35%",
                                  height: 75,
                                  backgroundColor: "#F5F5F5",
                                  padding: 10
                                }}
                              >
                                {/* <Text>{email.notification}</Text> */}
                                {/* <Text>"notify"</Text> */}
                                <View
                                  style={{
                                    backgroundColor: "white",
                                    height: 40,
                                    width: 45,
                                    borderBottomRightRadius: 15,
                                    borderTopRightRadius: 15,
                                    alignItems: "center",
                                    marginTop: "10%"
                                  }}
                                >
                                  <TouchableOpacity
                                    onPress={() => this.removeTaskHandler(data)}
                                    style={{
                                      marginTop: "25%",
                                      alignItems: "center"
                                    }}
                                  >
                                    <Text
                                      style={{
                                        color: "#6D0F49",
                                        textAlign: "center",
                                        fontSize: 9
                                      }}
                                    >
                                      {" "}
                                      Remove
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                                <View
                                  style={{
                                    backgroundColor: "#6D0F49",
                                    height: 40,
                                    width: 45,
                                    borderTopLeftRadius: 15,
                                    borderBottomLeftRadius: 15,
                                    alignItems: "center",
                                    marginTop: "10%"
                                  }}
                                >
                                  {console.log(
                                    "in render component data : ",
                                    data
                                  )}
                                  <TouchableOpacity
                                    onPress={() => this.editTaskHandler(data)}
                                    style={{
                                      marginTop: "25%",
                                      alignItems: "center"
                                    }}
                                  >
                                    <Text
                                      style={{
                                        color: "#fff",
                                        textAlign: "center",
                                        fontSize: 9
                                      }}
                                    >
                                      {" "}
                                      Edit
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            )}
                          </View>

                          <View style={styles.textContainer} />
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}
          </ScrollView>
          {this.state.userDetails.name === "administrator" ? null : (
            <View
              style={{
                position: "absolute",
                bottom: 10,
                left: 10
              }}
            >
              <TouchableOpacity
                onPress={this.addTaskHandler}
                style={styles.btnLogin}
              >
                {/* <Button style={styles.btnLogin}> */}
                <Text style={{ fontSize: 12, color: "white" }}>Add Task</Text>
                {/* </Button> */}
              </TouchableOpacity>
            </View>
          )}

          <View
            style={{
              position: "absolute",
              bottom: 0,
              right: 0
            }}
          >
            <NextArrorButton handleNextButton={this.handleNextButton} />
          </View>
        </View>
      );
    }
  }
}

export default TaskSLAPAdminList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },

  removeButton: {
    backgroundColor: "#9F035C",
    borderRadius: 10,
    padding: 5
  },
  card: {
    padding: 3
  },
  textContainer: {
    padding: 10,
    backgroundColor: "#EEEEEE",
    width: "90%"
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
    fontFamily: "Myriad",
    color: "white"
  },

  cardContainer: {
    margin: 10
  },
  card: {
    borderLeftColor: "#6D0F49",
    borderLeftWidth: 10,
    borderRadius: 24
  },
  headerBlock: {
    // flex:1,
    flexDirection: "row",
    backgroundColor: "#e1e6ef"
  },
  header: {
    fontSize: 23
  },

  textContainer: {
    padding: 10,
    backgroundColor: "#EEEEEE"
  },

  text: { color: "#707070", fontSize: 12 },

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
  },
  btnLogin1: {
    width: 50,
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
  btnLogin: {
    width: 65,
    height: 65,
    backgroundColor: "#6D0F49",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    borderColor: "#2222",
    opacity: 0.7,
    borderWidth: 2,
    borderRadius: 40,
    marginTop: "2%"
  }
});

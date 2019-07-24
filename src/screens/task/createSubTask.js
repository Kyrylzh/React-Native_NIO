import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
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
import SearchInput, { createFilter } from "react-native-search-filter";
import Icon_Material from "react-native-vector-icons/MaterialCommunityIcons";
const KEYS_TO_FILTERS = ["name", "id"];
import DatePicker from "react-native-datepicker";
import NextArrorButton from "./../../components/button/NextArrorButton";
import Icon_FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Icon_Ionicons from "react-native-vector-icons/Ionicons";
import CustomHeaderRoot from "./../../components/Header/HeaderRoot";

data = [
  {
    description:
      "lorem Dulanga HeshanDulanga HeshanDulanga HeshanDulanga HeshanDulanga HeshanDulanga HeshanDulanga HeshanDulanga HeshanDulanga HeshanDulanga HeshanDulanga HeshanDulanga Heshan"
  }
];
secondLevelAdmin = [
  {
    id: 1,
    name: "Kasun Bandara",
    role: "admin"
  },

  {
    id: 2,
    name: "Dulanga Heshan"
  },
  {
    id: 3,
    name: "Nayana Supun"
  }
];
class CreateSubTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      text: "",
      description: "",
      // startDate: "2016-05-15",
      startDate: new Date().toISOString().slice(0, 10),
      finishedDate: new Date().toISOString().slice(0, 10),
      checked: true,
      valueArray: [],
      disabled: false,
      allUsers: null,
      isLoading: true,
      subTask: "",
      finishedDateChange: false,
      startDateChange: false
    };

    this.index = 0;

    this.animatedValue = new Animated.Value(0);

    // this.getDate();
    // this.getAllUsers();
    this.getUserDetails();
    // this.getAllUsers();
  }

  componentWillMount() {
    console.log("componentWillMount");
  }

  componentDidMount() {
    console.log("ComponentDidMount");
  }

  getDate() {
    let today = new Date().toISOString().slice(0, 10);
    console.log("Today : " + today);

    this.setState({
      startDate: today
      // finishedDate: today
    });
  }

  async getUserDetails() {
    console.log(" state Start Date " + this.state.startDate);
    console.log(" Finished Start Date " + this.state.finishedDate);
    // alert("getUserDetails");
    try {
      let userDeatails = await AsyncStorage.getItem("userDetails");
      let taskDeatails = await AsyncStorage.getItem("taskDetails");

      console.log("In Create Task Admin  : " + userDeatails + " ********** ");
      console.log("In Create Task Admin  : " + taskDeatails + " ********** ");

      // let userDeatails = JSON.stringify(userDeatails);
      let userDeatailsJson = JSON.parse(userDeatails);
      let taskDetailsJson = JSON.parse(taskDeatails);

      console.log("In Create Task Admin  : ", userDeatailsJson, " ********** ");
      console.log("In Create Task Admin  : ", taskDetailsJson, " ********** ");

      console.log(
        "In Create Task Admin  :  Role ",
        userDeatailsJson.name,
        " ********** "
      );
      console.log(
        "In Create Task Admin  :  Task Info ",
        taskDetailsJson,
        " ********** ",
        taskDetailsJson.id
      );

      this.setState({
        userDetails: userDeatailsJson,
        taskDetails: taskDetailsJson
      });
      console.log(
        "End of the Create Task Admin  ********** ",
        this.state.userDetails.name,
        "End of the Create Task Admin ID ********** ",
        this.state.userDetails.id,
        "Task Details in state data ",
        this.state.taskDetails,
        " id ",
        this.state.taskDetails.id
      );
    } catch (error) {
      alert(error);
    }

    this.getAllUsers();
  }

  getAllUsers = async () => {
    console.log("Fetching.... getAllUsers in Create Task From Admin");
    const id = this.state.userDetails.id;
    console.log("Fetching.... getAllUsers in Create Task From Admin id ", id);

    await fetch(`http://cupdes.com/api/v1/get-allusers/${id}}`, {
      method: "GET",
      headers: {
        "X-AUTH-TOKEN": "Px7zgU79PYR9ULEIrEetsb",
        "Content-Type": "XMLHttpRequest"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        this.datahandler(responseJson.data);
        // console.log(" &&&&&&&&& ", responseJson);
      })
      .done();
  };

  datahandler(data) {
    console.log("in dataHandler getAllUsers  in Create Task From Admin ", data);

    this.setState({
      allUsers: data,
      isLoading: false
    });

    // console.log(this.state.discussions, " ***********");

    console.log(" ***********", this.state.allUsers, " ***********");
  }

  // addUserHandler = () => {
  //   alert("addUserHandler");
  // };

  addUserHandler(data) {
    // alert("addUserHandler " + data.name);
    console.log("addUserHandler in create Task From user", name);

    this.animatedValue.setValue(0);

    let newlyAddedValue = { user: { index: this.index, name: data.name } };
    // let newlyAddedValue = { name: name };

    this.setState(
      {
        disabled: true,
        valueArray: [...this.state.valueArray, newlyAddedValue]
      },
      () => {
        Animated.timing(this.animatedValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }).start(() => {
          this.index = this.index + 1;
          this.setState({ disabled: false });
        });
      }
    );

    console.log("New Value Array ", this.state.valueArray);
    // this.renderArray();
  }

  subTaskHandler() {
    alert("Sub Task Handler");
  }

  handleNextButton = () => {
    // alert("Clicked Next Button");
    this.requestCreateSubTask();
    // this.props.navigation.navigate("CreateSubTaskUses");
  };

  async requestCreateSubTask() {
    const task_id = this.state.taskDetails.id;
    const subtask = this.state.subTask;
    const user_id = this.state.userDetails.id;
    const start_date = this.state.startDate;
    const end_date = this.state.finishedDate;
    const startDateChange = this.state.startDateChange;
    const finishedDateChange = this.state.finishedDateChange;

    console.log("Start Date Chanage " + startDateChange);
    console.log("End date change " + finishedDateChange);

    console.log(" Dicssion ");
    console.log(" task_id ", task_id);
    console.log(" subtask ", subtask);
    console.log(" user_id ", user_id);
    console.log(" start_date ", start_date);
    console.log(" end_date ", end_date);

    console.log("requestCreateSubTask");

    if (subtask === "") {
      alert("Please add Sub Task Topic");
    } else if (!finishedDateChange) {
      alert("Please Update Finished Date for Sub Task");
    } else {
      var data = {
        task_id: task_id,
        subtask: subtask,
        user_id: user_id,
        start_date: start_date,
        end_date: end_date
      };

      console.log(" create sub task details ", JSON.stringify(data));

      try {
        let response = await fetch("http://cupdes.com/api/v1/create-subtask", {
          method: "POST",
          headers: {
            "X-AUTH-TOKEN": "Px7zgU79PYR9ULEIrEetsb",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(responseJson => {
            alert(responseJson.message);
            this.createSubTaskDataHandler(responseJson);
          });
      } catch (errors) {
        alert(errors);
      }

      this.props.navigation.navigate("CreateSubTaskUses");
    }
  }

  createSubTaskDataHandler = data => {
    console.log("In data Handler createSubTaskDataHandler : ", data);
    console.log("In data Handler createSubTaskDataHandler ID : ", data.data.id);
    this.setSubTaskId(data.data.id);
  };

  setSubTaskId = async id => {
    console.log("setSubTaskId async ", id);
    try {
      await AsyncStorage.setItem("subTaskId", JSON.stringify(id));
      console.log("setSubTaskId saves asyn");
    } catch (error) {
      alert("setSubTaskId store error");
    }
    console.log("End the setSubTaskId");
  };

  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.containerWait}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      const animationValue = this.animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-59, 0]
      });

      let newArray = this.state.valueArray.map((item, key) => {
        if (key == this.index) {
          return (
            <Animated.View
              key={item.user.name}
              style={[
                styles.viewHolder,
                {
                  opacity: this.animatedValue,
                  transform: [{ translateY: animationValue }]
                }
              ]}
            >
              <Text style={styles.text}>Row {item.user.index}</Text>
            </Animated.View>
          );
        } else {
          return (
            // <View key={key} style={styles.viewHolder}>
            //   <Text style={styles.text}>Row {item.user.index}</Text>
            //   <Text style={styles.text}>Row {item.user.name}</Text>
            // </View>

            <View key={item.user.name} style={styles.cardContainer}>
              <TouchableOpacity
              // onPress={() => this.addUserHandler(email.user.name)}
              >
                <View style={styles.card}>
                  <View style={styles.headerBlock}>
                    <View
                      style={{
                        width: "20%",
                        height: 75,
                        backgroundColor: "white",
                        padding: 10
                      }}
                    >
                      <Icon_Ionicons
                        name="md-contact"
                        size={45}
                        color="#6D0F49"
                      />
                    </View>
                    {/* <View style={{width: '25%', height: 75, backgroundColor: 'powderblue',  padding:10,}} >
                    <Text style={styles.header}>
                         {email.user.name}
                    </Text>
                  </View> */}
                    <View
                      style={{
                        width: "80%",
                        height: 75,
                        backgroundColor: "white",
                        padding: 10
                      }}
                    >
                      {/* <CheckBox
                        title={email.user.name}
                        iconRight
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checkedColor="red"
                        checked={() =>
                          this.setState({ checked: !this.state.checked })
                        }
                      /> */}

                      <Text>{item.user.name}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        }
      });

      // const filteredEmails = user_list.filter(this.state.allUsers
      // const filteredEmails = this.state.allUsers.filter(
      let users = this.state.allUsers;
      console.log("All user : ", users);
      console.log("All user data : ", user_list);

      const filteredSubTask = this.state.allUsers.filter(
        createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
      );
      return (
        <View style={{ backgroundColor: "#ffff", height: "100%" }}>
          <ScrollView>
            <CustomHeaderRoot
              title="Create Sub Task "
              type="sub"
              // openDrawer={() => this.props.navigation.openDrawer()}
              openDrawer={() => this.props.navigation.goBack(null)}
              iconName="md-checkmark-circle"
            />

            {/* <Text> CreateTaskAdmin </Text> */}

            <View style={{ flexDirection: "row", margin: 10 }}>
              <View
                style={{
                  width: "25%",
                  // height: 75,
                  backgroundColor: "#fff",
                  padding: 10
                }}
              >
                <Icon_FontAwesome5 name="tasks" size={35} color="#6D0F49" />
              </View>

              <View
                style={{
                  width: "75%",
                  // height: 75,
                  backgroundColor: "#fff", 
                  padding: 10
                }}
              >
                <TextInput
                  multiline={true}
                  // numberOfLines={4}
                  onChangeText={text => this.setState({ text })}
                  value={this.state.taskDetails.topic}
                  placeholder="Input Task main idea"
                  underlineColorAndroid="black"
                  editable={false}
                  maxLength={160}
                />
              </View>
            </View>

            <View>
              <View style={{ alignItems: "center", padding: 10, flex: 1 }}>
                <Text
                  style={{
                    textAlign: "justify",
                    flex: 1
                  }}
                >
                  {this.state.taskDetails.description}
                </Text>
              </View>
            </View>

            <View>
              <View style={{ flexDirection: "row" }}>
                {/* <View style={{ width: "10%" }}>
                <Text>1.</Text>
              </View> */}
                <View style={{ width: "50%" }}>
                  <Text>Sub Task Assign</Text>
                </View>
                {/* <View
                style={{
                  backgroundColor: "#6D0F49",
                  padding: 10,
                  width: "40%"
                }}  
              >
                <TouchableOpacity onPress={() => this.subTaskHandler()}>
                  <Text style={{ color: "#fff" }}>Add Task</Text>
                </TouchableOpacity>
              </View> */}
              </View>
              <View
                style={{
                  // width: "100%",
                  // height: 75,
                  backgroundColor: "#fff",
                  padding: 10
                }}
              >
                <TextInput
                  multiline={true}
                  // numberOfLines={4}
                  onChangeText={subTask => this.setState({ subTask })}
                  value={this.state.subTask}
                  placeholder="Sub Topic Idea Here"
                  underlineColorAndroid="black"
                />
              </View>
            </View>

            <View style={{ padding: 10 }}>
              <View style={{ flexDirection: "row", paddingBottom: 10 }}>
                <View style={{ width: "40%" }}>
                  <Text>Start Data : </Text>
                </View>
                <View style={{ width: "60%" }}>
                  <DatePicker
                    style={{ width: 200 }}
                    date={this.state.startDate}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate={this.state.startDate}
                    maxDate="2030-12-31"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: "absolute",
                        left: 0,
                        top: 4,
                        marginLeft: 0
                      },
                      dateInput: {
                        marginLeft: 36
                      }
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={startDate => {
                      this.setState({
                        startDate: startDate,
                        startDateChange: true
                      });
                    }}
                  />
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={{ width: "40%" }}>
                  <Text>Finished Data : </Text>
                </View>
                <View>
                  <DatePicker
                    style={{ width: 200 }}
                    date={this.state.finishedDate}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate={this.state.startDate}
                    maxDate="2030-12-31"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: "absolute",
                        left: 0,
                        top: 4,
                        marginLeft: 0
                      },
                      dateInput: {
                        marginLeft: 36
                      }
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={finishedDate => {
                      this.setState({
                        finishedDate: finishedDate,
                        finishedDateChange: true
                      });
                    }}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
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

export default CreateSubTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  inputContainer: {
    // borderLeftWidth: 4,
    // borderRightWidth: 4,
    borderWidth: 1,
    height: 100,
    backgroundColor: "#fff",
    margin: 8
  },
  title: {
    fontSize: 24
  },
  taskDetails: {
    margin: 5
  },
  addTask: {
    alignItems: "center",
    backgroundColor: "white",
    height: 50,
    padding: 15
    // #e7e3e8
  },
  participantList: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#e1e6ef"
  },
  badge: {
    backgroundColor: "#6D0F49",
    borderRadius: 20,
    alignItems: "center"
  },
  list: {
    backgroundColor: "white",
    paddingLeft: 15
  },
  muteLine: {
    color: "#616161",
    paddingBottom: 8,
    fontWeight: "600"
  },
  taskLine: {
    color: "#616161",
    paddingBottom: 8,
    fontWeight: "600"
  },
  participent: {
    color: "#6D0F49",
    paddingBottom: 8,
    fontWeight: "600"
  },
  name: {
    color: "#616161"
  }
});

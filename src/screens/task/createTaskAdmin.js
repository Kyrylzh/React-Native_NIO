import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
  AsyncStorage,
  ActivityIndicator,
  Image
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
class CreateTaskAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      text: "",
      description: "",
      startDate: new Date().toISOString().slice(0, 10),
      finishedDate: new Date().toISOString().slice(0, 10),
      checked: true,
      valueArray: [],
      disabled: false,
      allUsers: null,
      isLoading: true,
      second_level_admin_id: "",
      finishedDateChange: false,
      textDescription: ""
    };

    this.index = 0;

    this.animatedValue = new Animated.Value(0);
    this.getAllUsers();
    this.getUserDetails();
  }

  getAllUsers = async () => {
    console.log("Fetching.... getAllUsers in Create Task From Admin");
    await fetch("http://cupdes.com/api/v1/get-secondadmins", {
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
    console.log(
      "in dataHandler getAllUsers  in Create Task From Admin ",
      data.data
    );

    this.setState({
      allUsers: data,
      isLoading: false
    });

    // console.log(this.state.discussions, " ***********");

    console.log(
      " *********** in state allUser",
      this.state.allUsers,
      " ***********"
    );
  }

  async getUserDetails() {
    // alert("getUserDetails");
    try {
      let userDeatails = await AsyncStorage.getItem("userDetails");
      console.log("In Create Task Admin  : " + userDeatails + " ********** ");
      // let userDeatails = JSON.stringify(userDeatails);
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
    } catch (error) {
      alert(error);
    }
  }
  addUserHandler(data) {
    alert("addUserHandler " + data.name);
    console.log("addUserHandler in create Task From user", data);

    this.animatedValue.setValue(0);

    let newlyAddedValue = { user: { index: this.index, name: data.name } };
    // let newlyAddedValue = { name: name };

    this.setState(
      {
        second_level_admin_id: data.id,
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
          this.setState({ disabled: true });
        });
      }
    );

    console.log("New Value Array ", this.state.valueArray);
    // this.renderArray();
  }

  handleNextButton = () => {
    alert("Clicked Next Button");
    this.createTask();
    this.props.navigation.goBack(null);
  };

  async createTask() {
    if (this.state.text == "") {
      alert("Please add Task Topic");
    } else if (this.state.textDescription == "") {
      alert("Please Add Description ");
    } else if (!this.state.finishedDateChange) {
      alert("Add Finished Date for the Task");
    } else if (this.state.second_level_admin_id == "") {
      alert("Please add at least One person for the Task");
    } else {
      var data = {
        topic: this.state.text,
        description: this.state.textDescription,
        user_id: this.state.second_level_admin_id,
        start_date: this.state.startDate,
        end_date: this.state.finishedDate
      };
      console.log("IN Create Task : ", JSON.stringify(data));

      try {
        let response = await fetch("http://cupdes.com/api/v1/create-task", {
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
            this.createTaskDataHandler(responseJson);
          });
      } catch (errors) {
        alert(errors);
      }
    }
  }

  //  this.props.navigation.navigate('DrewerNav');

  createTaskDataHandler = data => {
    console.log("In data Handler create Task : ", data);
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
                        height: 35,
                        backgroundColor: "white",
                        paddingTop: 10,
                        paddingRight: 3
                      }}
                    >
                      <Icon_Ionicons
                        name="md-contact"
                        size={25}
                        color="#6D0F49"
                      />
                      {/* <Image
                        source={{ uri: item.image_path }}
                        style={{ height: 45, width: 45, borderRadius: 30 }}
                      /> */}
                    </View>
                    {/* <View style={{width: '25%', height: 75, backgroundColor: 'powderblue',  padding:10,}} >
                    <Text style={styles.header}>
                         {email.user.name}
                    </Text>
                  </View> */}
                    <View
                      style={{
                        height: 35,
                        backgroundColor: "white",
                        paddingTop: 10,
                        paddingRight: 6
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
      let users = this.state.allUsers;
      console.log("All user : ", users);
      console.log("All user data : ", user_list);

      const filteredSubTask = this.state.allUsers.filter(
        createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
      );
      return (
        <View style={{ backgroundColor: "#fff" }}>
          <ScrollView style={{ backgroundColor: "#fff", height: "100%" }}>
            {/* <CustomHeaderRoot
              title="Create Task | Admin "
              openDrawer={() => this.props.navigation.openDrawer()}
              iconName="md-checkmark-circle"
            /> */}
            <CustomHeaderRoot
              title="Sub Task info"
              type="sub"
              openDrawer={() => this.props.navigation.goBack(null)}
              iconName="md-checkmark-circle"
            />

            {/* <Text> CreateTaskAdmin </Text> */}

            <View style={{ flexDirection: "row", margin: 10 }}>
              <View
                style={{
                  width: "25%",
                  // height: 75,
                  backgroundColor: "#F5F5F5",
                  padding: 10
                }}
              >
                <Icon_FontAwesome5 name="tasks" size={35} color="#6D0F49" />
              </View>

              <View
                style={{
                  width: "75%",
                  // height: 75,
                  backgroundColor: "#F5F5F5",
                  padding: 10
                }}
              >
                <TextInput
                  multiline={true}
                  // numberOfLines={4}
                  onChangeText={text => this.setState({ text })}
                  value={this.state.text}
                  placeholder="Input Task main idea"
                  underlineColorAndroid="black"
                  maxLength={160}
                />
              </View>
            </View>

            <View>
              <View
                style={{
                  alignItems: "center",
                  paddingTop: 8,
                  paddingBottom: 8
                }}
              >
                <Text>Type taske discription here </Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  multiline={true}
                  numberOfLines={6}
                  onChangeText={textDescription =>
                    this.setState({ textDescription })
                  }
                  value={this.state.textDescription}
                  placeholder=""
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
                      this.setState({ startDate });
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

            <View>
              <View style={{ padding: 10 }}>
                <Text style={{ marginTop: "2%" }}>Add Your Participant...</Text>

                <ScrollView horizontal={true} style={{ marginTop: "3%" }}>
                  <View style={{ flex: 1, flexDirection: "row", padding: 4 }}>
                    {newArray}
                  </View>
                </ScrollView>
              </View>

              {/* <View style={{ height: 80, backgroundColor: "white", padding: 10 }}>
              <Text>Supun</Text>
            </View> */}
            </View>

            <ScrollView>
              {filteredSubTask.map(data => {
                return (
                  <TouchableOpacity
                    key={data.id}
                    style={styles.cardContainer}
                    onPress={() => this.addUserHandler(data)}
                    disabled={this.state.disabled}
                  >
                    <View style={styles.card}>
                      <View style={styles.participantList}>
                        <View
                          style={{
                            width: "20%",
                            height: 35,
                            backgroundColor: "white",
                            paddingLeft: 10
                          }}
                        >
                          {/* <Text>Image md-contact</Text> */}
                          <Icon name="md-contact" size={25} color="#6D0F49" />

                          {/* <Image
                            source={{ uri: data.image_path }}
                            style={{ height: 45, width: 45, borderRadius: 30 }}
                          /> */}
                        </View>
                        <View
                          style={{
                            width: "80%",
                            height: 35,
                            backgroundColor: "white",

                            paddingTop: 5
                          }}
                        >
                          <Text style={styles.name}>{data.name}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
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

export default CreateTaskAdmin;

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
  },
  headerBlock: {
    // flex:1,
    flexDirection: "row",
    backgroundColor: "#e1e6ef"
  },
  searchInput: {
    borderColor: "#CCC",
    height: 40,
    borderRadius: 24.5,
    width: 300,
    backgroundColor: "#6D0F49",
    color: "white"
  }
});

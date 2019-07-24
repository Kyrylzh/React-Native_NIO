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
  ActivityIndicator
} from "react-native";
import CustomHeader from "../../components/Header/Header";
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

class CreateTaskAdminUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      text: "",
      description: "",
      startDate: "2016-05-15",
      finishedDate: "2016-05-15",
      checked: true,
      valueArray: [],
      disabled: false,
      allUsers: null,
      isLoading: true
    };

    this.index = 0;

    this.animatedValue = new Animated.Value(0);

    this.getAllUsers();
    this.getUserDetails();
  }

  async getUserDetails() {
    alert("getUserDetails");
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

      //alert(a)
      // if (thistoken != null) {
      //   this.handletoken(thistoken);
      // } else {
      //   this.props.navigation.Login();
      // }
    } catch (error) {
      alert(error);
      // this.props.navigation.Login();
    }
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

  addUserHandler(data) {
    alert("addUserHandler " + data.name);
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
          this.setState({ disabled: true });
        });
      }
    );

    console.log("New Value Array ", this.state.valueArray);
    // this.renderArray();
  }

  handleNextButton = () => {
    alert("Clicked Next Button");
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
        <ScrollView
          androidStatusBarColor={"#6D0F49"}
          style={{ backgroundColor: "#fff" }}
        >
          <CustomHeader
            title="Add User | Admin "
            openDrawer={() => this.props.navigation.openDrawer()}
            iconName="md-checkmark-circle"
          />
          {/* <Text> CreateTaskAdmin </Text> */}

          <View>
            <View style={{ padding: 10 }}>
              <Text> Add one of second level Admin</Text>
            </View>

            {/* <View style={{ height: 80, backgroundColor: "white", padding: 10 }}>
              <Text>Supun</Text>
            </View> */}

            <ScrollView>
              <View style={{ flex: 1, padding: 4 }}>{newArray}</View>
            </ScrollView>
          </View>

          <View>
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
                          width: "15%",
                          height: 75,
                          backgroundColor: "white",
                          padding: 10
                        }}
                      >
                        {/* <Text>Image md-contact</Text> */}
                        <Icon name="md-contact" size={45} color="#6D0F49" />
                      </View>
                      <View
                        style={{
                          width: "85%",
                          height: 75,
                          backgroundColor: "white",
                          padding: 10
                        }}
                      >
                        <Text style={styles.name}>{data.name}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View>
            <NextArrorButton handleNextButton={this.handleNextButton} />
          </View>
        </ScrollView>
      );
    }
  }
}

export default CreateTaskAdminUser;

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

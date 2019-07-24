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
  AsyncStorage,
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
import { StackActions } from "react-navigation";

const pushAction = StackActions.push({
  routeName: "TabNavSLA"
  // routeName: "DrewerNavSLA"
  // routeName: "DrawerScreen2"

  // params: {
  //   myUserId: 9,
  // },
});

// const popAction = StackActions.pop({
//   n: 3
// });

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
class ReCreateSubTaskUses extends Component {
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
      subTask_userId: [],
      disabled: false,
      allUsers: null,
      isLoading: true
    };

    this.index = 0;

    this.animatedValue = new Animated.Value(0);

    // this.getAllUsers();
    this.getUserDetails();
  }

  async getUserDetails() {
    // alert("getUserDetails");
    try {
      let userDeatails = await AsyncStorage.getItem("userDetails");
      let subTaskId = await AsyncStorage.getItem("subTaskId");
      console.log("In Create Task Admin  : " + userDeatails + " ********** ");
      console.log(
        "In Create Task Sub Task ID  : " + subTaskId + " ********** "
      );

      // let userDeatails = JSON.stringify(userDeatails);
      let userDeatailsJson = JSON.parse(userDeatails);
      let subTaskIdJson = JSON.parse(subTaskId);

      console.log("In Create Task Admin  : ", userDeatailsJson, " ********** ");
      console.log(
        "In Create Task subTaskIdJson  : ",
        subTaskIdJson,
        " ********** "
      );

      console.log(
        "In Create Task Admin  :  Role ",
        userDeatailsJson.name,
        " ********** "
      );

      this.setState({
        userDetails: userDeatailsJson,
        subTaskId: subTaskIdJson
      });
      console.log(
        "End of the Create Task Admin  ********** ",
        this.state.userDetails.name
      );

      console.log(
        "End of the Create Task subTaskId  ********** ",
        this.state.subTaskId
      );
    } catch (error) {
      alert(error);
    }

    this.getAllUsers();
  }

  getAllUsers = async () => {
    console.log("Fetching.... getAllUsers in Create Task From Admin");
    const id = this.state.userDetails.id;
    await fetch(`http://cupdes.com/api/v1/get-allusers/${id}`, {
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
  // checkDuplicate(data) {
  //   console.log("checkDuplicate ", data);
  //   console.log(" newArray with check Duplicates ", this.state.valueArray);
  //   console.log(
  //     " newArray with check Duplicates length ",
  //     this.state.valueArray.length
  //   );
  //   console.log(
  //     " newArray with check Duplicates data ",
  //     this.state.valueArray[0]
  //   );

  //   if (this.state.valueArray.length != 0) {
  //     console.log(
  //       " newArray with check Duplicates data  name ",
  //       this.state.valueArray[0].user.name
  //     );
  //   }
  //   var i;
  //   for (i = 0; i < this.state.valueArray.length; i++) {
  //     console.log("data printing ", this.state.valueArray[i].user.name);
  //     console.log("data printing data ", data.name);

  //     if (this.state.valueArray[i].user.name === data.name) {
  //       // alert("Duplicated");
  //       return true;
  //     } else {
  //       // this.addUserHandler(data)
  //       return false;
  //     }
  //   }

  //   // console.log(" newArray with check Duplicates newArray ", newArray);

  //   // this.state.valueArray.forEach(" here for Each ");
  // }

  checkDuplicate(data) {
    var res = false;
    console.log("checkDuplicate ", data);
    console.log(" newArray with check Duplicates ", this.state.valueArray);
    console.log(
      " newArray with check Duplicates length ",
      this.state.valueArray.length
    );
    const len = this.state.valueArray.length;
    console.log(" for loop lenght ", len);
    for (let i = 0; i < len; i++) {
      console.log("data printing iteration ", i);
      console.log(
        "data printing iteration ",
        this.state.valueArray[i].user.name
      );
      console.log(
        "this.state.valueArray[i].user.name ",
        this.state.valueArray[i].user.name
      );
      console.log("data.name ", data.name);
      console.log(
        "this.state.valueArray[i].user.name === data.name ",
        this.state.valueArray[i].user.name === data.name
      );

      if (this.state.valueArray[i].user.name === data.name) {
        console.log("Catch Duplicate");
        res = true;
      }
    }
    return res;
  }

  addUserHandler(data) {
    // alert("addUserHandler " + data.name);
    console.log("addUserHandler in create Task From user", name);
    if (this.checkDuplicate(data)) {
      alert("Already add the " + data.name + " Please pick another one");
    } else {
      this.animatedValue.setValue(0);

      let newlyAddedValue = { user: { index: this.index, name: data.name } };
      // let newlyAddedValue = { name: name };

      let newUser_id = {
        id: data.id
      };

      console.log(" newlyAddedValue ", newlyAddedValue);
      this.state.valueArray.push(newlyAddedValue);
      this.state.subTask_userId.push(newUser_id);

      this.setState(
        {
          disabled: true
          // valueArray: [...this.state.valueArray, newlyAddedValue]
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

      console.log(" ^^^^^^^^^^^^^ ", this.state.valueArray);

      console.log("New Value Array ", this.state.valueArray);
      console.log(
        "New Value Array second Level Admin subTask_userId ",
        this.state.subTask_userId
      );
      console.log("after calling addUser function");
    }
  }

  subTaskHandler() {
    alert("Sub Task Handler");
  }

  handleNextButton = () => {
    // alert("Clicked Next Button");
    this.requestAddUserSubTask();
  };

  async requestAddUserSubTask() {
    console.log("requestAddUserSubTask");

    var data = {
      subtask_id: this.state.subTaskId,
      user_ids: this.state.subTask_userId
    };

    console.log(" create sub task add user details ", JSON.stringify(data));

    try {
      let response = await fetch(
        "http://cupdes.com/api/v1/create-subtaskusers",
        {
          method: "POST",
          headers: {
            "X-AUTH-TOKEN": "Px7zgU79PYR9ULEIrEetsb",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      )
        .then(response => response.json())
        .then(responseJson => {
          alert(responseJson.message);
          this.subTaskUserHandler(responseJson);
        });
    } catch (errors) {
      console.log("error occur in add sub task user ", errors);
      alert(errors);
    }

    // this.props.navigation.navigate("TaskSLAPAdminList");
    // this.props.navigation.navigate("Screen2", {
    //   onBack: () => this.refresh() //function to refresh screen,
    // });
    // this.props.navigation.dispatch(pushAction);
    // this.props.navigation.dispatch(popAction);
    this.props.navigation.dispatch(StackActions.popToTop());
  }

  subTaskUserHandler(data) {
    console.log("subTaskUserHandler response ", data);
  }

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
                        height: 75,
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
                    </View>
                    {/* <View style={{width: '25%', height: 75, backgroundColor: 'powderblue',  padding:10,}} >
                    <Text style={styles.header}>
                         {email.user.name}
                    </Text>
                  </View> */}
                    <View
                      style={{
                        height: 75,
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

      // const filteredEmails = user_list.filter(this.state.allUsers
      // const filteredEmails = this.state.allUsers.filter(
      let users = this.state.allUsers;
      console.log("All user : ", users);
      console.log("All user data : ", user_list);

      const filteredSubTask = this.state.allUsers.filter(
        createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
      );
      return (
        <View style={{ backgroundColor: "#fff", height: "100%" }}>
          <ScrollView>
            <CustomHeaderRoot
              title="Add Use | Sub Task "
              type="sub"
              openDrawer={() => this.props.navigation.goBack(null)}
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
                    placeholder="Serarch Participant..."
                  />
                </Body>
                {/* <Right>
                  <Button transparent>
                    <Icon_Material name="pencil" color="white" size={25} />
                  </Button>
                </Right> */}
              </Header>
            </View>
            {/* <Text> CreateTaskAdmin </Text> */}

            <View>
              <Text style={{ marginTop: "2%" }}>Add Your Participant...</Text>

              <ScrollView horizontal={true} style={{ marginTop: "3%" }}>
                <View style={{ flex: 1, flexDirection: "row", padding: 4 }}>
                  {newArray}
                </View>
              </ScrollView>
            </View>

            <View>
              {filteredSubTask.map(data => {
                return (
                  <TouchableOpacity
                    key={data.id}
                    style={styles.cardContainer}
                    onPress={() => this.addUserHandler(data)}
                  >
                    <View style={styles.card}>
                      <View style={styles.participantList}>
                        <View
                          style={{
                            width: "20%",
                            height: 75,
                            backgroundColor: "white",
                            paddingLeft: 10
                          }}
                        >
                          {/* <Text>Image md-contact</Text> */}
                          <Icon name="md-contact" size={45} color="#6D0F49" />
                          {/* <Image
                            source={{ uri: data.image_path }}
                            style={{ height: 45, width: 45, borderRadius: 30 }}
                          /> */}
                        </View>
                        <View
                          style={{
                            width: "80%",
                            height: 75,
                            backgroundColor: "white",

                            paddingTop: 6
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

export default ReCreateSubTaskUses;

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

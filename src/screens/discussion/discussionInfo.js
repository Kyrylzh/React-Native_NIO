import React, { Component } from "react";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import { Container, Header, Content, Button, Text } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import Icon_Entypo from "react-native-vector-icons/Entypo";
import CustomHeader from "../../components/Header/Header";
import CustomHeaderRoot from "./../../components/Header/HeaderRoot";

const data = [
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

class DiscussionInfo extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      discussionsUser: null
    };
    this.getUserDetails();
  }

  async getUserDetails() {
    // alert("getUserDetails");
    try {
      let userDeatails = await AsyncStorage.getItem("userDetails");
      let discussionDetails = await AsyncStorage.getItem("discussionDetails");
      console.log("In What is Discussion : " + userDeatails + " ********** ");
      console.log(
        "In What is Discussion : " + discussionDetails + " ********** "
      );

      // let userDeatails = JSON.stringify(userDeatails);
      let userDeatailsJson = JSON.parse(userDeatails);
      let discussionDetailsJson = JSON.parse(discussionDetails);

      console.log("In What is Discussion : ", userDeatailsJson, " ********** ");
      console.log(
        "In What is Discussion : discussionDetails ",
        discussionDetails,
        " ********** "
      );

      console.log(
        "In What is Discussion : Role ",
        userDeatailsJson.name,
        " ********** "
      );
      console.log(
        "In What is Discussion : id ",
        userDeatailsJson.id,
        " ********** "
      );

      console.log(
        "In What is Discussion : Question Details ",
        discussionDetailsJson.question_id,
        " ********** "
      );

      this.setState({
        userDetails: userDeatailsJson,
        discussionDetails: discussionDetailsJson
      });
      console.log(
        "End of In What is Discussion : ",
        this.state.userDetails,
        "********** ",
        this.state.userDetails.name,
        " user ID ",
        this.state.userDetails.id
      );

      console.log(
        "End of In What is Discussion : discussionDetails ",
        this.state.discussionDetails,
        "********** Question ",
        this.state.discussionDetails.question_id
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

      // this.fetchDiscussionUser();
    }

    // this.fetchDiscussionUser();
    this.fetchUser();
  }

  fetchDiscussionUser = async () => {
    console.log("Fetching.... Discussion");
    let data = this.state.discussionDetails;
    console.log("Fetching.... Discussion discussion Info ", data);

    console.log("Fetching.... Discussion discussion Info userID ");

    // console.log("Fetching.... Discussion discussion Info ", data);
    console.log(
      "Fetching.... Discussion discussion Info userID ",
      data.question_id
    );

    await fetch(
      `http://cupdes.com/api/v1/get-questionusers/${data.question_id}`,
      {
        method: "GET",
        headers: {
          "X-AUTH-TOKEN": "Px7zgU79PYR9ULEIrEetsb",
          "Content-Type": "XMLHttpRequest"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        this.datahandler(responseJson);
        console.log("Response of getUser Question ", responseJson);
      })
      .done();
  };

  datahandler(data) {
    console.log(
      "in dataHandler what is discussions fetchDiscussionUser ",
      data
    );

    this.setState({
      discussionsUser: data,
      isLoading: false
    });

    console.log(this.state.discussions, " fetchDiscussion ***********");
    console.log(
      this.state.discussionsUser.data,
      " Data fetchDiscussion ***********"
    );
  }

  // setQuestionAuthor = async data => {
  //   console.log("setUserDetails", data.data);
  //   // try {
  //   //   await AsyncStorage.setItem("questionAuthor", JSON.stringify(data.data));
  //   //   //   await AsyncStorage.setItem('@MySuperStore:key1',mytoken);
  //   //   console.log("userDetals saves asyn");

  //   //   //   await AsyncStorage.setItem('@MySuperStore:key2',user_id);

  //   //   //   console.log('user_id saves asyn');
  //   //   //   await AsyncStorage.setItem("userID",user_id);
  //   //   //   console.log('user_id saves asyn');

  //   //   //   alert('Token saves asyn');
  //   //   // this.getToken();
  //   // } catch (error) {
  //   //   alert("Role store error");
  //   // }

  //   // console.log("End the setUserDetails");
  // };
  discussionUpdateHandler = () => {
    // alert("discussionUpdateHandler")
    this.props.navigation.navigate("UpdateDiscussion");
  };
  addParticipant = () => {
    alert("Added");
    this.props.navigation.navigate("createDiscussion");
  };

  fetchUser = async () => {
    console.log("Fetching.... updateUser place");
    const user_id = this.state.userDetails.id;
    await fetch(`http://cupdes.com/api/v1/get-user/${user_id}`, {
      method: "GET",
      headers: {
        "X-AUTH-TOKEN": "Px7zgU79PYR9ULEIrEetsb",
        "Content-Type": "XMLHttpRequest"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        // this.datahandler(console.log(responseJson.data, " jjjjjjjjjjjjjj "));
        this.fetchUserDetailsDatahandler(responseJson);

        // console.log("Fetch Discussion ", responseJson);
      })
      // .then((res) => {
      //     console.log("############ "+res+" ########### ")
      //     if (res.state === true) {
      //       this.removeToken()

      //     } else {
      //         alert(res.msg)
      //     }
      // })
      .done();
  };

  fetchUserDetailsDatahandler(data) {
    console.log("in dataHandler what is fetchUserDetailsDatahandler ", data);

    console.log(
      "in dataHandler what is fetchUserDetailsDatahandler ",
      data.data.image_path
    );
    this.setState({
      user_image: data.data.image_path
      // isLoading: false

      // name:this.state.user.name
    });

    console.log("his.state.user, ***********");
    console.log(this.state.user_image, " Image path ");

    this.fetchDiscussionUser();
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.containerWait}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <ScrollView>
          <CustomHeaderRoot
            title="Discussion Info"
            alignItems="center"
            type="sub"
            sub="participant"
            addParticipant={this.addParticipant}
            openDrawer={() => this.props.navigation.goBack(null)}
            goCreateDiscussion={
              () => this.props.navigation.navigate("ModifyDiscussion")
              // alert("Add")
            }
          />
          {/* <ListHeader /> */}
          <ScrollView>
            {this.state.image_path == "" ? (
              <Image
                style={{ width: "100%", height: 300 }}
                source={require("./contact.jpg")}
              />
            ) : (
              <Image
                source={{ uri: this.state.user_image }}
                style={{ width: "100%", height: 300 }}

                // style={{ height: 45, width: 45, borderRadius: 30 }}
              />
            )}
            {/* <Image
              style={{ width: "100%", height: 300 }}
              source={require("./contact.jpg")}
            /> */}
            {/* <Image
              source={{ uri: this.state.user_image }}
              style={{ width: "100%", height: 300 }}

              // style={{ height: 45, width: 45, borderRadius: 30 }}
            /> */}
            <Image />
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: "90%",
                  // position: "absolute",
                  bottom: 0,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 5
                }}
              >
                <Text style={styles.title}>
                  {this.state.discussionDetails.question}
                </Text>
                <Text styles={styles.taskDetails}>
                  Create by {this.state.discussionDetails.creator}{" "}
                  {this.state.discussionDetails.created_at}
                </Text>
              </View>
              {/* <View style={{width:'10%'}} >
                          <Icon_Entypo 
                              name="pencil"
                              size={24}
                          />
                      </View> */}
            </View>
          </ScrollView>
          {/* <View style={{backgroundColor:'white', height:12}} /> */}
          {this.state.discussionDetails.creator_id ==
          this.state.userDetails.id ? (
            <View>
              <TouchableOpacity
                onPress={() => this.discussionUpdateHandler()}
                style={styles.addTask}
              >
                {/* () => this.props.navigation.goBack(null) */}
                <Text>Add Task Discription</Text>
              </TouchableOpacity>
            </View>
          ) : null}
          {/* <Divider style={{ backgroundColor: 'blue' }} />; */}
          <View style={{ backgroundColor: "#e7e3e8", height: 12 }} />

          <View style={styles.list}>
            {/* <Text style={styles.muteLine}>Mute Notification</Text> 
            <Text style={styles.taskLine}>Task media</Text> */}
            <Text style={styles.participent}>
              {this.state.discussionsUser.data.length} Participents
            </Text>

            {this.state.discussionsUser.data.map(data => {
              return (
                <View key={data.id} style={styles.cardContainer}>
                  <View style={styles.card}>
                    <View style={styles.participantList}>
                      <View
                        style={{
                          width: "15%",
                          height: 75,
                          backgroundColor: "white",
                          // padding: 10,
                          paddingLeft: 10,
                          paddingTop: 10
                        }}
                      >
                        {/* <Text>Image md-contact</Text> */}
                        {/* <Icon name="md-contact" size={45} color="#616161" /> */}
                        <Image
                          source={{ uri: data.image_path }}
                          style={{ height: 45, width: 45, borderRadius: 30 }}
                        />
                        <Image />
                      </View>
                      <View
                        style={{
                          width: "60%",
                          height: 75,
                          backgroundColor: "white",
                          paddingLeft: 15,

                          paddingTop: 15
                        }}
                      >
                        <Text style={styles.name}>{data.name}</Text>
                      </View>
                      <View
                        style={{
                          width: "25%",
                          height: 75,
                          backgroundColor: "white",
                          padding: 10
                        }}
                      >
                        {data.role === "admin" ? (
                          <View style={styles.badge}>
                            <Text style={{ color: "white" }}>{data.role}</Text>
                          </View>
                        ) : (
                          <Text />
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      );
    }
  }
}

export default DiscussionInfo;

const styles = StyleSheet.create({
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

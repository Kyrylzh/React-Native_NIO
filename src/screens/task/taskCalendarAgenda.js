/*This is an Example of Calendar With Events*/
import React from "react";
//import react in our project
import { Dimensions, View, AsyncStorage } from "react-native";
//import basic react native components
import EventCalendar from "react-native-events-calendar";
import CustomHeaderRoot from "./../../components/Header/HeaderRoot";
import TaskCalendar from "./taskCalendar";

//import EventCalendar component
let { width } = Dimensions.get("window");
//get the size of device

export default class TaskCalendarAgenda extends React.Component {
  constructor(props) {
    super(props);
    //Dummy event data to list in calendar
    //You can also get the data array from the API call
    this.state = {
      events: [
        {
          start: "2019-01-01 00:00:00",
          // end: "2019-01-01 02:00:00",
          title: "New Year Party",
          summary: "xyz Location"
        },
        {
          start: "2019-01-01 01:00:00",
          end: "2019-01-05 02:00:00",
          title: "New Year Wishes",
          summary: "Call to every one"
        },
        {
          start: "2019-01-02 00:30:00",
          end: "2019-01-02 01:30:00",
          title: "Parag Birthday Party",
          summary: "Call him"
        },
        {
          start: "2019-01-03 01:30:00",
          end: "2019-01-03 02:20:00",
          title: "My Birthday Party",
          summary: "Lets Enjoy"
        },
        {
          start: "2019-02-04 04:10:00",
          end: "2019-02-04 04:40:00",
          title: "Engg Expo 2019",
          summary: "Expoo Vanue not confirm"
        }
      ]
    };
    this.getUserDetails();
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

    this.requestTaskCalendar();
  }

  async requestTaskCalendar() {
    console.log("Fetching.... getAllUsers in Task Calendar");
    await fetch(
      `http://cupdes.com/api/v1/get-calendartasks/${this.state.userDetails.id}`,
      // `http://cupdes.com/api/v1/get-calendartasks/7`,

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
        this.taskCalendarHandler(responseJson.data);
        console.log(" &&&&&&&&& ", responseJson);
      })
      .done();
  }

  taskCalendarHandler = data => {
    console.log("In data Handler task calendar : ", data);
    this.setState({
      taskCalendar: data
    });

    console.log("In state Calendar : ", this.state.taskCalendar);
    this.markedPresent(data);
  };

  markedPresent(data) {
    console.log("In marked Present : ", data);
  }

  eventClicked(event) {
    //On Click oC a event showing alert from here
    alert(JSON.stringify(event));
  }

  render() {
    return (
      <View>
        <CustomHeaderRoot
          title="Task Calendar"
          alignItems="center"
          type="sub"
          openDrawer={() => this.props.navigation.goBack(null)}
        />
        {/* <View style={{ flex: 1, marginTop: 20 }}>
          <EventCalendar
            eventTapped={this.eventClicked.bind(this)}
            //Function on event press
            // events={this.state.events}
            events={this.state.taskCalendar}
            //passing the Array of event
            width={width}
            //Container width
            size={60}
            //number of date will render before and after initDate
            //(default is 30 will render 30 day before initDate and 29 day after initDate)
            // initDate={"2019-07-15"}
            initDate={new Date().toISOString().slice(0, 10)}
            //show initial date (default is today)
            scrollToFirst
            //scroll to first event of the day (default true)
          />
        </View> */}
        <TaskCalendar />
      </View>
    );
  }
}

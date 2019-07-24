import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator,
  BackHandler
} from "react-native";
import { Agenda } from "react-native-calendars";

export default class TaskCalendar extends Component {
  constructor(props) {
    super(props);
    this._didFocusSubscription = props.navigation.addListener(
      "didFocus",
      payload =>
        BackHandler.addEventListener(
          "hardwareBackPress",
          this.onBackButtonPressAndroid
        )
    );
    this.state = {
      items: {},
      isLoading: true
    };
    this.getUserDetails();
  }

  _didFocusSubscription;
  _willBlurSubscription;

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      payload =>
        BackHandler.removeEventListener(
          "hardwareBackPress",
          this.onBackButtonPressAndroid
        )
    );
  }

  onBackButtonPressAndroid = () => {
    // if (this.isSelectionModeEnabled()) {
    //   this.disableSelectionMode();
    //   return true;
    // } else {
    //   return false;
    // }
    console.log(" onBackButtonPressAndroid ");
    this.props.navigation.goBack(null);
  };

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  // componentDidMount() {
  //   BackHandler.addEventListener("backPress");
  // }

  // some more code

  // componentWillUnmount() {
  //   BackHandler.removeEventListener("backPress");
  // }

  async getUserDetails() {
    // alert("getUserDetails");
    try {
      let userDeatails = await AsyncStorage.getItem("userDetails");
      console.log("In Create Task Admin  : " + userDeatails + " ********** ");

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
      console.log(
        "End of the Create Task Admin  ********** ",
        this.state.userDetails.id
      );
    } catch (error) {
      alert(error);
    }

    this.fetchCalendarDetails();
  }

  fetchCalendarDetails = async () => {
    // alert("fetchHomeScreenDetails");

    const { userDetails } = this.state;
    console.log("User details : ", userDetails);

    console.log("Fetching.... fetchCalendarDetails");
    await fetch(
      // `http://cupdes.com/api/v1/get-calendartasks/${userDetails.id}`,
      `http://cupdes.com/api/v1/get-calendartasks/3`,
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
        console.log("Calendar data ", responseJson);
        // console.log("Calendar data ", responseJson._bodyText.json());

        this.calendarHandler(responseJson);
      })
      .done();
  };

  calendarHandler(data) {
    console.log("in dataHandler calendarHandler ", data);

    this.setState({
      taskLists: data,
      isLoading: false
    });

    console.log(" this state calendarHandler ", this.state.taskLists);

    console.log(
      " this state Home Screen  calendarHandler in state",
      this.state.taskLists.data
    );

    // const result = Object.keys(this.state.taskLists.data).reduce((acc, key) => {
    //   acc[key] = {
    //     ...this.state.taskLists.data[key],
    //     _styles: {
    //       root: { overflow: "hidden" }
    //     }
    //   };
    //   return acc;
    // }, {});

    // console.log("Converted calendar data ", result);

    // let listItemsModified = Object.keys(this.state.taskLists.data).map(
    //   (i, listItem, inputArray) => {
    //     this.state.taskLists.data[i]._styles = {
    //       root: { overflow: "hidden" }
    //     };
    //     return this.state.taskLists.data[i];
    //   }
    // );

    // console.log("Converted calendar listItemsModified  ", listItemsModified);
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ backgroundColor: "#6D0F49" }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        // <View>
        <Agenda
          style={{ backgroundColor: "#6D0F49" }}
          // the list of items that have to be displayed in agenda. If you want to render item as empty date
          // the value of date key kas to be an empty array []. If there exists no value for date key it is
          // considered that the date in question is not yet loaded
          // items={{
          //   "2012-05-20": [
          //     { text: "item 3 - any js object" },
          //     { text: "Secon Task any js object" }
          //   ],
          //   "2012-05-22": [{ text: "item 1 - any js object" }],
          //   "2012-05-23": [{ text: "item 2 - any js object" }],
          //   "2012-05-26": [{ text: "item 3 - any js object" }]
          // }}
          items={this.state.taskLists.data}
          // callback that gets called when items for a certain month should be loaded (month became visible)
          loadItemsForMonth={month => {
            console.log("trigger items loading");
          }}
          // callback that fires when the calendar is opened or closed
          onCalendarToggled={calendarOpened => {
            console.log(calendarOpened);
          }}
          // callback that gets called on day press
          onDayPress={item => {
            console.log("day****", item);
          }}
          // callback that gets called when day changes while scrolling agenda list
          onDayChange={day => {
            console.log("day changed");
          }}
          // initially selected day
          selected={new Date().toISOString().slice(0, 10)}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={"2018-05-10"}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={"2030-05-30"}
          // Max amount of months allowed to scroll to the past. Default = 50
          pastScrollRange={50}
          // Max amount of months allowed to scroll to the future. Default = 50
          futureScrollRange={50}
          // specify how each item should be rendered in agenda
          renderItem={item => {
            console.log("Item in render ", item);
            // const data = item;

            return (
              <View />
              // <View>
              //   <Text>{item.text}</Text>
              // </View>
            );
          }}
          // specify how each date should be rendered. day can be undefined if the item is not first in that day.
          renderDay={(day, item) => {
            // console.log(" renderDay ****** ", day, " item ", item);
            // console.log(
            //   " renderDay dateString ****** ",
            //   day.dateString,
            //   " item ",
            //   item
            // );

            // if (day !== undefined) {
            //   console.log("GGGGGGGGGGGGGGGGGG");
            // }

            // const temp = day.dateString;

            return (
              <View style={{ alignItems: "center" }}>
                <View style={styles.cardContainer}>
                  {day !== undefined ? (
                    <View style={styles.textContainer}>
                      <Text style={{ fontWeight: "bold", fontSize: 13 }}>
                        {" "}
                        {day.dateString}
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: "Myriad",
                          paddingTop: 5
                        }}
                      >
                        {" "}
                        {item.title}
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.textContainer1}>
                      <Text style={{ fontSize: 18, fontFamily: "Myriad" }}>
                        {item.title}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            );
          }}
          // specify how empty date content with no items should be rendered
          renderEmptyDate={() => {
            return <View />;
          }}
          // specify how agenda knob should look like
          // renderKnob={() => {
          //   return <View />;
          // }}
          // // specify what should be rendered instead of ActivityIndicator
          renderEmptyData={() => {
            return (
              <View style={styles.emptyDate}>
                <Text>No Task Assign </Text>
              </View>
            );
          }}
          // specify your item comparison function for increased performance
          rowHasChanged={(r1, r2) => {
            return r1.text !== r2.text;
          }}
          // Hide knob button. Default = false
          // hideKnob={true}
          // By default, agenda dates are marked if they have at least one item, but you can override this if needed
          // markedDates={{
          //   "2012-05-16": { selected: true, marked: true },
          //   "2012-05-17": { marked: true },
          //   "2012-05-18": { disabled: true }
          // }}
          // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
          // onRefresh={() => console.log("refreshing...")}
          // Set this true while waiting for new data from a refresh
          // refreshing={false}
          // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
          // refreshControl={null}
          // agenda theme
          theme={{
            agendaDayTextColor: "yellow",
            agendaDayNumColor: "black",
            agendaTodayColor: "red",
            agendaKnobColor: "#6D0F49"
          }}
          // agenda container style
          style={{}}
        />
        // </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  itemNotStringDate: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10
    // marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  textContainer: {
    backgroundColor: "white",
    marginTop: 20,
    paddingLeft: 10
  },
  cardContainer: {
    paddingLeft: 30,
    paddingRight: 30,

    width: 350
  },
  textContainer1: {
    backgroundColor: "white",
    paddingLeft: 10
  }
});

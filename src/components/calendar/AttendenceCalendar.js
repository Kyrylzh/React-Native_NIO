//AttendenceTest
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  AsyncStorage
} from "react-native";
import { CalendarList } from "react-native-calendars";

// const data = [
//         {
//             date:'2018-12-06',
//             present:true
//         },

//         {
//             date:'2018-12-11',
//             present:false
//         },

//         {
//             date:'2018-12-17',
//             present:false
//         },

//         {
//             date:'2018-12-31',
//             present:true
//         }
//     ];

var presentDates = [
  {
    date: "2018-12-01",
    status: "green"
  },
  {
    date: "2018-12-05",
    status: "green"
  },

  {
    date: "2018-12-08",
    status: "green"
  },

  {
    date: "2018-12-07",
    status: "green"
  },

  {
    date: "2018-12-18",
    status: "red"
  },

  {
    date: "2018-12-17",
    status: "green"
  },

  {
    date: "2018-12-28",
    status: "red"
  },

  {
    date: "2018-12-29",
    status: "red"
  }
];

var absentdates = [
  "2018-12-02",
  "2018-12-06",
  "2018-12-10",
  "2018-12-09",
  "2018-12-16",
  "2018-12-19",
  "2018-12-25",
  "2018-12-27"
];

// const mark = {
//   [presentDates]: { selected: true, markedPresent: true }
// };

class AttendenceCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markedPresent: null,
      markedAbsent: null,
      user_id: "",
      token: "",
      mark_date: null,
      today: "",
      year: ""
      // data:'jj'
    };

    this.markedPresent(presentDates);
    // this.getUserID();
    this.getUserDetails();
    // this.onDayPress = this.onDayPress.bind(this);
    // this.onDayPress = this.onDayPress.bind(this);
  }

  componentDidMount() {
    // this.markedPresent();
    // this.markedAbsent();
    this.getToday();
    // this.getUserID();
    // this.requestAttendence();
    // this.setState({
    //     data: presentDates
    // // })
    // let user_details=await AsyncStorage.getItem("user_details");
    // console.log("In remove Token Function : "+user_details+" ********** ")
    console.log("Hello I'm in component did mount in attendence module");
  }

  // call function after you successfully get value in nextDay array

  getToday() {
    var d = new Date(),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    var Today = [year, month, day].join("-");
    console.log(" Today " + Today);
    this.setState({ today: Today });
    this.setState({ year: year });
  }

  // async getUserID() {
  //   try {
  //     let token = await AsyncStorage.getItem("token");
  //     let user_id = await AsyncStorage.getItem("userID");
  //     let student_id = await AsyncStorage.getItem("student_id");
  //     console.log(
  //       "In Attendence Function : " + user_id + " ********** " + student_id
  //     );
  //     // console.log("In Attendence Function Token : "+token+" ********** ")

  //     // let token=JSON.stringify(thistoken)

  //     //alert(a)
  //     if (user_id != null) {
  //       this.handleUser(user_id, token, student_id);
  //     } else {
  //       console.log("Opps not a user_id");
  //     }
  //   } catch (error) {
  //     alert(error);
  //   }
  // }

  // handleUser = (user_id, token, student_id) => {
  //   this.setState({ user_id: user_id });
  //   this.setState({ token: token });
  //   this.setState({ student_id: student_id });
  //   this.requestAttendence();

  //   // console.log("In handleUser_id Function : "+this.state.user_id+" ********** "+this.state.token)
  // };

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

    this.requestTaskCalendar();
  }

  requestTaskCalendar = async () => {
    console.log("Fetching.... getAllUsers in Create Task From Admin");
    await fetch(
      // `http://cupdes.com/api/v1/get-calendartasks/${this.state.userDetails.id}`,
      `http://cupdes.com/api/v1/get-calendartasks/2`,

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
  };

  taskCalendarHandler = data => {
    console.log("In data Handler task calendar : ", data);
    this.setState({
      taskCalendar: data
    });

    console.log("In state Calendar : ", this.state.taskCalendar);
    this.markedPresent(presentDates);
  };

  // requestAttendence() {
  //   var token = this.state.token;
  //   // var user_id=this.state.user_id;
  //   var year = this.state.year;
  //   var student_id = this.state.student_id;

  //   user_id = 1;
  //   console.log("requestAttendence");
  //   console.log("User ID " + user_id);
  //   fetch(
  //     `https://ems.aladinlabs.com/api/attendance/mobile?year=${year}&&student_id=${student_id}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization: "Bearer " + token,
  //         "Content-Type": "XMLHttpRequest"
  //       }
  //     }
  //   )
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       this.datahandler(responseJson);
  //     })
  //     .done();
  // }

  // datahandler(data) {
  //   console.log("Data Handler");
  //   console.log(data);

  //   const dateArray = JSON.stringify(data);
  //   // console.log("Testing");
  //   // console.log("Array length " +data.length);

  //   // console.log(presentDates);

  //   this.setState({ mark_date: data });

  //   // this.showMark_date();
  //   // this.markedPresent(data);
  // }

  showMark_date() {
    console.log(this.state.mark_date);
    console.log(this.state.markedPresent);
  }

  markedPresent = data => {
    console.log("hello markedPresent", data);

    // var today = new Date('YYYY,MM,DD');
    // console.log("Todayyyy"+today);
    // let data=this.state.mark_date;
    // console.log(data);
    // console.log(presentDates);
    var obj = data.reduce(
      (c, v) =>
        Object.assign(c, {
          // if(v.status=='true'){
          [v.date]: {
            selected: true,
            marked: true,
            customStyles: {
              container: {
                // if([v.status]){
                backgroundColor: [v.status]
                // }
              },

              text: {
                color: "white",
                fontWeight: "bold"
              }
            }
          }
          // }
        }),
      {}
    );
    this.setState({ markedPresent: obj });
    console.log("Render dates : ", obj);

    // console.log(this.state.data)
  };
  render() {
    return (
      <CalendarList
        // current={'2018-12-04'}
        current={this.state.today}
        pastScrollRange={12}
        futureScrollRange={2}
        // Date marking style [simple/period/multi-dot/single]. Default = 'simple'
        markingType={"custom"}
        data={presentDates}
        // markedDates={
        //   // this.state.mark_date
        //   this.state.markedPresent
        //   // this.state.markedAbsent
        // }
        // markedDates={{
        //   "2019-05-16": { selected: true, marked: true, selectedColor: "blue" },
        //   "2019-05-17": { marked: true },
        //   "2019-05-18": { marked: true, dotColor: "red", activeOpacity: 0 },
        //   "2019-05-19": { disabled: true, disableTouchEvent: true }
        // }}

        // markedDates={{
        //   "2019-07-28": {
        //     customStyles: {
        //       container: {
        //         backgroundColor: "green"
        //       },
        //       text: {
        //         color: "black",
        //         fontWeight: "bold"
        //       }
        //     }
        //   },
        //   "2019-07-29": {
        //     customStyles: {
        //       container: {
        //         backgroundColor: "white",
        //         elevation: 2
        //       },
        //       text: {
        //         color: "blue"
        //       }
        //     }
        //   }
        // }}
      />
    );
  }
}

export default AttendenceCalendar;

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: "#eee",
    height: 350
  },
  text: {
    textAlign: "center",
    borderColor: "#bbb",
    padding: 10,
    backgroundColor: "#eee"
  },
  container: {
    flex: 1,
    backgroundColor: "gray"
  }
});

import React from "react";
import WeekCalendar from "react-week-calendar";
import moment from "moment";
import CustomModal from "./CustomModal";
import { authenticationService } from "../services/authenticationservice";
import {reservationService} from "../services/reservationService";
import { userService } from "../services/userservice";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import NavBar from "./NavBar";

export default class MyCustomCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIntervals: [],
      currentUser: authenticationService.currentUserValue,
    };
  }


  getFriday = () => {
    const dayINeed = 5; // for Friday
    const today = moment().isoWeekday();
    if (today < dayINeed) {
      return moment().subtract(1, "weeks").isoWeekday(dayINeed);
    } else {
      // otherwise, give me *next week's* instance of that same day
      return moment().isoWeekday(dayINeed);
    }
  };

  getInterval(interval) {
    return {
      uid: interval.id,
      start: moment(interval.reserved_for).subtract(1, "h"),
      end: moment(interval.reserved_for),
    };
  }

  getReservations() {
    reservationService.getReservations(this.state.currentUser.user.id)
      .then((resp) => resp.json())
      .then((reservations) => {
        let intervals = reservations.map(this.getInterval);

        this.setState({
          selectedIntervals: intervals,
        });
      });
  }

  componentDidMount() {
    this.getReservations();

  }

  render() {
    const { currentUser, users } = this.state;

    return (
      <div>
       <div>
          <NavBar
            company={currentUser.user.company}
            email={currentUser.user.email}
          />
        </div>

        <WeekCalendar
          firstDay={this.getFriday()}
          startTime={moment({ h: 0, m: 0 })}
          endTime={moment({ h: 23, m: 59 })}
          scaleUnit={60}
          cellHeight={30}
          scaleHeaderTitle="Time"
          numberOfDays={10}
          showModalCase={["create"]}
          selectedIntervals={this.state.selectedIntervals}
          onEventClick={this.handleSelect}
          onIntervalSelect={this.handleSelect}
          onIntervalUpdate={this.handleEventUpdate}
          modalComponent={CustomModal}
        />
      </div>
    );
  }
}

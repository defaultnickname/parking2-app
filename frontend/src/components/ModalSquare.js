import React, { Component } from "react";
import moment from "moment";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from "@material-ui/lab/Alert";
import {reservationService} from "../services/reservationService";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class Button extends Component {
  constructor(props) {
    super(props);

    this.state = {
      company: this.props.company,
      color:
        (this.props.company != this.props.currentUser.user.company) ||
        (this.props.reservations == this.props.day.substring(0, 20) + "Z")
          ? "gray"
          : "white",
      disabled:
        (this.props.company !== this.props.currentUser.user.company ||
        this.props.reservations == this.props.day.substring(0, 20) + "Z"),
      message: "",
      severity: "",
    };

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
 
    reservationService.createReservation(this.props.id,this.props.day,this.props.currentUser.user).then((response) => {
      if (response.status === 201) {
        this.setState({
          color: "gray",
          disabled: true,
        });

         window.location.reload(false); // for updating reservations on the calendar

        this.props.snackbarCallback({
          severity: "success",
          message: "Reservation made!",
        });
      } else {
        this.props.snackbarCallback({
          severity: "error",
          message: "Problem with making reservation",
        });
      }

    });

  }

  //remind how does props and state look like
  //
  //console.log(this.props)
  //{
  //   "id": 7,
  //   "company": 1,
  //   "startHour": 23,
  //   "endHour": 23,
  //   "day": "2020-12-15T23:00:00",
  //   "reservations": [
  //     []
  //   ]
  // }

  //console.log(this.state)
  //{
  //   "company": 1,
  //   "color": "white",
  //   "disabled": false
  // }

  render() {
    const { message, severity } = this.state;
    
    console.log(this.props.currentUser)
   
    return (
      <>
        <button
          className="square"
          style={{ backgroundColor: this.state.color }}
          disabled={this.state.disabled}
          onClick={() => this.handleOnClick()}
        ></button>
      </>
    );
  }
}

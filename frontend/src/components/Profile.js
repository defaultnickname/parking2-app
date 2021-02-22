import React, { Component, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import { authenticationService } from "../services/authenticationservice";
import {reservationService} from "../services/reservationService";
import ReservationItem from "./ReservationItem";
import NavBar from "./NavBar";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: authenticationService.currentUserValue,
      reservations: undefined,
      isLoaded: false,
    };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe((x) =>
      this.setState({ currentUser: x })
    );
    this.getReservations();
  }

  myCallback = () => {
    this.getReservations();
  };

  getReservations() {
    reservationService.getReservations(this.state.currentUser.user.id)
      .then((resp) => resp.json())
      .then((reservations) => {
        console.log(reservations,"reservations")
        this.setState({
          reservations: reservations,
          isLoaded: true,
        });
      });
  }

  render() {
    const { currentUser, reservations, isLoaded } = this.state;

    if (!isLoaded) {
      var userReservations = <div>Loading...</div>;
    } else {
      console.log(reservations)
      var userReservations = reservations.map((reservation) => (
        <ReservationItem
          key={reservation.id}
          reservation_id={reservation.id}
          spot={reservation.spot}
          reserved_for={reservation.reserved_for}
          callback={this.myCallback}
        />
      ));
    }

    return (
      <>
        <div>
          <NavBar
            company={currentUser.user.company}
            email={currentUser.user.email}
          />
        </div>

        <div
          style={{
            background: "#f2f2f2",
            padding: "10px",
            borderBottom: "2px #ccc dotted",
          }}
        >
          <Typography component="h3" variant="h4">
            Your reservations:
          </Typography>
        </div>

        <div>{userReservations}</div>
      </>
    );
  }
}

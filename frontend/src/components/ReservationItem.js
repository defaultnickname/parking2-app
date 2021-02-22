import React, { Component } from "react";
import PropTypes from "prop-types";
import {reservationService} from "../services/reservationService";


export class ReservationItem extends Component {
  constructor(props) {
    super(props);
  }

  getStyle = () => {
    return {
      background: "#f2f2f2",
      padding: "10px",
      borderBottom: "2px #ccc dotted",
    };
  };

 handleDelete = (event) => {
    reservationService.deleteReservation(this.props.reservation_id).then((response) => {
      this.props.callback();
    });
  };


  render() {
    console.log(this.props)
    const { spot, reserved_for, reservation_id } = this.props;
    return (
      <div style={this.getStyle()}>
        <p>
          Reservation ID: {reservation_id} Spot with number : {spot} Reserved at{" "}
          {reserved_for}
          <button onClick={this.handleDelete} style={btnStyle}>
            X
          </button>
        </p>
      </div>
    );
  }
}

const btnStyle = {
  background: "red",
  color: "#fff",
  border: "none",
  padding: "5px 8px",
  borderRadius: "50%",
  cursor: "pointer",
  float: "right",
};

export default ReservationItem;

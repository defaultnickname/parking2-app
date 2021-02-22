import React from "react";
import { ModalGrid } from "./ModalGrid";
import { authenticationService } from "../services/authenticationservice";
import {reservationService} from "../services/reservationService";
import { userService } from "../services/userservice";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

class CustomModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spots: [],
      parkingWidth: null,
      parkingLength: null,

      reservations: [],
      currentUser: authenticationService.currentUserValue,
    };
  }

  componentDidMount() {
    this.getData();
  }


  getData() {
    // fetch all reservations, all spots, and parking lot description (width, length)

    let firstAPICall = fetch("api/spot" + "?format=json");
    let secondAPICall = fetch("api/desc/" + "?format=json");
    let thirdAPICall = reservationService.getReservations();

    Promise.all([firstAPICall, secondAPICall, thirdAPICall])
      .then((values) => Promise.all(values.map((value) => value.json())))
      .then((finalVals) => {
        let firstAPIResp = finalVals[0];
        let secondAPIResp = finalVals[1];
        let thirdAPIResp = finalVals[2];

        this.setState({
          spots: firstAPIResp,
          parkingWidth: secondAPIResp[0].width,
          parkingLength: secondAPIResp[0].length,
          reservations: thirdAPIResp,
        });
      });
  }

  render() {
    const { start, end } = this.props;

    const { parkingWidth, parkingLength } = this.state;

    const startHour = start.hour();
    const endHour = end.hour();

    const duration = endHour - startHour;

    const theDay = start.format("YYYY-MM-DDTHH:mm:ss");

    return (
      <div className="custom-modal">
        <div className="customModal__text">
          <Typography
            component="h4"
            variant="h4"
          >{`Choose parking spot you want to reserve on ${theDay}`}</Typography>
        </div>

        <ModalGrid
          spots={this.state.spots}
          parkingLength={parkingLength}
          reservations={this.state.reservations}
          parkingWidth={parkingWidth}
          startHour={startHour}
          endHour={endHour}
          day={theDay}
          currentUser={this.state.currentUser}
        />
      </div>
    );
  }
}

export default CustomModal;

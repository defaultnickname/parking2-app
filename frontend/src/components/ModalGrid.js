import React, { Component, useEffect } from "react";
import ModalSquare from "./ModalSquare";
import { Collection, Grid, AutoSizer } from "react-virtualized";
import CustomSnackbar from "./Snackbar";


export class ModalGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      parkingWidth: this.props.parkingWidth,
      parkingLength: this.props.parkingLength,
      listDataFromChild: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.parkingLength !== this.props.parkingLength ||
      prevProps.parkingWidth !== this.props.parkingWidth
    ) {
      this.setState({
        parkingLength: this.props.parkingLength,
        parkingWidth: this.props.parkingWidth,
      });
    }
  }

  myCallback = (dataFromChild) => {
    this.setState({ listDataFromChild: dataFromChild });
  };

  render() {
    let spots = this.props.spots;

     if (this.state.listDataFromChild !== null) {
      var snackbar = (
        <CustomSnackbar
          message={this.state.listDataFromChild["message"]}
          severity={this.state.listDataFromChild["severity"]}
        />
      );
    } else {
      snackbar = <></>;
    }


    return (
      <div
        key={this.props.parkingWidth}
        style={{
          display: "flex",
          alignItems: "center",
          paddingBottom: 20,
          paddingTop: 80,
        }}
      >
        
        <div>{snackbar} </div>

        <div style={{ width: "100%", height: "60vh" }}>
          <AutoSizer>
            {({ height, width }) => (
              <Grid
                cellRenderer={({ columnIndex, key, rowIndex, style }) => {
                  let i =
                    spots.length === 0 ||
                    this.state.parkingWidth * columnIndex + rowIndex >=
                      spots.length
                      ? 0
                      : spots[this.state.parkingWidth * columnIndex + rowIndex];

                  return (
                    <div key={key} style={style}>
                      <ModalSquare
                        snackbarCallback={this.myCallback}
                        id={i.id} // spot ID
                        company={i.belongs_to} // company to which that spot belongs
                        startHour={this.props.startHour} //timetable time from first cell chosen  - moment.format('YYYY-MM-DDTHH:mm:ss');
                        endHour={this.props.endHour} //timetable time from last cell chosen - moment.format('YYYY-MM-DDTHH:mm:ss');
                        day={this.props.day}
                        currentUser={this.props.currentUser}
                        reservations={[
                          this.props.reservations
                            .filter(
                              // filter reservations for certain spot on certain day

                              (word) =>
                                word.spot === i.id &&
                                word.reserved_for.substring(0, 10) ===
                                  this.props.day.substring(0, 10)
                            )
                            .map((res) => res.reserved_for),
                        ]} //get only time, dump spotID and user
                      />
                    </div>
                  );
                }}
                columnCount={this.state.parkingWidth}
                columnWidth={({ index }) => 100}
                height={height}
                rowCount={this.state.parkingLength}
                rowHeight={({ index }) => 50}
                width={width}
              />
            )}
          </AutoSizer>
        </div>
      </div>
    );
  }
}

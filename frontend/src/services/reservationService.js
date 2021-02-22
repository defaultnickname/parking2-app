import { BehaviorSubject } from 'rxjs';

export const reservationService = {
    createReservation,
    deleteReservation,
    getReservations,
};

function createReservation(spotID, dateAndTime,user)  {

      const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        spot: spotID,
        reserved_for: dateAndTime,
        reserved_by: user.id, 
      }),
    };

    return fetch("/api/make-reservation/", requestOptions);
}


function deleteReservation(reservationID) {
   const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reservation_id: reservationID,
      }),
    };


    return fetch("/api/make-reservation/", requestOptions);

}

function getReservations(userID = null){

	return (userID ? fetch("/api/reservations/" + "?userid=" + userID ) : fetch("api/reservations") );

}
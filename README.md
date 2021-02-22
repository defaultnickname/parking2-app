# par2king

Application for parking spots reservation and management. User can choose spot from pool assigned to his company and reserve it.



[Live demo](http://15.236.213.16:8000)

Login with credentials:


email: o@o.oo


pass : o



## Installation

Branch called ```frontend``` contains everything what is neccesary to launch app, just pull this branch and run Django server

To install all python modules:

```bash
pip install -r requirements.txt
```

To setup frontend app:

```bash
npm install
npm run dev
```

Implemented URLS:

**/login**		-login

**/register**	- register

**/profile**        - for checking reservations made and deleting them

**/**			- for parking schedule


Frontend app core utilizes customized schedule from  [react-week-calendar](https://github.com/birik/react-week-calendar)



## Usage of app

### Usage of admin pane;;

Admin can manage app from Django admin site. Add, delete, update models from admin panel.


**Models to manage:**

**Companies** :               companies with acces to parking

**Parking lot description** : dimmensions of parking(spot is the unit), limits number of parking spots

**Parking spots**:            list of all parking spots with companies assigned to them

**Parking users**:            Users who can acces parking

**Parking reservations**:     List of reservation for given combinations of spot, user, and time



![alt text](https://i.imgur.com/PVh2nUS.png)

Following are also endpoints for user.

Users can register themselves on their own, but they have no company by default.

### Usage for typical user
 User can register,ask admin to assign to him his company, and then login and reserve parking spots for end of current week or next week, dependently on the day user makes the reservation. 


After logging user can see schedule.
![alt text](https://i.imgur.com/lZgl73e.png) then choose a time he wants to and reserve spot for.
and obtain succesful reservation:
![alt text](https://i.imgur.com/p3HkIh5.png)


or error(if he had chosen time in the past, someone was faster reserving the spot, or he already has active reservation for that day):
![alt text](https://i.imgur.com/p5WaG8p.png)

White button means spot has no reservation for chosen time and belongs to user company.
Gray non-clickable button means spot is reserved or user company can not park there.


List of reservations can be seen after accesing **/profile** view and can be deleted from there as well
![alt text](https://i.imgur.com/qC0aSTm.png)






import React, {Component, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { authenticationService } from "../services/authenticationservice";


export default class Register extends Component {


    constructor(props) {
        super(props);
		
       
		
        this.state = {
            
            "email": "",
            "password": "",
         
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }


    handleSubmit = (event) => {
       
        event.preventDefault()

		    authenticationService.register(this.state.email,this.state.password)
            .then((response) => response.json())
            .then((data) => console.log(data)).then(user => {
                const {from} = this.props.location.state || {from: {pathname: "/"}};
                this.props.history.push(from);
            });  

    }


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    render() {


        return (
            <Grid container spacing={1} alignContent={"center"}>


                <Grid item xs={12} align="center">

                    <Typography component='h4' variant='h4'>Register new account</Typography>

                </Grid>


                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField onChange={this.handleChange}
                                   name='email'
                                   value={this.state.email}
                                   type='email'
                                   id="outlined-basic"
                                   label="E-Mail"
                                   variant="outlined"
                                   required={true}/>
                    </FormControl>

                </Grid>


                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField onChange={this.handleChange}
                                   name='password'
                                   value={this.state.password}
                                   type='password'
                                   id="outlined-basic"
                                   label="Password"
                                   variant="outlined"
                                   required={true}/>
                    </FormControl>
                </Grid>

                <Grid item xs={12} align="center">
                    <Button color="secondary" variant='contained' onClick={this.handleSubmit}> Register </Button>
                </Grid>
            </Grid>


        )
    }
}





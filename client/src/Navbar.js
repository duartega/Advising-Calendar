import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import './App.css';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function ButtonAppBar(props) {
  const { classes, loggedIn, logout, role } = props;
  const name = "Version 1.4"

  if(loggedIn === false) { //NOT LOGGED IN
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {name}
            </Typography>
            <Button color="inherit"><Link className="App-link" to="/Login">Login</Link></Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  else if(role === 0 && loggedIn === true) { //STUDENT NAV
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {name}
            </Typography>
            <Button onClick={logout} color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  else if(role === 1 && loggedIn === true) { //ADVISOR NAV
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {name}
            </Typography>
            <Button color="inherit"><Link className="App-link" to="/Appointments">Appointments</Link></Button>
            &nbsp;
            <Button color="inherit"><Link className="App-link" to="/EditSchedule">Edit Schedule</Link></Button>
            &nbsp;
            <Button onClick={logout} color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
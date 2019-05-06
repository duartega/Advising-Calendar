import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import './App.css';
import AdvisorLongMenu from './AdvisorLongMenu';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Search from './Search';

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
  const { classes, loggedIn, logout, role, fname, lname } = props;
  let name = "Version 1.9"

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
    name = `${lname}, ${fname}`;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {name}
            </Typography>
            <Button color="inherit"><Link className="App-link" to="/AdvisingTimes">Find Advising Times</Link></Button>
            &nbsp;
            <Button color="inherit"><Link className="App-link" to="/Appointments">My Appointments</Link></Button>
            &nbsp;
            <Button onClick={logout} color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  else if(role === 1 && loggedIn === true) { //ADVISOR NAV
    name = `${lname}, ${fname}`;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {name}
            </Typography>
            <Search/>
            &nbsp;
            <Button color="inherit"><Link className="App-link" to="/UserList">User List</Link></Button>
            &nbsp;
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
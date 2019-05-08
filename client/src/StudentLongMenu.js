import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Link} from 'react-router-dom';


class LongMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
        <MoreVertIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}><Link className="App-link2" to="/AdvisingTimes">Find Advising Times</Link></MenuItem>
          <MenuItem onClick={this.handleClose}><Link className="App-link2" to="/Appointments">My Appointments</Link></MenuItem>
          <MenuItem onClick={this.handleClose}><Link className="App-link2" to="/History">Appointment History</Link></MenuItem>
        </Menu>
      </div>
    );
  }
}

export default LongMenu;
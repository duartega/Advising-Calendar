import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import axios from './ConfigAxios';

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions);

class UserPop extends React.Component {
  state = {
    open: false,
    text: '',
    data: []
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleCloseSubmit = () => {
    const { row, id } = this.props;
    console.log(id, row['id'], row['fname'], row['lname'], this.state.text)
    axios.post(`/Advising/addNote/${id}/${row['id']}/${row['fname']}/${row['lname']}/${this.state.text}`)
    this.setState({ 
      open: false,
      text: '',
      data: []
     });
  };

  handleClose = () => {
    this.setState({ 
      open: false,
      text: '',
      data: []
     });
  };

  handleTextChange = (event) => {
    this.setState({
      text: event.target.value
    });
  };

  render() {
    return (
      <div>
        <Button variant="outlined" onClick={this.handleClickOpen}>
          Add Note
        </Button>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Private Note
          </DialogTitle>
          <DialogContent>
            <Typography gutterBottom>
            <center><textarea onChange={this.handleTextChange} rows="4" cols="50">
              Type Note Here...
            </textarea></center>
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default UserPop;
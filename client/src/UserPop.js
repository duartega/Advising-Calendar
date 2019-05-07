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
    open: true,
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { user, value } = this.props;

    console.log(this.state.open)
    if(value === true && user !== undefined) {
        return (
        <div>
            <Dialog
            onClose={this.handleClose}
            aria-labelledby="customized-dialog-title"
            open={this.state.open}
            >
            <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                Student
            </DialogTitle>
            <DialogContent>
            <Typography gutterBottom>
            <table>
                <tr>
                    <th>ID</th>
                    &nbsp;
                    &nbsp;
                    <th>User</th> 
                    &nbsp;
                    &nbsp;
                    <th>First Name</th>
                    &nbsp;
                    &nbsp;
                    <th>Last Name</th>
                    &nbsp;
                    &nbsp;
                </tr>
                <tr>
                    <td>{user['id']}</td>
                    &nbsp;
                    &nbsp;
                    <td>{user['user']}</td> 
                    &nbsp;
                    &nbsp;
                    <td>{user['fname']}</td>
                    &nbsp;
                    &nbsp;
                    <td>{user['lname']}</td>
                    &nbsp;
                    &nbsp;
                </tr>
            </table>
            </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                Save changes
                </Button>
            </DialogActions>
            </Dialog>
        </div>
        );
  }
  else {
    return (
        <div></div>
    )
  }
}
}

export default UserPop;
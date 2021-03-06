import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import axios from '../ConfigAxios';

const styles = theme => ({
  root: {
    width: '40%',
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: 'null',
      result: undefined
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleChange(event) {
    this.setState({
      searchValue: event.target.value,
      value: true
    });
  }

  handleEnter(name) {
    let value = ''
    axios.get(`/Advising/GetStudentInfo/${name}`).then(result => {
      const userInfo = result.data;
      console.log(result['statusText'])
      if (result['statusText'] === 'OK' && userInfo[0]!== undefined) {
        for(let i = 0; i < userInfo.length; i++) {
         value += ` USERID: ${userInfo[i]['id']} || USER: ${userInfo[i]['user']} || FIRST NAME: ${userInfo[i]['fname']} || LAST NAME: ${userInfo[i]['lname']}`
         value += '\n'
        }
        alert(value)

        this.setState({
          result: userInfo
        });
      }
      else {
        alert("No Student Found!")
      }
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                onChange={(e) => this.handleChange(e)}
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    this.handleEnter(this.state.searchValue)
                  }
                }}
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
        </AppBar>
      </div>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Search);
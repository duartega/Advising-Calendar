import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import EditTable from './EditTable';
import axios from './ConfigAxios';
import StartDatePicker from './StartDatePicker';
import EndDatePicker from './EndDatePicker';
import { getDay } from 'date-fns/esm';
import DateFnsUtils from '@date-io/date-fns';

const days = {0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday"}

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 120,
    },
    formControl: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
  });
  
  class SimpleSelect extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
        day: '',
        start: '07:30',
        end: '09:30',
        startdate: new Date(),
        enddate: '',
        labelWidth: 0,
        WDay: '',
      };

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleStartChange = this.handleStartChange.bind(this);
      this.handleEndChange = this.handleEndChange.bind(this);
      this.dayChange = this.dayChange.bind(this);
    }
    
    handleSubmit(props) {
      const { id } = this.props;

      function timeList(startVal, endVal) {
        let startArray = []
        let endArray = []

        var start = startVal;
        var startArr = start.split(":");
        var finish = endVal;
        var finishArr = finish.split(":");

        var hourDiff = Math.abs(finishArr[0] - startArr[0]);
        var minDiff = Math.floor((Math.abs(finishArr[1] - startArr[1]) / 59)*100);
        if (minDiff.toString().length == 1) 
            minDiff = '0' + minDiff;

        var output = hourDiff + "." + minDiff;
        let value = output;

        return value;

      }

      function findKeyValue(key) {
        let map = [
        {key: 10, value: "Monday"},
        {key: 20, value: "Tuesday"},
        {key: 30, value: "Wednesday"},
        {key: 40, value: "Thursday"},
        {key: 50, value: "Friday"},
        {key: 60, value: "Saturday"},
        {key: 70, value: "Sunday"}];
        
        for(let i = 0; i < 7; i++)
        {
          if(map[i]["key"] === key) {
            return map[i]["value"]
          }
        }
      }
      let idValue = id;
      let dayValue = this.state.day;
      let startValue = this.state.start;
      let endValue = this.state.end;
      let timeValue = timeList(startValue, endValue)
      if(idValue === undefined || dayValue === undefined ||
        startValue === undefined || endValue === undefined ||
        timeValue === undefined || timeValue === "") {
          alert("Error, Please make sure all values are filled!")
      }
      else if(timeValue == "null") {
        alert("Error, start time cannot be greater than end time")
      }
      else {
        alert("Advising Time has been added!")
        axios.post(`/Advising/AddTime/${idValue}/${dayValue}/${startValue}/${endValue}/${timeValue}`)
      }
    }

    handleStartChange = event => 
      this.setState({start: event.target.value});


    handleEndChange = event =>
      this.setState({end: event.target.value});
    
  
    handleChange = event => 
      this.setState({ [event.target.name]: event.target.value });
    

    onChange = date => this.setState({ date })

    dayChange = event => {
      var d = getDay(new Date(event)); // Get the day of the week
      console.log("THIS WORKS: ", days[d])
      this.setState({day: days[d]})
      // console.log("EVENT: ", event);
    }
    render() {
      const { classes, id } = this.props;
  
      return (
          <div>
            <br></br>
            <br></br>
            <b>&nbsp;Schedule Editor:</b>
            <br></br>
            <br></br>
            <form className={classes.root} autoComplete="off">
            {/* <FormControl className={classes.formControl}>
                <InputLabel htmlFor="day-simple">Day</InputLabel>
                <Select
                value={this.state.day}
                onChange={this.handleChange}
                inputProps={{
                    name: 'day',
                    id: 'day-simple',
                }}
                >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Monday</MenuItem>
                <MenuItem value={20}>Tuesday</MenuItem>
                <MenuItem value={30}>Wednesday</MenuItem>
                <MenuItem value={40}>Thursday</MenuItem>
                <MenuItem value={50}>Friday</MenuItem>
                <MenuItem value={60}>Saturday</MenuItem>
                <MenuItem value={70}>Sunday</MenuItem>
                </Select>
            </FormControl> */}
            <form className={classes.container} noValidate>
            <TextField onChange={this.handleStartChange}
                id="time"
                label="Start Time"
                type="time"
                defaultValue="07:30"
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
                inputProps={{
                step: 300, // 5 min
                }}
                />
                </form>
                <form className={classes.container} noValidate>
            <TextField onChange={this.handleEndChange}
                id="time"
                label="End Time"
                type="time"
                defaultValue="09:30"
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
                inputProps={{
                step: 300, // 5 min
                }}
                /> 
                </form>

                <form className={classes.container} noValidate>
                {/* render = {(props) => <EditSchedule id = {this.state.id} */}
                  <StartDatePicker onChange={this.onChange} value={this.state.startdate} action={this.dayChange} />
                </form>
                <form className={classes.container} noValidate>
                  <EndDatePicker onChange={this.onChange} value={this.state.enddate} />
                </form>
            </form>
            
            <br></br>
            &nbsp;
            <Button variant="contained" color="primary" className={classes.button} onClick={this.handleSubmit}>
                Add Time
            </Button>
            <br></br>
            <br></br>
            <EditTable id={id} />
        </div>
      );
    }
  }

  SimpleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(SimpleSelect);
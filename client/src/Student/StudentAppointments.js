import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from '../ConfigAxios';
import red from '@material-ui/core/colors/red';
import { getDay, format, parse, getDate, getYear, getMonth } from 'date-fns/esm';

document.title = 'My Appointments'; // Tab Title


function createData(id, day, date, starttime, endtime, timeblock, instructor_fname, instructor_lname) {
  return {id, day, date, starttime, endtime, timeblock, instructor_fname, instructor_lname};
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'day', numeric: false, disablePadding: false, label: 'Days' },
  { id: 'Date', numeric: false, disablePadding: false, label: 'Date' },
  { id: 'starttime', numeric: false, disablePadding: false, label: 'Start Times' },
  { id: 'endtime', numeric: false, disablePadding: false, label: 'End Times' },
  { id: 'timeblock', numeric: false, disablePadding: false, label: 'Time Blocks' },
  { id: 'AdvisorLastName', numeric: false, disablePadding: false, label: 'Advisor Last Name' },
  { id: 'AdvisorFirstName', numeric: false, disablePadding: false, label: 'Advisor First Name' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({

  root: {
    paddingRight: theme.spacing.unit,
    color: red[200],
  },

  highlight: {
          color: red[200],
          backgroundColor: red[900],
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.primary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { Selected, numSelected, classes, updateSelected, student_id } = props;
 //https://material-ui.com/demos/dialogs/ this will give us a confirmation dialog
  function deleteRow() {
    let values = Selected;
    for(let i = 0; i < values.length; i++) {
      axios.delete(`/Student/DeleteAppointment/${Selected[i]}/${student_id}`);
    }
    //alert("item/s deleted!")
    updateSelected(values);
  }

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            My scheduled (upcoming) advising appointments
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {
          <Tooltip title="Delete Selected Appointment">
            <IconButton onClick={deleteRow} aria-label="Delete Selected Appointment">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        }
      </div>
    </Toolbar>
  );
};

// {numSelected > 0 ? (
//     <Tooltip title="Delete Selected Appointment">
//       <IconButton onClick={deleteRow} aria-label="Delete Selected Appointment">
//         <DeleteIcon />
//       </IconButton>
//     </Tooltip>
//   ) : (
//     <Tooltip title="refresh">
//       <Button variant="outlined" color="primary" className={classes.button} onClick={update} aria-label="refresh">
//         Refresh
//       </Button>
//     </Tooltip>
//   )}

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'date',
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 5,
    student_id: this.props.id,
  };

  // This is the function to pull the data again when the user clicks the refresh button
  update = (props) => {
    const { id } = this.props;
    let array = [];
    this.setState({student_id: id})

    // Get all the UNFILLED advising appointment slots for student view from their advisors advising times
    axios.get(`/Student/getStudentAppointements/${id}`).then(result => {
      axios.get(`/Student/getProfessorName/${id}`).then(profNameResult => {
        for(let i = 0; i < result.data.length; i++) {
          let d = result.data[i]['startDate'];
          let date = d.split("-", 3)
          let day = date[2].split("T")
          let wholeDate = date[1] + "/" + day[0] + "/" + date[0]

          array.push(createData(result.data[i]['uniId'], result.data[i]['Day'], wholeDate, result.data[i]['StartTime'],
            result.data[i]['EndTime'], result.data[i]['TimeBlock'], 
            profNameResult.data[0][0]['fname'], profNameResult.data[0][0]['lname']))
        }
        this.setState({
          data: array
        })
      })
    })
  }

  async componentDidMount() {
    const { id } = this.props;
    let array = [];
    this.setState({student_id: id})

    // Get all the UNFILLED advising appointment slots for student view from their advisors advising times
    axios.get(`/Student/getStudentAppointements/${id}`).then(result => {
      axios.get(`/Student/getProfessorName/${id}`).then(profNameResult => {
        for(let i = 0; i < result.data.length; i++) {
          let d = result.data[i]['startDate'];
          let date = d.split("-", 3)
          let day = date[2].split("T")
          let wholeDate = date[1] + "/" + day[0] + "/" + date[0]

          array.push(createData(result.data[i]['uniId'], result.data[i]['Day'], wholeDate, result.data[i]['StartTime'],
            result.data[i]['EndTime'], result.data[i]['TimeBlock'], 
            profNameResult.data[0][0]['fname'], profNameResult.data[0][0]['lname']))
        }
        this.setState({
          data: array
        })
      })
    })
  }

  updateSelected=(values) => {
    let newData = this.state.data;
    this.setState({selected: []})

    for(let i = 0; i < values.length; i++) {
     // newData(values[i])
      for(let j = 0; j < newData.length; j++) {
        if(newData[j]['id'] === values[i]) {
          newData.splice(j, 1)
        }
      }
    }

    this.setState({data: newData})
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} Selected={selected} updateSelected={this.updateSelected} update={this.update} student_id={this.state.student_id}/>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.day}
                      </TableCell>
                      <TableCell align="left">{n.date}</TableCell>
                      <TableCell align="left">{n.starttime}</TableCell>
                      <TableCell align="left">{n.endtime}</TableCell>
                      <TableCell align="left">{n.timeblock}</TableCell>
                      <TableCell align="left">{n.instructor_fname}</TableCell>
                      <TableCell align="left">{n.instructor_lname}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={4} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
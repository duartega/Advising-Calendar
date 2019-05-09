import React from 'react';
import AdvisorHistory from './Advisor/AdvisorHistory';
import UserList from './Advisor/UserList';
import axios from './ConfigAxios';
import Login from './Login';
import Navbar from './Navbar';
import EditSchedule from './Advisor/EditSchedule';
import AdvisingTimes from './AdvisingTimes';
import Appointments from './Advisor/Appointments';
import StudentAppointments from './Student/StudentAppointments';
import History from './Student/StudentHistory';
import MyAdvisees from './Advisor/AdvisorsStudents';

import {
  Route
} from 'react-router-dom';
document.title = 'Advising Calendar'; // Tab Title

function checkNotifications(userId){
  axios.get(`/Student/getNotifications/${userId}`).then(result => {
    const userInfo = result.data;
    console.log(userInfo)
    if (userInfo['status'] === 'OK') {
      console.log(userId)
      console.log(userInfo)
      if(userInfo['user']['notify'] === 1) {
        alert("An Advisor has removed one of your Appointments!")
        axios.post(`/Student/deleteNotifications/${userId}`)
      }
    }
  })
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      id: null,
      role: null,
      username: '',
      password: '',
      info: [],
      instructor_id: null,
      alert: false
    };
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleUserChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  handlePassChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleLogout(event) {
    this.setState({
      loggedIn: false,
      id: null,
      role: null,
      username: '',
      password: '',
      info: [],
      instructor_id: null,
      fname: '',
      lname: '',
      alert: false
    })
    //window.location.replace("/"); //NOT THE BEST, BUT IT WORKS...
  }

  handleSubmit(event) {

  axios.get("/login/updateLock");

    event.preventDefault();
    const user = this.state.username;
    const pass = this.state.password;
    if (user && pass !== '') {

      axios.get(`/login/${user}/${pass}`).then(LoginResult => {
        console.log(LoginResult.data)
        if (LoginResult.data['status'] === "Failed"){
          alert("Incorrect Username or Password, Try Again!")
        }
        else if (LoginResult.data['user']['role'] === 0) {
          axios.get(`/Student/getAdvisorID/${LoginResult.data['user']['id']}`).then(IDResult => {
            const userInfo = LoginResult.data;
            const insID = IDResult.data;
            if (LoginResult.data['status'] === 'OK') {
              this.setState({
                loggedIn: true,
                id: userInfo['user']['id'],
                role: userInfo['user']['role'],
                instructor_id: insID['user']['instructor_id'],
                fname: userInfo['user']['fname'],
                lname: userInfo['user']['lname'],
              });
            }
          })
        } else {
          const userInfo = LoginResult.data;
          if (LoginResult.data['status'] === 'OK') {
            this.setState({
              loggedIn: true,
              id: userInfo['user']['id'],
              role: userInfo['user']['role'],
              fname: userInfo['user']['fname'],
              lname: userInfo['user']['lname'],
            });
          }
        }
      })
    }
  }

  render() {
      if (this.state.loggedIn === false) { //NOT LOGGED IN
        return ( 
        <div >
          <Navbar loggedIn = {this.state.loggedIn} role = {this.state.role}/> 
          <Route exact path = "/Login"
          render = {(props) => 
            <Login 
            handleUserChange = {this.handleUserChange} 
            handlePassChange = {this.handlePassChange} 
            handleSubmit = {this.handleSubmit}
            />}
            />
            </div>
          );
        }
        else if (this.state.role === 0 && this.state.loggedIn === true) { //STUDENT
          return ( 
            <div >
              {checkNotifications(this.state.id)}
              {console.log("Here is the state: ", this.state)}
              <Navbar loggedIn = {this.state.loggedIn} logout = {this.handleLogout} 
              role = {this.state.role} 
              fname={this.state.fname}
              lname={this.state.lname}
              /> {} 
              <Route exact path = "/Login" />
              <Route exact path = "/Appointments" 
              render = {(props) => <StudentAppointments id = {this.state.id} instructor_id = {this.state.instructor_id} />}
              />

            <Route exact path = "/AdvisingTimes"
            render = {(props) => <AdvisingTimes id = {this.state.id} instructor_id = {this.state.instructor_id} />}
            />

            <Route exact path = "/History"
            render = {(props) => <History id = {this.state.id} instructor_id = {this.state.instructor_id} /> }
              />
            </div>
          );
        } else if (this.state.role === 1 && this.state.loggedIn === true) { //ADVISOR
          return ( 
            <div >
            <Navbar loggedIn = {this.state.loggedIn} logout = {this.handleLogout}
            role = {this.state.role}
            fname={this.state.fname}
            lname={this.state.lname}/>
            <Route exact path = "/Login"
            render = {(props) => //DEFAULT
              <EditSchedule id = {this.state.id} />}
              />
              <Route exact path = "/EditSchedule"
              render = {(props) => <EditSchedule id = {this.state.id} />}
              />
              <Route exact path = "/UserList"
              render = {(props) => <UserList id={this.state.id}/>}/>
              <Route exact path = "/MyAdvisees"
              render = {(props) => <MyAdvisees id={this.state.id}/>}/>
              <Route exact path = "/Appointments"
              render = {(props) => <Appointments id = {this.state.id} />}/>
              <Route exact path = "/AdvisorHistory"
              render = {(props) => <AdvisorHistory id = {this.state.id} />}/>
              </div >
              );
            }
          }
        }

        export default App;
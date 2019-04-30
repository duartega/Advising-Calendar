import React, {
  Component
} from 'react';
import axios from './ConfigAxios';
import Login from './Login';
import Navbar from './Navbar';
import EditSchedule from './EditSchedule';
import AdvisingTimes from './AdvisingTimes';
import Appointments from './Appointments'
import {
  Route
} from 'react-router-dom';

class App extends Component {
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
      instructor_id: null
    })
    //window.location.replace("/"); //NOT THE BEST, BUT IT WORKS...
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = this.state.username;
    const pass = this.state.password;
    if (user && pass !== '') {
      const myData = {
        first: user,
        pass: pass
      }

      axios.post(`/login/${user}/${pass}`).then(LoginResult => {
        if (LoginResult.data['user']['role'] === 0) {
          axios.get(`/Student/getAdvisorID/${LoginResult.data['user']['id']}`).then(IDResult => {
            const userInfo = LoginResult.data;
            const insID = IDResult.data;
            if (LoginResult.data['status'] === 'OK') {
              this.setState({
                loggedIn: true,
                id: userInfo['user']['id'],
                role: userInfo['user']['role'],
                instructor_id: insID['user']['instructor_id'],
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
            });
          }
        }
      })
    }
  }

  render() {
      if (this.state.loggedIn === false) { //NOT LOGGED IN
        return ( <
          div >
          <
          Navbar loggedIn = {
            this.state.loggedIn
          }
          role = {
            this.state.role
          }
          /> <
          Route exact path = "/Login"
          render = {
            (props) =>
            <
            Login
            handleUserChange = {
              this.handleUserChange
            }
            handlePassChange = {
              this.handlePassChange
            }
            handleSubmit = {
              this.handleSubmit
            }
            />}/ >
            <
            /div>
          );
        }
        else if (this.state.role === 0 && this.state.loggedIn === true) { //STUDENT
          return ( <
              div >
              <
              Navbar loggedIn = {
                this.state.loggedIn
              }
              logout = {
                this.handleLogout
              }
              role = {
                this.state.role
              }
              /> {
            } <
            Route exact path = "/Login"
          render = {
            (props) =>
            <
            AdvisingTimes
            id = {
              this.state.id
            }
            instructor_id = {
              this.state.instructor_id
            }
            />}/ >
            <
            Route exact path = "/Appointments"
            render = {
              (props) =>
              <
              Appointments /
              >
            }
            />

            <
            /div>
          );
        } else if (this.state.role === 1 && this.state.loggedIn === true) { //ADVISOR
          return ( <
            div >
            <
            Navbar loggedIn = {
              this.state.loggedIn
            }
            logout = {
              this.handleLogout
            }
            role = {
              this.state.role
            }
            />

            <
            Route exact path = "/Login"
            render = {
              (props) => //DEFAULT
              <
              EditSchedule
              id = {
                this.state.id
              }
              />}/ >
              <
              Route exact path = "/EditSchedule"
              render = {
                (props) =>
                <
                EditSchedule
                id = {
                  this.state.id
                }
                />}/ >
                <
                Route exact path = "/Appointments"
                render = {
                  (props) =>
                  <
                  Appointments /
                  >
                }
                /> < /
                div >
              );
            }
          }
        }

        export default App;
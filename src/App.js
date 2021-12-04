import { React, Component } from 'react';
import User from './User'
import './App.css';

const api = "https://api.hatchways.io/assessment/students"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonUsers: []
    }
  }

  fetchData = (key) => {
    fetch(key)
    .then(res => res.json())
    .then(({students}) => {
      this.setState({
        jsonUsers: students,
      })
    })
    .catch(err => {
      console.log('Error:' + err)
    })
    
  }

  componentDidMount() {
    this.fetchData(api)
  }

  // getUserInfo = (data) => {
  //   const {firstName, lastName, email, company, skill} = data;
  //   return `${firstName} ${lastName} ${email} ${company} ${skill}`
  // }

  getUserPic = (data) => {
    const {pic} = data;
    return `${pic}`
  }

  getUserAverage = (grades) => {
    return grades.reduce((a,b) => (Number(a) + Number(b))) / grades.length;
  }

  renderUser({userData, userPic, userAverage}) {
    return(
      <div> 
        <User
          userInfo={userData}
          userPic={userPic}
          userAverage={userAverage}
        />
      </div>
    )
  }

  render () {
    const {jsonUsers} = this.state;

    return (
      <div className="App">
        
        {
          jsonUsers.map((user, index) => (
            <div key={index}>
              {this.renderUser({
                userData: user,
                userPic: this.getUserPic(user),
                userAverage: this.getUserAverage(user.grades),
              })}
              {console.log(user)}
            </div>
          ))
        }
        {/* {JSON.stringify(jsonUsers, null, 2) }  */}
      </div>
    );
  }
}

export default App;
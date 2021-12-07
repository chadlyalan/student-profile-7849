import { React, Component } from 'react';
import User from './User'


const api = "https://api.hatchways.io/assessment/students"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonUsers: [],
      query: '',
      tag: '',
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

  // handleTagSearch = (childData) => {
  //   this.setState({tag: childData})
  // }

  renderUser({userData, userPic, userAverage, tagData}) {
    userData.tag = tagData;
    console.log(userData);
   

    return(
      <div> 
        <User
          userInfo={userData}
          userPic={userPic}
          userAverage={userAverage}
          parentHandle={this.handleTagSearch}
        />
      </div>
    )
  }

  render () {
    const {jsonUsers, query, tag} = this.state;

    return (
      <div className="App">
        <div className = "searchBox">
          <input 
            type="text"
            className="searchBar"
            placeholder="Search by name"
            onChange={e => this.setState({query: e.target.value})}
            value={query}
          />
          <input 
            type="text"
            className="searchBar"
            placeholder="Search by name"
            onChange={e => this.setState({query: e.target.value})}
            value={query}
          />
        </div>
        {
          jsonUsers.filter((item) => {
            if (query === '') {
              return item;
            }
            else if (item.firstName.toLowerCase().includes(query.toLowerCase())) {
              return item
            }
            else if (item.lastName.toLowerCase().includes(query.toLowerCase())) {
              return item
            }
            else {
              return null;
            }
          }).map((user, index) => (
            <div key={index}>
              {this.renderUser({
                userData: user,
                userPic: this.getUserPic(user),
                userAverage: this.getUserAverage(user.grades),
                userGrades: user.grades,
                tagData: tag,
                })
                  
                }
                
            </div>
          ))
        }
      
      </div>
    );
  }
}

export default App;
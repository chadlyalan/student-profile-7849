import { React, Component } from 'react';
import User from './User'


const api = "https://api.hatchways.io/assessment/students"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonUsers: [],
      query: '',
      tagQuery: '',
    }
  }

  fetchData = (key) => {
    if (this.state.jsonUsers.length < 1){
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
  }

  componentDidMount() {
    this.fetchData(api)
  }

  getUserPic = (data) => {
    const {pic} = data;
    return `${pic}`
  }

  getUserAverage = (grades) => {
    return grades.reduce((a,b) => (Number(a) + Number(b))) / grades.length;
  }

   handleTagSearch = (childData) => {
     console.log(childData)
     this.setState({
       jsonUsers: childData
     })

     console.log(this.state.jsonUsers)
   }

  renderUser({userData, userPic, userAverage, key }) {   

    return(
      <div> 
        <User
          index={key}
          userInfo={userData}
          userPic={userPic}
          userAverage={userAverage}
          all={this.state.jsonUsers}
          parentHandle={this.handleTagSearch}
        />
      </div>
    )
  }

  tagSearch = (array, query) => {
    let result = [];
    array.filter((item) => {
      if (query === '') {
        return result.push(item);
      }
      else if (item.tag.length) {
        item.tag.every((piece) => {
          if (piece.toLowerCase().includes(query.toLowerCase())) {
            result.push(item);
            return false;
          }
          else {
            return true;
          }
        }) 
      } 
      return null;
      
    })
    return result;
  }

  search = (array, searchQuery) => {
    let result = [];
    array.filter((item) => {
      if (searchQuery === '') {
        return result.push(item);
      }
      else if (item.firstName.toLowerCase().includes(searchQuery.toLowerCase())) {
        return result.push(item)
      }
      else if (item.lastName.toLowerCase().includes(searchQuery.toLowerCase())) {
        return result.push(item)
      }
      else {
        return null;
      }
    })
      
    return result;
  }

  render () {
    const {jsonUsers, query, tagQuery} = this.state;

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
            placeholder="Search by tag"
            onChange={e => this.setState({tagQuery: e.target.value})}
            value={tagQuery}
          />
        </div>
        {console.log('here ', jsonUsers[0])}
        {
          
          this.tagSearch(this.search(jsonUsers, query),tagQuery)
          .map((user, index) => (
            <div key={index}>
              {this.renderUser({
                key: index,
                userData: user,
                userPic: this.getUserPic(user),
                userAverage: this.getUserAverage(user.grades),
                userGrades: user.grades,
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
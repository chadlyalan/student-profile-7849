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

  // our fetch function, pretty simple, but we're also
  // going to loop through each item and add a tag attribute
  // for future tag adding
  // we also want to make sure it runs just once otherwise
  // componentDidMount might trigger it and wipe our tag data

  fetchData = (key) => {
    if (this.state.jsonUsers.length < 1){
      fetch(key)
    .then(res => res.json())
    .then(({students}) => {
      students.map((item) => {
        item.tag = [];
        return null;
      })
      this.setState({
        jsonUsers: students,
      })
      
    })
    .catch(err => {
      console.log('Error:' + err)
    })
    }
  }

  // all this guys has to do is get us our data
  componentDidMount() {
    this.fetchData(api)
  }
  
  // this is the updateUser function that will be passed
  // down to the child Component so that the Child
  // can update the parent state value
  updateUsers = (user) => {
    const updatedUsers = this.state.jsonUsers;
    updatedUsers[user.id - 1] = user;
    this.setState({
      jsonUsers: updatedUsers
    })
   }
  
  // Simple render component function that receives a single 
  // user object and sends that user as well as the updateUser
  // function.
  renderUser({userData}) {   
    return(
      <div> 
        <User
          userInfo={userData}
          updateUser={this.updateUsers}
        />
      </div>
    )
  }

  // iterate through the list of users and build a new array
  // of the users that have tags that match the search query
  // then return that.
  // i had to use .every so that i could break out of the loop
  // after finding a tag that matched the query for the user.
  
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

  // very similar to the tagSearch, this search just looks through the firstname
  // and lastname attributes and returns the new list of users to render
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

  // render has 3 parts. render the search by name input
  // render the search by tag input
  // and render the list of users to display
  // it calls both searches and gets the list so that only the 
  // users that should be displayed are being displayed.

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
        {
          this.tagSearch(this.search(jsonUsers, query),tagQuery)
          .map((user, index) => (
            <div key={index}>
              {this.renderUser({
                userData: user,
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
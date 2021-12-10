import React, {Component } from 'react';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadGrades: false,
            buttonValue: '+',
            tagField: '',
        }
    }
    
    // User functions!

    // grabbing the average value of an array of numbers:
    getUserAverage = (grades) => {
        return grades.reduce((a,b) => (Number(a) + Number(b))) / grades.length;
    }

    // A simple button toggle function that also sets a boolean
    // to indicate whether or not User should show a list of grades.
    handleToggleButton = () => {
        const {loadGrades, buttonValue} = this.state;

        this.setState({
            loadGrades: !loadGrades,
        });

       (buttonValue === '+') ? 
            this.setState({buttonValue: '-'})
        :
            this.setState({buttonValue: '+'})
    }

    // Handle adding a tag to the user object then passing
    // that new user up to the app so that it can update
    // the full list of users with the new user object.
    addTag = (event) => {
        const {userInfo} = this.props;

        if (event.key === 'Enter') {
            
            if (userInfo.tag) {
                userInfo.tag.push(event.target.value)
            }
            else {
                userInfo.tag[0] = event.target.value;
            }
            this.props.updateUser(userInfo);

            this.setState({
                tagField: ''
            })

        }
    }

    render() {
        // lets destructure the user into some variables below
        // then grab the state variables we're going to use in our render as well
        const {userInfo} = this.props;
        const {company, email, firstName, lastName, skill, tag, pic, grades } = userInfo;
        const {buttonValue, loadGrades, tagField} = this.state;
        return (
            <div className="userCard">
                <div>
                    <img
                        className="picture"
                        src={pic}
                        alt=""
                    />
                </div>

                {/* our main display of user Data goes here */}
                <div className="userInfo">
                    <strong className="name">{firstName} {lastName}</strong>  
                    <div className="data">
                        <p className="email">Email: {email}</p> 
                        <p className="company">Company: {company}</p> 
                        <p className="skill">Skill: {skill}</p>
                        <p className="average">Average: {this.getUserAverage(grades)}%</p>
                    {/* if we should load grades, iterate through them and display them! */}
                        {
                            loadGrades ?
                            (userInfo.grades.map((item, i) => (
                                <p key={i}>Test {i+1}: &nbsp;&nbsp;&nbsp;{item}%</p>)))
                            : null
                        }
                    {/* if there are tags, show them. if not...these must not be the right droids */}
                        <div className={tag.length > 0 ? 'tags' : 'nothing'}>
                        {
                            tag.length >= 1 ?
                            (tag.map((item, index) => (
                                <div key={index}>{item}&nbsp; </div>
                            ))) 
                            : <div>{tag} </div>
                        }
                        </div>
                    {/* Here is our input to add a tag and call addTag when we hit enter */}
                        <input 
                            type="text"
                            className="tagField"
                            placeholder="Add a tag"
                            onChange={e => this.setState({tagField: e.target.value})}
                            value={tagField}
                            onKeyPress={e => this.addTag(e)}
                        />
                    </div>
                </div> 
                {/* finally our toggle button way out on the side of the user's card */}
                <div className="toggle">
                    <button 
                    onClick={this.handleToggleButton}
                    >{buttonValue}</button>  
                </div>    
            </div>
        )
    }
}

export default User;
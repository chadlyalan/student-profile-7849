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
 
    getUserAverage = (grades) => {
        return grades.reduce((a,b) => (Number(a) + Number(b))) / grades.length;
    }

    // to do:

    // then the parent function receives the new modified user
    // and app updates the jsonUsers with the new user, remember
    // there is an ID for each user in that jsonobject
    // 
    // 
    // 
    //
    // Possibly make a new Users component that recieves
    // the entire list of users and renders everything 
    // without searching.
    // 
    //
    // <Users /> => <User /> => <Tags /> => <Tag />

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

    onTrigger = (event) => {
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
                <div className="userInfo">
                    <strong className="name">{firstName} {lastName}</strong>  

                    <div className="data">
                        <p className="email">Email: {email}</p> 
                        <p className="company">Company: {company}</p> 
                        <p className="skill">Skill: {skill}</p>
                        <p className="average">Average: {this.getUserAverage(grades)}%</p>
                        {
                            loadGrades ?
                            (userInfo.grades.map((item, i) => (
                                <p key={i}>Test {i+1}: &nbsp;&nbsp;&nbsp;{item}%</p>)))
                            : null
                        }
                        <div className={tag.length > 0 ? 'tags' : 'nothing'}>
                        {
                            tag.length >= 1 ?
                            (tag.map((item, index) => (
                                <div key={index}>{item}&nbsp; </div>
                            ))) 
                            : <div>{tag} </div>
                        }
                        </div>
                        <input 
                            type="text"
                            className="tagField"
                            placeholder="Add a tag"
                            onChange={e => this.setState({tagField: e.target.value})}
                            value={tagField}
                            onKeyPress={e => this.onTrigger(e)}
                        />
                    </div>
                </div> 
                
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
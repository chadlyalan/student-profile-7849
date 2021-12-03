import React, {Component } from 'react';

class User extends Component {

    render() {
        
        const {userInfo, userPic, userAverage} = this.props;
        const {company, email, firstName, lastName, skill} = userInfo;
        console.log(userInfo)
        return (
            <div>
            <img
                src={userPic}
                alt=""
            />
            <p className="name">{firstName} {lastName}</p> 
            <p className="email">Email: {email}</p> 
            <p className="company">Company: {company}</p> 
            <p className="skill">Skill: {skill}</p>
            <p className="average">Average: {userAverage}</p>                      
            </div>
        )
    }
}

export default User;
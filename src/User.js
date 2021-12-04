import React, {Component } from 'react';

class User extends Component {

    render() {
        
        const {userInfo, userPic, userAverage} = this.props;
        const {company, email, firstName, lastName, skill} = userInfo;
        console.log(userInfo)
        return (
            <div className="userCard">
            <div>
                <img
                    className="picture"
                    src={userPic}
                    alt=""
                />
            </div>
            <div className="userInfo">
                <strong className="name">{firstName} {lastName}</strong> 
                <div className="data">
                    <p className="email">Email: {email}</p> 
                    <p className="company">Company: {company}</p> 
                    <p className="skill">Skill: {skill}</p>
                    <p className="average">Average: {userAverage}</p>
                </div>
                 
            </div>
                              
            </div>
        )
    }
}

export default User;
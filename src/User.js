import React, {Component } from 'react';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadGrades: false,
            buttonValue: '+',
            tagField: '',
        }
        this.props.userInfo.tag = [];
    }

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
            //all[key].tag = userInfo.tag;
            //console.log(all[index]);
            
            // this.props.parentHandle(index);
            
            

            this.setState({
                tagField: ''
            })

        }
    }

    render() {
        
        const {userInfo, userPic, userAverage} = this.props;
        const {company, email, firstName, lastName, skill, tag} = userInfo;
        const {buttonValue, loadGrades, tagField} = this.state;
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
                        <p className="average">Average: {userAverage}%</p>
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
import React, { Component } from 'react';
import config from '../config.js';
const firebase = require('firebase')

export class Comment extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            name: '',
            description: '',
            statements: '',
            visibility: 'private',
            email: '',
        }
    }

    componentDidMount(){

        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }

        firebase.database().ref('data').on('value', snapshot => {

            let data = snapshot.val();
            let newData = [];
            let month = ["January", "February", "March", "April", "May", "June", "July", "Auguest",
                "September", "October", "Novmber", "December"];
            for (let index in data) {
                let d = new Date(data[index].date);
                let date = month[d.getMonth()]+"/"+d.getDate()+"/"+d.getFullYear()+",   "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
                newData.push({
                    date: date,
                    name: data[index].name,
                    description: data[index].description,
                    statements: data[index].statements,
                    visibility: data[index].visibility,
                    email: data[index].email,

                })
            }
            this.setState({data: newData});
        })
    }



    helper = (event) => {
        event.preventDefault();
        if (this.state.name === '') {
            alert("Missing component! What is your name?");
        }
        else if (this.state.statements === '') {
            alert("Missing component! What have you to say?");
        }
        else {
            let formObj = {
                name: this.state.name,
                description: this.state.description,
                statements: this.state.statements,
                visibility: this.state.visibility,
                email: this.state.email,
                date: firebase.database.ServerValue.TIMESTAMP,
            };
            firebase.database().ref('data').push().set(formObj);
            this.setState({shouldUpdate: true});
            alert("We get your message!");
        }
    }

    do_change = (event) => {
        let field = event.target.name;
        let value = event.target.value;
        this.setState({[field]: value});
    }

    render() {
        return (
            <div>


                {/*left comments form*/}

                <div className='CommentPage'>
                    <div className='form'>
                        <form onSubmit={this.helper}>
                            <h2>Leave your message here!</h2>

                            <p>

                                <h4>
                                    <dot>*</dot> May I know your name? <br/>
                                    <input name='name' type='text' minLength='6' maxLength='19'  onChange={this.do_change}
                                           style={{ height: "18px", fontSize: 17, fontFamily: 'Comic Sans MS'}}/>
                                </h4>


                                <h4> Offer a short description of yourself. <br/>
                                    <input name='description' type='text' maxLength='99' onChange={this.do_change}
                                           style={{ height: "18px", fontSize: 17, fontFamily: 'Comic Sans MS'}}/>
                                </h4>



                                <h4><dot>*</dot> What have you to say? <br/>
                                    <textarea name='statements' minLength='16' maxLength='499' onChange={this.do_change}></textarea>
                                </h4>



                                <h4><dot>*</dot> Would you like your name and message to be viewable by the other guests of this site? <br/>
                                    <select id='visibility' name='visibility' onChange={this.do_change} style={{ fontSize: 17, fontFamily: 'Comic Sans MS'}}>
                                        <option value='private'>No</option>
                                        <option value='public'>Yes</option>
                                    </select>
                                </h4>

                                <h4>If you would like me to be able to contact you, what is your email? (email will not be posted)
                                    <input name='email' type='text'  onChange={this.do_change}
                                           style={{ height: "18px", fontSize: 17, fontFamily: 'Comic Sans MS'}}/>
                                </h4>





                                <h4><dot>*</dot> means required</h4>
                                <div>
                                    <input type='submit' id='submit' name='submit' value='Submit'></input>
                                </div>


                            </p>

                        </form>
                    </div>





                    {/*here is the output*/}


                    <div className='out_put'>
                        <h2 >Comment</h2>
                        {this.state.data.map((eachInfo) => {
                            if(eachInfo.visibility !== 'private') {

                                return (
                                    <div>
                                        <br/><span className='date'>{eachInfo.date}</span><br/>
                                        <span className='name'>{eachInfo.name}</span> <br/>
                                        <span >{eachInfo.description}</span> <br/>
                                        <span >{eachInfo.statements}</span>
                                        <br/>
                                        <br/>

                                    </div>
                                )

                            }
                        })}
                    </div>

                </div>
            </div>
        );
    }
}
export default Comment;

import React, { Component } from 'react';

import './App.css'
import Body from './Components/Body'
import TabList from './Components/TabList'

const firebase = require('firebase')

export class App extends Component{
  constructor(){
    super();
    this.state ={
      activeTab: 1
    }
    this.changeTab = (id) => {
      this.setState({
        activeTab: id
      })
    }
  }
  render(){
    const tabs = [
    {
      id:1,
      title: 'Home'
    },

    {
      id:2,
      title: 'Images'
    },

    {
      id:3,
      title: 'Videos'
    },

    {
      id:4,
      title: 'Projects'
    },

    {
      id:5,
      title: 'Message board'
    },

    {
      id:6,
      title: 'Movies'
    },

    {
      id:7,
      title: 'Add Movies'
    },

    {
      id:8,
      title: 'Create Lists'
    },

    {
      id:9,
      title: 'Graph'
    }

    ]


    return(



      <div className= "body">

        <div className = "header">
          <h1>Welcome to my website!</h1>
        </div>



        <div className ="nav-bar">


          < TabList tabs={tabs}
          changeTab={this.changeTab}

          activeTab={this.state.activeTab} />


        </div>


        <div className ="main-body">
          <Body activeTab={this.state.activeTab}/>
        </div>

        <div className="copyright">
              <p>@ Copyright 2020, Haochen Yang</p>
        </div>


      </div>

      );
  }
}


export default App;

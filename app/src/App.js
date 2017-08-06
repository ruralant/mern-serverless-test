import React, { Component } from 'react';
import Axios from 'axios';

import logo from './logo.svg';

import TaskList from './components/tasklist/tasklist';
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      tasks: []
    };

    this.apiUrl = 'https://wt-ffb9faabd5f6ace7c622628438105abf-0.run.webtask.io/mern-serverless';

    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    Axios.get(this.apiUrl).then(({data}) => {
      this.setState({tasks: data});
    });
  }

  handleEdit(id) {
    this.openModal(this.state.tasks.find(x => x._id === id));
  }

  handleDelete(id) {
    // dehete task from API
    Axios.delete(`${this.apiUrl}?id=${id}`)
     .then(() => {
       // delete task from task list
       const updateTasks = this.state.tasks.findIndex(x => x._id === id);
       this.setState({states: [...this.state.tasks.splice(updateTasks, 1)]});
     });
  }

  render() {
    return (
      <div className="App">
        <div className="col-md-4 col-md-offset-4 Task">

          <div className="TaskHeader">
            <h2>Tasks</h2>
          </div>
          {/* pass stories and 
          event handlers down to TaskList*/}
          <TasksList
              stories={this.state.tasks}
              handleEdit={this.handleEdit}
              handleDelete={this.handleDelete}
          />

          <div className="TaskFooter">
            <p>Thank you!</p>
          </div>
        </div>
        <TaskButton handleClick={this.openModal.bind(this, null)} />
      </div>
    );
  }
}

export default App;

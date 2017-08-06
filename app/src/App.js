import React, { Component } from 'react';
import Axios from 'axios';

import TaskButton from './components/TaskButton/TaskButton';
import LoadingSpinner from './components/Spinner/Spinner';
import TaskList from './components/TaskList/TaskList';
import TaskModal from './components/TaskModal/TaskModal';
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      isLoading: false,
      tasks: [],
      task: {
        author: '',
        content: '',
        _id: undefined
      }
    };

    this.apiUrl = 'https://wt-ffb9faabd5f6ace7c622628438105abf-0.run.webtask.io/mern-serverless/tasks';

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});
    Axios.get(this.apiUrl).then(({data}) => {
      this.setState({tasks: data});
      this.setState({isLoading: false});
    });
  }

  openModal(task) {
    this.setState({modalIsOpen: true});
    if(task) {
      this.setState({task});
    }
  }

  closeModal(model) {
    this.setState({modalIsOpen: false});
    if(model) {
      this.setState({isLoading: true});
      if(!model._id) {
        Axios.post(this.apiUrl, model).then(({data}) => {
          this.setState({tasks: [data, ...this.state.tasks]});
          this.setState({isLoading: false});
        });
      } else {
        Axios.put(`${this.apiUrl}?id=${model._id}`, model).then(({data}) => {
          const taskToUpdate = this.state.tasks.find(x => x._id === model._id);
          const updatedTask = Object.assign({}, taskToUpdate, data);
          const newTasks = this.state.tasks.map(task => {
            if(data._id === task._id) return updatedTask;
            return task;
          });
          this.setState({tasks: newTasks});
          this.setState({isLoading: false});
        });
      }
    }
    this.setState({task: {
      author: '',
      content: '',
      _id: undefined
    }});
  }

  handleEdit(id) {
    this.openModal(this.state.tasks.find(x => x._id === id));
  }

  handleDelete(id) {
    this.setState({isLoading: true});
    Axios.delete(`${this.apiUrl}?id=${id}`).then(() => {
      const updatedTasks = this.state.tasks.findIndex(x => x._id === id);
      this.setState({states: [...this.state.tasks.splice(updatedTasks, 1)]});
      this.setState({isLoading: false});
    });
  }

  render() {

    return (
      <div className="App">
        <div className="col-md-4 col-md-offset-4 Task">

          <div className="TaskHeader">
            <h2>Tasks</h2>
          </div>

          <TaskList
              tasks={this.state.tasks}
              handleEdit={this.handleEdit}
              handleDelete={this.handleDelete}
          />

          <div className="TaskFooter">
            <p>Thank you!</p>
          </div>

        </div>
        <TaskModal
            modalIsOpen={this.state.modalIsOpen}
            task={this.state.task}
            closeModal={this.closeModal}
        />
        <LoadingSpinner isLoading={this.state.isLoading} />
        <TaskButton handleClick={this.openModal.bind(this, null)} />
      </div>
    );
  }
}

export default App;
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Timeline from './components/Timeline';
import NewItemForm from './components/NewItemForm';
import {Button, Drawer, IconButton} from '@material-ui/core';
import PlusIcon from '@material-ui/icons/AddCircleOutline';
import CloseIcon from '@material-ui/icons/Close';

const SharedContext = React.createContext();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'light',
      isFormHidden: true
    };
    this.toggleForm = this.toggleForm.bind(this);
  }

  toggleForm() {
    this.setState({
      isFormHidden: ! this.state.isFormHidden
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <Timeline />
        <SharedContext.Provider value={{
          theme: this.state.theme, 
          isFormHidden: this.state.isFormHidden,
          toggleForm: this.toggleForm 
          }}>
          <Button 
            variant="contained" 
            color={this.state.isFormHidden? `primary` : `default`} 
            onClick={this.toggleForm}
            style={{margin: "2em 0"}}
          >
            <PlusIcon />
          </Button>
          <Drawer variant="temporary" open={! this.state.isFormHidden}>
            <IconButton variant="contained" color="inherit" onClick={this.toggleForm}><CloseIcon /></IconButton>
            <NewItemForm hidden={this.state.isFormHidden} />
          </Drawer>
        </SharedContext.Provider>
      </div>
    );
  }
}

export default App;
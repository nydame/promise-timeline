import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Timeline from './components/Timeline';

const SharedContext = React.createContext();

class App extends Component {
  constructor(props) {
    super(props);
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
        <SharedContext.Provider value={{x: 100, y: "hello"}}>
          <Timeline></Timeline>
          <NewItemForm></NewItemForm>
        </SharedContext.Provider>
      </div>
    );
  }
}


function NewItemForm(props) {
  return (<div>Form component here.</div>);
}

export default App;

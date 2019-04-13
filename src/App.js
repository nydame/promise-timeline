import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const SharedTimelineContext = React.createContext();

class App extends Component {
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
        <SharedTimelineContext.Provider value={{x: 100, y: "hello"}}>
          <Timeline></Timeline>
          <NewItemForm></NewItemForm>
        </SharedTimelineContext.Provider>
      </div>
    );
  }
}

function Timeline(props) {
  return (<ul>Timeline component here. I will show a timeline item for every event or reminder.
    <li>
      <TimelineItem></TimelineItem>
    </li>
  </ul>);
}

class TimelineItem extends React.Component {
  static contextType = SharedTimelineContext;

  render() {
    return (<p>This is a timeline event using {this.context.y}.</p>);
  }
}

function NewItemForm(props) {
  return (<div>Form component here.</div>);
}

export default App;

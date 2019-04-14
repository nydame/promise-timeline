import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import api from './data/apiConfig';
import {Get} from 'react-axios';

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

class Timeline extends Component {
  static constextType = SharedContext;
  render() {
    return (
      <Get url="/events-reminders" instance={api}>{(err, res, isLoading, makeRequest, axios) => {
        if (err) {
          return (<div className="error">Error: {err.message} <TryAgainLink path="/"></TryAgainLink></div>);
        } else if (isLoading) {
          return (<div className="loading">Just a minute&hellip;</div>);
        } else if (res !== null) {
          // define "now" in milliseconds
          const now = new Date().getTime();
          return (<ul>
            {res.data.map((item, key) => {
              const {date, attendable, attended, clientId, type} = item;
              return (<li key={key}><TimelineItem 
                future={(parseInt(date) > now)? true : false}
                date={parseInt(date)} 
                attendable={(attendable === "true")? true : false} 
                attended={(attended === "true")? true : false} 
                clientId={parseInt(clientId)} 
                type={type}></TimelineItem></li>);
            })}
          </ul>);
        } else {
          return (<div>Time line cannot be loaded at this time.</div>);
        }
      }}</Get>
    );
  }
}

function TimelineItem(props) {
  const extraClass = (props.future)? " future" : "";
  switch (props.type) {
    case "court":
      return (<section className={`timeline-item-court${extraClass}`}>
        <span className="timeline-date">{props.date}</span>
        <span className="timeline-icon">{props.type} icon</span>
        <h1>Court Date</h1>
      </section>);
      break;
    case "case":
      return (<section className={`timeline-item-case${extraClass}`}>
          <span className="timeline-date">{props.date}</span>
          <span className="timeline-icon">{props.type} icon</span>
          <h1>Case Manager Appointment</h1>
        </section>);
      break;
    case "":
    default:
      break;
  }
  return (
    <section>
      <span className="date">{props.date}</span>
    </section>
  );
}

// class TimelineItem extends React.Component {
//   static contextType = SharedContext;

//   render() {
//     return (<p>This is a timeline event using {this.context.theme} theme.</p>);
//   }
// }

function NewItemForm(props) {
  return (<div>Form component here.</div>);
}

function TryAgainLink(props) {
  return (<a className="App-link" href={`${props.path}`}>Try again</a>);
}

export default App;

import React, { Component } from 'react';
import api from '../data/apiConfig';
import { Get } from 'react-axios';

class Timeline extends Component {
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
                            const { date, attendable, attended, clientId, type } = item;
                            return (<li key={key}><TimelineItem
                                future={(parseInt(date) > now) ? true : false}
                                date={parseInt(date)}
                                attendable={(attendable === "true") ? true : false}
                                attended={(attended === "true") ? true : false}
                                clientId={parseInt(clientId)}
                                type={type}></TimelineItem></li>);
                        })}
                    </ul>);
                } else {
                    return (<div>Time line cannot be loaded at this time. <TryAgainLink path="/"></TryAgainLink></div>);
                }
            }}</Get>
        );
    }
}

function TimelineItem(props) {
    const extraClass = (props.future) ? " future" : "";
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

function TryAgainLink(props) {
    return (<a className="App-link" href={`${props.path}`}>Try again</a>);
}

export default Timeline;
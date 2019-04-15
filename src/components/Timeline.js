import React, { Component } from 'react';
import api from '../data/apiConfig';
import { Get } from 'react-axios';
import './Timeline.css';
import AlarmIcon from '@material-ui/icons/AlarmOutlined';
import DateRangeIcon from '@material-ui/icons/DateRange';

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
                    let wasPast = true;
                    return (<ul className="timeline">
                        {res.data.map((item, key) => {
                            const { date, attendable, attended, clientId, type, event, message } = item;
                            // distinguish items in the future
                            let extraClass = (parseInt(date) > now)? "future" : "";
                            if (extraClass && wasPast) {
                                extraClass += " first";
                                wasPast = false;
                            }
                            // for reminders, find associated event & client
                            let associatedEvent = {};
                            if (event) {
                                const eventInfo = event.split('-');
                                associatedEvent = res.data.find(eventObj => eventObj.date === eventInfo[0] && eventObj.clientId === eventInfo[1]);
                               
                            }

                            return (<li className={extraClass} key={key}><TimelineItem
                                date={new Date(parseInt(date)).toUTCString()}
                                attendable={(attendable === "true") ? true : false}
                                attended={(attended === "true") ? true : false}
                                clientId={parseInt(clientId)}
                                type={type || "reminder"}
                                associatedEventType={associatedEvent.type}
                                message={message}></TimelineItem></li>);
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
    switch (props.type) {
        case "court":
            return (<section className={`timeline-item-${props.type}`}>
                <span className="timeline-date">{props.date}</span>
                <span className="timeline-icon"><DateRangeIcon /></span>
                <h1>Court Date</h1>
                </section>);
            break;
        case "case":
            return (<section className={`timeline-item-${props.type}`}>
                <span className="timeline-date">{props.date}</span>
                <span className="timeline-icon"><DateRangeIcon /></span>
                <h1>Case Manager Appointment</h1>
                </section>);
            break;
        case "reminder":
            let eventDescription = "";
            switch (props.associatedEventType) {
                case "court":
                    eventDescription += "Court Date";
                    break;
                case "case":
                    eventDescription += "Case Manager Appointment";
                    break;
                case "":
                default:
                    break;
            }
            return (<section className={`timeline-item-${props.type}`}>
                <span className="timeline-date">{props.date}</span>
                <span className="timeline-icon"><AlarmIcon /></span>
                <h1>Reminder Regarding Your {eventDescription}</h1>
                <p>{props.message}</p>
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
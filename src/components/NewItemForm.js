import React, {Component} from 'react';
import {Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from '@material-ui/core';
import Axios from 'axios';
import qs from 'qs';

class NewItemForm extends Component {
    constructor(props) {
        super(props);
        const nowArr = new Date().toISOString().split(':');
        this.state = {
            newTimelineItem: {
                date: nowArr[0] + ":" + nowArr[1],
                name: "",
                type: "",
                event: "",
                message: "",

            }
        };
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleDateChange(ev) {
        this.setState({
            newTimelineItem: Object.assign(this.state.newTimelineItem, {date: ev.target.value})
        });
    }

    handleNameChange(ev) {
        this.setState({
            newTimelineItem: Object.assign(this.state.newTimelineItem, {name: ev.target.value})
        });
    }

    handleTypeChange(ev) {
        this.setState({
            newTimelineItem: Object.assign(this.state.newTimelineItem, {type: ev.target.value})
        });
    }
// TODO all-purpose change handler
    // handleFormInput(ev) {
    //     const key = ev.target.name;
    //     this.setState({
    //         newTimelineItem: Object.assign(this.state.newTimelineItem, {key: ev.target.value})
    //     });
    // }

    handleSubmit(ev) {
        const dateInMillisecondsString = "" + new Date(this.state.newTimelineItem.date).getTime();
        const clientId = "" + 1; // TODO - calculate client ID from table of clients fetched from API
        let request = "";
        let isAttendable = "false";

        switch (this.state.newTimelineItem.type) {
            case "court":
                request += "/event/court";
                isAttendable = "true";
                break;
            case "case":
                request += "/event/case";
                isAttendable = "true";
                break;
            case "reminder":
                // request += "reminder"; TODO - API route does not yet exist
                break;
            default:
                break;
        }

        const postData = {
            date: dateInMillisecondsString,
            clientId: clientId,
            attendable: isAttendable,
            attended: "false",
            type: this.state.newTimelineItem.type
        }

        if (request.length) {
            Axios.post("http://localhost:8000" + request, qs.stringify(postData)).catch(
                // TODO
            );
        } 
    }

    render() {
        const display = this.props.hidden? "none" : "block";
        return (<form className="new-item-form" style={{display}} onSubmit={this.handleSubmit}>
            Use this form to add an appointment or reminder to the timeline
            <Divider />
            <TextField 
                id="date" 
                name="date" 
                type="datetime-local" 
                autoFocus={true} 
                label="When?" 
                required={true} 
                value={this.state.newTimelineItem.date} 
                onChange={this.handleDateChange} 
            />
            <TextField 
                id="name" 
                name="name" 
                type="text" 
                label="Who?" 
                required={true} 
                value={this.state.newTimelineItem.name} 
                onChange={this.handleNameChange} 
            />
            <FormControl component="fieldset">
                <FormLabel component="legend"></FormLabel>
                <RadioGroup
                    aria-label="Event Type"
                    name="type"
                    value={this.state.newTimelineItem.type}
                    onChange={this.handleTypeChange}
                >
                    <FormControlLabel control={<Radio />} value="court" label="Court Date" />
                    <FormControlLabel control={<Radio />} value="case" label="Appointment with Case Manager" />
                    <FormControlLabel control={<Radio />} value="reminder" label="Reminder" />
                </RadioGroup>
            </FormControl>
            <Divider />
            <input type="submit" value="Add this to the timeline" />
        </form>);
    }
}

export default NewItemForm;

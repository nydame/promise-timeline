import React, {Component} from 'react';
import {Divider} from '@material-ui/core';
import Axios from 'axios';

class NewItemForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newTimelineItem: {
                date: new Date().getTime(),
                attendable: false,
                attended: false,
                clientId: null,
                type: null,
                event: null,
                message: null

            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(ev) {
        // change state in response to user input
    }

    handleSubmit(ev) {
        // use Axios to post to API
        // remember to change date string to milliseconds
    }

    render() {
        const display = this.props.hidden? "none" : "block";
        return (<form className="new-item-form" style={{display}} onSubmit={this.handleSubmit}>
            Use this form to add an event to the timeline
            <Divider />
            <label for="date-picker">Choose date of event</label>
            <input type="date" id="date-picker" name="date-picker" value={new Date().toLocaleDateString} />
            <label for="time-picker">Choose time of event</label>
            <input type="time" id="time-picker" name="time-picker" value={new Date().toLocaleTimeString} />
            <input type="submit" value="Submit" />
        </form>);
    }
}

export default NewItemForm;

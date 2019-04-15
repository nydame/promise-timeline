import React, {Component} from 'react';
import {Divider} from '@material-ui/core';

function NewItemForm(props) {
    const display = props.hidden? "none" : "block";
    return (<div className="new-item-form" style={{display}}>Form component here.<Divider /></div>);
}

export default NewItemForm;

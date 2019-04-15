import React from 'react';
import HeartIcon from '@material-ui/icons/FavoriteBorder';

function Footer(props) {
    return (<footer className="App-footer">
        Made with <HeartIcon /> and React, {new Date('2019-04-15 03:57:00 GMT-0700').toDateString()}
    </footer>);
}

export default Footer;
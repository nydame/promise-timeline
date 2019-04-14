// import React from 'react';
import axios from 'axios';
// import {AxiosProvider, Get} from 'react-axios';

const api = axios.create({
    baseURL: "http://localhost:8000",
    timeout: 3000
});

export default api;
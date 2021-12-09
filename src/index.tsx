import React from 'react';
import ReactDOM from 'react-dom'
import { App } from './pages/app'
import { axiosService } from 'axios-services';
import { filterCode } from './utils/resultCode';

document.body.setAttribute('theme-mode', 'dark')

axiosService.setFilterCode(filterCode);

ReactDOM.render(<App />, document.getElementById('root'));
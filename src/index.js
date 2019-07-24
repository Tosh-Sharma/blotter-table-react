import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import MainApp from './App';

ReactDOM.render(
    <MainApp />,
    document.getElementById('MainApp')
  );

registerServiceWorker();

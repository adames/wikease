import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import 'react-responsive-carousel/lib/styles/carousel.css';
import 'react-responsive-carousel/lib/styles/examples/presentation/presentation.css';


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

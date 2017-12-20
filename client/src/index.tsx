import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './styles/css/index.css';

//Match {pattern = path, exactly = exact}
//Miss is gone, use Switch instead
import {
    BrowserRouter
} from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';
import App from './containers/App';

const Root = () => {
    return (
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    );
};


ReactDOM.render(
    <Root/>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();

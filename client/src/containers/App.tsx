import * as React from 'react';
import { IState, IProduct } from '../common/types';
import Products from '../components/Products';
import ProductDetails from '../components/ProductDetails';
import NotFound from '../components/NotFound';
import {
    Route,
    Switch
} from 'react-router-dom';

const logo = require('./logo.svg');

class App extends React.Component<any, IState> {
    constructor(props: any, context: any) {
        super(props, context);
    }

    render() {
        return (
            <div className="App">
                <div className="header row">
                    <div className="col-md-12">
                        <img src={logo} className="logo" alt="logo"/>
                        <h2>Welcome to Bluestone Homework</h2>
                        <div>Made with <span className="emoji">😀</span> in Gdańsk by Marek Zielonkowski</div>
                    </div>
                </div>
                <Switch>
                    <Route exact path="/" component={Products}/>
                    <Route path="/product/:productId" component={ProductDetails}/>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        );
    }
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';

import Header from './views/components/header/Header';
import Footer from './views/components/footer/Footer';
import Home from './views/components/home/Home';
import NotFound from './views/components/not-found/NotFound';

ReactDOM.render(
    <React.Fragment>
        <Header />
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={Home} />
                <Route path="*" component={NotFound} />
            </Switch>
        </ BrowserRouter>
        <Footer />
    </React.Fragment>

    , document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import IndexPage from './pages/IndexPage';
import BookPage from './pages/BookPage';
import AddBookPage from './pages/AddBookPage';

import Menu from './components/Menu';

import reportWebVitals from './reportWebVitals';
import { Provider, rootStore } from './stores/RootStore';

import './styles/global.scss';

ReactDOM.render(
    <React.StrictMode>
        <Provider value={rootStore}>
            <BrowserRouter>
                <Menu />
                <Switch>
                    <Route exact path="/">
                        <IndexPage />
                    </Route>
                    <Route exact path="/book/:id">
                        <BookPage />
                    </Route>

                    <Route exact path="/add-book">
                        <AddBookPage />
                    </Route>
                </Switch>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';

import { BrowserRouter, Route, Link } from 'react-router-dom';

const PageOne = () => {
    return (
        <div>
            Page One
            <Link to="/two">Let's go to Page Two</Link>
        </div>
    );
}

const PageTwo = () => {
    return (
        <div>
            Page Two
            <Link to="/">Let's go to Page One</Link>
        </div>
    )
}

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Route path="/" component={PageOne} />
                <Route path="/two" component={PageTwo} />
            </BrowserRouter>
        </div>
    );
}

export default App;
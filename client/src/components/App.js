import React from 'react';

import { BrowserRouter, Route, Link } from 'react-router-dom';

import StreamCreate from './streams/StreamCreate'
import StreamList from './streams/StreamList';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamShow from './streams/StreamShow';

//import NotFoundError from './NotFoundError';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Route path="/streams/new" exact component={StreamCreate} />
                <Route path="/streams/delete" exact component={StreamDelete} />
                <Route path="/" exact component={StreamList} />
                <Route path="/streams/edit" exact component={StreamEdit} />
                <Route path="/streams/show" exact component={StreamShow} />

            </BrowserRouter>
        </div>
    );
}

export default App;
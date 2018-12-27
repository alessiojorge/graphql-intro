import React, { Component } from 'react';
import './App.css';

import { BookList, AddBook } from '../components';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BookList />

        <AddBook />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './BookList.css';

import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

export class BookList extends Component {
  displayBooksHandler = () => {
    const data = this.props.data;
    if (data.loading) {
      return 'loading books...';
    } else {
      return data.books.map(book => {
        return <li key={book.id}>{book.name}</li>;
      });
    }
  };
  render() {
    console.log(this.props.data);
    return (
      <div>
        <h1>BOOKS:</h1>
        <ul className="book-list">{this.displayBooksHandler()}</ul>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);

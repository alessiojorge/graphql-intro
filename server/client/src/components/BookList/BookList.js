import React, { Component } from 'react';
import './BookList.scss';
import BookDetails from './BookDetails/BookDetails';

import { graphql } from 'react-apollo';
import { getBooksQuery } from '../../queries/queries';

export class BookList extends Component {
  state = {
    bookDetails: null
  };
  displayBooksHandler = () => {
    const data = this.props.data;
    if (data.loading) {
      return 'loading books...';
    } else {
      return data.books.map(book => {
        return (
          <li
            key={book.id}
            onClick={() => this.bookDetailsHandler(book.id)}
            className="books__list-item"
          >
            {book.name}
          </li>
        );
      });
    }
  };

  bookDetailsHandler = id => {
    this.setState({
      bookDetails: id
    });
  };
  render() {
    return (
      <div className="books">
        <h1 className="books__title">BOOKS:</h1>
        <ul className="books__list">{this.displayBooksHandler()}</ul>
        <BookDetails bookId={this.state.bookDetails} />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);

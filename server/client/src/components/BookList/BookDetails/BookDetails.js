import React, { Component } from 'react';
import './BookDetails.scss';

import { graphql } from 'react-apollo';
import { getBookQuery } from '../../../queries/queries';

export class BookDetails extends Component {
  render() {
    console.log(this.props.data);
    return (
      <div className="book">
        <p className="out">
          {this.props.data.book && this.props.data.book.genre}
        </p>
      </div>
    );
  }
}

export default graphql(getBookQuery, {
  options: props => {
    return {
      variables: {
        id: props.bookId
      }
    };
  }
})(BookDetails);

import React, { Component } from 'react';
import './AddBook.scss';

import { graphql, compose } from 'react-apollo';
import {
  getBooksQuery,
  getAuthorsQuery,
  addBookMutation
} from '../../queries/queries';

export class AddBook extends Component {
  state = {
    name: '',
    genre: '',
    author: ''
  };
  getAuthorsHandler = () => {
    const data = this.props.getAuthorsQuery;
    if (data.loading) {
      return (
        <option key={'loading'} value={'loading'} disabled>
          loading books...
        </option>
      );
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submitHandler = event => {
    event.preventDefault();

    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.author
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  };
  render() {
    return (
      <div className="add-book">
        <form onSubmit={this.submitHandler} className="form">
          <div className="form__input">
            <label className="form__input--label">Book Name:</label>
            <input
              className="form__input--input"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.changeHandler}
            />
          </div>

          <div className="form__input">
            <label className="form__input--label">Genre:</label>
            <input
              className="form__input--input"
              type="text"
              name="genre"
              value={this.state.genre}
              onChange={this.changeHandler}
            />
          </div>

          <div className="form__input">
            <label className="form__input--label">Author:</label>
            <select
              className="form__input--input"
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.changeHandler}
            >
              {this.getAuthorsHandler()}
            </select>
          </div>

          <input
            type="submit"
            value="+"
            className="form__submit"
            disabled={
              this.state.name.length === 0 && this.state.genre.length === 0
            }
          />
        </form>
      </div>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);

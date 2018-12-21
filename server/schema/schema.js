const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLSchema
} = graphql;

//  Dummy data
const books = [
  {
    name: 'The First Book Ever Written',
    genre: 'Fiction',
    id: '1',
    authorId: '1'
  },
  {
    name: 'The Second Book Of Our Time',
    genre: 'Fantasy',
    id: '2',
    authorId: '3'
  },
  {
    name: 'The Book To Rule All Books',
    genre: 'Crime Thriller',
    id: '3',
    authorId: '2'
  },
  {
    name: 'Bible',
    genre: 'Fiction',
    id: '4',
    authorId: '1'
  },
  {
    name: 'The Scientific Metho',
    genre: 'Non-Fiction',
    id: '5',
    authorId: '2'
  }
];

const authors = [
  { name: 'Fredarick Harraday', age: '72', id: '1' },
  { name: 'Thomas Gunnarson', age: '41', id: '2' },
  { name: 'Lorrett Tolkien', age: '91', id: '3' }
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId });
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //  code to get data from DB source
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //  code to get data from DB source
        return _.find(authors, { id: args.id });
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        //  code to get data from DB source
        return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        //  code to get data from DB source
        return authors;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});

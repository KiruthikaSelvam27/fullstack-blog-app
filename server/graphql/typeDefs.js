const typeDefs = `#graphql
  type Post {
    id: ID!
    title: String!
    content: String!
    createdAt: String!
  }

  type Query {
    posts: [Post!]!
  }

  type Mutation {
    createPost(title: String!, content: String!): Post!
  }
`;

export default typeDefs;

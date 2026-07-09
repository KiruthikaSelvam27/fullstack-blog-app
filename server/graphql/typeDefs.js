const typeDefs = `#graphql
  type Post {
    id: ID!
    title: String!
    content: String!
    createdAt: String!
  }

  type PostsResult {
    items: [Post!]!
    totalCount: Int!
    hasMore: Boolean!
  }

  type Query {
    posts(limit: Int = 20, offset: Int = 0): PostsResult!
  }

  type Mutation {
    createPost(title: String!, content: String!): Post!
  }
`;

export default typeDefs;

import { getPosts, createPost } from '../services/post.service.js';

const resolvers = {
  Query: {
    posts: async (_, { limit, offset }) => getPosts({ limit, offset }),
  },

  Mutation: {
    createPost: async (_, { title, content }) => createPost({ title, content }),
  },

  Post: {
    id: (post) => post._id.toString(),
    createdAt: (post) => new Date(post.createdAt).toISOString(),
  },
};

export default resolvers;

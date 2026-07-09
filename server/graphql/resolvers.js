import { GraphQLError } from 'graphql';
import Post from '../models/Post.js';

const resolvers = {
  Query: {
    posts: async () => {
      return Post.find().sort({ createdAt: -1 });
    },
  },

  Mutation: {
    createPost: async (_, { title, content }) => {
      const trimmedTitle = title?.trim() ?? '';
      const trimmedContent = content?.trim() ?? '';

      if (trimmedTitle.length < 3) {
        throw new GraphQLError('Title must be at least 3 characters', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      if (trimmedContent.length < 10) {
        throw new GraphQLError('Content must be at least 10 characters', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      return Post.create({
        title: trimmedTitle,
        content: trimmedContent,
      });
    },
  },

  Post: {
    id: (post) => post._id.toString(),
    createdAt: (post) => post.createdAt.toISOString(),
  },
};

export default resolvers;

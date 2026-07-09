import { GraphQLError } from 'graphql';
import Post from '../models/Post.js';
import { assertValidPostInput } from '../utils/validation.js';
import {
  POSTS_DEFAULT_LIMIT,
  POSTS_MAX_LIMIT,
} from '../../shared/constants.js';

function normalizePagination(limit, offset) {
  const safeLimit = Math.min(Math.max(limit ?? POSTS_DEFAULT_LIMIT, 1), POSTS_MAX_LIMIT);
  const safeOffset = Math.max(offset ?? 0, 0);

  return { limit: safeLimit, offset: safeOffset };
}

async function getPosts({ limit, offset } = {}) {
  const pagination = normalizePagination(limit, offset);

  const [items, totalCount] = await Promise.all([
    Post.find()
      .sort({ createdAt: -1 })
      .skip(pagination.offset)
      .limit(pagination.limit)
      .lean(),
    Post.countDocuments(),
  ]);

  return {
    items,
    totalCount,
    hasMore: pagination.offset + items.length < totalCount,
  };
}

async function createPost(input) {
  try {
    const validated = assertValidPostInput(input);
    return await Post.create(validated);
  } catch (error) {
    if (error.name === 'ValidationError') {
      throw new GraphQLError(error.message, {
        extensions: { code: 'BAD_USER_INPUT' },
      });
    }
    throw error;
  }
}

export { getPosts, createPost };

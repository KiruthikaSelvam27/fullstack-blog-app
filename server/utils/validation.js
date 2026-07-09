import { GraphQLError } from 'graphql';
import { validatePostInput } from '../../shared/validation.js';

export function assertValidPostInput(input) {
  const result = validatePostInput(input);

  if (!result.isValid) {
    throw new GraphQLError(result.errors[0].message, {
      extensions: {
        code: 'BAD_USER_INPUT',
        fields: result.errors,
      },
    });
  }

  return {
    title: result.title,
    content: result.content,
  };
}

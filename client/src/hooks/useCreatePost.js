import { useState } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import { CREATE_POST, GET_POSTS } from '../graphql/operations';
import { POSTS_PAGE_SIZE } from '../constants/pagination';

const initialForm = { title: '', content: '' };

export default function useCreatePost({ onPostCreated } = {}) {
  const client = useApolloClient();
  const [form, setForm] = useState(initialForm);
  const [clientError, setClientError] = useState('');
  const [success, setSuccess] = useState(false);

  const [createPost, { loading, error }] = useMutation(CREATE_POST, {
    onCompleted: async () => {
      setForm(initialForm);
      setClientError('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);

      await client.refetchQueries({ include: [GET_POSTS] });
      onPostCreated?.();
    },
  });

  const updateField = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
    setClientError('');
    setSuccess(false);
  };

  const submitPost = async (validatedInput) => {
    await createPost({
      variables: {
        title: validatedInput.title,
        content: validatedInput.content,
      },
    });
  };

  const serverError = error?.graphQLErrors?.[0]?.message || error?.message;

  return {
    form,
    clientError,
    setClientError,
    success,
    loading,
    serverError,
    updateField,
    submitPost,
  };
}

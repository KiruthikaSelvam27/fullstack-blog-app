import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST, GET_POSTS } from '../graphql/operations';

const initialForm = { title: '', content: '' };

function AddPostForm() {
  const [form, setForm] = useState(initialForm);
  const [clientError, setClientError] = useState('');

  const [createPost, { loading, error }] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
    onCompleted: () => {
      setForm(initialForm);
      setClientError('');
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setClientError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const title = form.title.trim();
    const content = form.content.trim();

    if (title.length < 3) {
      setClientError('Title must be at least 3 characters.');
      return;
    }

    if (content.length < 10) {
      setClientError('Content must be at least 10 characters.');
      return;
    }

    await createPost({ variables: { title, content } });
  };

  const serverError = error?.graphQLErrors?.[0]?.message || error?.message;

  return (
    <div className="card form-card">
      <h2 className="card__title">Write a new post</h2>
      <p className="card__description">
        Add a title and content to publish your blog post.
      </p>

      <form className="form" onSubmit={handleSubmit}>
        <label className="form__field">
          <span>Title</span>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter post title"
            maxLength={200}
            disabled={loading}
          />
        </label>

        <label className="form__field">
          <span>Content</span>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Write your post content..."
            rows={8}
            disabled={loading}
          />
        </label>

        {(clientError || serverError) && (
          <p className="form__error" role="alert">
            {clientError || serverError}
          </p>
        )}

        <button className="button" type="submit" disabled={loading}>
          {loading ? 'Publishing...' : 'Publish Post'}
        </button>
      </form>
    </div>
  );
}

export default AddPostForm;

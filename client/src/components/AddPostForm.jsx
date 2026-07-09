import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST, GET_POSTS } from '../graphql/operations';

const initialForm = { title: '', content: '' };

function AddPostForm() {
  const [form, setForm] = useState(initialForm);
  const [clientError, setClientError] = useState('');
  const [success, setSuccess] = useState(false);

  const [createPost, { loading, error }] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
    onCompleted: () => {
      setForm(initialForm);
      setClientError('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setClientError('');
    setSuccess(false);
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
      <div className="form-card__header">
        <div className="form-card__icon" aria-hidden="true">✏️</div>
        <div>
          <h2 className="card__title">Create Post</h2>
          <p className="card__description">Share your story with the world</p>
        </div>
      </div>

      {success && (
        <div className="form__success" role="status">
          Post published successfully!
        </div>
      )}

      <form className="form" onSubmit={handleSubmit}>
        <label className="form__field">
          <span className="form__label">
            Title
            <span className="form__hint">{form.title.length}/200</span>
          </span>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Give your post a catchy title..."
            maxLength={200}
            disabled={loading}
          />
        </label>

        <label className="form__field">
          <span className="form__label">
            Content
            <span className="form__hint">{form.content.length} chars</span>
          </span>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Write something amazing..."
            rows={7}
            disabled={loading}
          />
        </label>

        {(clientError || serverError) && (
          <p className="form__error" role="alert">
            {clientError || serverError}
          </p>
        )}

        <button className="button button--primary" type="submit" disabled={loading}>
          {loading ? (
            <>
              <span className="button__spinner" aria-hidden="true" />
              Publishing...
            </>
          ) : (
            'Publish Post'
          )}
        </button>
      </form>
    </div>
  );
}

export default AddPostForm;

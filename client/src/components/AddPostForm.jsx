import { POST_RULES, validatePostInput } from '../utils/validation';
import useCreatePost from '../hooks/useCreatePost';

function AddPostForm({ onPostCreated }) {
  const {
    form,
    clientError,
    setClientError,
    success,
    loading,
    serverError,
    updateField,
    submitPost,
  } = useCreatePost({ onPostCreated });

  const handleChange = (event) => {
    const { name, value } = event.target;
    updateField(name, value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = validatePostInput(form);

    if (!result.isValid) {
      setClientError(result.errors[0].message);
      return;
    }

    await submitPost(result);
  };

  return (
    <div className="card form-card">
      <div className="form-card__header">
        <div className="form-card__icon" aria-hidden="true">
          ✏️
        </div>
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
            <span className="form__hint">
              {form.title.length}/{POST_RULES.title.max}
            </span>
          </span>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Give your post a catchy title..."
            maxLength={POST_RULES.title.max}
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

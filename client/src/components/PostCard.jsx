function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function PostCard({ post }) {
  return (
    <article className="card post-card">
      <div className="post-card__meta">
        <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
      </div>
      <h3 className="post-card__title">{post.title}</h3>
      <p className="post-card__content">{post.content}</p>
    </article>
  );
}

export default PostCard;

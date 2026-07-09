function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function getInitial(title) {
  return title.charAt(0).toUpperCase();
}

function estimateReadTime(content) {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function PostCard({ post, index }) {
  return (
    <article className="card post-card" style={{ '--delay': `${index * 0.06}s` }}>
      <div className="post-card__accent" aria-hidden="true" />
      <div className="post-card__top">
        <div className="post-card__avatar" aria-hidden="true">
          {getInitial(post.title)}
        </div>
        <div className="post-card__meta">
          <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
          <span className="post-card__dot" aria-hidden="true">·</span>
          <span>{estimateReadTime(post.content)}</span>
        </div>
      </div>
      <h3 className="post-card__title">{post.title}</h3>
      <p className="post-card__content">{post.content}</p>
    </article>
  );
}

export default PostCard;

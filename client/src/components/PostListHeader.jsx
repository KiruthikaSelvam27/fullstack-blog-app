function PostListHeader({ count, subtitle }) {
  return (
    <div className="post-list__header">
      <div>
        <h2 className="post-list__title">Latest Stories</h2>
        <p className="post-list__subtitle">{subtitle}</p>
      </div>
      {typeof count === 'number' && <span className="post-list__count">{count}</span>}
    </div>
  );
}

export default PostListHeader;

import PostCard from './PostCard';

function PostList({ posts }) {
  return (
    <div className="post-list">
      <div className="post-list__header">
        <div>
          <h2 className="post-list__title">Latest Stories</h2>
          <p className="post-list__subtitle">
            {posts.length === 0
              ? 'Be the first to publish something'
              : `${posts.length} post${posts.length === 1 ? '' : 's'} from the community`}
          </p>
        </div>
        <span className="post-list__count">{posts.length}</span>
      </div>

      {posts.length === 0 ? (
        <div className="empty-state card">
          <div className="empty-state__icon" aria-hidden="true">📝</div>
          <h3>No posts yet</h3>
          <p>Your blog is waiting for its first story. Use the form to publish one!</p>
        </div>
      ) : (
        <div className="post-grid">
          {posts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PostList;

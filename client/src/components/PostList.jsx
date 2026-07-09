import PostCard from './PostCard';

function PostList({ posts }) {
  return (
    <div className="post-list">
      <div className="post-list__header">
        <h2 className="post-list__title">Latest posts</h2>
        <span className="post-list__count">{posts.length}</span>
      </div>

      {posts.length === 0 ? (
        <div className="empty-state card">
          <h3>No posts yet</h3>
          <p>Create your first blog post using the form.</p>
        </div>
      ) : (
        <div className="post-grid">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PostList;

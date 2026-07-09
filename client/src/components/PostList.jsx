import PostCard from './PostCard';
import PostListHeader from './PostListHeader';
import Pagination from './Pagination';

function PostList({
  posts,
  totalCount,
  currentPage,
  totalPages,
  pageSize,
  loading,
  onPrevious,
  onNext,
}) {
  const start = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalCount);

  const subtitle =
    totalCount === 0
      ? 'Be the first to publish something'
      : `Showing ${start}–${end} of ${totalCount} post${totalCount === 1 ? '' : 's'}`;

  return (
    <div className="post-list">
      <PostListHeader count={totalCount} subtitle={subtitle} />

      {posts.length === 0 ? (
        <div className="empty-state card">
          <div className="empty-state__icon" aria-hidden="true">
            📝
          </div>
          <h3>No posts yet</h3>
          <p>Your blog is waiting for its first story. Use the form to publish one!</p>
        </div>
      ) : (
        <>
          <div className={`post-grid ${loading ? 'post-grid--loading' : ''}`}>
            {posts.map((post, index) => (
              <PostCard key={post.id} post={post} index={index} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={onPrevious}
            onNext={onNext}
            loading={loading}
          />
        </>
      )}
    </div>
  );
}

export default PostList;

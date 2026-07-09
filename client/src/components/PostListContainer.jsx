import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../graphql/operations';
import PostList from './PostList';

function PostSkeleton() {
  return (
    <div className="skeleton-card card">
      <div className="skeleton skeleton--avatar" />
      <div className="skeleton skeleton--line skeleton--short" />
      <div className="skeleton skeleton--line" />
      <div className="skeleton skeleton--line skeleton--medium" />
    </div>
  );
}

function PostListContainer() {
  const { data, loading, error } = useQuery(GET_POSTS);

  if (loading) {
    return (
      <div className="post-list">
        <div className="post-list__header">
          <div>
            <h2 className="post-list__title">Latest Stories</h2>
            <p className="post-list__subtitle">Loading posts...</p>
          </div>
        </div>
        <div className="post-grid">
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-card card state-card--error" role="alert">
        <div className="state-card__icon" aria-hidden="true">⚠️</div>
        <h3>Unable to load posts</h3>
        <p>{error.message}</p>
        <p className="state-card__hint">Please check your connection and try again.</p>
      </div>
    );
  }

  return <PostList posts={data?.posts ?? []} />;
}

export default PostListContainer;

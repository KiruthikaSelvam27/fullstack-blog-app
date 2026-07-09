import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../graphql/operations';
import { POSTS_PAGE_SIZE } from '../constants/pagination';
import PostList from './PostList';
import PostListHeader from './PostListHeader';
import PostSkeleton from './PostSkeleton';

function PostListContainer({ currentPage, onPageChange }) {
  const offset = (currentPage - 1) * POSTS_PAGE_SIZE;

  const { data, loading, error } = useQuery(GET_POSTS, {
    variables: { limit: POSTS_PAGE_SIZE, offset },
    notifyOnNetworkStatusChange: true,
  });

  const posts = data?.posts?.items ?? [];
  const totalCount = data?.posts?.totalCount ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / POSTS_PAGE_SIZE));

  const handlePrevious = () => {
    onPageChange(Math.max(1, currentPage - 1));
  };

  const handleNext = () => {
    onPageChange(Math.min(totalPages, currentPage + 1));
  };

  if (loading && !data) {
    return (
      <div className="post-list">
        <PostListHeader subtitle="Loading posts..." />
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
        <div className="state-card__icon" aria-hidden="true">
          ⚠️
        </div>
        <h3>Unable to load posts</h3>
        <p>{error.message}</p>
        <p className="state-card__hint">Please check your connection and try again.</p>
      </div>
    );
  }

  return (
    <PostList
      posts={posts}
      totalCount={totalCount}
      currentPage={currentPage}
      totalPages={totalPages}
      pageSize={POSTS_PAGE_SIZE}
      loading={loading}
      onPrevious={handlePrevious}
      onNext={handleNext}
    />
  );
}

export default PostListContainer;

import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../graphql/operations';
import PostList from './PostList';

function PostListContainer() {
  const { data, loading, error } = useQuery(GET_POSTS);

  if (loading) {
    return (
      <div className="state-card card">
        <div className="spinner" aria-hidden="true" />
        <p>Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-card card state-card--error" role="alert">
        <h3>Unable to load posts</h3>
        <p>{error.message}</p>
      </div>
    );
  }

  return <PostList posts={data?.posts ?? []} />;
}

export default PostListContainer;

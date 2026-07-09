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

export default PostSkeleton;

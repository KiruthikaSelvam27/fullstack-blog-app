function ErrorFallback() {
  return (
    <div className="state-card card state-card--error" role="alert">
      <div className="state-card__icon" aria-hidden="true">
        ⚠️
      </div>
      <h3>Something went wrong</h3>
      <p>Please refresh the page and try again.</p>
    </div>
  );
}

export default ErrorFallback;

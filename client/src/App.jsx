import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Header from './components/Header';
import AddPostForm from './components/AddPostForm';
import PostListContainer from './components/PostListContainer';
import ErrorFallback from './components/ErrorFallback';

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePostCreated = () => {
    setCurrentPage(1);
  };

  return (
    <div className="app">
      <div className="app__bg" aria-hidden="true">
        <div className="app__orb app__orb--1" />
        <div className="app__orb app__orb--2" />
        <div className="app__orb app__orb--3" />
      </div>

      <Header />
      <main className="main">
        <aside className="sidebar">
          <AddPostForm onPostCreated={handlePostCreated} />
        </aside>
        <section className="content">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <PostListContainer
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </ErrorBoundary>
        </section>
      </main>
    </div>
  );
}

export default App;

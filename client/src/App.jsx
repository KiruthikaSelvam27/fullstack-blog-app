import Header from './components/Header';
import AddPostForm from './components/AddPostForm';
import PostList from './components/PostListContainer';

function App() {
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
          <AddPostForm />
        </aside>
        <section className="content">
          <PostList />
        </section>
      </main>
    </div>
  );
}

export default App;

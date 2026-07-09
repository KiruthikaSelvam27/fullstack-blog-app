import Header from './components/Header';
import AddPostForm from './components/AddPostForm';
import PostList from './components/PostListContainer';

function App() {
  return (
    <div className="app">
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

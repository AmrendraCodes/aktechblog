import ArticlesList from '../components/ArticleList';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <ArticlesList />
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
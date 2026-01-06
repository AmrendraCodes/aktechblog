import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const ArticlesList = lazy(() => import("./components/ArticlesList"));
const BlogDetail = lazy(() => import("./components/BlogDetail"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-screen">
            <p className="text-lg text-gray-500">Loading page...</p>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<ArticlesList />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />

          <Route
            path="*"
            element={
              <div className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold">404</h1>
                <p className="mt-2 text-gray-600">Page not found</p>
              </div>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;

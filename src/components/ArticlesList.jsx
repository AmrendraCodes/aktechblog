import { useEffect, useState } from "react";
import { strapiService } from "../services/strapi";
import { Link } from "react-router-dom";
import "./ArticlesList.css";

const ArticlesList = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        strapiService
            .getArticles()
            .then((res) => {
                setArticles(res.data || []);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error loading articles:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="articles-loading-container">
                <p>Loading articles...</p>
            </div>
        );
    }

    return (
        <div className="articles-container">
            <h1 className="articles-title">Latest Articles</h1>

            <div className="articles-grid">
                {articles.map((article) => {
                    const image =
                        article.cover?.data?.attributes?.url
                            ? `http://localhost:1337${article.cover.data.attributes.url}`
                            : null;

                    return (
                        <div key={article.id} className="article-card">
                            {image && (
                                <img
                                    src={image}
                                    alt={article.Title}
                                    className="article-card-img"
                                />
                            )}

                            <div className="article-card-content">
                                <h3 className="article-card-title">
                                    {article.Title}
                                </h3>

                                <Link
                                    to={`/blog/${article.slug}`}
                                    className="article-read-more"
                                >
                                    Read More →
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ArticlesList;

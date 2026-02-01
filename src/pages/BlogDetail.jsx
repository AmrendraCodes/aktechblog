import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArticleBySlug } from "../utils/smartApi";
import "./BlogDetail.css";

const BlogDetail = () => {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadArticle = async () => {
            setLoading(true);

            try {
                if (!slug) {
                    setArticle(null);
                    return;
                }

                const result = await fetchArticleBySlug(slug);

                if (result) {
                    setArticle(result);
                } else {
                    setArticle(null);
                }
            } catch (error) {
                console.error("❌ BlogDetail error:", error);
                setArticle(null);
            } finally {
                setLoading(false);
            }
        };

        loadArticle();
    }, [slug]);

    if (loading) {
        return <div className="detail-loading">Loading...</div>;
    }

    if (!article) {
        return (
            <div className="detail-not-found">
                Article not found
            </div>
        );
    }

    // ✅ CLEAN DATA
    const title = article.title;
    const description = article.description || "No description available";
    const publishedAt = article.publishedAt;
    const image = article.image;

    return (
        <div className="detail-container">
            {image && (
                <img
                    src={image}
                    alt={title}
                    className="detail-image"
                />
            )}

            <h1 className="detail-title">{title}</h1>

            <p className="detail-date">
                {publishedAt
                    ? new Date(publishedAt).toDateString()
                    : ""}
            </p>

            <p className="detail-description">{description}</p>
        </div>
    );
};

export default BlogDetail;

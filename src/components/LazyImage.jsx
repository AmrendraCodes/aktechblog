import { useState, useRef, useEffect } from "react";
import "./LazyImage.css";

const LazyImage = ({
    src,
    alt,
    className = "",
    width,
    height,
    priority = false,
    placeholder = "blur"
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(priority);
    const [hasError, setHasError] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        if (priority) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: "50px", // Start loading 50px before image comes into view
            }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, [priority]);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    const handleError = () => {
        setHasError(true);
    };

    // Generate low-quality placeholder
    const placeholderSrc = placeholder === "blur"
        ? `data:image/svg+xml,%3Csvg width='${width || 400}' height='${height || 300}' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3C/svg%3E`
        : undefined;

    if (hasError) {
        return (
            <div
                className={`lazy-image-error ${className}`}
                style={{ width, height }}
            >
                <span className="error-text">Failed to load image</span>
            </div>
        );
    }

    return (
        <div className={`lazy-image-container ${className}`}>
            {/* Placeholder */}
            {!isLoaded && (
                <div
                    className="lazy-image-placeholder"
                    style={{ width, height }}
                />
            )}

            {/* Actual Image */}
            <img
                ref={imgRef}
                src={isInView ? src : placeholderSrc}
                alt={alt}
                width={width}
                height={height}
                loading={priority ? "eager" : "lazy"}
                decoding="async"
                onLoad={handleLoad}
                onError={handleError}
                className={`lazy-image-img ${isLoaded ? "is-loaded" : ""}`}
                style={{
                    width,
                    height,
                    objectFit: "cover"
                }}
            />
        </div>
    );
};

export default LazyImage;

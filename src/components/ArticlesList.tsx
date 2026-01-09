export const ArticlesList = () => {
  const articles = [
    { id: 1, title: 'First Article', description: 'This is my first article' },
    { id: 2, title: 'Second Article', description: 'This is my second article' },
  ]

  return (
    <div className="articles-list">
      <h2>My Articles</h2>
      {articles.map(article => (
        <article key={article.id}>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
        </article>
      ))}
    </div>
  )
}

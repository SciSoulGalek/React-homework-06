import { Link } from "react-router";

export default function Home() {
  return (
    <main className="page-container home-page">
      <section className="home-hero">
        <p className="eyebrow">YOUR GAMING JOURNEY STARTS HERE</p>

        <h1>
          Every game has a story.
          <br />
          <span>What's yours?</span>
        </h1>

        <p className="page-description">
          Discover new games, build your collection, and keep track
          of every adventure.
        </p>

        <div className="home-actions">
          <Link to="/games" className="add-button">
            Explore games
          </Link>

          <Link to="/dashboard" className="cancel-button">
            View dashboard
          </Link>
        </div>
      </section>

      <section className="home-features">
        <article>
          <h2>Discover</h2>
          <p>Explore a catalog of games across different genres and platforms.</p>
        </article>

        <article>
          <h2>Collect</h2>
          <p>Build your personal gaming library and organize your collection.</p>
        </article>

        <article>
          <h2>Track</h2>
          <p>Keep track of your progress, ratings, and gaming statistics.</p>
        </article>
      </section>
    </main>
  );
}

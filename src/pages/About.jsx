import { Link } from "react-router";

export default function About() {
  return (
    <main className="page-container about-page">
      <section className="page-heading">
        <div>
          <p className="eyebrow">ABOUT QUESTLOG</p>
          <h1>More than just a game list<span>.</span></h1>
          <p className="page-description">
            Questlog helps you organize your gaming life in one place.
          </p>
        </div>
      </section>

      <section className="about-content">
        <h2>Our purpose</h2>
        <p>
          Questlog is a game tracking application designed to help players
          discover games, manage their personal collections, and track their
          gaming progress.
        </p>

        <h2>What you can do</h2>
        <ul>
          <li>Explore a catalog of games.</li>
          <li>Search and filter games by genre and platform.</li>
          <li>Add games to your personal library.</li>
          <li>Track your progress with different statuses.</li>
          <li>View statistics about your collection.</li>
        </ul>

        <Link to="/games" className="add-button">
          Explore games
        </Link>
      </section>
    </main>
  );
}

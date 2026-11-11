import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { getGamesList } from "../services/gamesApi";

export default function Dashboard() {
  const [games, setGames] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const requestId = useRef(0);

  
  useEffect(() => {
    const currentRequest = ++requestId.current;
  
    setLoading(true);
    setError("");
  
    getGamesList("view=library&limit=1000")
      .then((result) => {
        if (currentRequest !== requestId.current) return;
      
        setGames(result.data);
        setLoading(false);
      })
      .catch((requestError) => {
        if (currentRequest !== requestId.current) return;
      
        setError(requestError.message);
        setLoading(false);
      });
    
    return () => {
      if (currentRequest === requestId.current) {
        requestId.current++;
      }
    };
  }, [refreshKey]);
  

  const filteredGames =
    filter === "all"
      ? games
      : games.filter((game) => game.status === filter);

  const completed = filteredGames.filter(
    (game) => game.status === "Completed"
  ).length;

  const playing = filteredGames.filter(
    (game) => game.status === "Playing"
  ).length;

  const ratedGames = filteredGames.filter(
    (game) => Number.isFinite(Number(game.rating))
  );

  const averageRating = ratedGames.length
    ? (
        ratedGames.reduce((sum, game) => sum + Number(game.rating), 0) /
        ratedGames.length
      ).toFixed(1)
    : "0.0";

  const genreStats = filteredGames.reduce((stats, game) => {
    stats[game.genre] = (stats[game.genre] || 0) + 1;
    return stats;
  }, {});

  const platformStats = filteredGames.reduce((stats, game) => {
    game.platforms?.forEach((platform) => {
      stats[platform] = (stats[platform] || 0) + 1;
    });
    return stats;
  }, {});

  function renderBreakdown(stats) {
    const entries = Object.entries(stats).sort((a, b) => b[1] - a[1]);
    const maximum = Math.max(...entries.map((item) => item[1]), 1);

    return entries.length ? (
      <div className="dashboard-breakdown">
        {entries.map(([name, count]) => (
          <div className="breakdown-item" key={name}>
            <div className="breakdown-label">
              <span>{name}</span>
              <strong>{count}</strong>
            </div>
            <div className="breakdown-track">
              <div
                className="breakdown-fill"
                style={{ width: `${(count / maximum) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p>No data available.</p>
    );
  }

  if (loading) {
    return <p className="status-message">Loading dashboard...</p>;
  }

  if (error) {
    return (
      <main className="page-container">
        <div className="status-message error-message">
          <p>{error}</p>
          <button onClick={() => {
            setError("");
            setLoading(true);
            setRefreshKey((current) => current + 1);
          }}>
            Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container dashboard-page">
      <section className="page-heading">
        <div>
          <p className="eyebrow">YOUR GAMING OVERVIEW</p>
          <h1>Dashboard<span>.</span></h1>
          <p className="page-description">
            A closer look at your gaming collection and progress.
          </p>
        </div>
      </section>

      <section className="dashboard-filter">
        <label htmlFor="dashboard-status">Filter by status:</label>
        <select
          id="dashboard-status"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        >
          <option value="all">All games</option>
          <option value="Want to Play">Want to Play</option>
          <option value="Playing">Playing</option>
          <option value="Completed">Completed</option>
          <option value="Dropped">Dropped</option>
        </select>
      </section>

      <section className="dashboard-stats">
        <article className="stat-card">
          <span>Total games</span>
          <strong>{filteredGames.length}</strong>
        </article>

        <article className="stat-card">
          <span>Completed</span>
          <strong>{completed}</strong>
        </article>

        <article className="stat-card">
          <span>Currently playing</span>
          <strong>{playing}</strong>
        </article>

        <article className="stat-card">
          <span>Average rating</span>
          <strong>{averageRating}/10</strong>
        </article>
      </section>

      <section className="dashboard-breakdowns">
        <article className="dashboard-panel">
          <h2>Games by genre</h2>
          {renderBreakdown(genreStats)}
        </article>

        <article className="dashboard-panel">
          <h2>Games by platform</h2>
          {renderBreakdown(platformStats)}
        </article>
      </section>

      <div className="dashboard-actions">
        <Link to="/games" className="add-button">
          Discover games
        </Link>
        <Link to="/library" className="cancel-button">
          View library
        </Link>
      </div>
    </main>
  );
}

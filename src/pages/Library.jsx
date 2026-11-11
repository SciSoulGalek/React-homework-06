import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import GameCard from "../components/GameCard";
import GameFilters from "../components/GameFilters";
import Pagination from "../components/Pagination";
import { getGamesList, removeFromLibrary, updateGame } from "../services/gamesApi";
import { initialDataSample } from "../services/initial-data-sample";

const genres = [...new Set(initialDataSample.map((game) => game.genre))].sort();

export default function Library() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const requestId = useRef(0);

  const [games, setGames] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const search = searchParams.get("search") || "";
  const genre = searchParams.get("genre") || "all";
  const platform = searchParams.get("platform") || "all";
  const status = searchParams.get("status") || "all";
  const sort = searchParams.get("sort") || "name";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  function updateFilters(changes) {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(changes).forEach(([key, value]) => {
      if (!value || value === "all" || (key === "page" && value === 1)) {
        nextParams.delete(key);
      } else {
        nextParams.set(key, String(value));
      }
    });

    setSearchParams(nextParams);
  }

  
  useEffect(() => {
    const currentRequest = ++requestId.current;

    const params = new URLSearchParams({
      search,
      genre,
      platform,
      status,
      sort,
      view: "library",
      page: String(page),
      limit: "12",
    });

    setLoading(true);
    setError("");

    getGamesList(params.toString())
      .then((result) => {
        if (currentRequest !== requestId.current) return;

        setGames(result.data);
        setTotal(result.total);
        setTotalPages(result.totalPages);
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
  }, [search, genre, platform, status, sort, page, refreshKey]);

  
  async function handleStatusChange(id, newStatus) {
    try {
      await updateGame(id, { status: newStatus });
      setRefreshKey((current) => current + 1);
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function handleRemove(id) {
    try {
      await removeFromLibrary(id);
      setRefreshKey((current) => current + 1);
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return (
    <main className="page-container">
      <section className="page-heading">
        <div>
          <p className="eyebrow">YOUR PERSONAL COLLECTION</p>
          <h1>My library<span>.</span></h1>
          <p className="page-description">
            Keep track of the games you want to play, are playing, or have completed.
          </p>
        </div>
        <div className="library-count">
          <strong>{total}</strong>
          <span>GAMES</span>
        </div>
      </section>

      <div className="games-actions">
        <button
          className="cancel-button"
          onClick={() => navigate("/games")}
        >
          Discover games
        </button>
        <button
          className="cancel-button"
          onClick={() => setSearchParams({})}
        >
          Clear filters
        </button>
      </div>

      <GameFilters
        view="library"
        search={search}
        setSearch={(value) => updateFilters({ search: value, page: 1 })}
        genre={genre}
        setGenre={(value) => updateFilters({ genre: value, page: 1 })}
        platform={platform}
        setPlatform={(value) => updateFilters({ platform: value, page: 1 })}
        status={status}
        setStatus={(value) => updateFilters({ status: value, page: 1 })}
        sort={sort}
        setSort={(value) => updateFilters({ sort: value, page: 1 })}
        genres={genres}
      />

      {error && (
        <div className="status-message error-message">
          <p>{error}</p>
          <button onClick={() => setRefreshKey((current) => current + 1)}>
            Try again
          </button>
        </div>
      )}

      {loading && <p className="status-message">Loading your library...</p>}

      {!loading && !error && games.length === 0 && (
        <div className="status-message empty-message">
          <h2>Your library is empty</h2>
          <p>Add games from Discover to start building your collection.</p>
          <button className="add-button" onClick={() => navigate("/games")}>
            Explore games
          </button>
        </div>
      )}

      {!loading && !error && games.length > 0 && (
        <>
          <div className="results-heading">
            <span>Showing {games.length} of {total} games</span>
          </div>

          <div className="game-grid">
            {games.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                view="library"
                onSelect={(id) => navigate(`/games/${id}`)}
                onStatusChange={handleStatusChange}
                onRemove={handleRemove}
              />
            ))}
          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={(value) => updateFilters({ page: value })}
          />
        </>
      )}
    </main>
  );
}
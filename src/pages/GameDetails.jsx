import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import {
  getGame,
  addToLibrary,
  removeFromLibrary,
  updateGame,
} from "../services/gamesApi";

export default function GameDetails() {
  const { id } = useParams();
  const requestId = useRef(0);

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  useEffect(() => {
    const currentRequest = ++requestId.current;
  
    setLoading(true);
    setError("");
    setGame(null);
  
    getGame(id)
      .then((result) => {
        if (currentRequest !== requestId.current) return;
      
        setGame(result);
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
  }, [id]);
  

  async function handleAddToLibrary() {
    try {
      const updatedGame = await addToLibrary(id);
      setGame(updatedGame);
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function handleStatusChange(event) {
    try {
      const updatedGame = await updateGame(id, {
        status: event.target.value,
      });
      setGame(updatedGame);
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function handleRemoveFromLibrary() {
    try {
      await removeFromLibrary(id);
      setGame((current) => ({
        ...current,
        inLibrary: false,
        status: null,
      }));
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  if (loading) {
    return <p className="status-message">Loading game details...</p>;
  }

  if (error || !game) {
    return (
      <main className="page-container">
        <div className="status-message error-message">
          <h2>{error === "Game not found" ? "Game not found" : "Something went wrong"}</h2>
          <p>{error || "This game does not exist."}</p>
          <Link to="/games">Back to games</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container">
      <Link to="/games">← Back to games</Link>

      <section className="game-details-page">
        <p className="eyebrow">GAME DETAILS</p>
        <h1>{game.name}</h1>

        <div className="details-grid">
          <p><strong>Genre:</strong> {game.genre}</p>
          <p><strong>Release year:</strong> {game.releaseYear}</p>
          <p><strong>Developer:</strong> {game.developer}</p>
          <p><strong>Rating:</strong> {game.rating}/10</p>
          <p><strong>Platforms:</strong> {game.platforms?.join(", ") || "Unknown"}</p>
          <p><strong>Library status:</strong> {game.inLibrary ? game.status || "In library" : "Not in library"}</p>
          <p><strong>Game ID:</strong> {game.id}</p>
        </div>

        <section className="details-actions">
          {game.inLibrary ? (
            <>
              <label htmlFor="game-status">Library status:</label>
              <select
                id="game-status"
                value={game.status}
                onChange={handleStatusChange}
              >
                {["Want to Play", "Playing", "Completed", "Dropped"].map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              
              <button className="cancel-button" onClick={handleRemoveFromLibrary}>
                Remove from library
              </button>
            </>
          ) : (
            <button className="add-button" onClick={handleAddToLibrary}>
              Add to library
            </button>
          )}
        </section>

        <section>
          <h2>About this game</h2>
          <p>{game.description || "No description available."}</p>
        </section>
      </section>
    </main>
  );
}

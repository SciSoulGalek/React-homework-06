import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(email, password);
      navigate("/profile");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      await loginWithGoogle();
      navigate("/profile");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-container login-page">
      <section className="login-card">
        <p className="eyebrow">WELCOME BACK</p>
        <h1>Your next adventure awaits<span>.</span></h1>
        <p className="page-description">
          Sign in to keep your collection and gaming progress in one place.
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {error && <p className="error-message">{error}</p>}

          <button className="add-button" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <button
            className="add-button"
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            Continue with Google
          </button>
        </form>

        <p className="login-note">
          Don't have an account? <Link to="/signup">Create one</Link>
        </p>

        <Link to="/games">Continue exploring games →</Link>
      </section>
    </main>
  );
}

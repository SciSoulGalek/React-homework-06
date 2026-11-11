import { useAuth } from "../contexts/AuthContext";
import "../App.css";

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <main className="profile-page">
      <div className="profile-card">
        <div className="profile-top">
          <div className="profile-avatar">
            {(user.displayName || user.email || "U")[0].toUpperCase()}
          </div>

          <h1>{user.displayName || "Player"}</h1>
          <p>{user.email}</p>
          <span className="profile-badge">Questlog Member</span>
        </div>

        <div className="profile-info">
          <div className="profile-info-row">
            <span>Email</span>
            <strong>{user.email}</strong>
          </div>

          <div className="profile-info-row">
            <span>Account ID</span>
            <strong>{user.uid}</strong>
          </div>

          <div className="profile-info-row">
            <span>Signed in with</span>
            <strong>
              {user.providerData?.[0]?.providerId === "google.com"
                ? "Google"
                : "Email"}
            </strong>
          </div>
        </div>

        <button className="profile-logout" onClick={logout}>
          Sign out
        </button>
      </div>
    </main>
  );
}

import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>My Profile</h1>
      <p>Email: {user.email}</p>
      <p>UID: {user.uid}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

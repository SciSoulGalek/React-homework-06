import { Outlet } from "react-router";
import { Suspense } from "react";
import NavBar from "../components/NavBar";

export default function RootLayout() {
  return (
    <>
      <NavBar />
      <main>
        <Suspense fallback={<p className="status-message">Loading page...</p>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}
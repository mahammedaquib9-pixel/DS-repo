import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center py-24 space-y-4">
      <p className="text-6xl font-extrabold gradient-text">404</p>
      <h1 className="text-xl">Page Not Found</h1>
      <Link to="/" className="btn-primary inline-block">Return Home</Link>
    </div>
  );
}

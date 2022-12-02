import "../styles/navbar.css";
import { Outlet, Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

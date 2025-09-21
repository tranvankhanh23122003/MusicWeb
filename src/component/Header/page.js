import React from "react";

export default function Header() {
  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">🎵</div>

      {/* Menu */}
      <nav className="nav">
        <a href="#">Home</a>
        <a href="#">Feed</a>
        <a href="#">Library</a>
      </nav>

      {/* Search */}
      <div className="search">
        <input type="text" placeholder="Search ... 🔎" />
      </div>

      {/* Actions */}
      <div className="actions">
        <button className="btn-pro">Try Artist Pro</button>
        <a href="#">For Artists</a>
        <button className="btn-upload">Upload</button>
        <img
          src="https://i.pravatar.cc/30"
          alt="avatar"
          className="avatar"
        />
        <span className="icon">🔔</span>
        <span className="icon">✉️</span>
      </div>
    </header>
  );
}

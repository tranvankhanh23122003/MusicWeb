"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Play, Users } from "lucide-react";

export default function Sidebar() {
 const [likes] = useState([
  { 
    title: "Cha Và Con Gái Thùy Chi Tấn Tài X", 
    plays: "16.8K", 
    likes: 266, 
    comments: 3,
    image: "/images/anh3.jpg" 
  },
  { 
    title: "Emad Yaghoubi - Reach (2019)", 
    plays: "25.5K", 
    likes: 207, 
    comments: 4,
    image: "/images/anh4.jpg"
  },
  { 
    title: "A Y Mặc Remix Tiktok ver2", 
    plays: "595K", 
    likes: 6466, 
    comments: 95,
    image: "/images/anh5.jpg"
  },
]);

  const [history] = useState([
    { title: "Tiếng Mưa Rào Rơi Trên Mái Nhà", plays: "767K", likes: 2853, comments: 40 , image: "/images/anh1.jpg"},
    { title: "El Dorado Dubstep Remix", plays: "50.8K", likes: 269, comments: 11 ,image: "/images/anh2.jpg" },
    { title: "Emad Yaghoubi - Reach (2019)", plays: "25.5K", likes: 207, comments: 4 ,image: "/images/anh6.jpg" },
  ]);
  const tools = [
    { name: "Promouvez", icon: Users },
    { name: "Remplace", icon: Heart },
    { name: "Partage", icon: Play },
    { name: "Masterisez", icon: Play },
  ];

  return (
    <aside className="sidebar">
      {/* Tools */}
      <section className="section">
        <h2 className="section-title">OUTILS POUR ARTISTES</h2>
        <div className="tools-grid">
          {tools.map(({ name, icon: Icon }, i) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              key={i}
              className="tool-button"
            >
              <Icon className="tool-icon" />
              {name}
            </motion.button>
          ))}
        </div>
        <p className="tools-note">
          Déverrouillez les outils de Artist à partir de <span className="highlight">40 000 ₲/mois.</span>
        </p>
      </section>

      {/* Suggestions */}
      <section className="section">
        <h2 className="section-title">ARTISTS YOU SHOULD FOLLOW</h2>
        <div className="suggestions-list">
          {[
            { name: "Monstercat", followers: "1.13M" },
            { name: "Prod.Vincent of Libra", followers: "345" },
            { name: "Flame Runner", followers: "2,776" },
          ].map((artist, i) => (
            <motion.div
              whileHover={{ x: 6 }}
              key={i}
              className="suggestion-item"
            >
              <div>
                <p className="artist-name">{artist.name}</p>
                <p className="artist-followers">{artist.followers} followers</p>
              </div>
              <button className="follow-button">Follow</button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Likes */}
      <section className="section">
  <div className="section-header">
    <h2 className="section-title">102 LIKES</h2>
    <button className="view-all-button">View all</button>
  </div>
  <div className="song-list">
    {likes.map((song, i) => (
      <motion.div
        whileHover={{ scale: 1.02 }}
        key={i}
        className="song-item"
      >
        <img src={song.image} alt={song.title} className="song-image" />
        <div className="song-info">
          <p className="song-title">{song.title}</p>
          <div className="song-meta">
            <span><Play className="icon" /> {song.plays}</span>
            <span><Heart className="icon" /> {song.likes}</span>
            <span>💬 {song.comments}</span>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</section>


      {/* History */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">LISTENING HISTORY</h2>
          <button className="view-all-button">View all</button>
        </div>
        <div className="song-list">
          {history.map((song, i) => (
            <motion.div
              whileHover={{ scale: 1.02 }}
              key={i}
              className="song-item"
            >
              <img src={song.image} alt={song.title} className="song-image" />
        <div className="song-info">

              <p className="song-title">{song.title}</p>
              <div className="song-meta">
                <span><Play className="icon" /> {song.plays}</span>
                <span><Heart className="icon" /> {song.likes}</span>
                <span>💬 {song.comments}</span>
              </div>
        </div>

            </motion.div>
          ))}
        </div>
      </section>

      {/* Mobile */}
      <section className="section">
        <h2 className="section-title">GO MOBILE</h2>
        <div className="mobile-links">
          <img src="/appstore.png" alt="App Store" className="mobile-badge" />
          <img src="/googleplay.png" alt="Google Play" className="mobile-badge" />
        </div>
      </section>
    </aside>
  );
}
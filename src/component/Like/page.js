"use client"; // client component bắt buộc

import React, { useRef, useEffect, useState } from "react";

export default function Like() {
  const songs = [
    {
      id: 1,
      title: "Emad Yaghoubi - Reach (2019)",
      artist: "Adriana Ahmadpour",
      cover: "/images/anh1.jpg",
      trackUrl: "https://soundcloud.com/adriana-ahmadpour/emad-yaghoubi-reach-2019",
    },
    {
      id: 2,
      title: "Alan Walker - Fade",
      artist: "Alan Walker",
      cover: "/images/anh2.jpg",
      trackUrl: "https://soundcloud.com/hoangson19051997/ly-nha-n-sa-u-tsb-remix-2021",
    },
    {
      id: 3,
      title: "San Holo - Light",
      artist: "San Holo",
      cover: "/images/anh3.jpg",
      trackUrl: "https://soundcloud.com/sanholobeats/light",
    },
    {
      id: 4,
      title: "ODESZA - A Moment Apart",
      artist: "ODESZA",
      cover: "/images/anh4.jpg",
      trackUrl: "https://soundcloud.com/odesza/a-moment-apart",
    },
    {
      id: 5,
      title: "ODESZA - A Moment Apart",
      artist: "ODESZA",
      cover: "/images/anh5.jpg",
      trackUrl: "https://soundcloud.com/odesza/a-moment-apart",
    },
    {
      id: 6,
      title: "ODESZA - A Moment Apart",
      artist: "ODESZA",
      cover: "/images/anh6.jpg",
      trackUrl: "https://soundcloud.com/odesza/a-moment-apart",
    },
  ];

  const listRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [cardActualWidth, setCardActualWidth] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  // Tính toán chiều rộng card và khoảng cách giữa các card khi mount
  useEffect(() => {
    if (listRef.current) {
      const list = listRef.current;
      const cards = list.querySelectorAll(".song-card");
      if (cards.length >= 2) {
        const computedCardWidth = cards[1].offsetLeft - cards[0].offsetLeft;
        setCardWidth(computedCardWidth);
        setCardActualWidth(cards[0].offsetWidth);
      } else if (cards.length === 1) {
        setCardWidth(cards[0].offsetWidth);
        setCardActualWidth(cards[0].offsetWidth);
      }
      // Cuộn đến vị trí ban đầu
      scrollToActive();
    }
  }, []);

  // Cuộn đến card đang active khi activeIndex thay đổi
  useEffect(() => {
    if (cardWidth > 0) {
      scrollToActive();
    }
  }, [activeIndex, cardWidth]);

  const scrollToActive = () => {
    if (listRef.current && cardWidth > 0) {
      const list = listRef.current;
      const offset = list.clientWidth / 2 - cardActualWidth / 2;
      const targetScroll = activeIndex * cardWidth - offset;
      const maxScroll = list.scrollWidth - list.clientWidth;
      const finalScroll = Math.max(0, Math.min(targetScroll, maxScroll));
      list.scrollTo({
        left: finalScroll,
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    const newIndex = (activeIndex - 1 + songs.length) % songs.length;
    setActiveIndex(newIndex);
    setShowOverlay(false); // Đóng overlay khi chuyển card
  };

  const scrollRight = () => {
    const newIndex = (activeIndex + 1) % songs.length;
    setActiveIndex(newIndex);
    setShowOverlay(false); // Đóng overlay khi chuyển card
  };

  const handleCoverClick = (index) => {
    console.log("Clicked index:", index, "Active index:", activeIndex); // Debug
    setSelectedSong(songs[index]);
    setShowOverlay(true);
    console.log("Opening overlay for song:", songs[index]); // Debug
  };

  const closeOverlay = () => {
    setShowOverlay(false);
    setSelectedSong(null);
    console.log("Overlay closed"); // Debug
  };

  return (
    <div className="like-section">
      <h2 className="like-title">More of what you like</h2>
      <div className="like-wrapper">
        <button className="arrow left" onClick={scrollLeft}>
          &lt;
        </button>
        <div className="like-list" ref={listRef}>
          {songs.map((song, index) => (
            <div
              key={song.id}
              className={`song-card ${index === activeIndex ? "active" : ""}`}
            >
              <img
                src={song.cover}
                alt={song.title}
                className="song-cover"
                onClick={() => handleCoverClick(index)}
              />
              <div className="song-info">
                <h3 className="song-title">{song.title}</h3>
                <p className="song-artist">{song.artist}</p>
              </div>
              {song.trackUrl && (
                <iframe
                  width="100%"
                  height="120"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
                    song.trackUrl
                  )}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
                ></iframe>
              )}
            </div>
          ))}
        </div>
        <button className="arrow right" onClick={scrollRight}>
          &gt;
        </button>
      </div>
      {showOverlay && selectedSong && (
        <div className={`overlay ${showOverlay ? "show" : ""}`} onClick={closeOverlay}>
          <div className="overlay-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeOverlay}>
              ×
            </button>
            <img
              src={selectedSong.cover}
              alt={selectedSong.title}
              className="overlay-cover"
            />
            <div className="overlay-info">
              <h3 className="overlay-title">{selectedSong.title}</h3>
              <p className="overlay-artist">{selectedSong.artist}</p>
            </div>
            {selectedSong.trackUrl && (
              <iframe
                width="100%"
                height="300"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
                  selectedSong.trackUrl
                )}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
              ></iframe>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
"use client";

import { useRef, useEffect, useState } from "react";

export default function MusicPlayer() {
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
  const iframeRefs = useRef([]);
  const formIframeRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [cardActualWidth, setCardActualWidth] = useState(0);
  const [playingSong, setPlayingSong] = useState(null);
  const [apiReady, setApiReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const [showForm, setShowForm] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  // Lấy chiều cao header để form không che
  useEffect(() => {
    const header = document.querySelector("header");
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }
  }, []);

  // Load SoundCloud API script
  useEffect(() => {
    if (!window.SC) {
      const script = document.createElement("script");
      script.src = "https://w.soundcloud.com/player/api.js";
      script.onload = () => {
        console.log("SoundCloud API loaded");
        setApiReady(true);
      };
      document.body.appendChild(script);
    } else {
      setApiReady(true);
    }
  }, []);

  // Điều chỉnh scroll cho active card
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
      scrollToActive();
    }
  }, []);

  useEffect(() => {
    if (cardWidth > 0) {
      scrollToActive();
    }
  }, [activeIndex, cardWidth]);

  // Quản lý phát nhạc và đồng bộ giữa player-bar và form
  useEffect(() => {
    if (!apiReady) return;

    iframeRefs.current.forEach((iframe, index) => {
      if (iframe) {
        const widget = window.SC.Widget(iframe);
        widget.setVolume(volume);
        if (index === playingSong) {
          widget.play();
          widget.getDuration((dur) => setDuration(dur / 1000));
          widget.bind(window.SC.Widget.Events.PLAY_PROGRESS, (data) => {
            setCurrentTime(data.currentPosition / 1000);
            // Đồng bộ thời gian với iframe trong form
            if (showForm && formIframeRef.current) {
              const formWidget = window.SC.Widget(formIframeRef.current);
              formWidget.seekTo(data.currentPosition);
            }
          });
          widget.bind(window.SC.Widget.Events.FINISH, () => {
            setPlayingSong(null);
            setCurrentTime(0);
          });
        } else {
          widget.pause();
        }
      }
    });

    // Đồng bộ trạng thái phát/dừng với iframe trong form
    if (showForm && formIframeRef.current && playingSong !== null) {
      const formWidget = window.SC.Widget(formIframeRef.current);
      formWidget.setVolume(volume);
      formWidget.play();
      formWidget.seekTo(currentTime * 1000);
    }

    return () => {
      iframeRefs.current.forEach((iframe) => {
        if (iframe) {
          const widget = window.SC.Widget(iframe);
          widget.unbind(window.SC.Widget.Events.PLAY_PROGRESS);
          widget.unbind(window.SC.Widget.Events.FINISH);
        }
      });
    };
  }, [playingSong, apiReady, volume, showForm]);

  const scrollToActive = () => {
    if (listRef.current && cardWidth > 0) {
      const list = listRef.current;
      const offset = list.clientWidth / 2 - cardActualWidth / 2;
      const targetScroll = activeIndex * cardWidth - offset;
      const maxScroll = list.scrollWidth - list.clientWidth;
      const finalScroll = Math.max(0, Math.min(targetScroll, maxScroll));
      list.scrollTo({ left: finalScroll, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    const newIndex = (activeIndex - 1 + songs.length) % songs.length;
    setActiveIndex(newIndex);
    if (playingSong !== null) {
      setPlayingSong(newIndex);
      setCurrentTime(0);
    }
  };

  const scrollRight = () => {
    const newIndex = (activeIndex + 1) % songs.length;
    setActiveIndex(newIndex);
    if (playingSong !== null) {
      setPlayingSong(newIndex);
      setCurrentTime(0);
    }
  };

  const togglePlay = (index) => {
    if (playingSong === index) {
      const widget = window.SC.Widget(iframeRefs.current[index]);
      widget.pause();
      if (showForm && formIframeRef.current) {
        const formWidget = window.SC.Widget(formIframeRef.current);
        formWidget.pause();
      }
      setPlayingSong(null);
      setCurrentTime(0);
    } else {
      setPlayingSong(index);
      if (showForm && formIframeRef.current) {
        const formWidget = window.SC.Widget(formIframeRef.current);
        formWidget.play();
      }
    }
  };

  // Xử lý kéo thanh thời gian
  const handleSeek = (e) => {
    if (playingSong === null || !apiReady) return;
    const newTime = (e.target.value / 100) * duration;
    const widget = window.SC.Widget(iframeRefs.current[playingSong]);
    widget.seekTo(newTime * 1000);
    if (showForm && formIframeRef.current) {
      const formWidget = window.SC.Widget(formIframeRef.current);
      formWidget.seekTo(newTime * 1000);
    }
    setCurrentTime(newTime);
  };

  // Xử lý thay đổi âm lượng
  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (showForm && formIframeRef.current) {
      const formWidget = window.SC.Widget(formIframeRef.current);
      formWidget.setVolume(newVolume);
    }
  };

  // Định dạng thời gian (mm:ss)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="container">
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
                <div className="relative">
                  <img src={song.cover} alt={song.title} className="song-cover" />
                  <button
                    className="play-button"
                    onClick={() => togglePlay(index)}
                  >
                    {playingSong === index ? "⏸" : "▶"}
                  </button>
                  <iframe
                    ref={(el) => (iframeRefs.current[index] = el)}
                    width="0"
                    height="0"
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay; encrypted-media"
                    src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
                      song.trackUrl
                    )}&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false`}
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
          <button className="arrow right" onClick={scrollRight}>
            &gt;
          </button>
        </div>
      </div>
      <div className="player-bar">
        <div className="player-controls">
          <button onClick={scrollLeft} className="control-button">
            &larr;
          </button>
          <button
            onClick={() => togglePlay(playingSong || 0)}
            className="control-button"
          >
            {playingSong !== null ? "⏸" : "▶"}
          </button>
          <button onClick={scrollRight} className="control-button">
            &rarr;
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-bar"
          />
        </div>
        <div className="player-progress">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleSeek}
            className="progress-bar"
          />
          <span>{formatTime(duration)}</span>
        </div>
        <div className="player-info">
          <img
            src={songs[playingSong || 0].cover}
            alt={songs[playingSong || 0].title}
            className="player-cover"
            onClick={() => setShowForm(true)}
          />
          <div className="player-text">
            <span className="player-title">{songs[playingSong || 0].title}</span>
            <span className="player-artist">{songs[playingSong || 0].artist}</span>
          </div>
          <div className="player-icons">
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
        </div>
      </div>
      {showForm && (
        <div className="form-container" style={{ top: `${headerHeight + 10}px` }}>
          <div className="form-content">
            <button className="close-button" onClick={() => setShowForm(false)}>
              &times;
            </button>
            <div className="form-main">
              <div className="form-left">
                <div className="form-text">
                  <span className="form-title">{songs[playingSong || 0].title}</span>
                  <span className="form-artist">{songs[playingSong || 0].artist}</span>
                </div>
                <iframe
                  ref={formIframeRef}
                  width="100%"
                  height="166"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
                    songs[playingSong || 0].trackUrl
                  )}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`}
                ></iframe>
              </div>
              <div className="form-right">
                <img
                  src={songs[playingSong || 0].cover}
                  alt={songs[playingSong || 0].title}
                  className="form-cover"
                />
                <div className="form-progress">
                  <span>{formatTime(currentTime)}</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={(currentTime / duration) * 100 || 0}
                    onChange={handleSeek}
                    className="progress-bar"
                  />
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>
            <div className="comment-section">
              <img src="/images/avatar.jpg" alt="Avatar" className="comment-avatar" />
              <input type="text" placeholder="Viết bình luận..." className="comment-input" />
              <button className="share-button">
                <svg className="share-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
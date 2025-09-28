"use client";
import { useParams, useRouter } from "next/navigation";

export default function SongDetail() {
  const params = useParams();
  const router = useRouter();
  const songId = parseInt(params.id);
  const songs = [
    {
      id: 1,
      title: "Emad Yaghoubi - Reach (2019)",
      artist: "Adriana Ahmadpour",
      cover: "/images/anh1.jpg",
      trackUrl: "https://soundcloud.com/adriana-ahmadpour/emad-yaghoubi-reach-2019",
      lyrics: `Verse 1:
Lost in the rhythm, feel the beat rise,
Chasing the stars under midnight skies.
Every step forward, we're breaking the chain,
Reaching for dreams in the pouring rain.

Chorus:
Reach, reach, to the heavens above,
Feel the fire, feel the love.
No holding back, we're soaring high,
With every heartbeat, we touch the sky.`,
    },
    {
      id: 2,
      title: "Alan Walker - Fade",
      artist: "Alan Walker",
      cover: "/images/anh2.jpg",
      trackUrl: "https://soundcloud.com/hoangson19051997/ly-nha-n-sa-u-tsb-remix-2021",
      lyrics: `Verse 1:
Fading lights, in the silent night,
Echoes calling, out of sight.
We move in shadows, feel the sound,
Lost in the music, we're unbound.

Chorus:
Fade away, let the melody stay,
Drift through the night, till the break of day.
No words to say, just let it play,
In the fade, we find our way.`,
    },
    {
      id: 3,
      title: "San Holo - Light",
      artist: "San Holo",
      cover: "/images/anh3.jpg",
      trackUrl: "https://soundcloud.com/sanholobeats/light",
      lyrics: `Verse 1:
In the dark, I see your glow,
A spark of hope, begins to show.
Through the storm, we'll find our way,
Your light will guide us to the day.

Chorus:
Light, shining bright in the night,
Hold on tight, we'll take flight.
No more fears, no more pain,
Your light will wash away the rain.`,
    },
    {
      id: 4,
      title: "ODESZA - A Moment Apart",
      artist: "ODESZA",
      cover: "/images/anh4.jpg",
      trackUrl: "https://soundcloud.com/odesza/a-moment-apart",
      lyrics: `Verse 1:
A fleeting moment, caught in time,
Your heart beats steady next to mine.
We drift apart, yet feel so near,
In every note, I find you here.

Chorus:
A moment apart, but we're not alone,
Together we rise, in the undertone.
Through every sound, our souls align,
Forever connected, in this design.`,
    },
    {
      id: 5,
      title: "ODESZA - A Moment Apart",
      artist: "ODESZA",
      cover: "/images/anh5.jpg",
      trackUrl: "https://soundcloud.com/odesza/a-moment-apart",
      lyrics: `Verse 1:
A fleeting moment, caught in time,
Your heart beats steady next to mine.
We drift apart, yet feel so near,
In every note, I find you here.

Chorus:
A moment apart, but we're not alone,
Together we rise, in the undertone.
Through every sound, our souls align,
Forever connected, in this design.`,
    },
    {
      id: 6,
      title: "ODESZA - A Moment Apart",
      artist: "ODESZA",
      cover: "/images/anh6.jpg",
      trackUrl: "https://soundcloud.com/odesza/a-moment-apart",
      lyrics: `Verse 1:
A fleeting moment, caught in time,
Your heart beats steady next to mine.
We drift apart, yet feel so near,
In every note, I find you here.

Chorus:
A moment apart, but we're not alone,
Together we rise, in the undertone.
Through every sound, our souls align,
Forever connected, in this design.`,
    },
  ];

  const song = songs.find((s) => s.id === songId);

  if (!song) {
    return <div>Song not found</div>;
  }

  return (
    <div className="song-detail">
      <button className="back-button" onClick={() => router.back()}>
        ← Back
      </button>
      <div className="overlay-left">
        <img src={song.cover} alt={song.title} className="overlay-cover" />
        <div className="overlay-info">
          <h3 className="overlay-title">{song.title}</h3>
          <p className="overlay-artist">{song.artist}</p>
        </div>
        {song.trackUrl && (
          <iframe
            width="100%"
            height="200"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
              song.trackUrl
            )}&color=%23ffffff&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
          ></iframe>
        )}
      </div>
      <div className="overlay-right">
        <h3 className="overlay-title">Lời bài hát</h3>
        <p className="lyrics">{song.lyrics}</p>
      </div>
    </div>
  );
}
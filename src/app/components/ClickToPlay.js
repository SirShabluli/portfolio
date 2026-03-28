"use client";
import { useRef, useState } from "react";

export default function ClickToPlay({ src, style, className }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
      setPlaying(false);
    } else {
      v.play();
      setPlaying(true);
    }
  }

  function handleEnded() {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    setPlaying(false);
  }

  function goFullscreen(e) {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.requestFullscreen) v.requestFullscreen();
    else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen(); // iOS Safari
  }

  return (
    <div className={`relative cursor-pointer ${className ?? ""}`} style={{ border: "0.5px solid rgba(255,255,255,0.2)", ...style }} onClick={toggle}>
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="metadata"
        onEnded={handleEnded}
        className="w-full h-full object-cover"
      />
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(255,255,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderTop: "10px solid transparent",
                borderBottom: "10px solid transparent",
                borderLeft: "16px solid white",
                marginLeft: 4,
              }}
            />
          </div>
        </div>
      )}
      {playing && (
        <button
          onClick={goFullscreen}
          className="absolute bottom-3 right-3 flex items-center justify-center"
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
          aria-label="Fullscreen"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
          </svg>
        </button>
      )}
    </div>
  );
}

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

  return (
    <div className={`relative cursor-pointer ${className ?? ""}`} style={style} onClick={toggle}>
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
            {/* Play triangle */}
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
    </div>
  );
}

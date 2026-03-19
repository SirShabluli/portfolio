"use client";

const CONFIG_TEXT = `particleCount: 210
particleSize: 0.02
particleSpeed: 0.01
particleColor: "#40ffff"
particleOpacity: 0.4
particleGlow: true
particleTrail: false
particleShape: "circle"
rainbowEffect: false
particleBlending: "normal"
particleDepthTest: true
particleDepthWrite: false
lifeCycleChanges: false
birthSize: 0.5
midLifeSize: 1
deathSize: 0.2
birthOpacity: 0
midLifeOpacity: 1
deathOpacity: 0
birthColor: null
midLifeColor: null
deathColor: null
colorTransitionSmooth: true
sizeTransitionSmooth: true
opacityTransitionSmooth: true
pulseEffect: false
pulseSpeed: 2
pulseIntensity: 0.3
sparkEffect: false
sparkFrequency: 0.1
sparkIntensity: 2
trailLength: 5
particleLifetime: 8
particleFadeIn: true
particleFadeOut: true
particleWaveIntensity: 1
particleRotation: false
particleRotationSpeed: 0.1
randomRotation: true
gravity: 0
wind: 0
turbulence: 0.2
drag: 0.98
bounce: 0
collisionDetection: false
magneticForce: 0
repulsionForce: 0.2
emitterPosition: { x: 0, y: 0, z: 10 }
emitterShape: "sphere"
emitterSize: 7.7
emitterDirection: "up"
emitRate: 100
burst: false
burstCount: 690
emitterRadius: 2
emitterHeight: 5
emitterAngle: 45
emitterCustomDirection: { x: 0, y: 1, z: 0 }
emitterVelocityVariation: 0.5
emitterPositionVariation: 0.3
burstInterval: 5
continuousEmission: true
warmUpTime: 2
movementBounds: null
wrapAround: false
killOutsideBounds: false
flockingBehavior: false
flockingRadius: 2
flockingStrength: 0.1
particleSpread: 20
particleVelocityVariation: 0.5
particleAcceleration: 0
particleSwirl: 0
particleAttractor: null
orbitMotion: false
orbitRadius: 3
orbitSpeed: 1
flicker: false
flickerSpeed: 1
morphing: false
particleGroups: 1
groupSpacing: 5
followMouse: false
mouseInfluenceRadius: 5
mouseInfluenceStrength: 0.5
screenBounce: false
gravityWells: []`;

export default function ConfigBackground() {
  return (
    <pre
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        margin: 0,
        padding: "2rem",
        color: "rgba(255,255,255,0.15)",
        fontFamily: "'NarkissYairMono-Regular', monospace",
        fontSize: "0.875rem",
        lineHeight: 1.2,
        whiteSpace: "pre",
        columnWidth: "220px",
        columnGap: "2rem",
        overflow: "hidden",
        pointerEvents: "none",
        userSelect: "none",
        zIndex: -1,
      }}
    >
      {CONFIG_TEXT.repeat(4)}
    </pre>
  );
}

// A drawn sludge frame: a talking clip stacked on gameplay, plus the
// transcript. This is what Visual-Qwen looks at before it answers.
export default function SludgeFrame() {
  return (
    <svg
      viewBox="0 0 360 560"
      role="img"
      aria-label="A split-screen short-form video: a person talking in the top half, hypnotic gameplay in the bottom half, with a transcript, labeled sludge."
      className="h-auto w-full max-w-[18rem]"
    >
      <rect x="0.5" y="0.5" width="359" height="559" fill="#ffffff" stroke="#0e1217" />
      <rect x="1" y="1" width="358" height="279" fill="#eceef2" />
      <circle cx="180" cy="120" r="44" fill="#0e1217" />
      <path d="M100 280 C110 200 250 200 260 280 Z" fill="#0e1217" />
      <rect x="1" y="280" width="358" height="279" fill="#0e1217" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path
          key={i}
          d={`M${40 + i * 56} 560 L${170 + i * 4} 280`}
          stroke="#5b6470"
          strokeWidth="1"
        />
      ))}
      {[320, 372, 424, 476, 528].map((y, i) => (
        <rect
          key={y}
          x={90 + (i % 3) * 70}
          y={y}
          width="40"
          height="22"
          fill={i % 2 ? "#d5202f" : "#ffffff"}
        />
      ))}
      <rect x="20" y="236" width="320" height="32" fill="#ffffff" />
      <text x="30" y="258" fontSize="15" fill="#0e1217">
        “…and that is the story of how he lost…”
      </text>
      <text x="30" y="40" fontSize="14" fill="#5b6470">
        talking clip
      </text>
      <text x="30" y="312" fontSize="14" fill="#8f97a3">
        gameplay
      </text>
      <rect x="240" y="500" width="100" height="40" fill="#d5202f" />
      <text x="290" y="526" fontSize="17" fontWeight="700" textAnchor="middle" fill="#ffffff">
        sludge
      </text>
    </svg>
  );
}

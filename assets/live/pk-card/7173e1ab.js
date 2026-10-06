/* global React */
// ─────────────────────────────────────────────────────────────────────────
//  Bauhaus emblems (one per archetype) + the radar chart.
//  Built only from primitives — circles, squares, single arcs. No illustration.
// ─────────────────────────────────────────────────────────────────────────

// Emblem: a flat, two-tone geometric mark. `fill` = primary, `accent` = second.
function Emblem({ type, size = 120, fill = '#211e1a', accent = 'rgba(0,0,0,0.28)', stroke }) {
  const sw = stroke || fill;
  const common = { width: size, height: size, viewBox: '0 0 120 120', style: { display: 'block', overflow: 'visible' } };
  switch (type) {
    case 'EYE': // almond eye with iris — the noticer
      return (
        <svg {...common} aria-hidden>
          <path d="M12,60 Q60,20 108,60 Q60,100 12,60 Z" fill="none" stroke={sw} strokeWidth="8.5" strokeLinejoin="round" />
          <circle cx="60" cy="60" r="20" fill={fill} />
          <circle cx="60" cy="60" r="8.5" fill={accent} />
          <circle cx="52.5" cy="52.5" r="4.5" fill="#FCFAF4" opacity="0.92" />
        </svg>
      );
    case 'HEART': // clean heart silhouette — the feeler
      return (
        <svg {...common} aria-hidden>
          <path d="M60,99 C27,75 16,56 16,39.5 C16,26.5 26,16.5 39,16.5 C48.5,16.5 56,22 60,30.5 C64,22 71.5,16.5 81,16.5 C94,16.5 104,26.5 104,39.5 C104,56 93,75 60,99 Z" fill={fill} />
          <circle cx="41" cy="38" r="7.5" fill={accent} opacity="0.9" />
        </svg>
      );
    case 'BRAIN': // synapse / connected nodes — the questioner
      return (
        <svg {...common} aria-hidden>
          <g stroke={sw} strokeWidth="6" strokeLinecap="round">
            <line x1="60" y1="60" x2="60" y2="20" />
            <line x1="60" y1="60" x2="25" y2="85" />
            <line x1="60" y1="60" x2="95" y2="85" />
          </g>
          <circle cx="60" cy="60" r="14" fill={fill} />
          <circle cx="60" cy="20" r="9.5" fill={accent} />
          <circle cx="25" cy="85" r="9.5" fill={fill} />
          <circle cx="95" cy="85" r="9.5" fill={accent} />
        </svg>
      );
    case 'HAND': // Bauhaus primitives, assembled — the maker
      return (
        <svg {...common} aria-hidden>
          <polygon points="60,13 85,57 35,57" fill={fill} />
          <rect x="17" y="64" width="39" height="39" rx="5" fill={fill} />
          <circle cx="84" cy="83" r="20" fill={accent} />
        </svg>
      );
    case 'FACE': // overlapping speech bubbles — the teller
      return (
        <svg {...common} aria-hidden>
          <rect x="44" y="14" width="62" height="40" rx="14" fill={accent} opacity="0.92" />
          <rect x="14" y="34" width="64" height="46" rx="14" fill={fill} />
          <polygon points="28,73 28,98 51,76" fill={fill} />
        </svg>
      );
    default:
      return <svg {...common} aria-hidden><circle cx="60" cy="60" r="40" fill={fill} /></svg>;
  }
}

// ── Radar chart ──────────────────────────────────────────────────────────
// score: {EYE,HEART,...}. animate gates the draw-in. compact hides labels/axes.
function RadarChart({ score, color, fill, size = 320, animate = false, showLabels = true, showDots = true, ringColor = 'rgba(33,30,26,0.10)', strokeW = 2.5, labelColor, labelSize = 12 }) {
  const P = window.POKEMON;
  const R = P.buildRadar(score, 320, 116);
  const polyStyle = animate ? { transformBox: 'fill-box', transformOrigin: 'center', animation: 'pkRadarDraw .95s .15s cubic-bezier(.2,.7,.2,1) both' } : {};
  return (
    <svg viewBox="0 0 320 320" width={size} height={size} style={{ display: 'block', overflow: 'visible', maxWidth: '100%' }} aria-hidden>
      {R.rings.map((ring, i) => (
        <polygon key={i} points={ring.pts} fill="none" stroke={ringColor} strokeWidth="1" />
      ))}
      {showLabels && R.axes.map((ax, i) => (
        <line key={i} x1="160" y1="160" x2={ax.ox} y2={ax.oy} stroke={ringColor} strokeWidth="1" />
      ))}
      <polygon points={R.polyPoints} fill={fill} stroke={color} strokeWidth={strokeW} strokeLinejoin="round" style={polyStyle} />
      {showDots && R.axes.map((ax, i) => (
        <circle key={i} cx={ax.dx} cy={ax.dy} r={size > 160 ? 4.5 : 6} fill={ax.color}
          style={animate ? { transformBox: 'fill-box', transformOrigin: 'center', animation: `pkRadarDot .45s ${(0.65 + i * 0.08).toFixed(2)}s both` } : {}} />
      ))}
      {showLabels && R.axes.map((ax, i) => (
        <text key={i} x={ax.lx} y={ax.ly} fill={labelColor || ax.color} textAnchor={ax.anchor} dominantBaseline="middle"
          style={{ fontFamily: "'Geist Mono',monospace", fontSize: labelSize, fontWeight: 600, letterSpacing: '.03em' }}>{ax.label}</text>
      ))}
    </svg>
  );
}

window.PokemonEmblems = { Emblem, RadarChart };

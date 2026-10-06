/* global React */
const { useState } = React;

// Sidebar — persistent left nav. Three signals: where I've been (filled dots),
// where I am (orange today), what's locked. Phase headers group weeks like
// chapters; current phase is open, future phases are gated.

// Icons -----------------------------------------------------------------
const Icon = {
  chevron: (p) => (
    <svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 3l3 3-3 3" />
    </svg>
  ),
  chevronDown: (p) => (
    <svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 4.5l3 3 3-3" />
    </svg>
  ),
  lock: (p) => (
    <svg viewBox="0 0 12 12" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.3" {...p}>
      <rect x="2.5" y="5.5" width="7" height="5" rx="1" />
      <path d="M4 5.5V4a2 2 0 014 0v1.5" strokeLinecap="round" />
    </svg>
  ),
  check: (p) => (
    <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M2.5 6.5l2.3 2.3L9.5 3.5" />
    </svg>
  ),
  search: (p) => (
    <svg viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" {...p}>
      <circle cx="6" cy="6" r="3.8" />
      <path d="M9 9l3 3" />
    </svg>
  ),
  flame: (p) => (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" {...p}>
      <path d="M8 1.5c.6 1.7.3 3-1 4-1.8 1.4-3 2.7-3 4.8C4 12.9 5.8 14.5 8 14.5s4-1.6 4-4.2c0-1.4-.6-2.5-1.4-3.4-.5-.5-.6.3-1.1.3-.6 0-1-.4-1-1 0-1.4 0-3.1-.5-4.7z"/>
    </svg>
  ),
  play: (p) => (
    <svg viewBox="0 0 12 12" width="10" height="10" fill="currentColor" {...p}>
      <path d="M3.5 2.5v7l6-3.5z"/>
    </svg>
  ),
  doc: (p) => (
    <svg viewBox="0 0 12 12" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" {...p}>
      <path d="M3 1.5h4l2 2v7H3z" />
      <path d="M7 1.5v2h2" />
    </svg>
  ),
};

// Day dots — visual heatbar per week (filled = done, ring = today, dim = ahead)
function DayDots({ states }) {
  // states: array of 'done' | 'today' | 'open' | 'rest'
  return (
    <div style={{ display: 'flex', gap: 3, alignItems: 'center', height: 10 }}>
      {states.map((s, i) => {
        const sz = s === 'today' ? 7 : 5;
        const base = { width: sz, height: sz, borderRadius: 999, transition: 'all .15s' };
        if (s === 'done')   return <span key={i} style={{ ...base, background: 'var(--ink)' }} />;
        if (s === 'today')  return <span key={i} style={{ ...base, background: 'var(--orange)', boxShadow: '0 0 0 2px var(--orange-glow)' }} />;
        if (s === 'open')   return <span key={i} style={{ ...base, background: 'transparent', border: '1.2px solid var(--line-strong)' }} />;
        return <span key={i} style={{ ...base, background: 'var(--line)' }} />;
      })}
    </div>
  );
}

// Mini week row (collapsed)
function WeekRow({ idx, label, dots, status, percent, onClick, active }) {
  const isLocked = status === 'locked';
  const isDone = status === 'done';
  const isCurrent = status === 'current';
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: 10,
        padding: '8px 10px', borderRadius: 8, textAlign: 'left',
        background: active ? 'rgba(255,69,15,0.05)' : 'transparent',
        color: isLocked ? 'var(--ink-3)' : 'var(--ink)',
        opacity: isLocked ? 0.7 : 1,
        position: 'relative',
      }}
    >
      <span
        className="mono mono-s"
        style={{
          width: 24, height: 22, borderRadius: 5, flex: '0 0 auto',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          background: isCurrent ? 'var(--orange)' : isDone ? 'var(--ink)' : 'transparent',
          color: (isCurrent || isDone) ? 'white' : 'var(--ink-3)',
          border: !isCurrent && !isDone ? '1px solid var(--line-strong)' : '0',
          fontWeight: 600, fontSize: 11,
        }}
      >
        {String(idx).padStart(2, '0')}
      </span>
      <span style={{ flex: '1 1 auto', minWidth: 0, fontSize: 13.5, fontWeight: isCurrent ? 600 : 500, lineHeight: 1.2 }}>
        {label}
      </span>
      {isLocked ? (
        <Icon.lock style={{ color: 'var(--ink-3)', flex: '0 0 auto' }} />
      ) : (
        <span style={{ flex: '0 0 auto' }}><DayDots states={dots} /></span>
      )}
    </button>
  );
}

// Expanded week row — list pages with check/today
function WeekExpanded({ idx, label, pages, onCollapse, activeSlug }) {
  return (
    <div style={{ padding: '4px 0 8px', borderRadius: 12, background: 'rgba(255,69,15,0.04)', border: '1px solid rgba(255,69,15,0.16)', margin: '4px 0' }}>
      <button onClick={onCollapse} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', textAlign: 'left' }}>
        <span
          className="mono mono-s"
          style={{
            width: 24, height: 22, borderRadius: 5, flex: '0 0 auto',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--orange)', color: 'white', fontWeight: 600, fontSize: 11,
          }}
        >
          {String(idx).padStart(2, '0')}
        </span>
        <span style={{ flex: '1 1 auto', minWidth: 0, fontSize: 13.5, fontWeight: 600 }}>{label}</span>
        <Icon.chevronDown style={{ color: 'var(--ink-2)' }} />
      </button>
      <div style={{ padding: '2px 10px 4px', marginLeft: 22, borderLeft: '1px dashed rgba(255,69,15,0.25)' }}>
        {pages.map((p, i) => {
          const isActive = p.slug === activeSlug;
          const Icn = p.kind === 'video' ? Icon.play : Icon.doc;
          return (
            <div
              key={i}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '6px 8px', marginLeft: 6,
                borderRadius: 7,
                background: isActive ? 'var(--surface)' : 'transparent',
                boxShadow: isActive ? '0 1px 0 rgba(20,15,10,0.04), 0 0 0 1px rgba(255,69,15,0.18)' : 'none',
                color: p.done ? 'var(--ink-2)' : 'var(--ink)',
                fontSize: 13,
                lineHeight: 1.25,
                position: 'relative',
              }}
            >
              <span style={{
                width: 14, height: 14, borderRadius: 999, flex: '0 0 auto',
                background: p.done ? 'var(--orange)' : isActive ? 'transparent' : 'transparent',
                border: p.done ? '0' : isActive ? '1.5px solid var(--orange)' : '1.5px solid var(--line-strong)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                color: 'white',
              }}>
                {p.done && <Icon.check />}
              </span>
              <Icn style={{ color: 'var(--ink-3)', flex: '0 0 auto' }} />
              <span style={{ flex: '1 1 auto', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: isActive ? 600 : 400 }}>
                {p.title}
              </span>
              {p.duration && (
                <span className="mono mono-s" style={{ color: 'var(--ink-3)', flex: '0 0 auto' }}>{p.duration}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Phase header
function PhaseHeader({ label, sub, locked }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'baseline', gap: 8,
      padding: '14px 12px 6px',
      color: locked ? 'var(--ink-3)' : 'var(--ink-2)',
    }}>
      <span className="caption" style={{ fontWeight: 600, color: locked ? 'var(--ink-3)' : 'var(--ink)' }}>{label}</span>
      <span style={{ flex: 1, height: 1, background: 'var(--line)' }} />
      <span className="mono mono-s" style={{ color: 'var(--ink-3)' }}>{sub}</span>
    </div>
  );
}

// Top brand row
function BrandRow() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '20px 16px 14px' }}>
      <span className="flame">
        <Icon.flame style={{ color: 'white' }} />
      </span>
      <span style={{ fontWeight: 600, fontSize: 15, letterSpacing: '-0.01em' }}>UX Gym</span>
      <span style={{ flex: 1 }} />
      <button title="Search" style={{
        width: 28, height: 28, borderRadius: 7,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--ink-2)',
        border: '1px solid var(--line)',
        background: 'var(--surface)',
      }}>
        <Icon.search />
      </button>
    </div>
  );
}

// Identity / streak pill at bottom
function UserPill({ name, day, streak, week }) {
  return (
    <div style={{
      margin: 12,
      padding: '12px 14px',
      borderRadius: 14,
      background: 'var(--surface)',
      border: '1px solid var(--line)',
      display: 'flex', alignItems: 'center', gap: 10,
      boxShadow: 'var(--shadow-sm)',
    }}>
      <div style={{
        width: 34, height: 34, borderRadius: 10,
        background: 'linear-gradient(135deg, #2A211A, #15110D)',
        color: 'var(--ink-on-dark)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 600, fontSize: 13,
        flex: '0 0 auto',
      }}>
        SP
      </div>
      <div style={{ flex: '1 1 auto', minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.2 }}>{name}</div>
        <div style={{ fontSize: 11.5, color: 'var(--ink-2)', lineHeight: 1.3, marginTop: 1 }}>
          Week {week} · Ignite
        </div>
      </div>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
        flex: '0 0 auto',
        color: 'var(--orange-ink)',
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 13, fontWeight: 700, lineHeight: 1 }}>
          <Icon.flame style={{ color: 'var(--orange)' }} />
          <span className="mono" style={{ fontWeight: 700, fontSize: 13 }}>{streak}</span>
        </div>
        <span className="mono mono-s" style={{ color: 'var(--ink-3)', marginTop: 3 }}>day {day}</span>
      </div>
    </div>
  );
}

// Today highlight at top of nav
function TodayCard({ label, sub }) {
  return (
    <button style={{
      width: 'calc(100% - 24px)', margin: '0 12px 4px',
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '10px 12px',
      borderRadius: 11,
      background: 'var(--surface-dark)',
      color: 'var(--ink-on-dark)',
      textAlign: 'left',
      boxShadow: '0 1px 0 rgba(255,255,255,0.05) inset, 0 8px 18px -8px rgba(20,15,10,0.4)',
    }}>
      <span style={{
        width: 28, height: 28, borderRadius: 8,
        background: 'rgba(255,69,15,0.18)',
        border: '1px solid rgba(255,69,15,0.4)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        color: '#FF7E50', flex: '0 0 auto',
      }}>
        <Icon.flame style={{ width: 14, height: 14 }} />
      </span>
      <div style={{ flex: '1 1 auto', minWidth: 0 }}>
        <div className="caption" style={{ color: '#FF8559', fontSize: 10, fontWeight: 600 }}>TODAY</div>
        <div style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.25, marginTop: 2 }}>{label}</div>
      </div>
      <Icon.chevron style={{ color: 'var(--ink-on-dark-2)' }} />
    </button>
  );
}

// Full sidebar
function Sidebar({ activeWeek = 4, activePageSlug = null, todayLabel = 'Visual hierarchy', todayWeek = 4 }) {
  // Data
  const igniteWeeks = [
    { idx: 0, label: 'Pre-program prep', status: 'done', dots: ['done','done','done','done','done','rest','rest'] },
    { idx: 1, label: 'Eye — see like a designer', status: 'done', dots: ['done','done','done','done','done','done','rest'] },
    { idx: 2, label: 'Heart — feel the user', status: 'done', dots: ['done','done','done','done','done','done','rest'] },
    { idx: 3, label: 'Brain — frame the problem', status: 'done', dots: ['done','done','done','done','done','done','rest'] },
    { idx: 4, label: 'Hand — make it real', status: 'current', dots: ['done','done','today','open','open','open','rest'] },
    { idx: 5, label: 'Face — present it', status: 'locked' },
    { idx: 6, label: 'Studio week', status: 'locked' },
  ];
  const week4Pages = [
    { slug: 'affordances',  title: 'Affordances & signifiers',  kind: 'video', duration: '12m', done: true },
    { slug: 'hierarchy',    title: 'Visual hierarchy',          kind: 'video', duration: '14m', done: false },
    { slug: 'microcopy',    title: 'Microcopy that earns',      kind: 'doc',   duration: '8m',  done: false },
    { slug: 'states',       title: 'Empty, loading, error',     kind: 'doc',   duration: '10m', done: false },
    { slug: 'workshop',     title: 'Live critique workshop',    kind: 'video', duration: '60m', done: false },
  ];

  return (
    <aside style={{
      width: 280, flex: '0 0 280px',
      height: '100%',
      background: 'var(--bg)',
      borderRight: '1px solid var(--line)',
      display: 'flex', flexDirection: 'column',
      position: 'relative',
    }}>
      <BrandRow />
      <TodayCard label={todayLabel ? `${todayLabel}` : 'Open today\'s session'} sub={`Week ${todayWeek}`} />

      <div style={{ flex: '1 1 auto', overflow: 'auto', padding: '4px 8px 8px' }}>
        <PhaseHeader label="Ignite" sub="W0–W6" />
        {igniteWeeks.map((w) =>
          w.idx === activeWeek ? (
            <WeekExpanded key={w.idx} idx={w.idx} label={w.label} pages={week4Pages} activeSlug={activePageSlug} onCollapse={() => {}} />
          ) : (
            <WeekRow key={w.idx} idx={w.idx} label={w.label} dots={w.dots || []} status={w.status} />
          )
        )}

        <PhaseHeader label="UI Forge" sub="locked · unlocks W6" locked />
        {[
          'Warm-up · phase 2',
          'Colour & light',
          'Typography',
          'Layout & grid',
        ].map((t, i) => (
          <WeekRow key={t} idx={i + 1} label={t} status="locked" />
        ))}

        <PhaseHeader label="Portfolio" sub="locked" locked />
        {['Industry-backwards case study', 'Critique & polish'].map((t, i) => (
          <WeekRow key={t} idx={i + 1} label={t} status="locked" />
        ))}

        {/* Library section */}
        <div style={{ height: 12 }} />
        <PhaseHeader label="Library" sub="saved · 14" />
        <div style={{ padding: '0 6px' }}>
          {[
            { t: 'Heuristics reference', kind: 'doc' },
            { t: 'Critique workshop · W3', kind: 'video' },
            { t: 'Hierarchy field notes', kind: 'doc' },
          ].map((it) => {
            const Icn = it.kind === 'video' ? Icon.play : Icon.doc;
            return (
              <div key={it.t} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', borderRadius: 7, color: 'var(--ink-2)', fontSize: 13 }}>
                <Icn style={{ color: 'var(--ink-3)', flex: '0 0 auto' }} />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.t}</span>
              </div>
            );
          })}
        </div>
      </div>

      <UserPill name="Soumya P." day={47} streak={12} week={4} />
    </aside>
  );
}

// Export
Object.assign(window, { Sidebar, Icon, DayDots });

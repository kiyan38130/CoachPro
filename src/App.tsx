import { useState, useEffect, useRef } from 'react';

// ============================================================
// DATA
// ============================================================
const FORMATIONS = {
  '4-3-3': [
    ['GB'],
    ['DD', 'DC', 'DC', 'DG'],
    ['MC', 'MDC', 'MC'],
    ['AD', 'ATT', 'AG'],
  ],
  '4-4-2': [
    ['GB'],
    ['DD', 'DC', 'DC', 'DG'],
    ['MD', 'MC', 'MC', 'MG'],
    ['ATT', 'ATT'],
  ],
  '4-2-3-1': [
    ['GB'],
    ['DD', 'DC', 'DC', 'DG'],
    ['MDC', 'MDC'],
    ['AD', 'MOC', 'AG'],
    ['ATT'],
  ],
  '3-5-2': [
    ['GB'],
    ['DC', 'DC', 'DC'],
    ['MD', 'MC', 'MDC', 'MC', 'MG'],
    ['ATT', 'ATT'],
  ],
  '5-3-2': [
    ['GB'],
    ['DD', 'DC', 'DC', 'DC', 'DG'],
    ['MC', 'MDC', 'MC'],
    ['ATT', 'ATT'],
  ],
  '3-4-3': [
    ['GB'],
    ['DC', 'DC', 'DC'],
    ['MD', 'MC', 'MC', 'MG'],
    ['AD', 'ATT', 'AG'],
  ],
};

const posColors = {
  GB: '#6366f1',
  DD: '#0ea5e9',
  DC: '#0ea5e9',
  DG: '#0ea5e9',
  MDC: '#f59e0b',
  MC: '#f59e0b',
  MOC: '#f59e0b',
  MD: '#f59e0b',
  MG: '#f59e0b',
  AD: '#10b981',
  AG: '#10b981',
  ATT: '#ef4444',
};
const posGroup = {
  GB: 'Gardien',
  DD: 'Défenseur',
  DC: 'Défenseur',
  DG: 'Défenseur',
  MDC: 'Milieu',
  MC: 'Milieu',
  MOC: 'Milieu',
  MD: 'Milieu',
  MG: 'Milieu',
  AD: 'Attaquant',
  AG: 'Attaquant',
  ATT: 'Attaquant',
};
const statusCfg = {
  fit: { label: 'Apte', color: '#10b981', bg: '#d1fae5', icon: '✓' },
  injured: { label: 'Blessé', color: '#ef4444', bg: '#fee2e2', icon: '✕' },
  doubtful: { label: 'Douteux', color: '#f59e0b', bg: '#fef3c7', icon: '?' },
  suspended: { label: 'Suspendu', color: '#8b5cf6', bg: '#ede9fe', icon: '!' },
};
const injuryTypes = [
  'Musculaire',
  'Ligament',
  'Fracture',
  'Contusion',
  'Tendinite',
  'Commotion',
];
const trainingTypes = [
  'Tactique',
  'Physique',
  'Technique',
  'Match amical',
  'Récupération',
  'Force',
];

const INIT_PLAYERS = [
  {
    id: 1,
    name: 'Lucas Moreira',
    number: 1,
    position: 'GB',
    age: 28,
    goals: 0,
    assists: 0,
    status: 'fit',
    form: 8,
    present: true,
    yellowCards: 0,
    redCards: 0,
    photo: '',
    injuryHistory: [],
    contract: '2027-06-30',
    salary: 3200,
    gpsDistance: 0,
    physicalLoad: 72,
    notes: '',
  },
  {
    id: 2,
    name: 'Théo Durand',
    number: 2,
    position: 'DD',
    age: 24,
    goals: 1,
    assists: 2,
    status: 'fit',
    form: 7,
    present: true,
    yellowCards: 1,
    redCards: 0,
    photo: '',
    injuryHistory: [],
    contract: '2026-12-31',
    salary: 2800,
    gpsDistance: 0,
    physicalLoad: 68,
    notes: '',
  },
  {
    id: 3,
    name: 'Karim Benbrahim',
    number: 4,
    position: 'DC',
    age: 27,
    goals: 2,
    assists: 0,
    status: 'fit',
    form: 8,
    present: true,
    yellowCards: 0,
    redCards: 0,
    photo: '',
    injuryHistory: [],
    contract: '2028-06-30',
    salary: 3500,
    gpsDistance: 0,
    physicalLoad: 75,
    notes: '',
  },
  {
    id: 4,
    name: 'Enzo Fabre',
    number: 5,
    position: 'DC',
    age: 25,
    goals: 0,
    assists: 1,
    status: 'injured',
    form: 0,
    present: false,
    yellowCards: 2,
    redCards: 0,
    photo: '',
    injuryHistory: [
      { type: 'Musculaire', date: '2026-02-10', recovery: '2026-03-15' },
    ],
    contract: '2027-06-30',
    salary: 3000,
    gpsDistance: 0,
    physicalLoad: 0,
    notes: 'Déchirure ischio',
  },
  {
    id: 5,
    name: 'Romain Petit',
    number: 3,
    position: 'DG',
    age: 22,
    goals: 0,
    assists: 3,
    status: 'fit',
    form: 9,
    present: true,
    yellowCards: 0,
    redCards: 0,
    photo: '',
    injuryHistory: [],
    contract: '2029-06-30',
    salary: 2600,
    gpsDistance: 0,
    physicalLoad: 80,
    notes: '',
  },
  {
    id: 6,
    name: 'Nassim Aït',
    number: 6,
    position: 'MDC',
    age: 26,
    goals: 1,
    assists: 4,
    status: 'fit',
    form: 7,
    present: true,
    yellowCards: 1,
    redCards: 0,
    photo: '',
    injuryHistory: [],
    contract: '2027-06-30',
    salary: 3800,
    gpsDistance: 0,
    physicalLoad: 70,
    notes: '',
  },
  {
    id: 7,
    name: 'Baptiste Girard',
    number: 8,
    position: 'MC',
    age: 23,
    goals: 3,
    assists: 5,
    status: 'doubtful',
    form: 6,
    present: true,
    yellowCards: 0,
    redCards: 0,
    photo: '',
    injuryHistory: [
      { type: 'Contusion', date: '2026-02-28', recovery: '2026-03-07' },
    ],
    contract: '2026-06-30',
    salary: 2900,
    gpsDistance: 0,
    physicalLoad: 45,
    notes: 'Choc à la cheville',
  },
  {
    id: 8,
    name: 'Sofiane Benali',
    number: 10,
    position: 'MOC',
    age: 24,
    goals: 8,
    assists: 7,
    status: 'fit',
    form: 10,
    present: true,
    yellowCards: 1,
    redCards: 0,
    photo: '',
    injuryHistory: [],
    contract: '2030-06-30',
    salary: 5500,
    gpsDistance: 0,
    physicalLoad: 88,
    notes: 'Meilleur joueur',
  },
  {
    id: 9,
    name: 'Damien Rousseau',
    number: 7,
    position: 'AD',
    age: 21,
    goals: 5,
    assists: 3,
    status: 'fit',
    form: 8,
    present: true,
    yellowCards: 0,
    redCards: 0,
    photo: '',
    injuryHistory: [],
    contract: '2028-06-30',
    salary: 2700,
    gpsDistance: 0,
    physicalLoad: 82,
    notes: '',
  },
  {
    id: 10,
    name: 'Yann Chevalier',
    number: 11,
    position: 'AG',
    age: 20,
    goals: 4,
    assists: 6,
    status: 'fit',
    form: 7,
    present: true,
    yellowCards: 2,
    redCards: 0,
    photo: '',
    injuryHistory: [],
    contract: '2027-12-31',
    salary: 2500,
    gpsDistance: 0,
    physicalLoad: 76,
    notes: '',
  },
  {
    id: 11,
    name: 'Mohamed Diallo',
    number: 9,
    position: 'ATT',
    age: 25,
    goals: 14,
    assists: 4,
    status: 'fit',
    form: 9,
    present: true,
    yellowCards: 0,
    redCards: 0,
    photo: '',
    injuryHistory: [],
    contract: '2029-06-30',
    salary: 6000,
    gpsDistance: 0,
    physicalLoad: 85,
    notes: 'Capitaine',
  },
  {
    id: 12,
    name: 'Antoine Leroy',
    number: 12,
    position: 'GB',
    age: 22,
    goals: 0,
    assists: 0,
    status: 'fit',
    form: 6,
    present: true,
    yellowCards: 0,
    redCards: 0,
    photo: '',
    injuryHistory: [],
    contract: '2027-06-30',
    salary: 2200,
    gpsDistance: 0,
    physicalLoad: 60,
    notes: '',
  },
  {
    id: 13,
    name: 'Jordan Muller',
    number: 14,
    position: 'MC',
    age: 24,
    goals: 2,
    assists: 2,
    status: 'fit',
    form: 7,
    present: false,
    yellowCards: 1,
    redCards: 0,
    photo: '',
    injuryHistory: [],
    contract: '2026-12-31',
    salary: 2800,
    gpsDistance: 0,
    physicalLoad: 0,
    notes: '',
  },
  {
    id: 14,
    name: 'Alexis Fontaine',
    number: 17,
    position: 'ATT',
    age: 19,
    goals: 3,
    assists: 1,
    status: 'fit',
    form: 8,
    present: true,
    yellowCards: 0,
    redCards: 0,
    photo: '',
    injuryHistory: [],
    contract: '2028-06-30',
    salary: 2100,
    gpsDistance: 0,
    physicalLoad: 78,
    notes: 'Espoir',
  },
  {
    id: 15,
    name: 'Rémi Blanc',
    number: 21,
    position: 'DD',
    age: 23,
    goals: 0,
    assists: 2,
    status: 'suspended',
    form: 0,
    present: false,
    yellowCards: 3,
    redCards: 0,
    photo: '',
    injuryHistory: [],
    contract: '2027-06-30',
    salary: 2400,
    gpsDistance: 0,
    physicalLoad: 0,
    notes: '',
  },
];

const INIT_MATCHES = [
  {
    id: 1,
    opponent: 'RC Strasbourg',
    date: '2026-02-15',
    location: 'home',
    result: '3-1',
    scorers: ['Diallo', 'Benali', 'Rousseau'],
    assists: ['Chevalier', 'Petit', 'Benali'],
    status: 'played',
    notes: 'Très bon match collectif',
    formation: '4-3-3',
  },
  {
    id: 2,
    opponent: 'LOSC Lille',
    date: '2026-02-22',
    location: 'away',
    result: '1-1',
    scorers: ['Benali'],
    assists: ['Muller'],
    status: 'played',
    notes: "Manque d'efficacité",
    formation: '4-4-2',
  },
  {
    id: 3,
    opponent: 'Stade Rennais',
    date: '2026-03-01',
    location: 'home',
    result: '2-0',
    scorers: ['Diallo', 'Chevalier'],
    assists: ['Benali', 'Rousseau'],
    status: 'played',
    notes: 'Clean sheet méritée',
    formation: '4-3-3',
  },
  {
    id: 4,
    opponent: 'OGC Nice',
    date: '2026-03-08',
    location: 'away',
    result: null,
    scorers: [],
    assists: [],
    status: 'upcoming',
    notes: '',
    formation: '4-3-3',
  },
  {
    id: 5,
    opponent: 'AS Monaco',
    date: '2026-03-15',
    location: 'home',
    result: null,
    scorers: [],
    assists: [],
    status: 'upcoming',
    notes: '',
    formation: '4-2-3-1',
  },
];

const INIT_TRAININGS = [
  {
    id: 1,
    date: '2026-03-01',
    type: 'Tactique',
    duration: 90,
    focus: 'Pressing haut',
    attendance: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 14],
    notes: 'Bonne intensité',
    load: 75,
  },
  {
    id: 2,
    date: '2026-03-03',
    type: 'Physique',
    duration: 75,
    focus: 'Endurance',
    attendance: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    notes: '2 absents',
    load: 85,
  },
  {
    id: 3,
    date: '2026-03-05',
    type: 'Technique',
    duration: 60,
    focus: 'Finition',
    attendance: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    notes: 'Excellente séance',
    load: 60,
  },
];

const INIT_MESSAGES = [
  {
    id: 1,
    from: 'Coach',
    to: 'all',
    text: "Séance demain 10h ! Soyez à l'heure 💪",
    time: '2026-03-04 09:00',
    read: true,
  },
  {
    id: 2,
    from: 'Mohamed Diallo',
    to: 'Coach',
    text: "Présent coach, j'amène aussi Jordan",
    time: '2026-03-04 09:15',
    read: true,
  },
  {
    id: 3,
    from: 'Sofiane Benali',
    to: 'Coach',
    text: 'Petite douleur au mollet, je viens mais à surveiller',
    time: '2026-03-04 09:30',
    read: false,
  },
];

const INIT_POLLS = [
  {
    id: 1,
    question: "Préférez-vous l'entraînement du matin ou du soir ?",
    options: ['Matin 🌅', 'Soir 🌙'],
    votes: { 0: [1, 2, 3, 5, 8], 1: [6, 7, 9, 10, 11] },
    closed: false,
  },
  {
    id: 2,
    question: 'Quel est le meilleur joueur du mois ?',
    options: ['Sofiane Benali', 'Mohamed Diallo', 'Romain Petit'],
    votes: { 0: [1, 2, 6, 7, 13], 1: [3, 5, 9, 10, 14], 2: [11, 12, 15] },
    closed: true,
  },
];

const PHYSICAL_TESTS = [
  { id: 1, name: 'Vitesse 30m', unit: 'sec', lower: true },
  { id: 2, name: 'VO2max', unit: 'ml/kg/min', lower: false },
  { id: 3, name: 'Squat max', unit: 'kg', lower: false },
  { id: 4, name: 'Détente verticale', unit: 'cm', lower: false },
];

// ============================================================
// CSS
// ============================================================
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:#f8fafc;font-family:'Plus Jakarta Sans',sans-serif}
  ::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-track{background:#f1f5f9}::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:3px}
  .tab{background:none;border:none;cursor:pointer;padding:10px 14px;font-family:'Plus Jakarta Sans',sans-serif;font-size:12px;font-weight:600;color:#94a3b8;transition:all .2s;border-bottom:2px solid transparent;white-space:nowrap;display:flex;align-items:center;gap:5px}
  .tab.on{color:#6366f1;border-bottom-color:#6366f1}
  .tab:hover:not(.on){color:#475569}
  .card{background:#fff;border:1px solid #f1f5f9;border-radius:16px;padding:18px;box-shadow:0 1px 3px rgba(0,0,0,.05)}
  .btn{border:none;cursor:pointer;padding:8px 16px;border-radius:10px;font-family:'Plus Jakarta Sans',sans-serif;font-size:12px;font-weight:700;transition:all .2s}
  .bp{background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;box-shadow:0 4px 12px rgba(99,102,241,.25)}
  .bp:hover{transform:translateY(-1px);box-shadow:0 6px 16px rgba(99,102,241,.35)}
  .bs{background:#f8fafc;color:#64748b;border:1px solid #e2e8f0}
  .bs:hover{background:#f1f5f9}
  .br{background:#fee2e2;color:#ef4444;border:1px solid #fecaca}
  .bg2{background:#d1fae5;color:#10b981;border:1px solid #a7f3d0}
  .inp{background:#f8fafc;border:1.5px solid #e2e8f0;color:#0f172a;padding:9px 12px;border-radius:10px;font-family:'Plus Jakarta Sans',sans-serif;font-size:12px;width:100%;outline:none;transition:border .2s}
  .inp:focus{border-color:#6366f1;background:#fff}
  .sel{background:#f8fafc;border:1.5px solid #e2e8f0;color:#0f172a;padding:9px 12px;border-radius:10px;font-family:'Plus Jakarta Sans',sans-serif;font-size:12px;outline:none;cursor:pointer;width:100%}
  .prow{transition:all .15s;cursor:pointer;border-radius:12px}
  .prow:hover{background:#f8fafc!important;transform:translateX(2px)}
  .pulse{animation:pulse 2s infinite}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
  @keyframes sin{from{transform:translateY(-10px);opacity:0}to{transform:translateY(0);opacity:1}}
  .sin{animation:sin .3s cubic-bezier(.34,1.56,.64,1)}
  .mb{position:fixed;inset:0;background:rgba(15,23,42,.5);display:flex;align-items:center;justify-content:center;z-index:200;backdrop-filter:blur(8px)}
  .md{background:#fff;border-radius:20px;padding:26px;width:95%;max-width:540px;max-height:90vh;overflow-y:auto;box-shadow:0 25px 50px rgba(0,0,0,.15)}
  .badge{display:inline-flex;align-items:center;gap:3px;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:700}
  .chip{display:inline-flex;align-items:center;padding:2px 9px;border-radius:20px;font-size:11px;font-weight:600}
  input[type=range]{-webkit-appearance:none;height:6px;border-radius:3px;background:#e2e8f0;outline:none;width:100%}
  input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#8b5cf6);cursor:pointer;box-shadow:0 2px 6px rgba(99,102,241,.4)}
  .field-grass{background:linear-gradient(180deg,#15803d 0%,#16a34a 30%,#15803d 50%,#16a34a 70%,#15803d 100%);position:relative;border-radius:14px;overflow:hidden}
  .player-token{display:flex;flex-direction:column;align-items:center;cursor:pointer;transition:transform .2s;position:relative}
  .player-token:hover{transform:scale(1.12)}
  .token-ring{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;color:#fff;border:3px solid rgba(255,255,255,.85);box-shadow:0 4px 12px rgba(0,0,0,.35)}
  .token-name{font-size:8px;font-weight:700;color:#fff;text-shadow:0 1px 4px rgba(0,0,0,.9);margin-top:2px;max-width:52px;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .msg-bubble{padding:10px 14px;border-radius:14px;max-width:75%;font-size:12px;line-height:1.5}
  .lbl{display:block;font-size:11px;font-weight:700;color:#64748b;margin-bottom:5px;text-transform:uppercase;letter-spacing:.5px}
  .progress{height:8px;border-radius:4px;background:#f1f5f9;overflow:hidden}
  .progress-bar{height:100%;border-radius:4px;transition:width .5s}
  textarea.inp{resize:vertical;min-height:70px}
`;

// ============================================================
// HELPERS
// ============================================================
const FormDots = ({ v }) => (
  <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
    {[...Array(10)].map((_, i) => (
      <div
        key={i}
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background:
            i < v
              ? v >= 8
                ? '#10b981'
                : v >= 5
                ? '#f59e0b'
                : '#ef4444'
              : '#e2e8f0',
        }}
      />
    ))}
    <span
      style={{
        marginLeft: 4,
        fontSize: 11,
        fontWeight: 700,
        color: v >= 8 ? '#10b981' : v >= 5 ? '#f59e0b' : '#ef4444',
      }}
    >
      {v}/10
    </span>
  </div>
);

const Label = ({ children }) => <span className="lbl">{children}</span>;

const daysLeft = (dateStr) => {
  const d = Math.ceil((new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24));
  return d;
};

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [tab, setTab] = useState('dashboard');
  const [players, setPlayers] = useState(INIT_PLAYERS);
  const [matches, setMatches] = useState(INIT_MATCHES);
  const [trainings, setTrainings] = useState(INIT_TRAININGS);
  const [messages, setMessages] = useState(INIT_MESSAGES);
  const [polls, setPolls] = useState(INIT_POLLS);
  const [formation, setFormation] = useState('4-3-3');
  const [lineup, setLineup] = useState({});
  const [sel, setSel] = useState(null);
  const [modal, setModal] = useState(null);
  const [notif, setNotif] = useState(null);
  const [swapSlot, setSwapSlot] = useState(null);
  const [msgInput, setMsgInput] = useState('');
  const [pollInput, setPollInput] = useState({
    question: '',
    options: ['', ''],
  });
  const [newPollOpt, setNewPollOpt] = useState('');
  const [physTests, setPhysTests] = useState({});
  const [calMonth, setCalMonth] = useState(new Date(2026, 2, 1));
  const [activeMsg, setActiveMsg] = useState('all');
  const [videoLinks, setVideoLinks] = useState([
    {
      id: 1,
      title: 'Analyse RC Strasbourg',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      date: '2026-03-01',
    },
    {
      id: 2,
      title: 'Corners défensifs - Drill',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      date: '2026-03-03',
    },
  ]);
  const [newVideo, setNewVideo] = useState({ title: '', url: '' });

  const toast = (msg, type = 'success') => {
    setNotif({ msg, type });
    setTimeout(() => setNotif(null), 3000);
  };
  const upd = (id, patch) =>
    setPlayers((ps) => ps.map((p) => (p.id === id ? { ...p, ...patch } : p)));

  const st = {
    fit: players.filter((p) => p.status === 'fit').length,
    inj: players.filter((p) => p.status === 'injured').length,
    goals: players.reduce((s, p) => s + p.goals, 0),
    assists: players.reduce((s, p) => s + p.assists, 0),
    form: (
      players
        .filter((p) => p.status === 'fit')
        .reduce((s, p) => s + p.form, 0) /
      Math.max(1, players.filter((p) => p.status === 'fit').length)
    ).toFixed(1),
    present: players.filter((p) => p.present).length,
    wins: matches.filter((m) => m.result && +m.result[0] > +m.result[2]).length,
    draws: matches.filter((m) => m.result && +m.result[0] === +m.result[2])
      .length,
    losses: matches.filter((m) => m.result && +m.result[0] < +m.result[2])
      .length,
    unread: messages.filter((m) => !m.read).length,
    budget: players.reduce((s, p) => s + p.salary, 0),
  };

  const fitPlayers = players.filter((p) => p.status === 'fit' && p.present);
  const fLines = FORMATIONS[formation];

  const getSlotPlayer = (li, pi) => {
    const key = `${li}-${pi}`;
    if (lineup[key]) return players.find((p) => p.id === lineup[key]);
    const pos = fLines[li][pi];
    const used = new Set(Object.values(lineup));
    return fitPlayers.find((p) => p.position === pos && !used.has(p.id));
  };

  const TABS = [
    ['dashboard', '🏠', 'Tableau de bord'],
    ['squad', '👥', 'Effectif'],
    ['formation', '🗺️', 'Tactique'],
    ['match', '⚽', 'Matchs'],
    ['training', '🏃', 'Entraîn.'],
    ['medical', '🏥', 'Médical'],
    ['physical', '💪', 'Physique'],
    ['stats', '📊', 'Stats'],
    ['calendar', '📅', 'Calendrier'],
    ['admin', '📋', 'Administratif'],
    ['messages', '💬', 'Messages'],
    ['videos', '🎬', 'Vidéos'],
    ['polls', '🗳️', 'Sondages'],
  ];

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div
      style={{
        fontFamily: "'Plus Jakarta Sans',sans-serif",
        background: '#f8fafc',
        minHeight: '100vh',
        color: '#0f172a',
      }}
    >
      <style>{css}</style>

      {/* Toast */}
      {notif && (
        <div
          className="sin"
          style={{
            position: 'fixed',
            top: 20,
            right: 20,
            background: '#fff',
            border: `1.5px solid ${
              notif.type === 'success' ? '#10b981' : '#ef4444'
            }`,
            color: notif.type === 'success' ? '#10b981' : '#ef4444',
            padding: '11px 18px',
            borderRadius: 12,
            zIndex: 300,
            fontSize: 13,
            fontWeight: 600,
            boxShadow: '0 8px 24px rgba(0,0,0,.12)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          {notif.type === 'success' ? '✓' : '✕'} {notif.msg}
        </div>
      )}

      {/* HEADER */}
      <div
        style={{
          background: '#fff',
          borderBottom: '1px solid #f1f5f9',
          padding: '0 20px',
          boxShadow: '0 1px 4px rgba(0,0,0,.06)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                  borderRadius: 11,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 19,
                  boxShadow: '0 4px 12px rgba(99,102,241,.3)',
                }}
              >
                ⚽
              </div>
              <div>
                <div
                  style={{
                    fontSize: 17,
                    fontWeight: 800,
                    color: '#0f172a',
                    letterSpacing: '-.5px',
                  }}
                >
                  Coach Pro
                </div>
                <div
                  style={{ fontSize: 10, color: '#94a3b8', fontWeight: 500 }}
                >
                  Plateforme de gestion d'équipe
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                gap: 20,
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              {[
                ['👥', players.length, 'Joueurs', '#6366f1'],
                ['✅', st.fit, 'Aptes', '#10b981'],
                ['🏥', st.inj, 'Blessés', '#ef4444'],
                ['📈', `${st.form}/10`, 'Forme', '#f59e0b'],
                ['🏆', st.wins, 'Victoires', '#0ea5e9'],
                ['💬', st.unread, 'Non lus', '#8b5cf6'],
              ].map(([ic, v, lb, c]) => (
                <div key={lb} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: c }}>
                    {ic} {v}
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: 10 }}>{lb}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', overflowX: 'auto', gap: 2 }}>
            {TABS.map(([id, ic, lb]) => (
              <button
                key={id}
                className={`tab${tab === id ? ' on' : ''}`}
                onClick={() => setTab(id)}
              >
                {ic} {lb}
                {id === 'messages' && st.unread > 0 && (
                  <span
                    style={{
                      background: '#ef4444',
                      color: '#fff',
                      borderRadius: '50%',
                      width: 16,
                      height: 16,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 9,
                      fontWeight: 800,
                    }}
                  >
                    {st.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '20px', maxWidth: 1400, margin: '0 auto' }}>
        {/* ===== DASHBOARD ===== */}
        {tab === 'dashboard' && (
          <>
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800 }}>Tableau de bord</h2>
              <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 2 }}>
                Vue d'ensemble de votre équipe
              </p>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6,1fr)',
                gap: 12,
                marginBottom: 20,
              }}
            >
              {[
                ['👥', 'Effectif', players.length, '#6366f1', '#eef2ff'],
                ['✅', 'Aptes', st.fit, '#10b981', '#d1fae5'],
                ['🏥', 'Blessés', st.inj, '#ef4444', '#fee2e2'],
                ['⚽', 'Buts', st.goals, '#f59e0b', '#fef3c7'],
                ['🎯', 'Passes D.', st.assists, '#8b5cf6', '#ede9fe'],
                ['🏆', 'Victoires', st.wins, '#0ea5e9', '#e0f2fe'],
              ].map(([ic, lb, v, c, bg]) => (
                <div key={lb} className="card" style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 11,
                      background: bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 17,
                      margin: '0 auto 8px',
                    }}
                  >
                    {ic}
                  </div>
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 800,
                      color: c,
                      letterSpacing: '-1px',
                    }}
                  >
                    {v}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: '#94a3b8',
                      fontWeight: 600,
                      marginTop: 2,
                    }}
                  >
                    {lb}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: 16,
                marginBottom: 16,
              }}
            >
              {/* Résultats récents */}
              <div className="card">
                <div
                  style={{ fontSize: 14, fontWeight: 800, marginBottom: 14 }}
                >
                  ⚽ Résultats récents
                </div>
                {matches
                  .filter((m) => m.status === 'played')
                  .slice(-3)
                  .reverse()
                  .map((m) => {
                    const w = +m.result[0] > +m.result[2],
                      d = +m.result[0] === +m.result[2];
                    return (
                      <div
                        key={m.id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px 0',
                          borderBottom: '1px solid #f8fafc',
                        }}
                      >
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 700 }}>
                            vs {m.opponent}
                          </div>
                          <div style={{ fontSize: 10, color: '#94a3b8' }}>
                            {m.location === 'home' ? 'Domicile' : 'Extérieur'}
                          </div>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            gap: 8,
                            alignItems: 'center',
                          }}
                        >
                          <span
                            style={{
                              fontSize: 16,
                              fontWeight: 800,
                              color: w ? '#10b981' : d ? '#f59e0b' : '#ef4444',
                            }}
                          >
                            {m.result}
                          </span>
                          <span
                            className="badge"
                            style={{
                              background: w
                                ? '#d1fae5'
                                : d
                                ? '#fef3c7'
                                : '#fee2e2',
                              color: w ? '#10b981' : d ? '#f59e0b' : '#ef4444',
                            }}
                          >
                            {w ? 'V' : d ? 'N' : 'D'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                <div
                  style={{
                    marginTop: 12,
                    padding: '10px',
                    background: '#f8fafc',
                    borderRadius: 10,
                    display: 'flex',
                    justifyContent: 'space-around',
                    fontSize: 12,
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 800,
                        color: '#10b981',
                      }}
                    >
                      {st.wins}
                    </div>
                    <div style={{ color: '#94a3b8' }}>V</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 800,
                        color: '#f59e0b',
                      }}
                    >
                      {st.draws}
                    </div>
                    <div style={{ color: '#94a3b8' }}>N</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 800,
                        color: '#ef4444',
                      }}
                    >
                      {st.losses}
                    </div>
                    <div style={{ color: '#94a3b8' }}>D</div>
                  </div>
                </div>
              </div>
              {/* Infirmerie */}
              <div className="card">
                <div
                  style={{ fontSize: 14, fontWeight: 800, marginBottom: 14 }}
                >
                  🏥 Infirmerie
                </div>
                {players.filter((p) => p.status !== 'fit').length === 0 ? (
                  <div
                    style={{
                      padding: '14px',
                      background: '#f0fdf4',
                      borderRadius: 10,
                      color: '#10b981',
                      fontWeight: 700,
                      fontSize: 13,
                      textAlign: 'center',
                    }}
                  >
                    ✅ Tous aptes !
                  </div>
                ) : (
                  players
                    .filter((p) => p.status !== 'fit')
                    .map((p) => (
                      <div
                        key={p.id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px 0',
                          borderBottom: '1px solid #f8fafc',
                        }}
                      >
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 700 }}>
                            {p.name}
                          </div>
                          <div style={{ fontSize: 10, color: '#94a3b8' }}>
                            {p.injuryHistory[0]?.type || 'Indisponible'}
                            {p.injuryHistory[0]?.recovery
                              ? ' · Retour: ' +
                                new Date(
                                  p.injuryHistory[0].recovery
                                ).toLocaleDateString('fr-FR')
                              : ''}
                          </div>
                        </div>
                        <span
                          className="badge"
                          style={{
                            background: statusCfg[p.status].bg,
                            color: statusCfg[p.status].color,
                          }}
                        >
                          {statusCfg[p.status].label}
                        </span>
                      </div>
                    ))
                )}
              </div>
              {/* Prochain match */}
              <div
                className="card"
                style={{
                  background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                  border: 'none',
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 800,
                    marginBottom: 14,
                    color: '#fff',
                  }}
                >
                  🎯 Prochain match
                </div>
                {(() => {
                  const next = matches.find((m) => m.status === 'upcoming');
                  if (!next)
                    return (
                      <div style={{ color: 'rgba(255,255,255,.7)' }}>
                        Aucun match prévu
                      </div>
                    );
                  const d = daysLeft(next.date);
                  return (
                    <>
                      <div
                        style={{
                          fontSize: 22,
                          fontWeight: 800,
                          color: '#fff',
                          marginBottom: 4,
                        }}
                      >
                        vs {next.opponent}
                      </div>
                      <div
                        style={{
                          color: 'rgba(255,255,255,.8)',
                          fontSize: 13,
                          marginBottom: 12,
                        }}
                      >
                        {next.location === 'home'
                          ? '🏠 Domicile'
                          : '✈️ Extérieur'}{' '}
                        ·{' '}
                        {new Date(next.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                        })}
                      </div>
                      <div
                        style={{
                          background: 'rgba(255,255,255,.2)',
                          borderRadius: 12,
                          padding: '12px',
                          textAlign: 'center',
                        }}
                      >
                        <div
                          style={{
                            fontSize: 36,
                            fontWeight: 800,
                            color: '#fff',
                          }}
                        >
                          {d}
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: 'rgba(255,255,255,.8)',
                            fontWeight: 600,
                          }}
                        >
                          JOURS RESTANTS
                        </div>
                      </div>
                      <div
                        style={{
                          marginTop: 12,
                          fontSize: 12,
                          color: 'rgba(255,255,255,.8)',
                        }}
                      >
                        Formation :{' '}
                        <strong style={{ color: '#fff' }}>
                          {next.formation}
                        </strong>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
            {/* Top performers */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 16,
              }}
            >
              <div className="card">
                <div
                  style={{ fontSize: 14, fontWeight: 800, marginBottom: 12 }}
                >
                  🏆 Top Buteurs
                </div>
                {[...players]
                  .sort((a, b) => b.goals - a.goals)
                  .slice(0, 5)
                  .map((p, i) => (
                    <div
                      key={p.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '6px 0',
                        borderBottom: '1px solid #f8fafc',
                      }}
                    >
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 6,
                          background:
                            i === 0
                              ? '#fef3c7'
                              : i === 1
                              ? '#f1f5f9'
                              : i === 2
                              ? '#fef3c7'
                              : '#f8fafc',
                          color:
                            i === 0
                              ? '#d97706'
                              : i === 1
                              ? '#94a3b8'
                              : '#d97706',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 10,
                          fontWeight: 800,
                        }}
                      >
                        {i + 1}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 700 }}>
                          {p.name}
                        </div>
                        <div
                          style={{
                            height: 3,
                            borderRadius: 2,
                            background: '#f1f5f9',
                            marginTop: 3,
                          }}
                        >
                          <div
                            style={{
                              height: '100%',
                              borderRadius: 2,
                              background:
                                'linear-gradient(90deg,#f59e0b,#fbbf24)',
                              width: `${
                                (p.goals /
                                  Math.max(
                                    1,
                                    players.reduce(
                                      (m, x) => Math.max(m, x.goals),
                                      0
                                    )
                                  )) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: 18,
                          fontWeight: 800,
                          color: '#f59e0b',
                        }}
                      >
                        {p.goals}
                      </div>
                    </div>
                  ))}
              </div>
              <div className="card">
                <div
                  style={{ fontSize: 14, fontWeight: 800, marginBottom: 12 }}
                >
                  📈 Forme de l'équipe
                </div>
                {[...players]
                  .filter((p) => p.status === 'fit')
                  .sort((a, b) => b.form - a.form)
                  .slice(0, 6)
                  .map((p) => (
                    <div
                      key={p.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '5px 0',
                      }}
                    >
                      <div
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: 7,
                          background: posColors[p.position],
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 11,
                          fontWeight: 800,
                          flexShrink: 0,
                        }}
                      >
                        {p.number}
                      </div>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: '#475569',
                          flex: 1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {p.name}
                      </span>
                      <FormDots v={p.form} />
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}

        {/* ===== EFFECTIF ===== */}
        {tab === 'squad' && (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
              }}
            >
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800 }}>Effectif</h2>
                <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 2 }}>
                  Cliquez sur un joueur pour modifier
                </p>
              </div>
              <button className="btn bp" onClick={() => setModal('addPlayer')}>
                + Nouveau joueur
              </button>
            </div>
            {Object.entries({
              GB: 'Gardien',
              DD: 'Défenseur',
              DC: 'Défenseur',
              DG: 'Défenseur',
              MDC: 'Milieu',
              MC: 'Milieu',
              MOC: 'Milieu',
              AD: 'Attaquant',
              AG: 'Attaquant',
              ATT: 'Attaquant',
            })
              .filter(([pos]) => players.some((p) => p.position === pos))
              .reduce((acc, [pos, grp]) => {
                if (!acc.find((x) => x[1] === grp)) acc.push([pos, grp]);
                return acc;
              }, [])
              .map(([pos, grp]) => (
                <div key={grp} style={{ marginBottom: 16 }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#94a3b8',
                      letterSpacing: 1,
                      textTransform: 'uppercase',
                      marginBottom: 8,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <div
                      style={{ height: 1, flex: 1, background: '#f1f5f9' }}
                    />
                    {grp}
                    <div
                      style={{ height: 1, flex: 1, background: '#f1f5f9' }}
                    />
                  </div>
                  {players
                    .filter((p) => posGroup[p.position] === grp)
                    .map((p) => (
                      <div
                        key={p.id}
                        className="prow card"
                        style={{
                          marginBottom: 8,
                          padding: '12px 16px',
                          display: 'grid',
                          gridTemplateColumns:
                            '42px 1fr 70px 70px 130px 110px 50px 70px',
                          alignItems: 'center',
                          gap: 10,
                        }}
                        onClick={() => setSel({ ...p })}
                      >
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 10,
                            background: posColors[p.position] || '#94a3b8',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            fontWeight: 800,
                            fontSize: 14,
                          }}
                        >
                          {p.number}
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700 }}>
                            {p.name}
                          </div>
                          <div
                            style={{
                              fontSize: 11,
                              color: '#94a3b8',
                              marginTop: 1,
                            }}
                          >
                            {p.age}a ·{' '}
                            <span
                              style={{
                                color: posColors[p.position],
                                fontWeight: 700,
                              }}
                            >
                              {p.position}
                            </span>
                            {p.notes && (
                              <span style={{ color: '#94a3b8' }}>
                                {' '}
                                · {p.notes}
                              </span>
                            )}
                          </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div
                            style={{
                              fontSize: 19,
                              fontWeight: 800,
                              color: '#f59e0b',
                            }}
                          >
                            {p.goals}
                          </div>
                          <div
                            style={{
                              fontSize: 9,
                              color: '#94a3b8',
                              fontWeight: 600,
                            }}
                          >
                            Buts
                          </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div
                            style={{
                              fontSize: 19,
                              fontWeight: 800,
                              color: '#8b5cf6',
                            }}
                          >
                            {p.assists}
                          </div>
                          <div
                            style={{
                              fontSize: 9,
                              color: '#94a3b8',
                              fontWeight: 600,
                            }}
                          >
                            Passes D.
                          </div>
                        </div>
                        <div onClick={(e) => e.stopPropagation()}>
                          <FormDots v={p.form} />
                          <div
                            style={{
                              fontSize: 9,
                              color: '#94a3b8',
                              marginTop: 2,
                              fontWeight: 600,
                            }}
                          >
                            Forme
                          </div>
                        </div>
                        <span
                          className="badge"
                          style={{
                            background: statusCfg[p.status].bg,
                            color: statusCfg[p.status].color,
                          }}
                        >
                          {statusCfg[p.status].icon} {statusCfg[p.status].label}
                        </span>
                        <div
                          onClick={(e) => e.stopPropagation()}
                          style={{ textAlign: 'center' }}
                        >
                          <button
                            onClick={() => upd(p.id, { present: !p.present })}
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: 9,
                              border: 'none',
                              cursor: 'pointer',
                              background: p.present ? '#d1fae5' : '#f1f5f9',
                              color: p.present ? '#10b981' : '#94a3b8',
                              fontSize: 14,
                              fontWeight: 700,
                              transition: 'all .2s',
                            }}
                          >
                            {p.present ? '✓' : '–'}
                          </button>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            gap: 3,
                            justifyContent: 'center',
                          }}
                        >
                          {p.yellowCards > 0 && (
                            <span
                              className="chip"
                              style={{
                                background: '#fef3c7',
                                color: '#d97706',
                              }}
                            >
                              🟨{p.yellowCards}
                            </span>
                          )}
                          {p.redCards > 0 && (
                            <span
                              className="chip"
                              style={{
                                background: '#fee2e2',
                                color: '#ef4444',
                              }}
                            >
                              🟥{p.redCards}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              ))}
          </>
        )}

        {/* ===== TACTIQUE ===== */}
        {tab === 'formation' && (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 18,
              }}
            >
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800 }}>
                  Composition Tactique
                </h2>
                <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 2 }}>
                  Cliquez sur un joueur pour le changer
                </p>
              </div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <span
                  style={{ fontSize: 12, fontWeight: 700, color: '#64748b' }}
                >
                  Formation :
                </span>
                {Object.keys(FORMATIONS).map((f) => (
                  <button
                    key={f}
                    className="btn"
                    style={{
                      padding: '6px 12px',
                      background:
                        formation === f
                          ? 'linear-gradient(135deg,#6366f1,#8b5cf6)'
                          : '#f8fafc',
                      color: formation === f ? '#fff' : '#64748b',
                      border: formation === f ? 'none' : '1px solid #e2e8f0',
                      fontSize: 11,
                    }}
                    onClick={() => {
                      setFormation(f);
                      setLineup({});
                      toast('Formation changée : ' + f);
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '5fr 2fr',
                gap: 20,
              }}
            >
              <div
                className="field-grass"
                style={{
                  padding: '18px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: 480,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    width: 70,
                    height: 70,
                    borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,.18)',
                    pointerEvents: 'none',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '12px',
                    right: '12px',
                    height: '1px',
                    background: 'rgba(255,255,255,.18)',
                    pointerEvents: 'none',
                  }}
                />
                {[...fLines].reverse().map((line, ri) => {
                  const li = fLines.length - 1 - ri;
                  return (
                    <div
                      key={li}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        zIndex: 1,
                        position: 'relative',
                      }}
                    >
                      {line.map((pos, pi) => {
                        const p = getSlotPlayer(li, pi);
                        const isSwap = swapSlot?.key === `${li}-${pi}`;
                        return (
                          <div
                            key={pi}
                            className="player-token"
                            onClick={() => {
                              if (swapSlot) {
                                setLineup((l) => ({
                                  ...l,
                                  [swapSlot.key]: p?.id || null,
                                }));
                                setSwapSlot(null);
                              } else {
                                setSwapSlot({ key: `${li}-${pi}`, player: p });
                              }
                            }}
                          >
                            <div
                              className="token-ring"
                              style={{
                                background: p
                                  ? posColors[p.position]
                                  : 'rgba(255,255,255,.15)',
                                border: `3px solid ${
                                  isSwap ? '#fbbf24' : 'rgba(255,255,255,.85)'
                                }`,
                              }}
                            >
                              {p ? (
                                p.number
                              ) : (
                                <span style={{ fontSize: 11, opacity: 0.6 }}>
                                  +
                                </span>
                              )}
                            </div>
                            <div className="token-name">
                              {p ? p.name.split(' ').pop() : pos}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
              >
                {swapSlot && (
                  <div
                    className="card sin"
                    style={{
                      border: '2px solid #f59e0b',
                      background: '#fffbeb',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 800,
                        color: '#d97706',
                        marginBottom: 10,
                      }}
                    >
                      🔄 Choisir un remplaçant
                    </div>
                    <div
                      style={{
                        display: 'grid',
                        gap: 5,
                        maxHeight: 200,
                        overflowY: 'auto',
                      }}
                    >
                      {fitPlayers.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            setLineup((l) => ({ ...l, [swapSlot.key]: p.id }));
                            setSwapSlot(null);
                            toast(`${p.name} placé !`);
                          }}
                          style={{
                            width: '100%',
                            padding: '7px 10px',
                            borderRadius: 9,
                            border: '1px solid #fde68a',
                            background: '#fff',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            fontFamily: "'Plus Jakarta Sans',sans-serif",
                            transition: 'background .15s',
                          }}
                          onMouseOver={(e) =>
                            (e.currentTarget.style.background = '#fffbeb')
                          }
                          onMouseOut={(e) =>
                            (e.currentTarget.style.background = '#fff')
                          }
                        >
                          <div
                            style={{
                              width: 26,
                              height: 26,
                              borderRadius: 7,
                              background: posColors[p.position],
                              color: '#fff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 11,
                              fontWeight: 800,
                            }}
                          >
                            {p.number}
                          </div>
                          <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: 11, fontWeight: 700 }}>
                              {p.name}
                            </div>
                            <div style={{ fontSize: 9, color: '#94a3b8' }}>
                              {p.position} · {p.form}/10
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    <button
                      className="btn bs"
                      style={{ marginTop: 8, width: '100%', fontSize: 11 }}
                      onClick={() => setSwapSlot(null)}
                    >
                      Annuler
                    </button>
                  </div>
                )}
                <div className="card">
                  <div
                    style={{ fontSize: 13, fontWeight: 800, marginBottom: 10 }}
                  >
                    ✅ XI Titulaires
                  </div>
                  {fLines.map((line, li) =>
                    line.map((pos, pi) => {
                      const p = getSlotPlayer(li, pi);
                      return p ? (
                        <div
                          key={`${li}-${pi}`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 7,
                            padding: '4px 0',
                            borderBottom: '1px solid #f8fafc',
                          }}
                        >
                          <div
                            style={{
                              width: 22,
                              height: 22,
                              borderRadius: 6,
                              background: posColors[p.position],
                              color: '#fff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 9,
                              fontWeight: 800,
                            }}
                          >
                            {p.number}
                          </div>
                          <div
                            style={{ flex: 1, fontSize: 10, fontWeight: 700 }}
                          >
                            {p.name}
                          </div>
                          <span
                            style={{
                              fontSize: 8,
                              color: posColors[p.position],
                              fontWeight: 800,
                            }}
                          >
                            {p.position}
                          </span>
                        </div>
                      ) : null;
                    })
                  )}
                </div>
                <div className="card">
                  <div
                    style={{ fontSize: 13, fontWeight: 800, marginBottom: 10 }}
                  >
                    🔄 Remplaçants
                  </div>
                  {players
                    .filter((p) => p.status === 'fit' && p.present)
                    .sort((a, b) => b.form - a.form)
                    .filter((p) => {
                      const used = new Set(Object.values(lineup));
                      return !fLines.some((line, li) =>
                        line.some(
                          (_, pi) =>
                            getSlotPlayer(li, pi)?.id === p.id ||
                            (used.has(p.id) && lineup[`${li}-${pi}`] === p.id)
                        )
                      );
                    })
                    .slice(0, 7)
                    .map((p) => (
                      <div
                        key={p.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 7,
                          padding: '4px 0',
                          borderBottom: '1px solid #f8fafc',
                        }}
                      >
                        <div
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: 6,
                            background: '#f1f5f9',
                            color: '#64748b',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 9,
                            fontWeight: 800,
                          }}
                        >
                          {p.number}
                        </div>
                        <div
                          style={{
                            flex: 1,
                            fontSize: 10,
                            fontWeight: 600,
                            color: '#475569',
                          }}
                        >
                          {p.name}
                        </div>
                        <span
                          style={{
                            fontSize: 8,
                            color: posColors[p.position],
                            fontWeight: 800,
                          }}
                        >
                          {p.position}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ===== MATCHS ===== */}
        {tab === 'match' && (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
              }}
            >
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800 }}>Matchs</h2>
                <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 2 }}>
                  {st.wins}V · {st.draws}N · {st.losses}D
                </p>
              </div>
              <button className="btn bp" onClick={() => setModal('addMatch')}>
                + Ajouter match
              </button>
            </div>
            <div style={{ display: 'grid', gap: 12 }}>
              {matches.map((m) => {
                const w = m.result && +m.result[0] > +m.result[2],
                  d = m.result && +m.result[0] === +m.result[2];
                return (
                  <div
                    key={m.id}
                    className="card"
                    style={{
                      borderLeft: `4px solid ${
                        m.status === 'played'
                          ? w
                            ? '#10b981'
                            : d
                            ? '#f59e0b'
                            : '#ef4444'
                          : '#6366f1'
                      }`,
                      padding: '18px 22px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            marginBottom: 5,
                          }}
                        >
                          <span style={{ fontSize: 17, fontWeight: 800 }}>
                            vs {m.opponent}
                          </span>
                          <span
                            className="badge"
                            style={{
                              background:
                                m.location === 'home' ? '#d1fae5' : '#e0f2fe',
                              color:
                                m.location === 'home' ? '#10b981' : '#0ea5e9',
                            }}
                          >
                            {m.location === 'home' ? '🏠 Dom.' : '✈️ Ext.'}
                          </span>
                          <span
                            className="badge"
                            style={{ background: '#f1f5f9', color: '#64748b' }}
                          >
                            {m.formation}
                          </span>
                        </div>
                        <div style={{ fontSize: 12, color: '#94a3b8' }}>
                          📅{' '}
                          {new Date(m.date).toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                          })}
                        </div>
                        {m.notes && (
                          <div
                            style={{
                              fontSize: 12,
                              color: '#64748b',
                              marginTop: 4,
                              fontStyle: 'italic',
                            }}
                          >
                            "{m.notes}"
                          </div>
                        )}
                      </div>
                      {m.result ? (
                        <div
                          style={{
                            textAlign: 'center',
                            padding: '10px 18px',
                            background: w
                              ? '#d1fae5'
                              : d
                              ? '#fef3c7'
                              : '#fee2e2',
                            borderRadius: 12,
                          }}
                        >
                          <div
                            style={{
                              fontSize: 28,
                              fontWeight: 800,
                              color: w ? '#10b981' : d ? '#f59e0b' : '#ef4444',
                              letterSpacing: 2,
                            }}
                          >
                            {m.result}
                          </div>
                          <div
                            style={{
                              fontSize: 9,
                              fontWeight: 700,
                              color: '#94a3b8',
                            }}
                          >
                            {w ? 'VICTOIRE' : d ? 'NUL' : 'DÉFAITE'}
                          </div>
                        </div>
                      ) : (
                        <div
                          className="pulse"
                          style={{
                            padding: '12px 18px',
                            background: '#eef2ff',
                            borderRadius: 12,
                            textAlign: 'center',
                          }}
                        >
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 800,
                              color: '#6366f1',
                            }}
                          >
                            À VENIR
                          </div>
                          <div
                            style={{
                              fontSize: 10,
                              color: '#94a3b8',
                              marginTop: 2,
                            }}
                          >
                            {daysLeft(m.date)}j
                          </div>
                        </div>
                      )}
                    </div>
                    {(m.scorers.length > 0 || m.assists.length > 0) && (
                      <div
                        style={{
                          marginTop: 12,
                          paddingTop: 12,
                          borderTop: '1px solid #f8fafc',
                          display: 'flex',
                          gap: 16,
                          flexWrap: 'wrap',
                        }}
                      >
                        {m.scorers.length > 0 && (
                          <div
                            style={{
                              display: 'flex',
                              gap: 6,
                              alignItems: 'center',
                              flexWrap: 'wrap',
                            }}
                          >
                            <span
                              style={{
                                fontSize: 10,
                                fontWeight: 700,
                                color: '#94a3b8',
                              }}
                            >
                              BUTS
                            </span>
                            {m.scorers.map((s, i) => (
                              <span
                                key={i}
                                className="chip"
                                style={{
                                  background: '#fef3c7',
                                  color: '#d97706',
                                }}
                              >
                                ⚽ {s}
                              </span>
                            ))}
                          </div>
                        )}
                        {m.assists.length > 0 && (
                          <div
                            style={{
                              display: 'flex',
                              gap: 6,
                              alignItems: 'center',
                              flexWrap: 'wrap',
                            }}
                          >
                            <span
                              style={{
                                fontSize: 10,
                                fontWeight: 700,
                                color: '#94a3b8',
                              }}
                            >
                              PASSES D.
                            </span>
                            {m.assists.map((s, i) => (
                              <span
                                key={i}
                                className="chip"
                                style={{
                                  background: '#ede9fe',
                                  color: '#7c3aed',
                                }}
                              >
                                🎯 {s}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    {m.status === 'upcoming' && (
                      <div
                        style={{
                          marginTop: 12,
                          paddingTop: 12,
                          borderTop: '1px solid #f8fafc',
                        }}
                      >
                        <div
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: '#94a3b8',
                            marginBottom: 6,
                          }}
                        >
                          CONVOCATION SUGGÉRÉE (meilleure forme)
                        </div>
                        <div
                          style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}
                        >
                          {players
                            .filter((p) => p.status === 'fit')
                            .sort((a, b) => b.form - a.form)
                            .slice(0, 11)
                            .map((p) => (
                              <span
                                key={p.id}
                                className="chip"
                                style={{
                                  background: '#eef2ff',
                                  color: '#6366f1',
                                }}
                              >
                                #{p.number} {p.name.split(' ')[0]}
                              </span>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ===== ENTRAÎNEMENT ===== */}
        {tab === 'training' && (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
              }}
            >
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800 }}>Entraînements</h2>
                <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 2 }}>
                  Gestion des séances et présence
                </p>
              </div>
              <button
                className="btn bp"
                onClick={() => setModal('addTraining')}
              >
                + Planifier séance
              </button>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '3fr 2fr',
                gap: 16,
              }}
            >
              <div style={{ display: 'grid', gap: 10 }}>
                {trainings.map((t) => (
                  <div key={t.id} className="card">
                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: 16 }}
                    >
                      <div
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 14,
                          background:
                            t.type === 'Tactique'
                              ? '#eef2ff'
                              : t.type === 'Physique'
                              ? '#fee2e2'
                              : t.type === 'Récupération'
                              ? '#d1fae5'
                              : '#fef3c7',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 22,
                          flexShrink: 0,
                        }}
                      >
                        {t.type === 'Tactique'
                          ? '🧠'
                          : t.type === 'Physique'
                          ? '💪'
                          : t.type === 'Récupération'
                          ? '🛁'
                          : '⚽'}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            marginBottom: 4,
                          }}
                        >
                          <span style={{ fontSize: 14, fontWeight: 800 }}>
                            {t.type}
                          </span>
                          <span
                            className="badge"
                            style={{ background: '#f1f5f9', color: '#64748b' }}
                          >
                            {t.duration} min
                          </span>
                          <span
                            className="badge"
                            style={{ background: '#eef2ff', color: '#6366f1' }}
                          >
                            Charge {t.load}%
                          </span>
                        </div>
                        <div style={{ fontSize: 12, color: '#475569' }}>
                          {t.focus} ·{' '}
                          <span style={{ color: '#94a3b8' }}>{t.notes}</span>
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: '#94a3b8',
                            marginTop: 3,
                          }}
                        >
                          📅 {new Date(t.date).toLocaleDateString('fr-FR')} ·{' '}
                          {t.attendance.length}/{players.length} présents
                        </div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div
                          style={{
                            fontSize: 20,
                            fontWeight: 800,
                            color:
                              t.attendance.length >= 13 ? '#10b981' : '#f59e0b',
                          }}
                        >
                          {Math.round(
                            (t.attendance.length / players.length) * 100
                          )}
                          %
                        </div>
                        <div
                          style={{
                            fontSize: 9,
                            color: '#94a3b8',
                            fontWeight: 600,
                          }}
                        >
                          Présence
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        marginTop: 12,
                        paddingTop: 12,
                        borderTop: '1px solid #f8fafc',
                      }}
                    >
                      <div
                        style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}
                      >
                        {t.attendance.map((id) => {
                          const p = players.find((x) => x.id === id);
                          return p ? (
                            <span
                              key={id}
                              className="chip"
                              style={{
                                background: '#f0fdf4',
                                color: '#15803d',
                              }}
                            >
                              #{p.number} {p.name.split(' ')[0]}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="card">
                <div
                  style={{ fontSize: 14, fontWeight: 800, marginBottom: 12 }}
                >
                  ✅ Présence aujourd'hui
                </div>
                <div
                  style={{
                    marginBottom: 14,
                    padding: '10px 14px',
                    background: '#f8fafc',
                    borderRadius: 10,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 6,
                    }}
                  >
                    <span style={{ fontSize: 12, fontWeight: 700 }}>
                      {players.filter((p) => p.present).length}/{players.length}{' '}
                      présents
                    </span>
                    <span style={{ fontSize: 11, color: '#94a3b8' }}>
                      {Math.round(
                        (players.filter((p) => p.present).length /
                          players.length) *
                          100
                      )}
                      %
                    </span>
                  </div>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{
                        width: `${
                          (players.filter((p) => p.present).length /
                            players.length) *
                          100
                        }%`,
                        background: 'linear-gradient(90deg,#6366f1,#8b5cf6)',
                      }}
                    />
                  </div>
                </div>
                {players.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => upd(p.id, { present: !p.present })}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '6px 10px',
                      borderRadius: 9,
                      background: p.present ? '#f0fdf4' : '#f8fafc',
                      border: `1px solid ${p.present ? '#bbf7d0' : '#f1f5f9'}`,
                      cursor: 'pointer',
                      marginBottom: 5,
                      transition: 'all .2s',
                    }}
                  >
                    <div
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        background: p.present ? '#10b981' : '#e2e8f0',
                      }}
                    />
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: p.present ? '#15803d' : '#94a3b8',
                        flex: 1,
                      }}
                    >
                      #{p.number} {p.name}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        color: p.present ? '#10b981' : '#94a3b8',
                      }}
                    >
                      {p.present ? '✓' : '✕'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ===== MÉDICAL ===== */}
        {tab === 'medical' && (
          <>
            <div style={{ marginBottom: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800 }}>Suivi Médical</h2>
              <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 2 }}>
                Historique des blessures et récupération
              </p>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 16,
              }}
            >
              {players.map((p) => (
                <div
                  key={p.id}
                  className="card"
                  style={{
                    borderLeft: `4px solid ${statusCfg[p.status].color}`,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: 10,
                    }}
                  >
                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: 10 }}
                    >
                      <div
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: 10,
                          background: posColors[p.position],
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: 13,
                        }}
                      >
                        {p.number}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700 }}>
                          {p.name}
                        </div>
                        <div style={{ fontSize: 11, color: '#94a3b8' }}>
                          {p.position} · {p.age}a
                        </div>
                      </div>
                    </div>
                    <div
                      style={{ display: 'flex', gap: 6, alignItems: 'center' }}
                    >
                      <span
                        className="badge"
                        style={{
                          background: statusCfg[p.status].bg,
                          color: statusCfg[p.status].color,
                        }}
                      >
                        {statusCfg[p.status].label}
                      </span>
                      <button
                        className="btn bs"
                        style={{ padding: '4px 10px', fontSize: 11 }}
                        onClick={() => setSel({ ...p, _medicalEdit: true })}
                      >
                        Modifier
                      </button>
                    </div>
                  </div>
                  {p.injuryHistory.length > 0 ? (
                    <div
                      style={{
                        background: '#f8fafc',
                        borderRadius: 10,
                        padding: '10px',
                      }}
                    >
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: '#94a3b8',
                          marginBottom: 6,
                          textTransform: 'uppercase',
                          letterSpacing: 0.5,
                        }}
                      >
                        Historique des blessures
                      </div>
                      {p.injuryHistory.map((inj, i) => (
                        <div
                          key={i}
                          style={{
                            padding: '6px 0',
                            borderBottom: '1px solid #f1f5f9',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <div>
                            <span
                              className="chip"
                              style={{
                                background: '#fee2e2',
                                color: '#ef4444',
                                marginRight: 6,
                              }}
                            >
                              {inj.type}
                            </span>
                            <span style={{ fontSize: 11, color: '#64748b' }}>
                              Depuis le{' '}
                              {new Date(inj.date).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                          {inj.recovery && (
                            <span
                              style={{
                                fontSize: 10,
                                color: '#10b981',
                                fontWeight: 700,
                              }}
                            >
                              Retour:{' '}
                              {new Date(inj.recovery).toLocaleDateString(
                                'fr-FR'
                              )}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      style={{
                        fontSize: 12,
                        color: '#94a3b8',
                        fontStyle: 'italic',
                      }}
                    >
                      Aucune blessure enregistrée ✅
                    </div>
                  )}
                  {p.notes && (
                    <div
                      style={{
                        marginTop: 8,
                        fontSize: 11,
                        color: '#64748b',
                        padding: '6px 10px',
                        background: '#fef9c3',
                        borderRadius: 8,
                      }}
                    >
                      📝 {p.notes}
                    </div>
                  )}
                  <button
                    className="btn bs"
                    style={{ marginTop: 10, width: '100%', fontSize: 11 }}
                    onClick={() => {
                      const type =
                        injuryTypes[
                          Math.floor(Math.random() * injuryTypes.length)
                        ];
                      const today = new Date().toISOString().split('T')[0];
                      const rec = new Date(
                        Date.now() + 14 * 24 * 60 * 60 * 1000
                      )
                        .toISOString()
                        .split('T')[0];
                      upd(p.id, {
                        injuryHistory: [
                          ...p.injuryHistory,
                          { type, date: today, recovery: rec },
                        ],
                        status: 'injured',
                        form: 0,
                        present: false,
                      });
                      toast('Blessure enregistrée');
                    }}
                  >
                    + Signaler blessure
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ===== PHYSIQUE ===== */}
        {tab === 'physical' && (
          <>
            <div style={{ marginBottom: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800 }}>
                Préparation Physique
              </h2>
              <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 2 }}>
                Tests, GPS, charge d'entraînement
              </p>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '3fr 2fr',
                gap: 16,
              }}
            >
              <div>
                <div className="card" style={{ marginBottom: 16 }}>
                  <div
                    style={{ fontSize: 14, fontWeight: 800, marginBottom: 14 }}
                  >
                    📊 Charge d'entraînement hebdomadaire
                  </div>
                  {players
                    .filter((p) => p.status === 'fit')
                    .map((p) => (
                      <div key={p.id} style={{ marginBottom: 12 }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: 4,
                          }}
                        >
                          <span style={{ fontSize: 12, fontWeight: 600 }}>
                            #{p.number} {p.name}
                          </span>
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              color:
                                p.physicalLoad > 85
                                  ? '#ef4444'
                                  : p.physicalLoad > 70
                                  ? '#f59e0b'
                                  : '#10b981',
                            }}
                          >
                            {p.physicalLoad}%
                          </span>
                        </div>
                        <div className="progress">
                          <div
                            className="progress-bar"
                            style={{
                              width: `${p.physicalLoad}%`,
                              background:
                                p.physicalLoad > 85
                                  ? 'linear-gradient(90deg,#ef4444,#f97316)'
                                  : p.physicalLoad > 70
                                  ? 'linear-gradient(90deg,#f59e0b,#fbbf24)'
                                  : 'linear-gradient(90deg,#10b981,#34d399)',
                            }}
                          />
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: 2,
                          }}
                        >
                          <span style={{ fontSize: 9, color: '#94a3b8' }}>
                            GPS:{' '}
                            {p.gpsDistance || Math.round(8 + Math.random() * 4)}
                            km
                          </span>
                          {p.physicalLoad > 85 && (
                            <span
                              style={{
                                fontSize: 9,
                                color: '#ef4444',
                                fontWeight: 700,
                              }}
                            >
                              ⚠️ Surcharge
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
              >
                <div className="card">
                  <div
                    style={{ fontSize: 14, fontWeight: 800, marginBottom: 14 }}
                  >
                    🏃 Tests Physiques
                  </div>
                  {PHYSICAL_TESTS.map((test) => (
                    <div key={test.id} style={{ marginBottom: 14 }}>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          marginBottom: 8,
                        }}
                      >
                        {test.name} ({test.unit})
                      </div>
                      {players
                        .filter((p) => p.status === 'fit')
                        .slice(0, 5)
                        .map((p) => {
                          const key = `${p.id}-${test.id}`;
                          const val = physTests[key];
                          return (
                            <div
                              key={p.id}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                marginBottom: 4,
                              }}
                            >
                              <span
                                style={{
                                  fontSize: 10,
                                  color: '#94a3b8',
                                  minWidth: 80,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {p.name.split(' ')[0]}
                              </span>
                              <input
                                type="number"
                                step="0.1"
                                className="inp"
                                style={{
                                  padding: '4px 8px',
                                  fontSize: 11,
                                  flex: 1,
                                }}
                                placeholder="—"
                                value={val || ''}
                                onChange={(e) =>
                                  setPhysTests((t) => ({
                                    ...t,
                                    [key]: e.target.value,
                                  }))
                                }
                              />
                              <span
                                style={{
                                  fontSize: 9,
                                  color: '#94a3b8',
                                  minWidth: 24,
                                }}
                              >
                                {test.unit}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  ))}
                  <button
                    className="btn bg2"
                    style={{ width: '100%', marginTop: 4 }}
                    onClick={() => toast('Tests sauvegardés !')}
                  >
                    💾 Sauvegarder
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ===== STATS ===== */}
        {tab === 'stats' && (
          <>
            <div style={{ marginBottom: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800 }}>Statistiques</h2>
              <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 2 }}>
                Performances de l'équipe et des joueurs
              </p>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 14,
              }}
            >
              <div className="card">
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 800,
                    marginBottom: 14,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  🏆 Top Buteurs
                </div>
                {[...players]
                  .sort((a, b) => b.goals - a.goals)
                  .slice(0, 8)
                  .map((p, i) => (
                    <div
                      key={p.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '7px 0',
                        borderBottom: '1px solid #f8fafc',
                      }}
                    >
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 6,
                          background:
                            i === 0
                              ? '#fef3c7'
                              : i === 1
                              ? '#f1f5f9'
                              : i === 2
                              ? '#fef3c7'
                              : '#f8fafc',
                          color:
                            i === 0
                              ? '#d97706'
                              : i === 1
                              ? '#94a3b8'
                              : i === 2
                              ? '#92400e'
                              : '#94a3b8',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 10,
                          fontWeight: 800,
                        }}
                      >
                        {i + 1}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 700 }}>
                          {p.name}
                        </div>
                        <div
                          style={{
                            height: 3,
                            borderRadius: 2,
                            background: '#f1f5f9',
                            marginTop: 3,
                          }}
                        >
                          <div
                            style={{
                              height: '100%',
                              borderRadius: 2,
                              background:
                                'linear-gradient(90deg,#f59e0b,#fbbf24)',
                              width: `${
                                (p.goals /
                                  Math.max(
                                    1,
                                    players.reduce(
                                      (m, x) => Math.max(m, x.goals),
                                      0
                                    )
                                  )) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: 19,
                          fontWeight: 800,
                          color: '#f59e0b',
                        }}
                      >
                        {p.goals}
                      </div>
                    </div>
                  ))}
              </div>
              <div className="card">
                <div
                  style={{ fontSize: 14, fontWeight: 800, marginBottom: 14 }}
                >
                  🎯 Top Passeurs
                </div>
                {[...players]
                  .sort((a, b) => b.assists - a.assists)
                  .slice(0, 8)
                  .map((p, i) => (
                    <div
                      key={p.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '7px 0',
                        borderBottom: '1px solid #f8fafc',
                      }}
                    >
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 6,
                          background: i === 0 ? '#ede9fe' : '#f8fafc',
                          color: i === 0 ? '#7c3aed' : '#94a3b8',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 10,
                          fontWeight: 800,
                        }}
                      >
                        {i + 1}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 700 }}>
                          {p.name}
                        </div>
                        <div
                          style={{
                            height: 3,
                            borderRadius: 2,
                            background: '#f1f5f9',
                            marginTop: 3,
                          }}
                        >
                          <div
                            style={{
                              height: '100%',
                              borderRadius: 2,
                              background:
                                'linear-gradient(90deg,#8b5cf6,#a78bfa)',
                              width: `${
                                (p.assists /
                                  Math.max(
                                    1,
                                    players.reduce(
                                      (m, x) => Math.max(m, x.assists),
                                      0
                                    )
                                  )) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: 19,
                          fontWeight: 800,
                          color: '#8b5cf6',
                        }}
                      >
                        {p.assists}
                      </div>
                    </div>
                  ))}
              </div>
              <div className="card">
                <div
                  style={{ fontSize: 14, fontWeight: 800, marginBottom: 14 }}
                >
                  📈 Forme générale
                </div>
                {[...players]
                  .filter((p) => p.status === 'fit')
                  .sort((a, b) => b.form - a.form)
                  .map((p) => (
                    <div
                      key={p.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '5px 0',
                      }}
                    >
                      <div
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: 7,
                          background: posColors[p.position],
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 10,
                          fontWeight: 800,
                          flexShrink: 0,
                        }}
                      >
                        {p.number}
                      </div>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: '#475569',
                          flex: 1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {p.name}
                      </span>
                      <FormDots v={p.form} />
                    </div>
                  ))}
              </div>
              <div className="card">
                <div
                  style={{ fontSize: 14, fontWeight: 800, marginBottom: 14 }}
                >
                  🟨 Discipline
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 10,
                    marginBottom: 14,
                  }}
                >
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '12px',
                      background: '#fef3c7',
                      borderRadius: 12,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 24,
                        fontWeight: 800,
                        color: '#d97706',
                      }}
                    >
                      {players.reduce((s, p) => s + p.yellowCards, 0)}
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        color: '#94a3b8',
                        fontWeight: 600,
                      }}
                    >
                      Cartons jaunes
                    </div>
                  </div>
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '12px',
                      background: '#fee2e2',
                      borderRadius: 12,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 24,
                        fontWeight: 800,
                        color: '#ef4444',
                      }}
                    >
                      {players.reduce((s, p) => s + p.redCards, 0)}
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        color: '#94a3b8',
                        fontWeight: 600,
                      }}
                    >
                      Cartons rouges
                    </div>
                  </div>
                </div>
                {players
                  .filter((p) => p.yellowCards > 0 || p.redCards > 0)
                  .map((p) => (
                    <div
                      key={p.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '7px 0',
                        borderBottom: '1px solid #f8fafc',
                      }}
                    >
                      <span style={{ fontSize: 12, fontWeight: 600 }}>
                        {p.name}
                      </span>
                      <div style={{ display: 'flex', gap: 5 }}>
                        {p.yellowCards > 0 && (
                          <span
                            className="chip"
                            style={{ background: '#fef3c7', color: '#d97706' }}
                          >
                            🟨×{p.yellowCards}
                          </span>
                        )}
                        {p.redCards > 0 && (
                          <span
                            className="chip"
                            style={{ background: '#fee2e2', color: '#ef4444' }}
                          >
                            🟥×{p.redCards}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}

        {/* ===== CALENDRIER ===== */}
        {tab === 'calendar' && (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
              }}
            >
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800 }}>Calendrier</h2>
                <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 2 }}>
                  Vue mensuelle matchs & entraînements
                </p>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button
                  className="btn bs"
                  onClick={() =>
                    setCalMonth(
                      (m) => new Date(m.getFullYear(), m.getMonth() - 1, 1)
                    )
                  }
                >
                  ←
                </button>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    minWidth: 130,
                    textAlign: 'center',
                  }}
                >
                  {calMonth.toLocaleDateString('fr-FR', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
                <button
                  className="btn bs"
                  onClick={() =>
                    setCalMonth(
                      (m) => new Date(m.getFullYear(), m.getMonth() + 1, 1)
                    )
                  }
                >
                  →
                </button>
              </div>
            </div>
            <div className="card">
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7,1fr)',
                  gap: 4,
                  marginBottom: 8,
                }}
              >
                {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((d) => (
                  <div
                    key={d}
                    style={{
                      textAlign: 'center',
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#94a3b8',
                      padding: '6px',
                    }}
                  >
                    {d}
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7,1fr)',
                  gap: 4,
                }}
              >
                {(() => {
                  const year = calMonth.getFullYear(),
                    month = calMonth.getMonth();
                  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
                  const daysInMonth = new Date(year, month + 1, 0).getDate();
                  const cells = [];
                  for (let i = 0; i < firstDay; i++)
                    cells.push(<div key={`e${i}`} />);
                  for (let d = 1; d <= daysInMonth; d++) {
                    const dateStr = `${year}-${String(month + 1).padStart(
                      2,
                      '0'
                    )}-${String(d).padStart(2, '0')}`;
                    const hasMatch = matches.find((m) => m.date === dateStr);
                    const hasTrain = trainings.find((t) => t.date === dateStr);
                    const isToday =
                      new Date().toISOString().split('T')[0] === dateStr;
                    cells.push(
                      <div
                        key={d}
                        style={{
                          minHeight: 56,
                          borderRadius: 10,
                          background: isToday ? '#eef2ff' : '#f8fafc',
                          border: `1.5px solid ${
                            isToday ? '#6366f1' : '#f1f5f9'
                          }`,
                          padding: '4px 6px',
                          fontSize: 11,
                        }}
                      >
                        <div
                          style={{
                            fontWeight: isToday ? 800 : 600,
                            color: isToday ? '#6366f1' : '#0f172a',
                            marginBottom: 3,
                          }}
                        >
                          {d}
                        </div>
                        {hasMatch && (
                          <div
                            style={{
                              background:
                                hasMatch.status === 'played'
                                  ? '#d1fae5'
                                  : '#eef2ff',
                              color:
                                hasMatch.status === 'played'
                                  ? '#10b981'
                                  : '#6366f1',
                              borderRadius: 4,
                              padding: '1px 4px',
                              fontSize: 9,
                              fontWeight: 700,
                              marginBottom: 2,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            ⚽ {hasMatch.opponent}
                          </div>
                        )}
                        {hasTrain && (
                          <div
                            style={{
                              background: '#fef3c7',
                              color: '#d97706',
                              borderRadius: 4,
                              padding: '1px 4px',
                              fontSize: 9,
                              fontWeight: 700,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            🏃 {hasTrain.type}
                          </div>
                        )}
                      </div>
                    );
                  }
                  return cells;
                })()}
              </div>
            </div>
          </>
        )}

        {/* ===== ADMINISTRATIF ===== */}
        {tab === 'admin' && (
          <>
            <div style={{ marginBottom: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800 }}>
                Gestion Administrative
              </h2>
              <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 2 }}>
                Contrats, salaires et documents
              </p>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '3fr 2fr',
                gap: 16,
              }}
            >
              <div className="card">
                <div
                  style={{ fontSize: 14, fontWeight: 800, marginBottom: 14 }}
                >
                  📋 Contrats joueurs
                </div>
                <div style={{ display: 'grid', gap: 6 }}>
                  {[...players]
                    .sort((a, b) => new Date(a.contract) - new Date(b.contract))
                    .map((p) => {
                      const d = daysLeft(p.contract);
                      const urgent = d < 365;
                      return (
                        <div
                          key={p.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            padding: '10px 12px',
                            borderRadius: 10,
                            background: urgent ? '#fff7ed' : '#f8fafc',
                            border: `1px solid ${
                              urgent ? '#fed7aa' : '#f1f5f9'
                            }`,
                          }}
                        >
                          <div
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: 8,
                              background: posColors[p.position],
                              color: '#fff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 11,
                              fontWeight: 800,
                            }}
                          >
                            {p.number}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 12, fontWeight: 700 }}>
                              {p.name}
                            </div>
                            <div style={{ fontSize: 10, color: '#94a3b8' }}>
                              Expire:{' '}
                              {new Date(p.contract).toLocaleDateString('fr-FR')}
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div
                              style={{
                                fontSize: 12,
                                fontWeight: 700,
                                color: urgent ? '#ea580c' : '#10b981',
                              }}
                            >
                              {d}j
                            </div>
                            {urgent && (
                              <span
                                className="badge"
                                style={{
                                  background: '#fed7aa',
                                  color: '#ea580c',
                                  fontSize: 9,
                                }}
                              >
                                ⚠️ Urgent
                              </span>
                            )}
                          </div>
                          <div
                            style={{
                              fontSize: 12,
                              fontWeight: 700,
                              color: '#64748b',
                            }}
                          >
                            {p.salary.toLocaleString()}€/m
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
              >
                <div className="card">
                  <div
                    style={{ fontSize: 14, fontWeight: 800, marginBottom: 14 }}
                  >
                    💰 Budget salaires
                  </div>
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '16px',
                      background: 'linear-gradient(135deg,#eef2ff,#ede9fe)',
                      borderRadius: 12,
                      marginBottom: 14,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 30,
                        fontWeight: 800,
                        color: '#6366f1',
                        letterSpacing: '-1px',
                      }}
                    >
                      {st.budget.toLocaleString()}€
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: '#94a3b8',
                        fontWeight: 600,
                      }}
                    >
                      MASSE SALARIALE / MOIS
                    </div>
                  </div>
                  {[...players]
                    .sort((a, b) => b.salary - a.salary)
                    .slice(0, 5)
                    .map((p) => (
                      <div
                        key={p.id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '6px 0',
                          borderBottom: '1px solid #f8fafc',
                        }}
                      >
                        <span style={{ fontSize: 12, fontWeight: 600 }}>
                          {p.name}
                        </span>
                        <div style={{ textAlign: 'right' }}>
                          <div
                            style={{
                              fontSize: 12,
                              fontWeight: 700,
                              color: '#6366f1',
                            }}
                          >
                            {p.salary.toLocaleString()}€
                          </div>
                          <div
                            style={{
                              height: 3,
                              borderRadius: 2,
                              background: '#f1f5f9',
                              width: 80,
                              marginTop: 2,
                            }}
                          >
                            <div
                              style={{
                                height: '100%',
                                borderRadius: 2,
                                background:
                                  'linear-gradient(90deg,#6366f1,#8b5cf6)',
                                width: `${
                                  (p.salary /
                                    Math.max(
                                      1,
                                      players.reduce(
                                        (m, x) => Math.max(m, x.salary),
                                        0
                                      )
                                    )) *
                                  100
                                }%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="card">
                  <div
                    style={{ fontSize: 14, fontWeight: 800, marginBottom: 12 }}
                  >
                    📄 Actions rapides
                  </div>
                  {[
                    ['📋 Générer convocation', 'Convocation générée !'],
                    ['📊 Rapport mensuel', 'Rapport créé !'],
                    ["📧 Email à l'équipe", 'Email envoyé !'],
                    ["🖨️ Fiche d'équipe", 'Fiche imprimée !'],
                  ].map(([lb, msg]) => (
                    <button
                      key={lb}
                      className="btn bs"
                      style={{
                        width: '100%',
                        marginBottom: 8,
                        textAlign: 'left',
                        justifyContent: 'flex-start',
                      }}
                      onClick={() => toast(msg)}
                    >
                      {lb}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ===== MESSAGES ===== */}
        {tab === 'messages' && (
          <>
            <div style={{ marginBottom: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800 }}>Messagerie</h2>
              <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 2 }}>
                Communication avec l'équipe
              </p>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 3fr',
                gap: 16,
                height: 500,
              }}
            >
              <div
                className="card"
                style={{ overflow: 'auto', padding: '12px' }}
              >
                {[
                  {
                    id: 'all',
                    name: '📢 Tout le groupe',
                    sub: 'Message général',
                  },
                  ...players.map((p) => ({
                    id: String(p.id),
                    name: p.name,
                    sub: p.position,
                  })),
                ].map((c) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      setActiveMsg(c.id);
                      setMessages((ms) =>
                        ms.map((m) =>
                          m.to === c.id || c.id === 'all'
                            ? { ...m, read: true }
                            : m
                        )
                      );
                    }}
                    style={{
                      padding: '8px 10px',
                      borderRadius: 10,
                      cursor: 'pointer',
                      background:
                        activeMsg === c.id ? '#eef2ff' : 'transparent',
                      marginBottom: 4,
                      transition: 'background .15s',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: activeMsg === c.id ? '#6366f1' : '#0f172a',
                      }}
                    >
                      {c.name}
                    </div>
                    <div style={{ fontSize: 10, color: '#94a3b8' }}>
                      {c.sub}
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '16px',
                }}
              >
                <div
                  style={{
                    flex: 1,
                    overflowY: 'auto',
                    marginBottom: 14,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                  }}
                >
                  {messages
                    .filter((m) =>
                      activeMsg === 'all'
                        ? m.to === 'all'
                        : m.from ===
                            players.find((p) => String(p.id) === activeMsg)
                              ?.name ||
                          m.to ===
                            players.find((p) => String(p.id) === activeMsg)
                              ?.name ||
                          m.to === 'all'
                    )
                    .map((m) => (
                      <div
                        key={m.id}
                        style={{
                          display: 'flex',
                          justifyContent:
                            m.from === 'Coach' ? 'flex-end' : 'flex-start',
                        }}
                      >
                        <div
                          className="msg-bubble"
                          style={{
                            background:
                              m.from === 'Coach'
                                ? 'linear-gradient(135deg,#6366f1,#8b5cf6)'
                                : '#f8fafc',
                            color: m.from === 'Coach' ? '#fff' : '#0f172a',
                            border:
                              m.from === 'Coach' ? 'none' : '1px solid #f1f5f9',
                          }}
                        >
                          {m.from !== 'Coach' && (
                            <div
                              style={{
                                fontSize: 10,
                                fontWeight: 700,
                                color: '#6366f1',
                                marginBottom: 3,
                              }}
                            >
                              {m.from}
                            </div>
                          )}
                          {m.text}
                          <div
                            style={{
                              fontSize: 9,
                              opacity: 0.6,
                              marginTop: 4,
                              textAlign: 'right',
                            }}
                          >
                            {m.time.split(' ')[1]}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <input
                    className="inp"
                    placeholder="Écrire un message..."
                    value={msgInput}
                    onChange={(e) => setMsgInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && msgInput.trim()) {
                        setMessages((ms) => [
                          ...ms,
                          {
                            id: Date.now(),
                            from: 'Coach',
                            to: activeMsg,
                            text: msgInput.trim(),
                            time: new Date()
                              .toLocaleString('fr-FR')
                              .slice(0, 16),
                            read: true,
                          },
                        ]);
                        setMsgInput('');
                      }
                    }}
                    style={{ flex: 1 }}
                  />
                  <button
                    className="btn bp"
                    onClick={() => {
                      if (msgInput.trim()) {
                        setMessages((ms) => [
                          ...ms,
                          {
                            id: Date.now(),
                            from: 'Coach',
                            to: activeMsg,
                            text: msgInput.trim(),
                            time: new Date()
                              .toLocaleString('fr-FR')
                              .slice(0, 16),
                            read: true,
                          },
                        ]);
                        setMsgInput('');
                      }
                    }}
                    style={{ padding: '9px 18px' }}
                  >
                    Envoyer ➤
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ===== VIDEOS ===== */}
        {tab === 'videos' && (
          <>
            <div style={{ marginBottom: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800 }}>
                Vidéothèque Tactique
              </h2>
              <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 2 }}>
                Analyses et drills vidéo
              </p>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '3fr 2fr',
                gap: 16,
              }}
            >
              <div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 12,
                  }}
                >
                  {videoLinks.map((v) => (
                    <div
                      key={v.id}
                      className="card"
                      style={{ overflow: 'hidden', padding: 0 }}
                    >
                      <div
                        style={{
                          background: 'linear-gradient(135deg,#0f172a,#1e293b)',
                          height: 120,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 40,
                          cursor: 'pointer',
                        }}
                        onClick={() => window.open(v.url, '_blank')}
                      >
                        ▶️
                      </div>
                      <div style={{ padding: '12px' }}>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            marginBottom: 4,
                          }}
                        >
                          {v.title}
                        </div>
                        <div style={{ fontSize: 11, color: '#94a3b8' }}>
                          📅 {new Date(v.date).toLocaleDateString('fr-FR')}
                        </div>
                        <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                          <button
                            className="btn bp"
                            style={{ flex: 1, fontSize: 11, padding: '6px' }}
                            onClick={() => window.open(v.url, '_blank')}
                          >
                            ▶ Voir
                          </button>
                          <button
                            className="btn br"
                            style={{ padding: '6px 10px', fontSize: 11 }}
                            onClick={() => {
                              setVideoLinks((vs) =>
                                vs.filter((x) => x.id !== v.id)
                              );
                              toast('Vidéo supprimée');
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card">
                <div
                  style={{ fontSize: 14, fontWeight: 800, marginBottom: 14 }}
                >
                  ➕ Ajouter une vidéo
                </div>
                <div style={{ display: 'grid', gap: 10 }}>
                  <div>
                    <Label>Titre</Label>
                    <input
                      className="inp"
                      placeholder="ex: Analyse corners défensifs"
                      value={newVideo.title}
                      onChange={(e) =>
                        setNewVideo((v) => ({ ...v, title: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <Label>Lien YouTube / URL</Label>
                    <input
                      className="inp"
                      placeholder="https://..."
                      value={newVideo.url}
                      onChange={(e) =>
                        setNewVideo((v) => ({ ...v, url: e.target.value }))
                      }
                    />
                  </div>
                  <button
                    className="btn bp"
                    onClick={() => {
                      if (newVideo.title && newVideo.url) {
                        setVideoLinks((vs) => [
                          ...vs,
                          {
                            id: Date.now(),
                            title: newVideo.title,
                            url: newVideo.url,
                            date: new Date().toISOString().split('T')[0],
                          },
                        ]);
                        setNewVideo({ title: '', url: '' });
                        toast('Vidéo ajoutée !');
                      }
                    }}
                    style={{ width: '100%' }}
                  >
                    Ajouter la vidéo
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ===== SONDAGES ===== */}
        {tab === 'polls' && (
          <>
            <div style={{ marginBottom: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800 }}>
                Sondages d'équipe
              </h2>
              <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 2 }}>
                Votez et consultez les résultats
              </p>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '3fr 2fr',
                gap: 16,
              }}
            >
              <div style={{ display: 'grid', gap: 12 }}>
                {polls.map((poll) => {
                  const totalVotes = Object.values(poll.votes).flat().length;
                  return (
                    <div
                      key={poll.id}
                      className="card"
                      style={{
                        borderLeft: `4px solid ${
                          poll.closed ? '#94a3b8' : '#6366f1'
                        }`,
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: 14,
                        }}
                      >
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 800 }}>
                            {poll.question}
                          </div>
                          <div
                            style={{
                              fontSize: 11,
                              color: '#94a3b8',
                              marginTop: 2,
                            }}
                          >
                            {totalVotes} votes ·{' '}
                            {poll.closed ? 'Terminé' : 'En cours'}
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: 6 }}>
                          {!poll.closed && (
                            <button
                              className="btn bs"
                              style={{ fontSize: 11, padding: '4px 10px' }}
                              onClick={() => {
                                setPolls((ps) =>
                                  ps.map((p) =>
                                    p.id === poll.id
                                      ? { ...p, closed: true }
                                      : p
                                  )
                                );
                                toast('Sondage clôturé');
                              }}
                            >
                              Clôturer
                            </button>
                          )}
                          <button
                            className="btn br"
                            style={{ fontSize: 11, padding: '4px 10px' }}
                            onClick={() => {
                              setPolls((ps) =>
                                ps.filter((p) => p.id !== poll.id)
                              );
                              toast('Sondage supprimé');
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                      {poll.options.map((opt, oi) => {
                        const count = poll.votes[oi]?.length || 0;
                        const pct = totalVotes
                          ? Math.round((count / totalVotes) * 100)
                          : 0;
                        return (
                          <div key={oi} style={{ marginBottom: 10 }}>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: 4,
                              }}
                            >
                              <span style={{ fontSize: 12, fontWeight: 600 }}>
                                {opt}
                              </span>
                              <span
                                style={{
                                  fontSize: 12,
                                  fontWeight: 800,
                                  color: '#6366f1',
                                }}
                              >
                                {pct}% ({count})
                              </span>
                            </div>
                            <div className="progress" style={{ height: 10 }}>
                              <div
                                className="progress-bar"
                                style={{
                                  width: `${pct}%`,
                                  background:
                                    'linear-gradient(90deg,#6366f1,#8b5cf6)',
                                }}
                              />
                            </div>
                            {!poll.closed && (
                              <div
                                style={{
                                  display: 'flex',
                                  gap: 5,
                                  marginTop: 6,
                                  flexWrap: 'wrap',
                                }}
                              >
                                {players.slice(0, 5).map((p) => {
                                  const voted = poll.votes[oi]?.includes(p.id);
                                  return (
                                    <button
                                      key={p.id}
                                      onClick={() => {
                                        setPolls((ps) =>
                                          ps.map((po) => {
                                            if (po.id !== poll.id) return po;
                                            const newVotes = { ...po.votes };
                                            Object.keys(newVotes).forEach(
                                              (k) => {
                                                newVotes[k] = (
                                                  newVotes[k] || []
                                                ).filter((id) => id !== p.id);
                                              }
                                            );
                                            newVotes[oi] = [
                                              ...(newVotes[oi] || []),
                                              p.id,
                                            ];
                                            return { ...po, votes: newVotes };
                                          })
                                        );
                                      }}
                                      style={{
                                        fontSize: 9,
                                        padding: '2px 7px',
                                        borderRadius: 20,
                                        border: 'none',
                                        cursor: 'pointer',
                                        background: voted
                                          ? '#eef2ff'
                                          : '#f8fafc',
                                        color: voted ? '#6366f1' : '#94a3b8',
                                        fontWeight: voted ? 700 : 500,
                                        fontFamily:
                                          "'Plus Jakarta Sans',sans-serif",
                                      }}
                                    >
                                      #{p.number}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
              <div className="card">
                <div
                  style={{ fontSize: 14, fontWeight: 800, marginBottom: 14 }}
                >
                  ➕ Nouveau sondage
                </div>
                <div style={{ display: 'grid', gap: 10 }}>
                  <div>
                    <Label>Question</Label>
                    <input
                      className="inp"
                      placeholder="Quelle formation ?"
                      value={pollInput.question}
                      onChange={(e) =>
                        setPollInput((p) => ({
                          ...p,
                          question: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label>Options</Label>
                    {pollInput.options.map((opt, i) => (
                      <div
                        key={i}
                        style={{ display: 'flex', gap: 6, marginBottom: 6 }}
                      >
                        <input
                          className="inp"
                          placeholder={`Option ${i + 1}`}
                          value={opt}
                          onChange={(e) => {
                            const o = [...pollInput.options];
                            o[i] = e.target.value;
                            setPollInput((p) => ({ ...p, options: o }));
                          }}
                        />
                        {pollInput.options.length > 2 && (
                          <button
                            className="btn br"
                            style={{
                              padding: '4px 10px',
                              fontSize: 13,
                              flexShrink: 0,
                            }}
                            onClick={() =>
                              setPollInput((p) => ({
                                ...p,
                                options: p.options.filter((_, j) => j !== i),
                              }))
                            }
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      className="btn bs"
                      style={{ width: '100%', fontSize: 11 }}
                      onClick={() =>
                        setPollInput((p) => ({
                          ...p,
                          options: [...p.options, ''],
                        }))
                      }
                    >
                      + Ajouter une option
                    </button>
                  </div>
                  <button
                    className="btn bp"
                    style={{ width: '100%' }}
                    onClick={() => {
                      if (
                        pollInput.question &&
                        pollInput.options.filter((o) => o.trim()).length >= 2
                      ) {
                        const votes = {};
                        pollInput.options.forEach((_, i) => (votes[i] = []));
                        setPolls((ps) => [
                          ...ps,
                          {
                            id: Date.now(),
                            question: pollInput.question,
                            options: pollInput.options.filter((o) => o.trim()),
                            votes,
                            closed: false,
                          },
                        ]);
                        setPollInput({ question: '', options: ['', ''] });
                        toast('Sondage créé !');
                      } else
                        toast(
                          'Remplissez la question et au moins 2 options',
                          'error'
                        );
                    }}
                  >
                    Lancer le sondage
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ===== MODAL JOUEUR ===== */}
      {sel && !sel._medicalEdit && (
        <div className="mb" onClick={() => setSel(null)}>
          <div className="md sin" onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 18,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: posColors[sel.position],
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 20,
                  }}
                >
                  {sel.number}
                </div>
                <div>
                  <div style={{ fontSize: 19, fontWeight: 800 }}>
                    {sel.name}
                  </div>
                  <div style={{ fontSize: 12, color: '#94a3b8' }}>
                    {sel.position} · {sel.age} ans
                  </div>
                </div>
              </div>
              <button
                className="btn bs"
                style={{ padding: '5px 11px' }}
                onClick={() => setSel(null)}
              >
                ✕
              </button>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: 9,
                marginBottom: 18,
              }}
            >
              {[
                ['⚽', 'Buts', sel.goals, '#f59e0b', '#fef3c7', 'goals'],
                [
                  '🎯',
                  'Passes D.',
                  sel.assists,
                  '#8b5cf6',
                  '#ede9fe',
                  'assists',
                ],
                [
                  '📈',
                  'Forme',
                  `${sel.form}/10`,
                  sel.form >= 8
                    ? '#10b981'
                    : sel.form >= 5
                    ? '#f59e0b'
                    : '#ef4444',
                  sel.form >= 8
                    ? '#d1fae5'
                    : sel.form >= 5
                    ? '#fef3c7'
                    : '#fee2e2',
                  null,
                ],
              ].map(([ic, lb, v, c, bg, field]) => (
                <div
                  key={lb}
                  style={{
                    textAlign: 'center',
                    background: bg,
                    padding: '13px 9px',
                    borderRadius: 13,
                  }}
                >
                  <div style={{ fontSize: 22, fontWeight: 800, color: c }}>
                    {v}
                  </div>
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: '#94a3b8',
                      marginBottom: 5,
                    }}
                  >
                    {lb}
                  </div>
                  {field && (
                    <button
                      className="btn"
                      style={{
                        background: '#fff',
                        color: c,
                        border: `1.5px solid ${c}`,
                        padding: '3px 11px',
                        fontSize: 11,
                        borderRadius: 8,
                      }}
                      onClick={() => {
                        const patch = { [field]: sel[field] + 1 };
                        upd(sel.id, patch);
                        setSel((p) => ({ ...p, ...patch }));
                        toast(`+1 ${lb} !`);
                      }}
                    >
                      +1
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 14 }}>
              <Label>Forme ({sel.form}/10)</Label>
              <input
                type="range"
                min={0}
                max={10}
                value={sel.form}
                onChange={(e) => {
                  const v = +e.target.value;
                  upd(sel.id, { form: v });
                  setSel((p) => ({ ...p, form: v }));
                }}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 9,
                  color: '#94a3b8',
                  marginTop: 3,
                }}
              >
                <span>Mauvaise</span>
                <span>Excellente</span>
              </div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <Label>Statut</Label>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 7,
                }}
              >
                {Object.entries(statusCfg).map(([key, cfg]) => (
                  <button
                    key={key}
                    onClick={() => {
                      upd(sel.id, { status: key });
                      setSel((p) => ({ ...p, status: key }));
                      toast('Statut mis à jour !');
                    }}
                    style={{
                      padding: '9px',
                      borderRadius: 10,
                      border: `2px solid ${
                        sel.status === key ? cfg.color : '#f1f5f9'
                      }`,
                      background: sel.status === key ? cfg.bg : '#f8fafc',
                      color: sel.status === key ? cfg.color : '#94a3b8',
                      fontFamily: "'Plus Jakarta Sans',sans-serif",
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all .2s',
                    }}
                  >
                    {cfg.icon} {cfg.label}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <Label>Notes</Label>
              <input
                className="inp"
                placeholder="Notes sur le joueur..."
                value={sel.notes || ''}
                onChange={(e) => {
                  upd(sel.id, { notes: e.target.value });
                  setSel((p) => ({ ...p, notes: e.target.value }));
                }}
              />
            </div>
            <div>
              <Label>Cartons</Label>
              <div style={{ display: 'flex', gap: 9 }}>
                <button
                  className="btn"
                  style={{
                    flex: 1,
                    background: '#fef3c7',
                    color: '#d97706',
                    border: '1.5px solid #fde68a',
                  }}
                  onClick={() => {
                    const yc = sel.yellowCards + 1;
                    const ns = yc >= 3 ? 'suspended' : sel.status;
                    upd(sel.id, { yellowCards: yc, status: ns });
                    setSel((p) => ({ ...p, yellowCards: yc, status: ns }));
                    toast(
                      yc >= 3 ? '3 jaunes → Suspendu !' : '🟨 Carton jaune'
                    );
                  }}
                >
                  🟨 Jaune ({sel.yellowCards})
                </button>
                <button
                  className="btn"
                  style={{
                    flex: 1,
                    background: '#fee2e2',
                    color: '#ef4444',
                    border: '1.5px solid #fecaca',
                  }}
                  onClick={() => {
                    upd(sel.id, {
                      redCards: sel.redCards + 1,
                      status: 'suspended',
                    });
                    setSel((p) => ({
                      ...p,
                      redCards: p.redCards + 1,
                      status: 'suspended',
                    }));
                    toast('🟥 Rouge → Suspendu !');
                  }}
                >
                  🟥 Rouge ({sel.redCards})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL ADD PLAYER */}
      {modal === 'addPlayer' && (
        <ModalAddPlayer
          onClose={() => setModal(null)}
          onAdd={(p) => {
            setPlayers((ps) => [
              ...ps,
              {
                ...p,
                id: Date.now(),
                goals: 0,
                assists: 0,
                yellowCards: 0,
                redCards: 0,
                injuryHistory: [],
                gpsDistance: 0,
                physicalLoad: 70,
              },
            ]);
            setModal(null);
            toast('Joueur ajouté !');
          }}
        />
      )}
      {modal === 'addMatch' && (
        <ModalAddMatch
          onClose={() => setModal(null)}
          onAdd={(m) => {
            setMatches((ms) => [
              ...ms,
              { ...m, id: Date.now(), scorers: [], assists: [] },
            ]);
            setModal(null);
            toast('Match ajouté !');
          }}
          players={players}
        />
      )}
      {modal === 'addTraining' && (
        <ModalAddTraining
          onClose={() => setModal(null)}
          onAdd={(t) => {
            setTrainings((ts) => [...ts, { ...t, id: Date.now() }]);
            setModal(null);
            toast('Séance planifiée !');
          }}
          players={players}
        />
      )}
    </div>
  );
}

// ===== MODALS =====
function ModalAddPlayer({ onClose, onAdd }) {
  const [f, setF] = useState({
    name: '',
    number: '',
    position: 'ATT',
    age: '',
    status: 'fit',
    form: 7,
    present: true,
    salary: 2500,
    contract: '2028-06-30',
    notes: '',
  });
  return (
    <div className="mb" onClick={onClose}>
      <div className="md sin" onClick={(e) => e.stopPropagation()}>
        <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 4 }}>
          Nouveau joueur
        </div>
        <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 18 }}>
          Remplissez les informations
        </div>
        <div style={{ display: 'grid', gap: 11 }}>
          <div>
            <Label>Nom complet</Label>
            <input
              className="inp"
              placeholder="ex: Kylian Mbappé"
              value={f.name}
              onChange={(e) => setF((x) => ({ ...x, name: e.target.value }))}
            />
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 9,
            }}
          >
            <div>
              <Label>N° maillot</Label>
              <input
                className="inp"
                type="number"
                placeholder="10"
                value={f.number}
                onChange={(e) =>
                  setF((x) => ({ ...x, number: +e.target.value }))
                }
              />
            </div>
            <div>
              <Label>Âge</Label>
              <input
                className="inp"
                type="number"
                placeholder="23"
                value={f.age}
                onChange={(e) => setF((x) => ({ ...x, age: +e.target.value }))}
              />
            </div>
            <div>
              <Label>Poste</Label>
              <select
                className="sel"
                value={f.position}
                onChange={(e) =>
                  setF((x) => ({ ...x, position: e.target.value }))
                }
              >
                {[
                  'GB',
                  'DD',
                  'DC',
                  'DG',
                  'MDC',
                  'MC',
                  'MOC',
                  'AD',
                  'AG',
                  'ATT',
                ].map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}
          >
            <div>
              <Label>Salaire (€/mois)</Label>
              <input
                className="inp"
                type="number"
                value={f.salary}
                onChange={(e) =>
                  setF((x) => ({ ...x, salary: +e.target.value }))
                }
              />
            </div>
            <div>
              <Label>Fin de contrat</Label>
              <input
                className="inp"
                type="date"
                value={f.contract}
                onChange={(e) =>
                  setF((x) => ({ ...x, contract: e.target.value }))
                }
              />
            </div>
          </div>
          <div>
            <Label>Forme ({f.form}/10)</Label>
            <input
              type="range"
              min={1}
              max={10}
              value={f.form}
              onChange={(e) => setF((x) => ({ ...x, form: +e.target.value }))}
            />
          </div>
          <div>
            <Label>Notes</Label>
            <input
              className="inp"
              placeholder="Informations complémentaires..."
              value={f.notes}
              onChange={(e) => setF((x) => ({ ...x, notes: e.target.value }))}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 9,
              marginTop: 4,
            }}
          >
            <button className="btn bs" onClick={onClose}>
              Annuler
            </button>
            <button className="btn bp" onClick={() => f.name && onAdd(f)}>
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModalAddMatch({ onClose, onAdd, players }) {
  const [f, setF] = useState({
    opponent: '',
    date: '',
    location: 'home',
    result: '',
    status: 'upcoming',
    formation: '4-3-3',
    notes: '',
  });
  return (
    <div className="mb" onClick={onClose}>
      <div className="md sin" onClick={(e) => e.stopPropagation()}>
        <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 4 }}>
          Nouveau match
        </div>
        <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 18 }}>
          Ajouter au calendrier
        </div>
        <div style={{ display: 'grid', gap: 11 }}>
          <div>
            <Label>Adversaire</Label>
            <input
              className="inp"
              placeholder="Paris Saint-Germain"
              value={f.opponent}
              onChange={(e) =>
                setF((x) => ({ ...x, opponent: e.target.value }))
              }
            />
          </div>
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}
          >
            <div>
              <Label>Date</Label>
              <input
                className="inp"
                type="date"
                value={f.date}
                onChange={(e) => setF((x) => ({ ...x, date: e.target.value }))}
              />
            </div>
            <div>
              <Label>Lieu</Label>
              <select
                className="sel"
                value={f.location}
                onChange={(e) =>
                  setF((x) => ({ ...x, location: e.target.value }))
                }
              >
                <option value="home">🏠 Domicile</option>
                <option value="away">✈️ Extérieur</option>
              </select>
            </div>
          </div>
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}
          >
            <div>
              <Label>Résultat (vide si à venir)</Label>
              <input
                className="inp"
                placeholder="2-1"
                value={f.result}
                onChange={(e) =>
                  setF((x) => ({
                    ...x,
                    result: e.target.value,
                    status: e.target.value ? 'played' : 'upcoming',
                  }))
                }
              />
            </div>
            <div>
              <Label>Formation</Label>
              <select
                className="sel"
                value={f.formation}
                onChange={(e) =>
                  setF((x) => ({ ...x, formation: e.target.value }))
                }
              >
                {Object.keys(FORMATIONS).map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <Label>Notes</Label>
            <input
              className="inp"
              placeholder="Observations..."
              value={f.notes}
              onChange={(e) => setF((x) => ({ ...x, notes: e.target.value }))}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 9 }}>
            <button className="btn bs" onClick={onClose}>
              Annuler
            </button>
            <button className="btn bp" onClick={() => f.opponent && onAdd(f)}>
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModalAddTraining({ onClose, onAdd, players }) {
  const [f, setF] = useState({
    date: '',
    type: 'Tactique',
    duration: 90,
    focus: '',
    notes: '',
    load: 70,
    attendance: [],
  });
  return (
    <div className="mb" onClick={onClose}>
      <div className="md sin" onClick={(e) => e.stopPropagation()}>
        <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 4 }}>
          Nouvelle séance
        </div>
        <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 18 }}>
          Planifier l'entraînement
        </div>
        <div style={{ display: 'grid', gap: 11 }}>
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}
          >
            <div>
              <Label>Date</Label>
              <input
                className="inp"
                type="date"
                value={f.date}
                onChange={(e) => setF((x) => ({ ...x, date: e.target.value }))}
              />
            </div>
            <div>
              <Label>Type</Label>
              <select
                className="sel"
                value={f.type}
                onChange={(e) => setF((x) => ({ ...x, type: e.target.value }))}
              >
                {trainingTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}
          >
            <div>
              <Label>Durée (min)</Label>
              <input
                className="inp"
                type="number"
                value={f.duration}
                onChange={(e) =>
                  setF((x) => ({ ...x, duration: +e.target.value }))
                }
              />
            </div>
            <div>
              <Label>Charge ({f.load}%)</Label>
              <input
                type="range"
                min={10}
                max={100}
                value={f.load}
                onChange={(e) => setF((x) => ({ ...x, load: +e.target.value }))}
              />
            </div>
          </div>
          <div>
            <Label>Focus</Label>
            <input
              className="inp"
              placeholder="Pressing haut, corners..."
              value={f.focus}
              onChange={(e) => setF((x) => ({ ...x, focus: e.target.value }))}
            />
          </div>
          <div>
            <Label>Notes</Label>
            <input
              className="inp"
              placeholder="Observations du coach..."
              value={f.notes}
              onChange={(e) => setF((x) => ({ ...x, notes: e.target.value }))}
            />
          </div>
          <div>
            <Label>Présents ({f.attendance.length} sélectionnés)</Label>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 4,
                maxHeight: 150,
                overflowY: 'auto',
                padding: 4,
              }}
            >
              {players.map((p) => (
                <div
                  key={p.id}
                  onClick={() =>
                    setF((x) => ({
                      ...x,
                      attendance: x.attendance.includes(p.id)
                        ? x.attendance.filter((id) => id !== p.id)
                        : [...x.attendance, p.id],
                    }))
                  }
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '5px 8px',
                    borderRadius: 8,
                    background: f.attendance.includes(p.id)
                      ? '#f0fdf4'
                      : '#f8fafc',
                    border: `1px solid ${
                      f.attendance.includes(p.id) ? '#bbf7d0' : '#f1f5f9'
                    }`,
                    cursor: 'pointer',
                    fontSize: 11,
                    fontWeight: 600,
                    color: f.attendance.includes(p.id) ? '#15803d' : '#94a3b8',
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: f.attendance.includes(p.id)
                        ? '#10b981'
                        : '#e2e8f0',
                      flexShrink: 0,
                    }}
                  />
                  #{p.number} {p.name.split(' ')[0]}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 9 }}>
            <button className="btn bs" onClick={onClose}>
              Annuler
            </button>
            <button className="btn bp" onClick={() => f.date && onAdd(f)}>
              Planifier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

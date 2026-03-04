import { useState } from 'react';

const FORMATIONS = {
  '4-3-3': [['GB'],['DD','DC','DC','DG'],['MC','MDC','MC'],['AD','ATT','AG']],
  '4-4-2': [['GB'],['DD','DC','DC','DG'],['MD','MC','MC','MG'],['ATT','ATT']],
  '4-2-3-1': [['GB'],['DD','DC','DC','DG'],['MDC','MDC'],['AD','MOC','AG'],['ATT']],
  '3-5-2': [['GB'],['DC','DC','DC'],['MD','MC','MDC','MC','MG'],['ATT','ATT']],
  '5-3-2': [['GB'],['DD','DC','DC','DC','DG'],['MC','MDC','MC'],['ATT','ATT']],
  '3-4-3': [['GB'],['DC','DC','DC'],['MD','MC','MC','MG'],['AD','ATT','AG']],
};

const posColors = {
  GB:'#6366f1',DD:'#0ea5e9',DC:'#0ea5e9',DG:'#0ea5e9',
  MDC:'#f59e0b',MC:'#f59e0b',MOC:'#f59e0b',MD:'#f59e0b',MG:'#f59e0b',
  AD:'#10b981',AG:'#10b981',ATT:'#ef4444',
};
const posGroup = {
  GB:'Gardien',DD:'Défenseur',DC:'Défenseur',DG:'Défenseur',
  MDC:'Milieu',MC:'Milieu',MOC:'Milieu',MD:'Milieu',MG:'Milieu',
  AD:'Attaquant',AG:'Attaquant',ATT:'Attaquant',
};
const statusCfg = {
  fit:{label:'Apte',color:'#10b981',bg:'#d1fae5',icon:'✓'},
  injured:{label:'Blessé',color:'#ef4444',bg:'#fee2e2',icon:'✕'},
  doubtful:{label:'Douteux',color:'#f59e0b',bg:'#fef3c7',icon:'?'},
  suspended:{label:'Suspendu',color:'#8b5cf6',bg:'#ede9fe',icon:'!'},
};
const trainingTypes = ['Tactique','Physique','Technique','Match amical','Récupération','Force'];

const INIT_PLAYERS = [
  {id:1,name:'Lucas Moreira',number:1,position:'GB',age:28,goals:0,assists:0,status:'fit',form:8,present:true,yellowCards:0,redCards:0,injuryHistory:[],contract:'2027-06-30',salary:3200,physicalLoad:72,notes:''},
  {id:2,name:'Théo Durand',number:2,position:'DD',age:24,goals:1,assists:2,status:'fit',form:7,present:true,yellowCards:1,redCards:0,injuryHistory:[],contract:'2026-12-31',salary:2800,physicalLoad:68,notes:''},
  {id:3,name:'Karim Benbrahim',number:4,position:'DC',age:27,goals:2,assists:0,status:'fit',form:8,present:true,yellowCards:0,redCards:0,injuryHistory:[],contract:'2028-06-30',salary:3500,physicalLoad:75,notes:''},
  {id:4,name:'Enzo Fabre',number:5,position:'DC',age:25,goals:0,assists:1,status:'injured',form:0,present:false,yellowCards:2,redCards:0,injuryHistory:[{type:'Musculaire',date:'2026-02-10',recovery:'2026-03-15'}],contract:'2027-06-30',salary:3000,physicalLoad:0,notes:'Déchirure ischio'},
  {id:5,name:'Romain Petit',number:3,position:'DG',age:22,goals:0,assists:3,status:'fit',form:9,present:true,yellowCards:0,redCards:0,injuryHistory:[],contract:'2029-06-30',salary:2600,physicalLoad:80,notes:''},
  {id:6,name:'Nassim Aït',number:6,position:'MDC',age:26,goals:1,assists:4,status:'fit',form:7,present:true,yellowCards:1,redCards:0,injuryHistory:[],contract:'2027-06-30',salary:3800,physicalLoad:70,notes:''},
  {id:7,name:'Baptiste Girard',number:8,position:'MC',age:23,goals:3,assists:5,status:'doubtful',form:6,present:true,yellowCards:0,redCards:0,injuryHistory:[],contract:'2026-06-30',salary:2900,physicalLoad:45,notes:'Choc cheville'},
  {id:8,name:'Sofiane Benali',number:10,position:'MOC',age:24,goals:8,assists:7,status:'fit',form:10,present:true,yellowCards:1,redCards:0,injuryHistory:[],contract:'2030-06-30',salary:5500,physicalLoad:88,notes:'Meilleur joueur'},
  {id:9,name:'Damien Rousseau',number:7,position:'AD',age:21,goals:5,assists:3,status:'fit',form:8,present:true,yellowCards:0,redCards:0,injuryHistory:[],contract:'2028-06-30',salary:2700,physicalLoad:82,notes:''},
  {id:10,name:'Yann Chevalier',number:11,position:'AG',age:20,goals:4,assists:6,status:'fit',form:7,present:true,yellowCards:2,redCards:0,injuryHistory:[],contract:'2027-12-31',salary:2500,physicalLoad:76,notes:''},
  {id:11,name:'Mohamed Diallo',number:9,position:'ATT',age:25,goals:14,assists:4,status:'fit',form:9,present:true,yellowCards:0,redCards:0,injuryHistory:[],contract:'2029-06-30',salary:6000,physicalLoad:85,notes:'Capitaine'},
  {id:12,name:'Antoine Leroy',number:12,position:'GB',age:22,goals:0,assists:0,status:'fit',form:6,present:true,yellowCards:0,redCards:0,injuryHistory:[],contract:'2027-06-30',salary:2200,physicalLoad:60,notes:''},
  {id:13,name:'Jordan Muller',number:14,position:'MC',age:24,goals:2,assists:2,status:'fit',form:7,present:false,yellowCards:1,redCards:0,injuryHistory:[],contract:'2026-12-31',salary:2800,physicalLoad:0,notes:''},
  {id:14,name:'Alexis Fontaine',number:17,position:'ATT',age:19,goals:3,assists:1,status:'fit',form:8,present:true,yellowCards:0,redCards:0,injuryHistory:[],contract:'2028-06-30',salary:2100,physicalLoad:78,notes:'Espoir'},
  {id:15,name:'Rémi Blanc',number:21,position:'DD',age:23,goals:0,assists:2,status:'suspended',form:0,present:false,yellowCards:3,redCards:0,injuryHistory:[],contract:'2027-06-30',salary:2400,physicalLoad:0,notes:''},
];

const INIT_MATCHES = [
  {id:1,opponent:'RC Strasbourg',date:'2026-02-15',location:'home',result:'3-1',scorers:['Diallo','Benali','Rousseau'],assists:['Chevalier','Petit','Benali'],status:'played',notes:'Très bon match collectif',formation:'4-3-3'},
  {id:2,opponent:'LOSC Lille',date:'2026-02-22',location:'away',result:'1-1',scorers:['Benali'],assists:['Muller'],status:'played',notes:"Manque d'efficacité",formation:'4-4-2'},
  {id:3,opponent:'Stade Rennais',date:'2026-03-01',location:'home',result:'2-0',scorers:['Diallo','Chevalier'],assists:['Benali','Rousseau'],status:'played',notes:'Clean sheet méritée',formation:'4-3-3'},
  {id:4,opponent:'OGC Nice',date:'2026-03-08',location:'away',result:null,scorers:[],assists:[],status:'upcoming',notes:'',formation:'4-3-3'},
  {id:5,opponent:'AS Monaco',date:'2026-03-15',location:'home',result:null,scorers:[],assists:[],status:'upcoming',notes:'',formation:'4-2-3-1'},
];

const INIT_TRAININGS = [
  {id:1,date:'2026-03-01',type:'Tactique',duration:90,focus:'Pressing haut',attendance:[1,2,3,5,6,7,8,9,10,11,12,14],notes:'Bonne intensité',load:75},
  {id:2,date:'2026-03-03',type:'Physique',duration:75,focus:'Endurance',attendance:[1,2,3,5,6,7,8,9,10,11,12,13,14],notes:'2 absents',load:85},
  {id:3,date:'2026-03-05',type:'Technique',duration:60,focus:'Finition',attendance:[1,2,3,5,6,7,8,9,10,11,12,13,14,15],notes:'Excellente séance',load:60},
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{background:#f1f5f9;font-family:'Plus Jakarta Sans',sans-serif;-webkit-text-size-adjust:100%;max-width:100vw;overflow-x:hidden}
  ::-webkit-scrollbar{width:3px;height:3px}
  ::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:3px}
  .card{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:14px;box-shadow:0 1px 4px rgba(0,0,0,.05)}
  .btn{border:none;cursor:pointer;padding:10px 16px;border-radius:10px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:700;transition:all .15s;display:inline-flex;align-items:center;justify-content:center;gap:6px;-webkit-tap-highlight-color:transparent}
  .bp{background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;box-shadow:0 3px 10px rgba(99,102,241,.3)}
  .bs{background:#f1f5f9;color:#64748b;border:1px solid #e2e8f0}
  .br{background:#fee2e2;color:#ef4444;border:1px solid #fecaca}
  .bg2{background:#d1fae5;color:#10b981;border:1px solid #a7f3d0}
  .inp{background:#f8fafc;border:1.5px solid #e2e8f0;color:#0f172a;padding:11px 13px;border-radius:11px;font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;width:100%;outline:none;transition:border .2s;-webkit-appearance:none}
  .inp:focus{border-color:#6366f1;background:#fff}
  .sel{background:#f8fafc;border:1.5px solid #e2e8f0;color:#0f172a;padding:11px 13px;border-radius:11px;font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;outline:none;cursor:pointer;width:100%;-webkit-appearance:none}
  .badge{display:inline-flex;align-items:center;gap:3px;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:700}
  .chip{display:inline-flex;align-items:center;padding:2px 8px;border-radius:20px;font-size:11px;font-weight:600}
  .lbl{display:block;font-size:12px;font-weight:700;color:#64748b;margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px}
  .progress{height:7px;border-radius:4px;background:#f1f5f9;overflow:hidden}
  .progress-bar{height:100%;border-radius:4px;transition:width .5s}
  input[type=range]{-webkit-appearance:none;height:7px;border-radius:4px;background:#e2e8f0;outline:none;width:100%}
  input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:24px;height:24px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#8b5cf6);cursor:pointer;box-shadow:0 2px 8px rgba(99,102,241,.4)}
  .mb{position:fixed;inset:0;background:rgba(15,23,42,.6);display:flex;align-items:flex-end;justify-content:center;z-index:200;backdrop-filter:blur(6px)}
  .md{background:#fff;border-radius:22px 22px 0 0;padding:20px 16px 32px;width:100%;max-width:600px;max-height:92vh;overflow-y:auto;box-shadow:0 -8px 40px rgba(0,0,0,.15)}
  @keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}
  .md{animation:slideUp .25s cubic-bezier(.34,1.1,.64,1)}
  .drag-handle{width:40px;height:4px;background:#e2e8f0;border-radius:2px;margin:0 auto 18px}
  .field-grass{background:linear-gradient(180deg,#15803d 0%,#16a34a 35%,#15803d 50%,#16a34a 75%,#15803d 100%);border-radius:16px;overflow:hidden;position:relative}
  .token{display:flex;flex-direction:column;align-items:center;cursor:pointer;transition:transform .15s;-webkit-tap-highlight-color:transparent}
  .token:active{transform:scale(0.95)}
  .token-ring{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;color:#fff;border:2.5px solid rgba(255,255,255,.9);box-shadow:0 3px 10px rgba(0,0,0,.3)}
  .token-name{font-size:7.5px;font-weight:700;color:#fff;text-shadow:0 1px 4px rgba(0,0,0,.9);margin-top:2px;max-width:48px;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .pulse{animation:pulse 2s infinite}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
  .tab-bar{display:flex;background:#fff;border-top:1px solid #e2e8f0;position:fixed;bottom:0;left:0;right:0;z-index:100;box-shadow:0 -2px 16px rgba(0,0,0,.08);padding-bottom:env(safe-area-inset-bottom)}
  .tab-item{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:8px 2px;cursor:pointer;border:none;background:none;gap:3px;min-height:56px;-webkit-tap-highlight-color:transparent;font-family:'Plus Jakarta Sans',sans-serif;transition:all .15s}
  .tab-item.on{color:#6366f1}
  .tab-item:not(.on){color:#94a3b8}
  .tab-icon{font-size:22px;line-height:1}
  .tab-label{font-size:10px;font-weight:700;letter-spacing:.2px}
  .page{padding:14px 14px 80px;max-width:600px;margin:0 auto}
  .notif{position:fixed;top:16px;left:50%;transform:translateX(-50%);background:#fff;padding:11px 20px;border-radius:14px;font-size:13px;font-weight:700;z-index:300;box-shadow:0 8px 24px rgba(0,0,0,.15);white-space:nowrap;pointer-events:none}
  @keyframes fadeInDown{from{opacity:0;transform:translateX(-50%) translateY(-8px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
  .notif{animation:fadeInDown .22s ease}
  .icon-btn{width:36px;height:36px;border-radius:10px;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:700;transition:all .15s;flex-shrink:0;-webkit-tap-highlight-color:transparent}
`;

const daysLeft = d => Math.ceil((new Date(d) - new Date()) / 86400000);
const Label = ({children}) => <span className="lbl">{children}</span>;
const FormDots = ({v}) => (
  <div style={{display:'flex',gap:2,alignItems:'center'}}>
    {[...Array(10)].map((_,i)=>(
      <div key={i} style={{width:5,height:5,borderRadius:'50%',background:i<v?(v>=8?'#10b981':v>=5?'#f59e0b':'#ef4444'):'#e2e8f0'}}/>
    ))}
    <span style={{marginLeft:4,fontSize:11,fontWeight:700,color:v>=8?'#10b981':v>=5?'#f59e0b':'#ef4444'}}>{v}/10</span>
  </div>
);

export default function App() {
  const [tab, setTab] = useState('dashboard');
  const [players, setPlayers] = useState(INIT_PLAYERS);
  const [matches, setMatches] = useState(INIT_MATCHES);
  const [trainings, setTrainings] = useState(INIT_TRAININGS);
  const [formation, setFormation] = useState('4-3-3');
  const [lineup, setLineup] = useState({});
  const [swapSlot, setSwapSlot] = useState(null);
  const [modal, setModal] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [notif, setNotif] = useState(null);

  const toast = (msg, type='success') => {
    setNotif({msg,type});
    setTimeout(()=>setNotif(null),2500);
  };

  const updPlayer = (id, patch) => setPlayers(ps => ps.map(p => p.id===id ? {...p,...patch} : p));
  const deletePlayer = id => { setPlayers(ps => ps.filter(p => p.id!==id)); toast('Joueur supprimé'); };
  const deleteMatch = id => { setMatches(ms => ms.filter(m => m.id!==id)); toast('Match supprimé'); };
  const deleteTraining = id => { setTrainings(ts => ts.filter(t => t.id!==id)); toast('Séance supprimée'); };

  const st = {
    fit: players.filter(p=>p.status==='fit').length,
    inj: players.filter(p=>p.status==='injured').length,
    goals: players.reduce((s,p)=>s+p.goals,0),
    assists: players.reduce((s,p)=>s+p.assists,0),
    form: (players.filter(p=>p.status==='fit').reduce((s,p)=>s+p.form,0)/Math.max(1,players.filter(p=>p.status==='fit').length)).toFixed(1),
    wins: matches.filter(m=>m.result&&+m.result[0]>+m.result[2]).length,
    draws: matches.filter(m=>m.result&&+m.result[0]===+m.result[2]).length,
    losses: matches.filter(m=>m.result&&+m.result[0]<+m.result[2]).length,
  };

  const fitPlayers = players.filter(p=>p.status==='fit'&&p.present);
  const fLines = FORMATIONS[formation];
  const getSlotPlayer = (li,pi) => {
    const key=`${li}-${pi}`;
    if(lineup[key]) return players.find(p=>p.id===lineup[key]);
    const pos=fLines[li][pi];
    const used=new Set(Object.values(lineup));
    return fitPlayers.find(p=>p.position===pos&&!used.has(p.id));
  };

  const TABS = [
    {id:'dashboard',icon:'🏠',label:'Accueil'},
    {id:'squad',icon:'👥',label:'Effectif'},
    {id:'formation',icon:'🗺️',label:'Tactique'},
    {id:'match',icon:'⚽',label:'Matchs'},
    {id:'training',icon:'🏃',label:'Entraîn.'},
  ];

  const openEditPlayer = p => { setEditTarget({...p}); setModal('editPlayer'); };
  const openEditMatch = m => { setEditTarget({...m}); setModal('editMatch'); };
  const openEditTraining = t => { setEditTarget({...t,attendance:[...t.attendance]}); setModal('editTraining'); };

  return (
    <div style={{background:'#f1f5f9',minHeight:'100vh',fontFamily:"'Plus Jakarta Sans',sans-serif",color:'#0f172a'}}>
      <style>{css}</style>

      {/* HEADER */}
      <div style={{background:'#fff',borderBottom:'1px solid #e2e8f0',padding:'12px 14px',position:'sticky',top:0,zIndex:90,boxShadow:'0 1px 6px rgba(0,0,0,.06)'}}>
        <div style={{maxWidth:600,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:36,height:36,background:'linear-gradient(135deg,#6366f1,#8b5cf6)',borderRadius:11,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,boxShadow:'0 3px 10px rgba(99,102,241,.3)'}}>⚽</div>
            <div>
              <div style={{fontSize:17,fontWeight:800,letterSpacing:'-.4px'}}>Coach Pro</div>
              <div style={{fontSize:10,color:'#94a3b8',fontWeight:500}}>Gestion d'équipe</div>
            </div>
          </div>
          <div style={{display:'flex',gap:14}}>
            {[['✅',st.fit,'#10b981'],['🏥',st.inj,'#ef4444'],['📈',`${st.form}/10`,'#f59e0b']].map(([ic,v,c])=>(
              <div key={ic} style={{textAlign:'center'}}>
                <div style={{fontSize:13,fontWeight:800,color:c}}>{ic} {v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TOAST */}
      {notif && (
        <div className="notif" style={{border:`1.5px solid ${notif.type==='success'?'#10b981':'#ef4444'}`,color:notif.type==='success'?'#10b981':'#ef4444'}}>
          {notif.type==='success'?'✓ ':'✕ '}{notif.msg}
        </div>
      )}

      <div className="page">

        {/* ═══ DASHBOARD ═══ */}
        {tab==='dashboard' && (
          <>
            <div style={{marginBottom:16}}>
              <h2 style={{fontSize:21,fontWeight:800}}>Tableau de bord</h2>
              <p style={{color:'#94a3b8',fontSize:13,marginTop:2}}>Vue d'ensemble</p>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,marginBottom:12}}>
              {[['⚽','Buts',st.goals,'#f59e0b','#fef3c7'],['🎯','Passes D.',st.assists,'#8b5cf6','#ede9fe'],['🏆','Victoires',st.wins,'#10b981','#d1fae5']].map(([ic,lb,v,c,bg])=>(
                <div key={lb} className="card" style={{textAlign:'center',padding:'12px 6px'}}>
                  <div style={{fontSize:21,marginBottom:3}}>{ic}</div>
                  <div style={{fontSize:22,fontWeight:800,color:c}}>{v}</div>
                  <div style={{fontSize:10,color:'#94a3b8',fontWeight:600,marginTop:1}}>{lb}</div>
                </div>
              ))}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,marginBottom:16}}>
              {[['👥','Joueurs',players.length,'#6366f1'],['✅','Aptes',st.fit,'#10b981'],['🏥','Blessés',st.inj,'#ef4444']].map(([ic,lb,v,c])=>(
                <div key={lb} className="card" style={{textAlign:'center',padding:'12px 6px'}}>
                  <div style={{fontSize:21,marginBottom:3}}>{ic}</div>
                  <div style={{fontSize:22,fontWeight:800,color:c}}>{v}</div>
                  <div style={{fontSize:10,color:'#94a3b8',fontWeight:600,marginTop:1}}>{lb}</div>
                </div>
              ))}
            </div>

            {(() => {
              const next = matches.find(m=>m.status==='upcoming');
              if(!next) return null;
              const d = daysLeft(next.date);
              return (
                <div className="card" style={{background:'linear-gradient(135deg,#6366f1,#8b5cf6)',border:'none',marginBottom:14}}>
                  <div style={{fontSize:11,fontWeight:700,color:'rgba(255,255,255,.7)',marginBottom:5,letterSpacing:.5}}>🎯 PROCHAIN MATCH</div>
                  <div style={{fontSize:21,fontWeight:800,color:'#fff',marginBottom:3}}>vs {next.opponent}</div>
                  <div style={{color:'rgba(255,255,255,.8)',fontSize:13,marginBottom:12}}>
                    {next.location==='home'?'🏠 Domicile':'✈️ Extérieur'} · {new Date(next.date).toLocaleDateString('fr-FR',{day:'numeric',month:'long'})}
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:12}}>
                    <div style={{background:'rgba(255,255,255,.2)',borderRadius:12,padding:'10px 18px',textAlign:'center'}}>
                      <div style={{fontSize:30,fontWeight:800,color:'#fff'}}>{d}</div>
                      <div style={{fontSize:10,color:'rgba(255,255,255,.8)',fontWeight:600}}>JOURS</div>
                    </div>
                    <div style={{fontSize:12,color:'rgba(255,255,255,.85)'}}>Formation · <strong style={{color:'#fff'}}>{next.formation}</strong></div>
                  </div>
                </div>
              );
            })()}

            <div className="card" style={{marginBottom:14}}>
              <div style={{fontSize:14,fontWeight:800,marginBottom:12}}>🏆 Top Buteurs</div>
              {[...players].sort((a,b)=>b.goals-a.goals).slice(0,5).map((p,i)=>(
                <div key={p.id} style={{display:'flex',alignItems:'center',gap:10,padding:'7px 0',borderBottom:'1px solid #f8fafc'}}>
                  <div style={{width:24,height:24,borderRadius:7,background:i===0?'#fef3c7':'#f1f5f9',color:i===0?'#d97706':'#94a3b8',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:800,flexShrink:0}}>{i+1}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:700,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{p.name}</div>
                    <div style={{height:3,borderRadius:2,background:'#f1f5f9',marginTop:3}}><div style={{height:'100%',borderRadius:2,background:'linear-gradient(90deg,#f59e0b,#fbbf24)',width:`${(p.goals/Math.max(1,players.reduce((m,x)=>Math.max(m,x.goals),0)))*100}%`}}/></div>
                  </div>
                  <div style={{fontSize:20,fontWeight:800,color:'#f59e0b',flexShrink:0}}>{p.goals}</div>
                </div>
              ))}
            </div>

            <div className="card">
              <div style={{fontSize:14,fontWeight:800,marginBottom:12}}>📈 Meilleure forme</div>
              {[...players].filter(p=>p.status==='fit').sort((a,b)=>b.form-a.form).slice(0,6).map(p=>(
                <div key={p.id} style={{display:'flex',alignItems:'center',gap:9,padding:'6px 0',borderBottom:'1px solid #f8fafc'}}>
                  <div style={{width:30,height:30,borderRadius:9,background:posColors[p.position],color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:800,flexShrink:0}}>{p.number}</div>
                  <span style={{fontSize:12,fontWeight:600,color:'#475569',flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{p.name}</span>
                  <FormDots v={p.form}/>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ═══ EFFECTIF ═══ */}
        {tab==='squad' && (
          <>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
              <div>
                <h2 style={{fontSize:21,fontWeight:800}}>Effectif</h2>
                <p style={{color:'#94a3b8',fontSize:13,marginTop:2}}>{players.length} joueurs</p>
              </div>
              <button className="btn bp" style={{padding:'10px 16px',fontSize:13}} onClick={()=>setModal('addPlayer')}>+ Joueur</button>
            </div>

            {['Gardien','Défenseur','Milieu','Attaquant'].filter(grp=>players.some(p=>posGroup[p.position]===grp)).map(grp=>(
              <div key={grp} style={{marginBottom:18}}>
                <div style={{fontSize:11,fontWeight:700,color:'#94a3b8',letterSpacing:1,textTransform:'uppercase',marginBottom:9,display:'flex',alignItems:'center',gap:8}}>
                  <div style={{height:1,flex:1,background:'#e2e8f0'}}/>{grp}<div style={{height:1,flex:1,background:'#e2e8f0'}}/>
                </div>
                {players.filter(p=>posGroup[p.position]===grp).map(p=>(
                  <div key={p.id} className="card" style={{marginBottom:9}}>
                    <div style={{display:'flex',alignItems:'center',gap:11}}>
                      <div style={{width:44,height:44,borderRadius:13,background:posColors[p.position],color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:17,flexShrink:0}}>{p.number}</div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:15,fontWeight:700,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{p.name}</div>
                        <div style={{fontSize:12,color:'#94a3b8',marginTop:2}}>{p.age}a · <span style={{color:posColors[p.position],fontWeight:700}}>{p.position}</span>{p.notes?<span style={{color:'#94a3b8'}}> · {p.notes}</span>:null}</div>
                      </div>
                      <span className="badge" style={{background:statusCfg[p.status].bg,color:statusCfg[p.status].color,flexShrink:0}}>{statusCfg[p.status].icon} {statusCfg[p.status].label}</span>
                    </div>

                    <div style={{display:'flex',alignItems:'center',gap:8,marginTop:11,paddingTop:11,borderTop:'1px solid #f1f5f9'}}>
                      <div style={{flex:1}}><FormDots v={p.form}/></div>
                      <span style={{fontSize:12,fontWeight:700,color:'#f59e0b'}}>⚽{p.goals}</span>
                      <span style={{fontSize:12,fontWeight:700,color:'#8b5cf6'}}>🎯{p.assists}</span>

                      {/* Présence */}
                      <button
                        className="icon-btn"
                        style={{background:p.present?'#d1fae5':'#f1f5f9',color:p.present?'#10b981':'#94a3b8',fontSize:16}}
                        onClick={()=>updPlayer(p.id,{present:!p.present})}
                      >{p.present?'✓':'–'}</button>

                      {/* Modifier */}
                      <button
                        className="icon-btn"
                        style={{background:'#eef2ff',color:'#6366f1',fontSize:14}}
                        onClick={()=>openEditPlayer(p)}
                      >✎</button>

                      {/* Supprimer */}
                      <button
                        className="icon-btn"
                        style={{background:'#fee2e2',color:'#ef4444',fontSize:16}}
                        onClick={()=>{if(window.confirm(`Supprimer ${p.name} ?`))deletePlayer(p.id);}}
                      >✕</button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </>
        )}

        {/* ═══ TACTIQUE ═══ */}
        {tab==='formation' && (
          <>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
              <div>
                <h2 style={{fontSize:21,fontWeight:800}}>Tactique</h2>
                <p style={{color:'#94a3b8',fontSize:13,marginTop:2}}>Touchez un joueur pour changer</p>
              </div>
              <button className="btn bs" style={{fontSize:13,padding:'9px 14px'}} onClick={()=>setModal('formationPicker')}>
                {formation} ▾
              </button>
            </div>

            <div className="field-grass" style={{padding:'16px 10px',minHeight:400,display:'flex',flexDirection:'column',justifyContent:'space-between',marginBottom:14}}>
              {[...fLines].reverse().map((line,ri)=>{
                const li=fLines.length-1-ri;
                return (
                  <div key={li} style={{display:'flex',justifyContent:'space-around',zIndex:1,position:'relative'}}>
                    {line.map((pos,pi)=>{
                      const p=getSlotPlayer(li,pi);
                      const isSwap=swapSlot?.key===`${li}-${pi}`;
                      return (
                        <div key={pi} className="token" onClick={()=>{
                          if(swapSlot){setLineup(l=>({...l,[swapSlot.key]:p?.id||null}));setSwapSlot(null);}
                          else{setSwapSlot({key:`${li}-${pi}`,player:p});}
                        }}>
                          <div className="token-ring" style={{background:p?posColors[p.position]:'rgba(255,255,255,.15)',border:`2.5px solid ${isSwap?'#fbbf24':'rgba(255,255,255,.9)'}`}}>
                            {p?p.number:<span style={{fontSize:11,opacity:.6}}>+</span>}
                          </div>
                          <div className="token-name">{p?p.name.split(' ').pop():pos}</div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {swapSlot && (
              <div className="card" style={{border:'2px solid #f59e0b',background:'#fffbeb',marginBottom:14}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
                  <span style={{fontSize:13,fontWeight:800,color:'#d97706'}}>🔄 Choisir un joueur</span>
                  <button className="btn bs" style={{padding:'5px 12px',fontSize:12}} onClick={()=>setSwapSlot(null)}>Annuler</button>
                </div>
                <div style={{display:'grid',gap:6,maxHeight:200,overflowY:'auto'}}>
                  {fitPlayers.map(p=>(
                    <button key={p.id} onClick={()=>{setLineup(l=>({...l,[swapSlot.key]:p.id}));setSwapSlot(null);toast(`${p.name} placé !`);}} style={{width:'100%',padding:'9px 12px',borderRadius:10,border:'1px solid #fde68a',background:'#fff',cursor:'pointer',display:'flex',alignItems:'center',gap:10,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
                      <div style={{width:30,height:30,borderRadius:8,background:posColors[p.position],color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:800,flexShrink:0}}>{p.number}</div>
                      <div style={{textAlign:'left'}}>
                        <div style={{fontSize:13,fontWeight:700}}>{p.name}</div>
                        <div style={{fontSize:11,color:'#94a3b8'}}>{p.position} · {p.form}/10</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="card">
              <div style={{fontSize:13,fontWeight:800,marginBottom:10}}>✅ XI Titulaires</div>
              {fLines.map((line,li)=>line.map((pos,pi)=>{
                const p=getSlotPlayer(li,pi);
                return p?(
                  <div key={`${li}-${pi}`} style={{display:'flex',alignItems:'center',gap:9,padding:'6px 0',borderBottom:'1px solid #f8fafc'}}>
                    <div style={{width:26,height:26,borderRadius:7,background:posColors[p.position],color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:800,flexShrink:0}}>{p.number}</div>
                    <div style={{flex:1,fontSize:13,fontWeight:700}}>{p.name}</div>
                    <span style={{fontSize:10,color:posColors[p.position],fontWeight:800}}>{p.position}</span>
                  </div>
                ):null;
              }))}
            </div>
          </>
        )}

        {/* ═══ MATCHS ═══ */}
        {tab==='match' && (
          <>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
              <div>
                <h2 style={{fontSize:21,fontWeight:800}}>Matchs</h2>
                <p style={{color:'#94a3b8',fontSize:13,marginTop:2}}>{st.wins}V · {st.draws}N · {st.losses}D</p>
              </div>
              <button className="btn bp" style={{padding:'10px 16px',fontSize:13}} onClick={()=>{setEditTarget(null);setModal('addMatch');}}>+ Match</button>
            </div>

            <div style={{display:'grid',gap:12}}>
              {matches.map(m=>{
                const w=m.result&&+m.result[0]>+m.result[2];
                const d=m.result&&+m.result[0]===+m.result[2];
                return (
                  <div key={m.id} className="card" style={{borderLeft:`4px solid ${m.status==='played'?(w?'#10b981':d?'#f59e0b':'#ef4444'):'#6366f1'}`}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10}}>
                      <div style={{flex:1,minWidth:0,marginRight:10}}>
                        <div style={{fontSize:17,fontWeight:800,marginBottom:4,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>vs {m.opponent}</div>
                        <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:5}}>
                          <span className="badge" style={{background:m.location==='home'?'#d1fae5':'#e0f2fe',color:m.location==='home'?'#10b981':'#0ea5e9'}}>{m.location==='home'?'🏠 Dom.':'✈️ Ext.'}</span>
                          <span className="badge" style={{background:'#f1f5f9',color:'#64748b'}}>{m.formation}</span>
                        </div>
                        <div style={{fontSize:12,color:'#94a3b8'}}>📅 {new Date(m.date).toLocaleDateString('fr-FR',{weekday:'short',day:'numeric',month:'long'})}</div>
                        {m.notes&&<div style={{fontSize:12,color:'#64748b',marginTop:3,fontStyle:'italic'}}>"{m.notes}"</div>}
                      </div>
                      {m.result?(
                        <div style={{textAlign:'center',padding:'8px 14px',background:w?'#d1fae5':d?'#fef3c7':'#fee2e2',borderRadius:12,flexShrink:0}}>
                          <div style={{fontSize:22,fontWeight:800,color:w?'#10b981':d?'#f59e0b':'#ef4444',letterSpacing:2}}>{m.result}</div>
                          <div style={{fontSize:9,fontWeight:700,color:'#94a3b8'}}>{w?'VICTOIRE':d?'NUL':'DÉFAITE'}</div>
                        </div>
                      ):(
                        <div className="pulse" style={{padding:'8px 14px',background:'#eef2ff',borderRadius:12,textAlign:'center',flexShrink:0}}>
                          <div style={{fontSize:12,fontWeight:800,color:'#6366f1'}}>À VENIR</div>
                          <div style={{fontSize:11,color:'#94a3b8',marginTop:1}}>{daysLeft(m.date)}j</div>
                        </div>
                      )}
                    </div>

                    {(m.scorers.length>0||m.assists.length>0)&&(
                      <div style={{paddingTop:8,borderTop:'1px solid #f1f5f9',display:'flex',gap:10,flexWrap:'wrap',marginBottom:10}}>
                        {m.scorers.length>0&&<div style={{display:'flex',gap:4,flexWrap:'wrap',alignItems:'center'}}><span style={{fontSize:10,fontWeight:700,color:'#94a3b8'}}>BUTS</span>{m.scorers.map((s,i)=><span key={i} className="chip" style={{background:'#fef3c7',color:'#d97706'}}>⚽ {s}</span>)}</div>}
                        {m.assists.length>0&&<div style={{display:'flex',gap:4,flexWrap:'wrap',alignItems:'center'}}><span style={{fontSize:10,fontWeight:700,color:'#94a3b8'}}>PASSES D.</span>{m.assists.map((s,i)=><span key={i} className="chip" style={{background:'#ede9fe',color:'#7c3aed'}}>🎯 {s}</span>)}</div>}
                      </div>
                    )}

                    <div style={{display:'flex',gap:8,paddingTop:10,borderTop:'1px solid #f1f5f9'}}>
                      <button className="btn bs" style={{flex:1,fontSize:13,padding:'9px'}} onClick={()=>openEditMatch(m)}>✎ Modifier</button>
                      <button className="btn br" style={{padding:'9px 16px',fontSize:13}} onClick={()=>{if(window.confirm('Supprimer ce match ?'))deleteMatch(m.id);}}>✕</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ═══ ENTRAÎNEMENTS ═══ */}
        {tab==='training' && (
          <>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
              <div>
                <h2 style={{fontSize:21,fontWeight:800}}>Entraînements</h2>
                <p style={{color:'#94a3b8',fontSize:13,marginTop:2}}>{trainings.length} séances</p>
              </div>
              <button className="btn bp" style={{padding:'10px 16px',fontSize:13}} onClick={()=>{setEditTarget(null);setModal('addTraining');}}>+ Séance</button>
            </div>

            {/* Présence aujourd'hui */}
            <div className="card" style={{marginBottom:14}}>
              <div style={{fontSize:14,fontWeight:800,marginBottom:11}}>✅ Présence aujourd'hui</div>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                <span style={{fontSize:13,fontWeight:700}}>{players.filter(p=>p.present).length}/{players.length} présents</span>
                <span style={{fontSize:12,color:'#94a3b8'}}>{Math.round(players.filter(p=>p.present).length/players.length*100)}%</span>
              </div>
              <div className="progress" style={{marginBottom:12}}>
                <div className="progress-bar" style={{width:`${players.filter(p=>p.present).length/players.length*100}%`,background:'linear-gradient(90deg,#6366f1,#8b5cf6)'}}/>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
                {players.map(p=>(
                  <div key={p.id} onClick={()=>updPlayer(p.id,{present:!p.present})} style={{display:'flex',alignItems:'center',gap:7,padding:'8px 10px',borderRadius:10,background:p.present?'#f0fdf4':'#f8fafc',border:`1px solid ${p.present?'#bbf7d0':'#f1f5f9'}`,cursor:'pointer'}}>
                    <div style={{width:7,height:7,borderRadius:'50%',background:p.present?'#10b981':'#e2e8f0',flexShrink:0}}/>
                    <span style={{fontSize:12,fontWeight:600,color:p.present?'#15803d':'#94a3b8',flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>#{p.number} {p.name.split(' ')[0]}</span>
                    <span style={{fontSize:12,color:p.present?'#10b981':'#94a3b8'}}>{p.present?'✓':'✕'}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Liste séances */}
            <div style={{display:'grid',gap:10}}>
              {trainings.map(t=>(
                <div key={t.id} className="card">
                  <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:10}}>
                    <div style={{width:46,height:46,borderRadius:13,background:t.type==='Tactique'?'#eef2ff':t.type==='Physique'?'#fee2e2':t.type==='Récupération'?'#d1fae5':'#fef3c7',display:'flex',alignItems:'center',justifyContent:'center',fontSize:21,flexShrink:0}}>
                      {t.type==='Tactique'?'🧠':t.type==='Physique'?'💪':t.type==='Récupération'?'🛁':'⚽'}
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:3,flexWrap:'wrap'}}>
                        <span style={{fontSize:15,fontWeight:800}}>{t.type}</span>
                        <span className="badge" style={{background:'#f1f5f9',color:'#64748b'}}>{t.duration}min</span>
                        <span className="badge" style={{background:'#eef2ff',color:'#6366f1'}}>⚡{t.load}%</span>
                      </div>
                      <div style={{fontSize:12,color:'#475569'}}>{t.focus}</div>
                      <div style={{fontSize:11,color:'#94a3b8',marginTop:2}}>📅 {new Date(t.date).toLocaleDateString('fr-FR')} · {t.attendance.length}/{players.length} présents</div>
                    </div>
                    <div style={{textAlign:'center',flexShrink:0}}>
                      <div style={{fontSize:18,fontWeight:800,color:t.attendance.length>=13?'#10b981':'#f59e0b'}}>{Math.round(t.attendance.length/players.length*100)}%</div>
                    </div>
                  </div>
                  <div style={{display:'flex',gap:5,flexWrap:'wrap',marginBottom:10,paddingTop:8,borderTop:'1px solid #f1f5f9'}}>
                    {t.attendance.map(id=>{const p=players.find(x=>x.id===id);return p?<span key={id} className="chip" style={{background:'#f0fdf4',color:'#15803d'}}>#{p.number} {p.name.split(' ')[0]}</span>:null;})}
                  </div>
                  <div style={{display:'flex',gap:8,paddingTop:8,borderTop:'1px solid #f1f5f9'}}>
                    <button className="btn bs" style={{flex:1,fontSize:13,padding:'9px'}} onClick={()=>openEditTraining(t)}>✎ Modifier</button>
                    <button className="btn br" style={{padding:'9px 16px',fontSize:13}} onClick={()=>{if(window.confirm('Supprimer cette séance ?'))deleteTraining(t.id);}}>✕</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* TAB BAR */}
      <div className="tab-bar">
        {TABS.map(t=>(
          <button key={t.id} className={`tab-item${tab===t.id?' on':''}`} onClick={()=>setTab(t.id)}>
            <span className="tab-icon">{t.icon}</span>
            <span className="tab-label">{t.label}</span>
          </button>
        ))}
      </div>

      {/* ═══ MODALS ═══ */}

      {modal==='formationPicker'&&(
        <div className="mb" onClick={()=>setModal(null)}>
          <div className="md" onClick={e=>e.stopPropagation()}>
            <div className="drag-handle"/>
            <div style={{fontSize:17,fontWeight:800,marginBottom:14}}>Choisir une formation</div>
            {Object.keys(FORMATIONS).map(f=>(
              <button key={f} onClick={()=>{setFormation(f);setLineup({});setModal(null);toast('Formation : '+f);}} style={{width:'100%',padding:'14px 16px',borderRadius:13,border:`2px solid ${formation===f?'#6366f1':'#e2e8f0'}`,background:formation===f?'#eef2ff':'#f8fafc',color:formation===f?'#6366f1':'#0f172a',fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:16,fontWeight:700,cursor:'pointer',marginBottom:9,textAlign:'left',display:'flex',justifyContent:'space-between'}}>
                <span>{f}</span>{formation===f&&<span>✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}

      {(modal==='addPlayer'||modal==='editPlayer')&&(
        <PlayerModal
          initial={modal==='editPlayer'?editTarget:{name:'',number:'',position:'ATT',age:'',status:'fit',form:7,present:true,salary:2500,contract:'2028-06-30',notes:'',goals:0,assists:0,yellowCards:0,redCards:0,injuryHistory:[],physicalLoad:70}}
          title={modal==='editPlayer'?'Modifier le joueur':'Nouveau joueur'}
          onClose={()=>setModal(null)}
          onSave={data=>{
            if(modal==='editPlayer'){
              setPlayers(ps=>ps.map(p=>p.id===editTarget.id?{...p,...data}:p));
              toast('Joueur modifié !');
            } else {
              setPlayers(ps=>[...ps,{...data,id:Date.now()}]);
              toast('Joueur ajouté !');
            }
            setModal(null);
          }}
        />
      )}

      {(modal==='addMatch'||modal==='editMatch')&&(
        <MatchModal
          initial={modal==='editMatch'?editTarget:{opponent:'',date:'',location:'home',result:'',status:'upcoming',formation:'4-3-3',notes:'',scorers:[],assists:[]}}
          title={modal==='editMatch'?'Modifier le match':'Nouveau match'}
          onClose={()=>setModal(null)}
          onSave={data=>{
            if(modal==='editMatch'){
              setMatches(ms=>ms.map(m=>m.id===editTarget.id?{...m,...data}:m));
              toast('Match modifié !');
            } else {
              setMatches(ms=>[...ms,{...data,id:Date.now(),scorers:[],assists:[]}]);
              toast('Match ajouté !');
            }
            setModal(null);
          }}
        />
      )}

      {(modal==='addTraining'||modal==='editTraining')&&(
        <TrainingModal
          initial={modal==='editTraining'?editTarget:{date:'',type:'Tactique',duration:90,focus:'',notes:'',load:70,attendance:[]}}
          title={modal==='editTraining'?'Modifier la séance':'Nouvelle séance'}
          players={players}
          onClose={()=>setModal(null)}
          onSave={data=>{
            if(modal==='editTraining'){
              setTrainings(ts=>ts.map(t=>t.id===editTarget.id?{...t,...data}:t));
              toast('Séance modifiée !');
            } else {
              setTrainings(ts=>[...ts,{...data,id:Date.now()}]);
              toast('Séance planifiée !');
            }
            setModal(null);
          }}
        />
      )}
    </div>
  );
}

/* ═══ MODAL JOUEUR ═══ */
function PlayerModal({initial,title,onClose,onSave}) {
  const [f,setF] = useState({...initial});
  return (
    <div className="mb" onClick={onClose}>
      <div className="md" onClick={e=>e.stopPropagation()}>
        <div className="drag-handle"/>
        <div style={{fontSize:17,fontWeight:800,marginBottom:18}}>{title}</div>
        <div style={{display:'grid',gap:13}}>
          <div><Label>Nom complet</Label><input className="inp" placeholder="ex: Kylian Mbappé" value={f.name||''} onChange={e=>setF(x=>({...x,name:e.target.value}))}/></div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10}}>
            <div><Label>N° maillot</Label><input className="inp" type="number" placeholder="10" value={f.number||''} onChange={e=>setF(x=>({...x,number:+e.target.value}))}/></div>
            <div><Label>Âge</Label><input className="inp" type="number" placeholder="23" value={f.age||''} onChange={e=>setF(x=>({...x,age:+e.target.value}))}/></div>
            <div><Label>Poste</Label>
              <select className="sel" value={f.position||'ATT'} onChange={e=>setF(x=>({...x,position:e.target.value}))}>
                {['GB','DD','DC','DG','MDC','MC','MOC','AD','AG','ATT'].map(p=><option key={p}>{p}</option>)}
              </select>
            </div>
          </div>
          <div><Label>Statut</Label>
            <select className="sel" value={f.status||'fit'} onChange={e=>setF(x=>({...x,status:e.target.value}))}>
              <option value="fit">✓ Apte</option>
              <option value="injured">✕ Blessé</option>
              <option value="doubtful">? Douteux</option>
              <option value="suspended">! Suspendu</option>
            </select>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
            <div><Label>Buts</Label><input className="inp" type="number" value={f.goals??0} onChange={e=>setF(x=>({...x,goals:+e.target.value}))}/></div>
            <div><Label>Passes D.</Label><input className="inp" type="number" value={f.assists??0} onChange={e=>setF(x=>({...x,assists:+e.target.value}))}/></div>
          </div>
          <div><Label>Forme ({f.form??7}/10)</Label><input type="range" min={0} max={10} value={f.form??7} onChange={e=>setF(x=>({...x,form:+e.target.value}))}/></div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
            <div><Label>Salaire (€/m)</Label><input className="inp" type="number" value={f.salary||2500} onChange={e=>setF(x=>({...x,salary:+e.target.value}))}/></div>
            <div><Label>Fin contrat</Label><input className="inp" type="date" value={f.contract||''} onChange={e=>setF(x=>({...x,contract:e.target.value}))}/></div>
          </div>
          <div><Label>Notes</Label><input className="inp" placeholder="Notes..." value={f.notes||''} onChange={e=>setF(x=>({...x,notes:e.target.value}))}/></div>
          <div style={{display:'flex',gap:10,marginTop:4}}>
            <button className="btn bs" style={{flex:1,padding:'12px'}} onClick={onClose}>Annuler</button>
            <button className="btn bp" style={{flex:2,padding:'12px'}} onClick={()=>f.name&&onSave(f)}>Enregistrer</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══ MODAL MATCH ═══ */
function MatchModal({initial,title,onClose,onSave}) {
  const [f,setF] = useState({...initial});
  return (
    <div className="mb" onClick={onClose}>
      <div className="md" onClick={e=>e.stopPropagation()}>
        <div className="drag-handle"/>
        <div style={{fontSize:17,fontWeight:800,marginBottom:18}}>{title}</div>
        <div style={{display:'grid',gap:13}}>
          <div><Label>Adversaire</Label><input className="inp" placeholder="Paris Saint-Germain" value={f.opponent||''} onChange={e=>setF(x=>({...x,opponent:e.target.value}))}/></div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
            <div><Label>Date</Label><input className="inp" type="date" value={f.date||''} onChange={e=>setF(x=>({...x,date:e.target.value}))}/></div>
            <div><Label>Lieu</Label>
              <select className="sel" value={f.location||'home'} onChange={e=>setF(x=>({...x,location:e.target.value}))}>
                <option value="home">🏠 Domicile</option>
                <option value="away">✈️ Extérieur</option>
              </select>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
            <div><Label>Résultat (vide = à venir)</Label><input className="inp" placeholder="2-1" value={f.result||''} onChange={e=>setF(x=>({...x,result:e.target.value,status:e.target.value?'played':'upcoming'}))}/></div>
            <div><Label>Formation</Label>
              <select className="sel" value={f.formation||'4-3-3'} onChange={e=>setF(x=>({...x,formation:e.target.value}))}>
                {['4-3-3','4-4-2','4-2-3-1','3-5-2','5-3-2','3-4-3'].map(fm=><option key={fm}>{fm}</option>)}
              </select>
            </div>
          </div>
          <div><Label>Notes</Label><input className="inp" placeholder="Observations..." value={f.notes||''} onChange={e=>setF(x=>({...x,notes:e.target.value}))}/></div>
          <div style={{display:'flex',gap:10,marginTop:4}}>
            <button className="btn bs" style={{flex:1,padding:'12px'}} onClick={onClose}>Annuler</button>
            <button className="btn bp" style={{flex:2,padding:'12px'}} onClick={()=>f.opponent&&onSave(f)}>Enregistrer</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══ MODAL ENTRAÎNEMENT ═══ */
function TrainingModal({initial,title,players,onClose,onSave}) {
  const [f,setF] = useState({...initial,attendance:[...(initial.attendance||[])]});
  return (
    <div className="mb" onClick={onClose}>
      <div className="md" onClick={e=>e.stopPropagation()}>
        <div className="drag-handle"/>
        <div style={{fontSize:17,fontWeight:800,marginBottom:18}}>{title}</div>
        <div style={{display:'grid',gap:13}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
            <div><Label>Date</Label><input className="inp" type="date" value={f.date||''} onChange={e=>setF(x=>({...x,date:e.target.value}))}/></div>
            <div><Label>Type</Label>
              <select className="sel" value={f.type||'Tactique'} onChange={e=>setF(x=>({...x,type:e.target.value}))}>
                {trainingTypes.map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
            <div><Label>Durée (min)</Label><input className="inp" type="number" value={f.duration||90} onChange={e=>setF(x=>({...x,duration:+e.target.value}))}/></div>
            <div><Label>Charge ({f.load||70}%)</Label><input type="range" min={10} max={100} value={f.load||70} onChange={e=>setF(x=>({...x,load:+e.target.value}))}/></div>
          </div>
          <div><Label>Focus</Label><input className="inp" placeholder="Pressing haut, corners..." value={f.focus||''} onChange={e=>setF(x=>({...x,focus:e.target.value}))}/></div>
          <div><Label>Notes</Label><input className="inp" placeholder="Observations..." value={f.notes||''} onChange={e=>setF(x=>({...x,notes:e.target.value}))}/></div>
          <div>
            <Label>Présents ({f.attendance.length} sélectionnés)</Label>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,maxHeight:180,overflowY:'auto',padding:'2px 0'}}>
              {players.map(p=>(
                <div key={p.id} onClick={()=>setF(x=>({...x,attendance:x.attendance.includes(p.id)?x.attendance.filter(id=>id!==p.id):[...x.attendance,p.id]}))} style={{display:'flex',alignItems:'center',gap:7,padding:'9px 11px',borderRadius:10,background:f.attendance.includes(p.id)?'#f0fdf4':'#f8fafc',border:`1px solid ${f.attendance.includes(p.id)?'#bbf7d0':'#f1f5f9'}`,cursor:'pointer',fontSize:13,fontWeight:600,color:f.attendance.includes(p.id)?'#15803d':'#94a3b8'}}>
                  <div style={{width:7,height:7,borderRadius:'50%',background:f.attendance.includes(p.id)?'#10b981':'#e2e8f0',flexShrink:0}}/>
                  #{p.number} {p.name.split(' ')[0]}
                </div>
              ))}
            </div>
          </div>
          <div style={{display:'flex',gap:10,marginTop:4}}>
            <button className="btn bs" style={{flex:1,padding:'12px'}} onClick={onClose}>Annuler</button>
            <button className="btn bp" style={{flex:2,padding:'12px'}} onClick={()=>f.date&&onSave(f)}>Enregistrer</button>
          </div>
        </div>
      </div>
    </div>
  );
}

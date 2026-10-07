'use client'
import { useState, useEffect } from 'react'

const TOOLS = [
  { id:'calculator', mono:'CA', name:'Kalkulator', desc:'Aritmatika dasar', cat:'math' },
  { id:'bmi', mono:'BM', name:'BMI', desc:'Indeks massa tubuh', cat:'math' },
  { id:'age', mono:'AG', name:'Usia', desc:'Hitung umur', cat:'math' },
  { id:'percent', mono:'PC', name:'Persen', desc:'Hitung persentase', cat:'math' },
  { id:'password', mono:'PW', name:'Sandi', desc:'Sandi acak kuat', cat:'security' },
  { id:'qr', mono:'QR', name:'QR Code', desc:'Teks ke QR', cat:'media' },
  { id:'wordcount', mono:'WC', name:'Hitung Kata', desc:'Kata & huruf', cat:'text' },
  { id:'uuid', mono:'ID', name:'UUID', desc:'UUID acak v4', cat:'security' },
  { id:'lorem', mono:'LI', name:'Lorem Ipsum', desc:'Teks placeholder', cat:'text' },
  { id:'hash', mono:'HS', name:'Hash', desc:'SHA-256', cat:'security' },
  { id:'base64', mono:'B6', name:'Base64', desc:'Encode & decode', cat:'convert' },
  { id:'url', mono:'UL', name:'URL Encode', desc:'Encode URL', cat:'convert' },
  { id:'color', mono:'CL', name:'Warna', desc:'HEX / RGB', cat:'convert' },
  { id:'random', mono:'RN', name:'Angka Acak', desc:'Acak dalam rentang', cat:'math' },
  { id:'case', mono:'CS', name:'Ubah Huruf', desc:'Kapitalisasi', cat:'text' },
  { id:'reverse', mono:'RV', name:'Balik Teks', desc:'Balik urutan', cat:'text' },
  { id:'temp', mono:'TP', name:'Suhu', desc:'C, F, K, R', cat:'convert' },
  { id:'length', mono:'LN', name:'Panjang', desc:'m, km, ft, mi', cat:'convert' },
  { id:'weight', mono:'WT', name:'Berat', desc:'kg, lb, oz', cat:'convert' },
  { id:'speed', mono:'SP', name:'Kecepatan', desc:'km/j, mph', cat:'convert' },
  { id:'area', mono:'AR', name:'Luas', desc:'m2, ha, acre', cat:'convert' },
  { id:'tip', mono:'TI', name:'Tip', desc:'Hitung tip', cat:'math' },
  { id:'loan', mono:'LO', name:'Pinjaman', desc:'Cicilan bulanan', cat:'math' },
  { id:'discount', mono:'DS', name:'Diskon', desc:'Harga diskon', cat:'math' },
  { id:'roman', mono:'RM', name:'Romawi', desc:'Angka romawi', cat:'convert' },
  { id:'base', mono:'BS', name:'Bilangan', desc:'Bin, okt, hex', cat:'convert' },
  { id:'stopwatch', mono:'SW', name:'Stopwatch', desc:'Ukur waktu', cat:'util' },
  { id:'timer', mono:'TM', name:'Timer', desc:'Hitung mundur', cat:'util' },
  { id:'datediff', mono:'DD', name:'Selisih Tgl', desc:'Jarak tanggal', cat:'util' },
  { id:'strength', mono:'PS', name:'Kekuatan Sandi', desc:'Analisis sandi', cat:'security' },
]

const ACCENTS: any = {
  purple:['#7c3aed','#a855f7','#f3ecff'],
  blue:['#2563eb','#3b82f6','#eaf1ff'],
  pink:['#db2777','#ec4899','#ffecf5'],
  teal:['#0d9488','#14b8a6','#e6faf7'],
  orange:['#ea580c','#f97316','#fff0e6'],
  rose:['#e11d48','#f43f5e','#ffe9ee'],
}

export default function Home() {
  const [accent, setAccent] = useState('purple')
  const [theme, setTheme] = useState('light')
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState<string | null>(null)
  const [drawer, setDrawer] = useState(false)

  useEffect(() => {
    const a = localStorage.getItem('tk_accent')
    const t = localStorage.getItem('tk_theme')
    if (a) setAccent(a)
    if (t) setTheme(t)
  }, [])

  useEffect(() => {
    localStorage.setItem('tk_accent', accent)
    localStorage.setItem('tk_theme', theme)
  }, [accent, theme])

  const c = ACCENTS[accent]
  const dark = theme === 'dark'
  const bg = dark ? '#0e0b18' : '#f5f3fb'
  const surface = dark ? '#181229' : '#ffffff'
  const text = dark ? '#f1eefb' : '#191330'
  const muted = dark ? '#a49fc0' : '#6b6588'
  const border = dark ? '#2b2444' : '#e8e3f6'
  const soft = dark ? '#251a3f' : c[2]

  const filtered = TOOLS.filter(t =>
    !search || t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.desc.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ minHeight:'100vh', background:bg, color:text, fontFamily:'system-ui,sans-serif' }}>

      {/* HEADER */}
      <header style={{ position:'sticky', top:0, zIndex:10, background:surface, borderBottom:`1px solid ${border}`, padding:12 }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', gap:10, alignItems:'center', flexWrap:'wrap' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
            <div style={{ width:38, height:38, borderRadius:12, background:`linear-gradient(135deg,${c[0]},${c[1]})`, color:'#fff', display:'grid', placeItems:'center', fontWeight:800 }}>TK</div>
            <div style={{ fontWeight:800, fontSize:16 }}>ToolKit</div>
          </div>
          <input
            placeholder="Cari alat..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ flex:1, minWidth:160, padding:'10px 14px', borderRadius:10, border:`1px solid ${border}`, background:bg, color:text, outline:'none', fontSize:14 }}
          />
          <button onClick={() => setDrawer(true)} style={{ width:40, height:40, borderRadius:10, border:`1px solid ${border}`, background:surface, color:text, cursor:'pointer', fontSize:18 }}>⚙</button>
        </div>
      </header>

      {/* GRID */}
      <main style={{ maxWidth:1200, margin:'0 auto', padding:20 }}>
        <div style={{ marginBottom:16, color:muted, fontSize:13 }}>
          {filtered.length} alat
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))', gap:12 }}>
          {filtered.map(t => (
            <button
              key={t.id}
              onClick={() => setOpen(t.id)}
              style={{
                padding:16, background:surface, border:`1px solid ${border}`,
                borderRadius:14, cursor:'pointer', textAlign:'left', color:text,
                display:'flex', flexDirection:'column', gap:10
              }}
            >
              <div style={{ width:40, height:40, borderRadius:12, background:soft, color:c[0], display:'grid', placeItems:'center', fontWeight:800, fontSize:12 }}>
                {t.mono}
              </div>
              <div style={{ fontWeight:700, fontSize:14 }}>{t.name}</div>
              <div style={{ fontSize:12, color:muted }}>{t.desc}</div>
            </button>
          ))}
        </div>
      </main>

      {/* DRAWER */}
      {drawer && (
        <>
          <div onClick={() => setDrawer(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.4)', zIndex:50 }} />
          <aside style={{ position:'fixed', top:0, right:0, height:'100%', width:320, maxWidth:'90vw', background:surface, borderLeft:`1px solid ${border}`, zIndex:51, padding:20, overflowY:'auto' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
              <div style={{ fontWeight:800, fontSize:16 }}>Pengaturan</div>
              <button onClick={() => setDrawer(false)} style={{ border:'none', background:'transparent', color:text, fontSize:20, cursor:'pointer' }}>×</button>
            </div>

            <div style={{ marginBottom:20 }}>
              <div style={{ fontSize:12, color:muted, marginBottom:8, fontWeight:700 }}>TEMA</div>
              <div style={{ display:'flex', gap:8 }}>
                {['light','dark'].map(v => (
                  <button key={v} onClick={() => setTheme(v)} style={{ flex:1, padding:10, borderRadius:10, border:`1px solid ${theme===v?c[0]:border}`, background:theme===v?c[0]:surface, color:theme===v?'#fff':text, cursor:'pointer', fontWeight:600 }}>
                    {v==='light'?'Terang':'Gelap'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize:12, color:muted, marginBottom:8, fontWeight:700 }}>WARNA AKSEN</div>
              <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                {Object.keys(ACCENTS).map(k => (
                  <button key={k} onClick={() => setAccent(k)} style={{
                    width:36, height:36, borderRadius:10, cursor:'pointer',
                    background:`linear-gradient(135deg,${ACCENTS[k][0]},${ACCENTS[k][1]})`,
                    border: accent===k ? `3px solid ${text}` : '3px solid transparent'
                  }} />
                ))}
              </div>
            </div>
          </aside>
        </>
      )}

      {/* MODAL */}
      {open && (
        <div onClick={() => setOpen(null)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.5)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', padding:16 }}>
          <div onClick={e => e.stopPropagation()} style={{ background:surface, borderRadius:18, width:'100%', maxWidth:520, maxHeight:'88vh', overflow:'hidden', display:'flex', flexDirection:'column', border:`1px solid ${border}` }}>
            <div style={{ padding:16, borderBottom:`1px solid ${border}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div style={{ fontWeight:800 }}>{TOOLS.find(t=>t.id===open)?.name}</div>
              <button onClick={() => setOpen(null)} style={{ border:'none', background:'transparent', color:text, fontSize:22, cursor:'pointer' }}>×</button>
            </div>
            <div style={{ padding:20, overflowY:'auto' }}>
              <ToolBody id={open} accent={c} surface={surface} bg={bg} text={text} muted={muted} border={border} soft={soft} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Btn({ children, onClick, accent }: any) {
  return <button onClick={onClick} style={{ width:'100%', padding:12, borderRadius:10, border:'none', background:`linear-gradient(135deg,${accent[0]},${accent[1]})`, color:'#fff', fontWeight:700, cursor:'pointer', fontSize:14 }}>{children}</button>
}

function Inp({ value, onChange, placeholder, type='text' }: any) {
  return <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={{ width:'100%', padding:11, borderRadius:10, border:'1px solid #ddd', background:'transparent', fontSize:14, marginBottom:10 }} />
}

function Box({ children, soft, text }: any) {
  return <div style={{ padding:14, background:soft, borderRadius:12, marginTop:12, color:text, fontWeight:600, wordBreak:'break-word' }}>{children}</div>
}

function ToolBody({ id, accent, surface, bg, text, muted, border, soft }: any) {
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [res, setRes] = useState<string>('')

  // reset when tool changes
  useEffect(() => { setA(''); setB(''); setRes('') }, [id])

  const btn = (label: string, fn: () => void) => (
    <div style={{ marginTop:10 }}>
      <Btn onClick={fn} accent={accent}>{label}</Btn>
    </div>
  )

  switch (id) {
    case 'calculator':
      return <>
        <Inp value={a} onChange={setA} placeholder="Contoh: 2+3*4" />
        {btn('Hitung', () => {
          try {
            const s = a.replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-')
            if (!/^[0-9+\-*/().%\s]*$/.test(s)) throw 0
            setRes(String(Function('return ('+s+')')()))
          } catch { setRes('Error') }
        })}
        {res && <Box soft={soft} text={text}>{res}</Box>}
      </>

    case 'bmi':
      return <>
        <Inp value={a} onChange={setA} placeholder="Berat (kg)" type="number" />
        <Inp value={b} onChange={setB} placeholder="Tinggi (cm)" type="number" />
        {btn('Hitung', () => {
          const w = +a, h = +b/100
          if (!w || !h) return setRes('Isi berat dan tinggi')
          const v = w/(h*h)
          let kat = v<18.5?'Kurang':v<25?'Normal':v<30?'Lebih':'Obesitas'
          setRes(`BMI: ${v.toFixed(1)} (${kat})`)
        })}
        {res && <Box soft={soft} text={text}>{res}</Box>}
      </>

    case 'age':
      return <>
        <Inp value={a} onChange={setA} type="date" />
        {btn('Hitung', () => {
          const d = new Date(a), n = new Date()
          if (isNaN(d.getTime())) return setRes('Pilih tanggal')
          let y = n.getFullYear()-d.getFullYear()
          let m = n.getMonth()-d.getMonth()
          let dd = n.getDate()-d.getDate()
          if (dd<0){ m--; dd += new Date(n.getFullYear(),n.getMonth(),0).getDate() }
          if (m<0){ y--; m+=12 }
          setRes(`${y} tahun, ${m} bulan, ${dd} hari`)
        })}
        {res && <Box soft={soft} text={text}>{res}</Box>}
      </>

    case 'percent':
      return <>
        <Inp value={a} onChange={setA} placeholder="Nilai" type="number" />
        <Inp value={b} onChange={setB} placeholder="Persen (%)" type="number" />
        {btn('Hitung', () => {
          const v = +a, p = +b
          if (isNaN(v) || isNaN(p)) return setRes('Isi kedua nilai')
          setRes(`${p}% dari ${v} = ${(v*p/100).toFixed(2)}`)
        })}
        {res && <Box soft={soft} text={text}>{res}</Box>}
      </>

    case 'password': {
      const gen = () => {
        const pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
        let s = ''
        for (let i=0;i<16;i++) s += pool[Math.floor(Math.random()*pool.length)]
        setRes(s)
      }
      return <>
        {btn('Buat Sandi (16 karakter)', gen)}
        {res && <Box soft={soft} text={text}>{res}</Box>}
      </>
    }

    case 'qr':
      return <>
        <Inp value={a} onChange={setA} placeholder="Teks atau URL" />
        {btn('Buat QR', () => setRes(a))}
        {res && <img src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(res)}`} style={{ display:'block', margin:'12px auto 0', borderRadius:12, background:'#fff', padding:8 }} />}
      </>

    case 'wordcount':
      return <>
        <textarea value={a} onChange={e=>setA(e.target.value)} placeholder="Tulis atau tempel teks..." style={{ width:'100%', minHeight:120, padding:11, borderRadius:10, border:'1px solid #ddd', background:'transparent', color:text, fontSize:14 }} />
        {btn('Hitung', () => {
          const w = a.trim() ? a.trim().split(/\s+/).length : 0
          setRes(`Kata: ${w} | Huruf: ${a.length} | Huruf tanpa spasi: ${a.replace(/\s/g,'').length}`)
        })}
        {res && <Box soft={soft} text={text}>{res}</Box>}
      </>

    case 'uuid': {
      const gen = () => {
        const u = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, ch => {
          const r = Math.random()*16|0, v = ch==='x'?r:(r&0x3|0x8)
          return v.toString(16)
        })
        setRes(u)
      }
      return <>
        {btn('Buat UUID', gen)}
        {res && <Box soft={soft} text={text}>{res}</Box>}
      </>
    }

    case 'lorem': {
      const gen = () => {
        const w = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'.split(' ')
        const out: string[] = []
        for (let i=0;i<50;i++) out.push(w[Math.floor(Math.random()*w.length)])
        setRes(out.join(' ') + '.')
      }
      return <>
        {btn('Buat Teks', gen)}
        {res && <Box soft={soft} text={text}>{res}</Box>}
      </>
    }

    case 'hash': {
      const gen = async () => {
        if (!a) return setRes('Isi teks dulu')
        const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(a))
        const h = [...new Uint8Array(buf)].map(x=>x.toString(16).padStart(2,'0')).join('')
        setRes(h)
      }
      return <>
        <Inp value={a} onChange={setA} placeholder="Teks untuk di-hash" />
        {btn('SHA-256', gen)}
        {res && <Box soft={soft} text={text}>{res}</Box>}
      </>
    }

    case 'base64':
      return <>
        <Inp value={a} onChange={setA} placeholder="Teks" />
        <div style={{ display:'flex', gap:8 }}>
          <div style={{flex:1}}><Btn onClick={()=>{try{setRes(btoa(a))}catch{setRes('Error')}}} accent={accent}>Encode</Btn></div>
          <div style={{flex:1}}><Btn onClick={()=>{try{setRes(atob(a))}catch{setRes('Error')}}} accent={accent}>Decode</Btn></div>
        </div>
        {res && <Box soft={soft} text={text}>{res}</Box>}
      </>

    case 'url':
      return <>
        <Inp value={a} onChange={setA} placeholder="URL atau teks" />
        <div style={{ display:'flex', gap:8 }}>
          <div style={{flex:1}}><Btn onClick={()=>setRes(encodeURIComponent(a))} accent={accent}>Encode</Btn></div>
          <div style={{flex:1}}><Btn onClick={()=>{try{setRes(decodeURIComponent(a))}catch{setRes('Error')}}} accent={accent}>Decode</Btn></div>
        </div>
        {res && <Box soft={soft} text={text}>{res}</Box>}
      </>

    case 'color':
      return <>
        <Inp value={a} onChange={setA} placeholder="#7c3aed" />
        {btn('Konversi', () => {
          const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a)
          if (!m) return setRes('Format HEX tidak valid')
          const r=parseInt(m[1],16), g=parseInt(m[2],16), b2=parseInt(m[3],16)
          setRes(`RGB(${r}, ${g}, ${b2})`)
        })}
        {res && <Box soft={soft} text={text}>{res}</Box>}
      </>

    case 'random':
      return <>
        <Inp value={a} onChange={setA} placeholder="Min" type="number" />
        <Inp value={b} onChange={setB} placeholder="Max" type="number" />
        {btn('Buat Angka', () => {
          const mn = +a||0, mx = +b||100
          setRes(String(Math.floor(Math.random()*(mx-mn+1))+mn))
        })}
        {res && <Box soft={soft} text={text}>{res}</Box>}
      </>

    case 'case':
      return <>
        <textarea value={a} onChange={e=>setA(e.target.value)} placeholder="Tulis teks..." style={{ width:'100%', minHeight:100, padding:11, borderRadius:10, border:'1px solid #ddd', background:'transparent', color:text, fontSize:14 }} />
        <div style={{ display:'flex', gap:8, marginTop:10, flexWrap:'wrap' }}>
          <button onClick={()=>setRes(a.toUpperCase())} style={{flex:1,padding:10,borderRadius:10,border:`1px solid ${border}`,background:surface,color:text,cursor:'pointer',fontWeight:600}}>UPPER</button>
          <button onClick={()=>setRes(a.toLowerCase())} style={{flex:1,padding:10,borderRadius:10,border:`1px solid ${border}`,background:surface,color:text,cursor:'pointer',fontWeight:600}}>lower</button>
          <button onClick={()=>setRes(a.toLowerCase().replace(/\b\w/g,c=>c.toUpperCase()))} style={{flex:1,padding:10,borderRadius:10,border:`1px solid ${border}`,background:surface,color:text,cursor:'pointer',fontWeight:600}}>Title</button>
        </div>
        {res && <Box soft={soft} text={text}>{res}</Box>}
      </>

    case 'reverse':
      return <>
        <textarea value={a} onChange={e=>setA(e.target.value)} placeholder="Tulis teks..." style={{ width:'100%', minHeight:100, padding:11, borderRadius:10, border:'1px solid #ddd', background:'transparent', color:text, fontSize:14 }} />
        {btn('Balik', () => setRes(a.split('').reverse().join('')))}
        {res && <Box soft={soft} text={text}>{res}</Box>}
      </>

    case 'temp':
      return <>
        <Inp value={a} onChange={setA} placeholder="Nilai Celsius" type="number" />
        {btn('Konversi', () => {
          const v = +a
          if (isNaN(v)) return setRes('Isi angka')
          setRes(`F: ${(v*9/5+32).toFixed(2)} | K: ${(v+273.15).toFixed(2)} | R: ${(v*0.8).toFixed(2)}`)
        })}
        {res && <Box soft={soft} text={text}>{res}</Box>}
      </>

    case 'length':
      return <>
        <Inp value={a} onChange={setA} placeholder="Meter" type="number" />
        {btn('Konversi', () => {
          const v = +a
          if (isNaN(v)) return setRes('Isi angka')
          setRes(`km: ${(v/1000).toFixed(4)} | cm: ${(v*100).toFixed(2)} | ft: ${(v*3.28084).toFixed(2)} | mi: ${(v/1609.344).toFixed(4)}`)
        })}
        {res && <Box soft={soft} text={text}>{res}</Box>}
      </>

    case 'weight':
      return <>
        <Inp value={a} onChange={setA} placeholder="Kilogram" type="number" />
        {btn('Konversi', () => {
          const v = +a
          if (isNaN(v)) return setRes('Isi angka')
          setRes(`g: ${(v*1000)} | lb: ${(v*2.20462).toFixed(3)} | oz: ${(v*35.274).toFixed(2)}`)
        })}
        {res && <Box soft={soft} text={text}>{res}</Box>}
      </>

    case 'speed':
      return <>
        <Inp value={a} onChange={setA} placeholder="km/jam" type="number" />
        {btn('Konversi', () => {
          const v = +a
          if (isNaN(v)) return setRes('Isi angka')
          setRes(`m/s: ${(v/3.6).toFixed(3)} | mph: ${(v/1.609344).toFixed(3)} | knot: ${(v/1.852).toFixed(3)}`)
        })}
        {res && <Box soft={soft} text={text}>{res}</Box>}
      </>

    case 'area':
      return <>
        <Inp value={a} onChange={setA} placeholder="Meter persegi" type="number" />
        {btn('Konversi', () => {
          const v = +a
          if (isNaN(v)) return setRes('Isi angka')
          setRes(`ha: ${(v/10000).toFixed(4)} | are: ${(v/100).toFixed(3)} | acre: ${(v/4046.856).toFixed(4)}`)
        })}
        {res && <Box soft={soft} text={text}>{res}</Box>}
      </>

    case 'tip':
      return <>
        <Inp value={a} onChange={setA} placeholder="Total tagihan" type="number" />
        <Inp value={b} onChange={setB} placeholder="Tip (%)" type="number" />
        {btn('Hitung', () => {
          const bill = +a, pct = +b||0
          if (!bill) return setRes('Isi tagihan')
          const tip = bill*pct/100
          setRes(`Tip: ${tip.toFixed(0)} | Total: ${(bill+tip).toFixed(0)}`)
        })}
        {res && <Box soft={soft} text={text}>{res}</Box>}
      </>

    case 'loan':
      return <>
        <Inp value={a} onChange={setA} placeholder="Jumlah pinjaman" type="number" />
        <Inp value={b} onChange={setB} placeholder="Bunga/tahun (%)" type="number" />
        {btn('Hitung', () => {
          const P = +a, rY = +b||0
          if (!P) return setRes('Isi jumlah pinjaman')
          const n = 60, r = rY/100/12
          const m = r===0 ? P/n : P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1)
          setRes(`Cicilan/bulan (5 tahun): ${m.toFixed(0)}`)
        })}
        {res && <Box soft={soft} text={text}>{res}</Box>}
      </>

    case 'discount':
      return <>
        <Inp value={a} onChange={setA} placeholder="Harga awal" type="number" />
        <Inp value={b} onChange={setB} placeholder="Diskon (%)" type="number" />
        {btn('Hitung', () => {
          const p = +a, d = +b||0
          if (!p) return setRes('Isi harga')
          setRes(`Harga akhir: ${(p*(1-d/100)).toFixed(0)} | Hemat: ${(p*d/100).toFixed(0)}`)
        })}
        {res && <Box soft={soft} text={text}>{res}</Box>}
      </>

    case 'roman': {
      const map: [number,string][] = [[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']]
      return <>
        <Inp value={a} onChange={setA} placeholder="Angka (contoh: 2024)" type="number" />
        {btn('Konversi', () => {
          let n = +a, s = ''
          if (!n || n<1 || n>3999999) return setRes('Rentang 1 - 3.999.999')
          for (const [v,r] of map) while (n>=v){ s+=r; n-=v }
          setRes(s)
        })}
        {res && <Box soft={soft} text={text}>{res}</Box>}
      </>
    }

    case 'base':
      return <>
        <Inp value={a} onChange={setA} placeholder="Angka desimal" type="number" />
        {btn('Konversi', () => {
          const n = parseInt(a)
          if (isNaN(n)) return setRes('Isi angka')
          setRes(`Bin: ${n.toString(2)} | Okt: ${n.toString(8)} | Hex: ${n.toString(16).toUpperCase()}`)
        })}
        {res && <Box soft={soft} text={text}>{res}</Box>}
      </>

    case 'stopwatch':
      return <Stopwatch accent={accent} surface={surface} border={border} text={text} />

    case 'timer':
      return <Timer accent={accent} surface={surface} border={border} text={text} />

    case 'datediff':
      return <>
        <Inp value={a} onChange={setA} type="date" />
        <Inp value={b} onChange={setB} type="date" />
        {btn('Hitung', () => {
          const d1 = new Date(a), d2 = new Date(b)
          if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return setRes('Pilih kedua tanggal')
          const days = Math.floor(Math.abs(d2.getTime()-d1.getTime())/86400000)
          setRes(`${days} hari`)
        })}
        {res && <Box soft={soft} text={text}>{res}</Box>}
      </>

    case 'strength':
      return <>
        <Inp value={a} onChange={setA} placeholder="Ketik sandi..." />
        <div style={{ height:8, background:border, borderRadius:8, overflow:'hidden' }}>
          <div style={{
            height:'100%',
            width: `${Math.min(100, (a.length*6 + (/[A-Z]/.test(a)?15:0) + (/\d/.test(a)?15:0) + (/[^A-Za-z0-9]/.test(a)?20:0)))}%`,
            background: a.length<6?'#ef4444': a.length<10?'#f59e0b':'#10b981',
            transition:'width .3s'
          }} />
        </div>
        <Box soft={soft} text={text}>
          {a.length<6?'Lemah': a.length<10?'Cukup': a.length<14?'Kuat':'Sangat Kuat'} ({a.length} karakter)
        </Box>
      </>

    default:
      return <div style={{ color: muted }}>Tool belum tersedia</div>
  }
}

function Stopwatch({ accent, surface, border, text }: any) {
  const [ms, setMs] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    const start = Date.now() - ms
    const iv = setInterval(() => setMs(Date.now()-start), 30)
    return () => clearInterval(iv)
  }, [running])

  const m = Math.floor(ms/60000), s = Math.floor(ms%60000/1000), c = Math.floor(ms%1000/10)

  return <>
    <div style={{ padding:24, textAlign:'center', background:surface, border:`1px solid ${border}`, borderRadius:14, fontSize:36, fontWeight:800, color:text }}>
      {String(m).padStart(2,'0')}:{String(s).padStart(2,'0')}.{String(c).padStart(2,'0')}
    </div>
    <div style={{ display:'flex', gap:8, marginTop:12 }}>
      <div style={{flex:1}}><Btn accent={accent} onClick={()=>setRunning(true)}>Start</Btn></div>
      <div style={{flex:1}}><Btn accent={accent} onClick={()=>setRunning(false)}>Stop</Btn></div>
      <div style={{flex:1}}><Btn accent={accent} onClick={()=>{setRunning(false);setMs(0)}}>Reset</Btn></div>
    </div>
  </>
}

function Timer({ accent, surface, border, text }: any) {
  const [remain, setRemain] = useState(60)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    const iv = setInterval(() => {
      setRemain(r => { if (r <= 1){ setRunning(false); return 0 } return r-1 })
    }, 1000)
    return () => clearInterval(iv)
  }, [running])

  const m = Math.floor(remain/60), s = remain%60

  return <>
    <input type="number" defaultValue={remain} onChange={e=>setRemain(+e.target.value||0)} placeholder="Detik" style={{ width:'100%', padding:11, borderRadius:10, border:`1px solid ${border}`, background:'transparent', color:text, fontSize:14, marginBottom:10 }} />
    <div style={{ padding:24, textAlign:'center', background:surface, border:`1px solid ${border}`, borderRadius:14, fontSize:36, fontWeight:800, color:text }}>
      {String(m).padStart(2,'0')}:{String(s).padStart(2,'0')}
    </div>
    <div style={{ display:'flex', gap:8, marginTop:12 }}>
      <div style={{flex:1}}><Btn accent={accent} onClick={()=>setRunning(true)}>Start</Btn></div>
      <div style={{flex:1}}><Btn accent={accent} onClick={()=>setRunning(false)}>Pause</Btn></div>
    </div>
  </>
}

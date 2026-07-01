import { PixelScatter, SectionCorners } from './PixelCharacters'

const values = [
  { icon: '◈', title: '像素精準', desc: '每一個細節都如像素般精確，我們不允許任何執行上的偏差。', color: '#4338CA' },
  { icon: '◉', title: '創意前衛', desc: '打破傳統框架，以反常規的創意思維為品牌創造差異化優勢。', color: '#0891B2' },
  { icon: '◇', title: '數據導向', desc: '所有決策以數據為基礎，讓每一分行銷預算都發揮最大效益。', color: '#059669' },
  { icon: '▣', title: '持續進化', desc: '緊跟數位趨勢，不斷更新知識與工具，確保策略永遠走在前端。', color: '#EA580C' },
]

const process = [
  { step: '01', title: '品牌健診', desc: '深度了解品牌現況、目標受眾與競爭環境' },
  { step: '02', title: '策略規劃', desc: '制定量身打造的數位行銷策略與執行藍圖' },
  { step: '03', title: '創意執行', desc: '以精準創意內容落實各渠道行銷活動' },
  { step: '04', title: '數據優化', desc: '持續追蹤成效、迭代優化，確保 ROI 最大化' },
]

export default function About() {
  return (
    <section id="about" className="section-pad-l relative bg-white overflow-hidden">
      <SectionCorners color="#059669" />
      <PixelScatter count={4} />
      <div className="page-wrap relative z-10">

        {/* Header — centered */}
        <div className="mb-12 text-center">
          <div className="pixel-font text-[10px] text-green-500 mb-4 animate-pulse-glow tracking-widest">
            // ABOUT US
          </div>
          <h2 className="pixel-font text-slate-800 mb-4 mx-auto" style={{ fontSize: 'clamp(18px, 3vw, 30px)', lineHeight: 2 }}>
            關於我們<br />
            <span style={{ color: '#059669' }}>玖漾國際</span>
          </h2>
          <p className="text-slate-400 text-base leading-loose max-w-xl mx-auto">
            玖漾國際（PIXELHOLIC）是一家專注於數位整合行銷的品牌顧問公司，協助品牌在數位時代以精準策略與大膽創意脫穎而出。
          </p>
        </div>

        {/* Intro story — full width, centered */}
        <div className="space-y-6 mb-12 text-center max-w-3xl mx-auto">
          <p className="text-slate-500 text-base leading-loose">
            我們以「像素驅動、品牌進化」為核心理念，從 KingCart 電動車配件、北極星 Polaris eSIM、到進軍全球的 Woolbuddy，服務橫跨科技、食品、手工藝等多元產業。
          </p>
          <p className="text-slate-500 text-base leading-loose">
            我們不只是廣告執行者，更是您品牌長期成長的策略夥伴。每個合作案，我們都以創辦人的心態投入，把客戶的品牌當作自己的品牌來經營。
          </p>
        </div>

        {/* Core values / How we work — symmetric two columns */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          <div>
            <div className="pixel-font text-[10px] text-indigo-400 mb-6 tracking-widest text-center">// CORE VALUES</div>
            <div className="grid grid-cols-2 gap-8">
              {values.map((v) => (
                <div key={v.title} className="group flex flex-col items-center text-center">
                  <span className="pixel-font mb-5 inline-block group-hover:animate-float" style={{ color: v.color, fontSize: '30px' }}>
                    {v.icon}
                  </span>
                  <h4 className="text-slate-700 font-semibold text-sm mb-3 tracking-wide">{v.title}</h4>
                  <p className="text-slate-400 text-xs leading-loose">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="pixel-font text-[10px] text-indigo-400 mb-6 tracking-widest text-center">// HOW WE WORK</div>
            <div className="space-y-0 text-left">
              {process.map((p, i) => (
                <div key={p.step} className="flex items-center gap-8 py-6" style={{ borderBottom: i < process.length - 1 ? '1px solid #EEF2FF' : 'none' }}>
                  <span className="pixel-font text-indigo-200 shrink-0" style={{ fontSize: '11px', lineHeight: 2 }}>{p.step}</span>
                  <div>
                    <div className="text-slate-700 font-semibold text-sm mb-1 tracking-wide">{p.title}</div>
                    <div className="text-slate-400 text-sm leading-loose">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { SectionCorners, PixelScatter } from './PixelCharacters'

const services = [
  { icon: '◈', title: '品牌策略規劃', desc: '從品牌定位、視覺識別到品牌聲音，全方位打造一致且有力的品牌形象，讓您在競爭激烈的市場中脫穎而出。', tags: ['品牌定位', 'VI 設計', '品牌聲音'], color: '#4338CA', num: '01' },
  { icon: '◉', title: '社群媒體行銷', desc: '整合 Instagram、Facebook、Threads 等平台，以創意內容與精準受眾策略，快速擴大品牌影響力與粉絲互動。', tags: ['內容策略', 'KOL 合作', '社群管理'], color: '#0891B2', num: '02' },
  { icon: '◇', title: '數位廣告投放', desc: '運用 Google Ads、Meta Ads 精準投放，搭配 A/B 測試與數據優化，最大化廣告投資報酬率。', tags: ['Google Ads', 'Meta Ads', 'ROAS 優化'], color: '#7C3AED', num: '03' },
  { icon: '▣', title: '內容行銷製作', desc: '影片製作、文案撰寫、視覺設計一站式服務，以高品質原創內容建立品牌權威，驅動自然流量成長。', tags: ['影片製作', '文案策略', 'SEO 內容'], color: '#059669', num: '04' },
  { icon: '◎', title: '電商成長駭客', desc: '針對電商品牌優化購物旅程、提升轉換率，從 SEO、再行銷到 Email 自動化，打通完整銷售漏斗。', tags: ['CRO 優化', '再行銷', 'Email 行銷'], color: '#EA580C', num: '05' },
  { icon: '⊕', title: '數據分析洞察', desc: '建立全面的數據追蹤架構，提供清晰易懂的行銷儀表板與週期性報告，讓每一個決策有數據支撐。', tags: ['GA4 設定', '自訂報表', '商業洞察'], color: '#D97706', num: '06' },
]

function ServiceCard({ s }) {
  return (
    <div className="float-card p-10 group cursor-default flex flex-col items-center text-center">
      {/* Number */}
      <div className="pixel-font text-[9px] text-slate-200 mb-4 self-end">{s.num}</div>

      {/* Icon */}
      <span className="pixel-font group-hover:animate-float inline-block mb-6" style={{ color: s.color, lineHeight: 1, fontSize: '40px' }}>
        {s.icon}
      </span>

      <h3 className="text-slate-800 font-semibold text-lg mb-4 leading-snug tracking-wide group-hover:text-indigo-600 transition-colors">
        {s.title}
      </h3>

      <p className="text-slate-400 text-sm leading-loose mb-8 flex-1">
        {s.desc}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 justify-center">
        {s.tags.map((t) => (
          <span key={t} className="text-[11px] font-medium tracking-wide" style={{ color: s.color }}>
            {t} ·
          </span>
        ))}
      </div>

      {/* Color accent bar */}
      <div className="mt-8 h-0.5 w-8 group-hover:w-24 transition-all duration-500" style={{ backgroundColor: s.color }} />
    </div>
  )
}

export default function Services() {
  return (
    <section id="services" className="section-pad-l relative bg-white overflow-hidden">
      <SectionCorners color="#4338CA" />
      <PixelScatter count={3} />

      <div className="page-wrap relative z-10">

        {/* Header — centered */}
        <div className="mb-12 text-center">
          <div className="pixel-font text-[10px] text-indigo-400 mb-4 animate-pulse-glow tracking-widest">
            // OUR SERVICES
          </div>
          <h2 className="pixel-font text-slate-800 mb-4 mx-auto" style={{ fontSize: 'clamp(18px, 3vw, 30px)', lineHeight: 2 }}>
            全方位數位<br />
            <span style={{ color: '#4338CA' }}>行銷服務</span>
          </h2>
          <p className="text-slate-400 text-base leading-loose max-w-xl mx-auto">
            從策略規劃到執行落地，以像素般精確的執行力，為您的品牌創造最大效益。
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => <ServiceCard key={s.title} s={s} />)}
        </div>

        {/* Ticker */}
        <div className="mt-12 py-6 overflow-hidden" style={{ borderTop: '1px solid #E0E7FF', borderBottom: '1px solid #E0E7FF' }}>
          <div className="animate-marquee whitespace-nowrap flex gap-16">
            {[0, 1].map((ri) => (
              <span key={ri} className="inline-flex gap-16">
                {['品牌策略', '社群行銷', '廣告投放', '內容製作', '電商成長', '數據分析',
                  'BRAND', 'SOCIAL', 'ADS', 'CONTENT', 'GROWTH', 'DATA'].map((t) => (
                  <span key={t} className="pixel-font text-[10px] text-indigo-200 tracking-widest">◈ {t}</span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

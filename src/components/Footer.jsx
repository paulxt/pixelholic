import { useState } from 'react'
import { Link } from 'react-router-dom'

const navCols = {
  服務項目: ['品牌策略規劃', '社群媒體行銷', '數位廣告投放', '內容行銷製作', '電商成長駭客', '數據分析洞察'],
  關於我們: ['公司介紹', '核心團隊', '企業文化', '加入我們'],
  資源中心: ['行銷部落格', '成功案例', '免費工具', '市場報告'],
}

function subscribeMailchimp(email) {
  return new Promise((resolve, reject) => {
    const cb = 'mc_cb_' + Date.now()
    const url =
      `https://pixelholic.us13.list-manage.com/subscribe/post-json` +
      `?u=76980a4f6c0f31211691a5ae2&id=18c5dfd0ac` +
      `&EMAIL=${encodeURIComponent(email)}&c=${cb}`

    window[cb] = (data) => {
      delete window[cb]
      script.remove()
      if (data.result === 'success') resolve(data)
      else reject(new Error(data.msg))
    }

    const script = document.createElement('script')
    script.src = url
    script.onerror = () => { delete window[cb]; script.remove(); reject(new Error('網路錯誤')) }
    document.body.appendChild(script)

    setTimeout(() => {
      if (window[cb]) { delete window[cb]; script.remove(); reject(new Error('逾時')) }
    }, 10000)
  })
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subStatus, setSubStatus] = useState(null) // null | 'sending' | 'done' | 'error'
  const [errMsg, setErrMsg] = useState('')

  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) return
    setSubStatus('sending')
    try {
      await subscribeMailchimp(email)
      setSubStatus('done')
      setEmail('')
    } catch (e) {
      setSubStatus('error')
      setErrMsg(e.message || '訂閱失敗，請稍後再試')
    }
  }

  return (
    <footer className="bg-slate-900 relative overflow-hidden">
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-60" />

      <div className="page-wrap relative z-10" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <span className="inline-block w-3.5 h-3.5 bg-indigo-400 animate-pulse-glow" />
              <span className="pixel-font text-indigo-400" style={{ fontSize: '11px' }}>PIXELHOLIC</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-3">
              像素驅動，品牌進化。
            </p>
            <p className="text-slate-500 text-xs mb-8">We turn pixels into profits.</p>
            <div className="flex gap-2">
              {['IG', 'FB', 'LI', 'YT', 'TW'].map((s) => (
                <button
                  key={s}
                  className="pixel-font text-[9px] w-9 h-9 border border-slate-700 text-slate-500 hover:border-indigo-400 hover:text-indigo-400 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Nav cols */}
          {Object.entries(navCols).map(([group, items]) => (
            <div key={group}>
              <h4 className="pixel-font text-[10px] text-indigo-400 mb-5">{group}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="text-sm text-slate-500 hover:text-indigo-400 transition-colors flex items-center gap-2 group"
                    >
                      <span className="inline-block w-1 h-1 bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div
          className="border border-indigo-900 p-8 mb-12"
          style={{ background: 'linear-gradient(135deg, rgba(67,56,202,0.12), rgba(124,58,237,0.08))' }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <div className="pixel-font text-[10px] text-purple-400 mb-2">// NEWSLETTER</div>
              <p className="text-white font-semibold text-base">訂閱週報，掌握最新數位行銷趨勢</p>
              {subStatus === 'done' && (
                <p className="text-green-400 text-sm mt-2 pixel-font text-[9px]">✓ 訂閱成功！感謝加入</p>
              )}
              {subStatus === 'error' && (
                <p className="text-red-400 text-sm mt-2 text-xs">{errMsg}</p>
              )}
            </div>

            {subStatus !== 'done' && (
              <div className="flex w-full md:w-auto gap-0">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setSubStatus(null) }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                  className="pixel-input flex-1 md:w-60"
                  style={{
                    clipPath: 'none',
                    borderRight: 'none',
                    background: 'rgba(255,255,255,0.05)',
                    borderColor: '#4338CA',
                    color: '#e2e8f0',
                  }}
                />
                <button
                  onClick={handleSubscribe}
                  disabled={subStatus === 'sending'}
                  className="pixel-btn whitespace-nowrap"
                  style={{ clipPath: 'none', borderLeft: 'none' }}
                >
                  {subStatus === 'sending' ? '...' : '訂閱'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-800">
          <div className="pixel-font text-[9px] text-slate-600">
            © 2025 PIXELHOLIC. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-6">
            {['隱私政策', '服務條款', 'Cookie 設定'].map((l) => (
              <a
                key={l}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-xs text-slate-600 hover:text-indigo-400 transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse-glow" />
            <span className="pixel-font text-[9px] text-slate-600">ALL SYSTEMS ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { useTranslation } from 'react-i18next'
import { SectionCorners } from './PixelCharacters'

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || 'YOUR_PUBLIC_KEY'

export default function Contact() {
  const { t } = useTranslation()
  const info = t('contact.info', { returnObjects: true })
  const form_ = t('contact.form', { returnObjects: true })

  const [form, setForm] = useState({ name: '', email: '', company: '', budget: '', services: [], message: '' })
  const [status, setStatus] = useState(null)

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  const toggleService = (s) => setForm((f) => ({
    ...f,
    services: f.services.includes(s) ? f.services.filter((x) => x !== s) : [...f.services, s],
  }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: form.name, from_email: form.email, company: form.company,
        budget: form.budget, services: form.services.join(', '), message: form.message,
        to_email: 'hc@pixelholic.co',
      }, { publicKey: EMAILJS_PUBLIC_KEY })
      setStatus('done')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  const reset = () => {
    setStatus(null)
    setForm({ name: '', email: '', company: '', budget: '', services: [], message: '' })
  }

  return (
    <section id="contact" className="section-pad-l relative overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <SectionCorners color="#4338CA" />

      <div className="page-wrap relative z-10">

        {/* Header — centered */}
        <div className="text-center mb-8">
          <div className="pixel-font text-[10px] text-indigo-400 mb-3 animate-pulse-glow tracking-widest">{t('contact.tag')}</div>
          <h2 className="pixel-font text-slate-800 mb-3" style={{ fontSize: 'clamp(18px, 3vw, 30px)', lineHeight: 2 }}>
            {t('contact.titleLine1')}<br />
            <span style={{ color: '#4338CA' }}>{t('contact.titleLine2')}</span>
          </h2>
          <p className="text-slate-400 text-base leading-loose max-w-xl mx-auto">
            {t('contact.sub')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20">

          {/* Left: contact info */}
          <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
            <div className="space-y-5 w-full max-w-sm">
              {info.map((item) => (
                <div key={item.label} className="flex items-start gap-6">
                  <span className="pixel-font text-indigo-400 text-xl shrink-0">{item.icon}</span>
                  <div>
                    <div className="pixel-font text-[9px] text-slate-300 mb-2 tracking-widest">{item.label}</div>
                    <div className="text-slate-600 text-base leading-relaxed whitespace-pre-line">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              {['IG', 'FB', 'LI', 'YT'].map((s) => (
                <button key={s} className="pixel-font text-[9px] w-10 h-10 border border-indigo-100 text-slate-400 hover:border-indigo-400 hover:text-indigo-500 transition-colors tracking-widest flex items-center justify-center">
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div>
            {status === 'done' ? (
              <div className="float-card p-16 text-center flex flex-col items-center justify-center min-h-96">
                <span className="pixel-font text-5xl text-green-500 mb-10 animate-float" style={{ fontSize: '56px' }}>◈</span>
                <div className="pixel-font text-slate-800 mb-4" style={{ fontSize: '12px' }}>{t('contact.success.title')}</div>
                <p className="text-slate-400 text-sm leading-loose mb-10 max-w-xs">{t('contact.success.sub')}</p>
                <button onClick={reset} className="pixel-btn">{t('contact.success.button')}</button>
              </div>
            ) : status === 'error' ? (
              <div className="float-card p-16 text-center flex flex-col items-center justify-center min-h-96">
                <span className="pixel-font text-5xl text-red-400 mb-10" style={{ fontSize: '56px' }}>!</span>
                <div className="pixel-font text-slate-800 mb-4" style={{ fontSize: '12px' }}>{t('contact.error.title')}</div>
                <p className="text-slate-400 text-sm leading-loose mb-10">{t('contact.error.sub')}</p>
                <button onClick={reset} className="pixel-btn">{t('contact.error.button')}</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <label className="pixel-font text-[9px] text-slate-300 block mb-2 tracking-widest">{form_.nameLabel}</label>
                    <input required className="pixel-input" placeholder={form_.namePlaceholder} value={form.name} onChange={set('name')} />
                  </div>
                  <div>
                    <label className="pixel-font text-[9px] text-slate-300 block mb-2 tracking-widest">{form_.emailLabel}</label>
                    <input required type="email" className="pixel-input" placeholder={form_.emailPlaceholder} value={form.email} onChange={set('email')} />
                  </div>
                </div>

                <div>
                  <label className="pixel-font text-[9px] text-slate-300 block mb-2 tracking-widest">{form_.companyLabel}</label>
                  <input className="pixel-input" placeholder={form_.companyPlaceholder} value={form.company} onChange={set('company')} />
                </div>

                <div>
                  <label className="pixel-font text-[9px] text-slate-300 block mb-2 tracking-widest">{form_.servicesLabel}</label>
                  <div className="flex flex-wrap gap-3">
                    {form_.serviceOptions.map((s) => (
                      <button key={s} type="button" onClick={() => toggleService(s)}
                        className="text-sm px-5 py-2.5 font-medium transition-all duration-150"
                        style={{
                          color: form.services.includes(s) ? '#4338CA' : '#94A3B8',
                          backgroundColor: form.services.includes(s) ? '#EEF2FF' : '#fff',
                          boxShadow: form.services.includes(s) ? 'var(--shadow-sm)' : 'none',
                          borderBottom: form.services.includes(s) ? '2px solid #4338CA' : '2px solid transparent',
                        }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="pixel-font text-[9px] text-slate-300 block mb-2 tracking-widest">{form_.budgetLabel}</label>
                  <div className="grid grid-cols-4 gap-3">
                    {form_.budgetOptions.map((b) => (
                      <button key={b} type="button" onClick={() => setForm((f) => ({ ...f, budget: b }))}
                        className="text-sm py-3 font-medium transition-all text-center"
                        style={{
                          color: form.budget === b ? '#0891B2' : '#94A3B8',
                          backgroundColor: form.budget === b ? '#ECFEFF' : '#fff',
                          boxShadow: form.budget === b ? 'var(--shadow-sm)' : 'none',
                          borderBottom: form.budget === b ? '2px solid #0891B2' : '2px solid transparent',
                        }}>
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="pixel-font text-[9px] text-slate-300 block mb-2 tracking-widest">{form_.messageLabel}</label>
                  <textarea required rows={3} className="pixel-input resize-none" placeholder={form_.messagePlaceholder} value={form.message} onChange={set('message')} />
                </div>

                <button type="submit" disabled={status === 'sending'} className="pixel-btn w-full text-center" style={{ display: 'block' }}>
                  {status === 'sending' ? <span className="animate-pulse-glow">{form_.sending}</span> : form_.submit}
                </button>

                <p className="text-xs text-slate-300 text-center tracking-wide">
                  {form_.note}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

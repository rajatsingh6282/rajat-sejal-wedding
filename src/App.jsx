import { useEffect, useState } from 'react'
import { CalendarDays, Clock3, MapPin, Heart, Flower2, Share2, Navigation } from 'lucide-react'
import { wedding } from './weddingConfig'

const WEDDING_DATE = new Date('2026-11-24T18:00:00+05:30') // Wedding time shown on the invitation: 6 PM IST.

function getCountdown() {
  const difference = Math.max(0, WEDDING_DATE.getTime() - Date.now())
  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

function App() {
  const [countdown, setCountdown] = useState(getCountdown)
  useEffect(() => {
    const timer = window.setInterval(() => setCountdown(getCountdown()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const shareText = `${wedding.shareMessage}\n\n${wedding.groomName} & ${wedding.brideName}\n${wedding.dateLabel}\nVenue: ${wedding.venueName}, ${wedding.venueAddress}`
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + '\n\n' + window.location.href)}`

  async function shareInvitation() {
    if (navigator.share) {
      try { await navigator.share({ title: `${wedding.groomName} & ${wedding.brideName} — Wedding Invitation`, text: shareText, url: window.location.href }); return }
      catch (error) { if (error?.name === 'AbortError') return }
    }
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  const units = [ ['Days', countdown.days], ['Hours', countdown.hours], ['Minutes', countdown.minutes], ['Seconds', countdown.seconds] ]

  return (
    <main className="min-h-screen overflow-hidden bg-[#fffaf2] text-[#4a1821]">
      <section className="relative mx-auto flex min-h-screen max-w-5xl items-center justify-center px-5 py-12 sm:px-8">
        <div className="absolute inset-3 rounded-[2rem] border border-[#c49a53]/70 sm:inset-6" />
        <div className="absolute inset-5 rounded-[1.7rem] border border-[#c49a53]/30 sm:inset-8" />
        <div className="mandala mandala-one" aria-hidden="true">✺</div>
        <div className="mandala mandala-two" aria-hidden="true">✺</div>

        <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#c49a53] bg-[#fff4df] text-[#9a2437] shadow-sm">
            <Flower2 size={31} strokeWidth={1.4} />
          </div>
          <p className="eyebrow">॥ श्री गणेशाय नमः ॥</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.32em] text-[#9b7141] sm:text-sm">Together with our families</p>
          <h1 className="wedding-title mt-5 text-5xl font-semibold leading-[1.02] text-[#801d30] sm:text-7xl md:text-8xl">
            {wedding.groomName}<span className="ampersand"> & </span>{wedding.brideName}
          </h1>
          <div className="mx-auto my-6 flex max-w-xs items-center justify-center gap-3 text-[#c49a53]"><span className="h-px flex-1 bg-[#c49a53]/70"/><Heart size={17} fill="currentColor"/><span className="h-px flex-1 bg-[#c49a53]/70"/></div>
          <h2 className="wedding-title text-3xl text-[#9b7141] sm:text-4xl">A celebration of love</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#72515a] sm:text-lg">With the blessings of our families, we invite you to be part of our special day and bless us as we begin this beautiful new chapter together.</p>

          <div className="mx-auto mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
            <div className="detail-card"><CalendarDays size={21}/><div><p className="detail-label">The Wedding Day</p><p className="font-semibold">24 November 2026</p></div></div>
            <div className="detail-card"><MapPin size={21}/><div><p className="detail-label">Celebration in</p><p className="font-semibold">Surat, Gujarat</p></div></div>
          </div>

          <section className="mx-auto mt-9 max-w-xl" aria-label="Wedding countdown">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#9b7141]">Counting down to our big day</p>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {units.map(([label, value]) => <div key={label} className="count-box"><span className="count-number">{String(value).padStart(2, '0')}</span><span className="count-label">{label}</span></div>)}
            </div>
            <p className="mt-3 text-xs text-[#8b6970]">The wedding time is 6:00 PM, as printed on the invitation.</p>
          </section>

          <section className="mx-auto mt-8 max-w-xl rounded-2xl border border-[#d9c39b] bg-white/70 p-5 text-left shadow-sm sm:p-6">
            <div className="flex items-start gap-3"><div className="rounded-full bg-[#f8ead4] p-2 text-[#9a2437]"><MapPin size={21}/></div><div className="min-w-0 flex-1"><h3 className="wedding-title text-2xl text-[#801d30]">Venue & Directions</h3><p className="mt-1 font-semibold">{wedding.venueName}</p><p className="mt-1 text-sm leading-6 text-[#72515a]">{wedding.venueAddress}</p><p className="mt-1 text-sm text-[#72515a]">{wedding.eventTime}</p></div></div>
            <a className="action-button mt-4 w-full" href={wedding.mapsUrl} target="_blank" rel="noreferrer"><Navigation size={18}/> Open Google Maps</a>
            <p className="mt-3 text-xs leading-5 text-[#8b6970]">Please check the invitation for the full programme and family details.</p>
          </section>

          <section className="mx-auto mt-8 max-w-xl rounded-2xl border border-[#d9c39b] bg-white/70 p-5 text-left shadow-sm sm:p-6">
            <h3 className="wedding-title mb-4 text-2xl text-[#801d30]">Wedding Programme</h3>
            <div className="space-y-3">
              {wedding.events.map((event) => <div key={event.name} className="detail-card"><CalendarDays size={21}/><div><p className="font-semibold">{event.name}</p><p className="text-sm">{event.date} · {event.time}</p><p className="text-sm">{event.venue}</p></div></div>)}
            </div>
            <a className="action-button mt-4 w-full" href={wedding.familyMapsUrl} target="_blank" rel="noreferrer"><Navigation size={18}/> Haldi & Mehendi Location</a>
          </section>

          <section className="mx-auto mt-8 max-w-xl">
            <h3 className="wedding-title mb-4 text-2xl text-[#801d30]">Our Wedding Invitation</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <a href="/wedding-invitation.jpeg" target="_blank" rel="noreferrer"><img src="/wedding-invitation.jpeg" alt="Rajat Singh and Sejal Singh wedding invitation cover" className="w-full rounded-xl border border-[#d9c39b] shadow-sm" /></a>
              <a href="/wedding-program.jpeg" target="_blank" rel="noreferrer"><img src="/wedding-program.jpeg" alt="Wedding programme with dates, timings and family details" className="w-full rounded-xl border border-[#d9c39b] shadow-sm" /></a>
            </div>
          </section>

          <button onClick={shareInvitation} className="action-button mx-auto mt-6"><Share2 size={18}/> Share the Invitation</button>
          <p className="mt-5 text-sm text-[#9b7141]">Your presence and blessings will mean the world to us.</p>
          <p className="wedding-title mt-2 text-2xl text-[#801d30]">With love, {wedding.groomName} & {wedding.brideName}</p>
          <p className="mt-8 text-[10px] uppercase tracking-[0.3em] text-[#b18b54]">Made with love · Surat · 2026</p>
        </div>
      </section>
    </main>
  )
}

export default App

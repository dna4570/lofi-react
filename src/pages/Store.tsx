import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'

type Track = {
  id: number
  title: string
  artist: string
  src: string
  cover?: string
  price?: number
}

const tracks: Track[] = [
  { id: 0, title: 'Lo-Fi Breeze', artist: 'Yokoyama', cover: '/covers/lofi-0.jpg', src: '/audio/lofi-0.mp3', price: 300 },
  { id: 1, title: 'Lo-Fi Breeze', artist: 'Yokoyama', cover: '/covers/lofi-1.jpg', src: '/audio/lofi-1.mp3', price: 300 },
  { id: 2, title: 'Night Coffee', artist: 'Yokoyama', cover: '/covers/lofi-2.jpg', src: '/audio/lofi-2.mp3', price: 300 },
  { id: 3, title: 'Tape Hiss',    artist: 'Yokoyama', cover: '/covers/lofi-3.jpg', src: '/audio/lofi-3.mp3', price: 300 },
  { id: 4, title: 'Tape Hiss',    artist: 'Yokoyama', cover: '/covers/lofi-4.jpg', src: '/audio/lofi-4.mp3', price: 300 },
  { id: 5, title: 'Tape Hiss',    artist: 'Yokoyama', cover: '/covers/lofi-5.jpg', src: '/audio/lofi-5.mp3', price: 300 },
  { id: 6, title: 'Tape Hiss',    artist: 'Yokoyama', cover: '/covers/lofi-6.jpg', src: '/audio/lofi-6.mp3', price: 300 },
  { id: 7, title: 'Tape Hiss',    artist: 'Yokoyama', cover: '/covers/lofi-7.jpg', src: '/audio/lofi-7.mp3', price: 300 },
  { id: 8, title: 'Tape Hiss',    artist: 'Yokoyama', cover: '/covers/lofi-8.jpg', src: '/audio/lofi-8.mp3', price: 300 },
  { id: 9, title: 'Tape Hiss',    artist: 'Yokoyama', cover: '/covers/lofi-9.jpg', src: '/audio/lofi-9.mp3', price: 300 },
  { id: 10, title: 'Tape Hiss',   artist: 'Yokoyama', cover: '/covers/lofi-10.jpg', src: '/audio/lofi-10.mp3', price: 300 },
  { id: 11, title: 'Tape Hiss',   artist: 'Yokoyama', cover: '/covers/lofi-11.jpg', src: '/audio/lofi-11.mp3', price: 300 },
]

export default function Store() {
  const [current] = useState<Track>(tracks[0])
  const [selected, setSelected] = useState<number[]>([])
  const audioRef = useRef<HTMLAudioElement>(null)
  const navigate = useNavigate()
  const { cart, addToCart } = useCartStore()
  const total = cart.reduce((sum, t) => sum + (t.price ?? 300), 0)

  function toggleSelect(id: number) {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  function addSelectedToCart() {
    const toAdd = tracks.filter(t => selected.includes(t.id) && !cart.find(c => c.id === t.id))
    toAdd.forEach(t => addToCart(t))
    setSelected([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-slate-800 text-white">
      <div className="mx-auto max-w-6xl p-6 space-y-8">

        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Lo-Fi Store 🎧</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm opacity-70">tracks: {tracks.length}</span>
            {cart.length > 0 && (
              <button
                className="bg-emerald-600 text-white text-sm px-3 py-1 rounded-full hover:bg-emerald-700"
                onClick={() => navigate('/cart')}
              >
                cart {cart.length} / {total.toLocaleString()}JPY
              </button>
            )}
          </div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/5">
            <div className="aspect-square bg-white/5 flex items-center justify-center">
              {current.cover
                ? <img src={current.cover} alt="" className="h-full w-full object-cover" />
                : <div className="opacity-60">No Cover</div>
              }
            </div>
            <div className="p-4">
              <div className="font-semibold text-lg truncate">{current.title}</div>
              <div className="text-sm opacity-70">{current.artist}</div>
            </div>
          </div>

          <div className="rounded-2xl bg-white text-slate-900 shadow-xl p-6 space-y-4">
            <div>
              <div className="text-sm text-slate-500">Selected track</div>
              <h2 className="text-2xl font-bold">{current.title}</h2>
              <p className="text-sm text-slate-600">{current.artist}</p>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold">{(current.price ?? 300).toLocaleString()}</span>
              <span className="text-sm text-slate-500">JPY</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                className="px-3 py-2 rounded-xl bg-slate-900 text-white hover:bg-black"
                onClick={() => audioRef.current?.play().catch(() => {})}
              >Play</button>
              <button
                className="px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300"
                onClick={() => audioRef.current?.pause()}
              >Pause</button>
              <button
                className="px-3 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
                onClick={() => addToCart(current)}
              >+ Cart</button>
            </div>

            {cart.length > 0 && (
              <div className="border-t pt-4 space-y-2">
                <div className="text-sm font-semibold text-slate-700">Cart ({cart.length}曲)</div>
                {cart.map(t => (
                  <div key={t.id} className="flex justify-between text-sm">
                    <span>{t.title}</span>
                    <span>¥{t.price}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold border-t pt-2">
                  <span>合計</span>
                  <span>¥{total.toLocaleString()}</span>
                </div>
                <button
                  className="w-full py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-bold"
                  onClick={() => navigate('/cart')}
                >
                  カートを見る →
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-24">
          {selected.length > 0 && (
            <div className="col-span-full">
              <button
                className="bg-emerald-600 text-white text-sm px-4 py-2 rounded-full hover:bg-emerald-700"
                onClick={addSelectedToCart}
              >
                +Cart ({selected.length}曲選択中)
              </button>
            </div>
          )}
          {tracks.map(t => (
            <button
              key={t.id}
              onClick={() => navigate('/track/' + t.id)}
              className={
                'text-left rounded-2xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10 overflow-hidden ' +
                (t.id === current.id ? 'ring-2 ring-emerald-400' : '')
              }
            >
              <div className="relative">
                <input
                  type="checkbox"
                  checked={selected.includes(t.id)}
                  onChange={e => { e.stopPropagation(); toggleSelect(t.id) }}
                  onClick={e => e.stopPropagation()}
                  className="absolute top-2 left-2 w-5 h-5 z-10"
                />
                <div className="aspect-square bg-white/5">
                  {t.cover
                    ? <img src={t.cover} alt="" className="h-full w-full object-cover" />
                    : <span className="opacity-60">No Cover</span>
                  }
                </div>
              </div>
              <div className="p-4">
                <div className="font-semibold truncate">{t.title}</div>
                <div className="text-sm opacity-70">{t.artist}</div>
              </div>
            </button>
          ))}
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 bg-black/50 backdrop-blur border-t border-white/10">
        <div className="mx-auto max-w-6xl p-3 flex items-center gap-3">
          <div className="min-w-0">
            <div className="truncate font-medium">{current.title}</div>
            <div className="text-xs opacity-70">{current.artist}</div>
          </div>
          <audio ref={audioRef} className="ml-auto w-full" src={current.src} controls />
        </div>
      </div>
    </div>
  )
}

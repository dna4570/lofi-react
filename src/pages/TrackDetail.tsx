import { useParams, useNavigate } from 'react-router-dom'
import { useRef } from 'react'

type Track = {
  id: number
  title: string
  artist: string
  src: string
  cover?: string
  price?: number
}

const tracks: Track[] = [
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

export default function TrackDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const audioRef = useRef<HTMLAudioElement>(null)
  const track = tracks.find(t => t.id === Number(id))

  if (!track) return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <p>Track not found</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-bold">Lofi App 🎵</h1>

      <div className="relative w-80 h-80 rounded-2xl overflow-hidden">
        {track.cover
          ? <img src={track.cover} alt="" className="w-full h-full object-cover" />
          : <div className="w-full h-full bg-zinc-800 flex items-center justify-center opacity-60">No Cover</div>
        }
      </div>

      <div className="text-center">
        <h2 className="text-xl font-bold">{track.title}</h2>
        <p className="text-sm opacity-60">{track.artist}</p>
        <p className="text-emerald-400 font-bold mt-1">¥{track.price}</p>
      </div>

      <audio ref={audioRef} src={track.src} />

      <div className="flex gap-4">
        <button
          className="px-6 py-2 bg-white text-black rounded-xl font-bold hover:bg-gray-200"
          onClick={() => audioRef.current?.play().catch(() => {})}
        >▶ 再生</button>
        <button
          className="px-6 py-2 bg-zinc-700 text-white rounded-xl font-bold hover:bg-zinc-600"
          onClick={() => audioRef.current?.pause()}
        >⏸ 停止</button>
      </div>

      <button
        className="text-sm opacity-50 hover:opacity-100 underline"
        onClick={() => navigate('/')}
      >← 一覧に戻る</button>
    </div>
  )
}

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Store from './pages/Store'
import Simple from './pages/Simple'
import TrackDetail from './pages/TrackDetail'
import Cart from './pages/Cart'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Store />} />
        <Route path="/simple" element={<Simple />} />
        <Route path="/track/:id" element={<TrackDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  )
}

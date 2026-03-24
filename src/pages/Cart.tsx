import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'

export default function Cart() {
  const navigate = useNavigate()
  const { cart, removeFromCart, clearCart } = useCartStore()
  const total = cart.reduce((sum, t) => sum + (t.price ?? 300), 0)

  return (
    <div style={{ background: '#1e2130', minHeight: '100vh', padding: '24px', color: '#cdd6f4', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '28px', paddingBottom: '20px', borderBottom: '0.5px solid #383a59' }}>
          <h1 style={{ fontSize: '1.8em', fontWeight: 500 }}>🛒 カート</h1>
          <p style={{ fontSize: '13px', color: '#6c7086', marginTop: '6px' }}>購入するトラックを確認してください</p>
        </div>

        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#6c7086' }}>
            <p>カートは空です</p>
            <button
              onClick={() => navigate('/')}
              style={{ marginTop: '20px', padding: '10px 24px', background: '#4caf50', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
            >← ストアに戻る</button>
          </div>
        ) : (
          <>
            <div style={{ background: '#252840', border: '0.5px solid #383a59', borderRadius: '10px', overflow: 'hidden', marginBottom: '16px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '10px 16px', textAlign: 'left', color: '#6c7086', background: '#1e2130', fontSize: '12px' }}>タイトル</th>
                    <th style={{ padding: '10px 16px', textAlign: 'left', color: '#6c7086', background: '#1e2130', fontSize: '12px' }}>アーティスト</th>
                    <th style={{ padding: '10px 16px', textAlign: 'right', color: '#6c7086', background: '#1e2130', fontSize: '12px' }}>価格</th>
                    <th style={{ padding: '10px 16px', textAlign: 'center', color: '#6c7086', background: '#1e2130', fontSize: '12px' }}>削除</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(t => (
                    <tr key={t.id} style={{ borderTop: '0.5px solid #2e3152' }}>
                      <td style={{ padding: '12px 16px' }}>{t.title}</td>
                      <td style={{ padding: '12px 16px', color: '#6c7086' }}>{t.artist}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', color: '#a6e3a1' }}>¥{t.price}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <input
                          type="checkbox"
                          checked={false}
                          onChange={() => removeFromCart(t.id)}
                          style={{ width: '17px', height: '17px', cursor: 'pointer', accentColor: '#89b4fa' }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderTop: '0.5px solid #383a59' }}>
              <span style={{ fontSize: '14px', color: '#6c7086' }}>{cart.length}曲</span>
              <span style={{ fontSize: '18px', fontWeight: 700, color: '#cdd6f4' }}>合計 ¥{total.toLocaleString()}</span>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <button
                onClick={() => navigate('/')}
                style={{ padding: '10px 22px', background: '#383a59', color: '#cdd6f4', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}
              >← 戻る</button>
              <button
                onClick={() => { clearCart(); navigate('/') }}
                style={{ padding: '10px 22px', background: '#383a59', color: '#f38ba8', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}
              >クリア</button>
              <button
                style={{ flex: 1, padding: '10px 22px', background: '#89b4fa', color: '#1e2130', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 700 }}
              >Stripe決済へ（準備中）</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

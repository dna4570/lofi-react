import { create } from 'zustand'

type Track = {
  id: number
  title: string
  artist: string
  src: string
  cover?: string
  price?: number
}

type CartStore = {
  cart: Track[]
  addToCart: (track: Track) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  addToCart: (track) =>
    set((state) => {
      if (state.cart.find((t) => t.id === track.id)) return state
      return { cart: [...state.cart, track] }
    }),
  removeFromCart: (id) =>
    set((state) => ({ cart: state.cart.filter((t) => t.id !== id) })),
  clearCart: () => set({ cart: [] }),
}))

import { create } from 'zustand';

interface SplashState {
  isSplashDone: boolean;
  setSplashDone: () => void;
}

// Flips once the starting screen has fully slid away. The 3D background waits
// for it so WebGL setup + shader compiles don't compete with the intro.
export const useSplashStore = create<SplashState>((set) => ({
  isSplashDone: false,
  setSplashDone: () => set(() => ({ isSplashDone: true })),
}));

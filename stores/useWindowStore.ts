import { create } from 'zustand';

interface WindowState {
  windowState: string;
  setWindowState: (section: string) => void;
}

interface ScrollState {
  isScroll: boolean;
  setIsScroll: (scroll: boolean) => void;
}

export const useWindowStore = create<WindowState>((set) => ({
  windowState: 'scroll',
  setWindowState: (window: string) => set(() => ({ windowState: window })),
}));

export const useScrollStore = create<ScrollState>((set) => ({
  isScroll: true,
  setIsScroll: (scroll: boolean) => set(() => ({ isScroll: scroll })),
}));

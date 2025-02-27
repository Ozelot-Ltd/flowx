import { create } from 'zustand';

interface NavState {
  activeSection: string;
  previousSection: string | null;
  setActiveSection: (section: string) => void;
}

const useNavigation = create<NavState>((set) => ({
  activeSection: 'home',
  previousSection: null,
  setActiveSection: (section: string) =>
    set((state) => ({
      previousSection: state.activeSection,
      activeSection: section,
    })),
}));

export default useNavigation;

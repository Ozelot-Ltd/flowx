import { create } from 'zustand';

interface NavState {
  activeSection: string;
  previousSection: string | null;
  // The hero's section id comes from the CMS (slice.primary.uid), so the hero
  // slice registers it here for components outside the slice (Header logo).
  heroSectionId: string | null;
  setActiveSection: (section: string) => void;
  setHeroSectionId: (id: string | null) => void;
}

const useNavigation = create<NavState>((set) => ({
  activeSection: '',
  previousSection: null,
  heroSectionId: null,
  setActiveSection: (section: string) =>
    set((state) => ({
      previousSection: state.activeSection,
      activeSection: section,
    })),
  setHeroSectionId: (id: string | null) => set(() => ({ heroSectionId: id })),
}));

export default useNavigation;

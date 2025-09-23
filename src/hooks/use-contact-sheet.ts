
import { create } from 'zustand';

type ContactSheetStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useContactSheet = create<ContactSheetStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

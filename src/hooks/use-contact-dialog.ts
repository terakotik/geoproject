import { create } from 'zustand';

type ContactDialogStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useContactDialog = create<ContactDialogStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

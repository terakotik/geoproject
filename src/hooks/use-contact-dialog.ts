// This file is no longer needed.
// The new floating button is self-contained and does not require a global state for a separate modal.
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

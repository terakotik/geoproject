// This hook is no longer used by the main floating button, 
// as its logic is now self-contained in CallMeBackButton.tsx.
// It might still be used by other "Contact Us" buttons on the site, so it is kept.
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

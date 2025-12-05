
import { create } from 'zustand';

type AnimationState = 'idle' | 'counting' | 'panic';

type ContactDialogStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  animationState: AnimationState;
  startCountdown: () => void;
  setAnimationState: (state: AnimationState) => void;
};

export const useContactDialog = create<ContactDialogStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  animationState: 'idle',
  startCountdown: () => set({ animationState: 'counting' }),
  setAnimationState: (state) => set({ animationState: state }),
}));

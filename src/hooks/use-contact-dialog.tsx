'use client';
import { create } from 'zustand';
import { CallMeBackModal } from '@/components/CallMeBackModal';

type AnimationState = 'idle' | 'counting' | 'panic';

type ContactDialogStore = {
  isOpen: boolean;
  animationState: AnimationState;
  onOpen: () => void;
  onClose: () => void;
  startCountdown: () => void;
  resetAnimation: () => void;
};

export const useContactDialog = create<ContactDialogStore>((set) => ({
  isOpen: false,
  animationState: 'idle',
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  startCountdown: () => set({ animationState: 'counting' }),
  resetAnimation: () => set({ animationState: 'idle' }),
}));

export const ContactDialogProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <CallMeBackModal />
    </>
  );
};

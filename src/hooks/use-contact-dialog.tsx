'use client';
import { create } from 'zustand';
import { CallMeBackModal } from '@/components/CallMeBackModal';

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

export const ContactDialogProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <CallMeBackModal />
    </>
  );
};

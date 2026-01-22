'use client';
import { create } from 'zustand';
import { AuditModal } from '@/components/AuditModal';

type AuditDialogStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useAuditDialog = create<AuditDialogStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const AuditDialogProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <AuditModal />
    </>
  );
};

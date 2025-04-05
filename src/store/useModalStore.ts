import { create } from 'zustand';
import type { ComponentType } from './registry';

export type ModalComponentSpec = {
  type: ComponentType;
  props: Record<string, any>;
};

type ModalState = {
  isOpen: boolean;
  components: ModalComponentSpec[];
  openModal: (components: ModalComponentSpec[]) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  components: [],
  openModal: (components) => set({ isOpen: true, components }),
  closeModal: () => set({ isOpen: false, components: [] }),
}));

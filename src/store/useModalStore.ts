import { create } from 'zustand';
import type { ComponentDefinition } from '../helpers/registry';

export type ModalComponentData = {
  title: string;
  subtitles: string[];
  components: ComponentDefinition[];
  steps: ModalComponentData[];
};

type ModalState = {
  isOpen: boolean;
  steps: ModalComponentData[];
  history: number[];
  setSteps: (steps: ModalComponentData[]) => void;
  currentStep: () => ModalComponentData | null;
  prevStep: () => void;
  nextStep: (value?: number) => void;
  openModal: () => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalState>((set, get) => ({
  isOpen: false,
  steps: [],
  history: [0],

  setSteps: (steps) => set({ steps, history: [0] }),

  currentStep: () => {
    const { steps, history } = get();
    const path = [...history];
    let current: ModalComponentData | undefined;

    current = steps[path.shift()!];
    for (const index of path) {
      if (!current || !current.steps) return null;
      current = current.steps[index];
    }

    return current || null;
  },

  prevStep: () => {
    const { history } = get();
    if (history.length > 1) {
      set({ history: history.slice(0, -1) });
    }
  },

  nextStep: (stepNumber: number = 1) => {
    const current = get().currentStep();
    if (!current || !Array.isArray(current.steps) || current.steps.length === 0) return;

    const nextIndex = stepNumber - 1;

    if (nextIndex < 0 || nextIndex >= current.steps.length) return;

    set((state) => ({
      history: [...state.history, nextIndex],
    }));
  },

  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false, steps: [], history: [0] }),
}));

import { create } from 'zustand';

type IsSmokingStore = {
  isSmoking: boolean;
  setIsSmoking: (isSmoking: boolean) => void;
};

type BurnProgressStore = {
  burnProgress: number;
  setBurnProgress: (burnProgress: number) => void;
};

export const useIsSmoking = create<IsSmokingStore>((set) => ({
  isSmoking: false,
  setIsSmoking: (isSmoking: boolean) => set({ isSmoking }),
}));

export const useBurnProgress = create<BurnProgressStore>((set) => ({
  burnProgress: 0,
  setBurnProgress: (burnProgress: number) => set({ burnProgress }),
}));

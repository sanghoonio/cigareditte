import { create } from 'zustand';

type CigaretteStore = {
  isSmoking: boolean;
  burnProgress: number;
  timeElapsed: number;
  totalSmoked: number;
  setIsSmoking: (isSmoking: boolean) => void;
  setBurnProgress: (burnProgress: number) => void;
  startSmoking: () => void;
  stopSmoking: () => void;
};

let smokingTimer: ReturnType<typeof setInterval> | null = null;

export const useCigarette = create<CigaretteStore>((set, get) => ({
  isSmoking: false,
  burnProgress: 0,
  timeElapsed: 0,
  totalSmoked: 0,
  
  setIsSmoking: (isSmoking) => set({ isSmoking }),
  setBurnProgress: (burnProgress) => set({ burnProgress }),
  
  startSmoking: () => {
    const { isSmoking, totalSmoked } = get();
    if (isSmoking) return;
    
    set({ isSmoking: true, burnProgress: 0, timeElapsed: 0, totalSmoked: totalSmoked + 1 });
    
    smokingTimer = setInterval(() => {
      const { timeElapsed } = get();
      const cutoffTime = 300;
      const newTimeElapsed = timeElapsed + 1;
      const newProgress = (newTimeElapsed / cutoffTime) * 100;
      
      if (newTimeElapsed >= cutoffTime) {
        set({ isSmoking: false, burnProgress: 100, timeElapsed: cutoffTime });
        if (smokingTimer) {
          clearInterval(smokingTimer);
          smokingTimer = null;
        }
      } else {
        set({ timeElapsed: newTimeElapsed, burnProgress: newProgress });
      }
    }, 1000);
  },
  
  stopSmoking: () => {
    set({ isSmoking: false });
    if (smokingTimer) {
      clearInterval(smokingTimer);
      smokingTimer = null;
    }
  }
}));

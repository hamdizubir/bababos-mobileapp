import {create} from 'zustand';
import { clearAllAsyncStorageItem } from '../async-storage';

export const useAuthStore = create(set => ({
  isAuthenticated: false,
  authenticate: () => set(() => ({isAuthenticated: true})),
  logout: async () => {
    set(() => ({isAuthenticated: false}))
    try {
      await clearAllAsyncStorageItem()
    } catch (error) {
      console.error('ERROR LOGOUT', error);
    }
  },
}));


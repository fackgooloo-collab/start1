import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useColorScheme } from 'react-native';

import { darkColors, lightColors, type Colors } from './colors';

export type ThemeMode = 'system' | 'light' | 'dark';
const STORAGE_KEY = 'start1:theme-mode';

type AppTheme = {
  colors: Colors;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isDark: boolean;
};

const AppThemeContext = createContext<AppTheme | undefined>(undefined);

export function AppThemeProvider({ children }: PropsWithChildren) {
  const systemScheme = useColorScheme();
  const [mode, setStoredMode] = useState<ThemeMode>('system');
  const [hydrated, setHydrated] = useState(false);
  const selectedByUser = useRef(false);
  const saveQueue = useRef(Promise.resolve());

  useEffect(() => {
    let mounted = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (
          mounted &&
          !selectedByUser.current &&
          (saved === 'system' || saved === 'light' || saved === 'dark')
        ) {
          setStoredMode(saved);
        }
      })
      .catch(() => console.warn('테마 설정을 불러오지 못해 기본 테마를 사용합니다.'))
      .finally(() => {
        if (mounted) setHydrated(true);
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveQueue.current = saveQueue.current
      .then(() => AsyncStorage.setItem(STORAGE_KEY, mode))
      .catch(() => console.warn('테마 설정은 이번 실행 동안만 적용됩니다.'));
  }, [hydrated, mode]);

  const setMode = useCallback((next: ThemeMode) => {
    selectedByUser.current = true;
    setStoredMode(next);
  }, []);

  // Keep the first web render consistent with the static HTML, then apply the preference.
  const isDark = hydrated && (mode === 'dark' || (mode === 'system' && systemScheme === 'dark'));
  const value = useMemo(
    () => ({ mode, setMode, isDark, colors: isDark ? darkColors : lightColors }),
    [mode, setMode, isDark],
  );

  return <AppThemeContext.Provider value={value}>{children}</AppThemeContext.Provider>;
}

export function useAppTheme() {
  const theme = useContext(AppThemeContext);
  if (!theme) throw new Error('useAppTheme must be used within AppThemeProvider');
  return theme;
}

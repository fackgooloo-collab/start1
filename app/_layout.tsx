import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AppThemeProvider, useAppTheme } from '@/theme/AppThemeProvider';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = { initialRouteName: '(tabs)' };

function Navigation() {
  const { colors, isDark } = useAppTheme();
  const base = isDark ? DarkTheme : DefaultTheme;
  return (
    <ThemeProvider value={{
      ...base,
      colors: { ...base.colors, primary: colors.primary, background: colors.background,
        card: colors.surface, text: colors.text, border: colors.border },
    }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShadowVisible: false, headerTintColor: colors.text }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="content/[id]" options={{ title: '콘텐츠', headerBackTitle: '뒤로' }} />
        <Stack.Screen name="+not-found" options={{ title: '페이지 없음' }} />
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return <AppThemeProvider><Navigation /></AppThemeProvider>;
}

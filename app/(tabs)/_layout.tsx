import { Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAppTheme } from '@/theme/AppThemeProvider';

export default function TabLayout() {
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textMuted,
      tabBarStyle: {
        backgroundColor: colors.surface,
        borderTopColor: colors.border,
        height: 72 + insets.bottom,
        paddingTop: 8,
        paddingBottom: Math.max(insets.bottom, 8),
      },
      tabBarLabelStyle: { fontSize: 12, lineHeight: 16, fontWeight: '600' },
    }}>
      <Tabs.Screen name="index" options={{
        title: '홈',
        tabBarIcon: ({ color }) => <SymbolView name={{ ios: 'house.fill', android: 'home', web: 'home' }} tintColor={color} size={23} />,
      }} />
      <Tabs.Screen name="explore" options={{
        title: '둘러보기',
        tabBarIcon: ({ color }) => <SymbolView name={{ ios: 'square.grid.2x2.fill', android: 'grid_view', web: 'grid_view' }} tintColor={color} size={23} />,
      }} />
      <Tabs.Screen name="settings" options={{
        title: '설정',
        tabBarIcon: ({ color }) => <SymbolView name={{ ios: 'gearshape.fill', android: 'settings', web: 'settings' }} tintColor={color} size={23} />,
      }} />
    </Tabs>
  );
}

import type { PropsWithChildren } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { useAppTheme } from '@/theme/AppThemeProvider';

type ScreenProps = PropsWithChildren<{
  scroll?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  edges?: Edge[];
}>;

export function Screen({
  children,
  scroll = true,
  contentStyle,
  edges = ['top', 'left', 'right'],
}: ScreenProps) {
  const { colors } = useAppTheme();
  return (
    <SafeAreaView edges={edges} style={[styles.screen, { backgroundColor: colors.background }]}>
      {scroll ? (
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollContent}>
          <View style={[styles.content, contentStyle]}>{children}</View>
        </ScrollView>
      ) : (
        <View style={[styles.content, styles.fill, contentStyle]}>{children}</View>
      )}
    </SafeAreaView>
  );
}

type AppTextProps = PropsWithChildren<{
  variant?: 'title' | 'heading' | 'body' | 'caption';
  style?: StyleProp<TextStyle>;
}>;

export function AppText({ children, variant = 'body', style }: AppTextProps) {
  const { colors } = useAppTheme();
  return (
    <Text
      accessibilityRole={variant === 'title' || variant === 'heading' ? 'header' : undefined}
      style={[styles[variant], { color: colors.text }, style]}>
      {children}
    </Text>
  );
}

export function Card({ children, style }: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) {
  const { colors } = useAppTheme();
  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }, style]}>
      {children}
    </View>
  );
}

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  accessibilityLabel?: string;
  disabled?: boolean;
};

export function Button({ label, onPress, variant = 'primary', accessibilityLabel, disabled }: ButtonProps) {
  const { colors } = useAppTheme();
  const primary = variant === 'primary';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: primary ? colors.primary : colors.primarySoft },
        { opacity: disabled ? 0.45 : pressed ? 0.75 : 1 },
      ]}>
      <AppText style={{ color: primary ? colors.onPrimary : colors.primary, fontWeight: '700' }}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  content: { width: '100%', maxWidth: 720, alignSelf: 'center', padding: 24, gap: 24 },
  fill: { flex: 1 },
  title: { fontSize: 32, lineHeight: 42, fontWeight: '800', letterSpacing: -0.8 },
  heading: { fontSize: 21, lineHeight: 30, fontWeight: '700', letterSpacing: -0.4 },
  body: { fontSize: 16, lineHeight: 25 },
  caption: { fontSize: 13, lineHeight: 20 },
  card: { padding: 20, gap: 12, borderRadius: 24, borderWidth: 1 },
  button: { minHeight: 50, paddingHorizontal: 20, paddingVertical: 13, borderRadius: 16, alignItems: 'center' },
});

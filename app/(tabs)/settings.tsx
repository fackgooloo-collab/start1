import Constants from 'expo-constants';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText, Card, Screen } from '@/components/ui';
import { useAppTheme } from '@/theme/AppThemeProvider';

const appearanceOptions = [
  { id: 'system', label: '시스템 설정', description: '기기의 화면 설정을 따라요.', symbol: '◐' },
  { id: 'light', label: '라이트 모드', description: '밝고 산뜻한 화면으로 사용해요.', symbol: '☀' },
  { id: 'dark', label: '다크 모드', description: '차분한 어두운 화면으로 사용해요.', symbol: '☾' },
] as const;

export default function SettingsScreen() {
  const { colors, mode, setMode } = useAppTheme();
  const appName = Constants.expoConfig?.name ?? 'Starter';
  const appVersion = Constants.expoConfig?.version ?? '1.0.0';

  return (
    <Screen contentStyle={styles.content}>
      <View style={styles.intro}>
        <AppText variant="caption" style={[styles.eyebrow, { color: colors.primary }]}>MAKE IT YOURS</AppText>
        <AppText variant="title">설정</AppText>
        <AppText style={{ color: colors.textMuted }}>나에게 편안한 화면으로 바꿔보세요.</AppText>
      </View>

      <View style={styles.section}>
        <AppText variant="heading">화면 스타일</AppText>
        <Card style={styles.appearanceCard}>
          {appearanceOptions.map((option, index) => {
            const selected = mode === option.id;

            return (
              <Pressable
                key={option.id}
                accessibilityRole="radio"
                accessibilityLabel={`${option.label}. ${option.description}`}
                accessibilityState={{ checked: selected }}
                aria-checked={selected}
                onPress={() => setMode(option.id)}
                style={({ pressed }) => [
                  styles.appearanceOption,
                  index > 0 && { borderTopWidth: 1, borderTopColor: colors.border },
                  { opacity: pressed ? 0.7 : 1 },
                ]}>
                <View style={[styles.optionSymbol, { backgroundColor: selected ? colors.primarySoft : colors.surfaceMuted }]}>
                  <AppText style={[styles.optionSymbolText, { color: selected ? colors.primary : colors.textMuted }]}>
                    {option.symbol}
                  </AppText>
                </View>
                <View style={styles.optionCopy}>
                  <AppText style={styles.optionTitle}>{option.label}</AppText>
                  <AppText variant="caption" style={{ color: colors.textMuted }}>{option.description}</AppText>
                </View>
                <View style={[styles.radio, { borderColor: selected ? colors.primary : colors.border, backgroundColor: selected ? colors.primary : colors.surface }]}>
                  {selected && <AppText style={[styles.check, { color: colors.onPrimary }]}>✓</AppText>}
                </View>
              </Pressable>
            );
          })}
        </Card>
        <AppText variant="caption" style={{ color: colors.textMuted }}>
          선택한 화면 스타일은 앱을 다시 열어도 유지돼요.
        </AppText>
      </View>

      <View style={styles.section}>
        <AppText variant="heading">앱 정보</AppText>
        <Card style={styles.infoCard}>
          <View style={styles.infoRow}>
            <AppText style={styles.infoLabel}>앱 이름</AppText>
            <AppText style={{ color: colors.textMuted }}>{appName}</AppText>
          </View>
          <View style={[styles.infoRow, styles.infoDivider, { borderTopColor: colors.border }]}>
            <AppText style={styles.infoLabel}>버전</AppText>
            <AppText style={{ color: colors.textMuted }}>{appVersion}</AppText>
          </View>
        </Card>
      </View>

      <Card style={[styles.aboutCard, { backgroundColor: colors.primarySoft }]}>
        <View style={[styles.brandMark, { backgroundColor: colors.primary }]}>
          <AppText style={[styles.brandSymbol, { color: colors.onPrimary }]}>✦</AppText>
        </View>
        <AppText variant="heading">작은 시작, 새로운 가능성</AppText>
        <AppText style={[styles.aboutCopy, { color: colors.textMuted }]}>
          {'새로운 앱을 위한 기본 샘플이에요.\n둘러보기의 이야기는 예시 콘텐츠이며,\n계정이나 개인 정보를 입력할 필요가 없어요.'}
        </AppText>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { gap: 30, paddingTop: 24, paddingBottom: 32 },
  intro: { gap: 10 },
  eyebrow: { fontWeight: '700', letterSpacing: 2 },
  section: { gap: 14 },
  appearanceCard: { paddingVertical: 0, paddingHorizontal: 18 },
  appearanceOption: { flexDirection: 'row', alignItems: 'center', paddingVertical: 18, gap: 14, minHeight: 90 },
  optionSymbol: { width: 44, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  optionSymbolText: { fontSize: 25, lineHeight: 31 },
  optionCopy: { flex: 1, gap: 5 },
  optionTitle: { fontWeight: '600' },
  radio: { width: 24, height: 24, borderWidth: 2, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  check: { fontSize: 14, lineHeight: 18, fontWeight: '700' },
  infoCard: { paddingVertical: 4 },
  infoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingVertical: 17 },
  infoLabel: { fontWeight: '600' },
  infoDivider: { borderTopWidth: 1 },
  aboutCard: { alignItems: 'center', gap: 16, paddingVertical: 28 },
  brandMark: { width: 50, height: 50, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  brandSymbol: { fontSize: 29, lineHeight: 36 },
  aboutCopy: { textAlign: 'center', fontSize: 14, lineHeight: 24 },
});

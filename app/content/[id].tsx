import { Stack, router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppText, Button, Card, Screen } from '@/components/ui';
import { contentItems, getCategoryLabel } from '@/data/content';
import { useAppTheme } from '@/theme/AppThemeProvider';

export function generateStaticParams() {
  return contentItems.map((item) => ({ id: item.id }));
}

export default function ContentDetailScreen() {
  const { colors } = useAppTheme();
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const contentId = Array.isArray(id) ? id[0] : id;
  const item = contentItems.find((content) => content.id === contentId);

  if (!item) {
    return (
      <Screen edges={['left', 'right', 'bottom']} contentStyle={styles.missing}>
        <Stack.Screen options={{ title: '콘텐츠 상세' }} />
        <Card style={styles.missingCard}>
          <AppText style={[styles.missingSymbol, { color: colors.primary }]}>◇</AppText>
          <AppText variant="heading">이야기를 찾을 수 없어요</AppText>
          <AppText style={[styles.centered, { color: colors.textMuted }]}>
            다른 콘텐츠를 둘러보고 새로운 영감을 만나보세요.
          </AppText>
          <Button label="둘러보기로 가기" onPress={() => router.replace('/explore')} />
        </Card>
      </Screen>
    );
  }

  return (
    <Screen edges={['left', 'right', 'bottom']} contentStyle={styles.content}>
      <Stack.Screen options={{ title: '콘텐츠 상세' }} />
      <View style={[styles.illustration, { backgroundColor: colors.primarySoft }]}>
        <View style={[styles.illustrationCircle, { borderColor: colors.primary }]} />
        <AppText style={[styles.illustrationSymbol, { color: colors.primary }]}>{item.symbol}</AppText>
        <AppText variant="caption" style={[styles.illustrationLabel, { color: colors.primary }]}>A LITTLE INSPIRATION</AppText>
      </View>

      <View style={styles.intro}>
        <View style={styles.metadata}>
          <View style={[styles.badge, { backgroundColor: colors.primarySoft }]}>
            <AppText variant="caption" style={[styles.badgeText, { color: colors.primary }]}>
              {getCategoryLabel(item.category)}
            </AppText>
          </View>
          <AppText variant="caption" style={{ color: colors.textMuted }}>{item.readingMinutes}분 읽기</AppText>
        </View>
        <AppText variant="title" style={styles.title}>{item.title}</AppText>
        <AppText style={[styles.summary, { color: colors.textMuted }]}>{item.summary}</AppText>
      </View>

      <View style={[styles.body, { borderTopColor: colors.border }]}>
        {item.body.map((paragraph, index) => (
          <AppText key={index} style={styles.paragraph}>{paragraph}</AppText>
        ))}
      </View>

      <Card style={[styles.tips, { backgroundColor: colors.surfaceMuted }]}>
        <AppText variant="heading">작게 실천해 보기</AppText>
        {item.tips.map((tip, index) => (
          <View key={tip} style={styles.tip}>
            <View style={[styles.tipNumber, { backgroundColor: colors.primarySoft }]}>
              <AppText variant="caption" style={[styles.tipNumberText, { color: colors.primary }]}>{index + 1}</AppText>
            </View>
            <AppText style={styles.tipText}>{tip}</AppText>
          </View>
        ))}
      </Card>

      <View style={styles.footer}>
        <AppText variant="caption" style={[styles.centered, { color: colors.textMuted }]}>
          이 이야기는 앱의 화면 구성을 위한 샘플 콘텐츠예요.
        </AppText>
        <Button label="다른 이야기 둘러보기" variant="secondary" onPress={() => router.replace('/explore')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { gap: 28, paddingTop: 16, paddingBottom: 32 },
  illustration: { minHeight: 190, borderRadius: 28, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', gap: 14 },
  illustrationCircle: { position: 'absolute', width: 230, height: 230, borderRadius: 115, borderWidth: 1, opacity: 0.13, right: -64, top: -82 },
  illustrationSymbol: { fontSize: 68, lineHeight: 80 },
  illustrationLabel: { fontWeight: '700', letterSpacing: 2, fontSize: 10 },
  intro: { gap: 15 },
  metadata: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  badge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  badgeText: { fontWeight: '600' },
  title: { fontSize: 29, lineHeight: 40, letterSpacing: -0.6 },
  summary: { lineHeight: 27 },
  body: { borderTopWidth: 1, paddingTop: 26, gap: 22 },
  paragraph: { fontSize: 16, lineHeight: 30 },
  tips: { gap: 18 },
  tip: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  tipNumber: { width: 28, height: 28, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  tipNumberText: { fontWeight: '700' },
  tipText: { flex: 1, fontSize: 14, lineHeight: 23 },
  footer: { gap: 20 },
  centered: { textAlign: 'center' },
  missing: { flexGrow: 1, justifyContent: 'center', paddingVertical: 32 },
  missingCard: { alignItems: 'center', gap: 20, paddingVertical: 32 },
  missingSymbol: { fontSize: 54, lineHeight: 65 },
});

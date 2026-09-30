import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText, Card, Screen } from '@/components/ui';
import { contentItems, getCategoryLabel } from '@/data/content';
import { useAppTheme } from '@/theme/AppThemeProvider';

export default function HomeScreen() {
  const { colors } = useAppTheme();

  return (
    <Screen contentStyle={styles.content}>
      <View style={styles.intro}>
        <View style={styles.brandRow}>
          <View style={[styles.brandMark, { backgroundColor: colors.primary }]}>
            <AppText style={[styles.brandSymbol, { color: colors.onPrimary }]}>✦</AppText>
          </View>
          <AppText variant="caption" style={[styles.brand, { color: colors.textMuted }]}>STARTER</AppText>
        </View>
        <AppText variant="title" style={styles.title}>{'새로운 시작,\n더 가벼운 하루.'}</AppText>
        <AppText style={{ color: colors.textMuted }}>일상에 필요한 아이디어를 만나보세요.</AppText>
      </View>

      <Card style={[styles.hero, { backgroundColor: colors.primary, borderColor: colors.primary }]}>
        <View style={styles.heroTop}>
          <View style={[styles.heroLabel, { borderColor: colors.onPrimary }]}>
            <AppText variant="caption" style={{ color: colors.onPrimary }}>오늘의 작은 발견</AppText>
          </View>
          <AppText style={[styles.heroStar, { color: colors.onPrimary }]}>✦</AppText>
        </View>
        <AppText variant="heading" style={[styles.heroHeading, { color: colors.onPrimary }]}>
          {'좋은 아이디어는\n가까이에 있어요.'}
        </AppText>
        <AppText style={[styles.heroDescription, { color: colors.onPrimary }]}>
          {'작은 습관부터 새로운 영감까지,\n나에게 맞는 이야기를 찾아보세요.'}
        </AppText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="콘텐츠 둘러보기"
          onPress={() => router.push('/explore')}
          style={({ pressed }) => [styles.heroButton, { backgroundColor: colors.onPrimary, opacity: pressed ? 0.8 : 1 }]}>
          <AppText style={[styles.heroButtonText, { color: colors.primary }]}>둘러보기</AppText>
          <AppText style={[styles.heroArrow, { color: colors.primary }]}>↗</AppText>
        </Pressable>
      </Card>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitles}>
            <AppText variant="heading">오늘의 추천</AppText>
            <AppText variant="caption" style={{ color: colors.textMuted }}>잠깐 읽고, 가볍게 시작해요</AppText>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="전체 콘텐츠 보기"
            onPress={() => router.push('/explore')}
            style={({ pressed }) => [styles.allButton, { opacity: pressed ? 0.6 : 1 }]}>
            <AppText variant="caption" style={[styles.allButtonText, { color: colors.primary }]}>전체 보기 →</AppText>
          </Pressable>
        </View>

        {contentItems.slice(0, 3).map((item) => (
          <Pressable
            key={item.id}
            accessibilityRole="button"
            accessibilityLabel={`${item.title}, ${getCategoryLabel(item.category)}, ${item.readingMinutes}분 읽기`}
            onPress={() => router.push({ pathname: '/content/[id]', params: { id: item.id } })}
            style={({ pressed }) => ({ opacity: pressed ? 0.75 : 1 })}>
            <Card style={styles.recommendation}>
              <View style={[styles.itemSymbol, { backgroundColor: colors.primarySoft }]}>
                <AppText style={[styles.itemSymbolText, { color: colors.primary }]}>{item.symbol}</AppText>
              </View>
              <View style={styles.itemCopy}>
                <AppText variant="caption" style={{ color: colors.textMuted }}>
                  {getCategoryLabel(item.category)} · {item.readingMinutes}분 읽기
                </AppText>
                <AppText style={styles.itemTitle}>{item.title}</AppText>
                <AppText variant="caption" style={{ color: colors.textMuted }}>{item.summary}</AppText>
              </View>
              <AppText style={{ color: colors.textMuted }}>›</AppText>
            </Card>
          </Pressable>
        ))}
      </View>

      <Card style={[styles.note, { backgroundColor: colors.surfaceMuted }]}>
        <AppText style={[styles.noteSymbol, { color: colors.primary }]}>◇</AppText>
        <View style={styles.noteCopy}>
          <AppText style={styles.noteTitle}>내 속도로 시작해요</AppText>
          <AppText variant="caption" style={{ color: colors.textMuted }}>오늘은 작은 아이디어 하나면 충분해요.</AppText>
        </View>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { gap: 28, paddingTop: 24, paddingBottom: 32 },
  intro: { gap: 12 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 9, marginBottom: 5 },
  brandMark: { width: 28, height: 28, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  brandSymbol: { fontSize: 18, lineHeight: 22 },
  brand: { fontWeight: '700', letterSpacing: 3 },
  title: { letterSpacing: -1 },
  hero: { gap: 18, padding: 24 },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  heroLabel: { borderWidth: 1, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  heroStar: { fontSize: 32, lineHeight: 38, opacity: 0.8 },
  heroHeading: { fontSize: 26, lineHeight: 37, letterSpacing: -0.7 },
  heroDescription: { lineHeight: 25, opacity: 0.9 },
  heroButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 16, minHeight: 52, paddingHorizontal: 18, marginTop: 6 },
  heroButtonText: { fontWeight: '700' },
  heroArrow: { fontSize: 25 },
  section: { gap: 12 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginBottom: 4 },
  sectionTitles: { gap: 4, flex: 1 },
  allButton: { minHeight: 48, justifyContent: 'center', paddingLeft: 8 },
  allButtonText: { fontWeight: '600' },
  recommendation: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16 },
  itemSymbol: { width: 52, height: 60, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  itemSymbolText: { fontSize: 27, lineHeight: 34 },
  itemCopy: { flex: 1, gap: 5 },
  itemTitle: { fontWeight: '700', lineHeight: 23 },
  note: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 18 },
  noteSymbol: { fontSize: 30, lineHeight: 38 },
  noteCopy: { flex: 1, gap: 4 },
  noteTitle: { fontWeight: '600' },
});

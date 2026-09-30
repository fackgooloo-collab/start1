import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { AppText, Button, Card, Screen } from '@/components/ui';
import { ContentCategory, contentCategories, filterContent, getCategoryLabel } from '@/data/content';
import { useAppTheme } from '@/theme/AppThemeProvider';

export default function ExploreScreen() {
  const { colors } = useAppTheme();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ContentCategory | 'all'>('all');
  const items = filterContent(query, category);
  const categories: { id: ContentCategory | 'all'; label: string }[] = [
    { id: 'all', label: '전체' },
    ...contentCategories,
  ];

  function resetFilters() {
    setQuery('');
    setCategory('all');
  }

  return (
    <Screen contentStyle={styles.content}>
      <View style={styles.intro}>
        <AppText variant="caption" style={[styles.eyebrow, { color: colors.primary }]}>DISCOVER</AppText>
        <AppText variant="title">둘러보기</AppText>
        <AppText style={{ color: colors.textMuted }}>지금 나에게 필요한 작은 영감을 찾아요.</AppText>
      </View>

      <View style={styles.filters}>
        <View style={[styles.search, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <AppText style={[styles.searchSymbol, { color: colors.textMuted }]}>⌕</AppText>
          <TextInput
            accessibilityLabel="콘텐츠 검색"
            value={query}
            onChangeText={setQuery}
            placeholder="어떤 이야기가 궁금한가요?"
            placeholderTextColor={colors.textMuted}
            returnKeyType="search"
            autoCorrect={false}
            style={[styles.searchInput, { color: colors.text }]}
          />
          {query.length > 0 && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="검색어 지우기"
              onPress={() => setQuery('')}
              style={styles.clearButton}>
              <AppText style={[styles.clearSymbol, { color: colors.textMuted }]}>×</AppText>
            </Pressable>
          )}
        </View>

        <ScrollView
          horizontal
          accessibilityRole="radiogroup"
          accessibilityLabel="콘텐츠 카테고리"
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}>
          {categories.map((item) => {
            const selected = category === item.id;

            return (
              <Pressable
                key={item.id}
                accessibilityRole="radio"
                accessibilityLabel={`${item.label} 카테고리`}
                accessibilityState={{ checked: selected }}
                aria-checked={selected}
                onPress={() => setCategory(item.id)}
                style={({ pressed }) => [
                  styles.category,
                  {
                    backgroundColor: selected ? colors.primary : colors.surface,
                    borderColor: selected ? colors.primary : colors.border,
                    opacity: pressed ? 0.75 : 1,
                  },
                ]}>
                <AppText style={[styles.categoryLabel, { color: selected ? colors.onPrimary : colors.textMuted }]}>
                  {item.label}
                </AppText>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.results}>
        <View style={styles.resultHeader}>
          <AppText variant="heading">{query.trim() ? '검색 결과' : '모든 이야기'}</AppText>
          <AppText variant="caption" style={{ color: colors.textMuted }}>{items.length}개 콘텐츠</AppText>
        </View>

        {items.map((item) => (
          <Pressable
            key={item.id}
            accessibilityRole="button"
            accessibilityLabel={`${item.title}, ${getCategoryLabel(item.category)}, ${item.readingMinutes}분 읽기`}
            onPress={() => router.push({ pathname: '/content/[id]', params: { id: item.id } })}
            style={({ pressed }) => ({ opacity: pressed ? 0.75 : 1 })}>
            <Card style={styles.contentCard}>
              <View style={styles.cardTop}>
                <View style={[styles.symbol, { backgroundColor: colors.primarySoft }]}>
                  <AppText style={[styles.symbolText, { color: colors.primary }]}>{item.symbol}</AppText>
                </View>
                <View style={[styles.categoryBadge, { backgroundColor: colors.surfaceMuted }]}>
                  <AppText variant="caption" style={{ color: colors.textMuted }}>{getCategoryLabel(item.category)}</AppText>
                </View>
              </View>
              <AppText variant="heading" style={styles.cardTitle}>{item.title}</AppText>
              <AppText style={{ color: colors.textMuted }}>{item.summary}</AppText>
              <View style={[styles.cardFooter, { borderTopColor: colors.border }]}>
                <AppText variant="caption" style={{ color: colors.textMuted }}>{item.readingMinutes}분 읽기</AppText>
                <AppText style={[styles.readLink, { color: colors.primary }]}>읽어보기 →</AppText>
              </View>
            </Card>
          </Pressable>
        ))}

        {items.length === 0 && (
          <Card style={styles.emptyState}>
            <AppText style={[styles.emptySymbol, { color: colors.primary }]}>⌕</AppText>
            <AppText variant="heading">아직 맞는 이야기가 없어요</AppText>
            <AppText style={[styles.emptyDescription, { color: colors.textMuted }]}>
              다른 검색어나 카테고리로 다시 찾아보세요.
            </AppText>
            <Button label="전체 콘텐츠 보기" variant="secondary" onPress={resetFilters} />
          </Card>
        )}
      </View>
      <AppText variant="caption" style={[styles.sampleNote, { color: colors.textMuted }]}>
        이 앱의 콘텐츠는 화면 구성을 위한 샘플이에요.
      </AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { gap: 26, paddingTop: 24, paddingBottom: 32 },
  intro: { gap: 10 },
  eyebrow: { fontWeight: '700', letterSpacing: 2 },
  filters: { gap: 14 },
  search: { borderWidth: 1, borderRadius: 18, flexDirection: 'row', alignItems: 'center', minHeight: 56, paddingLeft: 16, paddingRight: 4 },
  searchSymbol: { fontSize: 28, lineHeight: 34, marginRight: 10 },
  searchInput: { flex: 1, minHeight: 56, fontSize: 15, paddingVertical: 14 },
  clearButton: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  clearSymbol: { fontSize: 25 },
  categoryList: { flexDirection: 'row', gap: 9 },
  category: { borderRadius: 25, borderWidth: 1, minHeight: 48, minWidth: 67, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 19 },
  categoryLabel: { fontSize: 14, fontWeight: '600' },
  results: { gap: 14 },
  resultHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 2 },
  contentCard: { gap: 13 },
  cardTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  symbol: { width: 52, height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  symbolText: { fontSize: 27, lineHeight: 34 },
  categoryBadge: { borderRadius: 10, paddingVertical: 6, paddingHorizontal: 10 },
  cardTitle: { fontSize: 20, lineHeight: 29 },
  cardFooter: { borderTopWidth: 1, paddingTop: 13, marginTop: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  readLink: { fontSize: 14, fontWeight: '600' },
  emptyState: { alignItems: 'center', gap: 16, paddingVertical: 32 },
  emptySymbol: { fontSize: 46, lineHeight: 54 },
  emptyDescription: { textAlign: 'center' },
  sampleNote: { textAlign: 'center' },
});

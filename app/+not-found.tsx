import { router } from 'expo-router';

import { AppText, Button, Card, Screen } from '@/components/ui';
import { useAppTheme } from '@/theme/AppThemeProvider';

export default function NotFoundScreen() {
  const { colors } = useAppTheme();
  return (
    <Screen edges={['left', 'right', 'bottom']}>
      <Card>
        <AppText variant="heading">페이지를 찾을 수 없어요</AppText>
        <AppText style={{ color: colors.textMuted }}>주소를 확인하거나 홈에서 다시 시작해 주세요.</AppText>
        <Button label="홈으로 이동" onPress={() => router.replace('/')} />
      </Card>
    </Screen>
  );
}

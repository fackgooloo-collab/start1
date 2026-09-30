export type ContentCategory = 'daily' | 'ideas' | 'life';

export type ContentItem = {
  id: string;
  title: string;
  category: ContentCategory;
  summary: string;
  readingMinutes: number;
  symbol: string;
  body: string[];
  tips: string[];
};

export const contentCategories: { id: ContentCategory; label: string }[] = [
  { id: 'daily', label: '일상' },
  { id: 'ideas', label: '아이디어' },
  { id: 'life', label: '생활' },
];

export const contentItems: ContentItem[] = [
  {
    id: 'slow-morning',
    title: '나를 위한 아침 10분',
    category: 'daily',
    summary: '바쁜 하루를 시작하기 전, 작은 여유를 만들어 보세요.',
    readingMinutes: 2,
    symbol: '☀',
    body: [
      '아침을 바꾸는 데 거창한 계획이 필요하지는 않습니다. 알림을 확인하기 전에 잠깐 창문을 열고, 오늘의 기분을 살펴보는 것부터 시작해 보세요.',
      '좋아하는 음료 한 잔과 함께 오늘 꼭 하고 싶은 일 하나를 적어 보세요. 할 일을 더 늘리기보다, 내 하루에서 소중한 것이 무엇인지 정하는 시간입니다.',
      '매일 같은 모습일 필요도 없습니다. 어떤 날은 스트레칭을 하고, 어떤 날은 조용히 앉아 있는 것만으로 충분합니다. 부담 없이 다시 시작할 수 있는 작은 습관을 만들어 보세요.',
    ],
    tips: ['물 한 잔 마시기', '몸을 가볍게 움직이기', '오늘 하고 싶은 일 하나 적기'],
  },
  {
    id: 'idea-notebook',
    title: '떠오른 생각을 놓치지 않는 법',
    category: 'ideas',
    summary: '완성된 문장보다, 지금 떠오른 한 줄이 더 중요해요.',
    readingMinutes: 3,
    symbol: '✦',
    body: [
      '좋은 생각은 준비된 순간에만 찾아오지 않습니다. 산책 중에, 이동 중에, 다른 일을 하다가 문득 떠오르기도 합니다. 그 순간을 붙잡을 수 있는 간단한 기록 도구를 정해 보세요.',
      '처음부터 내용을 깔끔하게 정리하려고 하면 기록을 미루기 쉽습니다. 단어 몇 개, 짧은 질문, 서툰 스케치도 괜찮습니다. 미래의 내가 떠올릴 수 있을 정도면 충분합니다.',
      '일주일에 한 번 기록을 다시 읽어 보세요. 자주 등장하는 주제나 아직 궁금한 질문을 찾아 연결하면, 짧은 메모가 다음 아이디어의 출발점이 됩니다.',
    ],
    tips: ['가장 편한 기록 도구 하나 정하기', '떠오른 생각을 한 줄로 남기기', '일주일에 한 번 메모 돌아보기'],
  },
  {
    id: 'small-space',
    title: '작은 공간, 편안한 취향',
    category: 'life',
    summary: '익숙한 공간에 나다운 작은 변화를 더해 보세요.',
    readingMinutes: 3,
    symbol: '⌂',
    body: [
      '내가 자주 머무는 공간에서 가장 편안한 자리를 떠올려 보세요. 책상 한쪽, 소파 옆, 창가처럼 작은 영역부터 시작하면 공간을 바꾸는 일이 한결 가벼워집니다.',
      '새로운 물건을 사기 전에 지금 가진 물건의 위치를 바꿔 보세요. 손이 자주 가는 물건을 가까이 두고, 시선을 복잡하게 만드는 것들을 정리하는 것만으로도 분위기가 달라질 수 있습니다.',
      '좋아하는 색 하나나 사진 한 장으로 취향을 더해 보세요. 보기 좋은 공간보다 나에게 편안한 공간인지 살펴보는 것이 먼저입니다.',
    ],
    tips: ['자주 쓰는 물건을 가까이 두기', '한 곳만 가볍게 정리하기', '좋아하는 물건 하나 놓아 보기'],
  },
  {
    id: 'walking-break',
    title: '익숙한 길에서 찾는 새로움',
    category: 'daily',
    summary: '잠깐의 산책으로 평소 지나치던 풍경을 만나보세요.',
    readingMinutes: 2,
    symbol: '↗',
    body: [
      '늘 걷던 길도 조금 천천히 보면 다르게 느껴집니다. 오늘은 목적지에 빨리 도착하는 것보다, 주변에서 눈에 들어오는 한 가지를 찾아보세요.',
      '계절에 따라 달라지는 나무, 작은 가게의 창문, 골목의 빛처럼 가까운 풍경에도 변화가 있습니다. 멀리 떠나지 않아도 짧은 산책이 일상의 환기가 될 수 있습니다.',
      '돌아와서 기억에 남는 장면을 한 문장으로 적어 보세요. 비슷해 보였던 하루에서 나만의 작은 발견을 남길 수 있습니다.',
    ],
    tips: ['안전하고 편한 산책길 정하기', '눈에 들어오는 풍경 하나 찾아보기', '기억에 남는 장면 한 줄 남기기'],
  },
  {
    id: 'weekend-project',
    title: '주말에 완성하는 작은 프로젝트',
    category: 'ideas',
    summary: '하고 싶었던 일을 작게 나누면 시작이 쉬워져요.',
    readingMinutes: 4,
    symbol: '◇',
    body: [
      '언젠가 해보고 싶은 일을 한 가지 골라 보세요. 사진 정리, 짧은 글 쓰기, 새로운 요리처럼 결과가 작아도 내가 즐길 수 있는 일이라면 좋습니다.',
      '완성하고 싶은 범위를 먼저 줄여 보세요. 사진첩 전체 대신 사진 열 장, 긴 글 대신 한 문단으로 정하면 주말의 짧은 시간에도 끝까지 해볼 수 있습니다.',
      '끝낸 뒤에는 아쉬운 점보다 즐거웠던 순간을 먼저 돌아보세요. 다음 주말에도 이어가고 싶다면 한 단계만 더해 보세요. 작은 완성의 경험이 다음 시작을 도와줍니다.',
    ],
    tips: ['해보고 싶은 일 하나 고르기', '한 시간 안에 끝낼 범위 정하기', '완성한 결과와 느낌 기록하기'],
  },
  {
    id: 'weekly-reset',
    title: '가볍게 정리하는 한 주',
    category: 'life',
    summary: '해야 할 일과 쉬는 시간을 함께 살펴보세요.',
    readingMinutes: 2,
    symbol: '≋',
    body: [
      '다음 주의 계획을 세우기 전에 지난 한 주를 잠깐 돌아보세요. 기억에 남는 일, 수고한 일, 쉬고 싶었던 순간을 적으면 앞으로 필요한 시간이 보입니다.',
      '다음 주에 꼭 필요한 일은 세 가지 정도만 먼저 정해 보세요. 모든 시간을 계획으로 채우지 않고, 예상하지 못한 일이나 휴식을 위한 빈칸도 남겨 두세요.',
      '계획은 나를 평가하는 기준보다 하루를 돕는 도구에 가깝습니다. 상황이 달라지면 다시 조정하고, 지나간 일은 다음 주로 가볍게 넘겨도 괜찮습니다.',
    ],
    tips: ['지난주에 좋았던 일 하나 적기', '다음 주에 중요한 일 세 가지 고르기', '쉴 시간도 일정에 남겨 두기'],
  },
];

export function getCategoryLabel(category: ContentCategory): string {
  return contentCategories.find((item) => item.id === category)?.label ?? category;
}

export function filterContent(query: string, category: ContentCategory | 'all'): ContentItem[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();

  return contentItems.filter((item) => {
    const matchesCategory = category === 'all' || item.category === category;
    const searchableText = `${item.title} ${item.summary} ${getCategoryLabel(item.category)}`;

    return matchesCategory && searchableText.toLocaleLowerCase().includes(normalizedQuery);
  });
}

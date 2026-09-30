# Starter

Android와 iOS 앱을 새로 만들 때 재사용할 수 있는 Expo SDK 57, React Native, TypeScript 기본 프로젝트입니다. Expo Router로 화면을 구성하며 웹 실행도 지원합니다.

## 포함된 기능

- 홈: 추천 샘플 콘텐츠와 상세 화면
- 탐색: 제목·설명·카테고리 검색과 카테고리 필터
- 설정: 시스템 기본, 라이트, 다크 테마 선택 및 선택값 저장
- 공통 UI: 화면 여백, 카드, 텍스트와 테마 색상

콘텐츠는 `data/content.ts`의 로컬 샘플 데이터입니다. 백엔드, 로그인, 결제, 푸시 알림은 포함하지 않습니다.

## 설치와 실행

Node.js 24와 npm을 사용합니다. Node 버전은 `.nvmrc`에 기록되어 있습니다.

```bash
npm ci
npm start
```

로컬 개발 컴퓨터와 휴대폰을 같은 네트워크에 연결한 뒤, 실행 화면의 QR 코드를 Expo Go로 열 수 있습니다. 사용하는 Expo Go가 이 프로젝트의 Expo SDK 버전을 지원해야 합니다.

Android 에뮬레이터 또는 iOS 시뮬레이터를 사용하려면 해당 개발 도구를 먼저 설치한 뒤 다음 명령을 실행합니다.

```bash
npm run android
npm run ios
```

Android 에뮬레이터에는 Android Studio가 필요합니다. iOS 시뮬레이터와 로컬 iOS 네이티브 빌드에는 macOS와 Xcode가 필요합니다. 별도 EAS Build 설정을 통해 클라우드 네이티브 빌드를 구성할 수도 있습니다.

웹 실행은 선택 사항입니다.

```bash
npm run web
```

## 클라우드 개발 환경

npm 캐시를 쓰기 가능한 작업 공간에 둡니다.

```bash
npm --cache /workspace/.npm-cache ci
```

비대화형 검증에서는 `CI=1`과 `EXPO_NO_TELEMETRY=1`을 사용합니다. Expo API 접근이 제한된 이 클라우드에서는 `EXPO_OFFLINE=1`도 지정합니다.

```bash
CI=1 EXPO_OFFLINE=1 EXPO_NO_TELEMETRY=1 npm run check:dependencies
CI=0 EXPO_OFFLINE=1 EXPO_NO_TELEMETRY=1 EXPO_UNSTABLE_HEADLESS=1 npm run web -- --localhost --port 8082 --max-workers 2
```

오프라인 의존성 검사는 설치된 SDK의 권장 버전 정보를 사용합니다. React Native Directory의 온라인 호환성 조회는 이 환경에서 수행하지 못하므로, 네트워크가 허용된 로컬 개발 환경이나 CI에서 온라인 검사도 실행하세요. 이 환경에서는 개발 서버에 대한 외부 접근이 제공되지 않으므로, 실기기와 시뮬레이터 실행은 로컬 개발 컴퓨터에서 진행합니다.

## 검증 명령

```bash
npm run typecheck
npm run check:dependencies
npm run export:android
npm run export:ios
npm run export:web
```

타입 검사는 TypeScript 오류를 확인하고, 의존성 검사는 설치된 패키지의 Expo SDK 호환성을 확인합니다. 플랫폼별 export는 Metro가 배포용 JavaScript 번들과 에셋을 생성할 수 있는지 확인합니다. 출력은 `dist/android`, `dist/ios`, `dist/web`에 생성됩니다.

GitHub Actions는 Node.js 24에서 잠금 파일 기반 설치, 타입 검사, 의존성 검사, Android와 iOS export를 실행합니다. 이러한 검사는 네이티브 실행 파일 빌드나 실기기 동작 검증을 대신하지 않습니다.

실기기에서는 홈에서 상세 화면으로 이동하고 돌아오기, 검색 결과와 빈 결과, 테마 변경과 앱 재실행 후 선택값 유지, 화면 여백과 터치 동작을 확인합니다. Android와 iOS 양쪽에서 확인해야 합니다.

## 주요 구조

```text
app/
  (tabs)/
    index.tsx          홈
    explore.tsx        검색
    settings.tsx       테마 설정
  content/[id].tsx     콘텐츠 상세
components/ui.tsx     공통 UI
theme/AppThemeProvider.tsx
                      테마 상태와 저장
data/content.ts       샘플 콘텐츠
assets/               앱 아이콘과 이미지
```

## 새 앱으로 재사용

`app.json`에서 표시 이름(`Starter`), slug(`start1`), URL scheme(`start1`), 버전, 아이콘과 시작 화면 이미지를 새 앱에 맞게 변경합니다. `package.json`의 패키지 이름도 함께 변경할 수 있습니다.

Android `package`와 iOS `bundleIdentifier`의 기본값 `com.example.start1`은 예시입니다. 배포 전에 각각 고유한 앱 식별자로 바꾸세요. 식별자는 스토어 등록과 서명에 사용되므로 앱 배포 계획에 맞게 정해야 합니다.

`data/content.ts`를 실제 데이터로 교체하고 공통 UI와 테마를 확장하면 됩니다. 설정 화면의 앱 이름과 버전은 `app.json` 값을 사용합니다. 홈의 브랜드와 문구도 프로젝트에 맞게 수정하세요. 백엔드 연결이나 인증이 필요해지면 해당 기능과 필요한 환경 변수를 별도로 추가합니다. 비밀값은 저장소에 커밋하지 않습니다.

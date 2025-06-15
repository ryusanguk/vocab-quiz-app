# 영어 어휘 퀴즈 앱

Markdown 파일에서 어휘를 읽어와 4지선다 퀴즈를 생성하는 모바일 최적화 웹앱입니다.

## ✨ 주요 기능

- 📖 Markdown 파일에서 어휘 자동 파싱
- 🤖 OpenAI API로 예문 자동 생성 (캐시 활용)
- 📱 모바일 최적화 반응형 UI
- 📊 실시간 점수 추적 및 진행률 표시
- 🔒 안전한 API 키 관리 (서버사이드)

## 🚀 빠른 시작

### 1. 리포지토리 클론
```bash
git clone <your-repo-url>
cd vocab-quiz-app
```

### 2. 파일 구조 확인
```
vocab-quiz-app/
├── index.html                    # 메인 앱
├── api/
│   └── generate-sentence.js      # OpenAI API 함수
├── vocabulary_complete.md        # 어휘 데이터
├── llm_sentence_cache.json       # 예문 캐시
├── vercel.json                   # Vercel 설정
├── package.json                  # 프로젝트 설정
└── README.md                     # 이 파일
```

### 3. Vercel 배포

#### 방법 1: Vercel 웹사이트 사용 (추천)
1. [vercel.com](https://vercel.com)에 GitHub 계정으로 가입
2. "New Project" → GitHub 리포지토리 선택
3. Environment Variables 설정:
   - `OPENAI_API_KEY`: 당신의 OpenAI API 키
4. "Deploy" 클릭

#### 방법 2: Vercel CLI 사용
```bash
# Vercel CLI 설치
npm install -g vercel

# 로그인
vercel login

# 환경변수 설정
vercel env add OPENAI_API_KEY

# 배포
vercel --prod
```

## 🔑 환경변수 설정

Vercel 대시보드에서 다음 환경변수를 설정하세요:

| 변수명 | 설명 | 예시 |
|--------|------|------|
| `OPENAI_API_KEY` | OpenAI API 키 | `sk-proj-...` |

## 📝 어휘 데이터 추가

`vocabulary_complete.md` 파일을 수정하여 새로운 어휘를 추가할 수 있습니다:

```markdown
### 새로운 단어
**Definition:** 정의를 여기에 작성하세요.

**Examples:**
- 예문 1
- 예문 2
```

## 🎯 사용법

1. **홈 화면**: 총 단어 수와 문제 수 확인
2. **퀴즈 시작**: "퀴즈 시작하기" 버튼 클릭
3. **문제 풀기**: 정의를 보고 4지선다에서 정답 선택
4. **결과 확인**: 점수와 등급 확인 후 재시도 가능

## 🛠 로컬 개발

```bash
# 의존성 설치 (선택사항)
npm install

# 로컬 개발 서버 실행
vercel dev

# 브라우저에서 http://localhost:3000 열기
```

## 📁 파일 설명

- **index.html**: React 기반 SPA, CDN으로 라이브러리 로드
- **api/generate-sentence.js**: OpenAI API 호출하는 서버리스 함수
- **vocabulary_complete.md**: 어휘 데이터 (Markdown 형식)
- **llm_sentence_cache.json**: 생성된 예문 캐시
- **vercel.json**: Vercel 설정 (CORS, 함수 타임아웃 등)

## 💰 비용

- **Vercel**: 무료 티어로 충분 (월 100GB 트래픽)
- **OpenAI API**: 사용량에 따른 과금 (GPT-4o 기준)
  - 예상 비용: 문제당 약 $0.001 (매우 저렴)

## 🔧 커스터마이징

### 문제 수 변경
`index.html`에서 `totalQuestions` 값 수정:
```javascript
const [totalQuestions] = useState(10); // 원하는 문제 수로 변경
```

### 스타일 변경
Tailwind CSS 클래스를 수정하여 디자인 커스터마이징 가능

### 새로운 기능 추가
- 난이도별 분류
- 학습 통계
- 소셜 기능
- 오프라인 모드

## 🐛 문제 해결

### OpenAI API 에러
- API 키가 올바르게 설정되었는지 확인
- 계정에 충분한 크레딧이 있는지 확인
- 에러 시 자동으로 폴백 예문 사용

### 배포 실패
- 환경변수가 올바르게 설정되었는지 확인
- Vercel 로그에서 에러 메시지 확인

### 로컬 개발 문제
```bash
# 캐시 클리어
vercel dev --debug

# 환경변수 확인
vercel env ls
```

## 📄 라이선스

MIT License

## 🤝 기여

1. Fork 프로젝트
2. Feature 브랜치 생성
3. 변경사항 커밋
4. Pull Request 생성

## 📞 지원

문제가 있다면 GitHub Issues에 등록해주세요.
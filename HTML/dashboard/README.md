# SR Studio · 한국어 주석 버전 (About Me 상단 배치)

원래 전달했던 대시보드의 **디자인과 기능을 유지**하고, 아래 두 가지만 변경했습니다.

1. **About Me를 메인 콘텐츠 상단**으로 옮겼습니다. `Studio Space` 제목 바로 아래에 나오므로 `My Task Board`보다 먼저 보입니다. 왼쪽 사이드바도 `About Me`를 `My Tasks`보다 위에 배치했습니다.
2. HTML / CSS / JavaScript에 **한국어 설명 주석**을 추가했습니다. 읽기 쉽게 CSS를 '속성 한 줄씩' 형태로 정렬했습니다.

## 폴더 구성

```text
HTML/dashboard/                  ← 새로 만들 폴더 예시
├── index.html                  ← 화면의 내용/순서/태그 (HTML)
├── css/
│   ├── style.css               ← 전체 디자인, 사이드바, About Me, 다크모드
│   ├── todo.css                ← 할 일 보드 카드 스타일
│   └── comment.css             ← 댓글 영역 스타일
├── js/
│   ├── scripts.js              ← Todo / LocalStorage / 검색 / 화면 기능
│   └── firebase.js             ← 댓글 / Firestore / 익명 인증
├── images/
│   └── nugul.jpg               ← 기존 사이트에서 복사해야 할 이미지
└── 코드읽기_가이드.md           ← 각 파일을 읽는 추천 순서
```

**주의:** 제공받지 못한 `images/nugul.jpg`는 ZIP에 들어 있지 않습니다. 원래 `mypage/images/nugul.jpg` 파일을 복사해 주세요. 없으면 화면에 'SR.' 대체 표시가 나옵니다.

## VS Code에서 적용하기

1. `class_content/HTML/dashboard/` 폴더를 새로 만듭니다. 기존 `mypage/` 폴더는 그대로 둡니다.
2. 압축파일 안의 `index.html`, `css/`, `js/`, 두 `.md` 파일을 `dashboard/`에 넣습니다.
3. `dashboard/images/` 폴더를 만들고 **기존 `mypage/images/nugul.jpg`**를 복사합니다.
4. VS Code에서 `dashboard/index.html`을 우클릭 → **Open with Live Server**로 확인합니다.
5. 원하는 수정이 끝났을 때만 GitHub에 올려서 배포하면 됩니다.

## 꼭 알아둘 점

- **HTML의 순서가 실제 화면 순서를 결정**합니다. About Me를 위로 옮긴 HTML 위치에는 설명 주석을 넣었습니다.
- **CSS는 모양을 결정**합니다. 파일 맨 아래 `★ 이번 요청으로 추가한 배치 조정 ★` 주석 아래에서 About Me의 크기와 간격을 바꿀 수 있습니다.
- **JavaScript는 클릭·저장 등의 동작을 결정**합니다. `scripts.js`에는 1~15단계 설명을, `firebase.js`에는 1~8단계 설명을 넣었습니다.
- Todo는 **localStorage** 키 `todos`를 계속 사용합니다. 같은 주소(출처)에서 열 때 이전 목록이 이어집니다. `localhost`와 `github.io`는 서로 다른 저장 공간입니다.
- 댓글은 기존 **Firebase 프로젝트**를 사용하므로 원래 사이트의 댓글과 같은 컬렉션을 읽습니다. Firebase 설정/보안 규칙에 따라 접속 및 댓글 등록 가능 여부가 달라집니다.
- 다른 페이지에서도 같은 `todos` 키를 사용할 수 있으니 중요한 데이터는 백업해 두는 게 좋습니다.

## 고치기 쉬운 부분

- **소개 글자**: `index.html`에서 `id="about"` 아래 `백승록`과 소개 문장 수정
- **About Me 위아래 간격**: `css/style.css`의 `.about-featured { margin: ...; }`
- **사진 크기**: `css/style.css`의 `.about-featured .image-section`
- **할 일 버튼 색깔**: `css/style.css`의 `:root`에 있는 `--button` 값
- **댓글 디자인**: `css/comment.css`
- **Todo 동작**: `js/scripts.js`의 `addTodo()`와 `renderTodos()`

배포 후 이전 화면이 계속 보인다면 **Ctrl + Shift + R**로 새로고침해 보세요.

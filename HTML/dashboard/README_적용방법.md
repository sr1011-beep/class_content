# SR Studio 기존 대시보드 인터페이스 유지 · 기능 통합 수정본

이 압축파일은 **현재 대화에서 올린 index.html**을 기준으로 만들었습니다.
기존 CSS(style/todo/comment) 및 JS(scripts/i18n/firebase)는 제공받지 못해 수정하거나 교체하지 않았습니다.

## 바뀐 내용
- 원래 `app-shell` 밖에 있던 캘린더, D-day, 날씨, 퀴즈 영역을 **원래 main-content 내부**로 이동
- 기존 `.panel`, `.section-heading-row` 등 공통 스타일을 최대한 재사용
- JavaScript / PHP 기술 카드 내부 마크업을 기존 HTML / CSS / Java 카드와 일치
- 기존 `My Task Board`에 캘린더·날씨·퀴즈 **바로가기 3개** 및 초기 할 일 3개 추가
  - 기존 Todo 데이터는 삭제하지 않습니다. 첫 실행 시 3개를 생성하고 재실행해도 다시 생성하지 않습니다.
  - 사용자가 한 번 지우면 자동으로 다시 생성하지 않습니다.
- 원래 테마 버튼 SVG를 지워 버리던 `textContent` 코드를 제거
- 기존 `mypage_ddays_v1` D-day 저장 데이터와 `mypage_n2_quiz_v1_날짜` 퀴즈 기록 유지
- 신규 기능의 CSS/JS에 설명 주석 포함

## 적용 순서
1. **현재 `HTML/dashboard` 폴더 전체를 다른 위치에 백업하세요.**
2. 압축 안의 `dashboard/index.html`을 기존의 `HTML/dashboard/index.html`에 복사하세요. 이 파일은 변경된 완성본이므로 `index.html`만 교체해야 새 배치가 적용됩니다.
3. 압축 안의 `dashboard/css/dashboard.css`와 `dashboard/css/quiz.css`를 기존 `HTML/dashboard/css/`로 복사하세요.
4. 압축 안의 `dashboard/js/dashboard.js`와 `dashboard/js/quiz.js`를 기존 `HTML/dashboard/js/`로 복사하세요.
5. `dashboard/quiz.html`도 기존 `HTML/dashboard/quiz.html`로 복사하세요.
6. **기존 파일 `css/style.css`, `css/todo.css`, `css/comment.css`, `js/scripts.js`, `js/firebase.js`, `js/i18n.js`는 변경하거나 삭제하지 마세요.**
7. Live Server에서 `HTML/dashboard/index.html`을 열어 `Ctrl+Shift+R`로 강력 새로고침하세요.

## 참고 및 검사
- `backup/index_수정전.html`은 이번 수정 전 사용자가 업로드한 index.html 백업입니다.
- 새 기능은 모두 같은 `index.html`의 `main.main-content` 안에 들어갑니다.
- 기본 할 일 3개는 기존 `addBtn` 클릭 핸들러를 호출해 저장합니다. Todo 구현이 이와 다르면 자동 추가가 생략될 수 있지만 바로가기 카드 3개는 항상 표시됩니다.
- 위치 조회는 **브라우저의 위치 권한 + HTTPS 또는 localhost** 환경에서 동작합니다. 외부 API 연결이 필요합니다.
- `quiz.html`의 단어 모음은 JLPT 공식 출제 문제는 아닙니다.
- 원본 프로젝트의 모든 기존 CSS·JS 파일과 실제 Firebase 설정을 받지 못했으므로 실제 완전 통합 테스트는 사용자 로컬에서 추가 확인이 필요합니다.

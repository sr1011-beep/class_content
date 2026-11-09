/* ============================================================
   SR Studio · 언어 전환 (한국어 / 일본어 / 영어)
   - 기존 텍스트에 data-i18n 속성을 달아 두고, 이 파일에서 번역합니다.
   - 외부 번역 서버 / API 키가 필요하지 않습니다.
   - localStorage에 마지막으로 고른 언어를 기억합니다.
   - 방문자가 작성한 Todo와 댓글의 '내용'은 번역하지 않습니다.
   ============================================================ */
'use strict';

// 1. 아래 객체는 번역 사전입니다. 원본 문구를 키로 사용합니다.
const TRANSLATIONS = {
  "SR Studio | 백승록의 작업 공간": {
    "ko": "SR Studio | 백승록의 작업 공간",
    "ja": "SR Studio | ペク・スンロクのワークスペース",
    "en": "SR Studio | Seungrok’s Workspace"
  },
  "백승록의 개인 작업 공간 · AI 프로젝트, 할 일 관리, 방명록": {
    "ko": "백승록의 개인 작업 공간 · AI 프로젝트, 할 일 관리, 방명록",
    "ja": "ペク・スンロクの個人ワークスペース・AIプロジェクト、タスク管理、ゲストブック",
    "en": "Seungrok’s personal workspace · AI projects, tasks and guestbook"
  },
  "WORKSPACE": {
    "ko": "작업 공간",
    "ja": "ワークスペース",
    "en": "WORKSPACE"
  },
  "Dashboard": {
    "ko": "대시보드",
    "ja": "ダッシュボード",
    "en": "Dashboard"
  },
  "About Me": {
    "ko": "소개",
    "ja": "自己紹介",
    "en": "About Me"
  },
  "My Tasks": {
    "ko": "할 일 관리",
    "ja": "タスク管理",
    "en": "My Tasks"
  },
  "Projects": {
    "ko": "프로젝트",
    "ja": "プロジェクト",
    "en": "Projects"
  },
  "Guestbook": {
    "ko": "방명록",
    "ja": "ゲストブック",
    "en": "Guestbook"
  },
  "QUICK LINKS": {
    "ko": "바로가기",
    "ja": "クイックリンク",
    "en": "QUICK LINKS"
  },
  "Tech Stack": {
    "ko": "공부 중인 기술",
    "ja": "学習中の技術",
    "en": "Tech Stack"
  },
  "Personal workspace": {
    "ko": "개인 작업 공간",
    "ja": "個人ワークスペース",
    "en": "Personal workspace"
  },
  "Made with curiosity": {
    "ko": "호기심으로 만드는 공간",
    "ja": "好奇心から生まれる空間",
    "en": "Made with curiosity"
  },
  "Welcome back,": {
    "ko": "다시 오신 걸 환영해요,",
    "ja": "おかえりなさい、",
    "en": "Welcome back,"
  },
  "Seungrok!": {
    "ko": "승록!",
    "ja": "スンロク！",
    "en": "Seungrok!"
  },
  "MY PERSONAL WORKSPACE": {
    "ko": "나의 개인 작업 공간",
    "ja": "私のワークスペース",
    "en": "MY PERSONAL WORKSPACE"
  },
  "Studio Space": {
    "ko": "스튜디오 공간",
    "ja": "スタジオスペース",
    "en": "Studio Space"
  },
  "하루의 할 일부터 AI 프로젝트까지, 나만의 작업 공간": {
    "ko": "하루의 할 일부터 AI 프로젝트까지, 나만의 작업 공간",
    "ja": "日々のタスクからAIプロジェクトまで、私だけのワークスペース",
    "en": "My workspace for daily tasks and AI projects."
  },
  "GitHub 방문": {
    "ko": "GitHub 방문",
    "ja": "GitHubを見る",
    "en": "Visit GitHub"
  },
  "Overview": {
    "ko": "전체 보기",
    "ja": "概要",
    "en": "Overview"
  },
  "Task Board": {
    "ko": "작업 보드",
    "ja": "タスクボード",
    "en": "Task Board"
  },
  "PROFILE / 01": {
    "ko": "프로필 / 01",
    "ja": "プロフィール / 01",
    "en": "PROFILE / 01"
  },
  "사진 펼치기": {
    "ko": "사진 펼치기",
    "ja": "写真を表示",
    "en": "Show photo"
  },
  "HELLO, I'M": {
    "ko": "안녕하세요, 저는",
    "ja": "こんにちは、",
    "en": "HELLO, I’M"
  },
  "백승록": {
    "ko": "백승록",
    "ja": "ペク・スンロク",
    "en": "Seungrok Baek"
  },
  "영진전문대 글로벌시스템융합과 1학년": {
    "ko": "영진전문대 글로벌시스템융합과 1학년",
    "ja": "永進専門大学 グローバルシステム融合学科 1年生",
    "en": "First-year student, Global System Convergence, Youngjin University"
  },
  "카메라와 AI 기술을 활용해 강의실의 상태를 알려주는 시스템을 만들고 있습니다.": {
    "ko": "카메라와 AI 기술을 활용해 강의실의 상태를 알려주는 시스템을 만들고 있습니다.",
    "ja": "カメラとAI技術を活用し、教室の状態を把握できるシステムを開発しています。",
    "en": "I’m building a system that uses cameras and AI to monitor classroom conditions."
  },
  "전체 할 일": {
    "ko": "전체 할 일",
    "ja": "すべてのタスク",
    "en": "Total tasks"
  },
  "Total tasks": {
    "ko": "전체 할 일",
    "ja": "全タスク",
    "en": "Total tasks"
  },
  "진행 중": {
    "ko": "진행 중",
    "ja": "進行中",
    "en": "In Progress"
  },
  "In progress": {
    "ko": "진행 중",
    "ja": "進行中",
    "en": "In progress"
  },
  "완료": {
    "ko": "완료",
    "ja": "完了",
    "en": "Completed"
  },
  "Completed tasks": {
    "ko": "완료된 작업",
    "ja": "完了したタスク",
    "en": "Completed tasks"
  },
  "TASK MANAGEMENT": {
    "ko": "할 일 관리",
    "ja": "タスク管理",
    "en": "TASK MANAGEMENT"
  },
  "My Task Board": {
    "ko": "나의 작업 보드",
    "ja": "マイタスクボード",
    "en": "My Task Board"
  },
  "할 일을 추가하고 상태를 바꿔 보세요. 변경 내용은 이 브라우저에 저장됩니다.": {
    "ko": "할 일을 추가하고 상태를 바꿔 보세요. 변경 내용은 이 브라우저에 저장됩니다.",
    "ja": "タスクを追加してステータスを変更できます。変更内容はこのブラウザーに保存されます。",
    "en": "Add tasks and update their status. Changes are saved in this browser."
  },
  "0% 완료": {
    "ko": "0% 완료",
    "ja": "0% 完了",
    "en": "0% complete"
  },
  "할 일": {
    "ko": "할 일",
    "ja": "未着手",
    "en": "To do"
  },
  "Create Task": {
    "ko": "할 일 만들기",
    "ja": "タスクを作成",
    "en": "Create Task"
  },
  "남은 할 일": {
    "ko": "남은 할 일",
    "ja": "残りのタスク",
    "en": "Remaining tasks"
  },
  "개": {
    "ko": "개",
    "ja": "件",
    "en": ""
  },
  "전체 진행률": {
    "ko": "전체 진행률",
    "ja": "全体の進捗",
    "en": "Overall progress"
  },
  "To do": {
    "ko": "할 일",
    "ja": "未着手",
    "en": "To do"
  },
  "In Progress": {
    "ko": "진행 중",
    "ja": "進行中",
    "en": "In Progress"
  },
  "Completed": {
    "ko": "완료",
    "ja": "完了",
    "en": "Completed"
  },
  "Add Task": {
    "ko": "할 일 추가",
    "ja": "タスクを追加",
    "en": "Add Task"
  },
  "GET TO KNOW ME": {
    "ko": "저를 소개합니다",
    "ja": "自己紹介",
    "en": "GET TO KNOW ME"
  },
  "Projects & Skills": {
    "ko": "프로젝트 및 기술",
    "ja": "プロジェクトとスキル",
    "en": "Projects & Skills"
  },
  "현재 진행 중인 프로젝트와 공부하는 기술을 소개합니다.": {
    "ko": "현재 진행 중인 프로젝트와 공부하는 기술을 소개합니다.",
    "ja": "現在進めているプロジェクトや学習中の技術をご紹介します。",
    "en": "Explore my current projects and the technologies I’m learning."
  },
  "Featured Project": {
    "ko": "주요 프로젝트",
    "ja": "注目のプロジェクト",
    "en": "Featured Project"
  },
  "PROJECT / 01": {
    "ko": "프로젝트 / 01",
    "ja": "プロジェクト / 01",
    "en": "PROJECT / 01"
  },
  "ONGOING PROJECT": {
    "ko": "진행 중인 프로젝트",
    "ja": "進行中のプロジェクト",
    "en": "ONGOING PROJECT"
  },
  "Smart Classroom": {
    "ko": "스마트 강의실",
    "ja": "スマート教室",
    "en": "Smart Classroom"
  },
  "실시간 강의실 환경 인식 시스템": {
    "ko": "실시간 강의실 환경 인식 시스템",
    "ja": "リアルタイム教室環境認識システム",
    "en": "Real-time Classroom Environment Recognition System"
  },
  "카메라 영상과 VLM을 활용한 좌석·출입·PC 통합 관리 프로젝트": {
    "ko": "카메라 영상과 VLM을 활용한 좌석·출입·PC 통합 관리 프로젝트",
    "ja": "カメラ映像とVLMを活用した座席・入退室・PCの統合管理プロジェクト",
    "en": "Integrated seat, access, and PC management using camera footage and VLM."
  },
  "301호 PoE 카메라 4대 설치": {
    "ko": "301호 PoE 카메라 4대 설치",
    "ja": "301号室にPoEカメラ4台を設置",
    "en": "Installed four PoE cameras in room 301"
  },
  "304호 강의실 사진 수집 확인": {
    "ko": "304호 강의실 사진 수집 확인",
    "ja": "304号室の教室画像の収集を確認",
    "en": "Verified classroom image collection in room 304"
  },
  "LEARNING NOW": {
    "ko": "현재 공부 중",
    "ja": "現在学習中",
    "en": "LEARNING NOW"
  },
  "지금 배우고 있는 기술들이에요. 각 기술에 마우스를 올려 보세요.": {
    "ko": "지금 배우고 있는 기술들이에요. 각 기술에 마우스를 올려 보세요.",
    "ja": "現在学んでいる技術です。それぞれにカーソルを合わせてみてください。",
    "en": "These are the technologies I’m learning. Hover over each one for details."
  },
  "웹페이지의 구조를 만드는 언어": {
    "ko": "웹페이지의 구조를 만드는 언어",
    "ja": "ウェブページの構造を作る言語",
    "en": "Markup language for webpage structure"
  },
  "웹페이지의 디자인을 담당하는 언어": {
    "ko": "웹페이지의 디자인을 담당하는 언어",
    "ja": "ウェブページの見た目を整える言語",
    "en": "Stylesheet language for webpage design"
  },
  "객체지향 프로그래밍 언어": {
    "ko": "객체지향 프로그래밍 언어",
    "ja": "オブジェクト指向プログラミング言語",
    "en": "Object-oriented programming language"
  },
  "Connect": {
    "ko": "연락처",
    "ja": "お問い合わせ",
    "en": "Connect"
  },
  "SAY HELLO": {
    "ko": "연락하기",
    "ja": "ごあいさつ",
    "en": "SAY HELLO"
  },
  "프로젝트나 코드를 더 보고 싶다면 GitHub를 방문해 주세요.": {
    "ko": "프로젝트나 코드를 더 보고 싶다면 GitHub를 방문해 주세요.",
    "ja": "プロジェクトやコードについて詳しく知りたい方は、GitHubをご覧ください。",
    "en": "Visit my GitHub to explore more projects and code."
  },
  "STAY IN TOUCH": {
    "ko": "방명록",
    "ja": "メッセージをどうぞ",
    "en": "STAY IN TOUCH"
  },
  "LEAVE A MESSAGE": {
    "ko": "메시지 남기기",
    "ja": "メッセージを残す",
    "en": "LEAVE A MESSAGE"
  },
  "방명록에 메시지를 남겨 주세요. 댓글은 Firebase에 저장되어 다른 사람에게도 보여요.": {
    "ko": "방명록에 메시지를 남겨 주세요. 댓글은 Firebase에 저장되어 다른 사람에게도 보여요.",
    "ja": "ゲストブックにメッセージを残してください。コメントはFirebaseに保存され、ほかの訪問者にも公開されます。",
    "en": "Leave a message in the guestbook. Comments are stored in Firebase and visible to other visitors."
  },
  "Ctrl + Enter로 빠르게 등록": {
    "ko": "Ctrl + Enter로 빠르게 등록",
    "ja": "Ctrl + Enterで送信",
    "en": "Press Ctrl + Enter to post"
  },
  "댓글 등록": {
    "ko": "댓글 등록",
    "ja": "コメントを投稿",
    "en": "Post Comment"
  },
  "Messages": {
    "ko": "메시지",
    "ja": "メッセージ",
    "en": "Messages"
  },
  "from visitors": {
    "ko": "방문자들의 글",
    "ja": "訪問者から",
    "en": "from visitors"
  },
  "관리자 로그인": {
    "ko": "관리자 로그인",
    "ja": "管理者ログイン",
    "en": "Admin login"
  },
  "관리자 모드": {
    "ko": "관리자 모드",
    "ja": "管理者モード",
    "en": "Admin mode"
  },
  "로그아웃": {
    "ko": "로그아웃",
    "ja": "ログアウト",
    "en": "Log out"
  },
  "일반 방문자는 본인 댓글만 삭제할 수 있어요. 관리자는 로그인 후 모든 댓글을 관리할 수 있습니다.": {
    "ko": "일반 방문자는 본인 댓글만 삭제할 수 있어요. 관리자는 로그인 후 모든 댓글을 관리할 수 있습니다.",
    "ja": "一般の訪問者が削除できるのは自分のコメントのみです。管理者はログイン後、すべてのコメントを管理できます。",
    "en": "Visitors can delete their own comments. Administrators can manage all comments after logging in."
  },
  "아직 댓글이 없습니다. 첫 메시지를 남겨 보세요!": {
    "ko": "아직 댓글이 없습니다. 첫 메시지를 남겨 보세요!",
    "ja": "まだコメントはありません。最初のメッセージを投稿してみましょう！",
    "en": "No comments yet. Be the first to leave a message!"
  },
  "SR Studio. Made by 백승록.": {
    "ko": "SR Studio. 백승록 제작.",
    "ja": "SR Studio. 制作：ペク・スンロク",
    "en": "SR Studio. Made by Seungrok Baek."
  },
  "Keep learning, keep building. ✳": {
    "ko": "계속 배우고, 계속 만들기. ✳",
    "ja": "学び続け、作り続けよう。✳",
    "en": "Keep learning, keep building. ✳"
  },
  "ADMIN ACCESS": {
    "ko": "관리자 전용",
    "ja": "管理者専用",
    "en": "ADMIN ACCESS"
  },
  "Firebase에 등록한 관리자 계정으로 로그인하면 모든 댓글을 삭제할 수 있습니다.": {
    "ko": "Firebase에 등록한 관리자 계정으로 로그인하면 모든 댓글을 삭제할 수 있습니다.",
    "ja": "Firebaseに登録済みの管理者アカウントでログインすると、すべてのコメントを削除できます。",
    "en": "Sign in with your Firebase admin account to delete any comment."
  },
  "이메일": {
    "ko": "이메일",
    "ja": "メールアドレス",
    "en": "Email"
  },
  "비밀번호": {
    "ko": "비밀번호",
    "ja": "パスワード",
    "en": "Password"
  },
  "로그인": {
    "ko": "로그인",
    "ja": "ログイン",
    "en": "Log in"
  },
  "할 일 검색": {
    "ko": "할 일 검색",
    "ja": "タスクを検索",
    "en": "Search tasks"
  },
  "새로운 할 일": {
    "ko": "새로운 할 일",
    "ja": "新しいタスク",
    "en": "New task"
  },
  "새로운 할 일을 입력하세요": {
    "ko": "새로운 할 일을 입력하세요",
    "ja": "新しいタスクを入力",
    "en": "Enter a new task"
  },
  "추가할 할 일 상태": {
    "ko": "추가할 할 일 상태",
    "ja": "新しいタスクのステータス",
    "en": "Status for new task"
  },
  "할 일 상태로 추가": {
    "ko": "할 일 상태로 추가",
    "ja": "未着手にタスクを追加",
    "en": "Add to To do"
  },
  "진행 중 상태로 추가": {
    "ko": "진행 중 상태로 추가",
    "ja": "進行中にタスクを追加",
    "en": "Add to In Progress"
  },
  "완료 상태로 추가": {
    "ko": "완료 상태로 추가",
    "ja": "完了にタスクを追加",
    "en": "Add to Completed"
  },
  "할 일 목록": {
    "ko": "할 일 목록",
    "ja": "未着手の一覧",
    "en": "To-do list"
  },
  "진행 중 목록": {
    "ko": "진행 중 목록",
    "ja": "進行中の一覧",
    "en": "In-progress list"
  },
  "완료 목록": {
    "ko": "완료 목록",
    "ja": "完了したタスク一覧",
    "en": "Completed list"
  },
  "작업 현황": {
    "ko": "작업 현황",
    "ja": "タスクの状況",
    "en": "Task status"
  },
  "전체 완료율": {
    "ko": "전체 완료율",
    "ja": "全体の完了率",
    "en": "Overall completion rate"
  },
  "작업 상태별 목록": {
    "ko": "작업 상태별 목록",
    "ja": "ステータス別タスク一覧",
    "en": "Task board by status"
  },
  "페이지 내 이동": {
    "ko": "페이지 내 이동",
    "ja": "ページ内ナビゲーション",
    "en": "Page navigation"
  },
  "메인 메뉴": {
    "ko": "메인 메뉴",
    "ja": "メインメニュー",
    "en": "Main menu"
  },
  "바로가기": {
    "ko": "바로가기",
    "ja": "クイックリンク",
    "en": "Quick links"
  },
  "SR Studio 홈": {
    "ko": "SR Studio 홈",
    "ja": "SR Studio ホーム",
    "en": "SR Studio home"
  },
  "작업 공간 탐색": {
    "ko": "작업 공간 탐색",
    "ja": "ワークスペースのナビゲーション",
    "en": "Workspace navigation"
  },
  "자기소개로 이동": {
    "ko": "자기소개로 이동",
    "ja": "自己紹介へ移動",
    "en": "Go to About Me"
  },
  "프로필 사진": {
    "ko": "프로필 사진",
    "ja": "プロフィール写真",
    "en": "Profile photo"
  },
  "클릭하면 사진 접기": {
    "ko": "클릭하면 사진 접기",
    "ja": "クリックして写真を折りたたむ",
    "en": "Click to hide photo"
  },
  "프로필 사진 다시 펼치기": {
    "ko": "프로필 사진 다시 펼치기",
    "ja": "プロフィール写真を再表示",
    "en": "Show profile photo"
  },
  "닉네임": {
    "ko": "닉네임",
    "ja": "ニックネーム",
    "en": "Nickname"
  },
  "닉네임 (선택)": {
    "ko": "닉네임 (선택)",
    "ja": "ニックネーム（任意）",
    "en": "Nickname (optional)"
  },
  "댓글 내용": {
    "ko": "댓글 내용",
    "ja": "コメント内容",
    "en": "Comment text"
  },
  "댓글 목록": {
    "ko": "댓글 목록",
    "ja": "コメント一覧",
    "en": "Comment list"
  },
  "메시지를 입력해 주세요...": {
    "ko": "메시지를 입력해 주세요...",
    "ja": "メッセージを入力してください…",
    "en": "Write your message..."
  },
  "관리자 이메일": {
    "ko": "관리자 이메일",
    "ja": "管理者メールアドレス",
    "en": "Admin email"
  },
  "창 닫기": {
    "ko": "창 닫기",
    "ja": "閉じる",
    "en": "Close dialog"
  },
  "메뉴 열기": {
    "ko": "메뉴 열기",
    "ja": "メニューを開く",
    "en": "Open menu"
  },
  "페이지 도구": {
    "ko": "페이지 도구",
    "ja": "ページツール",
    "en": "Page tools"
  },
  "맨 위로": {
    "ko": "맨 위로",
    "ja": "ページの先頭へ",
    "en": "Back to top"
  },
  "맨 아래로": {
    "ko": "맨 아래로",
    "ja": "ページの最後へ",
    "en": "Go to bottom"
  },
  "다크모드 전환": {
    "ko": "다크모드 전환",
    "ja": "ダークモードに切り替え",
    "en": "Switch to dark mode"
  },
  "라이트모드로 전환": {
    "ko": "라이트모드로 전환",
    "ja": "ライトモードに切り替え",
    "en": "Switch to light mode"
  },
  "댓글 관리": {
    "ko": "댓글 관리",
    "ja": "コメント管理",
    "en": "Manage comments"
  },
  "언어 선택": {
    "ko": "언어 선택",
    "ja": "言語を選択",
    "en": "Choose language"
  },
  "한국어": {
    "ko": "한국어",
    "ja": "韓国語",
    "en": "Korean"
  },
  "日本語": {
    "ko": "일본어",
    "ja": "日本語",
    "en": "Japanese"
  },
  "English": {
    "ko": "영어",
    "ja": "英語",
    "en": "English"
  },
  "LANGUAGE": {
    "ko": "언어",
    "ja": "言語",
    "en": "LANGUAGE"
  },
  "다른 열로 끌어 놓으면 상태를 변경할 수 있어요": {
    "ko": "다른 열로 끌어 놓으면 상태를 변경할 수 있어요",
    "ja": "ほかの列にドラッグするとステータスを変更できます",
    "en": "Drag to another column to change status"
  },
  " 완료 여부": {
    "ko": " 완료 여부",
    "ja": "の完了状態",
    "en": " completion status"
  },
  " 상태 변경": {
    "ko": " 상태 변경",
    "ja": "のステータスを変更",
    "en": " change status"
  },
  " 삭제": {
    "ko": " 삭제",
    "ja": "を削除",
    "en": " delete"
  },
  "PERSONAL TASK": {
    "ko": "개인 할 일",
    "ja": "個人タスク",
    "en": "PERSONAL TASK"
  },
  "% completed": {
    "ko": "% 완료",
    "ja": "% 完了",
    "en": "% complete"
  },
  "% 완료": {
    "ko": "% 완료",
    "ja": "% 完了",
    "en": "% complete"
  },
  "검색 결과가 없습니다": {
    "ko": "검색 결과가 없습니다",
    "ja": "検索結果がありません",
    "en": "No matching tasks"
  },
  "완료한 작업이 이곳에 표시돼요": {
    "ko": "완료한 작업이 이곳에 표시돼요",
    "ja": "完了したタスクがここに表示されます",
    "en": "Completed tasks will appear here"
  },
  "여기에 작업을 추가해 보세요": {
    "ko": "여기에 작업을 추가해 보세요",
    "ja": "ここにタスクを追加してみましょう",
    "en": "Add a task here"
  },
  "클릭하면 프로필 접기": {
    "ko": "클릭하면 프로필 접기",
    "ja": "クリックしてプロフィールを閉じる",
    "en": "Click to collapse profile"
  },
  "클릭하면 카드 내용을 접거나 펼칩니다": {
    "ko": "클릭하면 카드 내용을 접거나 펼칩니다",
    "ja": "クリックしてカードを開閉します",
    "en": "Click to expand or collapse card"
  },
  "브라우저 저장 공간에 접근할 수 없습니다. 저장 설정을 확인해 주세요.": {
    "ko": "브라우저 저장 공간에 접근할 수 없습니다. 저장 설정을 확인해 주세요.",
    "ja": "ブラウザーの保存領域にアクセスできません。設定を確認してください。",
    "en": "Cannot access browser storage. Check your settings."
  },
  "익명": {
    "ko": "익명",
    "ja": "匿名",
    "en": "Anonymous"
  },
  "방금 전": {
    "ko": "방금 전",
    "ja": "たった今",
    "en": "Just now"
  },
  "삭제": {
    "ko": "삭제",
    "ja": "削除",
    "en": "Delete"
  },
  "관리자 권한으로 댓글 삭제": {
    "ko": "관리자 권한으로 댓글 삭제",
    "ja": "管理者権限でコメントを削除",
    "en": "Delete comment as admin"
  },
  "내가 작성한 댓글 삭제": {
    "ko": "내가 작성한 댓글 삭제",
    "ja": "自分のコメントを削除",
    "en": "Delete my comment"
  },
  "댓글 삭제": {
    "ko": "댓글 삭제",
    "ja": "コメントを削除",
    "en": "Delete comment"
  },
  "내 댓글 삭제": {
    "ko": "내 댓글 삭제",
    "ja": "自分のコメントを削除",
    "en": "Delete my comment"
  },
  "Firebase 연결 중입니다. 잠시 후 다시 시도해 주세요.": {
    "ko": "Firebase 연결 중입니다. 잠시 후 다시 시도해 주세요.",
    "ja": "Firebaseに接続中です。しばらくしてからもう一度お試しください。",
    "en": "Connecting to Firebase. Please try again shortly."
  },
  "댓글 저장에 실패했습니다. Firebase 권한을 확인해 주세요.": {
    "ko": "댓글 저장에 실패했습니다. Firebase 권한을 확인해 주세요.",
    "ja": "コメントの保存に失敗しました。Firebaseのアクセス権限を確認してください。",
    "en": "Could not save comment. Check Firebase permissions."
  },
  "이 댓글을 삭제할까요? 삭제 후에는 되돌릴 수 없습니다.": {
    "ko": "이 댓글을 삭제할까요? 삭제 후에는 되돌릴 수 없습니다.",
    "ja": "このコメントを削除しますか？削除後は元に戻せません。",
    "en": "Delete this comment? This cannot be undone."
  },
  "Firebase 연결 중입니다. 다시 시도해 주세요.": {
    "ko": "Firebase 연결 중입니다. 다시 시도해 주세요.",
    "ja": "Firebaseに接続中です。もう一度お試しください。",
    "en": "Connecting to Firebase. Please try again."
  },
  "댓글을 삭제할 수 없습니다. Firebase 보안 규칙을 확인해 주세요.": {
    "ko": "댓글을 삭제할 수 없습니다. Firebase 보안 규칙을 확인해 주세요.",
    "ja": "コメントを削除できません。Firebaseのセキュリティルールを確認してください。",
    "en": "Cannot delete comment. Check Firebase security rules."
  },
  "등록된 관리자 계정이 아닙니다. UID 설정을 확인하세요.": {
    "ko": "등록된 관리자 계정이 아닙니다. UID 설정을 확인하세요.",
    "ja": "登録されている管理者アカウントではありません。UIDの設定を確認してください。",
    "en": "This is not the configured admin account. Check the UID setting."
  },
  "로그인할 수 없습니다. 이메일·비밀번호·Firebase 인증 설정을 확인해 주세요.": {
    "ko": "로그인할 수 없습니다. 이메일·비밀번호·Firebase 인증 설정을 확인해 주세요.",
    "ja": "ログインできません。メールアドレス、パスワード、Firebaseの認証設定を確認してください。",
    "en": "Cannot sign in. Check email, password, and Firebase Authentication settings."
  },
  "인증 전환에 실패했습니다. 페이지를 새로고침해 주세요.": {
    "ko": "인증 전환에 실패했습니다. 페이지를 새로고침해 주세요.",
    "ja": "認証の切り替えに失敗しました。ページを更新してください。",
    "en": "Could not switch authentication. Refresh the page."
  },
  "댓글을 불러올 수 없습니다. Firestore 보안 규칙을 확인해 주세요.": {
    "ko": "댓글을 불러올 수 없습니다. Firestore 보안 규칙을 확인해 주세요.",
    "ja": "コメントを読み込めません。Firestoreのセキュリティルールを確認してください。",
    "en": "Cannot load comments. Check Firestore security rules."
  }
};
const LANGUAGE_STORAGE_KEY = 'sr-studio-language';
const AVAILABLE_LANGUAGES = ['ko', 'ja', 'en'];

// 2. localStorage에는 'ko', 'ja', 'en' 중 한 값을 저장합니다.
let language = 'ko';
try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (AVAILABLE_LANGUAGES.includes(stored)) language = stored;
} catch (error) { /* 저장 공간을 사용할 수 없어도 웹사이트는 작동합니다. */ }

// 3. t()는 번역 사전에서 현재 언어에 해당하는 문장을 반환합니다.
//    번역이 없다면 전달된 원문을 그대로 보여 줍니다.
function t(key) {
    const item = TRANSLATIONS[key];
    return item ? item[language] : key;
}

// 4. HTML에 data-i18n 속성이 있으면 그 요소의 텍스트를 교체합니다.
//    placeholder, aria-label 같은 속성도 별도로 처리합니다.
function translatePage() {
    document.documentElement.lang = language;
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
        el.textContent = t(el.dataset.i18n);
    });
    ['placeholder','aria-label','title','alt','content'].forEach(function(attribute) {
        document.querySelectorAll('[data-i18n-' + attribute + ']').forEach(function(el) {
            el.setAttribute(attribute, t(el.getAttribute('data-i18n-' + attribute)));
        });
    });
    // 윈도우 탭에 표시되는 제목도 변경합니다.
    const title = document.querySelector('title[data-i18n]');
    if (title) document.title = t(title.dataset.i18n);
}

// 5. 새 언어를 선택하면 화면·저장 공간·추가 렌더링 함수를 모두 갱신합니다.
function setLanguage(next) {
    if (!AVAILABLE_LANGUAGES.includes(next)) return;
    language = next;
    try { localStorage.setItem(LANGUAGE_STORAGE_KEY, language); } catch (error) {}
    translatePage();
    document.getElementById('languageSelect').value = next;
    // scripts.js 및 firebase.js는 이 이벤트를 받아 동적 카드/댓글 UI를 번역합니다.
    document.dispatchEvent(new CustomEvent('sr-language-change', {detail: {language: next}}));
}

// 6. 다른 JavaScript 파일에서 번역 함수를 사용할 수 있도록 window에 노출합니다.
window.SR_I18N = { t, getLanguage: () => language, setLanguage };

// 7. 언어 선택 상자에 변경 이벤트를 등록하고 최초 번역을 적용합니다.
const languageSelect = document.getElementById('languageSelect');
languageSelect.value = language;
languageSelect.addEventListener('change', function() { setLanguage(languageSelect.value); });
translatePage();

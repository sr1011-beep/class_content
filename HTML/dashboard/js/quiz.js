/* ========================================================
   JLPT N2 수준 단어 퀴즈: 매일 10문제 / 4지선다 / 채점 / 저장
   - 서버 및 API 키 불필요: GitHub Pages에서도 바로 실행
   - 정답을 고른 후 읽는 법과 뜻 확인
   - 날짜마다 10문제 교체, 오늘의 학습 기록 localStorage 저장
   - JLPT 공식 문제나 공식 단어 목록은 아닙니다.
======================================================== */
(function () {
    "use strict";

    // 문제은행 각 행: [단어, 읽는 법, 한국어 뜻, 품사]
    // 오답은 같은 품사에서 선택하여 문제 난이도를 일정하게 유지합니다.
    const WORDS = [
        ["見積もり", "みつもり", "견적", "명사"],
        ["工員", "こういん", "공장 근로자", "명사"],
        ["事情", "じじょう", "사정", "명사"],
        ["影響", "えいきょう", "영향", "명사"],
        ["需要", "じゅよう", "수요", "명사"],
        ["供給", "きょうきゅう", "공급", "명사"],
        ["傾向", "けいこう", "경향", "명사"],
        ["目的", "もくてき", "목적", "명사"],
        ["手段", "しゅだん", "수단", "명사"],
        ["現象", "げんしょう", "현상", "명사"],
        ["状況", "じょうきょう", "상황", "명사"],
        ["対策", "たいさく", "대책", "명사"],
        ["方針", "ほうしん", "방침", "명사"],
        ["程度", "ていど", "정도", "명사"],
        ["基準", "きじゅん", "기준", "명사"],
        ["制度", "せいど", "제도", "명사"],
        ["範囲", "はんい", "범위", "명사"],
        ["手続き", "てつづき", "절차", "명사"],
        ["余裕", "よゆう", "여유", "명사"],
        ["効率", "こうりつ", "효율", "명사"],
        ["責任", "せきにん", "책임", "명사"],
        ["費用", "ひよう", "비용", "명사"],
        ["予算", "よさん", "예산", "명사"],
        ["負担", "ふたん", "부담", "명사"],
        ["順序", "じゅんじょ", "순서", "명사"],
        ["機会", "きかい", "기회", "명사"],
        ["条件", "じょうけん", "조건", "명사"],
        ["提案", "ていあん", "제안", "명사"],
        ["証拠", "しょうこ", "증거", "명사"],
        ["原因", "げんいん", "원인", "명사"],
        ["結果", "けっか", "결과", "명사"],
        ["計画", "けいかく", "계획", "명사"],
        ["予測", "よそく", "예측", "명사"],
        ["希望", "きぼう", "희망", "명사"],
        ["対象", "たいしょう", "대상", "명사"],
        ["可能性", "かのうせい", "가능성", "명사"],
        ["価値", "かち", "가치", "명사"],
        ["印象", "いんしょう", "인상", "명사"],
        ["努力", "どりょく", "노력", "명사"],
        ["判断", "はんだん", "판단", "명사"],
        ["連絡", "れんらく", "연락", "명사"],
        ["交通", "こうつう", "교통", "명사"],
        ["道徳", "どうとく", "도덕", "명사"],
        ["機能", "きのう", "기능", "명사"],
        ["構造", "こうぞう", "구조", "명사"],
        ["環境", "かんきょう", "환경", "명사"],
        ["資格", "しかく", "자격", "명사"],
        ["違反", "いはん", "위반", "명사"],
        ["誤解", "ごかい", "오해", "명사"],
        ["改善", "かいぜん", "개선", "명사"],
        ["維持", "いじ", "유지", "명사"],
        ["変化", "へんか", "변화", "명사"],
        ["成長", "せいちょう", "성장", "명사"],
        ["疑問", "ぎもん", "의문", "명사"],
        ["工夫", "くふう", "궁리", "명사"],
        ["準備", "じゅんび", "준비", "명사"],
        ["支援", "しえん", "지원", "명사"],
        ["収入", "しゅうにゅう", "수입", "명사"],
        ["支出", "ししゅつ", "지출", "명사"],
        ["内容", "ないよう", "내용", "명사"],
        ["一致", "いっち", "일치", "명사"],
        ["割合", "わりあい", "비율", "명사"],
        ["利益", "りえき", "이익", "명사"],
        ["能力", "のうりょく", "능력", "명사"],
        ["講義", "こうぎ", "강의", "명사"],
        ["経験", "けいけん", "경험", "명사"],
        ["公害", "こうがい", "공해", "명사"],
        ["近所", "きんじょ", "근처", "명사"],
        ["実績", "じっせき", "실적", "명사"],
        ["技術", "ぎじゅつ", "기술", "명사"],
        ["怠ける", "なまける", "게으름 피우다", "동사"],
        ["応じる", "おうじる", "응하다", "동사"],
        ["防ぐ", "ふせぐ", "막다", "동사"],
        ["断る", "ことわる", "거절하다", "동사"],
        ["補う", "おぎなう", "보충하다", "동사"],
        ["省く", "はぶく", "생략하다", "동사"],
        ["抑える", "おさえる", "억제하다", "동사"],
        ["及ぼす", "およぼす", "영향을 미치다", "동사"],
        ["備える", "そなえる", "대비하다", "동사"],
        ["属する", "ぞくする", "속하다", "동사"],
        ["遂げる", "とげる", "이루다", "동사"],
        ["取り扱う", "とりあつかう", "취급하다", "동사"],
        ["振り込む", "ふりこむ", "송금하다", "동사"],
        ["乗り越える", "のりこえる", "극복하다", "동사"],
        ["引き受ける", "ひきうける", "떠맡다", "동사"],
        ["遡る", "さかのぼる", "거슬러 올라가다", "동사"],
        ["徹底する", "てっていする", "철저히 하다", "동사"],
        ["促す", "うながす", "촉구하다", "동사"],
        ["受け取る", "うけとる", "받다", "동사"],
        ["見込む", "みこむ", "예상하다", "동사"],
        ["生じる", "しょうじる", "발생하다", "동사"],
        ["削る", "けずる", "깎다", "동사"],
        ["得る", "える", "얻다", "동사"],
        ["取り組む", "とりくむ", "몰두하다", "동사"],
        ["追い付く", "おいつく", "따라잡다", "동사"],
        ["認める", "みとめる", "인정하다", "동사"],
        ["失う", "うしなう", "잃다", "동사"],
        ["進める", "すすめる", "진행시키다", "동사"],
        ["退く", "しりぞく", "물러나다", "동사"],
        ["目指す", "めざす", "목표로 하다", "동사"]
    ];

    const QUIZ_SIZE = 10;
    const THEME_STORAGE_KEY = "mypage_theme_v1";
    const $ = (id) => document.getElementById(id);

    // 로컬 날짜를 기준으로 오늘의 YYYY-MM-DD를 반환합니다.
    function todayKey() {
        const date = new Date();
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    }

    // 날짜를 일련번호로 만들어 날마다 다음 10문제 묶음을 선택합니다.
    function dayNumber(key) {
        const [year, month, day] = key.split("-").map(Number);
        return Math.floor(Date.UTC(year, month - 1, day) / 86400000);
    }

    // 동일한 문자열에는 항상 동일한 시드가 나오도록 만듭니다.
    function hashString(value) {
        let hash = 2166136261;
        for (let i = 0; i < value.length; i += 1) {
            hash ^= value.charCodeAt(i);
            hash = Math.imul(hash, 16777619);
        }
        return hash >>> 0;
    }

    // Math.random() 대신 날짜를 입력받는 시드 기반 난수 발생기를 사용합니다.
    // 그래서 새로고침하더라도 같은 날에는 문제/보기 순서가 바뀌지 않습니다.
    function makeRandom(seed) {
        return function () {
            let t = (seed += 0x6D2B79F5);
            t = Math.imul(t ^ (t >>> 15), t | 1);
            t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    }

    // Fisher–Yates 셔플: 입력 배열을 복사해 순서를 섞습니다.
    function shuffle(items, seed) {
        const result = [...items];
        const random = makeRandom(seed);
        for (let i = result.length - 1; i > 0; i -= 1) {
            const j = Math.floor(random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }

    const activeDate = todayKey();
    const storageKey = `mypage_n2_quiz_v1_${activeDate}`;

    // 100개의 문제를 10문제씩 나누어 10일 동안 중복되지 않게 순환합니다.
    const bank = shuffle(WORDS, hashString("mypage-n2-bank-v1"));
    const numberOfGroups = Math.floor(bank.length / QUIZ_SIZE);
    const groupIndex = dayNumber(activeDate) % numberOfGroups;
    const todaysWords = shuffle(
        bank.slice(groupIndex * QUIZ_SIZE, (groupIndex + 1) * QUIZ_SIZE),
        hashString(activeDate)
    );

    // 각 문제마다 같은 품사에서 서로 다른 뜻 세 개를 뽑아 4지선다를 만듭니다.
    function optionsFor(word) {
        const others = WORDS.filter((candidate) =>
            candidate[3] === word[3] && candidate[2] !== word[2]
        ).map((item) => item[2]);
        const shuffledOthers = shuffle([...new Set(others)], hashString(`${activeDate}:${word[0]}:distractors`));
        return shuffle([word[2], ...shuffledOthers.slice(0, 3)], hashString(`${activeDate}:${word[0]}:options`));
    }

    // 하루 동안 푼 문제와 사용자가 고른 답을 localStorage에서 복원합니다.
    function loadAnswers() {
        try {
            const stored = JSON.parse(localStorage.getItem(storageKey) || "{}");
            return stored && typeof stored === "object" && !Array.isArray(stored) ? stored : {};
        } catch (error) {
            console.warn("퀴즈 진도 복원 실패:", error);
            return {};
        }
    }
    let answers = loadAnswers();

    function saveAnswers() {
        try {
            // 오늘 퀴즈 진도는 기존 저장 키를 그대로 사용해 이전 답변을 보존합니다.
            localStorage.setItem(storageKey, JSON.stringify(answers));
        } catch (error) {
            console.warn("퀴즈 진도 저장 실패:", error);
        }
    }

    // 반복해서 사용하는 DOM 요소 생성 함수: 사용자 데이터도 안전하게 textContent로 출력합니다.
    function element(tag, className, content) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (content !== undefined) node.textContent = content;
        return node;
    }

    // 점수, 진도, 진행률 막대를 업데이트합니다.
    function updateHeader() {
        const answered = todaysWords.filter((word) => Object.hasOwn(answers, word[0]));
        const correct = answered.filter((word) => answers[word[0]] === word[2]).length;
        $("quizProgressText").textContent = `완료 ${answered.length} / ${QUIZ_SIZE}문제`;
        $("quizScore").textContent = `${correct} / ${QUIZ_SIZE} 정답`;
        $("quizProgressBar").style.width = `${(answered.length / QUIZ_SIZE) * 100}%`;
    }

    // 특정 문제를 출력합니다. 이미 답한 문제라면 정답과 해설을 표시합니다.
    function renderQuestion(index) {
        const word = todaysWords[index];
        const stage = $("quizStage");
        stage.replaceChildren();
        const answered = Object.hasOwn(answers, word[0]);

        stage.appendChild(element("div", "quiz-word", word[0]));
        stage.appendChild(element("p", "quiz-instruction", "위 일본어 단어의 뜻으로 알맞은 것을 고르세요."));

        const options = element("div", "quiz-options");
        optionsFor(word).forEach((meaning, choiceIndex) => {
            const button = element("button", "quiz-option", `${choiceIndex + 1}. ${meaning}`);
            button.type = "button";
            if (answered) {
                button.disabled = true;
                if (meaning === word[2]) button.classList.add("correct");
                else if (meaning === answers[word[0]]) button.classList.add("incorrect");
            } else {
                button.addEventListener("click", () => {
                    // 첫 번째 응답만 기록해 중복 클릭으로 점수가 바뀌지 않게 합니다.
                    if (Object.hasOwn(answers, word[0])) return;
                    answers[word[0]] = meaning;
                    saveAnswers();
                    updateHeader();
                    renderQuestion(index); // 정답 공개 및 다음 문제 버튼 표시
                });
            }
            options.appendChild(button);
        });
        stage.appendChild(options);

        if (answered) {
            const isCorrect = answers[word[0]] === word[2];
            const feedback = element("div", "quiz-feedback");
            feedback.appendChild(element("strong", "", isCorrect ? "✅ 정답이에요!" : "✏️ 정답을 확인해 보세요."));
            feedback.appendChild(element("p", "", `읽는 법: ${word[1]}`));
            feedback.appendChild(element("p", "", `정답: ${word[2]}`));
            if (!isCorrect) feedback.appendChild(element("p", "", `선택한 답: ${answers[word[0]]}`));
            stage.appendChild(feedback);
            const next = element("button", "primary-btn quiz-next", index === QUIZ_SIZE - 1 ? "결과 확인 →" : "다음 문제 →");
            next.type = "button";
            next.addEventListener("click", renderQuiz);
            stage.appendChild(next);
        }
    }

    // 10문제를 모두 풀면 전체 점수와 오답 내용을 요약합니다.
    function renderResult() {
        const stage = $("quizStage");
        stage.replaceChildren();
        const correct = todaysWords.filter((word) => answers[word[0]] === word[2]).length;
        stage.appendChild(element("h2", "quiz-result-title", "오늘의 퀴즈 완료! 🎉"));
        stage.appendChild(element("p", "quiz-result-score", `${correct} / ${QUIZ_SIZE} 정답`));
        stage.appendChild(element("p", "quiz-instruction", "내일은 새로운 10문제가 열려요. 오늘 배운 단어를 복습해 보세요."));
        const review = element("ul", "quiz-review-list");
        todaysWords.forEach((word) => {
            const isCorrect = answers[word[0]] === word[2];
            const item = element("li");
            item.appendChild(element("strong", "", `${isCorrect ? "✓" : "✕"} ${word[0]}（${word[1]}）`));
            item.appendChild(element("small", "", `정답: ${word[2]}${isCorrect ? "" : ` / 내 답: ${answers[word[0]]}`}`));
            review.appendChild(item);
        });
        stage.appendChild(review);
    }

    // 이어 풀기: 답하지 않은 첫 문제부터 시작합니다.
    function renderQuiz() {
        updateHeader();
        const nextIndex = todaysWords.findIndex((word) => !Object.hasOwn(answers, word[0]));
        if (nextIndex === -1) renderResult();
        else renderQuestion(nextIndex);
    }

    /* -------------------------
       기존 페이지의 다크모드 상태 연동
    ------------------------- */
    function applyTheme() {
        const isDark = localStorage.getItem(THEME_STORAGE_KEY) === "dark";
        document.body.classList.toggle("dark", isDark);
        $("quizThemeBtn").textContent = isDark ? "☀️" : "🌙";
    }
    $("quizThemeBtn").addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark");
        $("quizThemeBtn").textContent = isDark ? "☀️" : "🌙";
        try {
            localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
        } catch (error) { console.warn("테마 저장 실패:", error); }
    });

    // 초기화 및 날짜가 자정을 넘겼을 때 새 문제로 갱신
    $("quizDate").textContent = `${activeDate} · 오늘의 10문제`;
    applyTheme();
    renderQuiz();
    setInterval(() => {
        if (todayKey() !== activeDate) window.location.reload();
    }, 60000);
})();

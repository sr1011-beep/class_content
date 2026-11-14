/* =========================
   SR Studio · Todo + localStorage
   이전 데이터 {id, text, completed}를
   새 데이터 {id, text, status, completed}로 안전하게 변환합니다.
========================= */
/* 'use strict'는 잘못된 변수 사용 같은 실수를 더 엄격하게 검사합니다. */
'use strict';

/*
   1) 기본 설정
   localStorage는 이 브라우저에 데이터를 저장하는 공간입니다.
   'todos'는 데이터를 꺼낼 때 사용하는 키(이름)입니다. 기존 키를 그대로 써서 예전 할 일이 보입니다.
   status의 가능한 값은 todo(할 일), progress(진행 중), done(완료) 세 가지입니다.
*/
// i18n.js의 번역 함수를 쓰는 헬퍼입니다. 키가 없으면 원래 글자를 그대로 보여줍니다.
const tr = (text) => window.SR_I18N ? window.SR_I18N.t(text) : text;
const currentLang = () => window.SR_I18N ? window.SR_I18N.getLanguage() : 'ko';
const TODO_STORAGE_KEY = 'todos'; // 기존 저장 키 유지: 예전 할 일이 사라지지 않게 함
const VALID_STATUSES = ['todo', 'progress', 'done'];
const STATUS_TEXT = { todo: '할 일', progress: '진행 중', done: '완료' };
const STATUS_PERCENT = { todo: 0, progress: 50, done: 100 };

/*
   2) localStorage에서 할 일 읽기
   getItem('todos')는 저장된 문자열을 가져옵니다.
   JSON.parse()는 문자열을 다시 JavaScript 배열/객체로 바꿉니다.
   예전 데이터에 status가 없다면 completed 값을 보고 새 상태를 정합니다.
*/
function loadTodos() {
    let saved;
    try {
        saved = JSON.parse(localStorage.getItem(TODO_STORAGE_KEY) || '[]');
    } catch (error) {
        console.warn('저장된 할 일을 읽을 수 없어 빈 목록으로 시작합니다.', error);
        return [];
    }
    // 데이터가 배열이 아니면 잘못 저장된 것으로 보고 빈 배열을 반환합니다.
    if (!Array.isArray(saved)) return [];

    // 기존의 completed 값을 확인해서 새 status 속성을 만듭니다.
    let highestId = saved.reduce(function(max, item) {
        const id = Number(item && item.id);
        return Number.isSafeInteger(id) && id > max ? id : max;
    }, 0);
    // Set은 중복을 허용하지 않는 자료형입니다. 같은 ID가 두 번 사용되지 않도록 검사합니다.
    const usedIds = new Set();
    // filter(): 조건에 맞는 할 일만 남깁니다. 여기서는 text가 문자열인 항목만 선택합니다.
    // map(): 남은 항목 각각을 새 데이터 형태로 바꿉니다.
    return saved.filter(function(item) {
        return item && typeof item.text === 'string';
    }).map(function(item) {
        let id = Number(item.id);
        if (!Number.isSafeInteger(id) || id <= 0 || usedIds.has(id)) id = ++highestId;
        usedIds.add(id);

        let status = VALID_STATUSES.includes(item.status)
            ? item.status
            : (item.completed ? 'done' : 'todo');

        return {
            id: id,
            text: item.text,
            status: status,
            completed: status === 'done' // 예전 코드와의 호환도 유지
        };
    });
}

/* 할 일 목록을 담는 배열입니다. 예: [{id:1, text:'공부', status:'todo', completed:false}] */
let todos = loadTodos();
// 새 할 일의 ID가 기존 항목과 겹치지 않도록 가장 큰 ID + 1을 구합니다.
let nextId = todos.reduce(function(maxId, todo) {
    return Math.max(maxId, todo.id);
}, 0) + 1;

/*
   3) 저장하기
   JSON.stringify(todos)는 JavaScript 배열을 문자열로 바꿉니다.
   localStorage.setItem(키, 값)은 브라우저에 그 문자열을 저장합니다.
*/
function saveTodos() {
    try {
        localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
        console.error('할 일 저장 실패:', error);
        alert(tr('브라우저 저장 공간에 접근할 수 없습니다. 저장 설정을 확인해 주세요.'));
    }
}

/*
   4) 상태 변경하기 (할 일 → 진행 중 → 완료)
   카드를 이동하거나 드롭다운/체크박스를 사용할 때 호출됩니다.
   상태를 바꾼 뒤 반드시 saveTodos()로 저장하고 renderTodos()로 화면을 새로 그립니다.
*/
function changeTodoStatus(todo, status) {
    if (!VALID_STATUSES.includes(status)) return;
    todo.status = status;
    todo.completed = status === 'done';
    saveTodos();
    renderTodos();
}

/*
   5) 할 일 카드 1개 만들기
   HTML에 카드가 미리 존재하지 않습니다. document.createElement()로 태그를 새로 만듭니다.
   li(목록 항목) 안에 라벨, 체크박스, 제목, 상태 메뉴, 삭제 버튼 등을 넣어 반환합니다.
*/
function createTaskCard(todo) {
    const li = document.createElement('li');
    li.className = 'task-card';
    // draggable=true로 브라우저에서 카드를 마우스로 끌 수 있게 만듭니다.
    li.draggable = true;
    li.dataset.id = String(todo.id);

    const head = document.createElement('div');
    head.className = 'task-card-head';
    const label = document.createElement('span');
    label.className = 'task-label';
    label.textContent = tr('PERSONAL TASK');
    const dragHint = document.createElement('span');
    dragHint.className = 'task-drag-hint';
    dragHint.textContent = '⠿';
    dragHint.title = tr('다른 열로 끌어 놓으면 상태를 변경할 수 있어요');
    head.append(label, dragHint);

    const main = document.createElement('div');
    main.className = 'task-main';
    // 체크박스를 클릭하면 상태가 완료(done) 또는 할 일(todo)로 바뀝니다.
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.status === 'done';
    checkbox.setAttribute('aria-label', todo.text + tr(' 완료 여부'));
    checkbox.addEventListener('change', function() {
        changeTodoStatus(todo, checkbox.checked ? 'done' : 'todo');
    });
    // textContent는 HTML 태그를 실행하지 않고 글자로만 넣는 안전한 방법입니다.
    const text = document.createElement('span');
    text.className = 'task-title';
    text.textContent = todo.text; // 입력값을 HTML로 해석하지 않음
    if (todo.status === 'done') text.classList.add('done');
    main.append(checkbox, text);

    const progress = document.createElement('div');
    progress.className = 'task-progress-line';
    const progressCaption = document.createElement('div');
    progressCaption.className = 'task-progress-caption';
    const progressLabel = document.createElement('span');
    progressLabel.textContent = tr(STATUS_TEXT[todo.status]);
    const progressValue = document.createElement('strong');
    progressValue.textContent = STATUS_PERCENT[todo.status] + tr('% completed');
    progressCaption.append(progressLabel, progressValue);
    const track = document.createElement('div');
    track.className = 'task-mini-track';
    const fill = document.createElement('div');
    fill.className = 'task-mini-fill';
    fill.style.width = STATUS_PERCENT[todo.status] + '%';
    track.appendChild(fill);
    progress.append(progressCaption, track);

    const foot = document.createElement('div');
    foot.className = 'task-card-foot';
    // select는 상태를 직접 고르는 드롭다운 메뉴입니다.
    const select = document.createElement('select');
    select.className = 'task-status-select';
    select.setAttribute('aria-label', todo.text + tr(' 상태 변경'));
    VALID_STATUSES.forEach(function(status) {
        const option = document.createElement('option');
        option.value = status;
        option.textContent = tr(STATUS_TEXT[status]);
        select.appendChild(option);
    });
    select.value = todo.status;
    select.addEventListener('change', function() {
        changeTodoStatus(todo, select.value);
    });
    // × 버튼을 누르면 filter()로 해당 id를 제외하고 다시 저장합니다.
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = '×';
    deleteButton.className = 'delete-btn';
    deleteButton.setAttribute('aria-label', todo.text + tr(' 삭제'));
    deleteButton.addEventListener('click', function() {
        todos = todos.filter(function(item) { return item.id !== todo.id; });
        saveTodos();
        renderTodos();
    });
    foot.append(select, deleteButton);

    li.append(head, main, progress, foot);

    // 마우스로 카드를 다른 열에 옮겨도 status가 저장됩니다.
    // dragstart: 끌기 시작한 카드의 ID를 브라우저 임시 전달 공간(dataTransfer)에 담습니다.
    li.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text/plain', String(todo.id));
        event.dataTransfer.effectAllowed = 'move';
        li.classList.add('is-dragging');
    });
    li.addEventListener('dragend', function() {
        li.classList.remove('is-dragging');
        /*
   10) 드래그 앤 드롭
   dragover에서 preventDefault() 해야 해당 열에 카드를 떨어뜨릴(drop) 수 있습니다.
   drop되면 카드 ID를 찾아 그 열의 data-status 값으로 상태를 변경합니다.
*/
document.querySelectorAll('.kanban-column').forEach(function(column) {
            column.classList.remove('drag-over');
        });
    });
    return li;
}

/*
   6) 통계/진행률 계산하기
   filter()로 완료한 작업 수를 세고 완료율 = (완료 개수 / 전체 개수) × 100으로 계산합니다.
   getElementById()로 화면에 표시된 숫자 요소의 textContent를 갱신합니다.
*/
function updateCount() {
    const total = todos.length;
    const done = todos.filter(function(todo) { return todo.status === 'done'; }).length;
    const progress = todos.filter(function(todo) { return todo.status === 'progress'; }).length;
    const remaining = total - done;
    const percent = total === 0 ? 0 : Math.round(done / total * 100);

    document.getElementById('count').textContent = remaining;
    document.getElementById('progressText').textContent = percent + tr('% 완료');
    document.getElementById('progressBar').style.width = percent + '%';
    document.getElementById('totalTasks').textContent = total;
    document.getElementById('inProgressCount').textContent = progress;
    document.getElementById('completedTasks').textContent = done;
    document.getElementById('todoColumnCount').textContent = todos.filter(function(todo) { return todo.status === 'todo'; }).length;
    document.getElementById('progressColumnCount').textContent = progress;
    document.getElementById('doneColumnCount').textContent = done;
}

/*
   7) 할 일 목록 화면에 그리기 (가장 중요한 함수!)
   ① 세 개의 ul을 찾기 → ② 예전 카드 지우기 → ③ 검색어 필터 → ④ 상태별 목록에 카드 추가
   ⑤ 목록이 비어 있으면 안내문 표시 → ⑥ 맨 마지막에 통계 갱신
*/
function renderTodos() {
    const columns = {
        todo: document.getElementById('todoList'),
        progress: document.getElementById('progressList'),
        done: document.getElementById('doneList')
    };
    // replaceChildren()은 현재 ul 안에 있는 이전 카드들을 전부 지웁니다.
    Object.values(columns).forEach(function(list) { list.replaceChildren(); });
    const keyword = document.getElementById('taskSearch').value.trim().toLocaleLowerCase();
    // 입력한 검색어를 포함하는 작업만 골라 표시합니다. 원본 todos 데이터는 삭제되지 않습니다.
    const filteredTodos = todos.filter(function(todo) {
        return todo.text.toLocaleLowerCase().includes(keyword);
    });

    // forEach()는 배열의 각 할 일에 대해 한 번씩 실행됩니다.
    filteredTodos.forEach(function(todo) {
        columns[todo.status].appendChild(createTaskCard(todo));
    });

    VALID_STATUSES.forEach(function(status) {
        if (columns[status].children.length !== 0) return;
        const empty = document.createElement('li');
        empty.className = 'empty-column';
        const icon = document.createElement('span');
        icon.className = 'empty-column-symbol';
        icon.textContent = keyword ? '⌕' : (status === 'done' ? '✓' : '+');
        const message = document.createElement('span');
        message.textContent = keyword ? tr('검색 결과가 없습니다') : (status === 'done' ? tr('완료한 작업이 이곳에 표시돼요') : tr('여기에 작업을 추가해 보세요'));
        empty.append(icon, message);
        columns[status].appendChild(empty);
    });
    updateCount();
}

/*
   8) 새 할 일 추가하기
   input.value는 입력창의 현재 글자, trim()은 양끝 공백 제거입니다.
   push()로 배열에 새 객체를 넣고 저장한 다음 목록을 다시 그립니다.
*/
function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    const status = document.getElementById('newTodoStatus').value;
    if (!text) { input.focus(); return; }
    todos.push({ id: nextId++, text: text, status: VALID_STATUSES.includes(status) ? status : 'todo', completed: status === 'done' });
    saveTodos();
    input.value = '';
    // 검색 중 새 카드를 못 찾는 일이 없도록 검색을 지움
    document.getElementById('taskSearch').value = '';
    renderTodos();
    input.focus();
}

/*
   9) HTML 버튼/입력창과 JavaScript 연결
   addEventListener('click', 함수) = 버튼을 누를 때 해당 함수 실행
   keydown = 키보드를 누른 순간, input = 입력창 값이 바뀌는 순간
*/
document.getElementById('addBtn').addEventListener('click', addTodo);
document.getElementById('todoInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !event.isComposing) {
        event.preventDefault();
        addTodo();
    }
});
document.getElementById('taskSearch').addEventListener('input', renderTodos);

// data-add-status 속성이 있는 모든 [+] 버튼에 '해당 상태로 새 작업 추가' 동작을 붙입니다.
document.querySelectorAll('[data-add-status]').forEach(function(button) {
    button.addEventListener('click', function() {
        document.getElementById('newTodoStatus').value = button.dataset.addStatus;
        document.getElementById('todoInput').focus();
    });
});

document.querySelectorAll('.kanban-column').forEach(function(column) {
    column.addEventListener('dragover', function(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        column.classList.add('drag-over');
    });
    column.addEventListener('dragleave', function(event) {
        if (!column.contains(event.relatedTarget)) column.classList.remove('drag-over');
    });
    column.addEventListener('drop', function(event) {
        event.preventDefault();
        column.classList.remove('drag-over');
        const id = Number(event.dataTransfer.getData('text/plain'));
        const todo = todos.find(function(item) { return item.id === id; });
        if (todo) changeTodoStatus(todo, column.dataset.status);
    });
});

// =========================
// 프로필 사진 접기 / 펼치기
// =========================
/*
   11) 프로필 사진
   profileImage는 실제 이미지, imageOpenBtn은 접힌 이미지를 다시 여는 버튼입니다.
   imageFallback은 이미지 파일이 없을 때 SR을 대신 보여주는 칸입니다.
*/
const profileImage = document.getElementById('profileImage');
const imageFallback = document.getElementById('imageFallback');
const imageOpenBtn = document.getElementById('imageOpenBtn');

// hidden=true는 요소를 숨깁니다. 접기 버튼을 보여주고 사진/대체 글자는 감춥니다.
function hideProfileImage() {
    profileImage.hidden = true;
    imageFallback.hidden = true;
    imageOpenBtn.hidden = false;
}
profileImage.addEventListener('click', hideProfileImage);
profileImage.addEventListener('error', function() {
    profileImage.hidden = true;
    imageFallback.hidden = false;
});
// 캐시/오프라인 상태에서 이미지 로드 실패가 이벤트 등록 전에 발생했을 경우도 처리
if (profileImage.complete && profileImage.naturalWidth === 0) {
    profileImage.hidden = true;
    imageFallback.hidden = false;
}
imageOpenBtn.addEventListener('click', function() {
    imageOpenBtn.hidden = true;
    if (profileImage.complete && profileImage.naturalWidth > 0) profileImage.hidden = false;
    else imageFallback.hidden = false;
});
imageFallback.addEventListener('click', hideProfileImage);
imageFallback.style.cursor = 'pointer';
imageFallback.title = tr('클릭하면 프로필 접기');

// 기존에 사용하던 문단 접기 기능도 유지합니다.
/*
   12) 소개/프로젝트/댓글 카드 접기 기능
   querySelectorAll('.content.panel')은 class='content panel'인 카드 모두를 찾습니다.
   classList.toggle('collapsed')는 collapsed 클래스를 붙였다가 뗍니다.
   CSS에서 .collapsed 아래 내용을 숨기도록 설정되어 있습니다.
*/
document.querySelectorAll('.content.panel').forEach(function(section) {
    const heading = section.querySelector('.panel-heading h2');
    if (!heading) return;
    heading.tabIndex = 0;
    heading.setAttribute('role', 'button');
    heading.setAttribute('aria-expanded', 'true');
    heading.title = tr('클릭하면 카드 내용을 접거나 펼칩니다');
    function toggleSection() {
        const isCollapsed = section.classList.toggle('collapsed');
        heading.setAttribute('aria-expanded', String(!isCollapsed));
    }
    heading.addEventListener('click', toggleSection);
    heading.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleSection();
        }
    });
});

// =========================
// 플로팅 버튼 / 다크모드
// =========================
/*
   13) 다크모드
   body.dark 클래스가 붙으면 CSS의 'body.dark { ... }' 규칙이 적용됩니다.
   선택 상태를 localStorage의 sr-studio-theme 키에 저장해서 새로고침 후에도 유지합니다.
*/
const themeBtn = document.getElementById('themeBtn');
// isDark가 true면 body에 dark를 붙이고 해 아이콘을, false면 달 아이콘을 표시합니다.
function setTheme(isDark) {
    document.body.classList.toggle('dark', isDark);
    themeBtn.querySelector('use').setAttribute('href', isDark ? '#i-sun' : '#i-moon');
    themeBtn.setAttribute('aria-label', isDark ? tr('라이트모드로 전환') : tr('다크모드로 전환'));
    themeBtn.title = isDark ? tr('라이트모드로 전환') : tr('다크모드로 전환');
    try { localStorage.setItem('sr-studio-theme', isDark ? 'dark' : 'light'); } catch (error) { /* 비공개 브라우징 대응 */ }
}
let storedTheme = null;
try { storedTheme = localStorage.getItem('sr-studio-theme'); } catch (error) { /* 비공개 브라우징 대응 */ }
setTheme(storedTheme === 'dark');
themeBtn.addEventListener('click', function() { setTheme(!document.body.classList.contains('dark')); });
document.getElementById('topBtn').addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });
document.getElementById('bottomBtn').addEventListener('click', function() { window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' }); });

// =========================
// 모바일 사이드바 / 메뉴 활성화
// =========================
/*
   14) 모바일 사이드바
   작은 화면에서는 사이드바가 숨겨져 있다가 메뉴 버튼 클릭 시 open 클래스가 붙어 나타납니다.
   sidebarScrim은 메뉴 뒤의 반투명 검은 배경입니다.
*/
const sidebar = document.getElementById('sidebar');
const sidebarScrim = document.getElementById('sidebarScrim');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarScrim.hidden = true;
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
}
mobileMenuBtn.addEventListener('click', function() {
    const isOpen = sidebar.classList.toggle('open');
    sidebarScrim.hidden = !isOpen;
    mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
});
sidebarScrim.addEventListener('click', closeSidebar);
document.addEventListener('keydown', function(event) { if (event.key === 'Escape') closeSidebar(); });
document.querySelectorAll('.side-link').forEach(function(link) { link.addEventListener('click', closeSidebar); });
// URL 맨 뒤의 #about, #tasks 같은 주소를 보고 해당 사이드바 메뉴에 active 클래스를 붙입니다.
function updateNavActive() {
    const hash = location.hash || '#dashboard';
    document.querySelectorAll('[data-nav-link]').forEach(function(link) {
        link.classList.toggle('active', link.getAttribute('href') === hash);
    });
}
window.addEventListener('hashchange', updateNavActive);
updateNavActive();

// 날짜는 사용자의 브라우저 시간으로 표시
/* 15) 현재 날짜와 연도를 사용자 브라우저 시간으로 표시합니다. */
const now = new Date();
function renderCurrentDate() {
    const locale = {ko:'ko-KR', ja:'ja-JP', en:'en-US'}[currentLang()];
    document.getElementById('currentDate').textContent = new Intl.DateTimeFormat(locale, { month:'short', day:'numeric', weekday:'short' }).format(new Date());
}
renderCurrentDate();

// 사용자가 언어를 바꾸면 화면에서 JavaScript가 만든 카드/통계/날짜도 즉시 다시 그립니다.
document.addEventListener('sr-language-change', function() {
    renderTodos();
    renderCurrentDate();
    imageFallback.title = tr('클릭하면 프로필 접기');
    document.querySelectorAll('.content.panel .panel-heading h2').forEach(function(heading) {
        heading.title = tr('클릭하면 카드 내용을 접거나 펼칩니다');
    });
    setTheme(document.body.classList.contains('dark'));
});
document.getElementById('year').textContent = String(now.getFullYear());

renderTodos();

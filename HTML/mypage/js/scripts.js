
/* =========================
   Todo List + localStorage
========================= */

// localStorage에서 저장된 할 일 불러오기
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// 새로운 할 일의 고유 ID 생성
let nextId = todos.reduce(function(maxId, todo) {
    return Math.max(maxId, todo.id);
}, 0) + 1;


// localStorage 저장 함수
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}


// 할 일 목록을 화면에 출력하는 함수
function renderTodos() {

    // 할 일 목록 ul 가져오기
    let todoList = document.getElementById("todoList");

    // 기존 목록 초기화
    todoList.innerHTML = "";

    // 배열에 저장된 할 일을 하나씩 처리
    todos.forEach(function(todo) {

        // li 생성
        let li = document.createElement("li");

        // 체크박스 생성
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;

        // 할 일 내용 생성
        let span = document.createElement("span");
        span.textContent = todo.text;

        // 완료된 할 일이면 취소선 적용
        if (todo.completed) {
            span.classList.add("done");
        }

        // 체크박스 변경 이벤트
        checkbox.addEventListener("change", function() {

            // 완료 상태 변경
            todo.completed = checkbox.checked;

            // 변경된 상태 저장
            saveTodos();

            // 화면 갱신
            renderTodos();
        });

        // 삭제 버튼 생성
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "×";
        deleteButton.classList.add("delete-btn");

        // 삭제 버튼 클릭 이벤트
        deleteButton.addEventListener("click", function() {

            // 해당 ID의 할 일 제외
            todos = todos.filter(function(item) {
                return item.id !== todo.id;
            });

            // 변경된 배열 저장
            saveTodos();

            // 화면 갱신
            renderTodos();
        });

        // li에 요소 추가
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);

        // ul에 추가
        todoList.appendChild(li);
    });

    // 남은 할 일 개수와 게이지 갱신
    updateCount();
}


// 새로운 할 일 추가
function addTodo() {

    // 입력값 가져오기
    let input = document.getElementById("todoInput");
    let text = input.value.trim();

    // 빈칸 방지
    if (text === "") {
        return;
    }

    // 새로운 할 일 객체
    let todo = {
        id: nextId++,
        text: text,
        completed: false
    };

    // 배열에 객체 추가
    todos.push(todo);

    // localStorage 저장
    saveTodos();

    // 화면 갱신
    renderTodos();

    // 입력창 비우기
    input.value = "";
}


// 남은 할 일 개수와 완료율 계산
function updateCount() {

    // 전체 할 일
    let total = todos.length;

    // 완료된 할 일 개수
    let completed = todos.filter(function(todo) {
        return todo.completed;
    }).length;

    // 남은 할 일 계산
    let remaining = total - completed;

    // 완료율 계산
    let percent = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    // 남은 할 일 표시
    document.getElementById("count").textContent = remaining;

    // 완료율 표시
    document.getElementById("progressText").textContent = percent + "% 완료";

    // 진행률 게이지 변경
    document.getElementById("progressBar").style.width = percent + "%";
}


// 추가 버튼 클릭 이벤트
document.getElementById("addBtn").addEventListener("click", function() {
    addTodo();
});


// Enter 키 이벤트
document.getElementById("todoInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTodo();
    }
});


// 페이지를 열면 저장된 할 일 표시
renderTodos();

/* 문단 섹션 추가 */

document.querySelectorAll(".content").forEach(function(section) {

    let title = section.querySelector("h1");

    title.addEventListener("click", function() {

        // 접힘 상태 클래스 전환
        section.classList.toggle("collapsed");

        // 제목을 제외한 나머지 요소 숨기기
        Array.from(section.children).forEach(function(child) {
            if (child !== title) {
                child.style.display =
                    section.classList.contains("collapsed") ? "none" : "";
            }
        });

    });
});

// 댓글이 있는지 확인해서 안내 문구를 표시하거나 숨기는 함수
function updateCommentMessage() {

    // HTML에서 댓글 목록 요소를 찾음
    let commentList = document.getElementById("commentList");

    // HTML에서 "아직 댓글이 없습니다." 문구를 찾음
    let emptyMessage = document.getElementById("emptyMessage");

    // 댓글 목록에 자식 요소(li)가 하나도 없다면
    if (commentList.children.length === 0) {

        // 안내 문구 표시
        emptyMessage.style.display = "block";

    } else {

        // 댓글이 하나 이상 있다면 안내 문구 숨김
        emptyMessage.style.display = "none";
    }
}




/* =========================
   댓글 + localStorage
========================= */

// 기존 댓글 데이터 불러오기
let comments = JSON.parse(localStorage.getItem("comments")) || [];

// 댓글 고유 ID 생성
let nextCommentId = comments.reduce(function(maxId, comment) {
    return Math.max(maxId, comment.id);
}, 0) + 1;


// 댓글 저장
function saveComments() {
    localStorage.setItem("comments", JSON.stringify(comments));
}


// 댓글 화면 출력
function renderComments() {

    // 댓글 목록 가져오기
    let commentList = document.getElementById("commentList");

    // 기존 목록 비우기
    commentList.innerHTML = "";

    // 댓글을 하나씩 출력
    comments.forEach(function(comment) {

        // 댓글 항목 생성
        let li = document.createElement("li");

        // 닉네임과 날짜를 감쌀 영역
        let header = document.createElement("div");
        header.classList.add("comment-header");

        // 닉네임 생성
        let nickname = document.createElement("span");
        nickname.classList.add("comment-nickname");

        // 기존 댓글에 닉네임이 없으면 익명 표시
        nickname.textContent = comment.nickname || "익명";

        // 작성 날짜 생성
        let date = document.createElement("span");
        date.classList.add("comment-date");
        date.textContent = comment.date;

        // 댓글 내용 생성
        let text = document.createElement("span");
        text.classList.add("comment-text");
        text.textContent = comment.text;

        // 삭제 버튼 생성
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "×";
        deleteButton.classList.add("comment-delete-btn");
        deleteButton.setAttribute("aria-label", "댓글 삭제");

        // 댓글 삭제 이벤트
        deleteButton.addEventListener("click", function() {

            // 해당 댓글 ID를 제외하고 배열 재생성
            comments = comments.filter(function(item) {
                return item.id !== comment.id;
            });

            // 변경된 댓글 저장
            saveComments();

            // 화면 갱신
            renderComments();
        });

        // 닉네임과 날짜 추가
        header.appendChild(nickname);
        header.appendChild(date);

        // 댓글 항목에 요소 추가
        li.appendChild(header);
        li.appendChild(text);
        li.appendChild(deleteButton);

        // 댓글 목록에 추가
        commentList.appendChild(li);
    });

    // 댓글 개수 표시
    document.getElementById("commentCount").textContent = comments.length;

    // 댓글이 없을 때 안내 문구 표시
    updateCommentMessage();
}


// 새로운 댓글 추가
function addComment() {

    // 입력값 가져오기
    let nicknameInput = document.getElementById("nicknameInput");
    let commentInput = document.getElementById("commentInput");

    let nickname = nicknameInput.value.trim();
    let text = commentInput.value.trim();

    // 닉네임이 비어 있으면 익명 사용
    if (nickname === "") {
        nickname = "익명";
    }

    // 댓글 내용이 없으면 종료
    if (text === "") {
        return;
    }

    // 새로운 댓글 객체 생성
    let comment = {
        id: nextCommentId++,
        nickname: nickname,
        text: text,
        date: new Date().toLocaleString("ko-KR")
    };

    // 댓글 배열에 추가
    comments.push(comment);

    // localStorage 저장
    saveComments();

    // 화면 다시 출력
    renderComments();

    // 댓글 입력창 비우기
    commentInput.value = "";
}


// 댓글이 없을 때 안내 문구 표시
function updateCommentMessage() {

    let emptyMessage = document.getElementById("emptyMessage");

    if (comments.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }
}


// 등록 버튼 클릭
document.getElementById("commentBtn").addEventListener("click", function() {
    addComment();
});


// Ctrl + Enter로 댓글 등록
document.getElementById("commentInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        addComment();
    }
});


// 저장된 댓글 표시
renderComments();



/* =========================
   이미지 접기 / 펼치기
========================= */

// 이미지와 펼치기 버튼 가져오기
let profileImage = document.getElementById("profileImage");
let imageOpenBtn = document.getElementById("imageOpenBtn");

// 두 요소가 모두 존재할 때만 이벤트 등록
if (profileImage && imageOpenBtn) {

    // 이미지를 클릭하면 접기
    profileImage.addEventListener("click", function() {

        profileImage.hidden = true;
        imageOpenBtn.hidden = false;

    });

    // 아이콘을 클릭하면 펼치기
    imageOpenBtn.addEventListener("click", function() {

        profileImage.hidden = false;
        imageOpenBtn.hidden = true;

    });

}



/* =========================
   플로팅 메뉴
========================= */

// 버튼 가져오기
let topBtn = document.getElementById("topBtn");
let bottomBtn = document.getElementById("bottomBtn");
let themeBtn = document.getElementById("themeBtn");

// 버튼이 모두 존재하는지 확인
console.log("맨 위 버튼:", topBtn);
console.log("맨 아래 버튼:", bottomBtn);
console.log("다크모드 버튼:", themeBtn);

// 버튼이 모두 존재할 때 이벤트 등록
if (topBtn && bottomBtn && themeBtn) {

    // 맨 위로 이동
    topBtn.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // 맨 아래로 이동
    bottomBtn.addEventListener("click", function() {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth"
        });
    });

    // 다크모드 전환
    themeBtn.addEventListener("click", function() {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            themeBtn.textContent = "☀️";
        } else {
            themeBtn.textContent = "🌙";
        }

    });

}

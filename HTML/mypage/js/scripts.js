/* =========================
   Todo List + localStorage
========================= */

// 저장된 할 일 데이터를 불러오기
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// 할 일마다 고유한 번호를 만들기 위한 변수
let nextId = todos.reduce(function(maxId, todo) {
    return Math.max(maxId, todo.id);
}, 0) + 1;


// localStorage에 할 일 저장
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}


// 할 일 목록을 화면에 다시 그리는 함수
function renderTodos() {

    // ul 요소 가져오기
    let todoList = document.getElementById("todoList");

    // 기존 목록 비우기
    todoList.innerHTML = "";

    // 배열에 있는 할 일을 하나씩 처리
    todos.forEach(function(todo) {

        // li 생성
        let li = document.createElement("li");

        // 체크박스 생성
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        // 저장된 완료 상태 반영
        checkbox.checked = todo.completed;

        // 할 일 내용 생성
        let span = document.createElement("span");
        span.textContent = todo.text;

        // 완료된 할 일이면 취소선 적용
        if (todo.completed) {
            span.classList.add("done");
        }

        // 체크박스 상태 변경 이벤트
        checkbox.addEventListener("change", function() {

            // 객체의 완료 상태 변경
            todo.completed = checkbox.checked;

            // 변경된 배열 저장
            saveTodos();

            // 화면 다시 그리기
            renderTodos();
        });

        // 삭제 버튼 생성
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "×";
        deleteButton.classList.add("delete-btn");

        // 삭제 버튼 클릭 이벤트
        deleteButton.addEventListener("click", function() {

            // 해당 id를 제외한 할 일만 남기기
            todos = todos.filter(function(item) {
                return item.id !== todo.id;
            });

            // 삭제된 상태 저장
            saveTodos();

            // 화면 다시 그리기
            renderTodos();
        });

        // li에 요소 추가
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);

        // ul에 li 추가
        todoList.appendChild(li);
    });

    // 남은 개수와 진행률 갱신
    updateCount();
}


// 새로운 할 일 추가
function addTodo() {

    // 입력값 가져오기
    let input = document.getElementById("todoInput");
    let text = input.value.trim();

    // 빈칸이면 종료
    if (text === "") {
        return;
    }

    // 새로운 할 일 객체 생성
    let todo = {
        id: nextId++,
        text: text,
        completed: false
    };

    // 배열에 새로운 객체 추가
    todos.push(todo);

    // localStorage에 저장
    saveTodos();

    // 화면 다시 그리기
    renderTodos();

    // 입력창 비우기
    input.value = "";
}


// 남은 할 일 개수와 완료율 계산
function updateCount() {

    // 전체 할 일 개수
    let total = todos.length;

    // 완료된 할 일 개수
    let completed = todos.filter(function(todo) {
        return todo.completed;
    }).length;

    // 남은 할 일 개수
    let remaining = total - completed;

    // 완료율 계산
    let percent = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    // 남은 할 일 표시
    document.getElementById("count").textContent = remaining;

    // 완료율 텍스트 표시
    document.getElementById("progressText").textContent = percent + "% 완료";

    // 진행률 게이지 변경
    document.getElementById("progressBar").style.width = percent + "%";
}


// 추가 버튼 클릭
document.getElementById("addBtn").addEventListener("click", function() {
    addTodo();
});


// Enter 키로 할 일 추가
document.getElementById("todoInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTodo();
    }
});


// 페이지를 처음 열었을 때 저장된 할 일 표시
renderTodos();

// 남은 할 일과 완료율 계산
function updateCount() {

    // 모든 체크박스 찾기
    let checkboxes = document.querySelectorAll(
        '#todoList input[type="checkbox"]'
    );

    // 전체 할 일 개수
    let total = checkboxes.length;

    // 완료된 할 일 개수
    let completed = 0;

    // 체크된 항목 세기
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            completed++;
        }
    });

    // 남은 할 일 계산
    let remaining = total - completed;

    // 완료율 계산 (할 일이 0개면 0%)
    let percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    // 남은 할 일 표시
    document.getElementById("count").textContent = remaining;

    // 완료율 표시
    document.getElementById("progressText").textContent = percent + "% 완료";

    // 게이지 너비 변경
    document.getElementById("progressBar").style.width = percent + "%";
}

// 버튼 클릭
document.getElementById("addBtn").addEventListener("click", function() {
    addTodo();
});


// 엔터 키로도 추가
document.getElementById("todoInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTodo();
    }
});

let themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function() {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeBtn.textContent = "☀️";
    } else {
        themeBtn.textContent = "🌙";
    }

});


/* 문단 섹션 추가 */

let sections = document.querySelectorAll(".content");

sections.forEach(function(section) {
    let title = section.querySelector("h1");

    title.addEventListener("click", function() {
        let children = section.children;

        for (let i = 1; i < children.length; i++) {
            if (children[i].style.display === "none") {
                children[i].style.display = "";
            } else {
                children[i].style.display = "none";
            }
        }
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
   댓글 기능
========================= */

// 댓글이 없을 때 안내 문구 표시
function updateCommentMessage() {
    let commentList = document.getElementById("commentList");
    let emptyMessage = document.getElementById("emptyMessage");

    if (commentList.children.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }
}


// 댓글 추가 함수
function addComment() {

    // 입력창과 입력값 가져오기
    let input = document.getElementById("commentInput");
    let text = input.value;

    // 빈 댓글 방지
    if (text.trim() === "") {
        return;
    }

    // 댓글 항목 생성
    let li = document.createElement("li");

    // 댓글 내용과 작성 시간을 묶는 div
    let commentContent = document.createElement("div");

    // 댓글 내용 생성
    let span = document.createElement("span");
    span.textContent = text;

    // 현재 시간 가져오기
    let now = new Date();
    let time = now.toLocaleString("ko-KR");

    // 작성 시간 요소 생성
    let timeSpan = document.createElement("span");
    timeSpan.textContent = time;
    timeSpan.classList.add("comment-time");

    // 삭제 버튼 생성
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "×";
    deleteButton.classList.add("delete-btn");

    // 삭제 버튼 클릭 이벤트
    deleteButton.addEventListener("click", function() {
        li.remove();
        updateCommentMessage();
    });

    // 댓글 내용과 작성 시간 추가
    commentContent.appendChild(span);
    commentContent.appendChild(timeSpan);

    // 댓글 항목 구성
    li.appendChild(commentContent);
    li.appendChild(deleteButton);

    // 댓글 목록에 추가
    document.getElementById("commentList").appendChild(li);

    // 입력창 비우기
    input.value = "";

    // 안내 문구 갱신
    updateCommentMessage();
}


// 등록 버튼 클릭 이벤트
document.getElementById("commentBtn").addEventListener("click", function() {
    addComment();
});


// Enter 키 입력 이벤트
document.getElementById("commentInput").addEventListener("keydown", function(event) {

    // 눌린 키가 Enter인지 확인
    if (event.key === "Enter") {
        addComment();
    }
});


// 페이지 최초 실행 시 댓글 상태 확인
updateCommentMessage();
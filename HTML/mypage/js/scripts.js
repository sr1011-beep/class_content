
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


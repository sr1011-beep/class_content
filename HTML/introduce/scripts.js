
function addTodo() {
    let input = document.getElementById("todoInput");
    let text = input.value;

    // 빈 칸이면 추가하지 않음
    if (text.trim() === "") {
        return;
    }

    // li 생성
    let li = document.createElement("li");

    // checkbox 생성
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    // span 생성
    let span = document.createElement("span");
    span.textContent = text;

    // deleteButton 생성
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "×";
    deleteButton.classList.add("delete-btn")
    
    // 취소선 이벤트 생성
    checkbox.addEventListener("change", function() {
        span.classList.toggle("done");
        updateCount();
    });

    // 삭제 이벤트 생성
    deleteButton.addEventListener("click", function() {
        li.remove();
        updateCount();
    })

    li.appendChild(checkbox)
    li.appendChild(span);
    li.appendChild(deleteButton);

    // ul 안에 li 추가
    document.getElementById("todoList").appendChild(li);

    // 입력창 비우기
    input.value = "";

    updateCount();

}

// 남은 할 일 개수를 카운트하기 위한 함수
function updateCount() {
    let checkboxes = document.querySelectorAll(
        '#todoList input[type="checkbox"]'
    );

    let count = 0;

    checkboxes.forEach(function(checkbox) {
        if (!checkbox.checked) {
            count++;
        }
    });

    document.getElementById("count").textContent = count;
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

/* 댓글 */
function addComment() {
    let input = document.getElementById("commentInput");
}   let text = input.value;

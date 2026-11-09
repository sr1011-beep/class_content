
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";

import {
    getAuth,
    signInAnonymously
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js";

// 실제 Firebase 프로젝트 설정값 입력
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaK33TUA50H7LMzWagMk20U4qkeLjTMmI",
  authDomain: "mysite-ec144.firebaseapp.com",
  projectId: "mysite-ec144",
  storageBucket: "mysite-ec144.firebasestorage.app",
  messagingSenderId: "261455389321",
  appId: "1:261455389321:web:ef52c5c3b15bb85433dc58",
  measurementId: "G-KBEZXS4520"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// 댓글 컬렉션
const commentsRef = collection(db, "comments");

// HTML 요소 가져오기
const nicknameInput = document.getElementById("nicknameInput");
const commentInput = document.getElementById("commentInput");
const commentBtn = document.getElementById("commentBtn");
const commentList = document.getElementById("commentList");
const commentCount = document.getElementById("commentCount");
const emptyMessage = document.getElementById("emptyMessage");


 // 인증이 끝나기 전까지 버튼 비활성화
commentBtn.disabled = true;

// =========================
// 댓글 작성
// =========================

async function addComment() {

    // 입력값 가져오기
    let nickname = nicknameInput.value.trim();
    let text = commentInput.value.trim();

    // 닉네임이 비어 있으면 익명 처리
    if (nickname === "") {
        nickname = "익명";
    }

    // 댓글이 비어 있으면 종료
    if (text === "") {
        return;
    }

    // Firebase 연결 확인
    if (!auth.currentUser) {
        alert("Firebase 연결 중입니다.");
        return;
    }

    // 중복 등록 방지
    if (commentBtn.disabled) {
        return;
    }

    commentBtn.disabled = true;

    try {
        // Firebase에 댓글 저장
        await addDoc(commentsRef, {
            name: nickname,
            text: text,
            uid: auth.currentUser.uid,
            createdAt: serverTimestamp()
        });

        // 댓글 입력창 초기화
        commentInput.value = "";

    } catch (error) {
        console.error("댓글 저장 실패:", error);
        alert("댓글 저장에 실패했습니다.");

    } finally {
        // 댓글 등록 버튼 다시 활성화
        commentBtn.disabled = false;
    }
}


// =========================
// 댓글 화면 출력
// =========================

function renderComments(snapshot) {

    // 기존 댓글 목록 비우기
    commentList.innerHTML = "";

    snapshot.forEach(function(documentSnapshot) {

        const comment = documentSnapshot.data();

        // 댓글 항목
        const li = document.createElement("li");

        // 닉네임과 날짜 영역
        const header = document.createElement("div");
        header.classList.add("comment-header");

        // 닉네임
        const nickname = document.createElement("span");
        nickname.classList.add("comment-nickname");
        nickname.textContent = comment.name || "익명";

        // 날짜
        const date = document.createElement("span");
        date.classList.add("comment-date");

        if (comment.createdAt) {
            date.textContent = comment.createdAt
                .toDate()
                .toLocaleString("ko-KR");
        }

        // 댓글 내용
        const text = document.createElement("span");
        text.classList.add("comment-text");
        text.textContent = comment.text;

        // 요소 조립
        header.appendChild(nickname);
        header.appendChild(date);

        li.appendChild(header);
        li.appendChild(text);

        // 작성자 본인에게만 삭제 버튼 표시
        if (
            auth.currentUser &&
            comment.uid === auth.currentUser.uid
        ) {

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "×";
            deleteButton.classList.add("comment-delete-btn");
            deleteButton.setAttribute("aria-label", "댓글 삭제");

            deleteButton.addEventListener("click", async function() {

                if (!confirm("댓글을 삭제할까요?")) {
                    return;
                }

                try {
                    await deleteDoc(
                        doc(db, "comments", documentSnapshot.id)
                    );
                } catch (error) {
                    console.error("댓글 삭제 실패:", error);
                    alert("댓글을 삭제할 수 없습니다.");
                }
            });

            li.appendChild(deleteButton);
        }

        // 댓글 목록에 추가
        commentList.appendChild(li);
    });

    // 댓글 개수 갱신
    commentCount.textContent = snapshot.size;

    // 댓글이 없을 때 안내 문구 표시
    emptyMessage.style.display =
        snapshot.empty ? "block" : "none";
}

// =========================
// 댓글 등록 이벤트
// =========================

// 버튼 클릭
commentBtn.addEventListener("click", addComment);

// Ctrl + Enter로 댓글 등록
commentInput.addEventListener("keydown", function(event) {

    if (
        event.key === "Enter" &&
        (event.ctrlKey || event.metaKey)
    ) {
        event.preventDefault();
        addComment();
    }
});

// =========================
// Firebase 연결
// =========================

async function start() {

    try {
        // 익명 로그인
        await signInAnonymously(auth);

        // 댓글 작성 활성화
        commentBtn.disabled = false;

        // 댓글 정렬
        const q = query(
            commentsRef,
            orderBy("createdAt", "asc")
        );

        // Firebase 데이터 실시간 조회
        onSnapshot(
            q,
            renderComments,
            function(error) {
                console.error("댓글 조회 실패:", error);
            }
        );

    } catch (error) {
        console.error("Firebase 연결 실패:", error);
    }
}

start();

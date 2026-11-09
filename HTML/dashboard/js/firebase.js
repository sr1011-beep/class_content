/* =========================
   SR Studio · Firebase Guestbook
   기존 프로젝트 설정 / 익명 인증 / 실시간 댓글 유지
========================= */
/*
   1) Firebase 라이브러리 가져오기
   import는 다른 JavaScript 모듈에 작성된 기능을 가져오는 문법입니다.
   firebase-app: 연결 초기화, firestore: 댓글 데이터베이스, auth: 익명 로그인
*/
import { initializeApp } from 'https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js';
import {
    getFirestore, collection, addDoc, onSnapshot,
    query, orderBy, serverTimestamp, deleteDoc, doc
} from 'https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js';
import { getAuth, signInAnonymously } from 'https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js';

// 기존 사용자가 제공한 Firebase 웹앱 설정 (웹 클라이언트 설정은 공개 정보임)
// 실제 데이터 접근 권한은 Firebase Authentication + Firestore 보안 규칙에서 통제해야 합니다.
/*
   2) 내 Firebase 프로젝트에 연결할 설정
   apiKey 등은 웹앱 식별 정보이고 일반적으로 웹사이트에서 공개됩니다.
   중요한 것은 Firebase 콘솔의 Authentication 및 Firestore 보안 규칙입니다.
*/
const firebaseConfig = {
    apiKey: 'AIzaSyAaK33TUA50H7LMzWagMk20U4qkeLjTMmI',
    authDomain: 'mysite-ec144.firebaseapp.com',
    projectId: 'mysite-ec144',
    storageBucket: 'mysite-ec144.firebasestorage.app',
    messagingSenderId: '261455389321',
    appId: '1:261455389321:web:ef52c5c3b15bb85433dc58',
    measurementId: 'G-KBEZXS4520'
};

/*
   3) 연결 준비
   app = Firebase 앱, db = Firestore 데이터베이스, auth = 로그인 기능입니다.
   collection(db, 'comments')는 comments라는 댓글 모음을 가리킵니다.
*/
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const commentsRef = collection(db, 'comments');

/*
   4) HTML 요소 찾기
   getElementById('nicknameInput')은 HTML의 id='nicknameInput' 태그를 가져옵니다.
   댓글 버튼/목록/개수도 같은 방법으로 연결합니다.
*/
const nicknameInput = document.getElementById('nicknameInput');
const commentInput = document.getElementById('commentInput');
const commentBtn = document.getElementById('commentBtn');
const commentList = document.getElementById('commentList');
const commentCount = document.getElementById('commentCount');
const emptyMessage = document.getElementById('emptyMessage');

// Firebase 로그인이 끝나기 전에는 댓글 등록 버튼을 잠시 비활성화합니다.
commentBtn.disabled = true;
let submitting = false;

/*
   5) 댓글 등록하기
   async = 내부에서 await 사용 가능, await = Firebase 저장 완료까지 기다림
   공백 댓글 차단 → 익명 로그인 확인 → addDoc()으로 새 댓글 저장 → 입력창 비움
   제출 중에는 중복 클릭이 되지 않도록 버튼을 막습니다.
*/
async function addComment() {
    const name = nicknameInput.value.trim() || '익명';
    const text = commentInput.value.trim();
    if (!text) { commentInput.focus(); return; }
    if (!auth.currentUser) { alert('Firebase 연결 중입니다. 잠시 후 다시 시도해 주세요.'); return; }
    if (submitting || commentBtn.disabled) return;

    submitting = true;
    commentBtn.disabled = true;
    try {
        // Firestore comments 컬렉션에 닉네임, 내용, 작성자 UID, 작성 시각을 저장합니다.
        await addDoc(commentsRef, {
            name: name,
            text: text,
            uid: auth.currentUser.uid,
            createdAt: serverTimestamp()
        });
        commentInput.value = '';
    } catch (error) {
        console.error('댓글 저장 실패:', error);
        alert('댓글 저장에 실패했습니다. Firebase 권한을 확인해 주세요.');
    } finally {
        submitting = false;
        commentBtn.disabled = !auth.currentUser;
    }
}

/*
   6) 댓글 화면 출력하기
   onSnapshot으로 받은 snapshot은 현재 댓글 데이터 묶음입니다.
   forEach()로 문서 1개씩 읽고 HTML li를 만들어 commentList에 붙입니다.
*/
function renderComments(snapshot) {
    // 중복 표시를 막기 위해 화면에 있던 댓글을 먼저 지웁니다.
    commentList.replaceChildren();

    snapshot.forEach(function(documentSnapshot) {
        // 문서에서 실제 댓글 데이터(name, text, uid, createdAt)를 꺼냅니다.
        const comment = documentSnapshot.data();
        const li = document.createElement('li');
        const avatar = document.createElement('div');
        avatar.className = 'comment-avatar';
        avatar.textContent = (comment.name || '익명').trim().slice(0, 1) || '?';
        avatar.setAttribute('aria-hidden', 'true');

        const body = document.createElement('div');
        body.className = 'comment-body';
        const header = document.createElement('div');
        header.className = 'comment-header';
        // 닉네임과 작성일을 표시할 span 태그를 새로 만듭니다.
        const name = document.createElement('span');
        name.className = 'comment-nickname';
        name.textContent = comment.name || '익명';
        const date = document.createElement('span');
        date.className = 'comment-date';
        if (comment.createdAt && typeof comment.createdAt.toDate === 'function') {
            date.textContent = comment.createdAt.toDate().toLocaleString('ko-KR');
        } else {
            date.textContent = '방금 전';
        }
        const content = document.createElement('span');
        content.className = 'comment-text';
        content.textContent = comment.text || ''; // 악의적인 HTML 태그는 실행하지 않음
        header.append(name, date);
        body.append(header, content);
        li.append(avatar, body);

        // 현재 로그인한 익명 사용자 UID와 작성자 UID가 같으면 삭제 버튼을 표시합니다.
        // ★ 실제 삭제 권한은 Firestore 보안 규칙이 반드시 검사해야 합니다.
        if (auth.currentUser && comment.uid === auth.currentUser.uid) {
            const deleteButton = document.createElement('button');
            deleteButton.className = 'comment-delete-btn';
            deleteButton.type = 'button';
            deleteButton.textContent = '×';
            deleteButton.setAttribute('aria-label', '댓글 삭제');
            deleteButton.addEventListener('click', async function() {
                if (!confirm('댓글을 삭제할까요?')) return;
                deleteButton.disabled = true;
                try {
                    // doc()으로 삭제 대상 문서를 지정하고 deleteDoc()으로 삭제합니다.
                    await deleteDoc(doc(db, 'comments', documentSnapshot.id));
                } catch (error) {
                    console.error('댓글 삭제 실패:', error);
                    alert('댓글 삭제에 실패했습니다. Firestore 권한을 확인해 주세요.');
                    deleteButton.disabled = false;
                }
            });
            li.appendChild(deleteButton);
        }
        commentList.appendChild(li);
    });

    commentCount.textContent = String(snapshot.size);
    emptyMessage.style.display = snapshot.empty ? 'block' : 'none';
}

/*
   7) 이벤트 연결
   댓글 버튼을 누르면 addComment() 실행. Ctrl+Enter 또는 Mac의 Cmd+Enter도 지원합니다.
*/
commentBtn.addEventListener('click', addComment);
commentInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        addComment();
    }
});

/*
   8) Firebase 시작
   signInAnonymously()로 익명 로그인 → 등록 버튼 활성화 → 댓글 목록 실시간 구독
   orderBy('createdAt','desc')는 최신 댓글이 위쪽에 오게 정렬합니다.
   onSnapshot()은 새 댓글/삭제가 발생하면 renderComments()를 자동 호출합니다.
*/
async function start() {
    try {
        await signInAnonymously(auth);
        commentBtn.disabled = false;
        const q = query(commentsRef, orderBy('createdAt', 'desc'));
        onSnapshot(q, renderComments, function(error) {
            console.error('댓글 조회 실패:', error);
            emptyMessage.textContent = '댓글을 불러올 수 없습니다. Firebase 규칙과 연결을 확인해 주세요.';
            emptyMessage.style.display = 'block';
        });
    } catch (error) {
        console.error('Firebase 연결 실패:', error);
        commentBtn.disabled = true;
        emptyMessage.textContent = 'Firebase 연결에 실패했습니다. 연결 상태를 확인해 주세요.';
        emptyMessage.style.display = 'block';
    }
}
// 페이지가 로드되면 Firebase 연결을 시작합니다.
start();

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
import {
    getAuth, signInAnonymously, signInWithEmailAndPassword,
    signOut, onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js';

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
   ★ 관리자 UID 등록 (필수!)
   Firebase Console → Authentication → Users에서 관리자 계정의 UID를 복사한 뒤
   아래 값을 바꾸세요. 이메일이나 비밀번호는 절대로 여기에 적지 마세요.
   동일한 UID를 Firebase Firestore Rules에도 입력해야 합니다.
*/
const ADMIN_UID = 'A6aNQIYsoUZWD9nJ4JeXQcQUcgc2';
// UI 번역 도우미: 번역 API 호출 없이 현재 페이지 언어에 맞는 문구를 반환합니다.
const tr = (text) => window.SR_I18N ? window.SR_I18N.t(text) : text;
const currentLocale = () => ({ko:'ko-KR',ja:'ja-JP',en:'en-US'}[window.SR_I18N?.getLanguage()] || 'ko-KR');

// isAdmin은 화면 표시를 위해서만 사용합니다.
// 실제 권한은 서버에서 실행되는 Firestore 보안 규칙이 검사합니다.
let isAdmin = false;
let latestSnapshot = null;

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

// 관리자 로그인 버튼, 대화상자, 이메일/비밀번호 입력창을 HTML에서 가져옵니다.
const adminLoginBtn = document.getElementById('adminLoginBtn');
const adminLogoutBtn = document.getElementById('adminLogoutBtn');
const adminStatus = document.getElementById('adminStatus');
const adminDialog = document.getElementById('adminDialog');
const adminLoginForm = document.getElementById('adminLoginForm');
const adminEmail = document.getElementById('adminEmail');
const adminPassword = document.getElementById('adminPassword');
const adminError = document.getElementById('adminError');
const adminSubmitBtn = document.getElementById('adminSubmitBtn');
const adminCloseBtn = document.getElementById('adminCloseBtn');

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
    if (!auth.currentUser) { alert(tr('Firebase 연결 중입니다. 잠시 후 다시 시도해 주세요.')); return; }
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
        alert(tr('댓글 저장에 실패했습니다. Firebase 권한을 확인해 주세요.'));
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
    latestSnapshot = snapshot; // 로그인 상태가 바뀌면 이 댓글 목록을 다시 보여줍니다.
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
            date.textContent = comment.createdAt.toDate().toLocaleString(currentLocale());
        } else {
            date.textContent = tr('방금 전');
        }
        const content = document.createElement('span');
        content.className = 'comment-text';
        content.textContent = comment.text || ''; // 악의적인 HTML 태그는 실행하지 않음
        header.append(name, date);
        body.append(header, content);
        li.append(avatar, body);

        /*
           6-1) 내 댓글에만 [삭제] 버튼 달기

           auth.currentUser.uid = 지금 접속한 방문자의 익명 로그인 ID
           comment.uid = 이 댓글을 작성했을 때 저장한 작성자 ID
           두 값이 같아야 본인 댓글로 판단합니다.

           ※ 버튼을 숨기는 것만으로는 보안이 완성되지 않습니다.
              Firestore 보안 규칙에서도 작성자 UID를 검사해야 합니다.
        */
        // 관리자라면 작성자가 달라도 삭제 버튼을 보여줍니다.
        // 방문자는 본인 UID로 등록한 댓글에만 버튼이 보입니다.
        if (auth.currentUser && (isAdmin || comment.uid === auth.currentUser.uid)) {
            const deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.className = 'comment-delete-btn';
            deleteButton.title = isAdmin ? tr('관리자 권한으로 댓글 삭제') : tr('내가 작성한 댓글 삭제');
            deleteButton.setAttribute('aria-label', isAdmin ? tr('댓글 삭제') : tr('내 댓글 삭제'));

            // 이 HTML은 사용자가 입력한 문자열이 아니라 고정된 아이콘과 문구입니다.
            // svg = 휴지통 그림, span = '삭제' 글자
            deleteButton.innerHTML = `
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="none"
                     stroke="currentColor" stroke-width="1.8"
                     stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 6h18" />
                    <path d="M8 6V4h8v2" />
                    <path d="M6 6l1 14h10l1-14" />
                    <path d="M10 10v6" />
                    <path d="M14 10v6" />
                </svg>
                <span>${tr('삭제')}</span>
            `;

            // 삭제 버튼 클릭 시 아래 deleteComment 함수를 실행합니다.
            // documentSnapshot.id는 댓글 문서의 고유 ID입니다.
            deleteButton.addEventListener('click', function() {
                deleteComment(documentSnapshot.id, deleteButton);
            });

            li.appendChild(deleteButton);
        }
        commentList.appendChild(li);
    });

    commentCount.textContent = String(snapshot.size);
    emptyMessage.style.display = snapshot.empty ? 'block' : 'none';
}

/*
   6-2) 댓글 삭제하기

   댓글 ID를 받아 Firestore에서 해당 문서를 삭제합니다.
   confirm()에서 '취소'를 누르면 삭제하지 않습니다.
   삭제 성공 시 onSnapshot이 자동으로 댓글 목록을 다시 그립니다.
*/
async function deleteComment(commentId, deleteButton) {
    // 로그인하기 전에는 삭제 요청을 보내지 않습니다.
    if (!auth.currentUser) {
        alert(tr('Firebase 연결 중입니다. 다시 시도해 주세요.'));
        return;
    }

    // 실수로 삭제하지 않게 한 번 더 확인합니다.
    if (!window.confirm(tr('이 댓글을 삭제할까요? 삭제 후에는 되돌릴 수 없습니다.'))) return;

    // 저장 요청이 끝날 때까지 버튼 중복 클릭을 방지합니다.
    deleteButton.disabled = true;
    try {
        // doc()으로 문서 위치를 찾고 deleteDoc()으로 Firebase에서 삭제합니다.
        await deleteDoc(doc(db, 'comments', commentId));
    } catch (error) {
        console.error('댓글 삭제 실패:', error);
        alert(tr('댓글을 삭제할 수 없습니다. Firebase 보안 규칙을 확인해 주세요.'));
        deleteButton.disabled = false;
    }
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

/* =========================
   8) 관리자 로그인 / 로그아웃
========================= */

// Firebase 로그인 상태가 달라질 때마다 화면을 갱신합니다.
// Firebase는 새로고침 후에도 로그인 정보를 복원할 수 있습니다.
function refreshAuthUI(user) {
    isAdmin = Boolean(user && user.uid === ADMIN_UID);
    commentBtn.disabled = !user || submitting;

    adminLoginBtn.hidden = isAdmin;
    adminStatus.hidden = !isAdmin;
    adminLogoutBtn.hidden = !isAdmin;

    // 이미 불러온 댓글을 다시 그리면, 관리자에겐 전체 댓글의 삭제 버튼이 보입니다.
    if (latestSnapshot) renderComments(latestSnapshot);
}

// '관리자 로그인' 버튼 클릭 → 이메일/비밀번호 입력창 열기
adminLoginBtn.addEventListener('click', function() {
    adminError.hidden = true;
    adminError.textContent = '';
    adminPassword.value = '';
    adminDialog.showModal();
    adminEmail.focus();
});
adminCloseBtn.addEventListener('click', function() {
    adminDialog.close();
});

// 로그인 양식을 제출하면 Firebase Authentication으로 인증합니다.
adminLoginForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // 새로고침 없이 JavaScript에서 처리
    adminError.hidden = true;
    adminSubmitBtn.disabled = true;
    try {
        await signInWithEmailAndPassword(auth, adminEmail.value.trim(), adminPassword.value);
        // 계정 로그인이 성공해도 등록된 관리자 UID인지 한 번 더 확인합니다.
        if (auth.currentUser?.uid !== ADMIN_UID) {
            // 관리자 아닌 계정은 즉시 로그아웃 후 익명 방문자로 돌아갑니다.
            await signOut(auth); // onAuthStateChanged가 방문자 익명 로그인을 다시 진행합니다.
            throw new Error('NOT_ADMIN_ACCOUNT');
        }
        adminPassword.value = ''; // 비밀번호 입력칸 초기화
        adminDialog.close();
    } catch (error) {
        console.error('관리자 로그인 실패:', error.code || error.message);
        adminError.textContent = error.message === 'NOT_ADMIN_ACCOUNT'
            ? tr('등록된 관리자 계정이 아닙니다. UID 설정을 확인하세요.')
            : tr('로그인할 수 없습니다. 이메일·비밀번호·Firebase 인증 설정을 확인해 주세요.');
        adminError.hidden = false;
    } finally {
        adminSubmitBtn.disabled = false;
    }
});

// 관리자 로그아웃 후 일반 익명 방문자 상태로 돌아갑니다.
adminLogoutBtn.addEventListener('click', async function() {
    adminLogoutBtn.disabled = true;
    try {
        await signOut(auth); // onAuthStateChanged 안에서 익명 로그인 자동 진행
    } catch (error) {
        console.error('로그아웃/익명 로그인 실패:', error);
        alert(tr('인증 전환에 실패했습니다. 페이지를 새로고침해 주세요.'));
    } finally {
        adminLogoutBtn.disabled = false;
    }
});

/*
   9) Firebase 시작
   - 로그인 상태 추적: onAuthStateChanged()
   - 로그인하지 않았다면 익명 방문자 계정을 발급
   - 실시간 댓글 조회: onSnapshot()
*/
function start() {
    onAuthStateChanged(auth, async function(user) {
        refreshAuthUI(user);
        if (!user) {
            // 최초 접속한 방문자는 자동으로 익명 로그인합니다.
            // 이미 관리자 로그인이 저장되어 있으면 익명 로그인으로 덮어쓰지 않습니다.
            try {
                await signInAnonymously(auth);
            } catch (error) {
                console.error('익명 로그인 실패:', error);
            }
        }
    });

    // 댓글은 공개 방명록이므로 로그인 완료 전에도 조회할 수 있습니다.
    const q = query(commentsRef, orderBy('createdAt', 'desc'));
    onSnapshot(q, renderComments, function(error) {
        console.error('댓글 조회 실패:', error);
        emptyMessage.dataset.loadError = 'true';
        emptyMessage.textContent = tr('댓글을 불러올 수 없습니다. Firestore 보안 규칙을 확인해 주세요.');
        emptyMessage.style.display = 'block';
    });
}

// 언어가 바뀌어도 댓글 본문(방문자가 쓴 원문)은 바꾸지 않고,
// 버튼·날짜·상태 문구만 다시 표시합니다.
document.addEventListener('sr-language-change', function() {
    if (latestSnapshot) renderComments(latestSnapshot);
    if (emptyMessage.dataset.loadError === 'true') {
        emptyMessage.textContent = tr('댓글을 불러올 수 없습니다. Firestore 보안 규칙을 확인해 주세요.');
    }
});

// 페이지를 열면 인증 상태와 실시간 댓글 조회를 시작합니다.
start();

"""원래 자기소개 화면을 바꾸지 않고 기능만 추가하는 도구.

이전 통합판으로 index.html을 덮어썼다면 Git의 이전 원본 HTML을 찾습니다.
원본을 찾지 못하면 수정하지 않고 중단하며 기존 파일은 보존합니다.
"""
from pathlib import Path
from datetime import datetime
import re
import shutil
import subprocess

HERE = Path(__file__).resolve().parent
INDEX = HERE / "index.html"
NEW_FILES = [
    HERE / "css" / "dashboard.css", HERE / "css" / "quiz.css",
    HERE / "js" / "dashboard.js", HERE / "js" / "quiz.js",
    HERE / "quiz.html", HERE / "추가_기능_영역.html",
]


def old_ui_is_present(html):
    """원본에 필수였던 링크와 콘텐츠를 느슨하게 확인합니다."""
    required = ["style.css", "todo.css", "comment.css", "scripts.js", "firebase.js",
                "todoInput", "commentInput", "themeBtn"]
    return all(x in html for x in required)


def replaced_by_previous_zip(html):
    """문제를 일으킨 통합판/이미 패치된 화면 구별."""
    return any(x in html for x in ['id="calendarSection"', 'id="weatherSection"',
                                    'mp-features-start', 'dashboard.js'])


def git_previous_original():
    """Git 이력이 있으면 원래 인터페이스가 남아 있는 최근 커밋을 선택."""
    root_result = subprocess.run(
        ["git", "-C", str(HERE), "rev-parse", "--show-toplevel"],
        capture_output=True, text=True)
    if root_result.returncode != 0:
        return None
    root = Path(root_result.stdout.strip()).resolve()
    try:
        relative = INDEX.resolve().relative_to(root).as_posix()
    except ValueError:
        return None

    commits = subprocess.run(
        ["git", "-C", str(root), "log", "--format=%H", "--follow", "--", relative],
        capture_output=True, text=True)
    if commits.returncode != 0:
        return None

    for sha in commits.stdout.splitlines():
        content = subprocess.run(
            ["git", "-C", str(root), "show", f"{sha}:{relative}"],
            capture_output=True)
        if content.returncode != 0:
            continue
        candidate = content.stdout.decode("utf-8-sig", errors="replace")
        if old_ui_is_present(candidate) and not replaced_by_previous_zip(candidate):
            return candidate, sha[:12]
    return None


def inject_study_names(html):
    """원래 기술 목록이 있으면 그 안에만 두 항목을 추가합니다.

    기존 목록이 없더라도 원래 구조는 재작성하지 않습니다.
    """
    study_match = re.search(r'<(?:div|ul)\b[^>]*class=["\'][^"\']*\bskills\b[^"\']*["\'][^>]*>', html, re.I)
    if study_match:
        # 태그 기반 위치를 찾되 원래 HTML은 건드리지 않고 삽입만 함.
        opener = study_match.group()
        tag = re.match(r'<(\w+)', opener).group(1).lower()
        nesting = 1
        end_at = None
        for token in re.finditer(fr'</?{tag}\b[^>]*>', html[study_match.end():], re.I):
            if token.group().startswith('</'):
                nesting -= 1
                if nesting == 0:
                    end_at = study_match.end() + token.start()
                    break
            else:
                nesting += 1
        if end_at is not None:
            old = html[study_match.end():end_at]
            addition = ''
            for name, info in [('JavaScript', '브라우저의 동작을 만드는 언어'), ('PHP', '서버에서 실행되는 언어')]:
                if not re.search(r'>\s*' + name + r'\s*<', old, re.I):
                    if tag == 'ul':
                        addition += f'\n<!-- 기존 목록에 새 항목만 추가 -->\n<li>{name}</li>'
                    else:
                        addition += f'\n<!-- 기존 스킬 스타일을 활용한 새 항목 -->\n<div class="skill" tabindex="0">{name}<span class="tooltip">{info}</span></div>'
            return html[:end_at] + addition + html[end_at:]

    # skills 클래스가 없는 경우 기존 공부 섹션의 제목 바로 아래에 텍스트만 추가
    heading = re.search(r'<h([1-3])\b[^>]*>[^<]*(?:공부|기술|스터디)[^<]*</h\1>', html, re.I)
    if heading:
        extra = '\n<!-- 신규 학습 기술 안내: 기존 영역은 보존 -->\n<p>추가로 공부 중: JavaScript · PHP</p>'
        return html[:heading.end()] + extra + html[heading.end():]

    # 위치를 특정하기 어려울 때 억지로 영역을 수정하지 않음.
    print('안내: 기존 기술 섹션을 찾지 못해 기술 목록 자체는 건드리지 않았습니다.')
    return html


def main():
    # 필요한 신규 파일을 모두 검사하고 원래 파일의 일부가 없어도 중단.
    missing = [str(p.relative_to(HERE)) for p in NEW_FILES if not p.is_file()]
    if missing or not INDEX.is_file():
        raise SystemExit(f'파일이 부족합니다. 현재 위치: {HERE}\n누락: {missing or ["index.html"]}')

    current = INDEX.read_text(encoding='utf-8-sig')
    if 'mp-features-start' in current and 'dashboard.js' in current:
        raise SystemExit('이미 기능 추가 패치가 적용된 HTML입니다. 중복으로 적용하지 않습니다.')

    if replaced_by_previous_zip(current):
        found = git_previous_original()
        if not found:
            raise SystemExit(
                '이전 통합판이 index.html을 덮어쓴 상태입니다.\n'
                'Git 기록에서 원래 index.html을 자동으로 찾지 못했습니다.\n'
                '변경은 하지 않았으니 이전 index.html 파일을 복원한 후 다시 실행하세요.')
        original, source_commit = found
        print(f'원래 디자인이 담긴 Git 커밋을 발견했습니다: {source_commit}')
    else:
        original = current
        if not old_ui_is_present(original):
            raise SystemExit(
                '원래 페이지의 CSS/JS/댓글/Todo 항목을 확인할 수 없습니다.\n'
                '잘못된 파일에 적용하지 않도록 중단합니다.')

    # 방어적으로 기존 코드를 그대로 두고 새 기능 코드만 추가.
    html = inject_study_names(original)
    stylesheet = '\n<!-- [새 기능] 원래 CSS를 변경하지 않는 독립 스타일 -->\n<link rel="stylesheet" href="css/dashboard.css">\n'
    html = re.sub(r'</head\s*>', stylesheet + '</head>', html, count=1, flags=re.I)
    fragment = (HERE / '추가_기능_영역.html').read_text(encoding='utf-8')
    fragment = '\n<!-- mp-features-start -->\n' + fragment + '\n<!-- mp-features-end -->\n'

    # 원래 JS가 새 기능 HTML보다 먼저 실행되지 않도록 body 마지막의 스크립트 앞에 삽입.
    body_open = re.search(r'<body\b[^>]*>', html, re.I)
    body_close = re.search(r'</body\s*>', html, re.I)
    if not body_open or not body_close:
        raise SystemExit('body 영역을 찾지 못했습니다. HTML은 수정하지 않았습니다.')
    after_body = html[body_open.end():body_close.start()]
    scripts = list(re.finditer(r'<script\b[^>]*>', after_body, re.I))
    insert_at = body_open.end() + scripts[0].start() if scripts else body_close.start()
    html = html[:insert_at] + fragment + html[insert_at:]
    script = '\n<!-- [새 기능] 기존 scripts.js, firebase.js를 유지하고 추가 실행 -->\n<script src="js/dashboard.js"></script>\n'
    html = re.sub(r'</body\s*>', script + '</body>', html, count=1, flags=re.I)

    # 파일 변경 전 반드시 원본 백업 생성.
    backup = INDEX.with_name(f'index.적용전백업_{datetime.now():%Y%m%d_%H%M%S}.html')
    shutil.copy2(INDEX, backup)
    INDEX.write_text(html, encoding='utf-8')
    print('성공: 기존 디자인 HTML 구조를 그대로 사용하고 신규 기능 영역만 추가했습니다.')
    print(f'현재 작업 파일의 백업: {backup.name}')
    if replaced_by_previous_zip(current):
        print('참고: 현재의 깨진 HTML 대신 Git에서 찾은 이전 원본 HTML을 기준으로 만들었습니다.')


if __name__ == '__main__':
    main()

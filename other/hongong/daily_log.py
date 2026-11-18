from datetime import datetime
from pathlib import Path

# 오늘 날짜 가져오기
today = datetime.now().strftime("%Y-%m-%d")

# 공부 기록을 저장할 폴더
folder = Path("daily_logs")
folder.mkdir(exist_ok=True)

# 오늘 날짜로 Markdown 파일 생성
file = folder / f"{today}.md"

# 이미 기록이 있으면 덮어쓰지 않음
if not file.exists():
    file.write_text(
        f"# {today} 공부 기록\n\n"
        "## 오늘 배운 내용\n\n"
        "## 실습 코드\n\n"
        "## 어려웠던 점\n",
        encoding="utf-8"
    )
    print(f"{today} 공부 기록 생성 완료!")
else:
    print("오늘 공부 기록이 이미 존재합니다.")
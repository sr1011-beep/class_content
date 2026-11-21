
from datetime import datetime, timedelta
from pathlib import Path

# 현재 날짜와 시간
now = datetime.now()
today = now.strftime("%Y-%m-%d")
current_time = now.strftime("%H:%M")

# 공부 기록 저장 폴더
folder = Path("daily_logs")
folder.mkdir(exist_ok=True)

# 오늘 날짜의 Markdown 파일
file = folder / f"{today}.md"

# 파일이 없으면 새로 생성
if not file.exists():
    file.write_text(
        f"# 📚 {today} 공부 기록\n\n"
        "## 오늘의 공부 일지\n\n",
        encoding="utf-8"
    )
    print("새로운 공부 기록 파일을 생성했습니다!")
else:
    print("기존 공부 기록에 내용을 추가합니다.")

# 사용자에게 공부 내용 입력받기
print("\n===== 오늘의 공부 기록 =====")

subject = input("공부한 과목: ")
content = input("오늘 배운 내용: ")
practice = input("실습한 코드 또는 활동: ")
difficulty = input("어려웠던 점: ")
tomorrow = input("내일 공부할 내용: ")

# 공부 시간 입력
while True:
    try:
        study_time = int(input("공부 시간(분): "))
        if study_time < 0:
            print("0분 이상 입력해주세요.")
            continue
        break
    except ValueError:
        print("숫자로 입력해주세요.")

# 기록할 내용
log = (
    f"### 🕒 {current_time} 공부 기록\n\n"
    f"- **과목:** {subject}\n"
    f"- **공부 시간:** {study_time}분\n\n"
    f"**오늘 배운 내용**\n\n{content}\n\n"
    f"**실습 내용**\n\n{practice}\n\n"
    f"**어려웠던 점**\n\n{difficulty}\n\n"
    f"**내일 공부할 내용**\n\n{tomorrow}\n\n"
    "---\n\n"
)

# 기존 파일에 내용 추가
with file.open("a", encoding="utf-8") as f:
    f.write(log)

print(f"\n✅ {today} 공부 기록 저장 완료!")
print(f"📂 저장 위치: {file.resolve()}")

# 최근 7일간 기록 확인
print("\n===== 최근 7일간 공부 기록 =====")

for i in range(7):
    date = (now - timedelta(days=i)).strftime("%Y-%m-%d")
    log_file = folder / f"{date}.md"

    if log_file.exists():
        print(f"✅ {date} : 공부 완료")
    else:
        print(f"❌ {date} : 기록 없음")

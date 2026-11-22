# 최근 7일간 공부 시간 통계
print("\n===== 📊 공부 통계 =====")

total_minutes = 0
study_days = 0

for i in range(7):
    date = (now - timedelta(days=i)).strftime("%Y-%m-%d")
    log_file = folder / f"{date}.md"

    if log_file.exists():
        study_days += 1

        content = log_file.read_text(encoding="utf-8")

        for line in content.splitlines():
            if line.startswith("- **공부 시간:**"):
                minutes = int(
                    line.split("**공부 시간:**")[1]
                    .replace("분", "")
                    .strip()
                )
                total_minutes += minutes

# 평균 공부 시간
average = total_minutes / 7

print(f"📅 최근 7일 공부한 날: {study_days}일")
print(f"⏱️ 총 공부 시간: {total_minutes // 60}시간 {total_minutes % 60}분")
print(f"📈 하루 평균 공부 시간: {average:.1f}분")

# 연속 공부 일수 계산
streak = 0
check_date = now

while True:
    date = check_date.strftime("%Y-%m-%d")
    check_file = folder / f"{date}.md"

    if check_file.exists():
        streak += 1
        check_date -= timedelta(days=1)
    else:
        break

print(f"🔥 현재 연속 공부 일수: {streak}일")

# 공부 목표 달성 확인
goal = 120  # 하루 목표 120분

if total_minutes >= goal * 7:
    print("🏆 이번 주 공부 목표 달성!")
else:
    remaining = goal * 7 - total_minutes
    print(f"🎯 이번 주 목표까지 {remaining}분 남았습니다!")
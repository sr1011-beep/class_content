
from datetime import datetime, timedelta
from pathlib import Path

now = datetime.now()
folder = Path("daily_logs")

# 하루 공부 목표 (분)
goal = 120
period = 7


# 날짜별 공부 시간 가져오기
def get_study_minutes(date):
    log_file = folder / f"{date:%Y-%m-%d}.md"

    if not log_file.exists():
        return 0

    total = 0
    content = log_file.read_text(encoding="utf-8")

    for line in content.splitlines():
        if line.startswith("- **공부 시간:**"):
            try:
                minutes = int(
                    line.split("**공부 시간:**")[1]
                    .replace("분", "")
                    .strip()
                )

                if minutes > 0:
                    total += minutes

            except ValueError:
                continue

    return total


# 공부 시간 출력 형식
def format_time(minutes):
    hours, mins = divmod(minutes, 60)
    return f"{hours}시간 {mins}분"


# 최근 7일간 공부 통계
print("\n===== 📊 공부 통계 =====")

daily_stats = {}

for i in range(period - 1, -1, -1):
    date = now - timedelta(days=i)
    daily_stats[date.strftime("%Y-%m-%d")] = get_study_minutes(date)


# 기본 통계 계산
total_minutes = sum(daily_stats.values())
study_days = sum(1 for m in daily_stats.values() if m > 0)
average = total_minutes / period

study_average = total_minutes / study_days if study_days else 0

print(f"📅 공부한 날: {study_days}/{period}일")
print(f"⏱️ 총 공부 시간: {format_time(total_minutes)}")
print(f"📈 하루 평균: {average:.1f}분")
print(f"📚 공부한 날 평균: {study_average:.1f}분")


# 날짜별 공부 현황
print("\n===== 📅 날짜별 공부 현황 =====")

for date, minutes in daily_stats.items():

    rate = minutes / goal
    filled = min(int(rate * 20), 20)

    bar = "█" * filled + "░" * (20 - filled)
    status = "✅" if minutes >= goal else "❌"

    print(f"{date} | {bar} | {minutes:3}분 {status}")


# 가장 많이 공부한 날
if total_minutes > 0:
    best_day = max(daily_stats, key=daily_stats.get)
    best_minutes = daily_stats[best_day]

    print("\n===== 🥇 최고 기록 =====")
    print(f"날짜: {best_day}")
    print(f"공부 시간: {format_time(best_minutes)}")


# 연속 공부 일수
streak = 0
check_date = now

# 오늘 아직 공부하지 않았다면 어제부터 확인
if get_study_minutes(check_date) == 0:
    check_date -= timedelta(days=1)

while get_study_minutes(check_date) > 0:
    streak += 1
    check_date -= timedelta(days=1)

print(f"\n🔥 현재 연속 공부 일수: {streak}일")


# 공부 목표 달성률
weekly_goal = goal * period
achievement = total_minutes / weekly_goal * 100
remaining = max(weekly_goal - total_minutes, 0)

goal_days = sum(1 for m in daily_stats.values() if m >= goal)

print("\n===== 🎯 목표 달성 현황 =====")

print(f"하루 목표: {format_time(goal)}")
print(f"7일 목표: {format_time(weekly_goal)}")
print(f"목표 달성률: {achievement:.1f}%")
print(f"일일 목표 달성: {goal_days}/{period}일")

if total_minutes >= weekly_goal:
    print("🏆 최근 7일 공부 목표 달성!")
else:
    print(f"남은 공부 시간: {format_time(remaining)}")


# 오늘의 공부 현황
today_minutes = get_study_minutes(now)
today_remaining = max(goal - today_minutes, 0)

print("\n===== 📖 오늘의 공부 현황 =====")
print(f"오늘 공부 시간: {format_time(today_minutes)}")

if today_minutes >= goal:
    print("🎉 오늘의 공부 목표 달성!")
else:
    print(f"오늘 목표까지 {today_remaining}분 남았습니다!")

print("\n================================")

from datetime import datetime, timedelta, date
from pathlib import Path

# ==============================
# 기본 설정 (Hyperparameter)
# ==============================
GOAL = 120
PERIOD = 7
BAR_LENGTH = 20

folder = Path("daily_logs")
today = datetime.now().date()


# 공부 기록 불러오기
def load_study_logs():
    logs = {}

    if not folder.exists():
        print("⚠️ 공부 기록 폴더가 없습니다.")
        return logs

    for file in folder.glob("*.md"):

        try:
            log_date = date.fromisoformat(file.stem)

            if log_date > today:
                continue

            content = file.read_text(encoding="utf-8")

        except (ValueError, OSError, UnicodeError):
            print(f"⚠️ 파일 읽기 실패: {file.name}")
            continue

        total = 0

        for line in content.splitlines():

            if line.startswith("- **공부 시간:**"):

                try:
                    minutes = int(
                        line.split("**공부 시간:**", 1)[1]
                        .replace("분", "")
                        .strip()
                    )

                    if minutes > 0:
                        total += minutes

                except ValueError:
                    continue

        logs[log_date] = total

    return logs


# 시간 출력 형식
def format_time(minutes):
    hours, mins = divmod(minutes, 60)
    return f"{hours}시간 {mins}분"


# 출력 구분선
def section(title):
    print(f"\n{'=' * 40}")
    print(title)
    print("=" * 40)


# 목표 달성률 그래프
def make_bar(minutes):
    rate = minutes / GOAL

    filled = min(int(rate * BAR_LENGTH), BAR_LENGTH)

    return "█" * filled + "░" * (BAR_LENGTH - filled)


# 특정 기간의 공부 기록 가져오기
def get_period_logs(logs, end_date, period):

    return {
        end_date - timedelta(days=i):
        logs.get(end_date - timedelta(days=i), 0)

        for i in range(period - 1, -1, -1)
    }


# 현재 연속 공부 일수
def get_current_streak(logs):

    streak = 0
    check_date = today

    # 오늘 공부하지 않았다면 어제부터 확인
    if logs.get(check_date, 0) == 0:
        check_date -= timedelta(days=1)

    while logs.get(check_date, 0) > 0:
        streak += 1
        check_date -= timedelta(days=1)

    return streak


# 최장 연속 공부 일수
def get_longest_streak(logs):

    study_dates = sorted(
        d for d, minutes in logs.items()
        if minutes > 0
    )

    longest = 0
    current = 0
    previous = None

    for d in study_dates:

        if previous and d - previous == timedelta(days=1):
            current += 1
        else:
            current = 1

        longest = max(longest, current)
        previous = d

    return longest


# ==============================
# 메인 프로그램
# ==============================
def main():

    # 파일을 한 번씩만 읽어 저장
    logs = load_study_logs()

    daily_stats = get_period_logs(logs, today, PERIOD)

    previous_stats = get_period_logs(
        logs,
        today - timedelta(days=PERIOD),
        PERIOD
    )

    total_minutes = sum(daily_stats.values())
    previous_minutes = sum(previous_stats.values())

    study_days = sum(
        1 for m in daily_stats.values() if m > 0
    )

    average = total_minutes / PERIOD

    study_average = (
        total_minutes / study_days if study_days else 0
    )

    # 기본 공부 통계
    section(f"📊 최근 {PERIOD}일 공부 통계")

    print(f"📅 공부한 날: {study_days}/{PERIOD}일")
    print(f"⏱️ 총 공부 시간: {format_time(total_minutes)}")
    print(f"📈 하루 평균: {average:.1f}분")
    print(f"📚 공부한 날 평균: {study_average:.1f}분")


    # 날짜별 공부 현황
    section("📅 날짜별 공부 현황")

    weekdays = ["월", "화", "수", "목", "금", "토", "일"]

    for d, minutes in daily_stats.items():

        rate = minutes / GOAL * 100
        bar = make_bar(minutes)
        weekday = weekdays[d.weekday()]

        if minutes >= GOAL:
            status = "✅"
        elif minutes > 0:
            status = "🟡"
        else:
            status = "❌"

        print(
            f"{d} ({weekday}) | {bar} | "
            f"{minutes:3}분 | {rate:6.1f}% {status}"
        )


    # 지난 기간과 비교
    section("📈 이전 기간 대비 성장률")

    difference = total_minutes - previous_minutes

    print(f"이전 {PERIOD}일: {format_time(previous_minutes)}")
    print(f"최근 {PERIOD}일: {format_time(total_minutes)}")
    print(f"공부 시간 변화: {difference:+d}분")

    if previous_minutes > 0:

        growth = difference / previous_minutes * 100

        if growth > 0:
            print(f"🚀 공부 시간 {growth:.1f}% 증가")

        elif growth < 0:
            print(f"📉 공부 시간 {abs(growth):.1f}% 감소")

        else:
            print("➖ 이전 기간과 동일")

    else:
        print("이전 공부 기록이 없어 증감률 계산 불가")


    # 최고 공부 기록
    section("🥇 최고 기록")

    if total_minutes > 0:

        best_day = max(daily_stats, key=daily_stats.get)

        print(f"날짜: {best_day}")
        print(
            f"공부 시간: "
            f"{format_time(daily_stats[best_day])}"
        )

    else:
        print("공부 기록이 없습니다.")


    # 연속 공부 기록
    section("🔥 연속 공부 기록")

    current_streak = get_current_streak(logs)
    longest_streak = get_longest_streak(logs)

    print(f"현재 연속 공부: {current_streak}일")
    print(f"최장 연속 공부: {longest_streak}일")


    # 목표 달성 현황
    section("🎯 목표 달성 현황")

    period_goal = GOAL * PERIOD

    achievement = total_minutes / period_goal * 100

    remaining = max(period_goal - total_minutes, 0)

    goal_days = sum(
        1 for m in daily_stats.values()
        if m >= GOAL
    )

    print(f"하루 목표: {format_time(GOAL)}")
    print(f"{PERIOD}일 목표: {format_time(period_goal)}")
    print(f"목표 달성률: {achievement:.1f}%")
    print(f"일일 목표 달성: {goal_days}/{PERIOD}일")

    if total_minutes >= period_goal:
        print("🏆 공부 목표 달성!")

    else:
        print(f"목표 부족 시간: {format_time(remaining)}")


    # 오늘의 공부 현황
    section("📖 오늘의 공부 현황")

    today_minutes = logs.get(today, 0)
    today_remaining = max(GOAL - today_minutes, 0)

    print(f"공부 시간: {format_time(today_minutes)}")
    print(f"달성률: {today_minutes / GOAL * 100:.1f}%")
    print(make_bar(today_minutes))

    if today_minutes >= GOAL:
        print("🎉 오늘의 공부 목표 달성!")

    else:
        print(f"목표까지 {today_remaining}분 남았습니다.")


    # 전체 누적 공부 기록
    section("🏅 전체 누적 공부 기록")

    all_minutes = sum(logs.values())

    all_days = sum(
        1 for m in logs.values() if m > 0
    )

    print(f"누적 공부 시간: {format_time(all_minutes)}")
    print(f"전체 공부 일수: {all_days}일")

    print("\n" + "=" * 40)


if __name__ == "__main__":
    main()
/* =========================================================
   자기소개 페이지 신규 기능: 캘린더 / D-day / 현재 위치 날씨
   기존 scripts.js 및 firebase.js와 독립적으로 동작합니다.
========================================================= */
(function () {
    "use strict";

    // 다른 페이지와 겹치지 않는 localStorage 키 사용
    const DDAY_STORAGE_KEY = "mypage_ddays_v1";
    const THEME_STORAGE_KEY = "mypage_theme_v1";

    // 공통: ID로 DOM 요소 찾기
    const $ = (id) => document.getElementById(id);

    /* -------------------------
       1. 날짜 / 달력 유틸리티
    ------------------------- */

    // 날짜를 YYYY-MM-DD 형태로 변환합니다. toISOString()은 UTC 기준이므로 여기서는 사용하지 않습니다.
    function dateKey(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    // 실제로 존재하는 날짜인지도 검사합니다. 예: 2026-02-31은 유효하지 않습니다.
    function isValidDate(key) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(key)) return false;
        const [year, month, day] = key.split("-").map(Number);
        const checked = new Date(Date.UTC(year, month - 1, day));
        return checked.getUTCFullYear() === year &&
            checked.getUTCMonth() + 1 === month && checked.getUTCDate() === day;
    }

    // 달력 날짜끼리 비교할 때는 날짜 부분만 UTC 정오가 아닌 UTC 자정으로 환산해 일수 차이를 계산합니다.
    // 브라우저의 서머타임 변화에도 'D-1' 계산이 흔들리지 않도록 합니다.
    function dayNumber(key) {
        const [year, month, day] = key.split("-").map(Number);
        return Date.UTC(year, month - 1, day) / 86400000;
    }

    // 오늘을 기준으로 미래는 D-n, 과거는 D+n, 오늘이면 D-DAY
    function ddayText(targetKey) {
        const remaining = dayNumber(targetKey) - dayNumber(dateKey(new Date()));
        if (remaining === 0) return "D-DAY";
        return remaining > 0 ? `D-${remaining}` : `D+${Math.abs(remaining)}`;
    }

    // 달력에서 보고 있는 년/월. 월은 JavaScript의 0~11 체계를 사용합니다.
    let viewYear = new Date().getFullYear();
    let viewMonth = new Date().getMonth();
    let selectedKey = dateKey(new Date());
    let lastTodayKey = selectedKey;

    /* -------------------------
       2. D-day 저장 / 읽기
    ------------------------- */
    function loadDdays() {
        try {
            const stored = JSON.parse(localStorage.getItem(DDAY_STORAGE_KEY) || "[]");
            // 저장 데이터가 훼손되어도 페이지가 멈추지 않도록 형식을 검사합니다.
            return Array.isArray(stored) ? stored.filter((item) =>
                item && typeof item.id === "string" && typeof item.title === "string" && isValidDate(item.date)
            ) : [];
        } catch (error) {
            console.warn("D-day 저장 내용 읽기 실패:", error);
            return [];
        }
    }

    let ddays = loadDdays();

    function saveDdays() {
        try {
            localStorage.setItem(DDAY_STORAGE_KEY, JSON.stringify(ddays));
        } catch (error) {
            console.error("D-day 저장 실패:", error);
            alert("브라우저 저장 공간을 사용할 수 없어 D-day 저장에 실패했습니다.");
        }
    }

    // 저장된 D-day 표시. 사용자 입력 문자열은 textContent로만 넣어 HTML 주입을 방지합니다.
    function renderDdays() {
        const list = $("ddayList");
        list.replaceChildren();

        if (ddays.length === 0) {
            const empty = document.createElement("li");
            empty.className = "dday-empty";
            empty.textContent = "등록된 D-day가 없어요. 먼저 일정을 추가해 보세요!";
            list.appendChild(empty);
            return;
        }

        // 날짜 오름차순으로 정렬하고 새 DOM 요소를 만들어 출력합니다.
        [...ddays].sort((a, b) => a.date.localeCompare(b.date)).forEach((item) => {
            const li = document.createElement("li");
            li.className = "dday-item";

            const main = document.createElement("div");
            main.className = "dday-item-main";
            const name = document.createElement("span");
            name.className = "dday-item-name";
            name.textContent = item.title;
            const date = document.createElement("span");
            date.className = "dday-item-date";
            date.textContent = item.date;
            main.append(name, date);

            const actions = document.createElement("div");
            actions.className = "dday-item-actions";
            const badge = document.createElement("span");
            badge.className = "dday-badge";
            badge.textContent = ddayText(item.date);
            const remove = document.createElement("button");
            remove.type = "button";
            remove.className = "dday-delete";
            remove.textContent = "×";
            remove.setAttribute("aria-label", `${item.title} 일정 삭제`);
            remove.addEventListener("click", () => {
                // 삭제할 ID를 제외한 새 배열을 저장하고 화면을 다시 그립니다.
                ddays = ddays.filter((saved) => saved.id !== item.id);
                saveDdays();
                renderDdays();
                renderCalendar();
            });
            actions.append(badge, remove);
            li.append(main, actions);
            list.appendChild(li);
        });
    }

    /* -------------------------
       3. 달력 그리기 / 날짜 선택
    ------------------------- */
    function renderCalendar() {
        const container = $("calendarDays");
        container.replaceChildren();
        $("calendarMonth").textContent = `${viewYear}년 ${viewMonth + 1}월`;
        $("selectedDateInfo").textContent = `선택한 날짜: ${selectedKey}`;

        // 이번 달 1일의 요일(일=0), 지난달 날짜를 포함해 42칸(6주)을 그립니다.
        const startWeekday = new Date(viewYear, viewMonth, 1).getDay();
        const today = dateKey(new Date());
        for (let offset = 0; offset < 42; offset += 1) {
            const date = new Date(viewYear, viewMonth, offset - startWeekday + 1);
            const key = dateKey(date);
            const count = ddays.filter((item) => item.date === key).length;
            const button = document.createElement("button");
            button.type = "button";
            button.className = "calendar-day";
            button.setAttribute("aria-label", `${key}${count ? `, 일정 ${count}개` : ""}`);
            if (date.getMonth() !== viewMonth) button.classList.add("outside-month");
            if (key === today) button.classList.add("is-today");
            if (key === selectedKey) {
                button.classList.add("is-selected");
                button.setAttribute("aria-pressed", "true");
            } else {
                button.setAttribute("aria-pressed", "false");
            }

            const number = document.createElement("span");
            number.className = "day-number";
            number.textContent = date.getDate();
            button.appendChild(number);

            // 해당 날짜에 D-day가 있을 때만 표시를 추가합니다.
            if (count > 0) {
                const marker = document.createElement("span");
                marker.className = "event-dots";
                marker.textContent = `● ${count}개`;
                button.appendChild(marker);
            }

            button.addEventListener("click", () => {
                selectedKey = key;
                viewYear = date.getFullYear();
                viewMonth = date.getMonth();
                $("ddayDate").value = key;
                renderCalendar();
            });
            container.appendChild(button);
        }
    }

    // D-day 추가 버튼 클릭 또는 Enter 제출 처리
    $("ddayForm").addEventListener("submit", (event) => {
        event.preventDefault();
        const title = $("ddayTitle").value.trim();
        const date = $("ddayDate").value;
        if (!title || !isValidDate(date)) {
            alert("일정 이름과 올바른 날짜를 입력해 주세요.");
            return;
        }

        // Date.now()와 Math.random()을 조합해 간단한 고유 식별자를 만듭니다.
        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        ddays.push({ id, title, date });
        saveDdays();
        $("ddayTitle").value = "";
        selectedKey = date;
        const [year, month] = date.split("-").map(Number);
        viewYear = year;
        viewMonth = month - 1;
        renderDdays();
        renderCalendar();
    });

    // 이전 달 / 다음 달 / 오늘 버튼 클릭
    $("prevMonth").addEventListener("click", () => {
        const date = new Date(viewYear, viewMonth - 1, 1);
        viewYear = date.getFullYear(); viewMonth = date.getMonth();
        renderCalendar();
    });
    $("nextMonth").addEventListener("click", () => {
        const date = new Date(viewYear, viewMonth + 1, 1);
        viewYear = date.getFullYear(); viewMonth = date.getMonth();
        renderCalendar();
    });
    $("todayMonth").addEventListener("click", () => {
        const today = new Date();
        viewYear = today.getFullYear(); viewMonth = today.getMonth();
        selectedKey = dateKey(today);
        $("ddayDate").value = selectedKey;
        renderCalendar();
    });

    /* -------------------------
       4. 브라우저 현재 위치 / 날씨 API
    ------------------------- */

    // Open-Meteo의 WMO 날씨 코드 중 대표적인 값을 한국어/이모지로 표현
    function describeWeather(code, isDay) {
        if (code === 0) return ["맑음", isDay ? "☀️" : "🌙"];
        if (code === 1 || code === 2) return ["대체로 맑음", isDay ? "🌤️" : "🌙"];
        if (code === 3) return ["흐림", "☁️"];
        if ([45, 48].includes(code)) return ["안개", "🌫️"];
        if ([51, 53, 55, 56, 57].includes(code)) return ["이슬비", "🌦️"];
        if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return ["비", "🌧️"];
        if ([71, 73, 75, 77, 85, 86].includes(code)) return ["눈", "❄️"];
        if ([95, 96, 99].includes(code)) return ["뇌우", "⛈️"];
        return ["날씨 정보", "🌤️"];
    }

    // Open-Meteo에 실제 좌표 기반 현재 날씨를 요청합니다.
    async function fetchWeather(latitude, longitude) {
        const params = new URLSearchParams({
            latitude: String(latitude),
            longitude: String(longitude),
            current: "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,is_day",
            timezone: "auto"
        });
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
        if (!response.ok) throw new Error(`날씨 서버 응답 오류: HTTP ${response.status}`);
        const data = await response.json();
        if (!data.current || typeof data.current.temperature_2m !== "number") {
            throw new Error("현재 날씨 데이터가 없습니다.");
        }
        return data;
    }

    // 위치 요청은 자동 실행하지 않고 사용자가 버튼을 눌렀을 때만 시작합니다.
    $("weatherButton").addEventListener("click", () => {
        const button = $("weatherButton");
        const status = $("weatherStatus");
        if (!navigator.geolocation) {
            status.textContent = "이 브라우저는 위치 정보를 지원하지 않아요.";
            return;
        }
        if (!window.isSecureContext) {
            status.textContent = "위치 정보는 HTTPS 또는 localhost에서 사용할 수 있어요.";
            return;
        }

        button.disabled = true;
        status.textContent = "브라우저에서 위치 정보를 확인하고 있어요...";
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    status.textContent = "현재 위치의 날씨를 불러오는 중...";
                    const data = await fetchWeather(position.coords.latitude, position.coords.longitude);
                    const current = data.current;
                    const [description, icon] = describeWeather(current.weather_code, Boolean(current.is_day));
                    $("weatherIcon").textContent = icon;
                    $("weatherTemp").textContent = `${current.temperature_2m}°C`;
                    $("weatherCondition").textContent = `내 위치 · ${description}`;
                    $("weatherFeels").textContent = `${current.apparent_temperature}°C`;
                    $("weatherHumidity").textContent = `${current.relative_humidity_2m}%`;
                    $("weatherWind").textContent = `${current.wind_speed_10m} km/h`;
                    $("weatherUpdated").textContent = `날씨 기준 시각: ${current.time.replace("T", " ")} (${data.timezone_abbreviation || data.timezone || "현지"})`;
                    $("weatherDetails").hidden = false;
                    status.textContent = "내 위치 기준 날씨를 불러왔어요.";
                } catch (error) {
                    console.error("날씨 API 호출 실패:", error);
                    status.textContent = "날씨를 불러오지 못했어요. 네트워크 연결을 확인하고 다시 시도해 주세요.";
                } finally {
                    button.disabled = false;
                }
            },
            (error) => {
                button.disabled = false;
                // 권한 거부, 위치 조회 불가, 타임아웃을 구분해 안내합니다.
                const messages = {
                    1: "위치 접근이 거부되었어요. 브라우저의 사이트 위치 권한을 확인해 주세요.",
                    2: "현재 위치를 확인할 수 없어요. 기기 위치 서비스를 확인해 주세요.",
                    3: "위치 조회 시간이 초과되었어요. 다시 시도해 주세요."
                };
                status.textContent = messages[error.code] || "위치 정보 조회 중 오류가 발생했어요.";
            },
            { enableHighAccuracy: false, timeout: 12000, maximumAge: 300000 }
        );
    });

    /* -------------------------
       5. 원래 다크모드와 다른 페이지의 테마 동기화
    ------------------------- */
    function applySavedTheme() {
        // 기존 scripts.js의 클릭 이벤트는 그대로 사용하고 현재 테마만 저장합니다.
        const saved = localStorage.getItem(THEME_STORAGE_KEY);
        if (saved === "dark") document.body.classList.add("dark");
        else if (saved === "light") document.body.classList.remove("dark");
        $("themeBtn").textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
    }
    $("themeBtn").addEventListener("click", () => {
        try {
            localStorage.setItem(THEME_STORAGE_KEY, document.body.classList.contains("dark") ? "dark" : "light");
        } catch (error) { console.warn("테마 저장 실패:", error); }
    });

    // 초기 화면 표시. 이후 날짜가 변경되면 D-day와 달력을 자동 갱신합니다.
    $("ddayDate").value = selectedKey;
    renderCalendar();
    renderDdays();
    applySavedTheme();
    setInterval(() => {
        const now = dateKey(new Date());
        if (now !== lastTodayKey) {
            lastTodayKey = now;
            renderCalendar();
            renderDdays();
        }
    }, 60000);
})();

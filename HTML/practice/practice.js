
// 서울의 위도와 경도를 이용해 현재 기온 요청
fetch("https://api.open-meteo.com/v1/forecast?latitude=37.5665&longitude=126.9780&current=temperature_2m")

    // 서버 응답을 JavaScript 객체로 변환
    .then(response => response.json())

    // 받아온 날씨 데이터 처리
    .then(data => {

        // 전체 데이터 콘솔에 출력
        console.log(data);

        // 현재 기온 가져오기
        const temperature = data.current.temperature_2m;

        // HTML의 result 요소에 현재 기온 표시
        document.getElementById("result").textContent =
            "서울 현재 기온: " + temperature + "°C";
    })

    // 오류 발생 시 콘솔에 출력
    .catch(error => {
        console.error("오류 발생:", error);
    });

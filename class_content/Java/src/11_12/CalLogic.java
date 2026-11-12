
// 화면에 입력된 계산식 전달받아서
// 실제 계산을 처리하기 위한 클래스

import java.util.StringTokenizer;

public class CalLogic {

    // 계산식을 문자열로 던져주면 계산결과를 리턴해주는 메소드 구현
    public int 계산하기(String str) {
        StringTokenizer t = new StringTokenizer(str, "+-*/", true);

        int result = 0;
        while (t.hasMoreTokens()) {   // 더 가져올 토큰이 있다면
            String temp = t.nextToken(); // 분리된 값 순서대로 가져오기

            switch (temp) {
                case "+":
                    result = result + Integer.parseInt(t.nextToken());
                    break;
                case "-":
                    result = result - Integer.parseInt(t.nextToken());
                    break;
                case "*":
                    result = result * Integer.parseInt(t.nextToken());
                    break;
                case "/":
                    result = result / Integer.parseInt(t.nextToken());
                    break;
                default: // 위 모든 케이스에 해당하지 않는다면 -> 숫자
                    result = result + Integer.parseInt(temp);
            }
        }
        return result;
    }
}
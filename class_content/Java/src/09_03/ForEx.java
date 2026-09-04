public class ForEx {

    public static void main(String args[]) {

        // 반복문 : 특정 작업을 반복 수행하기 위해 사용

        // 자바에서 반복문 사용을 위한 문법
        // for ( 변수초기화 ; 조건식 ; 증감식 ) {
        //      반복할 코드;
        // }

        for ( int i = 0 ; i < 10 ; i++ ) {
            System.out.println("ABC");
        }

        double result = 0;
        double x = 0.1; // 10진수 0.1 -> 이진수 바꾸면 얼마 ? 불가능
        for (int i = 0; i< 10; i++) {
            result = result + x;
        }
        System.out.println("result == " + result);

        // 1~10까지 누적해서 덧셈 후 결과값 출력
        int r = 1+2+3+4+5+6+7+8+9+10;
        System.out.println( r );

        //위 코드를 반복문( for )을 사용해서 결과값을 구할 수 있도록 변경

        int total = 0;
        for (int i = 1; i <= 1000; i++) {
            total += i; } {
        System.out.println(total);
        }
    }
}


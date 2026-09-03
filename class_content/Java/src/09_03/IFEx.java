public class IFEx {

    public static void main(String args[]) {
        // 제어문?
        // 특정된 조건 제어, 즉 판정을 위해 사용되는 문법
        int score =  89;
        //점수가 90점 이상인지 확인
        if ( score >= 90 ) {
            System.out.println("90점 이상입니다");
            System.out.println("그래서 학점은 A다");
        } else { // 조건을 만족하지 않으면
            System.out.println("90점 미만입니다");
            System.out.println("그래서 학점은 B인가?");;
        }

        // 자바 제어문 if 기본 문법
        // if ( 조건식 ) {
        // 조건식을 만족할 경우 실행구문
        // } else {
        // 조건식을 만족하지 않을 경우 실행구문
        //}

        //score 값에 따라 학점을 출력하도록 if문을 사용해 봅시다
        // 90점 이상 "A", 80점 이상 "B", 70점 이상 "C" 나머지는 전부 "F"

        score = 90;
        if ( score >= 90 ) {
            System.out.println("A");
        } else if ( score >= 80 ) {
            System.out.println("B");
        } else if ( score >= 70 ) {
            System.out.println("C");
        } else {
            System.out.println("F");
        }
        // if ~ else if ~ else if 가능

        // 자바에서 연산자
        // 산술연산자 : + - * / ++ -- += -=
        int x = 10;
//        x += 10; // x = x + 10;
//        x -= 10; // x = x - 10;
//        System.out.println( x+= 10);

        //x++;   // x = x + 1
        //x--;   // x = x - 1
//        System.out.println( x++ );
//        System.out.println( x );

        // 논리 연산자 : &, &&(and) , |, ||(or) , == (같다면) , != (다르다면)
        int k = 10;
        int j = 20;
        if ( k == 10 & j != 20 ) {
            System.out.println("둘 다 만족");
        }

        if ( k == 10 | j != 20 ) {
            System.out.println("둘중 하나만 만족");
        }

        if ( k > 100 && (j+=10) > 20 ) {
            System.out.println("&& 두개 사용");
        }
        System.out.println( j );




        }

    }



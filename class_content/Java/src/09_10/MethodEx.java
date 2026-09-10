// 자바에서는 함수(Function)를 메소드(Method)라고 부름

class MyMethod {
    // (1) 메소드 정의를 위한 기본 문법
    // 접근제한자 리턴형 메소드이름( 파라미터 ) { 코드 }
    // 접근제한자 : 누가 이 메소드를 쓸 수 있는가? (접근할수 있는가?)
    // => public / protected / default / private
    // 리턴형 : 메소드를 호출하고 나면 결과가 나올테고 그 결과가 어떤 값으로 리턴되는가?
    // => 기본자료형 / 객체형 (기본자료형 말고 나머지)
    // => void : 리턴값이 존재하지 않을 경우
    // 파라미터 : 메소드를 호출할 때 어떤 값을 넘겨줄건가를 규정

    public int add( int x , int y ) {
        int result = x + y;
        // 메소드의 리턴타입이 지정되어 있을 경우 "return" 문법을 사용해서 결과값 넘겨줄 것
        return result;
    }
    public void sub( int x , int y ) {
        int result = x - y;
        System.out.println(result);
    }
    public double add_2( double x , double y) {
        double result = x + y;
        return result;

    }
}

public class MethodEx {

    public static void main(String args[]) {
        // (2) 메소드 사용
        // 위에 만들어 놓은 메소드 사용
        // add() 메소드 메모리에 올려놓고 CPU에게 실행해줘 해야함
        // 자바에서는 메소드만 메모리에 올릴수는 없고
        // 클래스 단위로 메모리에 올리는게 가능
        // 그래서 add() 메소드가 포함되어 있는 MyMethod class를 통째로 메모리에 올림
        MyMethod m = new MyMethod(); //-> MyMethod 클래스는 메모리에 올리겠다
        int r = m.add(10, 20);
        System.out.println( r ) ;

        m.sub(20, 10);

        //실수 덧셈을 위한 메소드 추가 + 호출
        double r2 = m.add_2(0.1, 0.2);
        System.out.println( r2 ) ;

    }

}

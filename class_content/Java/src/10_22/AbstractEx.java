// 추상화 클래스(abstract class)

// 추상화 메소드(abstract method)

abstract class MyAbs {
    // 추상화 메소드 : 기능이 구현되어 있지 않은 메소드
    abstract public void printA();
}
class UseAbs extends MyAbs {
    //메소드 오버라이딩(method overriding)
    public void printA() {
        System.out.println("A");

    }
}

public class AbstractEx {
    public static void main(String args[]) {
        // new Myabs(); // 추상화 클래스는 객체화가 불가능
    }
}



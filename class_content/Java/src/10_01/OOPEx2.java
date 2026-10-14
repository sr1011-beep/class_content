class A{
    public A() {
        System.out.println("A 객체화됨");
    }
}

class B extends A{
    public B() {
        super();
    }
}


public class OOPEx2 {
    public static void main(String args[]){
//        A a = new A();
//        B b = new B();
//
//        A c = new B();  // 권장되는 코드
//        B d = new A();  // 불가능한 코드

        new B();

    }
}


// A a = new B();   // 가능
// B b = new A();   // 불가능 B클래스 주소만 가질수 있음 A클래스 주소를 가지지 못함
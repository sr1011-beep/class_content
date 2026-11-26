
class A {
    public void printA() {
        System.out.println("A");
    }
}
class B extends A{
    public void printA() {
        System.out.println("B클래스 안에 있는 printA");
    }
    public void printB() {
        System.out.println("B");
    }
}

public class OOPEx2 {
    public static void main(String args[]) {
        A a = new A();
        a.printA();

        B b = new B();
        b.printB();
        b.printA();

        A c = new B(); // 왜 이짓을 하나?
//            B d = new A;
    }
}

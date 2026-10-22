// 인터페이스 : 추상화 메소드와 상수로만 이루어짐

interface MyInter {
    final int x = 10;
    abstract public void printX();
}

    class UseIner implements MyInter {
        public void printX() {

    }

}



public class InterEx {
    public static void main(String args[]) {
        int x = 10;     // 변수 x
        x = 20;

        final int y = 10; // 상수 y
//        y = 20; // 상수라서 값 변경 불가능
    }
}

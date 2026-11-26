
    //다형성 : OOP 가장 중요한 특징

    class 동물 {
        public void cry() {

        }
    }
    class 강아지 extends 동물 {
        public void cry() {
            System.out.println("멍멍");
        }
    }
    class 고양이 extends 동물 {
        //method overriding
        public void cry() {
            System.out.println("야옹");
        }
    }

    class 동물농장게임화면 {
    public void 동물누르기( 동물 a ) {
        a.cry();
    }
}

public class OOPEx3 {
    public static void main(String args[]) {
        동물농장게임화면 u = new 동물농장게임화면();

        동물 a = new 동물();
        동물 a2 = new 고양이();
        동물 a3 = new 강아지();

        u.동물누르기( a );
        u.동물누르기( a2 );
        u.동물누르기( a3 );

    }
}

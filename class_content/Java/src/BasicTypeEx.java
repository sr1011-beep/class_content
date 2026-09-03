public class BasicTypeEx {

    public static void main(String args[]) {

        // 자바의 기본 자료형
        //(1) 정수형 : 정수형의 암묵적 default type은 int
        // byte(용량 1byte) - short(2byte) - int(4byte) - long(8byte)
        byte b = -128; // 1byte = 숫자 범위 -128 ~ +127
        // byte result = b + 1; // 안됨
        //short result = b + 1; // 안됨
        int result = b - 1; // 됨, 자바에서 정수타입 산술연산을 하면 int타입으로 간주

        //(2) 실수형 : 명시적으로 default형이 double
        float f = 0.1f; // float type은 default type이 아니므로 사용시 "f" "F"를 달아줘야함
        double d = 0.1;

        //(3) 문자형 : 문자 하나를 저장하기 위한 기본 자료형
        char c = 'A';
        char c2 = 66; //아스키코드표 상에 값으로 저장도 가능
        System.out.println( c );
        System.out.println( c2 );

        //(4) boolean형  : true / false 만 저장 가능
        boolean boo = true;
        boo = false;


    }

}

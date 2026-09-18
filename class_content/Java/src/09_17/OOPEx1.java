
// 객체지향형 프로그래밍 출발점
// 유지보수가 편리한 프로그래밍 출발점

class Person {
    private String name;
    public int age;

    // 멤버변수 초기화 하기 위한 생성자
    // 생성자 3개를 정의
    // (1) 아무런 입력을 받지 않는 생성자
    public Person() {
        this( "김길동", 20);
    }
    // (2) 나이, 이름 순으로 값을 받는 생성자
    public Person( int age, String name ) {
        this ( name , age ); // 파라미터 이름, 나이를 받는 생성자 호출
    }
    // (3) 이름, 나이 순으로 값을 받는 생성자
    public Person( String name, int age ) {
        this.name = name+"님";
        this.age = age;
    }

    public void setName( String n ) {
        name = n + "님";
    }
    public String getName( ) {
        return name;
    }
}

public class OOPEx1 {

    public static void main(String args[]) {

        // 다음 코드는 객체지향형 프로그램인가?
        // => 다음 코드는 유지보수 관리가 편한 프로그램인가?
        Person p1 = new Person();
        //p1.name = "김길동씨";  // 이건 OOP가 아님 -> 유지보수가 불편함
        p1.setName("김길동");       // 유지보수가 편해짐
        p1.age = 20;
        System.out.println( p1.getName() );
        System.out.println( p1.age );


        Person p2 = new Person();
        // p2.name = "박길동"+"씨";
        p2.setName("박길동");
        p2.age = 25;

        Person p3 = new Person();
        // p3.name = "홍길동"+"씨";
        p3.setName("홍길동");
        p3.age = 30;

    }

}

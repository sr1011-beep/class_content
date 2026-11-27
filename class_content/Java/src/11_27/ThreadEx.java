

// 자바에서 Thread 사용을 위한 문법 2가지

// (1) Thread 상속 받아서 구현
class MyThread extends Thread {

    public void run() {
        // 현재 Thread가 수행할 작업 여기에 코딩
        for (int i = 0 ; i < 10; i++) {
            System.out.println(i);
        }
    }
}

// (2) Runnable interface 구현
class MyThread2 implements Runnable {

    @Override
    public void run() {
        // 현재 Thread가 해줘야 할 작업 여기(run() 메소드)에 코딩
        for (int i = 100; i < 1000; i+= 100) {
            System.out.println(i);
        }
    }
}

public class ThreadEx {
    // main thread : main method에 있는 코드를 실행해주는 thread
    public static void main(String args[]) {
        System.out.println("start");
        // (1)번 방식으로 만든 Thread 사용
        MyThread m1 = new MyThread();
        // m1.run(); // 잘못된 코드 -> Thread로 동작하지 않음
        m1.start(); // Thread 구동시에는 start() 메소드 사용할 것

        // (2)번 방식으로 만든 Thread 사용
        MyThread2 m2 = new MyThread2();
        //m2.start(); // 2번째 방식에서는 start() 바로 호출 안됨
        Thread m2t = new Thread(m2);
        m2t.start();

        System.out.println("end");
    }
}

import javax.swing.*;
import java.awt.*;


// 계산기 화면 구현을 위한 클래스
// 판때기를 사용할 때 CarGUI가 내부에 멤버변수로 판때기(JFrame)를 가지고 있는
// has a 관계
public class CalGUI {
    // "0~9"버튼, "+, -, *, /" 버튼, "C", "=" 버튼
    JFrame f;   // 판때기
    JButton b;  // 버튼

    JButton clear;
    JButton II;
    JButton b7;
    JButton b8;
    JButton b9;
    JButton XX;
    JButton b4;
    JButton b5;
    JButton b6;
    JButton JJ;
    JButton b1;
    JButton b2;
    JButton b3;
    JButton HH;
    JButton b0;
    JButton OO;

    JTextField jtf; // 한 줄 입력

    public CalGUI() {
        f = new JFrame();
        // 화면 배치 관리자: FlowLayout -> 가장 기본 배치관리자 들어오는 순서대로 화면에 배치
        FlowLayout layout = new FlowLayout();
        f.setLayout(layout);    // 판때기에 화면 배치 관리 설정
        jtf = new JTextField(10);

        b = new JButton("잇뽕하자");
        clear = new JButton("C");
        clear.setBackground(Color.RED);

        II = new JButton("%");
        b7 = new JButton("7");
        b8 = new JButton("8");
        b9 = new JButton("9");
        XX = new JButton("X");
        b4 = new JButton("4");
        b5 = new JButton("5");
        b6 = new JButton("6");
        JJ = new JButton("-");
        b1 = new JButton("1");
        b2 = new JButton("2");
        b3 = new JButton("3");
        HH = new JButton("+");
        b0 = new JButton("0");
        OO = new JButton("=");

        f.add(jtf);
        f.add(b);

        f.add(II);
        f.add(clear);
        f.add(b7);
        f.add(b8);
        f.add(b9);
        f.add(XX);
        f.add(b4);
        f.add(b5);
        f.add(b6);
        f.add(JJ);
        f.add(b1);
        f.add(b2);
        f.add(b3);
        f.add(HH);
        f.add(b0);
        f.add(OO);


        f.setSize(500,300); // 판때기 크기
        f.setLocation(300,300); // 판때기 위치
        f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);   // 강제 종료 활성화
        f.setVisible(true);
    }
}


// 화면 판 출력(초창기 버전)
//        Frame f = new Frame();
//        f.setSize(500,300);
//        f.setLocation(300,300);
//        f.setVisible(true);

//JFrame f = new JFrame();
// 화면 배치 관리자 사용
//FlowLayout layout = new FlowLayout();   // 화면에 들어오는 순서대로 배치
//f.setLayout(layout);    // 판때기에 화면 배치 관리자 설정
// f.setLayout(null);  // 판때기에 부여되어 있는 화면 배치 정책 없앰
//f.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE); // 강제 종료 활성화
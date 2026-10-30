import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

// JFrame 상속 받는 CalGUI2 클래스
// CalGUI2 클래스가 판때기(JFrame) 기능을 사용하기 위해 상속 받음
// is a 관계 => CalGUI2는 판때기다.
public class CalGUI2 extends JFrame implements ActionListener {
    //    JFrame f;   // 판때기
    JButton b1,b2,b3,b4,b5,b6,b7,b8,b9,b0,II,XX,JJ,HH,OO;  // 버튼
    JButton clear;
    JTextField jtf; // 한 줄 입력

    public CalGUI2() {
//        f = new JFrame();
        // 화면 배치 관리자: FlowLayout -> 가장 기본 배치관리자 들어오는 순서대로 화면에 배치
        FlowLayout layout = new FlowLayout();
        this.setLayout(layout);  // 판때기에 화면 배치 관리 설정
        jtf = new JTextField(10);
        II = new JButton("%");
        b7 = new JButton("7");
        b8 = new JButton("8");
        b9 = new JButton("9");
        XX = new JButton("*");
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



        b1.addActionListener(this); //b1 버튼 감시
        b2.addActionListener(this);
        b3.addActionListener(this);
        b4.addActionListener(this);
        b5.addActionListener(this);
        b6.addActionListener(this);
        b7.addActionListener(this);
        b8.addActionListener(this);
        b9.addActionListener(this);
        b0.addActionListener(this);
        II.addActionListener(this);
        XX.addActionListener(this);
        JJ.addActionListener(this);
        HH.addActionListener(this);
        OO.addActionListener(this);

        clear = new JButton("C");
        clear.setBackground(Color.white);
        clear.addActionListener(this);

        this.add(jtf);
        this.add(b1);
        this.add(b2);
        this.add(b3);
        this.add(b4);
        this.add(b5);
        this.add(b6);
        this.add(b7);
        this.add(b8);
        this.add(b9);
        this.add(b0);
        this.add(clear);
        this.add(OO);
        this.add(XX);
        this.add(HH);
        this.add(JJ);
        this.add(II);
        this.setSize(500,300); // 판때기 크기
        this.setLocation(400,400); // 판때기 위치
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);   // 강제 종료 활성화
        this.setVisible(true);
    }

    // callmethod
    public void actionPerformed(ActionEvent e) {
        String str = e.getActionCommand(); // 클릭된 버튼 이름 가져오기
//        switch ( str ) {
//            case "1":
//                jtf.setText("1");
//            case "2":
//                jtf.setText("2");
//            case "3":
//                jtf.setText("3");
//        }
//        jtf.setText("");// clear 버튼 눌렸을때

        if (str.equals("C")) {
            jtf.setText("");
            } else {
            jtf.setText( jtf.getText() + str );


            }

    }
}
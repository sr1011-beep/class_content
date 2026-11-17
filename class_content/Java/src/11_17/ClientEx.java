import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;
import java.io.OutputStream;
import java.net.Socket;
import java.nio.charset.StandardCharsets;




// 한줄짜리 채팅메시지 전송을 위한 입력창
class ClientUI extends JFrame {
    JTextField jf;
    // 엔터 입력 감시/처리를 위한 클래스
    class MyEnterListener implements ActionListener {

        // callback method
        public void actionPerformed(ActionEvent e) {
            // 엔터 눌려졌을때 콜백으로 호출

            try {
                //TCP 기반 통신을 위해 클라리언트에서 종이컵 생성
                Socket client = new Socket("210.101.236.171", 8888);
                // 서버로 데이터 보내기
                OutputStream os = client.getOutputStream(); // 종이컵에서 데이터출력을 위한 실 뽑아내기
                String msg = jf.getText();
                os.write(msg.getBytes());   // 문자열 -> byte 배열로 변경후 전송
                jf.setText("");
            }catch ( IOException ignore ) {
                System.out.println("문제발생");
            }
        }

    }
    public ClientUI() {
        jf = new JTextField(30);
        this.add(jf); // 한줄 입력창 판때기(현재클래스)에 추가

        MyEnterListener m = new MyEnterListener(); // 엔터 감시자 객체화
        jf.addActionListener( m ); // 입력창에 감시자 달아주기

        // 판때기 강제종료기능활성화
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        this.setSize(300,100);
        this.setLocation(300, 300);
        this.setVisible(true);
    }

}


// TCP/IP Client
public class ClientEx {
    public static void main(String args[]) throws IOException {
        new ClientUI();
    }
}
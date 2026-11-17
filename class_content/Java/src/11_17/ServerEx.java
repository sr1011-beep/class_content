import java.io.IOException;
import java.io.InputStream;
import java.net.ServerSocket;
import java.net.Socket;

// TCP / IP 기반의 서버
public class ServerEx {
    public static void main(String args[]) throws IOException {
        // TCP 기반의 통신을 위해서 일단 종이컵 필요
        // 서버에서 종이컵(Socket) 만들기
        ServerSocket ss = new ServerSocket(8888);
        //accept() 메소드 가능
        //(1) 클라이언트 접속을 대기
        //(2) 클라이언트가 접속하면 그 클라이언트랑 통신을 위한 종이컵 만들어서
        Socket server = ss.accept();
        //클라이언트가 보내오는 데이터 읽기
        InputStream is = server.getInputStream(); // 종이컵에서 read를 위한 실
        byte[] b = new byte[256];
        is.read( b ); //b 배열크기만큼 읽어서 b배열에 저장
        String str = new String(b);
        System.out.println( str.trim() );
    }
}

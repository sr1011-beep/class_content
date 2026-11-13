// 자바에서 데이터 입출력 하는 방법


import java.io.*;
import java.nio.charset.StandardCharsets;

public class IOEx {
    public static void main(String args[]) throws IOException {
        // byte stream 계열을 사용한 입출력
        FileOutputStream fos = new FileOutputStream("c://softwaretest/text.txt");
        BufferedOutputStream bos = new BufferedOutputStream(fos);

        String str = "2623111백승록";

        byte[] b = str.getBytes(); // 문자열 -> byte 배열로 변경
        bos.write(b);   // 버퍼에 저장
        bos.flush(); // 버퍼가 꽉 차지 않아도 완료

        FileInputStream fis = new FileInputStream("c://softwaretest/text.txt");
        byte [] t = new byte[256];
        fis.read( t ); // 256바이트 만큼 읽어서 배열 t에 저장
        // 여러 바이트를 한꺼번에 -> 문자열로
        String temp = new String( t ); // 바이트 배열 -> 문자열로
        System.out.println(temp.trim()); // 빈 공백 제거
        System.out.println("END");

        }
    }

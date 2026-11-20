// character Stream 계열을 사용해서
// 파일에 데이터 읽고 쓰기


import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class IOEx2 {
    public static void main(String[] args) {

        // 파일에 문자 데이터 쓰기
        try {
            FileWriter fw = new FileWriter("c://softwaretest/test3.txt");
            fw.write("백승록2623111");
            fw.flush();
        } catch (IOException e) {
            System.out.println("파일에 데이터 쓰다가 문제 발생");
        }

        try {
            FileReader fr = new FileReader("c://softwaretest/test3.txt");

            char [] t = new char[256];

            int result = fr.read(t);

            if (result != -1) {
                System.out.println(new String(t, 0, result));
            }

        } catch (FileNotFoundException e) {
            System.out.println("파일 없음");
        } catch (IOException e) {
            System.out.println("파일에서 읽는 도중 문제 발생");
        }


    }
}

public class ArrayEx {

    public static void main(String args[]) {
        //배열은 뭔가?
        //같은 타입의 자료 여려개를 저장하기 위한 공간

        // 자바에서 배열 문법 3가지
        //(1)
        int[] x = {10, 20, 30};

        //(2)
        int[] y = new int[3];
        y[0] = 10;
        y[1] = 20;
        y[2] = 30;

        //배열을 사용할 때 자주하는 실수
        System.out.println( y[100] );
        y[3] = 100;

        //(3)
        int[] k = new int[]{10,20,30};

        //다차원 배열 사용
        int[][] xx = new int[3][2];
        xx[0][0] = 10;
        xx[0][1] = 20;

        xx[1][0] = 30;
        xx[1][1] = 40;

        xx[2][0] = 50;
        xx[2][1] = 60;

        //다차원 배열에 동적할당
        int[][] yy = new int[3][]; //3줄짜리는 만들었지만 각줄에 몇칸인지는 나중에 동적할당
        yy[0] = new int[3];
        yy[1] = new int[2];
        yy[2] = new int[1];


    }
}

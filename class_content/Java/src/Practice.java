public class Practice {

    public static void main(String args[]) {
        int x = 10;
        int y = 20;
        System.out.println("x=" + x);
        System.out.println("y=" + y);

        int tmp;
        
        tmp = x;
        x = y;
        y = tmp;
        System.out.println("x=" + x);
        System.out.println("y=" + y);

        
    }

}
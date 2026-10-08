sr@405-200:~$ ls -l
total 20
drwxr-xr-x 6 sr sr 4096 Sep 21 11:48 linux-lab
-rw-r--r-- 1 sr sr    4 Sep 28 11:12 my_command
-rw-r--r-- 1 sr sr   19 Sep 23 15:28 test.txt
-rw-r--r-- 1 sr sr 4795 Sep 23 15:15 text.csv
sr@405-200:~$ cat my_command
 -l
sr@405-200:~$ cat my_command > mycommand_txt
sr@405-200:~$ ls my_command.txt
ls: cannot access 'my_command.txt': No such file or directory
sr@405-200:~$ ls my_command.txt
ls: cannot access 'my_command.txt': No such file or directory
sr@405-200:~$ ls my_command_txt
ls: cannot access 'my_command_txt': No such file or directory
sr@405-200:~$ cat my_command > mycommand.txt
sr@405-200:~$ ls my_command.txt
ls: cannot access 'my_command.txt': No such file or directory
sr@405-200:~$ cat my_command >> my_command.txt
sr@405-200:~$ cat my_command.txt
 -l
sr@405-200:~$ ls
linux-lab  my_command  my_command.txt  mycommand.txt  mycommand_txt  test.txt  text.csv
sr@405-200:~$ cat > pos1.txt << EOF
> my_command
> EOF
sr@405-200:~$ rm -rf < pos1.txt
sr@405-200:~$ ls
linux-lab  my_command  my_command.txt  mycommand.txt  mycommand_txt  pos1.txt  test.txt  text.csv
sr@405-200:~$ ls
linux-lab  my_command  my_command.txt  mycommand.txt  mycommand_txt  pos1.txt  test.txt  text.csv
sr@405-200:~$ rm -rf my*
sr@405-200:~$ rm -rf *.txt
sr@405-200:~$ ls
linux-lab  text.csv
sr@405-200:~$ cat > test.txt
ls
ls
^[^[^[
gsc
cat > test.txt << EOF
^C
sr@405-200:~$ ls
linux-lab  test.txt  text.csv
sr@405-200:~$ cat > test.txt << EOF
> gsc
> 1
> 2
> gsc hi
> 3 4 gsc
> gsc kk
> 5
> EOF
sr@405-200:~$ cat test.txt
gsc
1
2
gsc hi
3 4 gsc
gsc kk
5
sr@405-200:~$ cat test.txt | grap "gsc"
Command 'grap' not found, but can be installed with:
sudo apt install grap
sr@405-200:~$ cat test.txt | grep "gsc"
gsc
gsc hi
3 4 gsc
gsc kk
sr@405-200:~$ cat test.txt
gsc
1
2
gsc hi
3 4 gsc
gsc kk
5
sr@405-200:~$ cat test.txt | grep "gsc" > gsc.txt
sr@405-200:~$ cat gsc.txt
gsc
gsc hi
3 4 gsc
gsc kk
sr@405-200:~$ tail -2 test.txt
gsc kk
5
sr@405-200:~$ cat test.txt
gsc
1
2
gsc hi
3 4 gsc
gsc kk
5
sr@405-200:~$ cat test.txt | grep "gsc"
gsc
gsc hi
3 4 gsc
gsc kk
sr@405-200:~$ cat test.txt | grep "gsc" | tail -2
3 4 gsc
gsc kk
sr@405-200:~$ cat test.txt | grep "gsc" | tail -2 > result.txt
sr@405-200:~$ cat result.txt
3 4 gsc
gsc kk
sr@405-200:~$ find . test.txt
.
./gsc.txt
./result.txt
./text.csv
./.sudo_as_admin_successful
./.bashrc
./linux-lab
./linux-lab/my notes
./linux-lab/Memo.txt
./linux-lab/welcome.txt
./linux-lab/memo.txt
./linux-lab/project
./linux-lab/project/config
./linux-lab/project/logs
./linux-lab/project/app.conf
./linux-lab/project/file.txt
./linux-lab/backup
./linux-lab/.hidden
./.profile
./.cache
./.cache/motd.legal-displayed
./.temp
./.bash_logout
./.bash_history
./.motd_shown
./test.txt
test.txt
sr@405-200:~$ find . test.txt
.
./gsc.txt
./result.txt
./text.csv
./.sudo_as_admin_successful
./.bashrc
./linux-lab
./linux-lab/my notes
./linux-lab/Memo.txt
./linux-lab/welcome.txt
./linux-lab/memo.txt
./linux-lab/project
./linux-lab/project/config
./linux-lab/project/logs
./linux-lab/project/app.conf
./linux-lab/project/file.txt
./linux-lab/backup
./linux-lab/.hidden
./.profile
./.cache
./.cache/motd.legal-displayed
./.temp
./.bash_logout
./.bash_history
./.motd_shown
./test.txt
test.txt
sr@405-200:~$ find . -type f -name test.txt
./test.txt
sr@405-200:~$ find . test.txt
.
./gsc.txt
./result.txt
./text.csv
./.sudo_as_admin_successful
./.bashrc
./linux-lab
./linux-lab/my notes
./linux-lab/Memo.txt
./linux-lab/welcome.txt
./linux-lab/memo.txt
./linux-lab/project
./linux-lab/project/config
./linux-lab/project/logs
./linux-lab/project/app.conf
./linux-lab/project/file.txt
./linux-lab/backup
./linux-lab/.hidden
./.profile
./.cache
./.cache/motd.legal-displayed
./.temp
./.bash_logout
./.bash_history
./.motd_shown
./test.txt
test.txt
sr@405-200:~$ find . -type f -name test.txt
./test.txt
sr@405-200:~$ find /home -type f -name test.txt
/home/sr/test.txt
find: ‘/home/gsc’: Permission denied
sr@405-200:~$ whoami
sr
sr@405-200:~$ find / -type f -name test.txt
find: ‘/var/spool/rsyslog’: Permission denied
find: ‘/var/spool/cron/crontabs’: Permission denied
find: ‘/var/log/private’: Permission denied
find: ‘/var/cache/ldconfig’: Permission denied
find: ‘/var/cache/private’: Permission denied
find: ‘/var/cache/apt/archives/partial’: Permission denied
find: ‘/var/tmp/systemd-private-bd64e489cfbb49bea52b221179d3aae4-systemd-resolved.service-ANiPPz’: Permission denied
find: ‘/var/tmp/systemd-private-bd64e489cfbb49bea52b221179d3aae4-systemd-timesyncd.service-URjFPe’: Permission denied
find: ‘/var/tmp/systemd-private-bd64e489cfbb49bea52b221179d3aae4-systemd-logind.service-LtQVAD’: Permission denied
find: ‘/var/tmp/systemd-private-bd64e489cfbb49bea52b221179d3aae4-polkit.service-v7s6r9’: Permission denied
find: ‘/var/lib/snapd/cookie’: Permission denied
find: ‘/var/lib/snapd/void’: Permission denied
find: ‘/var/lib/ubuntu-advantage/apt-esm/var/lib/apt/lists/partial’: Permission denied
find: ‘/var/lib/polkit-1’: Permission denied
find: ‘/var/lib/private’: Permission denied
find: ‘/var/lib/apt/lists/partial’: Permission denied
find: ‘/mnt/c/$Recycle.Bin/S-1-5-18’: Permission denied
/mnt/c/$Recycle.Bin/S-1-5-21-3178347978-542884806-704963159-1001/$R1WJZFI/test.txt
find --h/mnt/c/javatest/test.txt
find: ‘/mnt/c/PerfLogs’: Permission denied
^C
sr@405-200:~$ find --help
Usage: find [-H] [-L] [-P] [-Olevel] [-D debugopts] [path...] [expression]

Default path is the current directory; default expression is -print.
Expression may consist of: operators, options, tests, and actions.

Operators (decreasing precedence; -and is implicit where no others are given):
      ( EXPR )   ! EXPR   -not EXPR   EXPR1 -a EXPR2   EXPR1 -and EXPR2
      EXPR1 -o EXPR2   EXPR1 -or EXPR2   EXPR1 , EXPR2

Positional options (always true):
      -daystart -follow -nowarn -regextype -warn

Normal options (always true, specified before other expressions):
      -depth -files0-from FILE -maxdepth LEVELS -mindepth LEVELS
       -mount -noleaf -xdev -ignore_readdir_race -noignore_readdir_race

Tests (N can be +N or -N or N):
      -amin N -anewer FILE -atime N -cmin N -cnewer FILE -context CONTEXT
      -ctime N -empty -false -fstype TYPE -gid N -group NAME -ilname PATTERN
      -iname PATTERN -inum N -iwholename PATTERN -iregex PATTERN
      -links N -lname PATTERN -mmin N -mtime N -name PATTERN -newer FILE
      -nouser -nogroup -path PATTERN -perm [-/]MODE -regex PATTERN
      -readable -writable -executable
      -wholename PATTERN -size N[bcwkMG] -true -type [bcdpflsD] -uid N
      -used N -user NAME -xtype [bcdpfls]

Actions:
      -delete -print0 -printf FORMAT -fprintf FILE FORMAT -print
      -fprint0 FILE -fprint FILE -ls -fls FILE -prune -quit
      -exec COMMAND ; -exec COMMAND {} + -ok COMMAND ;
      -execdir COMMAND ; -execdir COMMAND {} + -okdir COMMAND ;

Other common options:
      --help                   display this help and exit
      --version                output version information and exit

Valid arguments for -D:
exec, opt, rates, search, stat, time, tree, all, help
Use '-D help' for a description of the options, or see find(1)

Please see also the documentation at https://www.gnu.org/software/findutils/.
You can report (and track progress on fixing) bugs in the "find"
program via the GNU findutils bug-reporting page at
https://savannah.gnu.org/bugs/?group=findutils or, if
you have no web access, by sending email to <bug-findutils@gnu.org>.
sr@405-200:~$ cd /b
bin/               bin.usr-is-merged/ boot/
sr@405-200:~$ cd /b
bin/               bin.usr-is-merged/ boot/
sr@405-200:~$ cd /bin
sr@405-200:/bin$ ls -l find
-rwxr-xr-x 1 root root 204264 Apr  9  2024 find
sr@405-200:/bin$
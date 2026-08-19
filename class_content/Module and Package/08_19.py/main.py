# # main.py
# import bar  
# # 현재 프로젝트 폴더에서 "bar.py" 파일을 찾아서
# # 읽고 실행 후 module 객체를 생성하고
# # 생성된 객체의 이름은 bar라고 정한다

# import foo
# # 현재 프로젝트 폴더에서 "foo.py" 파일을 찾아서
# # 읽고 실행 후 module 객체를 생성하고
# # 생성된 객체의 이름은 foo라고 정한다

# import student_yju_gsc as std
# # as -> alias 별칭


# # bar 모듈의 속성(변수, 함수)
# print(bar.file_name)    # bar.py
# # foo 모듈의 속성(변수, 함수)
# foo.print_name(foo.file_name)   # foo.py

# print(std.file_name)

# -------------------------------------------------
# # import 모듈명
# import math

# pi = 3.0        # 내 코드의 전역 변수

# print(pi)       # 내 전역 변수 pi
# print(math.pi)  # math 객체 안의 pi

# ------------------------------------------------
# import 모듈명 as 별칭

# import random as rd

# from random import randint as lotto

# for _ in range(6):
#     print(lotto(1, 45))

# -----------------------------------------------
# import sys
# from random import *

# randint(1, 2)
# randrange(1, 10)
# random()

# -------------------------------------------------
# import bar # bar.py -> ok

# import math # 현재 디렉토리 math.py?

# --------------------------------------------------

# import random as rd

# for _ in range(6):
#     print(rd.randint(1, 45))

https://chatgpt.com/s/t_6a85815062008191bb62246b53698683
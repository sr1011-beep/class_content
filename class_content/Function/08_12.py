# # 함수 정의
# def bar(a, b, c):  # parameter
#     print(a, b, c) # 1, 2, 3

# # # 함수 호출 시 인자값이 매개변수에 전달되는 방법
# # # 1) Positinal
# # bar(3, 2, 1)


# # 2) Keyword
# bar(3, c=2, b=1) # Arguments

def get_galaxy_fold(version, color="black", size=7):
    # version: 폴드폰 버전
    # color: 휴대폰 색상(입력값이 없으면 기본: black)
    # size: 휴대폰 화면크기(인치) [입력값이 없으면 7]
    print(version, color, size)

get_galaxy_fold(8) # 8, black, 7
get_galaxy_fold(8, "pink") # 8, pink, 7
get_galaxy_fold(8, size=14)
# get_galaxy_fold(size=14, 8) # error

# # parameter
# def bar(a=2, b=3):
#     print(a, b) # 1

# bar(10, 20) # 1
# bar(10)
# bar()  # error

# parameter
# 매개변수가 많고 변경사항은 특정 몇개만
# def bar(d, e, a=1, b=2, c=3):
#     print(a, b, c, d, e)

# # bar(1, 2, 3, 4, 5)
# bar(4, 5)
# bar(0.4, 0.5)
# bar(5, 6, c=30)
# bar(1, 2, 3, 40, 50)
# bar(1, 2, 3, 0.4, 0.5)
# bar(1, 2, 3, 400, 500)
# bar(1, 2, 3, 4000, 5000)

# def average(scores):
#     return sum(scores) / len(scores)

# print(average([80, 90, 100]))
# print(average([70, 60, 50]))
# print(average([100, 95, 85]))

# 함수 정의 : def + 함수명 + 매개변수(parameter) + 콜론(:)
# def add(a, b):      # a, b : 매개변수(parameter)
#     result = a + b  # 함수 본문: 들여쓰기로 구분
#     return result   # 결과 반환 (return은 선택)

# ss = int(input())
# dd = int(input())

# 함수 호출 (call)
#print(add(ss, dd))

# def min_max(numbers):
#     return min(numbers), max(numbers)

# result = min_max([3, 1, 9, 5])  # 튜플
# print(result)

# low, high = min_max([3, 1, 9, 5])    # 언패킹
# print(low, high)

# def hello(name):
#     return name + "님, 환영합니다"

# def add(a, b):
#     return a + b

# def bigger(a, b):
#   if a > b:
#     return a
#   else:   
#     return b
# print(bigger(7, 3))

# def calc(a, b):
#     return a + b, a - b

# result = calc(10, 3)
# print(result)
# s, d = calc(10, 3)
# print(s, d)


# debug

# def add(a, b):
#     return a + b

# result_1 = add(2, 3)

# result_2 = add(4, 5)

# print(result_1, result_2)

# def bar(msg):
#     print(f"bar: {msg}")

# def foo(msg):
#     print(f"foo: {msg}")
#     bar("GSC")
#     print("foo is completed")

# foo("YJU")

# def bar(msg, comment="c"):
#     print(f"bar: {msg}, {comment}")

# bar("a", "b")

# def bar(a, b, c):
#     print(a, b, c)

# bar(1, 2, 3)
# bar(c=7, a=6, b=5)

# def bar(arg_a):
#     if arg_a % 2 == 0:
#         return "짝수"

#     msg = "홀수 입니다!"

#     return msg

# print(bar(2))
# print(bar(3))

# 양의 정수만 사용
# def bar(value):
#     if value <= 0:
#         return
    
#     if value % 2 == 0:
#         print("짝수")
#     else:
#         print("홀수")

# if bar(-1) == None:
#     print("양의 정수만 입력 하세요")

# def get_sum_avg(arg_a, arg_b):
#     value_sum = arg_a + arg_b
#     value_avg = value_sum / 2

#     return value_sum, value_avg

# print(type(get_sum_avg(2, 4)))
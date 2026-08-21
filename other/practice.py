# text = input()
# result = ""

# for ch in text:
#     if ch.isupper():
#         result += chr((ord(ch) - ord('A') + 1) % 26 + ord('A'))
#     elif ch.islower():
#         result += chr((ord(ch) - ord("a") + 1) % 26 + ord('a'))

# print(result)

# animal = "사자"         # G (Global): 함수 밖에서 선언

# def show():
#     animal = "고양이"   # L (Local): 함수 안에서 선언
#     print(animal)       # animal -> L에서 찾음 -> 고양이
#     print(len(animal))  # len -> L-> X G-> X B(내장) -> 3

# show()
# print(animal)

# count = 10        # 함수 밖에서 만든 전역 변수

# def read_only():    # 읽기만 할 때는 global 없이 전역 변수를 사용할 수 있다 -> 10
#     print(count)

# def wrong_set():
#     count = 999     # global이 없으면 전역 count가 아니라 새 지역 변수 count를 만듬
#     print(count)    # 지역 변수 count 출력 -> 999

# def right_set():
#     global count    # 이 함수 안의 count가 전역 변수 count를 가리킨다고 선언
#     count = 999     # 전역 변수 count의 값을 실제로 변경

# read_only()                 # 전역 count를 읽어서 10 출력
# wrong_set(); print(count)   # wrong_set 안에서는 999, 밖에서는 전역 count 그대로 10 출력
# right_set(); print(count)   # right_set이 전역 count를 바꿨으므로 밖에서도 999 출력





# def order(positional, default="기본값", *args, **kwargs):
#     print(positional)   # 위치 인자
#     print(default)      # 기본값 인자
#     print(args)         # 가변 위치 -> 튜플
#     print(kwargs)       # 가변 키워드 -> 딕셔너리

# order("A", "B", "C", "D", x=1, y=2)


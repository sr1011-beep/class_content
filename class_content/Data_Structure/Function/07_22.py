# bar = ["안녕", "GSC", "반가워요"]

# print("".join(bar))
# print(", ".join(bar))

# bar = "2000 3000 4000"

# # print("".join(bar()))

# print(",".join([f"{price}원" for price in bar.split()]))


# msg_list = ["안녕", "하세요", "gsc"]

# print("".join(msg_list))

# # result = ""
# # for msg in msg_list:
# #     result += msg

# # print(result)

# a = {1, 2, 3}
# b = {2, 3}

# print(a > b)

# print(a < b)


# 함수
# say_hello("gsc")

# 함수 정의
def say_hello(name):
    print(f"{name}님 안녕하세요")
    print("반가워요")

# 함수 호출 : 여러번 사용 가능
# name_1 = input()
# say_hello(name_1)

# name_2 = input()
# say_hello(name_2)

input_msg = input()
arguments = input.msg.strip.split()


def prt_comments(name, sub, score, msg):
    print(f"안녕하세요, {name}님")
    print(f"{sub} 성적 점수를 공지합니다.")
    print(f"{sub} 성적 점수는 {score}점 입니다.")
    print(msg)


input_msg = input().strip().split()
prt_comments(*input_msg)

input_msg = input().strip().split()
prt_comments(*input_msg)

input_msg = input().strip().split()
prt_comments(*input_msg)




# prt_comments("gsc", "python", 100, "화이팅")
# prt_comments("yju", "java", 90, "ㅋㅋㅋ")
# prt_comments("kim", "ai", 20, "괜찮아~")
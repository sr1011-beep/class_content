# bar = "hello world"

# for char in bar:
#     print(char)

# print(bar[:5]) # hello
# print(bar[-5:])

# bar = "hello world" # deep copy
# foo = bar
# foo += "gsc"

# print(bar)
# print(foo)

# pos = [1, 2, 3]    # shallow copy
# king = pos
# king.append(10)
# print(pos)
# print(king)

# text = """
# 안녕하세요  탭
# 두 번째 라인입니다.

# 세 번째
# 네 번째
# """
# print(text)

# lines = text.splitlines()
# for line in lines:
#     print(line.split())

# file_name = "test.py"

# name, extend = file_name.split('.')

# print(name)
# print(extend)

# bar = "hello world gsc~~"
# pos = bar.split()
# print(f"type:{type(pos)}\n {pos}")

# email = " abc@gmail.com "

# if email.strip() == "abc@gmail.com": # 양쪽 공백 문자 제거
#     print("확인된 이메일")

# else:
#     print("미확인 이메일")

# print(email.lstrip()) # 왼쪽 공백 제거
# print(email.rstrip()) # 오른쪽 공백 제거

# email = " abc@gmail.com\n\n"

# print(email.strip())
# print("종료")

# name = " Hong gildong "

# # 양쪽 공백 문자 제거, 대/소문자 변환 
# if name.strip().upper() == "HONG GILDONG": 
#     print("확인")
# else:
#     print("미확인")

# # 대/소문자 변환
# print(f"upper: {name.upper()}, lower: {name.lower()}")

# file_list = ["a.jpg", "b.txt", "c.k.pdf", "d.svg", "e.png"]
# img_a = [".jpg", "webp", 'bmp', 'svg']
# img_b = ['.png', 'raw', '.bmp', "jpg"]

# img_types = set(img_a) | set(img_b)
# print(img_types)

# img_file = [file for file in file_list
#             if file.endswith(tuple(img_types))]

# print(img_file)

# for name in file_list:
#     print(name.split(".", maxsplit=1))


# for name in file_list:
#     if name.endswith(img_types):
#         print(name)


# bar = "a.jpg"
# server_address = "https://www.gsc.com"
# print(bar.endswith(".jpg"))
# print(server_address.startswith("https://"))

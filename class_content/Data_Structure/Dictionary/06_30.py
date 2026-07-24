
# bar = {"26001" : {
#     "이름" : "홍길동",
#     "성별" : "남성",
#     "이메일" : "test1@yju.ac.kr",
#     "수강과목" : {
#         "파이썬" : {
#             "학점" : "3학점",
#             "점수" : "100"},
#         "인공지능" : {
#             "학점" : "5학점",
#             "점수" : "90"}}},

#         "26002" : {
#         "이름" : "홍길삼",
#         "성별" : "여성",
#         "이메일" : "test2@yju.ac.kr",
#         "수강과목" : {
#             "DL" : {
#                 "학점" : "1학점",
#                 "점수" : "70"},
#             "AI Agent" : {
#                 "학점" : "2학점",
#                 "점수" : "60"}}}}

# num = input()

# print(bar.get(num, {}).get("이메일", {}))



# bar = {"2026-6-1" : {
#     "청소그룹" : "1",
#     "청소명단" : ["홍길동","홍길삼"],
#     "청소상태" : "양호"},

#     "2026-6-2" : {
#         "청소그룹" : "2",
#         "청소명단" : ["김철수","김영희"],
#         "청소상태" : "불량"}
#     }

# a = input()

# names = (" ".join(bar.get(a, {}).get("청소명단", {})))

# if names:
#     print(names)
# else:
#     print("수강과목 없음")

# dict -> in operator -> default -> key
# foo = {"bmw x7" : 2000, "benz gls" : 500, "Tesla X" : 300, "GV80" : 20}

# country_code = {"KR" : "대한민국", "JP" : "일본", "FR" : "프랑스"}
# print(country_code)

# a = {value:key for key, value in country_code.items()}

# print(a)



# test = ["a", "ab", "abc"]

# pos = {word : len(word) for word in test}
# print(pos)


# for value in foo.values():
#     print(f"value: {value}")

# a = sum(foo.values()) / len(foo.values())

# print(a)


# pos = {"bmw x7", "benz gls", "Telsa X", "GV80"}

# foo_keys = foo.keys()

# print(foo_keys - pos)
# print(pos - foo_keys)


# bar = list(foo.keys())
# print(bar, type(bar))
# print(bar[0])



# # iteration : Element -> key : value
# for key, value in foo.items():
#     print(f"key: {key}, value: {value}")


# if "gv80" in foo:
#     print("O")
# else:
#     print("X")


# for value in foo:
#     print(value)    # Dict - key


# # 딕셔너리 선언
# dictionary = {
#     "name": "7D 건조 망고",
#     "type": "당절임",
#     "ingredient": ["망고", "설탕", "메타중아황산나트륨", "치자황색소"],
#     "origin": "필리핀"
# }

# # 사용자로부터 입력을 받음
# key = input()

# # 입력받은 값이 딕셔너리 내에 있는 경우, 아닌 경우 출력
# if key in dictionary:
#     print(dictionary[key])

# else:
#     print("존재하지 않는 키에 접근하고 있습니다.")


# get() 함수 사용

# 딕셔너리 선언
# dictionary = {
#     "name": "7D 건조 망고",
#     "type": "당절임",
#     "ingredient": ["망고", "설탕", "메타중아황산나트륨", "치자황색소"],
#     "origin": "필리핀"
# }

# # 존재하지 않는 키에 접근
# value = dictionary.get("a")
# print("값:", value)

# # None 확인 방법
# if value == None:
#     print("존재하지 않는 키에 접근했었습니다.")

# # for 반복문: 딕셔너리와 함께 사용

# # 딕셔너리 선언
# dictionary = {
#     "name": "7D 건조 망고",
#     "type": "당절임",
#     "ingredient": ["망고", "설탕", "메타중아황산나트륨", "치자황색소"],
#     "origin": "필리핀"
# }

# # for 반복문 사용
# for key in dictionary:
#     # 출력
#     print(key, ":", dictionary[key])

# # 1번
# # 빈 dict
# dict_a = {

# }

# dict_a["name"] = "구름"  # dict에 추가

# del dict_a["name"]      # dict에서 제거

# print(dict_a)

# # 2번
# # 딕셔너리 리스트 선언
# pets = [
#     {"name": "구름", "age": 5},
#     {"name": "초코", "age": 3},
#     {"name": "아지", "age": 1},
#     {"name": "호랑이", "age": 1}
# ]

# print("# 우리 동네 애완 동물들")
# for pet in pets:
#     print(f"{pet["name"]} {pet["age"]}살")

# # 3번

# numbers = [1,2,6,8,4,3,2,1,9,5,4,9,7,2,1,3,5,4,8,9,7,2,3]
# counter = {}

# for number in numbers:
#     count = 0
#     for num in numbers:
#         if num == number:
#             count += 1
#     counter[number] = count

# print(counter)


# 4번

# 딕셔너리 선언
character = {
    "name": "기사",
    "level": 12,
    "items": {
        "sword": "불꽃의 검",
        "armor": "풀플레이트"
    },
    "skill": ["베기", "세게 베기", "아주 세게 베기"]
    }

# # for 반복문 사용
# # 1번째 방법
# for key in character:
#     if type(character[key]) is dict:
#         for small_key in character[key]:
#             print(small_key, ":", character[key][small_key])
#     elif type(character[key]) is list:
#         for item in character[key]:
#             print(key, ":", item)
#     else:
#         print(key, ":", character[key])

# # isinstance를 활용한 두번째 방법
# for key, value in character.items():
#     if isinstance(value, dict):
#         for k, v in value.items():
#             print(k, ":", v)
#     elif isinstance(value, list):
#         for item in value:
#             print(key, ":", item)
#     else:
#         print(key, ":", value)
        

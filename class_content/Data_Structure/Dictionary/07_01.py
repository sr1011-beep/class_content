# bar = [value for value in range(10, 110, 10)]
# foo = "hello world"

# # Iteration
# for value in bar:
#     print(value)


# bar = {"a": 10, "b": 20, "c": 30}

# for keys, values in bar.items():
#     print(f"key: {keys}")
#     print(f"value: {values}")


# iteration for dictionary
# 1) key: value -> 모든 작업 가능
#   -> items()
# 2) key -> 현재 dict 내 필수 키가 있는지 없는지
#   -> keys(), in 연산자 기본
# 3) value -> 현재 dict 내 값들에 대한 연산 적용 시
#   -> value()

# 초기화(생성) + CRUD

# bar = {}
#bar = dict()

# Create ~~ Update
# print(type(bar)) # dict

#f_list = list()

#b_dict = {"a":10}

# Create in a list 
#f_list.append(10)

# Create in a dict X -> Update in a dict
# if "a" not in b_dict:
#     b_dict["a"] = 10
#     print("신규 생성")

# print(b_dict.setdefault("a", 20))

# bar = {"a": 10}

# # dict Create
# bar["b"] = 20
# bar["c"] = "hello"
# bar[200] = True

# # dict Update
# bar["b"] = 30

# print(bar)

# bar = [10]

# Create = input()

# bar.append(Create)


# bar_idx = int(input())
# Update = input()

# bar[bar_idx] = Update

# print(bar)

# foo = {"국어": 80}

# key = input()
# value = int(input())

# foo["국어"] = 100

# print(foo.setdefault(key, value))

# print(foo)


# bar = {"a": 10}

# bar.update({"b": 20, "c": 30})
# print(bar)

# bar.update({"b": 200, "c": 300})
# print(bar)


# bar = {"a": 10, "b": 20}

# bar.clear()
# print(bar)

# del bar["b"]

# bar.pop("c", None)
# print(bar)

# if bar.pop("b", False):
#     print("삭제 성공")
# print(bar)

# bar = {}

# a = [1, 2, 3, 4]
# b = [10, 20, 30, 40]
# c = zip(a, b)

# print(list(c))

# a = range(1, 8)
# b = [10, 20, 30, 40]
# c = zip(a, b)

# print(list(c))

std_id      = ["261", "262", "263",]
std_name    = ["김철수", "김영희", "홍길동",]
std_info = list(zip(std_id, std_name))
dict_std_info = dict(std_info)
print(dict_std_info)


# bar = {v for v in range(1, 11) if v % 2 == 0}
# print(type(bar))

# bar = {"1", "2", "3"}

# print(3 in bar)
# print(4 in bar)

# input_value = int(input())

# if input_value not in bar:
#     bar.add(input_value)

# import random

# lotto = set()

# while len(lotto) < 6:
#     lotto.add(random.randrange(1, 46))

# lotto_list = list(lotto)
# lotto_list.sort()
# print(lotto_list)

# for v in lotto:
#     print(v)


# bar = {1, 2, 3, 4}

# try:
#     bar.remove(5)
#     print(bar)
# except KeyError:
#     print("관리자에게 연락")

# bar.discard(10)
# print(bar)

# while len(bar) > 0:
#     print(bar.pop())

# bar = {1, 2, 3, 4}
# foo = {3, 4, 5, 6}

# print(bar - foo)

# std_info = { 'id' : '123',
#              'name':'gsc', 
#              'email':'abc@a.com'}

# required_fields = {'id', 'email', 'phone'}

# print(required_fields - std_info.keys())
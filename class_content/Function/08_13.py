# # 함수 정의
# def bar(a, b=2, c=3): # Parameter -> positional, default
#     print(a, b, c)

# 함수 호출
# bar(1) # 1, 2, 3
# bar(1, 4) # 1, 4, 3
# bar(3, c=20)  # 3, 2, 20
# bar(1, 2, 3)    # Positional
# bar(b=2, c=3, a=1) # Keyword
# bar(b=2, 3, a=1) # Positional + keyword(keyword가 들어가는 순간 position이 깨짐)

# # 함수 정의
# def get_sum(*args):
#     print(f"len: {len(args)}")
#     total = 0
#     for value in args:
#         total += value
#     print(f"sum: {total}")

# get_sum(1, 2) # 인자값 4개로
# get_sum(4, 5, 6, 7)

# # 함수 정의
# def bar(a, b, c, *args):    # 매개변수가 3개에서 추가옵션으로 무한대로 받음
#     print(a, b, c)
#     print(args)

# def bar(a, b, c, d=1, e=2): # 매개변수가 5개로 지정
#     print(a, b, c, d, e)

# bar(1, 2, 3)
# bar(1, 2, 3, 4)
# bar(1, 2, 3, 4, 5)

# 자동차 주문 함수 정의
# 1) Mandatory: model, color
# 2) Option: equipments
# 3) Default: special_discount -> False
# def car_order(model, color, *equipments, special_discount=False):
#     print(model, color, equipments, special_discount)

# car_order("tucson", "black")

# def car_order(model, color, *options, discount=False):
#     print(model, color, options, discount)

# car_order(1, 2, 3, 4, 5) # moidel 1 color 2 3, 4, 5 -> option
# car_order(1, 2, discount=True)
# car_order(1, 2, True)

# def bar(**kwargs):
#     for key, value in kwargs.items():
#         print(kwargs[key])

# bar(a=1, b=2, c=3)
# bar(a=1, b=2)
# bar()

# def bar(f=2, **kwargs):
#     print(f)
#     print(kwargs); print()

# bar(a=1, b=2)
# bar(3, a=1, b=2)
# bar(f=10, a=20, c=30)
# bar(a=200, c=300, f=100)

def bar(a, *args, b=10, **kwargs):
    print(f"a: {a}")        # positional -> 필수 값
    print(f"args: {args}")   
    print(f"b: {b}")
    print(f"kwargs: {kwargs}")

bar(1, 2, 3, b=100, c=200, d=300, e=400)

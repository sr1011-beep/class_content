# def inner(price):       # price: 매개변수 생성
#     tax = price * 0.1   # tax:   지역 변수 생성
#     print(f"inner: price={price}, tax={tax}")
#     return price + tax  # 반환값은 호출한 쪽으로 전달
#                         # inner 종료 -> price, tax 소멸

# def outer(name):        # name: 매개변수 생성
#     base = 1000         # base: 지역변수 생성
#     total = inner(base) # inner 호출 -> 새 실행 프레임 생성
#     print(f"outer: name={name}, base={base}, total={total}")
#     return total        # outer 종료 -> name, base, total 소멸

# result = outer("홍길동")    # outer 호출 -> 새 실행 프레임 생성
# print(f"main: result={result}")

# count = 10          # 함수 밖에서 만든 전역 변수

# def read_only():    # 읽기만 할 때는 global 없이 전역 변수를 사용할 수 있다
#     print(count)

# def wrong_set():
#     count = 999     # global이 없으면 전역 count가 아니라 새 지역 변수 count를 만든다
#     print(count)

# def right_set():    
#     global count    # 이 함수 안의 count가 전역 변수 count를 가리킨다고 선언
#     count = 999     # 전역 변수 count의 값을 실제로 변경

# read_only()                 # 전역 count를 읽어서 10 출력
# wrong_set(); print(count)   # wrong_set 안에서는 999, 밖에서는 전역 count 그대로 10 출력
# right_set(); print(count)   # rigth_set이 전역 count를 바꿨으므로 밖에서도 999 출력

# bar = 3     # 함수 밖에서 선언 -> 전역

# def msg():
#     foo = 2 # 함수 내 선언 -> 지역
#     print(foo)

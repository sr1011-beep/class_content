def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    return a / b

if __name__ == '__main__':
    # 직접 실행할 때만 실행되는 자체 테스트
    assert add(2, 3) == 5 and divide(10, 4) == 2.5
    print("자체 테스트 통과!")
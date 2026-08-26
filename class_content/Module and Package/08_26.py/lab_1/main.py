import utilities

def main():
    num1 = float(input("Enter the first number: "))
    num2 = float(input("Enter the second number: "))
    operation = input(
        "Choose operation (add, subtract, multiply, divide): " )

    if operation == 'add':
        result = utilities.add(num1, num2)

    elif operation == 'subtract':
        result = utilities.subtract(num1, num2)

    elif operation == 'multiply':
        result = utilities.multiply(num1, num2)

    elif operation == 'divide':
        result = utilities.divide(num1, num2)

    else:
        print("Invalid operation")
        return
    print(f"The result is {result}")

if __name__ == '__main__':
    main()
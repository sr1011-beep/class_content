text = input()
result = ""

for ch in text:
    if ch.isupper():
        result += chr((ord(ch) - ord('A') + 1) % 26 + ord('A'))
    elif ch.islower():
        result += chr((ord(ch) - ord("a") + 1) % 26 + ord('a'))

print(result)
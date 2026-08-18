# # __name__ = "1" # global variable

# def bar():
#     # __name__ = "2" # local variable
#     print(__name__)

# bar()

# count = 0
# name = "GSC"

# def increase_cnt():
#     global count #, name
#     count += 1
#     name = "YJU GSC"

# increase_cnt()
# increase_cnt()

# print(count, name)

msg = 1

def foo():
    print(msg)

def bar():
    msg = 2
    foo ()
    print(msg)

bar()
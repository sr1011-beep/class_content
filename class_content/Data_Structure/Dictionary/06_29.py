"""
26001
 - 이름 : 홍길동
 - 수강과목: 
        - 파이썬, 인공지능
    - 재적상태 : 재학

26002
 - 이름 : 홍길삼
 - 수강과목: 
        - DL, AI Agent
    - 재적상태 : 휴학
"""

# bar = {"26001":
#         {"이름" : "홍길동",
#         "수강과목" : "파이썬, 인공지능",
#         "재적상태" : "재학"}}


bar_2 = {"26001" : { "이름" : "홍길동",
                    "수강과목": ["파이썬", "인공지능"],
                    "재적상태": "재학"},
        "26002" : {"이름": "홍길삼",
                   "수강과목" : ["DL", "AI Agent"],
                   "재적상태" : "휴학"}}

# # 학번, 이름을 출력
# print("26001", bar_2["26001"]["이름"])
# print("26002", bar_2["26002"]["이름"])

# # 학번, 이름, 수강과목 2개 모두 출력
# print("26001", bar_2["26001"]["수강과목"][0])
# print("26001", bar_2["26001"]["수강과목"][1])


std_id = input("학번을 입력하세요")

print(bar_2.get(std_id, {}).get("이름", {}),
      bar_2.get(std_id, {}).get("재적상태", {})
    )


# # Exception handling (예외처리)
# try:
#     print(bar_2[std_id])
# except KeyError:
#     print("유효하지 않은 키 입니다.")


# if std_id in bar_2:
#     print(bar_2[std_id])
# else:
#     print("유효하지 않은 키 입니다.")



# for student_id, info in bar_2.items():
#     print(student_id, info["이름"], info["수강과목"])
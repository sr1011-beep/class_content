from fastapi import FastAPI

# FastAPI 프레임워크를 이용해 앱 생성
app = FastAPI()

# 사용자가 /hello 주소로 GET 요청을 보내면 실행
@app.get("/hello")
def hello():
    # 클라이언트에게 JSON 형태로 응답
    return {"message": "안녕하세요!"}
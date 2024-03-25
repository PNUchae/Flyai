# 빌드 단계
# 베이스 이미지로 Node.js를 사용
FROM node:16 AS build

# 작업 디렉터리 설정
WORKDIR /app

# 의존성 파일 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 애플리케이션 코드 복사
COPY . .

# React 애플리케이션 빌드
RUN npm run build

# 실행 단계
# 베이스 이미지로 nginx 사용
FROM nginx:alpine

# 빌드 단계에서 생성된 빌드 파일을 nginx가 제공할 위치로 복사
COPY --from=build /app/build /usr/share/nginx/html

# 필요한 경우 nginx 설정 파일 복사
# COPY nginx/nginx.conf /etc/nginx/nginx.conf

# 포트 80 노출
EXPOSE 80

# nginx 실행
CMD ["nginx", "-g", "daemon off;"]

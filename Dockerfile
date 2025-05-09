# Next.js Dockerfile

# 배포용
# FROM node:18

# WORKDIR /app
# COPY . .

# RUN npm install
# RUN npm run build

# EXPOSE 3000
# CMD ["npm", "run", "start"]

# 개발용
FROM node:18

WORKDIR /app
COPY . .

RUN npm install

EXPOSE 3000
CMD ["npm", "run", "dev"]

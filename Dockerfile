FROM node:20-slim

WORKDIR /app

# Expose Vite's default dev port
EXPOSE 5173

# CMD is handled by docker-compose for dev mode

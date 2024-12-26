FROM oven/bun:latest

COPY package.json ./
COPY vpm.js ./
copy .env ./

RUN bun install

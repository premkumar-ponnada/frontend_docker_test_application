# ---- Frontend image: build with Node, serve with nginx -----------------
# Stage 1 "build": compile React into plain static HTML/CSS/JS.
FROM node:22-alpine AS build

WORKDIR /app

# VITE_ variables are read at BUILD time, not run time, so the backend URL
# must be passed in here as a build argument.
ARG VITE_API_URL=http://localhost:8000
ENV VITE_API_URL=$VITE_API_URL

# Copy the manifests first so `npm ci` is cached until dependencies change.
COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: a tiny nginx image that only carries the built files.
# Node and node_modules are left behind in stage 1 -> much smaller image.
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

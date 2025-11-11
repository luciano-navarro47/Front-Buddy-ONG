FROM node:20-alpine AS build

ARG REACT_APP_API_URL
ARG REACT_APP_CLOUDINARY_CLOUD_NAME
ARG REACT_APP_CLOUDINARY_UPLOAD_PRESET
ARG REACT_APP_AUTH0_DOMAIN
ARG REACT_APP_AUTH0_CLIENT_ID
ARG REACT_APP_MP_PUBLIC_KEY

ENV REACT_APP_API_URL=${REACT_APP_API_URL}
ENV REACT_APP_CLOUDINARY_CLOUD_NAME=${REACT_APP_CLOUDINARY_CLOUD_NAME}
ENV REACT_APP_CLOUDINARY_UPLOAD_PRESET=${REACT_APP_CLOUDINARY_UPLOAD_PRESET}
ENV REACT_APP_AUTH0_DOMAIN=${REACT_APP_AUTH0_DOMAIN}
ENV REACT_APP_AUTH0_CLIENT_ID=${REACT_APP_AUTH0_CLIENT_ID}
ENV REACT_APP_MP_PUBLIC_KEY=${REACT_APP_MP_PUBLIC_KEY}

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# CRÍTICO: Eliminar TODOS los archivos .env que pudieran haberse copiado
RUN rm -f .env .env.local .env.development .env.production .env.production.local .env.development.local .env.test.local .env.test

RUN echo "=== Checking environment variables ===" \
 && echo "REACT_APP_AUTH0_DOMAIN: ${REACT_APP_AUTH0_DOMAIN}" \
 && echo "REACT_APP_AUTH0_CLIENT_ID length: ${#REACT_APP_AUTH0_CLIENT_ID}" \
 && echo "REACT_APP_API_URL: ${REACT_APP_API_URL}"

RUN echo "=== Checking for .env files ===" \
 && ls -la .env* 2>/dev/null || echo "✓ No .env files found"

RUN npm run build

RUN echo "=== Checking built index in main.js ===" \
 && grep -A5 -B5 "Auth0Provider" build/static/js/main.*.js | head -20 || echo "Auth0Provider not found in expected format"

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
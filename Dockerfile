FROM node:20-alpine AS build

ARG REACT_APP_API_URL
ARG REACT_APP_CLOUDINARY_CLOUD_NAME
ARG REACT_APP_CLOUDINARY_UPLOAD_PRESET
ARG REACT_APP_AUTH0_DOMAIN
ARG REACT_APP_AUTH0_CLIENT_ID
ARG REACT_APP_MP_PUBLIC_KEY

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN echo "REACT_APP_API_URL=${REACT_APP_API_URL:-}" > .env.production \
 && echo "REACT_APP_CLOUDINARY_CLOUD_NAME=${REACT_APP_CLOUDINARY_CLOUD_NAME:-}" >> .env.production \
 && echo "REACT_APP_CLOUDINARY_UPLOAD_PRESET=${REACT_APP_CLOUDINARY_UPLOAD_PRESET:-}" >> .env.production \
 && echo "REACT_APP_AUTH0_DOMAIN=${REACT_APP_AUTH0_DOMAIN:-}" >> .env.production \
 && echo "REACT_APP_AUTH0_CLIENT_ID=${REACT_APP_AUTH0_CLIENT_ID:-}" >> .env.production \
 && echo "REACT_APP_MP_PUBLIC_KEY=${REACT_APP_MP_PUBLIC_KEY:-}" >> .env.production

# DEBUG temporal: muestra si llegó el valor (NO imprime el secreto)
RUN if [ -z "$REACT_APP_AUTH0_CLIENT_ID" ]; then echo "MISSING_REACT_APP_AUTH0_CLIENT_ID"; else echo "HAS_REACT_APP_AUTH0_CLIENT_ID"; fi \
 && if [ -z "$REACT_APP_AUTH0_DOMAIN" ]; then echo "MISSING_REACT_APP_AUTH0_DOMAIN"; else echo "HAS_REACT_APP_AUTH0_DOMAIN"; fi

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

# it's a good idea to pin this, but for demo purposes we'll leave it as is
FROM node:latest as builder

# inject all environment vars we'll need
ARG VITE_BACKEND_URL
ARG VITE_API_VERSION
# expose the variable to the finished cotainer
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}
ENV VITE_API_VERSION=${VITE_API_VERSION}

# automatically creates the dir and sets it as the current working dir
WORKDIR /usr/src/app
# this will allow us to run vite and other tools directly
ENV PATH /usr/src/node_modules/.bin:$PATH

COPY package.json ./

RUN npm install

# use a more specific COPY, as this will include files like `Dockerfile`, we don't really need inside our containers.
COPY . ./

# FROM builder as dev
# CMD ["npm", "run", "dev"]

FROM builder as prod-builder
RUN npm run build

# it's a good idea to pin this, but for demo purposes we'll leave it as is
FROM nginx:latest as prod

COPY --from=prod-builder /usr/src/app/dist /usr/share/nginx/html
COPY /nginx/default.conf /etc/nginx/conf.d/

CMD ["nginx", "-g", "daemon off;"]
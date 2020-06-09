FROM cypress/browsers:node12.16.2-chrome81-ff75

WORKDIR /e2e
COPY package.json .
RUN npm i
COPY . .
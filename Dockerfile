FROM cypress/browsers:node10.16.0-chrome77

COPY package* test/
RUN cd test && npm i
COPY . / test/
WORKDIR /test
# ARG CI=false
# ARG BRANCH
# ARG CYPRESS_RECORD_KEY
# ARG BUILD_BUILDNUMBER
# ENV CYPRESS_RECORD_KEY=$CYPRESS_RECORD_KEY
# ENV BUILD_BUILDNUMBER=$BUILD_BUILDNUMBER
# ENV CI=$CI
# ENV BRANCH=$BRANCH
# ENV NO_COLOR=1
# ADD https://google.com cache_bust
# RUN npm run cy:run:ci
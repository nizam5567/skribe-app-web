ARG NODE_IMAGE=node:18-alpine

FROM ${NODE_IMAGE} as base


ENV WORKDIR=/usr/src/app
ENV APP_PORT=8080
ENV NEXT_TELEMETRY_DISABLED 1

# Rebuild the source code only when needed
FROM base as builder
ARG TOKEN

RUN apk add --no-cache \
		libc6-compat \
        build-base \
        git \
        git-lfs

RUN git lfs install

WORKDIR ${WORKDIR}

ARG GH_AUTH
RUN git clone --branch develop https://${GH_AUTH}:x-oauth-basic@github.com/skribeai/app-web.git .

# Add our temporary access token to the docker image to download NPM packages
RUN echo "//us-npm.pkg.dev/skribe-common/npm/:_authToken=\"$TOKEN\"" >> .npmrc && \
     npm install && npm run build

# Production image, copy all the files and run next
FROM base as final
ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

RUN mkdir -p ${WORKDIR}
RUN chown nextjs:nodejs ${WORKDIR}
WORKDIR ${WORKDIR}

USER nextjs

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder --chown=nextjs:nodejs ${WORKDIR}/.npmrc ./
COPY --from=builder --chown=nextjs:nodejs ${WORKDIR}/next.config.js ./
COPY --from=builder --chown=nextjs:nodejs ${WORKDIR}/public ./public
COPY --from=builder --chown=nextjs:nodejs ${WORKDIR}/.next ./.next
COPY --from=builder --chown=nextjs:nodejs ${WORKDIR}/package*.json ./

# Reinstall modules, but only production modules
RUN npm install --only=production

EXPOSE ${APP_PORT}

ENTRYPOINT ["npm", "run", "start"]

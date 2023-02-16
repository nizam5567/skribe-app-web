FROM node:18-alpine

ARG CAT
ENV CODEARTIFACT_AUTH_TOKEN=$CAT

ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 && \
    chown -R 1001:1001 "/root/.npm" && \
    npm install -g npm

COPY . /home/nextjs/.

RUN chown -R nextjs:nodejs /home/nextjs/.

USER nextjs
WORKDIR /home/nextjs
RUN yarn install
RUN npm run build
RUN ls -al  && chmod -R +r /home/nextjs/.next

ENTRYPOINT ["npm", "run", "start"]

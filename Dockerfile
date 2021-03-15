FROM hayd/alpine-deno:1.8.1

EXPOSE 8000

WORKDIR /app

USER deno

ADD . .

CMD ["run", "--allow-net", "--allow-read", "src/main.ts"]

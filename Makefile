run:
	deno run --allow-net --allow-read ./src/main.ts

fmt:
	deno fmt

lint:
	deno lint --unstable --json
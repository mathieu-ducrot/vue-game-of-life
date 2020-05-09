# Local Dev Setup with Docker
docker-ssh:
	docker run --rm -it -p 127.0.0.1:3000:3000 --user=node -v $(PWD):/src -w /src node:13.10 $(CMD)

docker-install:
	make docker-ssh CMD="yarn install"

docker-dev:
	# https://nuxtjs.org/faq/host-port/#as-direct-arguments
	make docker-ssh CMD="yarn nuxt --hostname 0.0.0.0 --port 3000"

docker-test:
	make docker-ssh CMD="yarn jest"

docker-generate:
	make docker-ssh CMD="yarn nuxt generate"

all: start

start:
	@docker compose up --build

stop:
	@docker compose dowm

.PHONY: all start stop

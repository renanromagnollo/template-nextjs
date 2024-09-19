# ================================================
# Variables
# ================================================
API_CONTAINER_NAME=karavela-teams-api
PG_SERVICE_NAME=postgres
PG_CONTAINER_NAME=karavela-teams-postgres

WEBSITE_SERVICE_NAME=website
WEBSITE_CONTAINER_NAME=website-container

# ================================================
# General Commands
# ================================================
default: dev

help: ## Print available commands
	$(info ========================================)
	$(info Available Commands:)
	@grep '^[[:alnum:]_-]*:.* ##' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS=":.* ## "}; {printf "make %-25s %s\n", $$1, $$2};'
	$(info ========================================)
.PHONY: help

stop: ## Stop all containers
	@docker compose  stop
.PHONY: stop

up: ## Start all containers
	@docker compose  up -d
.PHONY: start

down: ## Drop all containers
	@docker compose  down
.PHONY: down

clear: ## Stop containers, remove images, networks, and volumes
	@docker compose down --rmi all --volumes --remove-orphans
.PHONY: clear

dev: ## Run application in development mode
	@docker compose up -d --build $(WEBSITE_SERVICE_NAME)
.PHONY: dev

logs: ## Show api container logs
	@docker compose logs -f $(WEBSITE_SERVICE_NAME)
.PHONY: logs

open: ## Open the container shell
	@docker compose exec $(WEBSITE_SERVICE_NAME) sh
.PHONY: open

lint: ## Run the linter
	@docker compose run --rm $(WEBSITE_SERVICE_NAME) npm run lint
.PHONY: lint

test-watch: ## Run unit tests in watch mode
	@npm run test:watch
.PHONY: test-watch

test-unit: ## Run unit tests
	@docker compose run --rm $(WEBSITE_SERVICE_NAME) npm run test:unit
.PHONY: test

test-coverage: ## Run test-coverage
	@docker compose  run -e HOST=$(WEBSITE_SERVICE_NAME) --rm $(WEBSITE_SERVICE_NAME) npm run test:coverage
.PHONY: test-coverage

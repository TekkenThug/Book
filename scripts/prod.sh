#!/usr/bin/bash

docker compose down --rmi "all"
docker compose build --no-cache
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d

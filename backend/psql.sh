#!/bin/bash

docker container exec -it backend-postgres-1 psql -h localhost --username=user track-rooms
#!/bin/bash
# set -e

# psql -v ON_ERROR_STOP=1 --dbname "$POSTGRES_DB" <<-EOSQL
#     CREATE DATABASE itui;
#  	GRANT ALL PRIVILEGES ON DATABASE itui TO postgres
# EOSQL

# psql -U postgres -f /app/itui.sql 
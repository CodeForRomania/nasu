#Docker deps
docker run --name nasu-redis -p 6379:6379 -d redis
docker run --name nasu-postgres -p 5432:5432 -d postgres

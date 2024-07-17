# Rescript Examples

A collection of Reflexi Rescript examples.

## Running an example

```bash
docker run -it --rm \
    -v $PWD/examples:/examples:ro \
    reflexias/rescript:latest \
    rescript /examples/exec/exec.js
```

## Running redis with inputs

```bash
docker run -d --name redis -p 6379:6379 redis:latest
rescript -i examples/redis/inputs.yaml examples/redis/redis.js
docker stop redis
docker rm redis
```
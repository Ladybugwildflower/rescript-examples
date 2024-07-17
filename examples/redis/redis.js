function CheckError(err) {
    if (err != undefined) {
        throw(err)
    }
}

var err = redis.Set("foo", "bar")
CheckError(err)

var [result, err] = redis.Get("foo")
CheckError(err)
log.Info(result)

Output("foo", result)

var err = redis.Lpush("my-list", "item1")
CheckError(err)

var err = redis.Rpush("my-list", "item2")
CheckError(err)

var [result, err] = redis.Rpop("my-list")
CheckError(err)
log.Info(result)

Output("my-list", result)

var [result, err] = redis.Lpop("my-list")
CheckError(err)
log.Info(result)

var [result, err] = redis.Keys("*")
CheckError(err)
log.Info(result)
Output("keys", result)

var err = redis.Publish("my-stream", "stream item")
CheckError(err)

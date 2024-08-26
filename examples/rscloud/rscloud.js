function CheckError(err) {
    if (err != undefined) {
        throw(err)
    }
}

rscloud.SetURL("localhost:8443")
rscloud.SetToken("some-secret-token")


log.Info("Loading script....")
// Load a script from a file.
// Could also be pulled from gitlab, github, s3, http, or where ever!
// var [script, err] = file.Read("examples/rscloud/remote_script.js")
// CheckError(err)

let script = `
log.Info(foo)
Output("baz", foo)
`

log.Info("Running script...")
var [outputs, err] = rscloud.Run(script, "my-runner", {"foo":"bar"})
CheckError(err)

log.Info(outputs)
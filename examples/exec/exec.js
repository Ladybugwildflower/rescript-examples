function CheckError(err) {
    if (err != undefined) {
        throw(err)
    }
}


var err = exec.Exec("whoami")
CheckError(err)

var err = exec.Exec("uptime")
CheckError(err)

var err = exec.Exec("uname", "-a")
CheckError(err)

err = exec.Script(`var bar="baz"`)
CheckError(err)
log.Info(bar)

// var err = exec.Exec("sh", "-c", "somecommand | something -complicated")
// CheckError(err)

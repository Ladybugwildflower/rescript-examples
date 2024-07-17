function CheckError(err) {
    if (err != undefined) {
        throw(err)
    }
}


var err = exec("whoami")
CheckError(err)

var err = exec("uptime")
CheckError(err)

var err = exec("uname", "-a")
CheckError(err)

// var err = exec("sh", "-c", "somecommand | something -complicated")
// CheckError(err)

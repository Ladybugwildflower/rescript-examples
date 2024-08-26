function CheckError(err) {
    if (err != undefined) {
        log.Error(err)
        throw(err)
    }
}

var data = { "page": {"title": "Liquid Page Title"}}

log.Info("FileToString")
var [result, err] = liquid.FileToString("examples/template/liquid/example.html", data)
CheckError(err)

log.Info(result)

log.Info("StringToString")
var [result, err] = liquid.StringToString("<h1>{{ page.title }}</h1>", data)
CheckError(err)

log.Info(result)

log.Info("StringToFile")
var err = liquid.StringToFile("<h1>{{ page.title }}</h1>", data, "/tmp/out.html")
CheckError(err)

log.Info("FileToFile")
var err = liquid.FileToFile("examples/template/liquid/example.html", data, "/tmp/out.html")
CheckError(err)

log.Info("DirToDir")
var err = liquid.DirToDir("examples/template/liquid/", data, "/tmp/out/", ".html")
CheckError(err)

log.Info("LoadPartials")
var err = liquid.LoadPartials("examples/template/partials/liquid/", ".html")
CheckError(err)

liquid.UnloadLoadPartials()

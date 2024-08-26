function CheckError(err) {
    if (err != undefined) {
        throw(err)
    }
}

var data = {"title": "Page Title"}

var [result, err] = template.FileToString("examples/template/golang/example.html", data)
CheckError(err)

log.Info(result)

var [result, err] = template.StringToString("<h1>{{.title}}</h1>", data)
CheckError(err)

log.Info(result)

var err = template.StringToFile("<h1>{{.title}}</h1>", data, "/tmp/out.html")
CheckError(err)

var err = template.FileToFile("examples/template/golang/example.html", data, "/tmp/out.html")
CheckError(err)

var err = template.DirToDir("examples/template/golang/", data, "/tmp/out/", ".html")
CheckError(err)

var err = template.LoadPartials("examples/template/golang/partials/", ".html")
CheckError(err)

template.UnloadLoadPartials()

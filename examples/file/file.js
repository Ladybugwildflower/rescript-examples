function CheckError(err) {
    if (err != undefined) {
        throw(err)
    }
}


CheckError(file.RemoveAll("test.yaml"))
CheckError(file.Append("test.txt", "test"))
CheckError(file.Append("test.txt", "test"))
CheckError(file.Write("test2.txt", "test"))
CheckError(file.WriteJSON("test.json", {"foo":"bar", "bool": true, "number": 42, "object": {"foo": "bar"}}))
CheckError(file.WriteYAML("test.yaml", {"foo":"bar", "bool": true, "number": 42, "object": {"foo": "bar"}}))

var [data, err] = file.ReadJSON("test.json")
CheckError(err)
Output("json", data)

var [data, err] = file.ReadYAML("test.yaml")
CheckError(err)
Output("yaml", data)
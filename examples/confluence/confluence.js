function CheckError(err) {
    if (err != undefined) {
        throw(err)
    }
}

confluence.SetURL("https://...")
confluence.SetUser("user@example.com")
confluence.SetToken("api-token")

var [content, err] = confluence.GetContentByID("space", "123456789")
CheckError(err)

content.Title = "New Title"
content.Version.Number++
content.Version.MinorEdit = true
content.Body.Storage.Value = "New Content!!!"

var [content, err] = confluence.UpdateContent(content)
CheckError(err)


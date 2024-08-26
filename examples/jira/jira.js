function CheckError(err) {
    if (err != undefined) {
        throw(err)
    }
}

// jira.SetURL("https://...")
// jira.SetUser("user@example.com")
// jira.SetToken("api-token")

var [ticket, err] = jira.GetJira("prj-000")
CheckError(err)

ticket.Title = "New Title"

var [ticket, err] = ticket.UpdateJira(ticket)
CheckError(err)


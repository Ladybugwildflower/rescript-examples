function CheckError(err) {
    if (err != undefined) {
        throw(err)
    }
}

tfe.SetToken("my-secret-token")

var [workspace, err] = tfe.CreateWorkspace("my-org", {"Name": "lb-test"})
CheckError(err)

log.Info("Getting workspace...")
var [workspace, err] = tfe.GetWorkspace("my-org", "lb-test")
CheckError(err)

log.Info("Creating version...")
var [version, err] = tfe.CreateVersion("my-org", "lb-test", "./my-tf-dir")
CheckError(err)

log.Info("Creating Run...")
var [run, err] = tfe.CreateRun({
    Workspace: workspace,
    ConfigurationVersion: version,
    AutoApply: true,
    PlanOnly: false,
})
CheckError(err)

log.Info("Watching Run...")
var [run, err] = tfe.WatchRun(run.ID)
CheckError(err)

log.Info("Getting logs...")
var err = tfe.GetLogs(run)
CheckError(err)

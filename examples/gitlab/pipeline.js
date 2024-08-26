function CheckError(err) {
    if (err != undefined) {
        throw (err)
    }
}

// Create a new Gitlab Pipeline
let deployPipeline = Gitlab.NewPipeline("deploy")
deployPipeline.Include("some/repo", "main", "deploy.yml")
deployPipeline.AddVariable("foo", "bar")

// Create Init Stage
let initStage = deployPipeline.Stage("init")

// Add terraform init job
let initJob = initStage.Job("Init", "ubuntu:latest", "")
initJob.AddCommand("terraform init")

// Add terraform validate job
let validateJob = initStage.Job("Validate", "ubuntu:latest", "")
validateJob.AddCommand("terraform validate")
validateJob.DependsOnJob(initJob)

// Create Plan Stage
let planStage = deployPipeline.Stage("plan all")

// Add terraform plan job for each environment
for (env of environments) {
    let planJob = planStage.Job("Plan " + env, "ubuntu:latest", "")
    planJob.Extend(".terraform")
    planJob.AddCache("some-key", "cachedir/")
    planJob.AddVariable("env", env)
    planJob.AddVaultSecret("db_password", "kv-v2", "ops", env+"/db", "password")
    planJob.AddCommand("terraform plan")
}

// Create a deploy stage for each environment
for (env of environments) {
    let deployStage = deployPipeline.Stage("deploy " + env)

    let applyJob = deployStage.Job("Deploy " + env, "ubuntu:latest", "")
    applyJob.Extend(".terraform")
    applyJob.AddVariable("env", env)
    applyJob.AddVaultSecret("db_password", "kv-v2", "ops", env+"/db", "password")
    applyJob.AddCommand("terraform apply")
    applyJob.SetEnvironment(env, "start", "", "")
}

// Render the pipeline yaml and save
let RenderedPipeline = deployPipeline.Render()
let err = file.Write("/tmp/deploy.yml", RenderedPipeline)
CheckError(err)

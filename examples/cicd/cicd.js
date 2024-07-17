function CheckError(err) {
    if (err != undefined) {
        throw(err)
    }
}

// Remove the workspace that may exist from previous jobs
file.RemoveAll("./workspace")

// Clone a repo
log.Info("Running git git clone...")
err = git.Clone("https://gitlab.com/me/test.git", "main", "workspace")
CheckError(err)

// Get the sha from the workspace
log.Info("Running git sha...")
var [sha, err] = git.SHA("workspace")
CheckError(err)
Output("sha", sha)

// Get the tags from the gitlab api
log.Info("Running gitlab tags...")
var [tags, err] = Gitlab.Tags("me/test")
CheckError(err)

// Get the tags from the workspace
log.Info("Running git tags...")
var [tags, err] = git.Tags("workspace")
CheckError(err)

// Remove the last image
log.Info("Running docker image remove...")
docker.Image.Remove("me/my-image:"+version.latest(tags))

// Determine the next image version
var next = version.latest(tags).IncPatch()
Output("NewTag", next)

// Build the docker image
log.Info("Running docker image build...")
err = docker.Image.Build("workspace", "Dockerfile", "me/my-image:"+next)
CheckError(err)

// Add a tag to the repo
log.Info("Running git tag...")
err = git.Tag("workspace", "v"+next, "This is a tag message", "me", "me@somedomain.com")
CheckError(err)

// Push the tag
log.Info("Running git tags push...")
err = git.TagsPush("workspace")
CheckError(err)

// Run a container (integration test)...
// Pull an Image
log.Info("Running docker image pull...")
CheckError(docker.Image.Pull("nginx:latest"))

// Start a docker container
log.Info("Running docker start...")
CheckError(docker.Start("nginx:latest", "test-container", {"8080":"80"}))

// Give it time to start
time.sleep(1000)

// Run an http Get
log.Info("Running http get...")
var [result, err] = http.Get({}, "http://localhost:8080")
CheckError(err)
// log.Info(result)

// Execute a command inside the container
log.Info("Running docker exec...")
CheckError(docker.Exec("test-container", ["whoami"]))

// Stop the container
log.Info("Running docker stop...")
CheckError(docker.Stop("test-container"))

// Pull a file out of the container
log.Info("Running docker cp...")
CheckError(docker.CP("test-container", "/etc/resolv.conf", "/tmp/resolv.conf"))

// Remove the container
log.Info("Running docker remove...")
CheckError(docker.Remove("test-container"))
// Run a container (integration test)...
// Pull an Image
log.Info("Running docker image pull...")
CheckError(docker.Image.Pull("nginx:latest"))

log.Info("Running docker image tag...")
CheckError(docker.Image.Tag("nginx:latest", "my-nginx:latest"))

log.Info("Running docker image build...")
CheckError(docker.Image.Build(".", "Dockerfile", "me/my-image:latest"))

log.Info("Running docker login...")
CheckError(docker.Login("user", "password"))

log.Info("Running docker image push...")
CheckError(docker.Image.Push("me/my-image:latest"))

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
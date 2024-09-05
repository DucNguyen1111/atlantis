pipeline {
    agent any
    
    triggers {
        githubPush()
    }
    
    stages {
        stage('Process Webhook') {
            steps {
                script {
                    def payload = null
                    
                    // Check if we're running due to a webhook
                    if (currentBuild.getBuildCauses('org.jenkinsci.plugins.github.webhook.GitHubWebHookCause').size() > 0) {
                        // Parse the JSON payload
                        payload = readJSON text: currentBuild.getBuildCauses()[0].shortDescription
                    } else {
                        echo "This build was not triggered by a GitHub webhook."
                        return
                    }
                    
                    // Now you can access the payload data
                    if (payload) {
                        echo "Received webhook payload:"
                        echo payload.toString()
                        
                        // Access specific fields (adjust based on the actual payload structure)
                        if (payload.head_commit) {
                            echo "Commit message: ${payload.head_commit.message}"
                        }
                        if (payload.pusher) {
                            echo "Pusher name: ${payload.pusher.name}"
                        }
                        
                        // Add more processing logic here
                    }
                }
            }
        }
        
        // Add more stages as needed
    }
}
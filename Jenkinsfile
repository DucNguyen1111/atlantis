pipeline {
    agent any
    
    triggers {
        githubPush()
    }
    
    stages {
        stage('Process Webhook') {
            steps {
                script {
                    def payload = readJSON text: env.payload
                    echo "payload ${payload}"
                    // Now you can access the payload data
                    echo "Commit message: ${payload.head_commit.message}"
                    echo "Pusher name: ${payload.pusher.name}"
                    
                    // Add more processing logic here
                }
            }
        }
        
        // Add more stages as needed
    }
}
pipeline {
    agent any

    stages {
        stage('Run Script and Check Response') {
            steps {
                script {
                    def headers = request.getHeaderNames()
                    def logHeaders = []

                    while (headers.hasMoreElements()) {
                        def headerName = headers.nextElement()
                        def headerValue = request.getHeader(headerName)
                        echo "${headerName}: ${headerValue}"
                    }
                    echo "ENV: ${env}"
                    // Run the curl command and capture the response
                    def response = sh(
                        script: """
                        curl --silent --request POST '${env.ATLANTIS_URL}' \\
                        --header 'X-Atlantis-Token: ${env.ATLANTIS_TOKEN}' \\
                        --header 'Content-Type: application/json' \\
                        --data-raw '{
                            "Repository": "${env.REPOSITORY}",
                            "Ref": "${env.GIT_BRANCH.replaceFirst('.+/', '')}",
                            "Type": "Github",
                            "Paths": [{
                              "Directory": ".",
                              "Workspace": "default"
                            }],
                            "PR": ${env.CHANGE_ID}
                        }'
                        """, returnStdout: true
                    ).trim()

                    // Parse the JSON response
                    def jsonResponse = readJSON text: response
                    
                    echo "Response: ${jsonResponse}"
    
                    // Check if the Error field is not null
                    if (jsonResponse.ProjectResults[0].Failure) {
                        error("Pipeline failed due to error: ${jsonResponse.ProjectResults[0].Failure}")
                    } else {
                        echo "Pipeline succeeded. Response: ${jsonResponse}"
                    }
                }
            }
        }
    }
}
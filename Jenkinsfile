/*
 * curl -X POST -H "Content-Type: application/json" -H "headerWithNumber: nbr123" -H "headerWithString: a b c" -d '{ "before": "1848f12", "after": "5cab1", "ref": "refs/heads/develop" }' -vs http://admin:admin@localhost:8080/jenkins/generic-webhook-trigger/invoke?requestWithNumber=nbr%20123\&requestWithString=a%20string
 */
node {
 properties([
  pipelineTriggers([
   [$class: 'GenericTrigger',
    genericVariables: [
     [key: 'everything', value: '$'],
    ],
    genericHeaderVariables: [
     [key: 'Accept', regexpFilter: ''],
     [key: 'Content-Type', regexpFilter: ''],
     [key: 'User-Agent', regexpFilter: ''],
     [key: 'X-GitHub-Delivery', regexpFilter: ''],
     [key: 'X-GitHub-Event', regexpFilter: ''],
     [key: 'X-GitHub-Hook-ID', regexpFilter: ''],
     [key: 'X-GitHub-Hook-Installation-Target-ID', regexpFilter: ''],
     [key: 'X-GitHub-Hook-Installation-Target-Type', regexpFilter: ''],
     [key: 'X-Hub-Signature', regexpFilter: ''],
     [key: 'X-Hub-Signature-256', regexpFilter: ''],
    ],
    printContributedVariables: true,
    printPostContent: true,
    regexpFilterText: '',
    regexpFilterExpression: ''
   ]
  ])
 ])

 stage("build") {
  def atlantisUrl = ${env.ATLANTIS_URL}
  sh '''
  echo all $everything
  echo Variables from shell:
  echo url $atlantisUrl
  echo Accept $accept
  echo Content-Type $content_type
  echo User-Agent $user_agent
  echo X-GitHub-Delivery $x_github_delivery
  echo X_GitHub_Event $x_github_event
  echo X-GitHub-Hook-ID $x_github_hook_id
  echo X-GitHub-Hook-Installation-Target-ID $x_github_hook_installation_target_id
  echo X-GitHub-Hook-Installation-Target-Type $x_github_hook_installation_target_type
  echo X-Hub-Signature $x_hub_signature
  echo X-Hub-Signature-256 $x_hub_signature_256
  curl -X POST \
    -H 'Accept: $accept' \
    -H 'Content-Type: $content_type' \
    -H 'User-Agent: $user_agent' \
    -H 'X-GitHub-Delivery: $x_github_delivery' \
    -H 'X-GitHub-Event: $x_github_event' \
    -H 'X-GitHub-Hook-ID: $x_github_hook_id' \
    -H 'X-GitHub-Hook-Installation-Target-ID: $x_github_hook_installation_target_id' \
    -H 'X-GitHub-Hook-Installation-Target-Type: $x_github_hook_installation_target_type' \
    -H 'X-Hub-Signature: $x_hub_signature' \
    -H 'X-Hub-Signature-256: $x_hub_signature_256' \
    -d '$everything' $atlantisUrl
  '''
 }
}
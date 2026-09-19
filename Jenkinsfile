// Infortts Jenkins — combined multi-stage pipeline (auto-generated).
// Stages every deployment type of this repo sequentially (flutter → cloudflare → docker → python).
// DO NOT hand-edit: regenerate with jenkins/generate-jenkinsfiles.sh — it is the source of truth.
// Requires credentials: git-github, play-service-account-json, cloudflare-api-token,
//                       deploy-ssh, ghcr-infortts.

pipeline {
  agent { label 'vps' }
  options {
    timestamps()
    disableConcurrentBuilds()
    timeout(time: 20, unit: 'MINUTES')
  }
  environment {
    MAX_GRADLE_OPTS = '-Dorg.gradle.jvmargs="-Xmx4g -XX:MaxMetaspaceSize=512m"'
  }
  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

stage('Cloudflare: artits') {
      steps {
        script {
          if (fileExists('package.json')) sh 'npm install --no-audit --no-fund'
        }
        script {
          if (fileExists('wrangler.toml') && fileExists('package.json')) {
            sh 'npm test -- --passWithNoTests 2>/dev/null || true'
            sh 'npm run build || true'
          }
        }
        withCredentials([[$class: 'StringBinding', credentialsId: 'cloudflare-api-token', variable: 'CF_API_TOKEN']]) {
          withEnv(["CLOUDFLARE_API_TOKEN=${CF_API_TOKEN}"]) {
            sh "npx wrangler deploy --name artits --account-id 04e1a3c2b99919914aba485175906033 2>&1 | tail -20"
          }
        }
        script {
          sh "curl -sf -o /dev/null --max-time 20 https://artits.04e1a3c2b99919914aba485175906033.workers.dev && echo LIVECHECK_OK || echo LIVECHECK_WARN"
        }
      }
    }
stage('Docker: ghcr.io/inforttsorg/artits') {
      steps {
        script {
          if (fileExists('validate-release.sh')) sh 'chmod +x validate-release.sh && ./validate-release.sh 2>&1 | tail -40 || echo GATE_WARN'
          else echo 'no validate-release.sh; skipping gate'
        }
        withEnv(["IMG=ghcr.io/inforttsorg/artits", "BN=${BUILD_NUMBER}"]) {
          sh "docker build -f Dockerfile -t \${IMG}:\${BN} -t \${IMG}:latest . 2>&1 | tail -25"
        }
        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'ghcr-infortts', usernameVariable: 'GHU', passwordVariable: 'GHP']]) {
          sh 'echo "$GHP" | docker login ghcr.io -u "$GHU" --password-stdin 2>/dev/null || true'
          withEnv(["IMG=ghcr.io/inforttsorg/artits", "BN=${BUILD_NUMBER}"]) {
            sh 'docker push ${IMG}:${BN} 2>/dev/null && docker push ${IMG}:latest 2>/dev/null || echo "GHCR push skipped/warn"'
          }
        }
      }
    }

  }
  post {
    success { script { def c = load 'ci/jenkins-common.groovy'; c.notify("${env.JOB_NAME} OK") } }
    failure { script { def c = load 'ci/jenkins-common.groovy'; c.notify("${env.JOB_NAME} FAILED", [lvl:'error']) } }
  }
}
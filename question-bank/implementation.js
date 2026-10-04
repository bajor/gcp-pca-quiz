(function () {
  "use strict";

  const S = globalThis.PCA_QUIZ_SOURCES;

  globalThis.PCA_QUIZ_IMPLEMENTATION_QUESTIONS = [
    {
      id: "implementation-cloud-build-ci-trigger",
      prompt: "Every commit to the main branch must build the application, run its automated tests, and produce a container artifact without a developer running the steps manually. Which service should provide this continuous integration workflow?",
      answers: [
        { text: "Cloud Build with a repository trigger", explanation: "Correct. Cloud Build can run build and test steps from source changes through repository triggers." },
        { text: "Cloud Storage lifecycle management", explanation: "Incorrect. Lifecycle management acts on stored objects and cannot execute build and test pipelines." },
        { text: "Cloud DNS", explanation: "Incorrect. Cloud DNS manages name resolution and does not run continuous integration jobs." },
        { text: "Cloud Interconnect", explanation: "Incorrect. Cloud Interconnect provides private network connectivity and does not build application code." }
      ],
      correct: 0,
      tags: ["manage-implementation", "ci-cd"],
      source: S.CLOUD_BUILD
    },
    {
      id: "implementation-cloud-deploy-promotions",
      prompt: "A release must move through development, staging, and production targets with controlled approvals and promotion history. Which Google Cloud delivery service is designed for this workflow?",
      answers: [
        { text: "Cloud Deploy", explanation: "Correct. Cloud Deploy manages delivery pipelines and promotions of releases across configured targets." },
        { text: "Cloud Logging", explanation: "Incorrect. Cloud Logging stores and queries logs; it does not manage release promotion workflows." },
        { text: "Cloud KMS", explanation: "Incorrect. Cloud KMS manages encryption keys and is not a release delivery system." },
        { text: "Cloud Storage", explanation: "Incorrect. Cloud Storage can hold artifacts, but it does not orchestrate target promotions and approvals." }
      ],
      correct: 0,
      tags: ["manage-implementation", "ci-cd"],
      source: S.CLOUD_DEPLOY
    },
    {
      id: "implementation-cloud-run-gradual-rollout",
      prompt: "A new Cloud Run revision has uncertain risk. The team wants to send a small percentage of requests to it, observe telemetry, and quickly return all traffic to the prior revision if necessary. What should it use?",
      answers: [
        { text: "A Cloud Storage retention policy", explanation: "Incorrect. Retention policies control object deletion and cannot shift service request traffic." },
        { text: "Cloud Run traffic splitting and rollback", explanation: "Correct. Cloud Run can split traffic between revisions to support gradual rollouts and can route traffic back to a previous revision." },
        { text: "A larger Cloud SQL instance", explanation: "Incorrect. Database sizing does not provide progressive delivery controls for a Cloud Run revision." },
        { text: "A VPC firewall rule", explanation: "Incorrect. Firewall rules filter network traffic and do not allocate requests by Cloud Run revision." }
      ],
      correct: 1,
      tags: ["manage-implementation", "ci-cd", "cloud-run"],
      source: S.CLOUD_RUN_TRAFFIC
    },
    {
      id: "implementation-database-migration-service",
      prompt: "A company wants to migrate a supported on-premises MySQL database to Cloud SQL while minimizing downtime through an initial load followed by ongoing replication before cutover. Which service should it evaluate?",
      answers: [
        { text: "Database Migration Service", explanation: "Correct. Database Migration Service supports migrations between supported database sources and destinations, including continuous migration patterns for reduced downtime." },
        { text: "Cloud CDN", explanation: "Incorrect. Cloud CDN caches content near users and does not migrate database data." },
        { text: "Cloud Armor", explanation: "Incorrect. Cloud Armor protects applications from attacks and does not replicate database changes." },
        { text: "Cloud Scheduler", explanation: "Incorrect. Cloud Scheduler can invoke scheduled targets but is not a managed database migration service." }
      ],
      correct: 0,
      tags: ["manage-implementation", "migration", "databases"],
      source: S.DATABASE_MIGRATION
    },
    {
      id: "implementation-cloud-scheduler-recurring-task",
      prompt: "A nightly job must invoke a known HTTP endpoint at 02:00 UTC every day. Which fully managed service should schedule the invocation?",
      answers: [
        { text: "Cloud Scheduler", explanation: "Correct. Cloud Scheduler is a fully managed cron-like service that can invoke HTTP targets or publish messages on a schedule." },
        { text: "Cloud Load Balancing", explanation: "Incorrect. A load balancer distributes incoming traffic and does not create scheduled invocations." },
        { text: "Cloud Filestore", explanation: "Incorrect. Filestore provides NFS file shares and does not run scheduled jobs." },
        { text: "Cloud Audit Logs", explanation: "Incorrect. Audit logs record activity and do not initiate workloads at a chosen time." }
      ],
      correct: 0,
      tags: ["manage-implementation", "automation"],
      source: S.CLOUD_SCHEDULER
    },
    {
      id: "implementation-cloud-build-private-pool",
      prompt: "A Cloud Build pipeline must reach a private GKE control-plane endpoint and an on-premises artifact repository through an existing VPC and Interconnect connection. Build workers must have no public egress. Which implementation should be used?",
      answers: [
        { text: "Run the builds in the default Cloud Build pool and add the workers' changing public addresses to firewall allowlists", explanation: "Incorrect. Default-pool workers are not attached to the private VPC path, and public allowlists violate the no-public-egress requirement." },
        { text: "Create a Cloud Build private pool connected to the VPC, configure private routes, DNS, and firewall access, and select that pool in the build", explanation: "Correct. Private pools provide dedicated workers that can connect to a VPC for access to private GKE and hybrid resources, and they can be configured without public egress." },
        { text: "Make the GKE control plane and artifact repository public for the duration of every build", explanation: "Incorrect. Temporarily exposing private management and artifact endpoints contradicts the network requirement and increases attack surface." },
        { text: "Use a larger Cloud Build machine type in the default pool", explanation: "Incorrect. Worker CPU and memory sizing does not provide private VPC or on-premises connectivity." }
      ],
      correct: 1,
      tags: ["manage-implementation", "ci-cd", "networking", "advanced"],
      source: S.CLOUD_BUILD_PRIVATE_POOLS
    },
    {
      id: "implementation-binary-authorization-attestation",
      prompt: "Production GKE clusters must reject any container image that has not passed security testing and approval. The control must bind approval to the immutable image digest so moving a tag cannot bypass it. Which implementation meets the requirement?",
      answers: [
        { text: "Allow deployment of any image whose tag is named production", explanation: "Incorrect. Tags are mutable and can be moved to an unapproved image digest." },
        { text: "Grant all developers Artifact Registry Reader on the production repository", explanation: "Incorrect. Repository read access does not certify an image or enforce deployment policy at the cluster." },
        { text: "Have the CI process create a Binary Authorization attestation for the tested image digest and require that attestor in the production policy", explanation: "Correct. The attestation certifies the immutable digest, and Binary Authorization verifies the required attestor before allowing deployment." },
        { text: "Enable vulnerability scanning but allow every scanned image to deploy", explanation: "Incorrect. Scanning produces findings, but without an admission policy tied to approval it does not reject images that failed the required process." }
      ],
      correct: 2,
      tags: ["manage-implementation", "ci-cd", "supply-chain-security", "advanced"],
      source: S.BINARY_AUTHORIZATION
    }
  ];
})();

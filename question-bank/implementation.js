(function () {
  "use strict";

  const S = globalThis.PCA_QUIZ_SOURCES;

  globalThis.PCA_QUIZ_IMPLEMENTATION_QUESTIONS = [
    {
      id: "implementation-cloud-build-ci-trigger",
      prompt: "Every commit to the main branch must build the application, run its automated tests, and produce a container artifact without a developer running the steps manually. Which service should provide this continuous integration workflow?",
      answers: [
        { text: "Cloud Build with a repository trigger", explanation: "Correct. Cloud Build can run build and test steps from source changes through repository triggers." },
        { text: "Cloud Deploy with an automatic promotion from source to production", explanation: "Incorrect. Cloud Deploy manages delivery of already built artifacts to runtime targets; it does not replace the source build and test stage." },
        { text: "Artifact Registry configured to pull source and execute tests before accepting an image", explanation: "Incorrect. Artifact Registry stores and distributes artifacts but does not build source or run a test workflow." },
        { text: "A Cloud Scheduler job that polls the main branch once per day", explanation: "Incorrect. A polling schedule can invoke another service, but it does not itself execute the build and is not triggered for every commit." }
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
        { text: "Cloud Build triggers chained independently for each environment", explanation: "Incorrect. Build triggers can run deployment commands, but independent jobs do not provide Cloud Deploy's first-class release, target, approval, and promotion history model." },
        { text: "Artifact Registry repository promotion by retagging the same image", explanation: "Incorrect. Retagging organizes artifacts but does not orchestrate deployments, approvals, or auditable promotions across runtime targets." },
        { text: "Infrastructure Manager revisions for each application release", explanation: "Incorrect. Infrastructure Manager applies Terraform infrastructure configurations; it is not the managed application-delivery pipeline for promoting releases through targets." }
      ],
      correct: 0,
      tags: ["manage-implementation", "ci-cd"],
      source: S.CLOUD_DEPLOY
    },
    {
      id: "implementation-cloud-run-gradual-rollout",
      prompt: "A new Cloud Run revision has uncertain risk. The team wants to send a small percentage of requests to it, observe telemetry, and quickly return all traffic to the prior revision if necessary. What should it use?",
      answers: [
        { text: "Deploy the new revision with the same tag and immediately route 100% of traffic to latest", explanation: "Incorrect. This provides no limited exposure period and increases rollback impact before telemetry can be evaluated." },
        { text: "Cloud Run traffic splitting and rollback", explanation: "Correct. Cloud Run can split traffic between revisions to support gradual rollouts and can route traffic back to a previous revision." },
        { text: "Create a second Cloud Run service and use a low-TTL DNS record to alternate its hostname", explanation: "Incorrect. DNS does not provide precise request percentages or immediate rollback for clients with cached answers, while revision traffic splitting does." },
        { text: "Put each revision in a separate serverless network endpoint group and manually edit load-balancer backend capacity", explanation: "Incorrect. This adds load-balancer management when Cloud Run natively provides revision-level traffic percentages and rollback on one service URL." }
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
        { text: "Storage Transfer Service with recurring transfers of the MySQL data directory", explanation: "Incorrect. Copying database files as objects does not provide a transactionally consistent initial load and change replication into Cloud SQL." },
        { text: "A one-time mysqldump import performed during the final maintenance window", explanation: "Incorrect. A dump can migrate data but requires downtime for the full export and import instead of continuously replicating changes before cutover." },
        { text: "Datastream into BigQuery followed by a BigQuery export to Cloud SQL", explanation: "Incorrect. Datastream can capture database changes for supported destinations, but routing through an analytical warehouse is not the managed homogeneous migration path to Cloud SQL." }
      ],
      correct: 0,
      tags: ["manage-implementation", "migration", "databases"],
      source: S.DATABASE_MIGRATION
    },
    {
      id: "implementation-cloud-scheduler-recurring-task",
      prompt: "A job must invoke a known HTTP endpoint at 02:00 UTC every day. It does not need per-item queue management or a long-running orchestration, and missed invocations should follow a configured retry policy. Which fully managed service should schedule it?",
      answers: [
        { text: "Cloud Scheduler", explanation: "Correct. Cloud Scheduler is a fully managed cron-like service that can invoke HTTP targets or publish messages on a schedule." },
        { text: "A Cloud Tasks queue with one task pre-created for every future day", explanation: "Incorrect. Cloud Tasks supports scheduled delivery of individual tasks, but pre-creating recurring tasks is unnecessary when Cloud Scheduler directly provides managed cron recurrence." },
        { text: "A Workflows execution that sleeps for 24 hours between calls", explanation: "Incorrect. A continuously sleeping orchestration is more complex and costly than an external cron trigger and complicates restart behavior." },
        { text: "An Eventarc trigger filtered for the wall-clock time 02:00 UTC", explanation: "Incorrect. Eventarc routes supported events when they occur; it is not a cron scheduler that emits an event at a chosen wall-clock time." }
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
    },
    {
      id: "implementation-migrate-vms-test-clone-cutover",
      prompt: "A company is moving a stateful VMware VM to Compute Engine. It must continuously replicate disk changes while the source remains online, validate networking and OS adaptations on an isolated copy, then stop the source only for a final synchronization and production cutover. Which migration sequence should it use?",
      answers: [
        { text: "Export one virtual disk image, import it as a machine image, and repeat the full export after testing", explanation: "Incorrect. Repeated full image transfers do not provide the managed continuous replication and coordinated final synchronization required to minimize cutover downtime." },
        { text: "Use Migrate to Virtual Machines to replicate the VM, create and validate a test clone, then initiate cutover for source shutdown and final sync", explanation: "Correct. Migrate to Virtual Machines continuously replicates source disks, creates test clones from replication data while the source continues running, and performs source shutdown and final synchronization during cutover." },
        { text: "Create a Compute Engine snapshot schedule against the on-premises VMware datastore and promote the newest snapshot", explanation: "Incorrect. Compute Engine snapshot schedules operate on supported Google Cloud disks and do not orchestrate an on-premises VMware VM migration lifecycle." },
        { text: "Use Database Migration Service because the VM has state, then rebuild the operating system manually", explanation: "Incorrect. Database Migration Service migrates supported databases, not an entire VM, its disks, operating system, and target Compute Engine configuration." }
      ],
      correct: 1,
      tags: ["manage-implementation", "migration", "compute", "advanced"],
      source: S.MIGRATE_VMS
    },
    {
      id: "implementation-cloud-deploy-first-canary",
      prompt: "A team configured a Cloud Deploy canary strategy with 10%, 25%, and 50% phases for a new GKE target. On the first release to that target, Cloud Deploy skipped the partial canary phases and proceeded to the stable phase. What is the best explanation and next step?",
      answers: [
        { text: "The percentages are invalid because Cloud Deploy canaries support only a single 50% phase", explanation: "Incorrect. Cloud Deploy supports a configured progression of integer percentages, so multiple phases such as 10%, 25%, and 50% are valid." },
        { text: "The first deployment has no existing version for the canary to progressively replace; establish the stable deployment, then use the canary strategy for subsequent changes", explanation: "Correct. A canary splits or apportions deployment against an existing version recognized at the target. On a first deployment, Cloud Deploy can skip partial phases and establish the initial stable version." },
        { text: "GKE targets cannot use Cloud Deploy canaries unless the cluster is converted to Cloud Run", explanation: "Incorrect. Cloud Deploy supports canary strategies for GKE, GKE attached clusters, and Cloud Run, with runtime-specific traffic or pod handling." },
        { text: "The release must be rebuilt after manually creating 10%, 25%, and 50% Kubernetes node pools", explanation: "Incorrect. Canary percentages describe application rollout phases, not node-pool capacity partitions that users must create manually." }
      ],
      correct: 1,
      tags: ["manage-implementation", "ci-cd", "progressive-delivery", "advanced"],
      source: S.CLOUD_DEPLOY_CANARY
    },
    {
      id: "implementation-cloud-deploy-post-deployment-verification",
      prompt: "After deploying a release to a staging target, a pipeline must run containerized integration tests against the deployed application. If a test fails, the rollout must record a failed verification instead of being treated as a successful deployment. Which Cloud Deploy feature should be configured?",
      answers: [
        { text: "A pre-deployment hook that validates the artifact signature before applying manifests", explanation: "Incorrect. A pre-deployment hook can validate an artifact before rollout, but it does not exercise the application after it is running in the staging target." },
        { text: "A Cloud Build test step that runs before the image is published", explanation: "Incorrect. Build-time tests validate the artifact before deployment and cannot confirm the behavior of the deployed application and target configuration." },
        { text: "A manual approval gate between staging and production with no automated tests", explanation: "Incorrect. Approval can require human authorization to promote, but it does not execute the requested integration tests or report their results as rollout verification." },
        { text: "A Cloud Deploy verification phase with a verify task that runs the integration-test container", explanation: "Correct. Cloud Deploy runs configured verification tasks after deployment as part of the rollout. A failed verification is recorded as a failed job, so the rollout is not reported as successfully verified." }
      ],
      correct: 3,
      tags: ["manage-implementation", "ci-cd", "deployment-verification", "advanced"],
      source: S.CLOUD_DEPLOY_VERIFY
    },
    {
      id: "implementation-gke-blue-green-node-upgrade-soak",
      prompt: "A critical GKE workload is sensitive to kernel and node-image changes. The team accepts temporary extra node capacity and wants to run on the upgraded nodes for a defined soak period while retaining a rapid path back to the old node pool. Which node upgrade strategy best fits?",
      answers: [
        { text: "Configure a blue-green node-pool upgrade with an appropriate soak duration and roll back during the soak if the workload regresses", explanation: "Correct. Blue-green upgrades create a new pool, move workloads to it, and retain the old pool through a configurable soak phase. The upgrade can be rolled back before the old pool is deleted." },
        { text: "Use a surge upgrade with maxSurge set to the size of the pool and maxUnavailable set to zero", explanation: "Incorrect. Surge settings can add temporary nodes and limit disruption, but they do not retain a separate old pool for a configurable post-migration soak and rollback phase." },
        { text: "Set a maintenance window and assume GKE preserves the old node image for rollback after the upgrade", explanation: "Incorrect. A maintenance window controls when maintenance can occur; it does not select a blue-green upgrade strategy or retain the previous pool for a soak-based rollback." },
        { text: "Disable node auto-upgrades and manually recreate nodes one at a time from the new image", explanation: "Incorrect. Manual replacement can control sequencing, but it does not provide GKE's managed blue-green phases, configured soak, and built-in rollback operation." }
      ],
      correct: 0,
      tags: ["manage-implementation", "containers", "gke-upgrades", "advanced"],
      source: S.GKE_NODE_UPGRADES
    }
  ];
})();

(function () {
  "use strict";

  const S = globalThis.PCA_QUIZ_SOURCES;

  globalThis.PCA_QUIZ_ARCHITECTURE_QUESTIONS = [
    {
      id: "architecture-cloud-run-stateless-api",
      prompt: "A team has a stateless HTTPS API packaged as a container. Traffic is spiky, requests complete within the platform timeout, and the team wants request-based autoscaling without managing nodes or Kubernetes. Which service is the best fit?",
      answers: [
        { text: "Cloud Run service", explanation: "Correct. Cloud Run services provide managed HTTPS endpoints for stateless containers and automatically scale with request demand." },
        { text: "Cloud Run job invoked for each request", explanation: "Incorrect. A Cloud Run job runs work to completion and does not provide the continuously available request-serving endpoint required for the API." },
        { text: "GKE Autopilot deployment behind an Ingress", explanation: "Incorrect. Autopilot reduces node administration and can run the API, but it still introduces Kubernetes resources and controls that the team does not need." },
        { text: "A Compute Engine managed instance group behind an Application Load Balancer", explanation: "Incorrect. This can autoscale and serve HTTPS, but the team must manage VM images, startup, patching, and instance-group capacity rather than use the requested serverless container model." }
      ],
      correct: 0,
      tags: ["design-and-plan", "compute"],
      source: S.CLOUD_RUN
    },
    {
      id: "architecture-gke-kubernetes-controls",
      prompt: "A platform needs upstream Kubernetes APIs, custom controllers, DaemonSets, and direct control over node pools and pod scheduling. It wants Google to manage the control plane. Which compute platform best fits?",
      answers: [
        { text: "Cloud Run services with one service per Kubernetes workload", explanation: "Incorrect. Cloud Run abstracts Kubernetes and does not expose custom controllers, DaemonSets, node pools, or pod scheduling controls." },
        { text: "GKE Standard", explanation: "Correct. GKE Standard provides a managed Kubernetes control plane while retaining control over node pools, scheduling, controllers, and Kubernetes workload objects." },
        { text: "GKE Autopilot with no Standard node pools", explanation: "Incorrect. Autopilot provides Kubernetes APIs but Google manages node infrastructure and applies workload constraints, so it does not provide the requested direct node-pool control." },
        { text: "Self-managed Kubernetes on individual Compute Engine VMs", explanation: "Incorrect. It provides Kubernetes control but requires the team to deploy and operate the control plane, contrary to the managed-control-plane requirement." }
      ],
      correct: 1,
      tags: ["design-and-plan", "containers"],
      source: S.GKE
    },
    {
      id: "architecture-cloud-sql-relational",
      prompt: "An existing regional application uses standard PostgreSQL extensions and drivers. It needs managed backups, high availability, read replicas, and minimal migration changes, but not global horizontal write scaling. Which service should the architect choose?",
      answers: [
        { text: "AlloyDB for PostgreSQL", explanation: "Incorrect. AlloyDB is PostgreSQL-compatible and managed, but the scenario does not require its higher-performance architecture and emphasizes the simplest migration for a conventional regional PostgreSQL workload." },
        { text: "Spanner with the PostgreSQL interface", explanation: "Incorrect. Spanner provides distributed scale and a PostgreSQL-compatible interface, not full PostgreSQL behavior and extension compatibility, so it is not the minimal-change fit." },
        { text: "Cloud SQL", explanation: "Correct. Cloud SQL is a fully managed relational database service that supports PostgreSQL, MySQL, and SQL Server." },
        { text: "PostgreSQL on a Compute Engine regional managed instance group", explanation: "Incorrect. Self-managing PostgreSQL on interchangeable VMs adds database replication, failover, backup, and patching responsibilities that Cloud SQL provides as a managed service." }
      ],
      correct: 2,
      tags: ["design-and-plan", "databases"],
      source: S.CLOUD_SQL
    },
    {
      id: "architecture-spanner-global-transactions",
      prompt: "A global financial ledger needs horizontal scale, relational queries, and strongly consistent transactions across regions. Which database is the best fit?",
      answers: [
        { text: "Cloud SQL read replica", explanation: "Incorrect. Read replicas can improve read scale, but this design does not provide the stated globally distributed transactional model." },
        { text: "Bigtable", explanation: "Incorrect. Bigtable is a wide-column NoSQL database and is not the relational, strongly consistent transaction service required here." },
        { text: "Firestore", explanation: "Incorrect. Firestore is a document database and is not the best match for a globally distributed relational ledger workload." },
        { text: "Spanner", explanation: "Correct. Spanner provides relational semantics, horizontal scale, and strong transactional consistency in regional, dual-region, and multi-region configurations." }
      ],
      correct: 3,
      tags: ["design-and-plan", "databases", "global"],
      source: S.SPANNER
    },
    {
      id: "architecture-bigquery-analytics",
      prompt: "Analysts need to run ad hoc SQL over petabytes of historical event data without provisioning or managing a data warehouse cluster. Which service should they use?",
      answers: [
        { text: "Cloud SQL", explanation: "Incorrect. Cloud SQL is intended for relational application workloads, not serverless petabyte-scale analytical queries." },
        { text: "BigQuery", explanation: "Correct. BigQuery is a serverless analytics platform designed for large-scale SQL analysis." },
        { text: "A persistent Managed Service for Apache Spark cluster", explanation: "Incorrect. Spark can analyze large datasets, but a persistent cluster requires provisioning and administration that the serverless ad hoc SQL requirement avoids." },
        { text: "Spanner", explanation: "Incorrect. Spanner is a horizontally scalable transactional relational database, not the primary service for ad hoc petabyte-scale historical analytics." }
      ],
      correct: 1,
      tags: ["design-and-plan", "analytics"],
      source: S.BIGQUERY
    },
    {
      id: "architecture-filestore-shared-filesystem",
      prompt: "Several Compute Engine VMs need a shared POSIX-compatible file system that they can mount concurrently. Which storage service is the best fit?",
      answers: [
        { text: "Filestore", explanation: "Correct. Filestore provides managed Network File System (NFS) file shares for workloads that need shared file-system access." },
        { text: "Cloud Storage", explanation: "Incorrect. Cloud Storage is object storage and does not provide a native shared POSIX file system." },
        { text: "A Persistent Disk in multi-writer mode mounted as a general-purpose NFS share", explanation: "Incorrect. Multi-writer block storage has filesystem and workload constraints and does not itself provide a managed NFS file service to the VMs." },
        { text: "A Persistent Disk attached read-write to one VM and read-only to the others", explanation: "Incorrect. This does not provide concurrent shared read-write file semantics across the VMs and creates a file-server dependency on one VM." }
      ],
      correct: 0,
      tags: ["design-and-plan", "storage"],
      source: S.FILESTORE
    },
    {
      id: "architecture-cloud-storage-objects",
      prompt: "An application needs highly durable storage for images, backups, and static assets addressed as objects rather than rows or files. Which service is the best fit?",
      answers: [
        { text: "Persistent Disk", explanation: "Incorrect. Persistent Disk is block storage attached to Compute Engine VMs and is not a globally addressed object store for application assets and backups." },
        { text: "Filestore", explanation: "Incorrect. Filestore is a managed NFS file service, which is different from object storage." },
        { text: "Cloud Storage", explanation: "Correct. Cloud Storage is Google Cloud's object storage service for unstructured data such as images, backups, and static assets." },
        { text: "Firestore", explanation: "Incorrect. Firestore stores structured documents and indexes rather than immutable or unstructured blobs addressed as objects." }
      ],
      correct: 2,
      tags: ["design-and-plan", "storage"],
      source: S.CLOUD_STORAGE
    },
    {
      id: "architecture-pubsub-fanout",
      prompt: "When an order is placed, independent billing, notification, and analytics services must each receive an event without the order service calling them synchronously. Which service should decouple this fan-out?",
      answers: [
        { text: "One Cloud Tasks queue shared by all three services", explanation: "Incorrect. A task is dispatched to an explicit handler and processed as one unit of work; one queue does not independently fan the same event out to three subscribers." },
        { text: "Pub/Sub", explanation: "Correct. Pub/Sub uses topics and subscriptions to decouple event publishers from multiple independent consumers." },
        { text: "A Workflows execution that calls billing, notification, and analytics in sequence", explanation: "Incorrect. This explicitly couples the order path to a fixed orchestration and does not give each consumer an independent event subscription." },
        { text: "Eventarc with one trigger that selects one destination service", explanation: "Incorrect. Eventarc can route events to supported destinations, but a single trigger has one destination; separate consumers still need separate triggers or Pub/Sub subscriptions, and Pub/Sub directly fits this application fan-out." }
      ],
      correct: 1,
      tags: ["design-and-plan", "integration"],
      source: S.PUBSUB
    },
    {
      id: "architecture-shared-vpc-central-network",
      prompt: "Multiple application teams need separate projects, while a central network team must control subnets, routes, and firewall rules. Which network model best fits?",
      answers: [
        { text: "A separate VPC in each project joined by VPC Network Peering", explanation: "Incorrect. A peering mesh preserves separate networks but distributes network ownership and route relationships rather than giving teams resources on centrally administered subnets." },
        { text: "Private Service Connect endpoints from every project to a central producer VPC", explanation: "Incorrect. Private Service Connect exposes selected producer services privately; it does not let application VMs attach to centrally managed subnets or centralize their routes and firewall rules." },
        { text: "A Network Connectivity Center hub with every project VPC as a spoke", explanation: "Incorrect. Network Connectivity Center centralizes connectivity and route exchange among separate VPCs, but each team still owns its VPC resources. It does not provide the host-project and service-project administration model requested." },
        { text: "Shared VPC", explanation: "Correct. Shared VPC uses a host project for centrally managed network resources and service projects for application resources." }
      ],
      correct: 3,
      tags: ["design-and-plan", "networking"],
      source: S.SHARED_VPC
    },
    {
      id: "architecture-dedicated-interconnect",
      prompt: "An on-premises data center must exchange a sustained high volume of traffic with Google Cloud over a low-latency private physical connection. The company can establish a direct connection at a colocation facility. Which option is the best fit?",
      answers: [
        { text: "Dedicated Interconnect", explanation: "Correct. Dedicated Interconnect provides a direct physical connection between an on-premises network and Google's network." },
        { text: "Partner Interconnect", explanation: "Incorrect. Partner Interconnect provides connectivity through a supported service provider; the company can connect directly at a colocation facility and therefore fits Dedicated Interconnect." },
        { text: "HA VPN with multiple high-availability tunnels", explanation: "Incorrect. HA VPN can provide encrypted hybrid connectivity but traverses the public internet and is not the requested direct physical connection for sustained high volume." },
        { text: "Cross-Cloud Interconnect", explanation: "Incorrect. Cross-Cloud Interconnect is designed for dedicated connectivity between Google Cloud and another cloud provider, not the stated on-premises colocation connection." }
      ],
      correct: 0,
      tags: ["design-and-plan", "hybrid-networking"],
      source: S.INTERCONNECT
    },
    {
      id: "architecture-ha-vpn-encrypted-hybrid",
      prompt: "A company needs encrypted connectivity between its on-premises network and a VPC without ordering a physical cross-connect. Which service provides IPsec tunnels over the public internet?",
      answers: [
        { text: "Dedicated Interconnect with no additional encryption", explanation: "Incorrect. Dedicated Interconnect requires a physical connection and does not provide the requested IPsec tunnels over the public internet." },
        { text: "Partner Interconnect through a service provider", explanation: "Incorrect. Partner Interconnect still requires ordering provider connectivity and is not the requested internet-based IPsec option." },
        { text: "HA VPN", explanation: "Correct. HA VPN establishes highly available IPsec VPN tunnels between a VPC and a peer network over the public internet." },
        { text: "Network Connectivity Center with router appliance spokes only", explanation: "Incorrect. Network Connectivity Center can orchestrate hybrid connectivity, but router appliances alone do not create the requested managed IPsec tunnels over the internet." }
      ],
      correct: 2,
      tags: ["design-and-plan", "hybrid-networking"],
      source: S.VPN
    },
    {
      id: "architecture-global-external-application-lb",
      prompt: "A public HTTP application has healthy backends in multiple regions and needs one global frontend that routes requests to suitable healthy backends. Which component should be used?",
      answers: [
        { text: "A regional external Application Load Balancer in each backend region with DNS round robin", explanation: "Incorrect. This creates multiple regional frontends and DNS-based distribution rather than the requested single global anycast frontend with health-aware backend routing." },
        { text: "An external Application Load Balancer", explanation: "Correct. An external Application Load Balancer provides a global HTTP(S) frontend and can distribute traffic across regional backends." },
        { text: "A global external proxy Network Load Balancer", explanation: "Incorrect. A proxy Network Load Balancer can provide a global frontend for TCP traffic, but it does not provide the requested HTTP-aware Application Load Balancer behavior." },
        { text: "Cloud CDN in front of one regional backend without a load balancer", explanation: "Incorrect. Cloud CDN accelerates cacheable content and uses a load-balancing origin; it does not by itself route all dynamic requests among healthy multi-region backends." }
      ],
      correct: 1,
      tags: ["design-and-plan", "networking", "reliability"],
      source: S.LOAD_BALANCING
    },
    {
      id: "architecture-bigtable-time-series-row-key",
      prompt: "An IoT platform writes millions of readings per second to Bigtable. Its current row keys begin with an event timestamp, causing sequential writes to concentrate on one tablet. The dominant query retrieves a time range for one device. Which row-key design best addresses both requirements?",
      answers: [
        { text: "Use a high-cardinality device ID followed by the event timestamp", explanation: "Correct. A high-cardinality device prefix distributes writes, while the timestamp suffix keeps each device's readings in a row range that can be queried efficiently." },
        { text: "Use timestamp followed by device ID", explanation: "Incorrect. A timestamp prefix keeps sequential writes adjacent and continues to create a hotspot." },
        { text: "Hash the complete row key and discard the original device and time components", explanation: "Incorrect. A full hash can distribute writes, but it destroys the contiguous row ranges needed for efficient per-device time-range reads." },
        { text: "Store every reading for a device as a new cell in one permanent row", explanation: "Incorrect. Repeatedly updating one row creates a hot row and risks unbounded row growth." }
      ],
      correct: 0,
      tags: ["design-and-plan", "databases", "bigtable", "advanced"],
      source: S.BIGTABLE_SCHEMA
    },
    {
      id: "architecture-dataflow-event-time-windows",
      prompt: "A retailer publishes click events to Pub/Sub. It needs continuously updated five-minute event-time aggregates, must revise results when late events arrive, and does not want to manage a processing cluster. Which design best fits?",
      answers: [
        { text: "Run a nightly Dataproc batch job over exported messages", explanation: "Incorrect. A nightly batch does not provide continuously updated event-time results." },
        { text: "Have a Cloud Run push endpoint increment one global counter", explanation: "Incorrect. A global counter does not implement event-time windows, late-data handling, or distributed state management." },
        { text: "Use a Dataflow streaming pipeline with event-time windows, watermarks, and triggers", explanation: "Correct. Dataflow supports managed streaming execution and Apache Beam semantics for event-time windows, watermarks, triggers, and late data." },
        { text: "Run a BigQuery scheduled query every five minutes over the Pub/Sub topic", explanation: "Incorrect. Scheduled queries operate on data stored in BigQuery and do not directly provide the required streaming window and late-data semantics over a topic." }
      ],
      correct: 2,
      tags: ["design-and-plan", "analytics", "streaming", "advanced"],
      source: S.DATAFLOW_STREAMING
    },
    {
      id: "architecture-alloydb-read-pool",
      prompt: "A PostgreSQL-compatible application has a write-heavy transactional primary and a rapidly growing read workload. It requires automatic failover for the primary and one read endpoint that load-balances across multiple read nodes without application-level sharding. Which architecture best fits?",
      answers: [
        { text: "A basic single-zone AlloyDB primary with no read pool", explanation: "Incorrect. A basic primary has no standby and does not provide horizontal read scaling." },
        { text: "An AlloyDB highly available primary plus a multi-node read pool", explanation: "Correct. The highly available primary uses redundant nodes across zones, while an AlloyDB read pool provides a load-balanced read-only endpoint across its nodes." },
        { text: "A single Cloud SQL instance with a larger disk", explanation: "Incorrect. Increasing disk size does not create a load-balanced set of read nodes or add the requested read scale." },
        { text: "A Spanner database with no application or schema changes", explanation: "Incorrect. Spanner is not a drop-in PostgreSQL deployment and would require compatibility and migration work not allowed by the scenario." }
      ],
      correct: 1,
      tags: ["design-and-plan", "databases", "alloydb", "advanced"],
      source: S.ALLOYDB
    },
    {
      id: "architecture-private-service-connect-published-api",
      prompt: "A platform team operates an internal API in a producer VPC. Many independently managed consumer VPCs, some with overlapping address ranges, need private access through endpoints in their own networks. The producer must approve consumers without creating a peering mesh. Which design should be used?",
      answers: [
        { text: "Peer every consumer VPC directly with the producer VPC", explanation: "Incorrect. VPC Network Peering creates broad network connectivity, does not solve overlapping address ranges, and produces the peering mesh the team wants to avoid." },
        { text: "Move every consumer workload into the producer's Shared VPC", explanation: "Incorrect. Shared VPC would require centralizing the consumer projects on one network and does not preserve the independently managed consumer VPC model." },
        { text: "Expose the API through a public load balancer and restrict it by source IP", explanation: "Incorrect. This creates a public endpoint and relies on source-IP controls instead of the required private consumer endpoints." },
        { text: "Publish the API with Private Service Connect and let consumers create approved endpoints", explanation: "Correct. Private Service Connect published services expose a producer service through private endpoints in consumer VPCs without peering the networks, and the producer can control connection acceptance." }
      ],
      correct: 3,
      tags: ["design-and-plan", "networking", "private-service-connect", "advanced"],
      source: S.PRIVATE_SERVICE_CONNECT
    },
    {
      id: "architecture-ha-vpn-over-interconnect-encryption",
      prompt: "A company uses Dedicated Interconnect for sustained high-throughput hybrid traffic. A new policy requires IPsec encryption from the on-premises routers to the VPC while keeping traffic off the public internet. Which change satisfies the policy?",
      answers: [
        { text: "Keep the Dedicated Interconnect VLAN attachments unchanged because Interconnect encrypts all traffic with IPsec by default", explanation: "Incorrect. Cloud Interconnect traffic is not automatically protected by end-to-end IPsec." },
        { text: "Replace Interconnect with HA VPN tunnels over the public internet", explanation: "Incorrect. HA VPN provides IPsec, but using it by itself sends the traffic over the public internet and discards the required Interconnect path." },
        { text: "Deploy HA VPN over Cloud Interconnect using VLAN attachments configured for IPsec encryption", explanation: "Correct. HA VPN over Cloud Interconnect combines Interconnect capacity and private routing with IPsec tunnels between the peer network and the VPC." },
        { text: "Enable MACsec only on the physical Interconnect circuit", explanation: "Incorrect. MACsec protects the link between adjacent routers, not the complete Layer 3 path from the on-premises network to VPC workloads required by the policy." }
      ],
      correct: 2,
      tags: ["design-and-plan", "hybrid-networking", "encryption", "advanced"],
      source: S.HA_VPN_INTERCONNECT
    },
    {
      id: "architecture-cloud-tasks-controlled-dispatch",
      prompt: "An order API must invoke one specific fulfillment endpoint for every accepted order. The endpoint can process at most 20 requests per second and 10 concurrently. Each invocation might be delayed until a requested time, must use bounded retries, and should reject duplicate task creation when the order ID is reused. Which design best fits?",
      answers: [
        { text: "Create a Cloud Tasks queue with dispatch and concurrency limits, use scheduled HTTP tasks named from order IDs, and make the handler idempotent", explanation: "Correct. Cloud Tasks provides explicit endpoint invocation, scheduling, queue-level dispatch controls, bounded retry configuration, and task-name deduplication. The handler should still be idempotent because delivery is at least once." },
        { text: "Publish orders to one Pub/Sub push subscription and use ordering keys to enforce the endpoint's rate and deduplicate order IDs", explanation: "Incorrect. Pub/Sub is appropriate for decoupled event delivery, but ordering keys do not provide producer-controlled scheduling, task-name deduplication, or explicit queue dispatch and concurrency limits." },
        { text: "Create one Cloud Scheduler job per order and retry each job until the endpoint acknowledges it", explanation: "Incorrect. Cloud Scheduler is intended for recurring or scheduled triggers, not a high-volume task queue with per-queue concurrency, retry, and deduplication controls." },
        { text: "Start one Workflows execution per order and rely on the endpoint to return HTTP 429 when overloaded", explanation: "Incorrect. Workflows can orchestrate calls, but this design lacks the requested managed dispatch-rate and concurrency controls and shifts overload management to reactive failures." }
      ],
      correct: 0,
      tags: ["design-and-plan", "integration", "cloud-tasks", "advanced"],
      source: S.CLOUD_TASKS_COMPARISON
    },
    {
      id: "architecture-serverless-spark-batch",
      prompt: "A company has an existing PySpark batch application whose input varies from gigabytes to terabytes. It runs a few times per week, needs standard Spark semantics, stores durable data outside the compute environment, and should not require a team to size or keep a cluster running. Which execution model best fits?",
      answers: [
        { text: "Keep a fixed Managed Service for Apache Spark cluster running between jobs to avoid startup time", explanation: "Incorrect. A persistent fixed cluster retains cluster sizing and idle-capacity management, contrary to the intermittent workload and no-cluster-operations requirement." },
        { text: "Rewrite the application for Apache Beam and run it as a continuously active Dataflow streaming pipeline", explanation: "Incorrect. Dataflow is managed, but rewriting a finite PySpark batch workload as a continuous Beam pipeline is unnecessary and changes the programming model." },
        { text: "Submit it as a Managed Service for Apache Spark serverless batch workload", explanation: "Correct. The serverless deployment runs PySpark on managed compute, autoscales workload resources, requires no cluster provisioning, and charges for the workload execution rather than idle cluster time." },
        { text: "Install a Spark operator on a self-managed GKE Standard cluster and autoscale its node pools", explanation: "Incorrect. This preserves Spark but introduces Kubernetes, node-pool, and operator administration that the requirements explicitly avoid." }
      ],
      correct: 2,
      tags: ["design-and-plan", "analytics", "spark", "advanced"],
      source: S.SERVERLESS_SPARK
    },
    {
      id: "architecture-gke-standard-privileged-agent",
      prompt: "A platform must run a customer-developed node security agent as a privileged DaemonSet. The agent uses host namespaces, requires a custom node configuration, and is not covered by an approved Autopilot workload allowlist. The team accepts responsibility for node capacity and lifecycle. Which GKE design is appropriate?",
      answers: [
        { text: "An Autopilot cluster with ordinary workload settings", explanation: "Incorrect. Autopilot applies security constraints that reject most privileged workloads, and this custom agent has no applicable allowlist." },
        { text: "A GKE Standard cluster with administrator-managed node pools", explanation: "Correct. Standard mode is intended for workloads that need special privileges and granular control over node infrastructure and configuration." },
        { text: "A Standard cluster that schedules this agent onto an Autopilot ComputeClass", explanation: "Incorrect. Workloads selected for Autopilot mode in a Standard cluster remain subject to Autopilot constraints, so this does not satisfy the unallowlisted privileged-agent requirement." },
        { text: "A Cloud Run worker pool with one container instance per VPC subnet", explanation: "Incorrect. Cloud Run does not expose Kubernetes DaemonSets, host namespaces, or controllable cluster nodes to the workload." }
      ],
      correct: 1,
      tags: ["design-and-plan", "containers", "gke", "advanced"],
      source: S.GKE_MODES
    },
    {
      id: "architecture-spanner-default-leader-placement",
      prompt: "A Spanner multi-region database has read-write regions in the United States and Europe. Most read-write transactions now originate in Europe, but the database's default leader remains in the United States and write latency has increased. The instance configuration and data placement must remain unchanged. What should the architect do?",
      answers: [
        { text: "Add another read-only replica in Europe and send all read-write transactions to it", explanation: "Incorrect. Read-only replicas can serve reads but do not process writes or become an eligible default leader." },
        { text: "Move the database's default leader to the eligible European read-write region and keep write-heavy compute near it", explanation: "Correct. Writes are processed in the default leader region. Changing the leader to the European read-write region reduces the client-to-leader portion of write latency without moving data or changing the instance configuration." },
        { text: "Use stale reads for every transaction so that the European replica can commit locally", explanation: "Incorrect. Staleness can improve read locality, but a read-write transaction must still commit through the leader and cannot use a read-only replica for local commits." },
        { text: "Disable leader-aware routing so European clients always connect to a local Spanner frontend", explanation: "Incorrect. A local frontend does not move write leadership, and disabling leader-aware routing can add round trips for transactions originating outside the leader region." }
      ],
      correct: 1,
      tags: ["design-and-plan", "databases", "spanner", "advanced"],
      source: S.SPANNER_CONFIGURATIONS
    },
    {
      id: "architecture-apigee-partner-api-program",
      prompt: "A company is exposing APIs from several unchanged backend systems to hundreds of partners. It needs a stable proxy facade, OAuth and API-key policies, partner-specific products and quotas, self-service developer onboarding, and usage analytics. Which platform should front the backends?",
      answers: [
        { text: "Apigee API Management with API proxies, products, policies, a developer portal, and analytics", explanation: "Correct. Apigee provides an API proxy layer plus security and traffic policies, API products and quotas, developer publishing capabilities, and detailed API analytics without requiring those controls in each backend." },
        { text: "API Gateway with one OpenAPI configuration and Cloud Logging", explanation: "Incorrect. API Gateway can secure and expose APIs, but it is not the full partner API program platform described, including API products, partner-specific monetization-style quotas, an integrated developer portal, and deep consumer analytics." },
        { text: "An external Application Load Balancer with Cloud Armor rate-limiting rules", explanation: "Incorrect. Load balancing and edge security do not provide API products, OAuth token policies, developer onboarding, or consumer-level API analytics." },
        { text: "API hub as the runtime proxy and enforcement point for all partner requests", explanation: "Incorrect. API hub catalogs and governs API metadata across an API landscape; it is not the runtime proxy layer that enforces request security and quotas." }
      ],
      correct: 0,
      tags: ["design-and-plan", "integration", "api-management", "advanced"],
      source: S.APIGEE
    },
    {
      id: "architecture-bigquery-omni-s3-in-place",
      prompt: "A data team needs to run BigQuery SQL over a large dataset that remains in Amazon S3. Data residency policy prohibits copying the raw dataset into Google Cloud, and analysts should use a BigQuery table abstraction. Which design best fits?",
      answers: [
        { text: "Create a BigLake table over the S3 data with BigQuery Omni in a supported, colocated region", explanation: "Correct. BigQuery Omni processes queries near supported S3 data and BigLake tables provide the BigQuery table abstraction without requiring the raw dataset to be copied into Google Cloud." },
        { text: "Configure a recurring Storage Transfer Service job to copy S3 objects into a BigQuery landing bucket", explanation: "Incorrect. This creates a copy of the raw data in Google Cloud, violating the residency requirement even if the transfer is incremental." },
        { text: "Load the S3 objects into native BigQuery tables with the BigQuery Data Transfer Service before each analysis", explanation: "Incorrect. Loading data into native BigQuery tables moves and stores the dataset in Google Cloud rather than querying it in place." },
        { text: "Run Amazon Athena queries and export each result set to BigQuery before analysts can use SQL", explanation: "Incorrect. This keeps the source data in S3 but moves results through a separate query system and does not provide analysts the requested BigQuery table abstraction over the source." }
      ],
      correct: 0,
      tags: ["design-and-plan", "analytics", "multicloud", "advanced"],
      source: S.BIGQUERY_OMNI
    },
    {
      id: "architecture-cloud-run-jobs-parallel-shards",
      prompt: "A containerized batch process must handle 8,000 independent file shards. Each shard can run for up to 40 minutes, may need a bounded retry, and the downstream database can accept only 60 concurrent workers. The team does not want to operate a cluster. Which execution design best fits?",
      answers: [
        { text: "Run a Cloud Run service with 8,000 concurrent HTTP requests and rely on its instance concurrency setting to cap database sessions", explanation: "Incorrect. A service handles requests rather than finite indexed job tasks, and per-instance request concurrency does not directly impose the requested total worker limit across autoscaled instances." },
        { text: "Run one Cloud Run job with 8,000 tasks, set parallelism to 60 and a task timeout of at least 40 minutes, and make each task idempotent for retries", explanation: "Correct. Cloud Run jobs support many independent tasks, a configurable maximum task parallelism, per-task timeouts and bounded retries. Idempotent tasks protect against repeating a shard after a failed attempt." },
        { text: "Submit the workload to Cloud Batch with a managed instance template and task group", explanation: "Incorrect. Cloud Batch is a valid managed batch service, but it adds VM provisioning and compute configuration for independent container shards that Cloud Run Jobs can run serverlessly with a direct task-parallelism limit." },
        { text: "Create a long-running Managed Service for Apache Spark cluster and launch one Spark executor per file", explanation: "Incorrect. Spark can process parallel files, but it introduces a cluster and a different execution model when the existing work is already partitioned into independent container tasks." }
      ],
      correct: 1,
      tags: ["design-and-plan", "compute", "batch", "advanced"],
      source: S.CLOUD_RUN_JOBS
    },
    {
      id: "architecture-gke-multicluster-gateway-services",
      prompt: "A company runs the same Kubernetes service in GKE clusters in three regions. It needs a single Gateway API entry point to route clients to service endpoints across those clusters, while keeping cluster membership and service discovery under fleet management. Which design should it use?",
      answers: [
        { text: "Create a separate Ingress in each cluster and publish all ingress IPs in a round-robin DNS record", explanation: "Incorrect. This creates independent frontends and DNS-based selection rather than the requested single Gateway API entry point with fleet-based multi-cluster service discovery." },
        { text: "Create a multi-cluster Service but keep a standard single-cluster Gateway controller", explanation: "Incorrect. Multi-cluster Services provide cross-cluster service discovery, but a standard single-cluster Gateway controller does not provide the multi-cluster Gateway data plane and routing behavior." },
        { text: "Register the clusters to a fleet, enable multi-cluster Services, and configure a multi-cluster Gateway", explanation: "Correct. GKE multi-cluster Gateways use fleet membership and multi-cluster Services to discover and route to Kubernetes Services across participating clusters through Gateway API resources." },
        { text: "Configure GKE Multi-cluster Ingress with a global external Application Load Balancer", explanation: "Incorrect. Multi-cluster Ingress can provide global multi-cluster routing, but it uses the Ingress API rather than the requested Gateway API entry point and multi-cluster Gateway controller." }
      ],
      correct: 2,
      tags: ["design-and-plan", "containers", "networking", "advanced"],
      source: S.GKE_MULTICLUSTER_GATEWAY
    },
    {
      id: "architecture-composer-existing-airflow-dags",
      prompt: "An analytics team has hundreds of production Apache Airflow DAGs with custom operators, Python dependencies, and schedules. It wants Google to manage the Airflow environment while preserving the DAG programming model and existing orchestration integrations. Which service is the best fit?",
      answers: [
        { text: "Workflows, translating each Airflow operator directly into a Workflows YAML step without changing the DAGs", explanation: "Incorrect. Workflows is a managed service-orchestration engine, but it does not execute Apache Airflow DAGs or Airflow operators directly." },
        { text: "Cloud Scheduler with one job for each Airflow task", explanation: "Incorrect. Scheduler triggers recurring jobs but does not provide Airflow's DAG dependency graph, task state, retries, and scheduling semantics." },
        { text: "A Cloud Run job for each DAG, with task dependencies encoded as container startup scripts", explanation: "Incorrect. Cloud Run jobs execute finite tasks but do not provide the Airflow scheduler, DAG state model, operator ecosystem, or managed Airflow compatibility required." },
        { text: "Managed Service for Apache Airflow, using a Composer environment for the existing DAGs", explanation: "Correct. Managed Service for Apache Airflow runs Apache Airflow as a managed service and is designed to operate Airflow DAGs, dependencies, operators, and integrations with Google Cloud." }
      ],
      correct: 3,
      tags: ["design-and-plan", "analytics", "orchestration", "advanced"],
      source: S.CLOUD_COMPOSER
    },
    {
      id: "architecture-cloud-run-direct-vpc-egress-static-ip",
      prompt: "A Cloud Run service must reach a private database through its VPC and call a third-party API through one static source IP. The team wants all outbound traffic routed through its VPC and does not want to manage a Serverless VPC Access connector. Which design meets the requirements?",
      answers: [
        { text: "Use Direct VPC egress with all traffic routed through the VPC, then configure Cloud NAT with a reserved external address", explanation: "Correct. Direct VPC egress connects Cloud Run instances to the VPC without a connector. Routing all egress through the VPC lets Cloud NAT provide the reserved source IP for the third-party API while private routes reach the database." },
        { text: "Use Direct VPC egress for private ranges only and reserve a Cloud NAT address for the third-party API", explanation: "Incorrect. Private-ranges-only egress sends private database traffic through the VPC but sends public API traffic directly from Cloud Run, bypassing the Cloud NAT address." },
        { text: "Use a Serverless VPC Access connector, route all traffic through it, and configure Cloud NAT with a reserved external address", explanation: "Incorrect. This can provide the required routing and static egress, but it retains the connector the team explicitly does not want to manage." },
        { text: "Assign a reserved external address directly to the Cloud Run service and keep VPC egress disabled", explanation: "Incorrect. Cloud Run services do not attach a reserved external IP directly as their outbound address, and disabling VPC egress prevents the private database path." }
      ],
      correct: 0,
      tags: ["design-and-plan", "networking", "serverless", "advanced"],
      source: S.CLOUD_RUN_VPC
    },
    {
      id: "architecture-cloud-cdn-private-media-signed-urls",
      prompt: "A media service stores large video objects in a private Cloud Storage bucket. Viewers without Google accounts need time-limited access to individual videos, and repeat downloads should be served from a global cache rather than through the application. Which design best fits?",
      answers: [
        { text: "Enable Cloud CDN on a backend bucket, configure Cloud CDN signed URLs, and grant the Cloud CDN service identity access to the private bucket", explanation: "Correct. Cloud CDN signed URLs authorize time-limited access through the cache, while private bucket access lets the CDN retrieve objects without making the bucket public or proxying video through the application." },
        { text: "Generate Cloud Storage signed URLs for the private objects and have viewers download directly from the bucket", explanation: "Incorrect. Cloud Storage signed URLs provide time-limited access, but direct bucket requests bypass the Cloud CDN cache requested by the scenario." },
        { text: "Enable Cloud CDN on a backend bucket and grant allUsers object viewer access so the CDN can fetch objects", explanation: "Incorrect. Public bucket access would let users bypass the time-limited authorization and read objects directly from the origin." },
        { text: "Put a Cloud Run proxy behind an external Application Load Balancer and stream each video to the viewer", explanation: "Incorrect. A proxy can enforce application authorization, but it keeps large object delivery on the application path and does not meet the requirement to serve repeat downloads from the CDN cache." }
      ],
      correct: 0,
      tags: ["design-and-plan", "storage", "networking", "advanced"],
      source: S.CLOUD_CDN_SIGNED_URLS
    },
    {
      id: "architecture-datastream-database-to-bigquery-cdc",
      prompt: "A company must replicate an operational PostgreSQL database into BigQuery. Analysts need an initial historical load followed by near-real-time inserts, updates, and deletes, while the team wants to avoid maintaining database-log readers and batch export jobs. Which service should it use?",
      answers: [
        { text: "Datastream with a BigQuery destination and a stream configured for backfill and change data capture", explanation: "Correct. Datastream performs an initial backfill and then continuously replicates supported database changes to BigQuery without requiring the team to operate its own change-log reader." },
        { text: "Database Migration Service with BigQuery as the migration destination", explanation: "Incorrect. Database Migration Service supports database migration workflows, but it does not provide the described direct continuous replication into BigQuery." },
        { text: "A scheduled Dataflow batch job that queries the source tables every few minutes", explanation: "Incorrect. Polling tables can miss or duplicate changes and requires the team to build checkpointing and delete detection instead of using source change logs." },
        { text: "Storage Transfer Service to copy database data files into a BigQuery dataset", explanation: "Incorrect. Storage Transfer Service moves objects between storage locations; copying database files does not apply transactional row-level inserts, updates, and deletes to BigQuery." }
      ],
      correct: 0,
      tags: ["design-and-plan", "analytics", "databases", "advanced"],
      source: S.DATASTREAM
    },
    {
      id: "architecture-pubsub-per-entity-ordering",
      prompt: "An order-processing system publishes status events for thousands of orders. Events for the same order must be delivered in publish order, but unrelated orders should continue processing concurrently. Which Pub/Sub design best meets the requirement?",
      answers: [
        { text: "Publish every event with the same global ordering key and enable message ordering on the subscription", explanation: "Incorrect. A single key preserves order but serializes unrelated orders behind the same ordering stream, reducing the required concurrency." },
        { text: "Set each order ID as its message ordering key and enable message ordering on the subscription", explanation: "Correct. Pub/Sub preserves ordering for messages with the same key, allowing each order's events to remain ordered while different keys are processed independently." },
        { text: "Create one topic per order and let consumers subscribe to every topic", explanation: "Incorrect. Separate topics could isolate order streams, but creating and managing a topic for each order is not a scalable substitute for ordering keys." },
        { text: "Publish without ordering keys and have consumers sort each batch by event timestamp", explanation: "Incorrect. Sorting a received batch cannot guarantee order across separate deliveries or prevent a later event from being processed before an earlier one." }
      ],
      correct: 1,
      tags: ["design-and-plan", "integration", "messaging", "advanced"],
      source: S.PUBSUB_ORDERING
    },
    {
      id: "architecture-eventarc-cloud-storage-trigger",
      prompt: "When an object is finalized in one Cloud Storage bucket, a Cloud Run service must start processing it. The service should receive managed event delivery with retries, and the team does not want to poll the bucket or modify the uploader. Which design is the best fit?",
      answers: [
        { text: "Create an Eventarc trigger for the Cloud Storage object-finalized event, filter it to the bucket, and route it to the Cloud Run service", explanation: "Correct. Eventarc routes supported Cloud Storage events to Cloud Run, and filtering the trigger to the bucket avoids polling or adding event-publishing logic to the uploader." },
        { text: "Create a Cloud Scheduler job that lists the bucket on a short interval and invokes the service for new objects", explanation: "Incorrect. Polling adds recurring API calls and requires state to distinguish new objects, while the requirement is for event-driven delivery." },
        { text: "Configure a Cloud Tasks queue with one recurring task for each object name", explanation: "Incorrect. Cloud Tasks dispatches explicitly created tasks to a handler; it does not observe Cloud Storage object events or create tasks when objects arrive." },
        { text: "Run a Cloud Run job on a schedule and scan the bucket before exiting", explanation: "Incorrect. A scheduled scan can eventually find objects, but it is batch polling rather than managed event delivery when an object is finalized." }
      ],
      correct: 0,
      tags: ["design-and-plan", "integration", "event-driven", "advanced"],
      source: S.EVENTARC
    },
    {
      id: "architecture-transfer-appliance-limited-bandwidth",
      prompt: "A research organization must move 200 TB of historical files into Cloud Storage within six weeks. Its existing internet link is 100 Mbps, a new circuit is not feasible, and shipping encrypted equipment is permitted. Which transfer method should it choose?",
      answers: [
        { text: "Use Transfer Appliance in offline mode, copy the files to the appliance, and ship it to Google for ingestion", explanation: "Correct. Transfer Appliance moves bulk data without consuming the constrained outbound internet link, making it appropriate when an online transfer would exceed the deadline." },
        { text: "Run Storage Transfer Service for on-premises data over the existing 100-Mbps connection", explanation: "Incorrect. The managed service can transfer the files, but the available network bandwidth remains the bottleneck and cannot meet the stated schedule." },
        { text: "Use gsutil parallel composite uploads over the existing connection", explanation: "Incorrect. Parallel uploads can improve utilization of available bandwidth, but they cannot overcome the link's total capacity for this data volume." },
        { text: "Order Dedicated Interconnect and transfer the files through a new private circuit", explanation: "Incorrect. Interconnect could provide high-throughput connectivity, but the scenario rules out establishing a new circuit and permits physical transfer instead." }
      ],
      correct: 0,
      tags: ["design-and-plan", "migration", "storage", "advanced"],
      source: S.TRANSFER_APPLIANCE
    }
  ];
})();

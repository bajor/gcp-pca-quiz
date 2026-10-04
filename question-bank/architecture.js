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
    }
  ];
})();

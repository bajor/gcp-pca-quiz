(function () {
  "use strict";

  const S = globalThis.PCA_QUIZ_SOURCES;

  globalThis.PCA_QUIZ_ARCHITECTURE_QUESTIONS = [
    {
      id: "architecture-cloud-run-stateless-api",
      prompt: "A team has a stateless HTTPS API packaged as a container. Traffic is spiky, and the team does not need Kubernetes-specific controls. Which service is the best fit?",
      answers: [
        { text: "Cloud Run service", explanation: "Correct. Cloud Run services provide managed HTTPS endpoints for stateless containers and automatically scale with request demand." },
        { text: "Cloud Run job", explanation: "Incorrect. A Cloud Run job runs work to completion; it is not the resource type for continuously serving an HTTPS API." },
        { text: "Google Kubernetes Engine cluster", explanation: "Incorrect. GKE can run the API, but it adds Kubernetes cluster and workload management that the stated requirements do not need." },
        { text: "Compute Engine virtual machine", explanation: "Incorrect. A VM can host an API, but the team would need to manage its operating system, scaling, and availability design." }
      ],
      correct: 0,
      tags: ["design-and-plan", "compute"],
      source: S.CLOUD_RUN
    },
    {
      id: "architecture-gke-kubernetes-controls",
      prompt: "A platform needs Kubernetes APIs, custom controllers, DaemonSets, and control over pod scheduling. Which managed compute platform best fits these requirements?",
      answers: [
        { text: "Cloud Run", explanation: "Incorrect. Cloud Run runs containers without exposing Kubernetes primitives such as DaemonSets or custom controllers." },
        { text: "Google Kubernetes Engine", explanation: "Correct. GKE is Google Cloud's managed Kubernetes service and supports Kubernetes workloads and APIs." },
        { text: "App Engine standard environment", explanation: "Incorrect. App Engine abstracts the runtime platform and does not provide the required Kubernetes control plane or workload objects." },
        { text: "Cloud Storage", explanation: "Incorrect. Cloud Storage is object storage, not a container orchestration platform." }
      ],
      correct: 1,
      tags: ["design-and-plan", "containers"],
      source: S.GKE
    },
    {
      id: "architecture-cloud-sql-relational",
      prompt: "An existing application uses PostgreSQL and needs a managed relational database with backups, replication options, and database administration handled by Google Cloud. Which service should the architect choose?",
      answers: [
        { text: "Cloud Storage", explanation: "Incorrect. Cloud Storage stores objects and does not provide a PostgreSQL-compatible relational database engine." },
        { text: "BigQuery", explanation: "Incorrect. BigQuery is an analytical data platform, not the managed transactional PostgreSQL service described." },
        { text: "Cloud SQL", explanation: "Correct. Cloud SQL is a fully managed relational database service that supports PostgreSQL, MySQL, and SQL Server." },
        { text: "Memorystore", explanation: "Incorrect. Memorystore provides managed in-memory caching, not a PostgreSQL database." }
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
        { text: "Filestore", explanation: "Incorrect. Filestore provides managed file storage, not an analytical SQL engine." },
        { text: "Cloud VPN", explanation: "Incorrect. Cloud VPN provides network connectivity and does not store or query data." }
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
        { text: "BigQuery", explanation: "Incorrect. BigQuery is for analytical data processing, not mounted file shares." },
        { text: "Persistent Disk attached to one VM", explanation: "Incorrect. A Persistent Disk is block storage and this answer does not satisfy concurrent shared file-system access across the VMs." }
      ],
      correct: 0,
      tags: ["design-and-plan", "storage"],
      source: S.FILESTORE
    },
    {
      id: "architecture-cloud-storage-objects",
      prompt: "An application needs highly durable storage for images, backups, and static assets addressed as objects rather than rows or files. Which service is the best fit?",
      answers: [
        { text: "Cloud SQL", explanation: "Incorrect. Cloud SQL stores relational data and is not the object storage service for backups and static assets." },
        { text: "Filestore", explanation: "Incorrect. Filestore is a managed NFS file service, which is different from object storage." },
        { text: "Cloud Storage", explanation: "Correct. Cloud Storage is Google Cloud's object storage service for unstructured data such as images, backups, and static assets." },
        { text: "Memorystore", explanation: "Incorrect. Memorystore is an in-memory cache, not durable object storage." }
      ],
      correct: 2,
      tags: ["design-and-plan", "storage"],
      source: S.CLOUD_STORAGE
    },
    {
      id: "architecture-pubsub-fanout",
      prompt: "When an order is placed, independent billing, notification, and analytics services must each receive an event without the order service calling them synchronously. Which service should decouple this fan-out?",
      answers: [
        { text: "Cloud Scheduler", explanation: "Incorrect. Cloud Scheduler triggers jobs on a schedule; it is not a general event fan-out service." },
        { text: "Pub/Sub", explanation: "Correct. Pub/Sub uses topics and subscriptions to decouple event publishers from multiple independent consumers." },
        { text: "Cloud SQL", explanation: "Incorrect. A database table can record orders, but it does not provide the managed publish-subscribe fan-out pattern described." },
        { text: "Cloud Load Balancing", explanation: "Incorrect. A load balancer distributes network traffic to backends and does not broadcast application events to consumers." }
      ],
      correct: 1,
      tags: ["design-and-plan", "integration"],
      source: S.PUBSUB
    },
    {
      id: "architecture-shared-vpc-central-network",
      prompt: "Multiple application teams need separate projects, while a central network team must control subnets, routes, and firewall rules. Which network model best fits?",
      answers: [
        { text: "A separate standalone VPC in every application project", explanation: "Incorrect. This gives each project a separate network and does not provide the requested centralized network administration model." },
        { text: "Public IP addresses for all workloads", explanation: "Incorrect. Public addressing does not centralize network administration or provide private cross-project networking." },
        { text: "Cloud CDN", explanation: "Incorrect. Cloud CDN caches content near users; it does not share centrally administered VPC resources across projects." },
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
        { text: "Cloud VPN only", explanation: "Incorrect. Cloud VPN uses IPsec tunnels over the public internet rather than the requested direct physical connection." },
        { text: "Cloud CDN", explanation: "Incorrect. Cloud CDN serves cacheable content to users and is not hybrid network connectivity." },
        { text: "VPC Network Peering", explanation: "Incorrect. VPC Network Peering connects Google Cloud VPC networks; it does not establish an on-premises physical connection." }
      ],
      correct: 0,
      tags: ["design-and-plan", "hybrid-networking"],
      source: S.INTERCONNECT
    },
    {
      id: "architecture-ha-vpn-encrypted-hybrid",
      prompt: "A company needs encrypted connectivity between its on-premises network and a VPC without ordering a physical cross-connect. Which service provides IPsec tunnels over the public internet?",
      answers: [
        { text: "Cloud Interconnect without encryption", explanation: "Incorrect. Cloud Interconnect is private connectivity and does not provide the requested IPsec-over-internet solution by itself." },
        { text: "Cloud DNS", explanation: "Incorrect. Cloud DNS resolves domain names and does not create encrypted network tunnels." },
        { text: "HA VPN", explanation: "Correct. HA VPN establishes highly available IPsec VPN tunnels between a VPC and a peer network over the public internet." },
        { text: "Cloud NAT", explanation: "Incorrect. Cloud NAT provides outbound translation for private resources; it does not connect an on-premises network to a VPC." }
      ],
      correct: 2,
      tags: ["design-and-plan", "hybrid-networking"],
      source: S.VPN
    },
    {
      id: "architecture-global-external-application-lb",
      prompt: "A public HTTP application has healthy backends in multiple regions and needs one global frontend that routes requests to suitable healthy backends. Which component should be used?",
      answers: [
        { text: "A regional internal load balancer", explanation: "Incorrect. An internal regional load balancer is not the requested global public HTTP frontend." },
        { text: "An external Application Load Balancer", explanation: "Correct. An external Application Load Balancer provides a global HTTP(S) frontend and can distribute traffic across regional backends." },
        { text: "A Cloud Storage bucket", explanation: "Incorrect. Cloud Storage can host objects but does not route dynamic HTTP requests across application backends." },
        { text: "A Cloud Router", explanation: "Incorrect. Cloud Router exchanges dynamic routes for hybrid networking and is not an HTTP application load balancer." }
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
    }
  ];
})();

(function () {
  "use strict";

  const S = globalThis.PCA_QUIZ_SOURCES;

  globalThis.PCA_QUIZ_RELIABILITY_QUESTIONS = [
    {
      id: "reliability-rto-definition",
      prompt: "A business states that its customer portal must be restored no more than two hours after a regional outage. Which disaster recovery metric does this describe?",
      answers: [
        { text: "Recovery time objective (RTO)", explanation: "Correct. RTO is the maximum acceptable time to restore a service after a disruption." },
        { text: "Recovery point objective (RPO)", explanation: "Incorrect. RPO describes the maximum acceptable amount of data loss measured in time, not restoration duration." },
        { text: "Mean time to recovery (MTTR)", explanation: "Incorrect. MTTR is an observed average recovery duration across incidents, while the two-hour statement is a maximum target set before an incident." },
        { text: "Maximum tolerable period of disruption (MTPD)", explanation: "Incorrect. MTPD is the outer business-survival limit for disruption; the stated service restoration target is specifically the RTO." }
      ],
      correct: 0,
      tags: ["reliability", "disaster-recovery"],
      source: S.DISASTER_RECOVERY
    },
    {
      id: "reliability-rpo-definition",
      prompt: "A business can tolerate losing at most 15 minutes of completed transactions if its primary database fails. Which disaster recovery metric is 15 minutes?",
      answers: [
        { text: "Recovery time objective (RTO)", explanation: "Incorrect. RTO measures how long recovery can take, not how much recent data can be lost." },
        { text: "Recovery point objective (RPO)", explanation: "Correct. RPO is the maximum acceptable age of recoverable data and therefore expresses the permitted data-loss window." },
        { text: "Backup retention period", explanation: "Incorrect. Retention determines how long recovery artifacts remain available, not how far behind the latest committed transaction recovery may be." },
        { text: "Replication lag service-level indicator", explanation: "Incorrect. Replication lag can be monitored to assess risk, but the business's maximum acceptable data-loss window is the RPO itself." }
      ],
      correct: 1,
      tags: ["reliability", "disaster-recovery"],
      source: S.DISASTER_RECOVERY
    },
    {
      id: "reliability-cloud-sql-ha-zonal-failure",
      prompt: "A production Cloud SQL database must continue through a zonal failure with managed failover. Which configuration should be used?",
      answers: [
        { text: "A single-zone Cloud SQL primary with point-in-time recovery enabled", explanation: "Incorrect. Point-in-time recovery protects recoverability from backups and logs but does not provide a ready cross-zone standby with managed failover." },
        { text: "A regional Cloud SQL instance configured for high availability", explanation: "Correct. Cloud SQL high availability uses a primary and standby configuration across zones in a region and supports failover." },
        { text: "A read replica in the same zone promoted by an operator after failure", explanation: "Incorrect. A same-zone replica shares the zonal failure domain and manual promotion does not meet the managed cross-zone failover requirement." },
        { text: "A cross-region read replica with no regional HA primary", explanation: "Incorrect. A cross-region replica supports regional disaster recovery with asynchronous replication and an explicit promotion process, but it is not the direct managed zonal HA configuration requested." }
      ],
      correct: 1,
      tags: ["reliability", "databases"],
      source: S.CLOUD_SQL_HA
    },
    {
      id: "reliability-mig-autohealing",
      prompt: "Instances in a managed instance group occasionally become unresponsive even though the VM process is still running. What should be configured so the group can replace unhealthy instances automatically?",
      answers: [
        { text: "A health check and managed instance group autohealing", explanation: "Correct. A MIG can use a health check for autohealing so it recreates instances that fail the application health signal." },
        { text: "An autoscaler driven only by average CPU utilization", explanation: "Incorrect. Autoscaling changes group size for demand but does not identify an application that is unresponsive while its VM remains running." },
        { text: "A load balancer health check attached only to the backend service", explanation: "Incorrect. The load balancer can stop routing to an unhealthy backend, but the MIG needs an autohealing policy using a health check to recreate the instance." },
        { text: "A startup script that restarts the application only when the VM boots", explanation: "Incorrect. A startup script does not continuously detect a later application failure or ask the group to replace the unhealthy VM." }
      ],
      correct: 0,
      tags: ["reliability", "compute"],
      source: S.MANAGED_INSTANCE_GROUPS
    },
    {
      id: "reliability-global-load-balancer-failover",
      prompt: "A public HTTP service has backends in two regions. It needs a single global address that sends requests only to healthy backends and can continue serving if one regional backend becomes unhealthy. Which architecture component is needed?",
      answers: [
        { text: "An external Application Load Balancer with health checks", explanation: "Correct. An external Application Load Balancer provides a global frontend and uses backend health information to route requests to healthy backends." },
        { text: "Two regional external Application Load Balancers returned together by one static DNS record", explanation: "Incorrect. Static DNS can return both addresses regardless of backend health and does not provide the requested single global frontend with immediate health-based routing." },
        { text: "Cloud CDN with one origin in the primary region", explanation: "Incorrect. Cached content might remain available, but one regional origin does not provide healthy routing for dynamic requests across both regional backends." },
        { text: "A regional external Application Load Balancer with both regions added as backend zones", explanation: "Incorrect. A regional load balancer has regional scope and cannot serve as the requested global frontend for backends across regions." }
      ],
      correct: 0,
      tags: ["reliability", "networking"],
      source: S.LOAD_BALANCING
    },
    {
      id: "reliability-uptime-checks",
      prompt: "An operations team needs a managed external probe that periodically sends a simple HTTPS request to a public endpoint from configured locations and triggers an alert if the endpoint is unavailable. It does not need a scripted browser journey. Which feature should it use?",
      answers: [
        { text: "A log-based alert on the absence of application request logs", explanation: "Incorrect. Missing logs can have several causes and does not actively verify reachability from outside the application environment." },
        { text: "An uptime check", explanation: "Correct. Cloud Monitoring uptime checks periodically test resource availability from configured locations and can feed alerting policies." },
        { text: "A synthetic monitor running a browser automation script", explanation: "Incorrect. A synthetic monitor can test complex behavior, but it is unnecessary for the requested simple managed HTTPS reachability probe." },
        { text: "A load balancer backend health check used as the only external user-path monitor", explanation: "Incorrect. Backend health checks assess origin health from Google's infrastructure but do not test the complete public hostname and frontend path from configured external probe locations." }
      ],
      correct: 1,
      tags: ["reliability", "observability"],
      source: S.UPTIME_CHECKS
    },
    {
      id: "reliability-error-budget-release-decision",
      prompt: "A service's error budget is nearly exhausted for the current compliance period. What is the most appropriate delivery decision before introducing a risky release?",
      answers: [
        { text: "Proceed at the normal release rate because the budget is only retrospective reporting", explanation: "Incorrect. Error budgets are intended to guide the tradeoff between release velocity and reliability risk during the compliance period." },
        { text: "Lower the SLO retroactively until the current failures fit inside a larger budget", explanation: "Incorrect. Changing the objective to conceal current performance breaks the agreed reliability target rather than managing the risk." },
        { text: "Pause or reduce risky changes and focus on restoring reliability", explanation: "Correct. A depleted error budget signals that further risky changes could violate the SLO, so reliability work should take priority." },
        { text: "Start a new compliance period immediately and carry no failure history forward", explanation: "Incorrect. Arbitrarily resetting the measurement window evades the agreed SLO process and does not improve actual service reliability." }
      ],
      correct: 2,
      tags: ["reliability", "sre", "delivery"],
      source: S.SERVICE_MONITORING
    },
    {
      id: "reliability-storage-dual-region-turbo-replication",
      prompt: "A media service stores newly uploaded objects in Cloud Storage. It requires automatic regional failover without changing bucket paths and an SLA-backed recovery point objective of no more than 15 minutes for new objects. Which storage design meets both requirements?",
      answers: [
        { text: "A regional bucket with object versioning", explanation: "Incorrect. Versioning protects object generations but does not replicate the bucket across regions." },
        { text: "Two regional buckets copied nightly by Storage Transfer Service", explanation: "Incorrect. Nightly copying cannot meet a 15-minute recovery point objective and requires application-level destination failover." },
        { text: "A multi-region bucket with default replication", explanation: "Incorrect. A multi-region bucket provides cross-region redundancy and automatic failover, but default replication does not provide the stated 15-minute replication RPO." },
        { text: "A dual-region bucket with turbo replication enabled", explanation: "Correct. Dual-region buckets provide automatic regional failover without changing storage paths, and turbo replication provides a 15-minute RPO for newly written objects." }
      ],
      correct: 3,
      tags: ["reliability", "storage", "disaster-recovery", "advanced"],
      source: S.STORAGE_AVAILABILITY
    },
    {
      id: "reliability-cloud-sql-pitr-logical-corruption",
      prompt: "At 14:03, a faulty migration deleted valid rows from a Cloud SQL for PostgreSQL database. The error was discovered at 14:20, after high-availability standbys and read replicas had received the deletion. The team must recover the database to 14:02 while preserving the damaged instance for investigation. What should it do?",
      answers: [
        { text: "Trigger an HA failover to the standby", explanation: "Incorrect. High availability protects against infrastructure failure; the logical deletion is replicated to the standby." },
        { text: "Promote a current read replica", explanation: "Incorrect. A normal read replica also receives the deletion and promotion does not rewind its state to 14:02." },
        { text: "Use point-in-time recovery to create a new instance at 14:02, validate it, and redirect the application", explanation: "Correct. Point-in-time recovery uses retained backups and transaction logs to create a separate instance at the selected time, leaving the damaged source available for investigation." },
        { text: "Resize the primary instance and wait for automatic row reconstruction", explanation: "Incorrect. Increasing compute capacity cannot reverse a committed logical deletion." }
      ],
      correct: 2,
      tags: ["reliability", "databases", "disaster-recovery", "advanced"],
      source: S.CLOUD_SQL_PITR
    },
    {
      id: "reliability-pubsub-exactly-once-pull",
      prompt: "A payment consumer uses a Pub/Sub push subscription and sometimes performs a side effect twice after valid message redelivery. The team wants Pub/Sub's exactly-once delivery guarantee and understands that separately published copies can still have different message IDs. Which redesign is appropriate?",
      answers: [
        { text: "Enable exactly-once delivery on the existing push subscription", explanation: "Incorrect. Pub/Sub exactly-once delivery is supported for pull subscriptions, not push subscriptions." },
        { text: "Enable message ordering on the push subscription because ordering removes duplicates", explanation: "Incorrect. Ordering preserves order for an ordering key but does not provide exactly-once delivery or eliminate redeliveries." },
        { text: "Add a dead-letter topic and treat its maximum delivery-attempt count as an exactly-once guarantee", explanation: "Incorrect. A dead-letter topic isolates messages that cannot be processed, but forwarding and delivery-attempt counts are best effort and do not prevent duplicate side effects." },
        { text: "Switch to a pull subscription with exactly-once enabled, keep subscribers in one region, process idempotently, and acknowledge only after durable commit", explanation: "Correct. Exactly-once delivery is available for pull subscriptions and its guarantee is regional. Idempotent processing covers failures before acknowledgment and separately published copies, while acknowledging after commit avoids losing unfinished work." }
      ],
      correct: 3,
      tags: ["reliability", "messaging", "pubsub", "advanced"],
      source: S.PUBSUB_EXACTLY_ONCE
    },
    {
      id: "reliability-gke-regional-control-and-workers",
      prompt: "A production GKE application must remain serviceable through a single-zone outage in its region, and operators must retain Kubernetes API access during that outage. The application already supports multiple replicas. Which cluster layout provides the required foundation?",
      answers: [
        { text: "A zonal cluster with nodes in three zones, because multi-zonal workers also replicate the control plane", explanation: "Incorrect. A multi-zonal zonal cluster can distribute workers, but its control plane remains in one zone and can become unavailable with that zone." },
        { text: "A regional cluster with a node pool restricted to one zone, because only the control plane needs replication", explanation: "Incorrect. The regional control plane remains available, but a single-zone worker pool can lose every application replica in that zone." },
        { text: "A regional cluster with worker nodes across multiple zones and enough application replicas distributed across those zones", explanation: "Correct. A regional cluster replicates the control plane across zones, while multi-zonal workers and properly distributed replicas provide workload capacity outside the failed zone." },
        { text: "Three independent zonal clusters with no cross-cluster traffic routing or deployment coordination", explanation: "Incorrect. Separate clusters could form a broader design, but without routing and coordination they do not by themselves keep one service available or satisfy the stated operational behavior." }
      ],
      correct: 2,
      tags: ["reliability", "containers", "gke", "advanced"],
      source: S.GKE_REGIONAL
    },
    {
      id: "reliability-cloud-dns-active-backup",
      prompt: "Clients use one private hostname for a service behind an internal load balancer in a primary region. A second internal load balancer in another region is a warm standby. DNS should normally return only the primary and automatically return the standby when all primary targets are unhealthy. Which design fits?",
      answers: [
        { text: "A Cloud DNS weighted round-robin record with equal weights and no health checks", explanation: "Incorrect. Equal weighted routing sends normal traffic to both regions and, without health checks, continues returning an unhealthy endpoint." },
        { text: "A Cloud DNS failover routing policy that references supported load balancer forwarding rules, enables health checking and global access, and configures the standby as backup", explanation: "Correct. A failover policy returns the active set during normal operation and serves the backup set when all active targets are unhealthy. Forwarding-rule references, health checking, and global access provide the required internal load balancer health state." },
        { text: "A Cloud DNS geolocation policy with geofencing enabled, because geofencing always fails over unhealthy endpoints", explanation: "Incorrect. Geofencing changes geographic routing behavior and disables automatic failover when all endpoints in a location fail health checks." },
        { text: "A static A record containing both load balancer IP addresses and a low TTL", explanation: "Incorrect. A low TTL affects caching duration but does not remove an unhealthy primary address or enforce active-backup behavior." }
      ],
      correct: 1,
      tags: ["reliability", "networking", "dns", "advanced"],
      source: S.CLOUD_DNS_ROUTING
    },
    {
      id: "reliability-cloud-sql-cross-region-dr",
      prompt: "A Cloud SQL for PostgreSQL primary already uses regional high availability for zonal failures. The business now requires recovery in a second region within minutes and accepts a small, non-zero recovery point because cross-region replication is asynchronous. Which additional design is appropriate?",
      answers: [
        { text: "Rely on the existing regional HA standby because Cloud SQL automatically moves it to another region during a regional outage", explanation: "Incorrect. Regional high availability protects against failures within the primary region; its standby does not provide a database in a different region." },
        { text: "Create an HA cross-region read replica, monitor replication lag, and maintain a tested procedure to promote or fail over to it and redirect clients", explanation: "Correct. A cross-region replica provides the secondary-region copy for disaster recovery. Asynchronous replication implies a potentially non-zero RPO, and promotion or replica failover plus client redirection must be part of the runbook." },
        { text: "Enable point-in-time recovery only and restore the primary in place while its region is unavailable", explanation: "Incorrect. Point-in-time recovery protects against logical corruption and can create a restored instance, but it does not by itself maintain a ready cross-region replica for minute-level regional recovery." },
        { text: "Schedule daily SQL exports to a bucket in the second region and treat the export completion time as a minute-level RPO", explanation: "Incorrect. Daily exports have an RPO measured in up to a day and require a longer restore process, so they cannot satisfy recovery within minutes." }
      ],
      correct: 1,
      tags: ["reliability", "databases", "disaster-recovery", "advanced"],
      source: S.CLOUD_SQL_DR
    }
  ];
})();

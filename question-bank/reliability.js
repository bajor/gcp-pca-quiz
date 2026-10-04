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
        { text: "Service-level indicator (SLI)", explanation: "Incorrect. An SLI is a measured service performance metric, not a disaster recovery restoration target." },
        { text: "Committed use discount (CUD)", explanation: "Incorrect. A CUD is a pricing commitment and is unrelated to outage recovery time." }
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
        { text: "Error budget", explanation: "Incorrect. An error budget is the allowed amount of service unreliability under an SLO, not a backup data-loss target." },
        { text: "A health-check interval", explanation: "Incorrect. A health-check interval determines how often health is evaluated and does not define acceptable transaction loss." }
      ],
      correct: 1,
      tags: ["reliability", "disaster-recovery"],
      source: S.DISASTER_RECOVERY
    },
    {
      id: "reliability-cloud-sql-ha-zonal-failure",
      prompt: "A production Cloud SQL database must continue through a zonal failure with managed failover. Which configuration should be used?",
      answers: [
        { text: "A single-zone Cloud SQL instance with a manual export", explanation: "Incorrect. A single-zone instance does not provide the requested managed failover to a standby in another zone." },
        { text: "A regional Cloud SQL instance configured for high availability", explanation: "Correct. Cloud SQL high availability uses a primary and standby configuration across zones in a region and supports failover." },
        { text: "A Cloud Storage lifecycle policy", explanation: "Incorrect. Storage lifecycle policies do not provide database availability or failover." },
        { text: "A Cloud DNS public zone", explanation: "Incorrect. DNS records do not create a standby database or managed database failover." }
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
        { text: "A Cloud Billing budget", explanation: "Incorrect. A budget tracks cost thresholds and cannot detect or replace unhealthy VMs." },
        { text: "A Cloud Storage retention policy", explanation: "Incorrect. A retention policy controls object deletion and does not repair VM instances." },
        { text: "A static route", explanation: "Incorrect. A static route controls packet forwarding and does not assess application health or recreate VMs." }
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
        { text: "A Cloud Storage bucket", explanation: "Incorrect. A bucket stores objects and does not perform dynamic backend health-based routing." },
        { text: "A Cloud KMS key ring", explanation: "Incorrect. Key rings organize encryption keys and do not route application traffic." },
        { text: "A Cloud Scheduler job", explanation: "Incorrect. A scheduled job cannot serve as a global HTTP traffic distribution and failover layer." }
      ],
      correct: 0,
      tags: ["reliability", "networking"],
      source: S.LOAD_BALANCING
    },
    {
      id: "reliability-uptime-checks",
      prompt: "An operations team needs an external, periodic check that verifies whether a public HTTPS endpoint is reachable and can trigger an alert when it is unavailable. Which Cloud Monitoring feature should it use?",
      answers: [
        { text: "A Cloud Billing export", explanation: "Incorrect. Billing exports provide cost data and do not probe endpoint availability." },
        { text: "An uptime check", explanation: "Correct. Cloud Monitoring uptime checks periodically test resource availability from configured locations and can feed alerting policies." },
        { text: "A Cloud Storage lifecycle rule", explanation: "Incorrect. Lifecycle rules manage objects and do not issue network requests to validate an endpoint." },
        { text: "A VPC Service Controls perimeter", explanation: "Incorrect. Service perimeters help control access to Google-managed services, not monitor public endpoint availability." }
      ],
      correct: 1,
      tags: ["reliability", "observability"],
      source: S.UPTIME_CHECKS
    },
    {
      id: "reliability-error-budget-release-decision",
      prompt: "A service's error budget is nearly exhausted for the current compliance period. What is the most appropriate delivery decision before introducing a risky release?",
      answers: [
        { text: "Increase the SLO to 100% so the budget resets", explanation: "Incorrect. Raising an SLO to 100% removes the error budget and does not address the existing reliability problem." },
        { text: "Ignore the budget because only infrastructure metrics matter", explanation: "Incorrect. Error budgets are derived from service objectives and are intended to inform reliability and release tradeoffs." },
        { text: "Pause or reduce risky changes and focus on restoring reliability", explanation: "Correct. A depleted error budget signals that further risky changes could violate the SLO, so reliability work should take priority." },
        { text: "Delete historical monitoring data", explanation: "Incorrect. Deleting telemetry does not restore service reliability or change the actual SLO compliance state." }
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
    }
  ];
})();

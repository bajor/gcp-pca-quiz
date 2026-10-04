(function () {
  "use strict";

  const S = globalThis.PCA_QUIZ_SOURCES;

  globalThis.PCA_QUIZ_OPERATIONS_QUESTIONS = [
    {
      id: "operations-budget-alert-not-cap",
      prompt: "A project owner creates an alerts-only Cloud Billing budget at $5,000. What happens when actual spending reaches the configured threshold?",
      answers: [
        { text: "Google Cloud automatically stops all billable services", explanation: "Incorrect. Alerts-only budgets do not automatically cap usage or prevent further charges." },
        { text: "A notification is sent according to the configured budget thresholds", explanation: "Correct. Alerts-only budgets notify recipients when actual or forecasted spending reaches configured thresholds." },
        { text: "All IAM permissions are revoked from project users", explanation: "Incorrect. Budget alerts do not change IAM policies or access permissions." },
        { text: "Every VM is converted to a Spot VM", explanation: "Incorrect. A budget does not automatically alter VM purchasing options." }
      ],
      correct: 1,
      tags: ["analyze-optimize", "cost-optimization"],
      source: S.BILLING_BUDGETS
    },
    {
      id: "operations-committed-use-discount-baseline",
      prompt: "A production service has a stable, well-understood baseline of Compute Engine usage that will run continuously for the next year. Which cost optimization should be evaluated?",
      answers: [
        { text: "A committed use discount", explanation: "Correct. Committed use discounts are suited to predictable, sustained resource usage over a commitment term." },
        { text: "Delete all monitoring data", explanation: "Incorrect. Removing monitoring data reduces observability and does not address the predictable compute baseline." },
        { text: "Use only Spot VMs", explanation: "Incorrect. Spot VMs can be preempted, so they are not automatically suitable for a continuously required production baseline." },
        { text: "Move the service to a Cloud Storage bucket", explanation: "Incorrect. Cloud Storage cannot run a Compute Engine workload." }
      ],
      correct: 0,
      tags: ["analyze-optimize", "cost-optimization", "compute"],
      source: S.COMPUTE_CUDS
    },
    {
      id: "operations-recommender-rightsizing",
      prompt: "An organization wants managed recommendations for idle resources and opportunities to improve cloud resource utilization. Which Google Cloud service should it review?",
      answers: [
        { text: "Cloud Recommender", explanation: "Correct. Recommender analyzes resource usage and configuration to provide recommendations and insights, including cost and utilization opportunities." },
        { text: "Cloud DNS", explanation: "Incorrect. Cloud DNS manages DNS zones and records; it does not analyze resource utilization." },
        { text: "Cloud Scheduler", explanation: "Incorrect. Cloud Scheduler triggers jobs on a schedule and does not generate optimization recommendations." },
        { text: "Cloud Shell", explanation: "Incorrect. Cloud Shell is an interactive development environment, not a recommendation engine." }
      ],
      correct: 0,
      tags: ["analyze-optimize", "cost-optimization"],
      source: S.RECOMMENDER
    },
    {
      id: "operations-bigquery-partition-cost-control",
      prompt: "A large BigQuery table is queried repeatedly by date, but analysts accidentally scan years of data for daily reports. What design most directly reduces unnecessary bytes scanned?",
      answers: [
        { text: "Store the table in Cloud SQL", explanation: "Incorrect. Moving analytical data to Cloud SQL does not provide BigQuery's large-scale analytical design or enforce date pruning." },
        { text: "Partition the table by date and require a partition filter", explanation: "Correct. Partitioning and requiring a partition filter help queries scan only relevant partitions instead of the whole table." },
        { text: "Add more BigQuery users", explanation: "Incorrect. Adding users does not reduce the amount of data a query scans." },
        { text: "Turn off query job history", explanation: "Incorrect. Job history visibility does not change query bytes processed or cost." }
      ],
      correct: 1,
      tags: ["analyze-optimize", "analytics", "cost-optimization"],
      source: S.BIGQUERY_COSTS
    },
    {
      id: "operations-billing-export-bigquery",
      prompt: "Finance needs to analyze detailed cloud costs by SKU, project, and resource labels with custom SQL. Which capability should be configured?",
      answers: [
        { text: "Export Cloud Billing data to BigQuery", explanation: "Correct. Cloud Billing can export detailed usage and cost data to BigQuery for custom analysis and reporting." },
        { text: "Create a Cloud Storage retention policy", explanation: "Incorrect. A retention policy controls object deletion and does not produce detailed billing analysis tables." },
        { text: "Use a Cloud Armor policy", explanation: "Incorrect. Cloud Armor protects applications from attacks and does not export billing records." },
        { text: "Enable Cloud CDN", explanation: "Incorrect. Cloud CDN caches content and does not provide a SQL dataset of billing records." }
      ],
      correct: 0,
      tags: ["analyze-optimize", "billing"],
      source: S.BILLING_EXPORT
    },
    {
      id: "operations-resource-labels-cost-allocation",
      prompt: "A platform team needs to attribute cloud usage to products, environments, and cost centers consistently across resources. What should it standardize and enforce?",
      answers: [
        { text: "Resource labels", explanation: "Correct. Labels are key-value metadata that help organize, filter, and analyze resources, including for cost allocation." },
        { text: "Public IP addresses", explanation: "Incorrect. IP addresses identify network endpoints and do not provide structured business ownership metadata." },
        { text: "Cloud Storage object versioning", explanation: "Incorrect. Versioning preserves object generations and does not identify cost centers for general cloud resources." },
        { text: "A shared Owner role", explanation: "Incorrect. Broad IAM access does not add allocation metadata and weakens governance." }
      ],
      correct: 0,
      tags: ["analyze-optimize", "governance", "billing"],
      source: S.RESOURCE_LABELS
    },
    {
      id: "operations-premium-network-tier",
      prompt: "A global internet-facing application requires traffic to use Google's global backbone for performance and reliability characteristics. Which Network Service Tier should be selected?",
      answers: [
        { text: "Standard Tier", explanation: "Incorrect. Standard Tier uses regional Google Cloud infrastructure and the public internet for parts of the path." },
        { text: "Premium Tier", explanation: "Correct. Premium Tier uses Google's global network to carry internet traffic closer to the user and destination." },
        { text: "Cloud Storage Archive class", explanation: "Incorrect. Archive is a storage class and does not determine the network path for application traffic." },
        { text: "Cloud VPN", explanation: "Incorrect. Cloud VPN creates encrypted hybrid tunnels and is not a Network Service Tier selection." }
      ],
      correct: 1,
      tags: ["analyze-optimize", "networking", "performance"],
      source: S.NETWORK_SERVICE_TIERS
    },
    {
      id: "operations-coldline-quarterly-data",
      prompt: "Compliance exports are retained for years and are normally read only about once per quarter. Which Cloud Storage class is generally the most appropriate starting point?",
      answers: [
        { text: "Standard storage", explanation: "Incorrect. Standard storage is intended for frequently accessed, hot data." },
        { text: "Nearline storage", explanation: "Incorrect. Nearline is designed for data accessed about once a month, which is more frequent than the stated pattern." },
        { text: "Archive storage", explanation: "Incorrect. Archive is optimized for data accessed less than once a year, which is less frequent than the stated quarterly use." },
        { text: "Coldline storage", explanation: "Correct. Coldline is intended for data accessed about once a quarter, subject to the workload's retrieval and minimum-duration requirements." }
      ],
      correct: 3,
      tags: ["analyze-optimize", "storage", "cost-optimization"],
      source: S.STORAGE_CLASSES
    },
    {
      id: "operations-slo-business-outcome-monitoring",
      prompt: "A team wants alerts based on whether users receive successful responses within an agreed latency target, rather than alerts based only on VM CPU. What should it define and monitor?",
      answers: [
        { text: "A service-level indicator and service-level objective", explanation: "Correct. An SLI measures service performance, and an SLO sets the desired target for user-relevant measures such as availability or latency." },
        { text: "Only a billing budget", explanation: "Incorrect. A budget tracks spending and does not define the quality of service received by users." },
        { text: "Only a Cloud Storage lifecycle rule", explanation: "Incorrect. A lifecycle rule manages object storage and does not express a user-facing availability or latency target." },
        { text: "A static external IP address", explanation: "Incorrect. An IP address is a networking resource and does not measure service performance." }
      ],
      correct: 0,
      tags: ["analyze-optimize", "observability", "reliability"],
      source: S.SERVICE_MONITORING
    },
    {
      id: "operations-organization-aggregated-log-sink",
      prompt: "A security operations project contains a central log bucket. It must receive matching audit logs from every current and future project under the organization. A newly created organization-level sink exists, but no logs arrive at the destination. Which configuration is required?",
      answers: [
        { text: "Create the sink as an aggregated organization sink that includes children and grant its writer identity permission to write to the destination log bucket", explanation: "Correct. An aggregated sink routes matching logs from descendant resources, and its unique writer identity must have the destination permission, such as Logs Bucket Writer for a log bucket." },
        { text: "Add the security project to a Cloud Monitoring metrics scope", explanation: "Incorrect. A metrics scope controls visibility of monitoring time series and does not route log entries or authorize a sink destination." },
        { text: "Grant every project owner access to the central bucket and wait for logs to be copied automatically", explanation: "Incorrect. User access to the bucket neither creates an organization-wide route nor authorizes the sink's writer identity." },
        { text: "Enable a billing export in every project", explanation: "Incorrect. Billing exports provide cost data, not centralized Cloud Audit Logs routing." }
      ],
      correct: 0,
      tags: ["analyze-optimize", "observability", "logging", "advanced"],
      source: S.AGGREGATED_LOG_SINKS
    },
    {
      id: "operations-bigquery-reservation-isolation",
      prompt: "A company uses BigQuery capacity pricing. Executive dashboards need predictable slot availability, while bursty ETL jobs may scale when capacity is available but must not consume the dashboard baseline. Which workload-management design best fits?",
      answers: [
        { text: "Assign the workloads to separate reservations, give dashboards adequate baseline slots, and configure bounded ETL autoscaling with ignore_idle_slots enabled", explanation: "Correct. Separate reservations and assignments isolate the workloads, dashboard baseline slots provide predictable capacity, and ignore_idle_slots prevents the ETL reservation from borrowing that baseline while ETL can autoscale to its configured maximum." },
        { text: "Put all jobs in one reservation and use query labels to reserve slots for dashboards", explanation: "Incorrect. Labels help categorize jobs but do not reserve or isolate slot capacity." },
        { text: "Switch every workload to on-demand pricing because on-demand jobs have dedicated dashboard slots", explanation: "Incorrect. On-demand pricing does not create dedicated capacity isolation between these workloads." },
        { text: "Partition the dashboard tables and allow ETL jobs unlimited slots in the same reservation", explanation: "Incorrect. Partitioning can reduce scanned data, but it does not guarantee that ETL cannot contend for the dashboard reservation's compute capacity." }
      ],
      correct: 0,
      tags: ["analyze-optimize", "analytics", "performance", "advanced"],
      source: S.BIGQUERY_SLOTS
    },
    {
      id: "operations-bigquery-materialized-view-rewrite",
      prompt: "Analysts repeatedly run compatible aggregate queries over a large append-only BigQuery fact table. They need current results with lower compute cost and cannot update every existing query immediately. Which optimization should be evaluated first?",
      answers: [
        { text: "Create a logical view containing the aggregate", explanation: "Incorrect. A logical view stores SQL but generally recomputes its query and does not precompute results." },
        { text: "Export the table to Cloud Storage before each query", explanation: "Incorrect. Exporting adds data movement and does not accelerate or reduce the cost of the existing BigQuery aggregate queries." },
        { text: "Create an incremental materialized view that is eligible for smart tuning", explanation: "Correct. BigQuery can incrementally maintain a materialized view and automatically rewrite compatible queries to use it, reducing work without requiring each query to reference the view directly." },
        { text: "Disable the query cache so each aggregate reads the newest table data", explanation: "Incorrect. Disabling cache increases repeated computation and does not provide precomputed incremental aggregates." }
      ],
      correct: 2,
      tags: ["analyze-optimize", "analytics", "cost-optimization", "advanced"],
      source: S.BIGQUERY_MATERIALIZED_VIEWS
    }
  ];
})();

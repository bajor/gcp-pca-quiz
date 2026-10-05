(function () {
  "use strict";

  const S = globalThis.PCA_QUIZ_SOURCES;

  globalThis.PCA_QUIZ_OPERATIONS_QUESTIONS = [
    {
      id: "operations-budget-alert-not-cap",
      prompt: "A project owner creates a standard alerts-only Cloud Billing budget at $5,000, configures an actual-spend threshold, and does not connect Pub/Sub notifications to any automation. What happens when spending reaches the threshold?",
      answers: [
        { text: "Billing is automatically disabled for the project until the next budget period", explanation: "Incorrect. A standard budget does not disable billing or stop resources unless the customer separately builds automation, which can itself have operational risks." },
        { text: "A notification is sent according to the configured budget thresholds", explanation: "Correct. Alerts-only budgets notify recipients when actual or forecasted spending reaches configured thresholds." },
        { text: "New resource creation is rejected, but existing resources continue to accrue charges", explanation: "Incorrect. Budget thresholds do not become service quotas and do not reject resource-creation API calls." },
        { text: "Charges above $5,000 are automatically credited because the budget is a hard spending cap", explanation: "Incorrect. Budgets provide monitoring and notifications, not a contractual cap or automatic credit for usage beyond the threshold." }
      ],
      correct: 1,
      tags: ["analyze-optimize", "cost-optimization"],
      source: S.BILLING_BUDGETS
    },
    {
      id: "operations-committed-use-discount-baseline",
      prompt: "A production service has a stable, well-understood baseline of eligible Compute Engine resource usage that will run continuously for the next year. Interruptions are not acceptable, and the team can commit to that baseline. Which cost optimization should it evaluate?",
      answers: [
        { text: "A committed use discount", explanation: "Correct. Committed use discounts are suited to predictable, sustained resource usage over a commitment term." },
        { text: "Spot VMs for the complete baseline", explanation: "Incorrect. Spot VMs reduce price but can be preempted and therefore conflict with the non-interruptible baseline requirement." },
        { text: "Capacity reservations without a commitment", explanation: "Incorrect. Reservations can assure capacity but do not by themselves provide the term-based usage discount requested for the predictable baseline." },
        { text: "On-demand VMs only, because automatic sustained use discounts always exceed commitment savings", explanation: "Incorrect. Sustained use discounts can apply automatically to eligible usage, but they do not categorically exceed a suitable one-year commitment for a known baseline." }
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
        { text: "Cloud Asset Inventory feeds", explanation: "Incorrect. Asset Inventory records resource metadata and changes, but it does not by itself analyze utilization and issue managed optimization recommendations." },
        { text: "Cloud Billing detailed export", explanation: "Incorrect. Billing export supplies granular cost data for custom analysis but does not itself produce the managed idle-resource and utilization recommendations." },
        { text: "Cloud Monitoring dashboards", explanation: "Incorrect. Monitoring can visualize utilization metrics, but the team would need to define its own analysis rather than receive the requested managed recommendations." }
      ],
      correct: 0,
      tags: ["analyze-optimize", "cost-optimization"],
      source: S.RECOMMENDER
    },
    {
      id: "operations-bigquery-partition-cost-control",
      prompt: "A large BigQuery table is queried repeatedly by date, but analysts accidentally scan years of data for daily reports. What design most directly reduces unnecessary bytes scanned?",
      answers: [
        { text: "Cluster the unpartitioned table by a high-cardinality customer ID", explanation: "Incorrect. Clustering can prune blocks for customer filters, but it does not directly enforce pruning by the report date and still permits full-history scans." },
        { text: "Partition the table by date and require a partition filter", explanation: "Correct. Partitioning and requiring a partition filter help queries scan only relevant partitions instead of the whole table." },
        { text: "Create a logical view that selects every column from the table", explanation: "Incorrect. A logical view does not materialize or prune data by itself, so queries can still scan all dates when no partition filter is enforced." },
        { text: "Purchase more slot capacity while leaving the table unpartitioned", explanation: "Incorrect. More capacity can improve throughput under capacity pricing but does not reduce the bytes read by poorly bounded daily queries." }
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
        { text: "Use the Cloud Billing Reports page and export screenshots for downstream processing", explanation: "Incorrect. Built-in reports support interactive analysis but do not provide the queryable, detailed tables required for arbitrary SQL by SKU, project, and labels." },
        { text: "Publish budget notifications to Pub/Sub and treat each alert as a cost line item", explanation: "Incorrect. Budget events report threshold status rather than the detailed usage and cost records needed for financial analysis." },
        { text: "Query Cloud Asset Inventory history and infer cost from resource creation times", explanation: "Incorrect. Asset history describes resources and policies, not authoritative SKU-level usage prices, credits, and charges." }
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
        { text: "A naming convention encoded only in resource display names", explanation: "Incorrect. Names are not a consistent key-value cost-allocation field across services and are harder to validate and aggregate than labels." },
        { text: "One folder per cost center without resource metadata", explanation: "Incorrect. Folders help organize hierarchy and policy, but product and environment dimensions can cross folders and need explicit metadata on billable resources." },
        { text: "Separate billing accounts for every product and environment combination", explanation: "Incorrect. Proliferating billing accounts is unnecessary for multidimensional attribution and does not label individual resources with all requested dimensions." }
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
        { text: "Standard Tier with Cloud CDN disabled", explanation: "Incorrect. Disabling caching does not change Standard Tier's use of regional infrastructure and the public internet for the requested path." },
        { text: "Premium Tier only for backend VM egress while the load balancer frontend remains Standard Tier", explanation: "Incorrect. The frontend tier determines how internet client traffic enters Google's network; a Standard Tier frontend would not provide the requested global Premium Tier path." }
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
        { text: "An uptime check alone with no target objective", explanation: "Incorrect. An uptime check can contribute a signal, but without an SLI definition and target it does not express the agreed success-and-latency objective." },
        { text: "CPU and memory thresholds on every VM", explanation: "Incorrect. Resource saturation can aid diagnosis but does not directly measure whether users receive successful responses within the target latency." },
        { text: "A provider service-level agreement used directly as the application's measured indicator", explanation: "Incorrect. A provider SLA is a contractual commitment for a service; the team still needs application-specific measured indicators and objectives for the user experience." }
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
    },
    {
      id: "operations-slo-fast-slow-burn-alerts",
      prompt: "A service has a 30-day availability SLO. The on-call team must page for severe incidents that would exhaust the error budget quickly, but it also needs a lower-urgency signal for small failures that persist long enough to threaten the same SLO. Which alerting design best meets both goals?",
      answers: [
        { text: "Create separate SLO burn-rate alerts: a high threshold with a short lookback for fast burn and a lower threshold with a longer lookback for slow burn", explanation: "Correct. Burn rate normalizes current failures against the SLO's sustainable failure rate. Separate fast- and slow-burn policies detect both sharp incidents and persistent degradation while tying both signals to error-budget risk." },
        { text: "Page whenever one request fails, then suppress all further alerts until the 30-day period ends", explanation: "Incorrect. A single failure is usually too sensitive, and suppressing later alerts hides whether the error budget is being consumed at a dangerous rate." },
        { text: "Alert only when the complete 30-day error budget reaches zero", explanation: "Incorrect. Waiting for exhaustion provides no warning early enough to correct either a fast or slow burn before the SLO is violated." },
        { text: "Use one VM CPU threshold for paging and one memory threshold for tickets", explanation: "Incorrect. Resource utilization can be useful diagnostic telemetry, but it does not directly measure user-facing SLO failure or error-budget consumption." }
      ],
      correct: 0,
      tags: ["analyze-optimize", "observability", "sre", "advanced"],
      source: S.SLO_BURN_RATE
    },
    {
      id: "operations-log-exclusion-metric-alerting",
      prompt: "A project receives a high volume of application logs. The team wants to exclude matching low-value entries from the project's _Default log bucket to reduce storage cost, while a counter and alert must continue tracking a specific pattern in those entries from the time the control is introduced. Which design is appropriate?",
      answers: [
        { text: "Create a project-scoped user-defined log-based counter metric for the pattern, then add the sink exclusion and alert on the metric", explanation: "Correct. Project-scoped user-defined log-based metrics are calculated from logs received by the Logging API, including entries excluded from storage. The metric only begins counting entries received after it is created." },
        { text: "Add the exclusion first, then create a bucket-scoped log-based metric on the _Default bucket and expect historical backfill", explanation: "Incorrect. A bucket-scoped metric evaluates logs routed to that bucket, so excluded entries are unavailable to it, and log-based metrics are not retroactively populated." },
        { text: "Use a system-defined log-based metric because system metrics count all excluded user application logs", explanation: "Incorrect. System-defined metrics cover predefined events and are calculated from included logs; they cannot be defined for an arbitrary application pattern in excluded entries." },
        { text: "Export the excluded entries from the _Default bucket to BigQuery after the exclusion runs", explanation: "Incorrect. Entries excluded from the sink are not stored in that bucket and cannot later be exported from it. A separate included sink would be needed if the raw entries must be retained elsewhere." }
      ],
      correct: 0,
      tags: ["analyze-optimize", "observability", "logging", "advanced"],
      source: S.LOG_BASED_METRICS
    },
    {
      id: "operations-bigquery-layered-query-cost-caps",
      prompt: "A project uses BigQuery on-demand pricing. Finance requires a hard aggregate daily query-usage cap for the project, a uniform lower daily cap applied separately to each user or service account, and a safeguard that rejects any single scheduled query whose estimated bytes exceed its approved limit. Which controls should be combined?",
      answers: [
        { text: "Project and per-user daily custom query quotas, plus maximum bytes billed on each guarded query job", explanation: "Correct. On-demand custom quotas cap aggregate project usage and separately cap each principal's daily usage. Maximum bytes billed rejects an individual query before execution when its estimate exceeds the configured limit." },
        { text: "A Cloud Billing budget, resource labels, and a partition expiration policy", explanation: "Incorrect. These can improve notification, allocation, and storage management, but they do not impose the requested proactive daily and per-query processing limits." },
        { text: "One BigQuery reservation with baseline slots and an autoscaling maximum", explanation: "Incorrect. Reservations apply to capacity pricing and control slot capacity, while the scenario explicitly uses on-demand byte processing and requires byte-based daily and per-query caps." },
        { text: "Maximum bytes billed on one representative query and a Dataform assertion for all other jobs", explanation: "Incorrect. A per-query setting does not impose project-wide or per-principal daily usage caps, and a Dataform assertion validates data rather than enforcing BigQuery query quotas." }
      ],
      correct: 0,
      tags: ["analyze-optimize", "analytics", "cost-optimization", "advanced"],
      source: S.BIGQUERY_COSTS
    },
    {
      id: "operations-bi-engine-dashboard-acceleration",
      prompt: "A frequently refreshed executive dashboard queries a small, stable subset of BigQuery tables. The SQL is already efficient, but interactive latency remains too high. The team wants to accelerate compatible queries without maintaining a second aggregate dataset. What should it evaluate?",
      answers: [
        { text: "Reserve BI Engine capacity in the dataset's region and designate the dashboard tables as preferred tables", explanation: "Correct. BI Engine uses reserved in-memory capacity to accelerate many compatible BigQuery queries. Preferred tables help focus that capacity on the frequently queried dashboard data without creating a separate maintained copy." },
        { text: "Create incremental materialized views for each dashboard query and let BigQuery rewrite compatible SQL", explanation: "Incorrect. Materialized views can accelerate eligible aggregates, but they maintain separate precomputed data, which the team wants to avoid." },
        { text: "Increase the project's BigQuery query reservation slots and leave the dashboard tables unconfigured", explanation: "Incorrect. Query slots provide execution capacity, but they do not reserve BI Engine memory for caching the frequently accessed dashboard data." },
        { text: "Export each dashboard result to Cloud Storage and configure the BI tool to query the exported files", explanation: "Incorrect. This introduces a separate refresh and storage path that can make results stale and does not accelerate the existing BigQuery API queries in memory." }
      ],
      correct: 0,
      tags: ["analyze-optimize", "analytics", "performance", "advanced"],
      source: S.BIGQUERY_BI_ENGINE
    },
    {
      id: "operations-profiler-production-cpu-hotspot",
      prompt: "After a release, a production service has high CPU utilization. Cloud Monitoring confirms the increase, and traces show that requests spend most of their time inside the service rather than waiting on dependencies. The team needs low-overhead, function-level CPU and allocation profiles across running replicas. Which tool should it use?",
      answers: [
        { text: "Cloud Trace, configured with a shorter trace sampling interval", explanation: "Incorrect. Trace helps locate latency across request spans and dependencies, but the scenario already localizes the time to the service and needs code-level CPU and allocation profiles." },
        { text: "Cloud Profiler, enabled for the supported application runtime", explanation: "Correct. Cloud Profiler continuously collects statistical, low-overhead CPU and memory-allocation profiles from production applications, helping identify expensive code paths across replicas." },
        { text: "Cloud Monitoring dashboards with one CPU chart for each VM", explanation: "Incorrect. Monitoring confirms resource utilization trends but does not attribute CPU samples or memory allocations to application functions." },
        { text: "Cloud Logging queries that count requests by URL and status code", explanation: "Incorrect. Logs can identify request volume and errors, but counting log entries does not profile CPU or memory consumption inside the application code." }
      ],
      correct: 1,
      tags: ["analyze-optimize", "observability", "performance", "advanced"],
      source: S.CLOUD_PROFILER
    },
    {
      id: "operations-monitoring-metrics-scope-multiple-projects",
      prompt: "A central operations project must chart metrics and run alert policies against time series stored in 30 service projects. The teams retain ownership of their projects, and the metrics must not be copied or exported. What should the monitoring team configure?",
      answers: [
        { text: "Create an organization-level aggregated log sink from each project into the operations project", explanation: "Incorrect. Log sinks route log entries; they do not make metric time series available to charts and alert policies in a central monitoring project." },
        { text: "Create one metrics scope per service project and link those scopes into the operations project", explanation: "Incorrect. A metrics scope is configured by a scoping project to include monitored projects; multiple independent scopes are not nested into one central scope." },
        { text: "Make the operations project the scoping project and add the service projects to its Cloud Monitoring metrics scope", explanation: "Correct. A metrics scope lets a scoping project view and monitor time series stored in included projects without moving the monitored resources or exporting their metrics." },
        { text: "Export every Monitoring metric to BigQuery and build alert policies from scheduled SQL queries", explanation: "Incorrect. Exporting would copy data and add a separate pipeline, while a metrics scope provides native cross-project monitoring visibility and alerting." }
      ],
      correct: 2,
      tags: ["analyze-optimize", "observability", "monitoring", "advanced"],
      source: S.MONITORING_METRICS_SCOPE
    }
  ];
})();

(function () {
  "use strict";

  const ACCESS_DATE = "accessed-2026-10-01";
  const GOOGLE_CLOUD_DOCS_LICENSE = "CC BY 4.0";

  function googleCloudSource(name, url) {
    return Object.freeze({
      name: `Google Cloud documentation: ${name}`,
      url,
      commit: ACCESS_DATE,
      license: GOOGLE_CLOUD_DOCS_LICENSE
    });
  }

  globalThis.PCA_QUIZ_SOURCES = Object.freeze({
    EXAM_GUIDE: googleCloudSource(
      "Professional Cloud Architect exam guide",
      "https://cloud.google.com/learn/certification/cloud-architect"
    ),
    CLOUD_RUN: googleCloudSource("Cloud Run overview", "https://cloud.google.com/run/docs/overview/what-is-cloud-run"),
    GKE: googleCloudSource("Google Kubernetes Engine overview", "https://cloud.google.com/kubernetes-engine/docs/concepts/kubernetes-engine-overview"),
    CLOUD_SQL: googleCloudSource("Cloud SQL overview", "https://cloud.google.com/sql/docs/introduction"),
    SPANNER: googleCloudSource("Spanner overview", "https://cloud.google.com/spanner/docs/overview"),
    BIGQUERY: googleCloudSource("BigQuery overview", "https://cloud.google.com/bigquery/docs/introduction"),
    FILESTORE: googleCloudSource("Filestore overview", "https://cloud.google.com/filestore/docs/overview"),
    CLOUD_STORAGE: googleCloudSource("Cloud Storage overview", "https://cloud.google.com/storage/docs/introduction"),
    STORAGE_CLASSES: googleCloudSource("Cloud Storage classes", "https://cloud.google.com/storage/docs/storage-classes"),
    STORAGE_LIFECYCLE: googleCloudSource("Cloud Storage lifecycle management", "https://cloud.google.com/storage/docs/lifecycle"),
    BUCKET_LOCK: googleCloudSource("Cloud Storage Bucket Lock", "https://cloud.google.com/storage/docs/bucket-lock"),
    PUBSUB: googleCloudSource("Pub/Sub overview", "https://cloud.google.com/pubsub/docs/overview"),
    SHARED_VPC: googleCloudSource("Shared VPC", "https://cloud.google.com/vpc/docs/shared-vpc"),
    INTERCONNECT: googleCloudSource("Cloud Interconnect overview", "https://cloud.google.com/network-connectivity/docs/interconnect/concepts/overview"),
    VPN: googleCloudSource("Cloud VPN overview", "https://cloud.google.com/network-connectivity/docs/vpn/concepts/overview"),
    LOAD_BALANCING: googleCloudSource("Cloud Load Balancing overview", "https://cloud.google.com/load-balancing/docs/load-balancing-overview"),
    RESOURCE_HIERARCHY: googleCloudSource("resource hierarchy", "https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy"),
    IAM: googleCloudSource("Identity and Access Management overview", "https://cloud.google.com/iam/docs/overview"),
    SERVICE_ACCOUNTS: googleCloudSource("service accounts overview", "https://cloud.google.com/iam/docs/service-account-overview"),
    ORGANIZATION_POLICY: googleCloudSource("Organization Policy overview", "https://cloud.google.com/resource-manager/docs/organization-policy/overview"),
    MANAGED_INSTANCE_GROUPS: googleCloudSource("managed instance groups", "https://cloud.google.com/compute/docs/instance-groups"),
    SPOT_VMS: googleCloudSource("Spot VMs", "https://cloud.google.com/compute/docs/instances/spot"),
    SECRET_MANAGER: googleCloudSource("Secret Manager overview", "https://cloud.google.com/secret-manager/docs/overview"),
    CLOUD_KMS: googleCloudSource("Cloud Key Management Service overview", "https://docs.cloud.google.com/kms/docs/key-management-service"),
    VPC_SERVICE_CONTROLS: googleCloudSource("VPC Service Controls overview", "https://cloud.google.com/vpc-service-controls/docs/overview"),
    CLOUD_ARMOR: googleCloudSource("Cloud Armor overview", "https://cloud.google.com/armor/docs/cloud-armor-overview"),
    AUDIT_LOGS: googleCloudSource("Cloud Audit Logs overview", "https://cloud.google.com/logging/docs/audit"),
    SENSITIVE_DATA_PROTECTION: googleCloudSource("Sensitive Data Protection overview", "https://docs.cloud.google.com/sensitive-data-protection/docs/sensitive-data-protection-overview"),
    WORKLOAD_IDENTITY: googleCloudSource("Workload Identity Federation for GKE", "https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity"),
    IAP: googleCloudSource("Identity-Aware Proxy overview", "https://cloud.google.com/iap/docs/concepts-overview"),
    UNIFORM_BUCKET_ACCESS: googleCloudSource("uniform bucket-level access", "https://cloud.google.com/storage/docs/uniform-bucket-level-access"),
    BILLING_BUDGETS: googleCloudSource("Cloud Billing budgets", "https://cloud.google.com/billing/docs/how-to/budgets"),
    COMPUTE_CUDS: googleCloudSource("Compute Engine committed use discounts", "https://cloud.google.com/compute/docs/instances/committed-use-discounts-overview"),
    RECOMMENDER: googleCloudSource("Recommender overview", "https://cloud.google.com/recommender/docs/overview"),
    BIGQUERY_COSTS: googleCloudSource("BigQuery cost best practices", "https://cloud.google.com/bigquery/docs/best-practices-costs"),
    BILLING_EXPORT: googleCloudSource("Cloud Billing data export to BigQuery", "https://cloud.google.com/billing/docs/how-to/export-data-bigquery"),
    RESOURCE_LABELS: googleCloudSource("resource labels", "https://cloud.google.com/resource-manager/docs/creating-managing-labels"),
    NETWORK_SERVICE_TIERS: googleCloudSource("Network Service Tiers overview", "https://cloud.google.com/network-tiers/docs/overview"),
    SERVICE_MONITORING: googleCloudSource("service monitoring concepts", "https://cloud.google.com/monitoring/service-monitoring"),
    CLOUD_BUILD: googleCloudSource("Cloud Build overview", "https://cloud.google.com/build/docs/overview"),
    CLOUD_DEPLOY: googleCloudSource("Cloud Deploy overview", "https://cloud.google.com/deploy/docs/overview"),
    CLOUD_RUN_TRAFFIC: googleCloudSource("Cloud Run traffic migration and rollbacks", "https://cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration"),
    DATABASE_MIGRATION: googleCloudSource("Database Migration Service overview", "https://cloud.google.com/database-migration/docs/overview"),
    CLOUD_SCHEDULER: googleCloudSource("Cloud Scheduler overview", "https://cloud.google.com/scheduler/docs/overview"),
    DISASTER_RECOVERY: googleCloudSource("disaster recovery planning guide", "https://cloud.google.com/architecture/dr-scenarios-planning-guide"),
    CLOUD_SQL_HA: googleCloudSource("Cloud SQL high availability", "https://cloud.google.com/sql/docs/mysql/high-availability"),
    UPTIME_CHECKS: googleCloudSource("Cloud Monitoring uptime checks", "https://cloud.google.com/monitoring/uptime-checks")
  });
})();

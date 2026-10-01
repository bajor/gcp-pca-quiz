(function () {
  "use strict";

  const S = globalThis.PCA_QUIZ_SOURCES;

  globalThis.PCA_QUIZ_SECURITY_QUESTIONS = [
    {
      id: "security-secret-manager-application-secret",
      prompt: "A service needs database credentials that can be rotated and accessed at runtime without placing them in source code or container images. Which service should store the credentials?",
      answers: [
        { text: "Cloud Storage object metadata", explanation: "Incorrect. Object metadata is not a secret-management system and should not be used to store database credentials." },
        { text: "Secret Manager", explanation: "Correct. Secret Manager stores, versions, and controls access to sensitive values such as database credentials." },
        { text: "A Compute Engine instance label", explanation: "Incorrect. Labels are metadata for organizing resources and are not secure secret storage." },
        { text: "A public environment variable in the deployment manifest", explanation: "Incorrect. A publicly visible deployment value exposes the credential rather than managing it securely." }
      ],
      correct: 1,
      tags: ["security-compliance", "secrets"],
      source: S.SECRET_MANAGER
    },
    {
      id: "security-cmek-key-lifecycle-control",
      prompt: "A company must control the rotation, disabling, and destruction of encryption keys used by a supported Google Cloud service. What should the architect select?",
      answers: [
        { text: "Customer-managed encryption keys with Cloud KMS", explanation: "Correct. Customer-managed encryption keys use Cloud KMS keys, letting the customer manage key lifecycle and IAM controls." },
        { text: "Default Google-managed encryption only", explanation: "Incorrect. Google-managed encryption protects data, but it does not give the customer the requested key lifecycle control." },
        { text: "A VPC firewall rule", explanation: "Incorrect. Firewall rules control network traffic, not cryptographic key lifecycle." },
        { text: "Cloud CDN cache invalidation", explanation: "Incorrect. Cache invalidation controls cached content freshness and has no effect on encryption keys." }
      ],
      correct: 0,
      tags: ["security-compliance", "encryption"],
      source: S.CLOUD_KMS
    },
    {
      id: "security-vpc-service-controls-exfiltration",
      prompt: "A team stores regulated data in BigQuery and Cloud Storage. It needs a defense-in-depth control that limits copying this data to unauthorized resources outside a trusted perimeter, even if IAM is misconfigured. What should be added?",
      answers: [
        { text: "A larger Cloud NAT gateway", explanation: "Incorrect. Cloud NAT provides outbound address translation and does not define data-service perimeters." },
        { text: "VPC Service Controls service perimeters", explanation: "Correct. VPC Service Controls adds context-based service perimeters that help mitigate data exfiltration from supported services such as BigQuery and Cloud Storage." },
        { text: "A Cloud Storage lifecycle rule", explanation: "Incorrect. Lifecycle rules manage object age and storage class, not access across a service perimeter." },
        { text: "A Cloud DNS private zone", explanation: "Incorrect. Private DNS resolution does not prevent copying data to unauthorized Google Cloud resources." }
      ],
      correct: 1,
      tags: ["security-compliance", "data-exfiltration"],
      source: S.VPC_SERVICE_CONTROLS
    },
    {
      id: "security-cloud-armor-edge-protection",
      prompt: "A public web application behind an external Application Load Balancer needs web application firewall rules and Layer 7 DDoS protection. Which product should be used?",
      answers: [
        { text: "Cloud Armor", explanation: "Correct. Cloud Armor provides DDoS protection and web application firewall policies for protected applications." },
        { text: "Cloud KMS", explanation: "Incorrect. Cloud KMS manages cryptographic keys and does not filter HTTP requests or mitigate web attacks." },
        { text: "Cloud Scheduler", explanation: "Incorrect. Cloud Scheduler starts scheduled jobs and does not protect an internet-facing application." },
        { text: "Cloud Filestore", explanation: "Incorrect. Filestore is managed file storage, not an edge security control." }
      ],
      correct: 0,
      tags: ["security-compliance", "application-security"],
      source: S.CLOUD_ARMOR
    },
    {
      id: "security-audit-data-access-logs",
      prompt: "A security team must investigate who read sensitive data in a Google Cloud service. For services where it is not enabled by default, which Cloud Audit Logs category should they enable?",
      answers: [
        { text: "Admin Activity audit logs only", explanation: "Incorrect. Admin Activity records configuration changes, not the requested detailed record of data reads and writes." },
        { text: "System Event audit logs only", explanation: "Incorrect. System Event logs record Google Cloud system actions and do not replace data access logging." },
        { text: "Data Access audit logs", explanation: "Correct. Data Access audit logs record API calls that read configuration or user-provided resource data, and they must be explicitly enabled for many services." },
        { text: "A Cloud Billing budget alert", explanation: "Incorrect. Budget alerts report spending thresholds and do not capture resource access events." }
      ],
      correct: 2,
      tags: ["security-compliance", "audit"],
      source: S.AUDIT_LOGS
    },
    {
      id: "security-sensitive-data-protection",
      prompt: "Before sharing analytics data with a partner, an organization needs to discover personal data, classify it, and de-identify it. Which Google Cloud service is designed for this task?",
      answers: [
        { text: "Cloud Trace", explanation: "Incorrect. Cloud Trace analyzes request latency and does not inspect or de-identify sensitive data." },
        { text: "Sensitive Data Protection", explanation: "Correct. Sensitive Data Protection can discover, classify, inspect, and de-identify sensitive data in and outside Google Cloud." },
        { text: "Cloud Load Balancing", explanation: "Incorrect. Load balancing distributes network traffic and does not classify data content." },
        { text: "Cloud Router", explanation: "Incorrect. Cloud Router exchanges dynamic network routes and does not process sensitive data." }
      ],
      correct: 1,
      tags: ["security-compliance", "data-protection"],
      source: S.SENSITIVE_DATA_PROTECTION
    },
    {
      id: "security-gke-workload-identity",
      prompt: "Pods on GKE must call Google Cloud APIs without downloading long-lived service account key files into containers. What is the recommended identity design?",
      answers: [
        { text: "Store a JSON service account key in every container image", explanation: "Incorrect. Embedding long-lived keys in images exposes credentials and makes rotation difficult." },
        { text: "Use each developer's user credentials in the pods", explanation: "Incorrect. Workloads should not depend on personal identities or credentials." },
        { text: "Use Workload Identity Federation for GKE", explanation: "Correct. Workload Identity Federation for GKE lets Kubernetes workloads use IAM service account permissions without service account key files." },
        { text: "Assign the GKE cluster a billing account", explanation: "Incorrect. A billing account is not a workload authentication mechanism." }
      ],
      correct: 2,
      tags: ["security-compliance", "iam", "gke"],
      source: S.WORKLOAD_IDENTITY
    },
    {
      id: "security-iap-internal-web-app",
      prompt: "Employees need identity-based access to an internal web application without exposing it broadly to the internet or requiring a traditional VPN. Which service can enforce access before requests reach the application?",
      answers: [
        { text: "Cloud CDN", explanation: "Incorrect. Cloud CDN caches content but does not provide the requested identity-aware application access control." },
        { text: "Identity-Aware Proxy", explanation: "Correct. Identity-Aware Proxy uses identity and context to control access to applications before the request reaches the protected resource." },
        { text: "Cloud Storage lifecycle management", explanation: "Incorrect. Lifecycle management changes object storage state and has no role in application authentication." },
        { text: "Cloud Interconnect", explanation: "Incorrect. Cloud Interconnect provides private network connectivity but does not by itself enforce application-level identity access." }
      ],
      correct: 1,
      tags: ["security-compliance", "identity"],
      source: S.IAP
    },
    {
      id: "security-uniform-bucket-level-access",
      prompt: "A security policy requires all access to a Cloud Storage bucket to be controlled consistently with IAM and forbids object-level ACL exceptions. What should be enabled?",
      answers: [
        { text: "Object versioning", explanation: "Incorrect. Object versioning retains noncurrent object versions; it does not disable ACL-based access control." },
        { text: "Cloud Storage Autoclass", explanation: "Incorrect. Autoclass optimizes storage classes based on access patterns and does not change authorization semantics." },
        { text: "Uniform bucket-level access", explanation: "Correct. Uniform bucket-level access disables ACLs and uses bucket-level IAM policies for all access decisions." },
        { text: "A Cloud SQL read replica", explanation: "Incorrect. A Cloud SQL read replica is unrelated to Cloud Storage access management." }
      ],
      correct: 2,
      tags: ["security-compliance", "iam", "storage"],
      source: S.UNIFORM_BUCKET_ACCESS
    }
  ];
})();

(function () {
  "use strict";

  const S = globalThis.PCA_QUIZ_SOURCES;

  globalThis.PCA_QUIZ_INFRASTRUCTURE_QUESTIONS = [
    {
      id: "infrastructure-resource-hierarchy-organization",
      prompt: "An enterprise needs a governance policy to be inherited by every current and future project in the company. At which resource-hierarchy level should it be established?",
      answers: [
        { text: "Organization", explanation: "Correct. The organization is the top-level Google Cloud resource and policies applied there can be inherited by descendant folders and projects." },
        { text: "Individual Compute Engine VM", explanation: "Incorrect. A VM is a workload resource and a policy there cannot govern other projects or resources across the company." },
        { text: "Single project", explanation: "Incorrect. A project-level policy applies only in that project and will not automatically govern all other projects." },
        { text: "Cloud Storage bucket", explanation: "Incorrect. A bucket is a storage resource and cannot be the hierarchy root for enterprise-wide governance." }
      ],
      correct: 0,
      tags: ["manage-provision", "resource-hierarchy"],
      source: S.RESOURCE_HIERARCHY
    },
    {
      id: "infrastructure-iam-least-privilege",
      prompt: "A developer needs to deploy Cloud Run revisions in one project but does not need access to billing, IAM, or other projects. What is the best IAM approach?",
      answers: [
        { text: "Grant the Owner role on the organization", explanation: "Incorrect. Owner grants broad permissions across the organization and violates least privilege." },
        { text: "Grant the smallest suitable predefined or custom role on that project", explanation: "Correct. IAM should grant only the permissions needed, at the narrowest appropriate resource scope." },
        { text: "Share a Project Owner account among the developers", explanation: "Incorrect. Shared credentials reduce auditability and Owner is far broader than the required deployment permission." },
        { text: "Make the developer a billing account administrator", explanation: "Incorrect. Billing administration does not supply the required Cloud Run deployment permissions and is unrelated to the task." }
      ],
      correct: 1,
      tags: ["manage-provision", "iam"],
      source: S.IAM
    },
    {
      id: "infrastructure-service-account-workload-identity",
      prompt: "A Compute Engine workload must call Google Cloud APIs without using an employee's credentials. Which identity should the workload use?",
      answers: [
        { text: "A user-managed service account attached to the workload", explanation: "Correct. Service accounts represent non-human workloads and can receive only the IAM permissions the workload needs." },
        { text: "The developer's personal user account", explanation: "Incorrect. A workload should not depend on a person's identity or retain that person's credentials." },
        { text: "An API key stored in source control", explanation: "Incorrect. API keys do not replace IAM workload identity and storing credentials in source control is unsafe." },
        { text: "The project's billing account", explanation: "Incorrect. A billing account is not an identity that can authenticate a workload to Google Cloud APIs." }
      ],
      correct: 0,
      tags: ["manage-provision", "iam"],
      source: S.SERVICE_ACCOUNTS
    },
    {
      id: "infrastructure-org-policy-allowed-locations",
      prompt: "A compliance requirement permits new Google Cloud resources only in approved regions. What is the most scalable preventive control?",
      answers: [
        { text: "Ask every project owner to remember the approved regions", explanation: "Incorrect. Manual guidance is not an enforceable control and is likely to drift across projects." },
        { text: "Create a spreadsheet of resources after they are deployed", explanation: "Incorrect. A spreadsheet detects issues after the fact and does not prevent noncompliant resource creation." },
        { text: "Use an Organization Policy location constraint", explanation: "Correct. Organization Policy can enforce allowed resource locations at the organization, folder, or project level." },
        { text: "Use Cloud CDN", explanation: "Incorrect. Cloud CDN caches content near users and does not restrict where resources can be created." }
      ],
      correct: 2,
      tags: ["manage-provision", "governance"],
      source: S.ORGANIZATION_POLICY
    },
    {
      id: "infrastructure-mig-autoscaling",
      prompt: "A stateless web tier runs on identical Compute Engine VMs and must add or remove instances automatically as demand changes. Which design should be used?",
      answers: [
        { text: "A single large VM resized manually", explanation: "Incorrect. Manual vertical scaling is not automatic horizontal scaling and leaves a single-instance dependency." },
        { text: "A managed instance group with autoscaling", explanation: "Correct. Managed instance groups maintain identical VMs and can automatically scale the group from configured signals." },
        { text: "A Cloud Storage lifecycle rule", explanation: "Incorrect. Storage lifecycle rules manage object transitions and deletion, not compute instance count." },
        { text: "A Cloud KMS key ring", explanation: "Incorrect. Cloud KMS manages cryptographic keys and has no role in VM autoscaling." }
      ],
      correct: 1,
      tags: ["manage-provision", "compute"],
      source: S.MANAGED_INSTANCE_GROUPS
    },
    {
      id: "infrastructure-spot-vms-fault-tolerant",
      prompt: "A fault-tolerant batch job can restart from checkpoints and its primary goal is to minimize compute cost. Which Compute Engine purchasing option is most appropriate?",
      answers: [
        { text: "Sole-tenant nodes", explanation: "Incorrect. Sole-tenant nodes address isolation requirements and are not the low-cost, interruptible option described." },
        { text: "A committed use discount before estimating stable usage", explanation: "Incorrect. Commitments suit predictable baseline use; this question emphasizes a workload that can tolerate interruption." },
        { text: "Spot VMs", explanation: "Correct. Spot VMs offer discounted capacity that can be preempted, so they are appropriate for fault-tolerant, interruptible workloads." },
        { text: "A fixed regional managed instance group", explanation: "Incorrect. A managed instance group can improve availability, but it does not itself provide the discounted interruptible pricing model." }
      ],
      correct: 2,
      tags: ["manage-provision", "cost-optimization"],
      source: S.SPOT_VMS
    },
    {
      id: "infrastructure-storage-lifecycle-management",
      prompt: "A bucket receives daily exports that should become cheaper after 90 days and be deleted after seven years. Which Cloud Storage feature should automate this policy?",
      answers: [
        { text: "A Cloud Storage lifecycle configuration", explanation: "Correct. Lifecycle management can transition objects between storage classes and delete them when conditions such as object age are met." },
        { text: "A Cloud Run minimum instance setting", explanation: "Incorrect. Cloud Run minimum instances control running container capacity, not object retention or storage class transitions." },
        { text: "An IAM conditional role", explanation: "Incorrect. IAM conditions control access, not automated changes to object storage classes or deletion." },
        { text: "A Cloud Load Balancing health check", explanation: "Incorrect. Health checks assess backend health and do not manage stored objects." }
      ],
      correct: 0,
      tags: ["manage-provision", "storage", "cost-optimization"],
      source: S.STORAGE_LIFECYCLE
    },
    {
      id: "infrastructure-bucket-lock-retention",
      prompt: "Regulations require financial records to remain undeletable for a fixed retention period, even for users with broad storage permissions. Which Cloud Storage feature should be used after the retention policy is finalized?",
      answers: [
        { text: "Object versioning alone", explanation: "Incorrect. Versioning retains noncurrent versions, but it does not make a retention policy immutable." },
        { text: "A standard lifecycle delete rule", explanation: "Incorrect. A lifecycle rule can delete objects; it does not prevent their deletion before a required retention period." },
        { text: "Uniform bucket-level access", explanation: "Incorrect. Uniform bucket-level access simplifies authorization but does not impose immutable data retention." },
        { text: "Bucket Lock", explanation: "Correct. Bucket Lock permanently locks a bucket retention policy so that protected objects cannot be deleted or altered before the retention period." }
      ],
      correct: 3,
      tags: ["manage-provision", "storage", "compliance"],
      source: S.BUCKET_LOCK
    }
  ];
})();

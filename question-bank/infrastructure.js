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
    },
    {
      id: "infrastructure-shared-vpc-subnet-delegation",
      prompt: "An application team must create Compute Engine VMs in its service project and attach them only to one approved subnet in a Shared VPC host project. The team must not modify subnets, routes, or firewall rules. Which IAM design follows least privilege?",
      answers: [
        { text: "Grant Compute Network Admin on the host project and Viewer on the service project", explanation: "Incorrect. Network Admin permits changes to host-project networking, while Viewer does not let the team create its service-project VMs." },
        { text: "Grant Owner on both the host and service projects", explanation: "Incorrect. Owner grants far more resource and IAM control than the team needs." },
        { text: "Grant Compute Instance Admin on the service project and Compute Network User on only the approved host-project subnet", explanation: "Correct. Instance Admin permits VM management in the service project, while subnet-level Network User delegates use of only the approved Shared VPC subnet without network administration." },
        { text: "Grant Compute Network User on the entire host project and no role on the service project", explanation: "Incorrect. Host-project Network User would expose all current and future subnets and would not grant permission to create VMs in the service project." }
      ],
      correct: 2,
      tags: ["manage-provision", "networking", "iam", "advanced"],
      source: S.SHARED_VPC
    },
    {
      id: "infrastructure-hierarchical-firewall-delegation",
      prompt: "Security administrators must enforce an organization-wide denial of direct internet SSH that project owners cannot override. For traffic not covered by central rules, project network teams should retain control of their VPC firewall rules. Which configuration meets both requirements?",
      answers: [
        { text: "Create an organization-level hierarchical firewall policy with the SSH deny rule and use goto-next rules where evaluation should pass to lower levels", explanation: "Correct. Hierarchical firewall policies are inherited from the organization or folders, so a central deny can take precedence while goto-next delegates unmatched decisions to lower policies and VPC rules." },
        { text: "Ask each project owner to copy the same SSH deny VPC firewall rule", explanation: "Incorrect. Independently copied rules can drift and project owners with sufficient permissions can change or remove them." },
        { text: "Use a Cloud Armor rule to deny TCP port 22 for every VPC", explanation: "Incorrect. Cloud Armor protects supported load-balanced application traffic and is not the control plane for general VPC SSH traffic." },
        { text: "Use a resource-location Organization Policy constraint", explanation: "Incorrect. Resource-location constraints govern where supported resources can be created, not packet filtering or delegated firewall evaluation." }
      ],
      correct: 0,
      tags: ["manage-provision", "networking", "governance", "advanced"],
      source: S.HIERARCHICAL_FIREWALL
    },
    {
      id: "infrastructure-private-google-access-on-premises",
      prompt: "On-premises servers reach a VPC through Cloud Interconnect and have no internet route. They must call only Google APIs supported by VPC Service Controls, and API traffic must stay on Google's network. What should the network team configure?",
      answers: [
        { text: "Resolve all Google APIs to their normal public addresses and advertise a default internet route", explanation: "Incorrect. This depends on public API addresses and an internet route, contrary to the private connectivity requirement." },
        { text: "Configure Private Google Access for on-premises hosts with restricted.googleapis.com DNS and advertise its VIP range through Cloud Router", explanation: "Correct. The restricted VIP exposes only VPC Service Controls-supported APIs, and the DNS and custom route advertisement direct on-premises API traffic over the hybrid connection to Google's network." },
        { text: "Configure private.googleapis.com because it blocks every API not supported by VPC Service Controls", explanation: "Incorrect. private.googleapis.com exposes a broader set of Google APIs; restricted.googleapis.com is the option that limits access to supported services." },
        { text: "Create a Cloud NAT gateway and use its external addresses as inbound API proxies", explanation: "Incorrect. Cloud NAT supports outbound connections for eligible VPC resources and does not act as an inbound proxy for on-premises hosts." }
      ],
      correct: 1,
      tags: ["manage-provision", "hybrid-networking", "private-access", "advanced"],
      source: S.PRIVATE_GOOGLE_ACCESS_HYBRID
    }
  ];
})();

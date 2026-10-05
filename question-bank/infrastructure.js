(function () {
  "use strict";

  const S = globalThis.PCA_QUIZ_SOURCES;

  globalThis.PCA_QUIZ_INFRASTRUCTURE_QUESTIONS = [
    {
      id: "infrastructure-resource-hierarchy-organization",
      prompt: "An enterprise needs a governance policy to be inherited by every current and future project in the company. At which resource-hierarchy level should it be established?",
      answers: [
        { text: "Organization", explanation: "Correct. The organization is the top-level Google Cloud resource and policies applied there can be inherited by descendant folders and projects." },
        { text: "The folder that currently contains production projects", explanation: "Incorrect. A folder policy reaches only that folder's descendants and would miss projects in other current or future organization branches." },
        { text: "Each project, automated from a central Terraform module", explanation: "Incorrect. Automation can reduce drift, but separate project policies do not provide one inherited control that automatically covers every hierarchy branch." },
        { text: "The billing account linked to the projects", explanation: "Incorrect. Billing accounts govern payment relationships and are not ancestors of projects in the resource hierarchy for policy inheritance." }
      ],
      correct: 0,
      tags: ["manage-provision", "resource-hierarchy"],
      source: S.RESOURCE_HIERARCHY
    },
    {
      id: "infrastructure-iam-least-privilege",
      prompt: "A developer needs to deploy Cloud Run revisions in one project and use one approved runtime service account, but must not change project IAM, billing, or unrelated services. What is the best IAM approach?",
      answers: [
        { text: "Grant Cloud Run Admin on the organization so inherited access covers the target project", explanation: "Incorrect. Organization scope exposes every descendant project and Cloud Run Admin is broader than the one-project deployment need." },
        { text: "Grant the smallest suitable deployment role in the target project and Service Account User only on the approved runtime service account", explanation: "Correct. Narrow resource scopes and only the permissions required for deployment and use of the runtime identity follow least privilege." },
        { text: "Grant Project Editor in the target project and remove billing permissions with a deny rule", explanation: "Incorrect. Editor still grants broad modification rights across many project services, even if billing access is separately restricted." },
        { text: "Create a shared deployer service account key and give the key to every developer", explanation: "Incorrect. A shared long-lived key weakens attribution and credential security rather than granting each developer narrowly scoped access." }
      ],
      correct: 1,
      tags: ["manage-provision", "iam"],
      source: S.IAM
    },
    {
      id: "infrastructure-service-account-workload-identity",
      prompt: "A Compute Engine workload must call two Google Cloud APIs without using an employee identity or a downloaded long-lived key. Its permissions must be independently reviewable and limited to that workload. Which identity design should be used?",
      answers: [
        { text: "A user-managed service account attached to the VM with only the required IAM roles", explanation: "Correct. An attached service account gives the VM a non-human identity and short-lived credentials from the metadata server without distributing a key file." },
        { text: "The Compute Engine default service account with the broad Editor role", explanation: "Incorrect. It avoids a user credential but does not provide the independent, workload-specific least-privilege identity requested." },
        { text: "A user-managed service account key copied to the VM at startup", explanation: "Incorrect. The service account is an appropriate identity type, but downloading and distributing a long-lived key violates the credential requirement and adds rotation risk." },
        { text: "Workload Identity Federation configured for an external identity provider", explanation: "Incorrect. Federation is useful for workloads outside Google Cloud; a Compute Engine VM can use an attached service account directly without an external provider." }
      ],
      correct: 0,
      tags: ["manage-provision", "iam"],
      source: S.SERVICE_ACCOUNTS
    },
    {
      id: "infrastructure-org-policy-allowed-locations",
      prompt: "A compliance requirement permits new Google Cloud resources only in approved regions. What is the most scalable preventive control?",
      answers: [
        { text: "Add an IAM condition to each resource-creator role that compares the requested region", explanation: "Incorrect. IAM Conditions do not provide one universal creation-time location guardrail across supported resource types and every role binding." },
        { text: "Use Security Command Center findings to delete resources found outside approved regions", explanation: "Incorrect. Detection and remediation occur after creation, while the requirement asks for a scalable preventive control." },
        { text: "Use an Organization Policy location constraint", explanation: "Correct. Organization Policy can enforce allowed resource locations at the organization, folder, or project level." },
        { text: "Require Terraform for deployments and reject unapproved regions in one repository's CI pipeline", explanation: "Incorrect. This helps governed pipelines but can be bypassed by other deployment paths unless an Organization Policy enforces the location at the resource API." }
      ],
      correct: 2,
      tags: ["manage-provision", "governance"],
      source: S.ORGANIZATION_POLICY
    },
    {
      id: "infrastructure-mig-autoscaling",
      prompt: "A stateless web tier runs on identical Compute Engine VMs and must add or remove instances automatically as demand changes. Which design should be used?",
      answers: [
        { text: "An unmanaged instance group with a Cloud Scheduler job that creates VMs at predicted peak times", explanation: "Incorrect. Scheduled capacity is not demand-responsive autoscaling, and unmanaged groups do not maintain instances from a common template." },
        { text: "A managed instance group with autoscaling", explanation: "Correct. Managed instance groups maintain identical VMs and can automatically scale the group from configured signals." },
        { text: "A managed instance group with a fixed target size and autohealing only", explanation: "Incorrect. Autohealing replaces unhealthy instances but does not add or remove capacity as demand changes." },
        { text: "Several standalone VMs behind a load balancer with utilization alerts", explanation: "Incorrect. Alerts and load balancing distribute and report traffic, but standalone VMs are not automatically added or removed without an autoscaled group." }
      ],
      correct: 1,
      tags: ["manage-provision", "compute"],
      source: S.MANAGED_INSTANCE_GROUPS
    },
    {
      id: "infrastructure-spot-vms-fault-tolerant",
      prompt: "A fault-tolerant batch job can restart from checkpoints and its primary goal is to minimize compute cost. Which Compute Engine purchasing option is most appropriate?",
      answers: [
        { text: "A capacity reservation for standard VMs", explanation: "Incorrect. A reservation improves capacity assurance but does not provide the discounted interruptible pricing that the checkpointed job can exploit." },
        { text: "A one-year resource-based committed use discount", explanation: "Incorrect. A commitment can reduce predictable baseline cost but creates a term commitment; the workload's explicit interruption tolerance makes Spot capacity the better fit for minimizing compute price." },
        { text: "Spot VMs", explanation: "Correct. Spot VMs offer discounted capacity that can be preempted, so they are appropriate for fault-tolerant, interruptible workloads." },
        { text: "Standard on-demand VMs that receive automatic sustained use discounts", explanation: "Incorrect. Sustained use discounts can reduce eligible on-demand cost without interruption, but a checkpointed workload that explicitly tolerates preemption can use the deeper Spot pricing model." }
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
        { text: "Cloud Storage Autoclass plus a seven-year soft-delete duration", explanation: "Incorrect. Autoclass chooses storage classes from observed access patterns rather than the required fixed 90-day transition, and soft delete is a recovery window rather than a seven-year lifecycle deletion schedule." },
        { text: "A seven-year retention policy with no lifecycle rules", explanation: "Incorrect. A retention policy prevents early deletion but does not transition objects after 90 days or automatically delete them when the retention period ends." },
        { text: "A daily Storage Transfer Service job between Standard and Archive buckets", explanation: "Incorrect. Scheduled transfers add a second bucket and custom age-selection workflow when native lifecycle rules can perform both timed transitions and deletion in place." }
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
    },
    {
      id: "infrastructure-manager-terraform-revisions",
      prompt: "A platform team stores Terraform configurations in Git. It wants pull requests to show the planned resource changes, merged changes to run in a Google-managed execution environment, and each applied version to retain its configuration, logs, resource list, and state. Which approach best meets these requirements?",
      answers: [
        { text: "Use Infrastructure Manager deployments, previews, and revisions, integrated with Cloud Build repository triggers", explanation: "Correct. Infrastructure Manager runs Terraform through a managed toolchain, previews planned changes, and records deployment revisions with configuration, logs, resources, and state. Its Git automation uses Cloud Build triggers for previews and deployments." },
        { text: "Run terraform apply from each engineer's workstation and store console output in Git", explanation: "Incorrect. Workstation execution does not provide a centrally managed runtime or authoritative managed deployment state and revisions." },
        { text: "Use Deployment Manager previews and import the Terraform state into each deployment", explanation: "Incorrect. Deployment Manager uses its own configuration model and is not the managed Terraform revision workflow requested." },
        { text: "Store Terraform files in Artifact Registry and let Config Sync apply them directly to projects", explanation: "Incorrect. Config Sync manages Kubernetes configuration from a source of truth; it does not execute general Terraform plans and maintain Infrastructure Manager deployment revisions." }
      ],
      correct: 0,
      tags: ["manage-provision", "infrastructure-as-code", "terraform", "advanced"],
      source: S.INFRASTRUCTURE_MANAGER
    },
    {
      id: "infrastructure-mig-zero-unavailable-update",
      prompt: "A stateless regional managed instance group has exactly enough healthy VMs to meet its service capacity target. A new instance template requires VM replacement. During the automatic rollout, no existing capacity may be unavailable before replacement VMs become healthy, and quota permits three temporary VMs. Which update policy is appropriate?",
      answers: [
        { text: "Set maxUnavailable to 3 and maxSurge to 0 so old VMs are replaced first", explanation: "Incorrect. This can remove up to three existing VMs before their replacements are available, violating the zero-capacity-loss requirement." },
        { text: "Set both maxUnavailable and maxSurge to 0 and use a proactive update", explanation: "Incorrect. At least one of maxUnavailable or maxSurge must be greater than zero, otherwise the rollout cannot make progress." },
        { text: "Set maxUnavailable to 0 and maxSurge to 3, with a health check and suitable minimum ready time", explanation: "Correct. The updater can create up to three replacement VMs above target size and waits for availability before removing old capacity. Health and readiness settings prevent merely running but unready replacements from being treated as available." },
        { text: "Set maxUnavailable to 100% and rely on the regional distribution to preserve capacity", explanation: "Incorrect. Regional placement protects against zonal failure, but allowing all instances to be unavailable permits the updater to disrupt the entire serving fleet." }
      ],
      correct: 2,
      tags: ["manage-provision", "compute", "rolling-update", "advanced"],
      source: S.MIG_ROLLING_UPDATES
    },
    {
      id: "infrastructure-ncc-vpc-hybrid-transit",
      prompt: "An enterprise has many independently administered VPC networks and several on-premises sites connected by HA VPN and Cloud Interconnect. It needs centrally managed, scalable any-to-any route exchange among the VPCs and hybrid connections without building pairwise peering and VPN meshes. Which design should it use?",
      answers: [
        { text: "Attach VPC spokes and the appropriate hybrid spokes to a Network Connectivity Center hub and configure route exchange", explanation: "Correct. Network Connectivity Center provides centralized hub-and-spoke orchestration and supports any-to-any connectivity across VPC and hybrid spokes when route exchange is configured." },
        { text: "Create a full mesh of VPC Network Peering links and rely on peering to transit on-premises routes", explanation: "Incorrect. Pairwise peering creates the operational mesh being avoided, and VPC Network Peering is not a general transitive-routing service." },
        { text: "Move every project into one Shared VPC and terminate all hybrid links in service projects", explanation: "Incorrect. Shared VPC centralizes one VPC across service projects but does not preserve the requirement for many independently administered VPC networks or provide this multi-VPC hub route exchange model." },
        { text: "Create one Cloud Router in each VPC and enable BGP sessions directly between Cloud Routers", explanation: "Incorrect. Cloud Routers exchange routes with supported peer routers over hybrid connectivity; they do not form direct BGP sessions with one another to create centralized inter-VPC transit." }
      ],
      correct: 0,
      tags: ["manage-provision", "networking", "hybrid-networking", "advanced"],
      source: S.NETWORK_CONNECTIVITY_CENTER
    },
    {
      id: "infrastructure-mandatory-resource-tags",
      prompt: "An organization requires every newly created supported Compute Engine instance to carry a centrally defined environment tag before creation succeeds. Teams must not bypass the requirement by using a deployment path outside the approved Terraform pipeline. Which control should enforce it?",
      answers: [
        { text: "Require a standard label in the Terraform module and reject pull requests without it", explanation: "Incorrect. This validates one infrastructure pipeline but can be bypassed by other APIs or deployment tools, and labels are not the tag bindings used for tag-based policy enforcement." },
        { text: "Use a custom Organization Policy constraint to require the tag on supported resource types", explanation: "Correct. A custom Organization Policy can enforce mandatory tags at resource creation for supported types, so the check applies at the Google Cloud resource API rather than only in one deployment pipeline." },
        { text: "Add the tag key to the organization and ask project owners to bind it after instances are created", explanation: "Incorrect. Defining a tag key and relying on post-creation procedures does not block an instance from being created without the required binding." },
        { text: "Apply an IAM condition to instance-creation roles that checks the value of a resource label", explanation: "Incorrect. An IAM condition on role grants is not the documented organization-wide mechanism for requiring tag bindings at creation across supported resource types." }
      ],
      correct: 1,
      tags: ["manage-provision", "governance", "tags", "advanced"],
      source: S.RESOURCE_TAGS
    },
    {
      id: "infrastructure-mig-patch-template-drift",
      prompt: "A production managed instance group automatically scales and repairs failed VMs. Security patches must remain applied after scale-out or repair, and every VM must converge on a reproducible approved OS baseline. What should the team do?",
      answers: [
        { text: "Run a VM Manager patch job against current MIG instances and leave the instance template unchanged", explanation: "Incorrect. Patching current instances does not change the source template. A repaired or newly scaled VM is created from that template and can return to an unpatched baseline." },
        { text: "Disable MIG repair and autoscaling, patch each VM manually, then re-enable both settings", explanation: "Incorrect. This interrupts managed repair and scaling during maintenance, and subsequent replacements can still use the unchanged unpatched template." },
        { text: "Build and test a patched VM image, update the MIG instance template to that image, and roll out the template", explanation: "Correct. A patched image in the instance template makes repairs and future scale-outs use the approved OS baseline; a controlled MIG rollout replaces existing instances with that configuration." },
        { text: "Attach a recurring VM Manager patch deployment to the MIG and assume patched VMs are preserved during scale-in", explanation: "Incorrect. VM Manager warns that MIG repairs or autoscaling can replace patched instances with VMs from the unchanged template, so in-place patching alone does not preserve the baseline." }
      ],
      correct: 2,
      tags: ["manage-provision", "compute", "patch-management", "advanced"],
      source: S.VM_MANAGER_PATCH
    },
    {
      id: "infrastructure-compute-compact-placement-hpc",
      prompt: "A tightly coupled MPI workload runs on many Compute Engine VMs in one zone and exchanges data between nodes continuously. The team prioritizes low east-west network latency over protection from a correlated zone failure and has no host-isolation requirement. Which placement design should it evaluate?",
      answers: [
        { text: "A spread placement policy across separate failure domains", explanation: "Incorrect. Spread placement improves resilience by separating instances, but it conflicts with the requirement to place communicating VMs close together for lower latency." },
        { text: "Sole-tenant nodes without a placement policy", explanation: "Incorrect. Sole tenancy provides dedicated host occupancy for isolation or licensing needs, but it does not by itself guarantee the compact placement requested." },
        { text: "A zonal capacity reservation for each VM without a placement policy", explanation: "Incorrect. Reservations provide capacity assurance, not physical proximity between VMs, so they do not directly reduce the application's east-west latency." },
        { text: "A compact placement policy for the VM group", explanation: "Correct. A compact placement policy places instances physically close within the zone to reduce network latency, matching the workload's communication pattern and stated failure tradeoff." }
      ],
      correct: 3,
      tags: ["manage-provision", "compute", "placement", "advanced"],
      source: S.COMPACT_PLACEMENT
    }
  ];
})();

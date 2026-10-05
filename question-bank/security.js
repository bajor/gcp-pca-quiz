(function () {
  "use strict";

  const S = globalThis.PCA_QUIZ_SOURCES;

  globalThis.PCA_QUIZ_SECURITY_QUESTIONS = [
    {
      id: "security-secret-manager-application-secret",
      prompt: "A service needs database credentials that can be rotated and accessed at runtime without placing them in source code or container images. Which service should store the credentials?",
      answers: [
        { text: "A Cloud KMS-encrypted configuration file stored with the application", explanation: "Incorrect. This can encrypt the value, but the team must build secret versioning, distribution, access, and rotation workflows that Secret Manager provides directly." },
        { text: "Secret Manager", explanation: "Correct. Secret Manager stores, versions, and controls access to sensitive values such as database credentials." },
        { text: "An environment variable containing the credential in the deployment manifest", explanation: "Incorrect. Environment injection can deliver a value at runtime, but placing the plaintext credential in the manifest exposes it and provides no managed rotation or version lifecycle." },
        { text: "A private Cloud Storage object readable by the service account", explanation: "Incorrect. IAM can restrict the object, but Cloud Storage is not designed for secret version access, rotation workflows, and secret-specific audit operations." }
      ],
      correct: 1,
      tags: ["security-compliance", "secrets"],
      source: S.SECRET_MANAGER
    },
    {
      id: "security-cmek-key-lifecycle-control",
      prompt: "A company must control the rotation schedule, IAM use, disabling, and destruction of encryption keys used by a supported Google Cloud service, while keeping service-side encryption integrated with that product. What should the architect select?",
      answers: [
        { text: "Customer-managed encryption keys with Cloud KMS", explanation: "Correct. Customer-managed encryption keys use Cloud KMS keys, letting the customer manage key lifecycle and IAM controls." },
        { text: "Default Google-managed encryption keys with an Organization Policy rotation constraint", explanation: "Incorrect. Google manages the lifecycle of default encryption keys, and Organization Policy does not give the customer direct disable and destroy control over those keys." },
        { text: "Customer-supplied encryption keys passed with each API request", explanation: "Incorrect. Customer-supplied keys require the application to supply and protect key material and do not provide the requested managed Cloud KMS rotation and lifecycle integration." },
        { text: "Application-layer encryption using a key embedded in the service image", explanation: "Incorrect. Application encryption can add a layer of protection, but embedding a key is unsafe and does not integrate customer-controlled key lifecycle with the managed service." }
      ],
      correct: 0,
      tags: ["security-compliance", "encryption"],
      source: S.CLOUD_KMS
    },
    {
      id: "security-vpc-service-controls-exfiltration",
      prompt: "A team stores regulated data in BigQuery and Cloud Storage. It needs a defense-in-depth control that limits copying this data to unauthorized resources outside a trusted perimeter, even if IAM is misconfigured. What should be added?",
      answers: [
        { text: "IAM deny policies for known export permissions only", explanation: "Incorrect. IAM deny can block selected permissions, but it does not provide the context-aware managed-service perimeter that restricts data movement even when an allow policy is overly broad." },
        { text: "VPC Service Controls service perimeters", explanation: "Correct. VPC Service Controls adds context-based service perimeters that help mitigate data exfiltration from supported services such as BigQuery and Cloud Storage." },
        { text: "Customer-managed encryption keys with separate keys for each project", explanation: "Incorrect. CMEK controls cryptographic key use and can support separation, but an authorized service call could still copy decrypted data outside the trusted resource set." },
        { text: "Private Google Access with public IP addresses removed from workloads", explanation: "Incorrect. Private API connectivity changes the network path but does not define which Google Cloud resources may exchange protected service data." }
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
        { text: "VPC firewall rules applied to the load balancer proxy-only subnet", explanation: "Incorrect. VPC firewalls control network-layer traffic to eligible interfaces and do not inspect HTTP requests for web attacks at the external Application Load Balancer edge." },
        { text: "Cloud IDS with packet mirroring from every backend", explanation: "Incorrect. Cloud IDS provides network threat detection and findings, but it is not an inline edge web application firewall that blocks Layer 7 requests." },
        { text: "reCAPTCHA Enterprise integrated only in the login form", explanation: "Incorrect. reCAPTCHA can help detect abusive user interactions, but it does not provide the general WAF policy and Layer 7 DDoS protection required for the whole application." }
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
        { text: "Access Transparency logs only", explanation: "Incorrect. Access Transparency records supported access by Google personnel, not ordinary reads by principals in the customer's organization." }
      ],
      correct: 2,
      tags: ["security-compliance", "audit"],
      source: S.AUDIT_LOGS
    },
    {
      id: "security-sensitive-data-protection",
      prompt: "Before sharing analytics data with a partner, an organization needs to discover personal data, classify it, and de-identify it. Which Google Cloud service is designed for this task?",
      answers: [
        { text: "Dataplex Universal Catalog with automatic discovery only", explanation: "Incorrect. Cataloging can improve metadata discovery and governance, but it does not by itself provide the full inspection and transformation methods needed to de-identify sensitive values." },
        { text: "Sensitive Data Protection", explanation: "Correct. Sensitive Data Protection can discover, classify, inspect, and de-identify sensitive data in and outside Google Cloud." },
        { text: "BigQuery policy tags and column-level access control", explanation: "Incorrect. Policy tags restrict who can read classified columns, but they do not discover sensitive values or transform them for partner sharing." },
        { text: "Cloud KMS envelope encryption", explanation: "Incorrect. Encryption protects data confidentiality at rest or in transit but does not inspect, classify, or de-identify the content before sharing." }
      ],
      correct: 1,
      tags: ["security-compliance", "data-protection"],
      source: S.SENSITIVE_DATA_PROTECTION
    },
    {
      id: "security-gke-workload-identity",
      prompt: "Pods on GKE must call Google Cloud APIs without downloading long-lived service account key files into containers. What is the recommended identity design?",
      answers: [
        { text: "Mount a service account JSON key from a Kubernetes Secret", explanation: "Incorrect. This avoids embedding the key in the image but still distributes a long-lived credential that must be rotated and can be exfiltrated." },
        { text: "Grant the node service account every API role required by any pod on the node", explanation: "Incorrect. Node-wide credentials expand the blast radius and do not provide pod-level least-privilege identities." },
        { text: "Use Workload Identity Federation for GKE", explanation: "Correct. Workload Identity Federation for GKE lets Kubernetes workloads use IAM service account permissions without service account key files." },
        { text: "Run a custom metadata proxy that returns one shared service account token to all namespaces", explanation: "Incorrect. A shared token proxy weakens workload isolation and duplicates identity plumbing that Workload Identity Federation for GKE manages per workload." }
      ],
      correct: 2,
      tags: ["security-compliance", "iam", "gke"],
      source: S.WORKLOAD_IDENTITY
    },
    {
      id: "security-iap-internal-web-app",
      prompt: "Employees need identity- and context-based access to an internal web application through an HTTPS load balancer. The team does not want to extend the corporate network with a traditional VPN, and authorization must occur before requests reach the application. Which service should enforce access?",
      answers: [
        { text: "Cloud VPN with firewall rules for employee address ranges", explanation: "Incorrect. This extends network access and identifies source networks, not individual users and request context at the application edge." },
        { text: "Identity-Aware Proxy", explanation: "Correct. Identity-Aware Proxy uses identity and context to control access to applications before the request reaches the protected resource." },
        { text: "An external Application Load Balancer with an allowlist of employee public IP addresses", explanation: "Incorrect. An IP allowlist does not authenticate employees or evaluate their user and device context, and roaming addresses make it brittle." },
        { text: "VPC Service Controls around the application project", explanation: "Incorrect. VPC Service Controls protects supported Google-managed service APIs from data exfiltration; it is not the user authentication proxy for a custom web application." }
      ],
      correct: 1,
      tags: ["security-compliance", "identity"],
      source: S.IAP
    },
    {
      id: "security-uniform-bucket-level-access",
      prompt: "A security policy requires all access to a Cloud Storage bucket to be controlled consistently with IAM and forbids object-level ACL exceptions. What should be enabled?",
      answers: [
        { text: "IAM Conditions on the existing bucket role bindings", explanation: "Incorrect. Conditions can constrain IAM grants but do not disable legacy bucket and object ACLs that could provide separate access." },
        { text: "Public access prevention", explanation: "Incorrect. Public access prevention blocks public principals but does not disable all object-level ACLs or require IAM-only authorization for named users." },
        { text: "Uniform bucket-level access", explanation: "Correct. Uniform bucket-level access disables ACLs and uses bucket-level IAM policies for all access decisions." },
        { text: "Signed URLs for every object request", explanation: "Incorrect. Signed URLs delegate time-limited access but do not remove object ACL evaluation or establish IAM as the only bucket authorization system." }
      ],
      correct: 2,
      tags: ["security-compliance", "iam", "storage"],
      source: S.UNIFORM_BUCKET_ACCESS
    },
    {
      id: "security-workforce-identity-external-contractors",
      prompt: "Contractors are people managed in a partner's SAML identity provider. They need attributable Google Cloud console and CLI access, but policy forbids creating or synchronizing Cloud Identity accounts for them. Which identity design should be used?",
      answers: [
        { text: "Create one Google service account key and share it with all contractors", explanation: "Incorrect. A shared workload credential is not a human identity, loses individual attribution, and creates a long-lived key risk." },
        { text: "Use Workload Identity Federation with one workload pool for each contractor", explanation: "Incorrect. Workload Identity Federation is intended for non-human workloads, not workforce users accessing the console and CLI." },
        { text: "Use Workforce Identity Federation with a workforce pool provider and grant IAM roles to mapped partner identities or groups", explanation: "Correct. Workforce Identity Federation authenticates external users and groups through SAML or OIDC without requiring synchronized Cloud Identity accounts, while preserving IAM authorization and audit identity." },
        { text: "Give the partner network access through Cloud VPN and skip IAM authentication", explanation: "Incorrect. Private network connectivity does not authenticate individual users or authorize Google Cloud console and API actions." }
      ],
      correct: 2,
      tags: ["security-compliance", "iam", "federation", "advanced"],
      source: S.WORKFORCE_IDENTITY
    },
    {
      id: "security-workload-identity-github-claims",
      prompt: "A GitHub Actions workflow must deploy to Google Cloud without stored service account keys. Because GitHub is a multi-tenant OIDC issuer, tokens from other organizations or repositories must not gain access. What is the best design?",
      answers: [
        { text: "Use a workload identity pool provider for GitHub, map stable token claims, restrict them with an attribute condition, and grant only the matched principal access", explanation: "Correct. Workload Identity Federation exchanges GitHub OIDC credentials for short-lived Google Cloud credentials, while claim mappings and attribute conditions restrict trust to the intended organization and repository." },
        { text: "Store a service account JSON key in an encrypted repository secret", explanation: "Incorrect. Encryption at rest does not remove the long-lived key, rotation, exfiltration, and replay risks that federation avoids." },
        { text: "Use Workforce Identity Federation and authorize every member of the GitHub organization", explanation: "Incorrect. The caller is a deployment workload, not a human workforce user, and broad organization membership does not bind access to the intended workflow claims." },
        { text: "Use an unrestricted workload identity pool because the OIDC issuer signature identifies the repository", explanation: "Incorrect. A valid token signature identifies the shared GitHub issuer; explicit claim mapping and conditions are needed to reject tokens from other tenants and repositories." }
      ],
      correct: 0,
      tags: ["security-compliance", "iam", "federation", "ci-cd", "advanced"],
      source: S.WORKLOAD_IDENTITY_FEDERATION
    },
    {
      id: "security-kms-separation-of-duties",
      prompt: "A security team must create, rotate, disable, and destroy Cloud KMS keys but must not decrypt application data. An application runtime must decrypt with one specific key but must not administer it. Which role assignment enforces this separation of duties?",
      answers: [
        { text: "Grant Cloud KMS Admin to both the security team and the runtime", explanation: "Incorrect. The runtime would receive key lifecycle administration, and Cloud KMS Admin alone does not grant direct cryptographic operations." },
        { text: "Grant Cloud KMS CryptoKey Encrypter/Decrypter to the security team and Owner to the runtime", explanation: "Incorrect. This reverses the intended duties and gives the runtime excessive project-wide control." },
        { text: "Grant Cloud KMS Admin to the security team and Cloud KMS CryptoKey Decrypter to the runtime on the specific key", explanation: "Correct. Cloud KMS Admin manages key lifecycle without direct decrypt permission, while the key-scoped Decrypter role lets the runtime decrypt without administering the key." },
        { text: "Grant Secret Manager Secret Accessor to both principals", explanation: "Incorrect. Secret Manager roles do not provide Cloud KMS key administration or cryptographic use permissions." }
      ],
      correct: 2,
      tags: ["security-compliance", "encryption", "iam", "advanced"],
      source: S.KMS_SEPARATION_DUTIES
    },
    {
      id: "security-vpc-service-controls-dry-run",
      prompt: "An enterprise is adding existing BigQuery and Cloud Storage projects to a VPC Service Controls perimeter. Unknown production data flows make immediate enforcement too risky, but the security team needs evidence of which requests the proposed policy would deny. What should it do first?",
      answers: [
        { text: "Enforce the perimeter immediately and remove projects whenever an application fails", explanation: "Incorrect. Immediate enforcement can interrupt legitimate flows before the required ingress, egress, and access-level rules are understood." },
        { text: "Create the proposed perimeter in dry run mode, exercise production use cases, analyze policy violation logs, and then enforce the corrected configuration", explanation: "Correct. Dry run mode logs requests that would violate the proposed perimeter without blocking them, allowing the team to refine rules before enforcement." },
        { text: "Enable Data Access audit logs instead of configuring a perimeter", explanation: "Incorrect. Data Access logs improve audit visibility but do not simulate or enforce VPC Service Controls boundaries." },
        { text: "Place the projects in separate folders and assume folder boundaries block data movement", explanation: "Incorrect. Resource hierarchy folders organize governance but do not by themselves create managed-service data perimeters." }
      ],
      correct: 1,
      tags: ["security-compliance", "data-exfiltration", "governance", "advanced"],
      source: S.VPC_SC_DRY_RUN
    },
    {
      id: "security-iam-deny-key-creation-guardrail",
      prompt: "An organization prohibits user-managed service account key creation in every current and future project. Only a central emergency group may create keys. Project owners must not be able to bypass the guardrail by granting themselves another role. Assuming the relevant permissions are supported, which control should be used?",
      answers: [
        { text: "Attach an organization-level IAM deny policy for service account key-creation permissions to all principals, with the emergency group as an exception", explanation: "Correct. Deny policies are inherited and evaluated before allow policies, so conflicting role grants cannot bypass the denied permissions. Exception principals preserve the narrowly approved emergency path." },
        { text: "Remove the Service Account Key Admin role from known users in each project once per quarter", explanation: "Incorrect. Other roles can contain the same permission, new projects and grants can appear between reviews, and project owners could restore access." },
        { text: "Grant the emergency group Organization Administrator and rely on an organization-wide custom allow role for everyone else", explanation: "Incorrect. Allow roles grant permissions but do not create a non-bypassable prohibition against future conflicting grants, and Organization Administrator is unnecessarily broad." },
        { text: "Use an IAM condition on every existing service account that expires non-emergency access", explanation: "Incorrect. Per-resource conditional allow bindings are difficult to apply to future resources and do not override another unconditional allow grant." }
      ],
      correct: 0,
      tags: ["security-compliance", "iam", "governance", "advanced"],
      source: S.IAM_DENY
    },
    {
      id: "security-access-transparency-provider-access",
      prompt: "A regulator requires an audit trail when Google personnel access supported customer data while resolving support cases or outages. The record must include the affected resource and action, access time, business justification or case reference, and information about the accessor. What should the organization enable?",
      answers: [
        { text: "Data Access audit logs, because they identify every action taken by both customer and Google personnel", explanation: "Incorrect. Cloud Audit Logs primarily record actions by principals in the customer's organization. They do not replace the provider-access record requested here." },
        { text: "Access Transparency logs for the supported services", explanation: "Correct. Access Transparency records actions by Google personnel and includes the resource, action, time, reason, and accessor information needed for provider-access auditing." },
        { text: "Access Approval without Access Transparency because approval requests contain a complete log of every completed action", explanation: "Incorrect. Access Approval controls whether certain access can proceed, while Access Transparency records the resulting Google personnel actions. Approval alone is not the requested action-level audit trail." },
        { text: "VPC Flow Logs on every subnet containing a supported service", explanation: "Incorrect. VPC Flow Logs sample network flows for VPC interfaces and do not identify Google personnel actions or support-case justifications inside managed services." }
      ],
      correct: 1,
      tags: ["security-compliance", "audit", "provider-access", "advanced"],
      source: S.ACCESS_TRANSPARENCY
    },
    {
      id: "security-access-context-perimeter-level",
      prompt: "Analysts outside a VPC Service Controls perimeter may access protected BigQuery data only when requests come from approved corporate IP ranges and a fully managed, company-approved device. The context definition should be reusable across perimeter rules. Which design best fits?",
      answers: [
        { text: "Define an Access Context Manager access level with the required IP and device attributes, then reference that level in the perimeter policy", explanation: "Correct. Access Context Manager defines reusable attribute-based access levels, while VPC Service Controls references those levels and enforces access to protected services." },
        { text: "Add the analysts to a BigQuery IAM group because IAM membership also validates network and device posture", explanation: "Incorrect. IAM grants resource permissions but group membership alone does not assert the request IP range and managed-device posture." },
        { text: "Create a Cloud Armor policy for the BigQuery API and match device inventory labels", explanation: "Incorrect. Cloud Armor protects supported load-balanced application endpoints and is not the enforcement layer for BigQuery access inside a service perimeter." },
        { text: "Define the attributes in Access Context Manager and assume it enforces them without any consuming service", explanation: "Incorrect. Access Context Manager defines context and access levels; an enforcement service such as VPC Service Controls must reference them to affect requests." }
      ],
      correct: 0,
      tags: ["security-compliance", "context-aware-access", "vpc-service-controls", "advanced"],
      source: S.ACCESS_CONTEXT_MANAGER
    },
    {
      id: "security-ca-service-external-root",
      prompt: "An enterprise's offline on-premises root certificate authority must remain the trust anchor, and its private key must never enter Google Cloud. Cloud workloads need scalable private certificate issuance without contacting the offline root for every certificate, and existing clients already trust that root. What should the security team deploy?",
      answers: [
        { text: "A new self-signed root CA in Certificate Authority Service and immediate replacement of every client's trust store", explanation: "Incorrect. This abandons the required existing trust anchor and creates a broad trust-store migration." },
        { text: "The existing root private key imported into Cloud KMS so Certificate Authority Service can issue leaf certificates directly", explanation: "Incorrect. Importing or using the root key online violates the requirement that the root private key never enter Google Cloud and remain offline." },
        { text: "A subordinate CA in Certificate Authority Service whose CSR is signed by the external offline root", explanation: "Correct. The external root remains offline and signs only the subordinate CA certificate. The managed subordinate can then issue workload certificates that chain to the root already trusted by clients." },
        { text: "Publicly trusted certificates for every internal workload, issued directly by Certificate Manager", explanation: "Incorrect. Public certificates do not preserve the enterprise's private root as the required trust anchor and may not be suitable for private workload identities." }
      ],
      correct: 2,
      tags: ["security-compliance", "pki", "certificates", "advanced"],
      source: S.CA_SERVICE_EXTERNAL_ROOT
    },
    {
      id: "security-cloud-ekm-external-key-control",
      prompt: "A supported Google Cloud storage service must use an integrated customer-managed encryption key, but policy requires the cryptographic key material to stay in the company's external key manager and never be sent to Google. The business accepts that service reads or writes might fail while the external manager is unavailable. Which design best fits?",
      answers: [
        { text: "Configure Cloud External Key Manager with a key hosted by the approved external key manager", explanation: "Correct. Cloud EKM lets a supported Google Cloud service use an externally managed key whose material remains outside Google. The customer-owned service becomes an availability dependency for cryptographic operations." },
        { text: "Create a Cloud HSM key in the project and grant the security team exclusive key administration", explanation: "Incorrect. Cloud HSM protects key material in a Google Cloud HSM, but the material is not retained in the company's external key manager." },
        { text: "Import the external key material into Cloud KMS and disable automatic rotation", explanation: "Incorrect. Imported key material is managed for use by Cloud KMS and does not satisfy the requirement that the material remain in the external manager and never be sent to Google." },
        { text: "Use customer-supplied encryption keys and have every application submit the key with each storage request", explanation: "Incorrect. Customer-supplied keys require application-managed key delivery and do not provide the integrated Cloud KMS and external-key-manager workflow requested." }
      ],
      correct: 0,
      tags: ["security-compliance", "encryption", "key-management", "advanced"],
      source: S.CLOUD_EKM
    },
    {
      id: "security-google-personnel-approval-and-audit",
      prompt: "For covered, non-auto-approved requests, a regulator requires customers to explicitly authorize Google personnel access to Customer Data. The company must also review records of the actual actions taken after approval. Which control combination meets both requirements?",
      answers: [
        { text: "Enable Access Transparency only and treat each log entry as approval granted before access", explanation: "Incorrect. Access Transparency records provider actions after they occur; it does not require customer approval before covered access." },
        { text: "Enable Access Approval for the supported services and Access Transparency to log Google personnel actions", explanation: "Correct. Access Approval provides a customer authorization gate for covered access requests. Access Transparency records the actions taken by Google personnel, providing the audit trail after access is approved." },
        { text: "Enable Access Approval only and use Cloud Audit Logs to record every Google personnel action", explanation: "Incorrect. Access Approval controls covered access requests, but Cloud Audit Logs are not the provider-action log. Access Transparency is the control for recording Google personnel actions." },
        { text: "Require customer administrators to grant Google support engineers temporary project IAM roles", explanation: "Incorrect. Project IAM grants customer principals access to resources; it is not the managed request-and-approval workflow for Google personnel access to Customer Data." }
      ],
      correct: 1,
      tags: ["security-compliance", "audit", "provider-access", "advanced"],
      source: S.ACCESS_APPROVAL
    },
    {
      id: "security-scc-attack-path-to-high-value-data",
      prompt: "A security team already receives individual vulnerability and misconfiguration findings. Its Security Command Center tier includes attack path simulations. It now needs to prioritize findings by whether an attacker could combine IAM grants, network exposure, and vulnerabilities to reach a designated high-value data store. Which capability should it use?",
      answers: [
        { text: "Security Health Analytics findings sorted only by severity", explanation: "Incorrect. Severity sorting helps prioritize individual posture findings but does not simulate how multiple relationships combine into an attack path to a high-value resource." },
        { text: "Cloud Asset Inventory exports joined to vulnerability scan results in a spreadsheet", explanation: "Incorrect. Asset and vulnerability data can be analyzed manually, but that does not provide SCC's modeled attack paths and exposure scores across resource relationships." },
        { text: "Security Command Center attack path simulations with a defined high-value resource set", explanation: "Correct. Attack path simulations model relationships such as IAM, networking, misconfigurations, and vulnerabilities to show plausible routes to high-value resources and prioritize exposed findings." },
        { text: "IAM Recommender applied to remove every role with broad permissions", explanation: "Incorrect. IAM Recommender identifies certain excessive access grants, but it does not model network exposure and vulnerabilities together as paths to a designated high-value resource." }
      ],
      correct: 2,
      tags: ["security-compliance", "threat-detection", "risk-prioritization", "advanced"],
      source: S.SCC_ATTACK_PATHS
    },
    {
      id: "security-cloud-sql-automatic-iam-db-auth",
      prompt: "A Compute Engine service must connect to Cloud SQL for PostgreSQL without a static database password. Its service account should authenticate as a database user with short-lived, automatically refreshed credentials, while network transport is encrypted. Which setup is appropriate?",
      answers: [
        { text: "Grant Cloud SQL Client to the service account and use that role as the PostgreSQL username and password", explanation: "Incorrect. Cloud SQL Client permits connection through a connector but is not itself a database login identity or a PostgreSQL password." },
        { text: "Create a built-in PostgreSQL user with a long random password in Secret Manager and rely on the Auth Proxy to replace password authentication", explanation: "Incorrect. The Auth Proxy secures and authorizes the connection path, but it does not convert a built-in database username and password into IAM database authentication." },
        { text: "Assign a private IP address to the instance and authorize the VM subnet, without changing database authentication", explanation: "Incorrect. Private IP and network authorization control reachability, but they do not replace the database password with an IAM-authenticated user or automatically refresh login tokens." },
        { text: "Enable IAM database authentication, create the service account as an IAM database user, grant Cloud SQL Client and Cloud SQL Instance User as needed, and connect with automatic IAM authentication through the Cloud SQL Auth Proxy", explanation: "Correct. IAM database authentication uses the workload identity for database login. The proxy supplies and refreshes short-lived tokens and encrypts the connection; Cloud SQL Client authorizes instance connectivity and Instance User supplies the IAM login permission. Database privileges still need to be granted in PostgreSQL." }
      ],
      correct: 3,
      tags: ["security-compliance", "database-security", "iam", "advanced"],
      source: S.CLOUD_SQL_IAM_AUTH
    }
  ];
})();

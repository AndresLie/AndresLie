// Single source of truth for project content.
//
// Strings prefixed with "TODO:" are placeholders — they render as a loud amber
// callout on the detail page so they can't be missed, and are greppable before
// publishing. Replace them with your own words; do not ship them.
//
// Keep the semiconductor project abstracted: describe the shape of the system
// without naming employer-internal services, tools, or customers.

export interface ProjectDecision {
  decision: string;
  why: string;
}

export interface ProjectChallenge {
  challenge: string;
  solution: string;
}

export interface Project {
  /** URL segment: /projects/<slug> */
  slug: string;
  /** Existing home-page anchor id — must stay in sync with the navbar dropdown hrefs. */
  anchorId: string;
  title: string;
  /** One-line pitch shown under the title in the hero. */
  tagline: string;
  role: string;
  period: string;
  teamSize?: string;
  techStack: string[];
  /** Summary bullets shown on the home-page card. */
  cardBullets: string[];
  /** Why the system existed and what constrained it. */
  context: string;
  decisions: ProjectDecision[];
  challenges: ProjectChallenge[];
  links?: { label: string; href: string }[];
}

export const projects: Project[] = [
  {
    slug: "semiconductor-console",
    anchorId: "Semiconductor-Console",
    title: "Virtual Tool Console for Semiconductor Equipment",
    tagline:
      "A high-throughput telemetry platform that streams equipment data into time-series and analytical stores with at-least-once delivery guarantees.",
    role: "Engineer",
    period: "2026 March - 2027 March",
    teamSize: "5-10 people",
    techStack: [
      "Go",
      "Kubernetes",
      "Kafka",
      "IoTDB",
      "StarRocks",
      "Redis",
      "KEDA",
    ],
    cardBullets: [
      "Architected a high-throughput telemetry platform for remote semiconductor equipment, routing XML, JSON, and Protobuf data through Kafka into StarRocks and Apache IoTDB.",
      "Implemented batching, retries, circuit breakers, DLQ replay, and Redis watermarking to guarantee reliable at-least-once data ingestion.",
      "Added production readiness tooling including health checks, KEDA/watermark validation scripts, and recovery runbooks for sink-worker operations.",
    ],
    context:
      "This research project aims to develop a foundational Virtual Tool Console for Semiconductor Equipment by establishing a scalable and low-latency data platform. This platform will serve as the backbone for enabling intelligent remote operations, addressing critical challenges in semiconductor manufacturing data management and operational efficiency.",
    decisions: [
  {
    decision:
      "Two specialized stores: Apache IoTDB for FDC time-series and StarRocks for analytics",
    why:
      "IoTDB efficiently handles high-volume, timestamp-keyed sensor points and hierarchical FDC series. StarRocks provides fast SQL filtering and aggregation for event, alarm, and trend analytics.",
  },
  {
    decision:
      "At-least-once persistence using commit-after-write and Redis durable watermarks",
    why:
      "Kafka offsets are committed only after IoTDB or the DLQ is durable. Replays may produce duplicates, but IoTDB overwrites the same device, measurement, and timestamp. Redis provides a monotonic audit watermark without becoming part of the correctness boundary.",
  },
  {
    decision:
      "KEDA for event-driven autoscaling of sink workers",
    why:
      "CPU does not reliably represent load when workers are blocked on Kafka or IoTDB. KEDA scales using Kafka lag and source-specific workload rates while replica ceilings protect IoTDB with a fixed global write-concurrency budget.",
  },
],

challenges: [
  {
    challenge:
      "Handling three different wire formats: XML, JSON, and Protobuf",
    solution:
      "The gateway preserves each original payload and attaches Kafka headers identifying its source type, format, and schema version. Format-specific decoders validate the data. XML and JSON telemetry are converted into a versioned canonical record, while FDC Protobuf remains native for its specialized evaluator and IoTDB sink. Invalid payloads retain their original bytes in a DLQ.",
  },
  {
    challenge:
      "Guaranteeing no data loss when a downstream sink fails",
    solution:
      "The sink combines bounded batching, backpressure, exponential retries, a circuit breaker, and per-source DLQs. Its checkpoint coordinator commits only the contiguous per-partition prefix already durable in IoTDB or the DLQ. Restarts and rebalances replay uncommitted records instead of losing them.",
  },
  {
    challenge:
      "Knowing whether the pipeline was actually healthy in production",
    solution:
      "Readiness, liveness, Prometheus metrics, and Redis watermarks expose Kafka lag, input rate, IoTDB latency, retries, DLQ traffic, checkpoint progress, and durable offsets. This monitoring exposed a Redis dependency that restarted healthy sinks, leading to fail-open watermark updates with explicit degradation alerts.",
  },
],
  },
  {
  slug: "tsrad",
  anchorId: "TSRAD",
  title: "TSRAD: Time-Series Anomaly Detection System",
  tagline:
    "A replay-safe streaming pipeline that detects rarity and process drift in CNC telemetry without allowing anomalous data to contaminate its normal baseline.",
  role: "System Designer & Engineer",
  period: "July 2026 - Present",
  teamSize: "4 people",
  techStack: [
    "Python",
    "Kafka",
    "PyTorch",
    "CLIP",
    "scikit-learn",
    "NumPy",
    "Pydantic",
    "Docker",
  ],
  cardBullets: [
    "Designed an end-to-end anomaly detection pipeline for identifying unusual vibration patterns, process drift, and potential tool-wear behavior in multichannel CNC telemetry.",
    "Engineered replay-safe ingestion, multi-scale windowing, baseline-isolated scoring, strict data contracts, idempotent processing, and dead-letter handling.",
    "Developed a quarantine-based memory admission policy that prevents unverified live anomalies from being learned as normal behavior.",
  ],
  context:
    "TSRAD analyzes multichannel CNC sensor signals to identify unusual vibration, gradual process drift, and behavior associated with changing tool or machine condition. Fixed thresholds were insufficient because normal behavior varies with the machine, sensor, material, operating mode, and job condition, while many faults appear as changes in signal shape rather than simple amplitude spikes.",

  decisions: [
    {
      decision:
        "Rarity-based detection rather than relying only on a supervised classifier",
      why:
        "Industrial anomaly labels are limited, expensive to obtain, and unlikely to cover every future fault mode. The system therefore compares new windows with an approved bank of normal behavior and treats low-similarity or unusual temporal patterns as advisory anomaly evidence, allowing previously unseen behavior to be surfaced without retraining a fault classifier.",
    },
    {
      decision: "Multi-scale windowing",
      why:
        "Different problems appear over different durations. Short windows capture impacts and sudden vibration changes, medium windows capture repeated instability, and long windows reveal gradual degradation or drift. A single fixed window either missed slow changes or diluted short transient events.",
    },
    {
      decision:
        'A "quarantine" admission gate before samples join the baseline',
      why:
        "Automatically learning from every live sample creates baseline contamination: once a fault is admitted as normal, similar faults become less rare and may stop triggering alerts. TSRAD keeps the approved baseline immutable and admits candidate updates only after quality, identity, drift, holdback, and approval checks.",
    },
    {
      decision: "Strict data contracts enforced with Pydantic",
      why:
        "The contracts reject missing baseline or job identity, malformed timestamps, invalid sequence numbers, inconsistent channel dimensions, and incompatible artifact versions at the system boundary. This prevents routing and scoring errors from appearing later as misleading anomaly results.",
    },
  ],

  challenges: [
    {
      challenge: "Concept drift: normal behavior changes over a machine's life",
      solution:
        "Separated immutable approved baselines from live candidate state. Drift can be measured and proposed as a baseline update, but promotion is namespace-isolated and subject to data-quality, movement, update-rate, holdback, replay-safety, and domain-approval gates. A genuine fault therefore cannot silently redefine normal behavior.",
    },
    {
      challenge: "Making a stateful streaming pipeline safe to replay",
      solution:
        "Used deterministic message and segment identities, idempotency records, partition-scoped state, and commit-after-processing semantics. Results, state changes, and Kafka offsets are coordinated so retries do not create multiple effective decisions, while malformed records are routed to a dead-letter queue instead of corrupting pipeline state.",
    },
    {
      challenge:
        "Preventing different CNC operating conditions from sharing the wrong baseline",
      solution:
        "Partitioned normalizers, rolling windows, and rarity-memory namespaces by machine, sensor, baseline profile, and job condition. This prevents behavior that is normal for one material, tool, or operating mode from incorrectly influencing another and reduces context-driven false positives.",
    },
  ],
},
  {
    slug: "aideal",
    anchorId: "Aideal-Project",
    title: "Aideal: Full-stack Education Platform",
    tagline:
      "A full-stack platform for education services across Taiwan, with an instructor portal and automated pre-class notification scheduling.",
    role: "Full Stack Engineer",
    period: "2025 June - 2026 November",
    teamSize: "8-12 people",
    techStack: [
      "Flutter",
      "Flask",
      "PostGreSQL",
      "Azure Logic Apps",
      "Service Bus",
      "Azure OpenAI",
      "FAISS",
      "Firebase",
    ],
    cardBullets: [
      "Engineered a full-stack platform to facilitate education services across Taiwan.",
      "Architected an automated pre-class notification scheduling utilizing Azure Logic Apps, Azure Service Bus, and Firebase Cloud Messaging (FCM) to deliver daily student reminders.",
      "Developed the instructor portal's UI, RESTful APIs, and data models, enabling end-to-end course management, material uploads, and attendance tracking.",
      "Built secure backend services, including JWT-based automated room code generation for video conferences and centralized push notification dispatching.",
    ],
    context:
      "Used by teachers, education institutions, and students to manage course publishing, enrollment, payments, and Q&A in one system, replacing workflows previously handled through spreadsheets, forms, and messaging apps.",
    decisions: [
  {
    decision:
      "Azure Logic Apps + Service Bus for scheduled notifications rather than an in-app scheduler",
    why:
      "Logic Apps kept clock-driven execution outside the web process, so reminders did not depend on an application instance remaining alive. Service Bus provided durable buffering, retry/backoff, and dead-letter handling while keeping notification scheduling separate from FCM delivery.",
  },
  {
    decision: "JWT-based automated room code generation",
    why:
      "Short-lived, signed management JWTs let the backend authenticate to 100ms without maintaining server-side authentication sessions. The expiry, not-before time, unique token ID, and HS256 signature limited token lifetime and prevented undetected tampering.",
  },
  {
    decision: "Centralized push notification dispatch through FCM",
    why:
      "A shared dispatch path standardized payloads, deep links, message sanitization, token deduplication, multicast fallback, and delivery reporting across every feature. It also allowed invalid device tokens to be removed centrally instead of duplicating fragile cleanup logic in each notification flow.",
  },
],
challenges: [
  {
    challenge: "Delivering daily reminders reliably at the right local time",
    solution:
      "Scheduled times were converted to UTC at the API boundary and translated to Asia/Taipei for display and reminder calculations. Logic Apps called an API-key-protected endpoint, while persisted scheduled, sent, and failed states prevented normal reruns after successful delivery; Service Bus handled transient retries and dead-lettering.",
  },
  {
    challenge: "Securing conference room access without a stateful session store",
    solution:
      "The backend first verified course ownership or student enrollment, then used a short-lived management JWT to request a 100ms room code and persisted the generated code to avoid creating duplicate rooms. This protects code retrieval and management-token integrity, although preventing an authorized user from sharing a room code completely would require per-user meeting tokens or provider-side room locking.",
  },
  {
    challenge:
      "Making large course-material uploads retryable without duplicating courses or losing form progress",
    solution:
      "Course creation used stable client-generated IDs and a staged workflow that preserved the course ID, completed uploads, and form state after partial failures. Retries only repeated failed pricing, material, or review-submission steps, while backend ownership, file validation, and idempotency checks prevented duplicate records.",
  },
],
    links: [
      { label: "App Store", href: "https://apps.apple.com/tw/app/aideal/id6751572279" },
    ],
  },
];

export const getProject = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);

/** Previous/next for footer navigation, wrapping around the list. */
export const getAdjacentProjects = (slug: string) => {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };
  return {
    previous: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
};

/** True for placeholder copy that still needs the user's own words. */
export const isTodo = (value: string) => value.trimStart().startsWith("TODO:");

/** Strips the "TODO:" marker for display inside a callout. */
export const stripTodo = (value: string) =>
  value.trimStart().replace(/^TODO:\s*/, "");

import React from "react";

// Technology-placement map: which library does the work at each pipeline stage.
// Built with HTML rather than SVG (unlike the other diagrams) because it is a
// grid of text — this way it wraps properly and stacks on narrow screens
// instead of forcing a horizontal scroll. Server-safe: no hooks.

const TEAL = "bg-[#135f7d]";
const TEAL_LIGHT = "bg-[#17738f]";
const NAVY = "bg-[#232e5c]";

const STAGES: {
  title: string;
  headerClass: string;
  lines: string[];
  tech: string;
}[] = [
  {
    title: "Sources",
    headerClass: TEAL,
    lines: ["CSV · JSON · Parquet", "Kafka · MQTT"],
    tech: "pandas · pyarrow",
  },
  {
    title: "A1  data processing",
    headerClass: TEAL,
    lines: [
      "validate order and timing",
      "gap fill · outlier marking",
      "windows 32 / 128 / 512",
      "224x224 line plot",
    ],
    tech: "NumPy · SciPy · Pillow",
  },
  {
    title: "A2  feature extraction",
    headerClass: TEAL_LIGHT,
    lines: ["visual embeddings", "dimension 512 or 768"],
    tech: "PyTorch · CLIP encoder",
  },
  {
    title: "A4  detection",
    headerClass: NAVY,
    lines: ["direct semantic branch", "TWRM rarity branch"],
    tech: "NumPy · scikit-learn",
  },
  {
    title: "Outputs",
    headerClass: NAVY,
    lines: ["evidence dashboard"],
    tech: "Jinja2",
  },
];

const TOPICS = ["canonical.v1", "segments.v1", "inference.v1", "results.v1"];

const FOUNDATION = [
  "confluent-kafka · paho-mqtt",
  "SQLite + write-ahead state",
  "/ready · /metrics · alerts",
  "Docker · pytest · mypy · ruff",
];

function StageArrow() {
  return (
    <div
      className="flex items-center justify-center py-1 md:px-1.5 md:py-0"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 rotate-90 text-[#17809f] md:rotate-0"
        fill="currentColor"
      >
        <path d="M8 5l9 7-9 7z" />
      </svg>
    </div>
  );
}

export default function TsradStackDiagram() {
  return (
    <figure className="my-2">
      <div className="rounded-lg border border-neutral-200 bg-white p-5 md:p-6">
        <p className="mb-5 text-xs font-bold uppercase tracking-wider text-[#17738f]">
          End-to-end pipeline
        </p>

        {/* Stages */}
        <div className="flex flex-col md:flex-row md:items-stretch">
          {STAGES.map((stage, index) => (
            <React.Fragment key={stage.title}>
              {index > 0 && <StageArrow />}
              <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div
                  className={`${stage.headerClass} px-3 py-3 text-center text-sm font-bold text-white`}
                >
                  {stage.title}
                </div>
                <div className="flex flex-1 flex-col gap-1.5 px-4 py-4 text-xs leading-snug text-slate-600">
                  {stage.lines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </div>
                <div className="px-3 pb-3">
                  <div className="rounded-md bg-slate-100 px-2 py-2 text-center text-xs font-bold text-[#232e5c]">
                    {stage.tech}
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Transport */}
        <div className="mt-4 rounded-xl bg-[#e8eef7] px-5 py-4">
          <p className="mb-3 text-xs font-bold text-[#232e5c]">
            Kafka transport
          </p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {TOPICS.map((topic) => (
              <div
                key={topic}
                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-center text-xs font-bold text-[#232e5c]"
              >
                {topic}
              </div>
            ))}
          </div>
        </div>

        {/* Contracts / foundation */}
        <div className="mt-4 rounded-xl bg-[#232e5c] px-5 py-4">
          <p className="mb-3 text-sm font-bold text-white">
            Pydantic validates every boundary — versioned, immutable, fail-closed
            contracts
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
            {FOUNDATION.map((item) => (
              <div
                key={item}
                className="rounded-md bg-[#333f75] px-3 py-2.5 text-center text-xs text-slate-100"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-sm text-neutral-500">
        Where each technology sits: sources feed windowing and plotting, a CLIP
        encoder turns segments into embeddings, and detection runs a semantic
        branch alongside the TWRM rarity branch. Every stage hands off over a
        versioned Kafka topic, and Pydantic validates each boundary.
      </figcaption>
    </figure>
  );
}

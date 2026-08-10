import BulletProjectCard from "@/components/ui/projectsCard/bullet-project-card";
import React from "react";

export default function Projects() {
  return (
    <div className="w-full px-4 md:px-10">
      <div className="flex flex-col items-center max-w-7xl mx-auto mb-12 gap-8">
        <h1 className="mb-10 text-3xl ">My Projects</h1>
        <BulletProjectCard
          id="Semiconductor-Console"
          title="Virtual Tool Console for Semiconductor Equipment"
          techStack={[
            "Go",
            "Kubernetes",
            "Kafka",
            "IoTDB",
            "StarRocks",
            "Redis",
            "KEDA",
          ]}
          bullets={[
            "Architected a high-throughput telemetry platform for remote semiconductor equipment, routing XML, JSON, and Protobuf data through Kafka into StarRocks and Apache IoTDB.",
            "Implemented batching, retries, circuit breakers, DLQ replay, and Redis watermarking to guarantee reliable at-least-once data ingestion.",
            "Added production readiness tooling including health checks, KEDA/watermark validation scripts, and recovery runbooks for sink-worker operations.",
          ]}
        />
        <BulletProjectCard
          id="TSRAD"
          title="TSRAD: Time-Series Anomaly Detection System"
          techStack={["Python", "Kafka", "Pydantic", "Docker"]}
          bullets={[
            "Designed an end-to-end anomaly detection pipeline using Python and Docker to identify rarity-based outliers in CNC machine time-series data.",
            "Engineered multi-scale windowing and drift-aware baseline management, implementing strict data contracts and replay-safe streaming architecture with dead-letter queues.",
            'Developed a "quarantine" memory admission system to prevent data contamination, ensuring only trusted historical samples inform the model\'s normal-state baseline.',
          ]}
        />
        <BulletProjectCard
          id="Aideal-Project"
          title="Aideal: Full-stack Education Platform"
          techStack={[
            "Flutter",
            "Flask",
            "PostGreSQL",
            "Azure Logic Apps",
            "Firebase",
          ]}
          bullets={[
            "Engineered a full-stack platform to facilitate education services across Taiwan.",
            "Architected an automated pre-class notification scheduling utilizing Azure Logic Apps, Azure Service Bus, and Firebase Cloud Messaging (FCM) to deliver daily student reminders.",
            "Developed the instructor portal's UI, RESTful APIs, and data models, enabling end-to-end course management, material uploads, and attendance tracking.",
            "Built secure backend services, including JWT-based automated room code generation for video conferences and centralized push notification dispatching.",
          ]}
        />
      </div>
    </div>
  );
}

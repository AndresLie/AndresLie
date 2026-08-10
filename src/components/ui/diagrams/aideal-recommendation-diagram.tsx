import React from "react";
import { Arrow, Box, Bus, DiagramFrame, ElbowArrow } from "./diagram-primitives";

/**
 * Smart course recommendation, up to the point where the shortlist is chosen.
 * Two scoring branches run in parallel off the same loaded data — a semantic
 * branch (embeddings → cache → FAISS) and a structured branch (rule-based
 * preference matching) — then merge into one weighted ranking.
 *
 * Delivery is deliberately out of scope: the notification diagram already
 * covers how a push actually reaches a device.
 *
 * Laid out top-down rather than left-to-right because the chain is ~11 stages
 * deep, which would need a very wide horizontal scroll, whereas a page scrolls
 * vertically for free.
 */
export default function AidealRecommendationDiagram() {
  return (
    <DiagramFrame
      viewBox="0 0 960 1020"
      minWidth={880}
      caption="Approving a course enqueues a durable job. It loads the course and each student's preferences, then scores candidates two ways in parallel: semantic similarity via Azure OpenAI embeddings (cached, searched with FAISS) and structured preference matching. The two merge into a weighted ranking — 55% semantic, 45% constraints, up to 10% behavior bonus — before an adaptive threshold picks the top K."
    >
      <Box x={330} y={20} w={280} h={48} label="Admin approves course" />
      <Arrow from={[470, 68]} to={[470, 96]} />
      <Box
        x={310}
        y={96}
        w={320}
        h={48}
        label="Create durable recommendation job"
        tone="accent"
      />
      <Arrow from={[470, 144]} to={[470, 172]} />
      <Box
        x={310}
        y={172}
        w={320}
        h={48}
        label="Logic Apps triggers job runner"
        tone="accent"
      />

      {/* Load inputs */}
      <Arrow from={[410, 220]} to={[280, 252]} />
      <Box x={120} y={252} w={250} h={52} label="Load approved course" />
      <Arrow from={[530, 220]} to={[620, 252]} />
      <Box
        x={430}
        y={252}
        w={250}
        h={64}
        label="Load student preferences"
        sublabel="and recent behavior"
      />

      {/* Semantic branch */}
      <Arrow from={[245, 304]} to={[245, 356]} />
      <Box
        x={120}
        y={356}
        w={250}
        h={52}
        label="Build course semantic text"
        tone="accent"
      />
      <Arrow from={[555, 316]} to={[555, 356]} />
      <Box
        x={430}
        y={356}
        w={250}
        h={52}
        label="Build student semantic text"
        tone="accent"
      />

      <Arrow from={[245, 408]} to={[320, 470]} />
      <Arrow from={[555, 408]} to={[500, 470]} />
      <Box
        x={250}
        y={470}
        w={340}
        h={56}
        label="Azure OpenAI"
        sublabel="generate embeddings"
        tone="accent"
      />
      <Arrow from={[420, 526]} to={[420, 566]} />
      <Box
        x={270}
        y={566}
        w={300}
        h={52}
        label="Persistent embedding cache"
        tone="store"
      />
      <Arrow from={[420, 618]} to={[420, 658]} />
      <Box
        x={250}
        y={658}
        w={340}
        h={52}
        label="FAISS cosine-similarity search"
        tone="accent"
      />

      {/* Structured branch — bypasses the embedding pipeline entirely.
          Routed down out of the course box, across the gap between the two
          rows, then down into the matcher; a straight diagonal would cut
          through the student-preferences and semantic-text boxes. */}
      <ElbowArrow
        from={[300, 304]}
        to={[837, 340]}
        axis="vhv"
        midY={332}
      />
      <Arrow from={[680, 290]} to={[722, 366]} />
      <Bus
        x={725}
        y={340}
        w={225}
        h={92}
        title="Structured matching"
        lines={["subject · budget · mode", "schedule · teacher traits"]}
      />
      <ElbowArrow from={[837, 432]} to={[592, 780]} axis="vh" />

      {/* Merge and weight */}
      <Arrow from={[420, 710]} to={[420, 754]} />
      <Box
        x={250}
        y={754}
        w={340}
        h={52}
        label="Weighted hybrid ranking"
        tone="accent"
      />

      <Arrow from={[330, 806]} to={[230, 850]} />
      <Box
        x={60}
        y={850}
        w={250}
        h={52}
        label="55%"
        sublabel="semantic similarity"
      />
      <Arrow from={[420, 806]} to={[450, 850]} />
      <Box
        x={340}
        y={850}
        w={250}
        h={52}
        label="45%"
        sublabel="preference constraints"
      />
      <Arrow from={[510, 806]} to={[700, 850]} />
      <Box
        x={620}
        y={850}
        w={280}
        h={52}
        label="up to 10%"
        sublabel="behavior bonus"
      />

      <Arrow from={[200, 902]} to={[340, 946]} />
      <Arrow from={[465, 902]} to={[455, 946]} />
      <Arrow from={[740, 902]} to={[580, 946]} />
      <Box
        x={280}
        y={946}
        w={340}
        h={64}
        label="Adaptive threshold"
        sublabel="and Top-K selection"
        tone="accent"
      />

    </DiagramFrame>
  );
}

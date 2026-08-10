import React from "react";
import { Arrow, Box, DiagramFrame } from "./diagram-primitives";

/**
 * The sink worker's commit ordering, which is what makes delivery at-least-once:
 * write first, persist the durable watermark, and only then commit the Kafka
 * offset. A crash between any two steps replays rather than loses data.
 * KEDA sits outside that sequence, scaling workers on consumer lag.
 *
 * Laid out so every labelled arrow is axis-aligned — on a diagonal, a long
 * label always ends up crossing its own line.
 */
export default function SinkCommitPathDiagram() {
  return (
    <DiagramFrame
      viewBox="0 0 880 400"
      minWidth={800}
      caption="Ordering is the guarantee: IoTDB write, then durable Redis watermark, then Kafka offset commit. Crashing between steps replays records instead of dropping them. KEDA scales the worker pool on consumer lag, independently of the commit path."
    >
      <Box x={30} y={150} w={150} h={64} label="Kafka" tone="accent" />

      <Arrow from={[180, 168]} to={[320, 168]} label="records" />
      <Arrow from={[320, 196]} to={[182, 196]} label="3. commit offset" />

      <Box
        x={320}
        y={150}
        w={180}
        h={64}
        label="Sink worker"
        sublabel="batch · retry · breaker"
        tone="accent"
      />

      <Arrow from={[500, 168]} to={[680, 168]} label="1. write" />
      <Arrow from={[680, 196]} to={[502, 196]} label="write OK" dashed />
      <Box
        x={680}
        y={150}
        w={170}
        h={64}
        label="IoTDB"
        sublabel="time-series"
        tone="store"
      />

      <Arrow from={[410, 214]} to={[410, 290]} label="2. save durable offset" />
      <Box
        x={320}
        y={290}
        w={180}
        h={58}
        label="Redis"
        sublabel="watermark"
        tone="store"
      />

      <Arrow from={[105, 214]} to={[105, 290]} label="lag / load" dashed />
      <Box x={30} y={290} w={150} h={58} label="KEDA" tone="warn" />
      <Arrow from={[180, 315]} to={[350, 216]} label="scale pods" dashed />
    </DiagramFrame>
  );
}

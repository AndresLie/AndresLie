import React from "react";
import { Arrow, Box, DiagramFrame, GroupOutline } from "./diagram-primitives";

/**
 * The interesting shape here is the feedback loop: scored samples only rejoin
 * the baseline after passing the quarantine gate, which is what stops anomalies
 * from teaching the model that they are normal.
 */
export default function TsradDiagram() {
  return (
    <DiagramFrame
      viewBox="0 0 960 380"
      minWidth={840}
      caption="CNC telemetry is validated against strict contracts, split into multi-scale windows, and scored for rarity. Only samples that clear the quarantine gate are admitted to the drift-aware baseline."
    >
      <Box x={20} y={60} w={150} h={56} label="CNC Machine" sublabel="sensor time-series" />
      <Arrow from={[170, 88]} to={[215, 88]} />

      <Box x={215} y={60} w={150} h={56} label="Kafka" sublabel="replay-safe stream" tone="accent" />
      <Arrow from={[365, 88]} to={[410, 88]} />

      <Box x={410} y={60} w={160} h={56} label="Contract check" sublabel="Pydantic schema" tone="accent" />
      <Arrow from={[490, 116]} to={[490, 185]} label="invalid" dashed />
      <Box x={410} y={185} w={160} h={52} label="Dead-letter queue" sublabel="rejected payloads" tone="warn" />

      <GroupOutline x={600} y={25} w={180} h={320} label="Detection" />
      <Arrow from={[570, 88]} to={[615, 84]} />
      <Box x={615} y={55} w={150} h={52} label="Multi-scale" sublabel="windowing" tone="accent" />
      <Arrow from={[690, 107]} to={[690, 155]} />
      <Box x={615} y={155} w={150} h={52} label="Rarity scoring" tone="accent" />
      <Arrow from={[690, 207]} to={[690, 265]} />
      <Box x={615} y={265} w={150} h={48} label="Quarantine gate" tone="warn" />

      <Arrow from={[765, 168]} to={[830, 95]} />
      <Box x={830} y={55} w={110} h={52} label="Anomaly" sublabel="alert" tone="warn" />

      <Arrow from={[765, 285]} to={[880, 207]} label="admit if trusted" />
      <Box x={830} y={155} w={110} h={52} label="Baseline" sublabel="drift-aware" tone="store" />
      <Arrow from={[830, 175]} to={[765, 175]} label="compare" dashed />
    </DiagramFrame>
  );
}

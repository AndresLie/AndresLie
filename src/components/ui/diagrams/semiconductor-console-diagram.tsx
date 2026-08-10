import React from "react";
import {
  Arrow,
  Box,
  Bus,
  DiagramFrame,
  NoteText,
  Panel,
} from "./diagram-primitives";

/**
 * Full topology. Two things worth reading off this diagram:
 *  - the normalizer consumes from Kafka and writes back to Kafka, so
 *    machine.normalized is a Kafka topic rather than a worker output;
 *  - StarRocks pulls machine.normalized itself via routine load, so there is
 *    no sink worker on the analytics path at all.
 */
export default function SemiconductorConsoleDiagram() {
  return (
    <DiagramFrame
      viewBox="0 0 1000 735"
      minWidth={920}
      caption="Equipment streams into live-gateway over gRPC, then everything moves through Kafka. The normalizer writes back to Kafka; sink workers push FDC traces to IoTDB; evaluators drive real-time alerts to the console. StarRocks pulls machine.normalized directly via routine load, with no worker in between."
    >
      <Box
        x={390}
        y={16}
        w={230}
        h={54}
        label="Equipment / simulators"
        sublabel="outside the cluster"
      />
      <Arrow
        from={[505, 70]}
        to={[505, 104]}
        label="XML / JSON / Protobuf"
      />
      <Box
        x={390}
        y={104}
        w={230}
        h={54}
        label="live-gateway"
        sublabel="gRPC ingest · mTLS"
        tone="accent"
      />
      <Arrow from={[505, 158]} to={[505, 188]} />

      <Bus
        x={30}
        y={188}
        w={940}
        h={78}
        title="KAFKA"
        lines={[
          "general_raw · fdc.context.raw · fdc.uchart.raw · fdc.tchart.raw",
          "machine.normalized · user.alert.hit · one .dlq per topic",
        ]}
      />

      {/* Consumers */}
      <Arrow from={[240, 266]} to={[240, 340]} />
      <Box
        x={150}
        y={340}
        w={180}
        h={68}
        label="live-normalizer"
        sublabel="general_raw → normalized"
        tone="accent"
      />
      <Arrow from={[335, 355]} to={[400, 268]} label="writes back" />

      <Arrow from={[520, 266]} to={[520, 340]} />
      <Box
        x={430}
        y={340}
        w={180}
        h={68}
        label="3 sink workers"
        sublabel="1 per FDC topic"
        tone="accent"
      />

      <Arrow from={[780, 266]} to={[780, 340]} />
      <Box
        x={690}
        y={340}
        w={180}
        h={68}
        label="4 evaluators"
        sublabel="alert rules"
        tone="accent"
      />

      {/* StarRocks pulls straight from Kafka — no worker on this path. */}
      <Arrow from={[75, 266]} to={[75, 470]} />
      <NoteText
        x={215}
        y={436}
        lines={[
          "StarRocks reads machine.normalized straight",
          "from Kafka — routine load, no worker (pull)",
        ]}
      />

      {/* Stores and clients */}
      <Box
        x={30}
        y={470}
        w={180}
        h={68}
        label="StarRocks"
        sublabel="SQL analytics · events/status"
        tone="store"
      />
      <Arrow from={[520, 408]} to={[520, 470]} />
      <Box
        x={430}
        y={470}
        w={180}
        h={68}
        label="IoTDB"
        sublabel="FDC traces · time-series"
        tone="store"
      />
      <Arrow from={[780, 408]} to={[780, 470]} />
      <Box
        x={690}
        y={470}
        w={180}
        h={68}
        label="Browser / console"
        sublabel="via router + NATS"
      />

      {/* Path annotations */}
      <line x1={30} y1={558} x2={610} y2={558} stroke="#cbd5e1" strokeWidth={1} />
      <text x={320} y={576} textAnchor="middle" fontSize={11} fill="#64748b">
        storage path
      </text>
      <line x1={690} y1={558} x2={870} y2={558} stroke="#cbd5e1" strokeWidth={1} />
      <text x={780} y={576} textAnchor="middle" fontSize={11} fill="#64748b">
        real-time alert path
      </text>

      <Panel
        x={30}
        y={598}
        w={940}
        title="SUPPORTING (not on the data path)"
        nameColumnWidth={95}
        rows={[
          {
            name: "Redis",
            desc: "watermark on the sink commit path + WS control plane",
          },
          {
            name: "KEDA",
            desc: "per-topic Kafka-lag autoscaling of the sink workers",
          },
          {
            name: "Prometheus",
            desc: "fdc_slo:* recording rules → per-source alerts → runbooks",
          },
          { name: "live-query", desc: "read API over IoTDB / StarRocks" },
        ]}
      />
    </DiagramFrame>
  );
}

import React from "react";
import { Arrow, Box, DiagramFrame, GroupOutline } from "./diagram-primitives";

// Palette matches the source spec's classDefs.
const ENDPOINT = { fill: "#f0f0f0", stroke: "#808080" };
const TRIGGER = { fill: "#fff9c4", stroke: "#fbc02d" };
const PROCESS = { fill: "#e8f5e9", stroke: "#1b5e20" };
const EXTERNAL = { fill: "#f3e5f5", stroke: "#4a148c" };
const LOGICAL = { fill: "#e0f7fa", stroke: "#01579b" };

/**
 * How a daily reminder actually gets delivered. The reason this is two Logic
 * Apps rather than one: the first only computes *when* each notification should
 * fire and hands that to Service Bus as a scheduled message. Service Bus holds
 * it until the due time and then triggers the second app. Nothing has to sit in
 * a loop waiting, and the schedule survives a restart.
 */
export default function AidealNotificationDiagram() {
  return (
    <DiagramFrame
      viewBox="0 0 960 700"
      minWidth={860}
      caption="A nightly trigger builds the day's schedule: Logic App 1 fetches the course list, subtracts the lead time, and enqueues one scheduled message per course. Service Bus holds each message until it is due, then triggers Logic App 2, which calls the backend to send that course's notification."
    >
      <Box
        x={170}
        y={16}
        w={140}
        h={40}
        label="START"
        fill={ENDPOINT.fill}
        stroke={ENDPOINT.stroke}
        rx={20}
      />
      <Arrow from={[240, 56]} to={[240, 82]} />
      <Box
        x={100}
        y={82}
        w={280}
        h={48}
        label="Every day at 12:01 AM"
        fill={TRIGGER.fill}
        stroke={TRIGGER.stroke}
      />
      <Arrow from={[240, 130]} to={[240, 174]} label="initiate" />

      {/* Logic App 1 */}
      <GroupOutline
        x={70}
        y={142}
        w={340}
        h={290}
        label="Logic App 1 · schedule creator"
        fill={LOGICAL.fill}
        stroke={LOGICAL.stroke}
        dashed={false}
        labelColor={LOGICAL.stroke}
      />
      <Box
        x={100}
        y={174}
        w={280}
        h={58}
        label="Call backend API"
        sublabel="get today's course list"
        fill={PROCESS.fill}
        stroke={PROCESS.stroke}
      />
      <Arrow from={[240, 232]} to={[240, 262]} />
      <Box
        x={100}
        y={262}
        w={280}
        h={62}
        label="Calculate scheduled time"
        sublabel="course time − 10 min"
        fill={PROCESS.fill}
        stroke={PROCESS.stroke}
      />
      <Arrow from={[240, 324]} to={[240, 354]} />
      <Box
        x={100}
        y={354}
        w={280}
        h={58}
        label="Send message to Service Bus"
        fill={PROCESS.fill}
        stroke={PROCESS.stroke}
      />

      {/* Backend API, called by Logic App 1 */}
      <Arrow from={[380, 188]} to={[618, 188]} label="request" />
      <Arrow from={[618, 220]} to={[382, 220]} label="course IDs + times" />
      <Box
        x={620}
        y={166}
        w={280}
        h={70}
        label="Backend API"
        fill={EXTERNAL.fill}
        stroke={EXTERNAL.stroke}
      />

      {/* Service Bus */}
      <Arrow
        from={[380, 383]}
        to={[618, 383]}
        label="course ID + scheduled time"
      />
      <Box
        x={620}
        y={348}
        w={280}
        h={72}
        label="Azure Service Bus"
        sublabel="schedule queue"
        fill={EXTERNAL.fill}
        stroke={EXTERNAL.stroke}
      />

      {/* Logic App 2 */}
      <Arrow from={[700, 420]} to={[390, 512]} label="scheduled dequeue" />
      <GroupOutline
        x={70}
        y={470}
        w={340}
        h={112}
        label="Logic App 2 · notification listener"
        fill={LOGICAL.fill}
        stroke={LOGICAL.stroke}
        dashed={false}
        labelColor={LOGICAL.stroke}
      />
      <Box
        x={100}
        y={502}
        w={280}
        h={58}
        label="Send notification request"
        sublabel="to backend API"
        fill={PROCESS.fill}
        stroke={PROCESS.stroke}
      />

      {/* Backend API, called by Logic App 2 */}
      <Arrow from={[380, 531]} to={[618, 531]} label="course ID" />
      <Box
        x={620}
        y={500}
        w={280}
        h={62}
        label="Backend API"
        sublabel="dispatch notification"
        fill={EXTERNAL.fill}
        stroke={EXTERNAL.stroke}
      />
      <Arrow from={[760, 562]} to={[760, 616]} />
      <Box
        x={690}
        y={616}
        w={140}
        h={40}
        label="END"
        fill={ENDPOINT.fill}
        stroke={ENDPOINT.stroke}
        rx={20}
      />
    </DiagramFrame>
  );
}

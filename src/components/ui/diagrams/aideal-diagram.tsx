import React from "react";
import { Arrow, Box, DiagramFrame, GroupOutline } from "./diagram-primitives";

/**
 * Platform topology. Flask sits in the middle of everything: it authenticates
 * against Firebase, owns PostgreSQL and Blob Storage, and fans out to the Azure
 * and third-party services. The scheduled path is the one that does not start
 * with a user request — Logic Apps triggers Service Bus, which calls internal
 * job endpoints.
 */
export default function AidealDiagram() {
  return (
    <DiagramFrame
      viewBox="0 0 1140 620"
      minWidth={1000}
      caption="Flutter clients authenticate with Firebase and call the Flask API, which owns PostgreSQL and Blob Storage and fans out to Azure and third-party services. Scheduled work arrives the other way: Logic Apps triggers Service Bus, which drives internal job endpoints. Push notifications reach both client apps via FCM."
    >
      <Box
        x={340}
        y={16}
        w={340}
        h={50}
        label="Students · Teachers · Institutions"
      />

      {/* Clients */}
      <GroupOutline x={290} y={92} w={440} h={112} label="Client applications" />
      <Arrow from={[470, 66]} to={[410, 120]} />
      <Arrow from={[550, 66]} to={[610, 120]} />
      <Box
        x={310}
        y={122}
        w={190}
        h={58}
        label="Mobile app"
        sublabel="Flutter"
        tone="accent"
      />
      <Box
        x={520}
        y={122}
        w={190}
        h={58}
        label="Web portal"
        sublabel="Flutter"
        tone="accent"
      />

      {/* Backend */}
      <GroupOutline x={250} y={268} w={550} h={112} label="Backend platform" />
      {/* Both edges are labelled, staggered along their lines so the two
          identical labels don't run into each other. */}
      <Arrow
        from={[410, 180]}
        to={[490, 298]}
        label="REST + Firebase token"
        labelAt={0.36}
      />
      <Arrow
        from={[610, 180]}
        to={[560, 298]}
        label="REST + Firebase token"
        labelAt={0.7}
      />
      <Box
        x={268}
        y={300}
        w={140}
        h={58}
        label="Job endpoints"
        sublabel="internal"
        tone="accent"
      />
      <Arrow from={[408, 329]} to={[432, 329]} />
      <Box
        x={436}
        y={300}
        w={170}
        h={58}
        label="Flask REST API"
        sublabel="Python"
        tone="accent"
      />
      <Arrow from={[606, 329]} to={[648, 329]} bidirectional />
      <Box
        x={650}
        y={300}
        w={130}
        h={58}
        label="PostgreSQL"
        tone="store"
      />

      {/* Firebase */}
      <GroupOutline x={830} y={110} w={280} h={180} label="Firebase" />
      <Arrow from={[595, 298]} to={[848, 172]} />
      <Box
        x={850}
        y={142}
        w={240}
        h={54}
        label="Authentication"
        tone="accent"
      />
      <Arrow from={[600, 298]} to={[848, 245]} />
      <Box
        x={850}
        y={218}
        w={240}
        h={54}
        label="Cloud Messaging"
        sublabel="FCM"
        tone="accent"
      />
      <Arrow from={[848, 228]} to={[734, 196]} label="push" />

      {/* Azure */}
      <GroupOutline x={30} y={462} w={710} h={128} label="Azure services" />
      <Box x={48} y={478} w={115} h={56} label="Logic Apps" tone="accent" />
      <Arrow from={[163, 506]} to={[196, 506]} />
      <Box x={200} y={478} w={115} h={56} label="Service Bus" tone="accent" />
      <Arrow from={[255, 478]} to={[330, 360]} label="scheduled jobs" />
      <Box x={360} y={478} w={115} h={56} label="Blob Storage" tone="store" />
      <Arrow from={[480, 358]} to={[440, 478]} bidirectional />
      <Box
        x={490}
        y={478}
        w={110}
        h={56}
        label="Email"
        sublabel="Comm. Services"
        tone="accent"
      />
      <Arrow from={[535, 358]} to={[545, 478]} />
      <Box x={612} y={478} w={118} h={56} label="Azure OpenAI" tone="accent" />
      <Arrow from={[575, 358]} to={[660, 478]} />

      {/* External */}
      <GroupOutline
        x={820}
        y={425}
        w={290}
        h={165}
        label="External integrations"
      />
      <Arrow from={[606, 330]} to={[836, 462]} label="JWT-authenticated" />
      <Box
        x={838}
        y={455}
        w={250}
        h={52}
        label="100ms"
        sublabel="video conferencing"
      />
      <Arrow from={[600, 358]} to={[836, 528]} bidirectional />
      <Box
        x={838}
        y={520}
        w={250}
        h={52}
        label="NewebPay"
        sublabel="e-invoice"
      />
    </DiagramFrame>
  );
}

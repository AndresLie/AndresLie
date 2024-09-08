"use client";
import React from "react";
import { Timeline, Text } from "@mantine/core";
import { Icon } from "@iconify/react";

export default function Experience() {
  return (
    <div className=" h-[80vh] md:h-[80vh] flex flex-col items-center w-full">
      <h1 className="mb-28 text-3xl">My Experience</h1>
      <Timeline active={1} bulletSize={50} lineWidth={9}>
        <Timeline.Item
          bullet={<Icon icon="line-md:briefcase-filled" />}
          title="NCKU Mi2S Lab Assistant"
        >
          <Text c="dimmed" size="lg">
            Developed and Maintained Kasih, a cross lingual mobile application{" "}
            <br></br> intended to assist foreign caretaker and worker in Taiwan
          </Text>
          <Text>
            <span className="inline-flex items-center">
              Technology Used:
              <Icon icon="logos:flutter" width="40" height="40" />
              <Icon icon="file-icons:flask" width="40" height="40" />
              <Icon icon="logos:gitlab" width="40" height="40" />
            </span>
          </Text>
          <Text size="sm" mt={4}>
            2024-Present
          </Text>
        </Timeline.Item>
      </Timeline>
    </div>
  );
}


"use client"
import React from 'react'
import { Timeline, Text } from '@mantine/core';
import { IconBriefcase2} from '@tabler/icons-react';
export default function Experience() {
    

    return (
        <div className=' h-[80vh] md:h-[105vh] flex flex-col items-center    '>
            <h1 className='mb-10 text-3xl'>My Experience</h1>
            <Timeline active={1} bulletSize={50} lineWidth={9} >
                <Timeline.Item bullet={<IconBriefcase2 size={20} />} title="NCKU Mi2S Lab Assistant">
                    <Text c="dimmed" size="lg">Developed and Maintained Kasih, a cross lingual mobile application <br></br> intended to assist foreign caretaker and worker in Taiwan</Text>
                    <Text size="sm" mt={4}>2024-Present</Text>
                </Timeline.Item>
            </Timeline>
        </div>
      );
}

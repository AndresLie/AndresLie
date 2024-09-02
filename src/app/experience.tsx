
"use client"
import React from 'react'
import { Timeline, Text } from '@mantine/core';
import { IconBriefcase2} from '@tabler/icons-react';
import { SiFlutter,SiFlask } from 'react-icons/si';
import { FiGitlab } from 'react-icons/fi';
export default function Experience() {
    

    return (
        <div className=' h-[80vh] md:h-[110vh] flex flex-col items-center mt-16 w-full'>
            <h1 className='mb-28 text-3xl'>My Experience</h1>
            <Timeline active={1} bulletSize={50} lineWidth={9} >
                <Timeline.Item bullet={<IconBriefcase2 size={20} />} title="NCKU Mi2S Lab Assistant">
                    <Text c="dimmed" size="lg">Developed and Maintained Kasih, a cross lingual mobile application <br></br> intended to assist foreign caretaker and worker in Taiwan</Text>
                    <Text><span className="inline-flex items-center">
                        Technology Used: 
                        <SiFlutter size={30} color="#2491ff" className="ml-2" />
                        <SiFlask size={30} color="#000000" className="ml-2"/>
                        <FiGitlab size={30} color="#FC6D26" className="ml-2"/>
                        </span></Text>
                    <Text size="sm" mt={4}>2024-Present</Text>
                </Timeline.Item>
            </Timeline>
        </div>
      );
}

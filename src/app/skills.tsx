import React from 'react'
import { Icon } from '@iconify/react';
import SkillCard from '@/components/ui/skill_card';
import SkillContainer from '@/components/ui/skill-container';

export default function Skills() {
    return (
        <div className='space-y-8 flex flex-col  ml-[4vw] mr-[4vw] md:ml-[10vw] md:mr-[10vw] mb-32'>
            
            <h1 className='text-3xl mb-20 self-center'>My Skills</h1>
            <SkillContainer title='Frontend Development' id='Frontend'>
                <SkillCard desc="HTML">
                    <Icon icon="devicon:html5" width="100" height="100" />
                </SkillCard>
                <SkillCard desc="CSS">
                    <Icon icon="devicon:css3" width="100" height="100" />
                </SkillCard>
                <SkillCard desc="JavaScript">
                    <Icon icon="logos:javascript" width="100" height="100" />
                </SkillCard>
                <SkillCard desc="TypeScript">
                    <Icon icon="logos:typescript-icon" width="100" height="100" />
                </SkillCard>
                <SkillCard desc="React">
                    <Icon icon="logos:react" width="100" height="100" />
                </SkillCard>
                <SkillCard desc="Tailwind CSS">
                    <Icon icon="devicon:tailwindcss" width="100" height="100" />
                </SkillCard> 
            </SkillContainer>    
            <SkillContainer title='Backend Development' id='Backend'>
                        <SkillCard desc="Python">
                            <Icon icon="logos:python" width="100" height="100" />
                        </SkillCard>
                        {/* <SkillCard desc="C#">
                            <Icon icon="devicon:csharp" width="100" height="100" />
                        </SkillCard> */}
                        <SkillCard desc="Flask">
                            <Icon icon="file-icons:flask" width="100" height="100" />
                        </SkillCard>
                        {/* <SkillCard desc="ASP.NET Core">
                            <Icon icon="devicon:dotnetcore" width="100" height="100" />
                        </SkillCard> */}
            </SkillContainer>

            <SkillContainer title='Mobile App Development' id='Mobile'>
                        <SkillCard desc="React Native">
                            <Icon icon="tabler:brand-react-native" width="100" height="100" color='#61DAFB'/>
                        </SkillCard>
                        <SkillCard desc="Flutter">
                            <Icon icon="logos:flutter" width="100" height="100" />
                        </SkillCard>
                        {/* <SkillCard desc="Kotlin">
                            <Icon icon="logos:kotlin-icon" width="100" height="100" />
                        </SkillCard> */}
            </SkillContainer>

            <SkillContainer title='Other Technologies' id='Others'>
                        <SkillCard desc="Git">
                            <Icon icon="devicon:git" width="100" height="100" color='#61DAFB'/>
                        </SkillCard>
                        <SkillCard desc="Mongo DB">
                            <Icon icon="vscode-icons:file-type-mongo" width="100" height="100" />
                        </SkillCard>
                        <SkillCard desc="PyTorch">
                            <Icon icon="devicon:pytorch" width="100" height="100" />
                        </SkillCard>
                        <SkillCard desc="Google Colab">
                            <Icon icon="devicon:googlecolab" width="100" height="100" />
                        </SkillCard>
            </SkillContainer>

        </div>
    );
  }

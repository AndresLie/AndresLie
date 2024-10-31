import ImageHalf from "@/components/ui/projectsCard/imageHalf";
import ProjectCard from "@/components/ui/projectsCard/project-card";
import TextHalf from "@/components/ui/projectsCard/textHalf";
import React from "react";
import { Icon } from "@iconify/react";
export default function Projects() {
  return (
    <div className="flex flex-col items-center mb-32 justify-around w-full">
      <h1 className="mb-10 text-3xl ">My Projects</h1>
      <ProjectCard id="Music-Player">
        <TextHalf
          title="Multi-Lingual Mobile Music Player"
          description="A Music player which focus on multi-lingual(English, Chinese, Indonesian) feature with included Music Player, 
                    Music Detector(Shazam), Speech-to-text(台語 included), Personal Playlist(CRUD capabilities), Playing Queue. This Project
                    utilize React Native(Expo Framework) for its Frontend, Flask for Backend and MongoDB for its database"
          demo="https://drive.google.com/file/d/1FYx2QTh-rHPETgsCMaUu0FJMrq6HJT6R/view?usp=sharing"
          github="https://github.com/AndresLie/React-Native-Music-Player"
        >
          <Icon
            icon="tabler:brand-react-native"
            width="55"
            height="55"
            color="#61DAFB"
          />
          <Icon icon="skill-icons:javascript" width="55" height="55" />
          <Icon icon="file-icons:flask" width="55" height="55" />
          <Icon icon="logos:python" width="55" height="55" />
          <Icon icon="vscode-icons:file-type-mongo" width="55" height="55" />
          <Icon icon="cib:expo" width="55" height="55" />
        </TextHalf>
        <ImageHalf
          imgPath="/assets/music-player.jpg"
          imgPathHovered="/assets/music-player2.jpg"
          altText="to-do-list app"
          isMobileImage={true}
        />
      </ProjectCard>
      <ProjectCard id="Forecast-Bot">
        <TextHalf
          title="RaspPi Forecast Bot"
          description="A compact smart home weather forecast bot with Speech Recognition  with Speech Feedback capability, it utilize GPT-4 for analysis and recommendation
                    based on weather prediction by local agencies with Raspberry Pi as interface with user and python as Backend to handle input and output speech"
          demo="https://drive.google.com/file/d/1gRndNQ9E7TrvrBrbEqhiwrrXLRA04zXJ/view?usp=sharing"
          github="https://github.com/AndresLie/RaspiForecastBot"
        >
          <Icon icon="devicon:raspberrypi" width="55" height="55" />
          <Icon icon="file-icons:flask" width="55" height="55" />
          <Icon icon="logos:python" width="55" height="55" />
        </TextHalf>
        <ImageHalf
          imgPath="/assets/weather-forecast.png"
          imgPathHovered="/assets/weather-forecast.png"
          altText="to-do-list app"
        />
      </ProjectCard>
      <ProjectCard id="To-do-List">
        <TextHalf
          title="To Do List App"
          description="A to do list web-app based on React with save on local browser and responsive design.
                    User are also able to sort,mark,remove and see summary of to do's by date. This project is made with React, and component library such as 
                    Bootstraps and ShadCN UI"
          live="https://my-personal-todolist.netlify.app/"
          github="https://github.com"
        >
          <Icon icon="logos:react" width="55" height="55" />
          <Icon icon="logos:javascript" width="55" height="55" />
          <Icon icon="devicon:css3" width="55" height="55" />
          <Icon icon="simple-icons:shadcnui" width="43" height="43" />
          <Icon icon="devicon:bootstrap" width="55" height="55" />
        </TextHalf>
        <ImageHalf
          imgPath="/assets/to-do-list.png"
          imgPathHovered="/assets/to-do-list2.png"
          altText="to-do-list app"
        />
      </ProjectCard>
    </div>
  );
}

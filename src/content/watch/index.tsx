import * as React from "react";
import { createRoot } from "react-dom/client";

import { RepeatButton } from "./repeatButton";

const mountTargetElement = document.createElement("div");
mountTargetElement.id = "ReactAppMountTarget";
mountTargetElement.classList.add("ytp-button");
const controls = document.querySelector("#movie_player div.ytp-right-controls");
controls?.prepend(mountTargetElement);

const container = document.getElementById("ReactAppMountTarget");
if (container) {
  const root = createRoot(container);
  const video = document.querySelector<HTMLVideoElement>("#movie_player video");
  if (video) {
    root.render(<RepeatButton video={video} />);
  }
}

import { Operators } from "./operator-store";

export const options: Operators[] = [
  {
    name: "james",
    id: "1",
    tasks: [{
      taskKey: "cnc-1",
      text: "cnc - 1",
      
    },{
      taskKey: "cnc-2",
      text: "cnc - 2",
      
    },{
      taskKey: "cbc-3",
      text: "cnc - 3",
      
    }]
  },
  {
    name: "Naga",
    id: "2",
    tasks: [{
      taskKey: "sanding-doors",
      text: "Sanding Doors"
      
    },{
      taskKey: "sanding-frames",
      text: "Sanding Frames"
      
    },{
      taskKey: "sanding-side-lights",
      text: "Sanding Side Lights"
      
    }]
  },
  {
    name: "Shane",
    id: "3",
    tasks: [{
      taskKey: "painting-frame",
      text: "Painting Frames"
      
    },{
      taskKey: "painting-sash",
      text: "Painting Sash"
      
    },{
      taskKey: "painting-sidelights",
      text: "Painting SideLights"
      
    }]
  }
]
import { Operators } from "./operator-store";

export const options: Operators[] = [
  {
    name: "james",
    id: "1",
    tasks: [{
      text: "cnc - 1",
      id: '1'
    },{
      text: "cnc - 2",
      id: '2'
    },{
      text: "cbc - 3",
      id: '3'
    }]
  },
  {
    name: "Naga",
    id: "2",
    tasks: [{
      text: "sanding doors",
      id: '1'
    },{
      text: "sanding frames",
      id: '2'
    },{
      text: "sanding side lights",
      id: '3'
    }]
  },
  {
    name: "Shane",
    id: "3",
    tasks: [{
      text: "painting frame",
      id: '1'
    },{
      text: "painting Sash",
      id: '2'
    },{
      text: "painting SideLights",
      id: '3'
    }]
  }
]
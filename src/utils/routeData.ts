import { House, Binary, Gamepad } from "lucide-react";
import { ComponentType } from "react";

interface RouteItem {
  id: string;
  label: string;
  route: string;
  icon: ComponentType<{ className?: string }>; // store component
}

export const routeData: RouteItem[] = [
  {
    id: "1",
    label: "Home",
    route: "/",
    icon: House,
  },
  {
    id: "2",
    label: "Hacker OS",
    route: "/hacker-os",
    icon: Binary,
  },
  {
    id: "2",
    label: "Retro Game",
    route: "/retro-game",
    icon: Gamepad,
  },
];

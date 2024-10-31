import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  CalendarDays,
  Car,
  CircleGauge,
  FlaskConical,
  House,
  ListOrdered,
  LogIn,
  Navigation,
  Undo2,
  University,
  UserPlus,
} from "lucide-react";
import { NavMain } from "./components/nav-main";
import { NavUser } from "./components/nav-user";
import { TeamSwitcher } from "./components/team-switcher";

// This is sample data.
const data = {
  teams: [
    {
      name: "iPAC Lab",
      logo: FlaskConical,
      plan: "Company",
    },
    {
      name: "HUST",
      logo: University,
      plan: "University",
    },
  ],
  navMain: [
    {
      title: "Admin pages",
      url: "#",
      icon: Navigation,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "/admin/dashboard",
          icon: CircleGauge,
        },
        {
          title: "Manage Orders",
          url: "/admin/manage-orders",
          icon: ListOrdered,
        },
        {
          title: "Schedules",
          url: "/admin/schedules",
          icon: CalendarDays,
        },
        {
          title: "AGVs",
          url: "/admin/agvs",
          icon: Car,
        },
      ],
    },
    {
      title: "Landing pages",
      url: "#",
      icon: Undo2,
      items: [
        {
          title: "Home",
          url: "/",
          icon: House,
        },
        {
          title: "Login",
          url: "/login",
          icon: LogIn,
        },
        {
          title: "Register",
          url: "/register",
          icon: UserPlus,
        },
      ],
    },
  ],
};

export default function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarTrigger className="ml-0.5" />
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

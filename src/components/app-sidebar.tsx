"use client";

import * as React from "react";
import {
  Command,
  ExternalLink,
  Frame,
  LucideSettings,
  Map,
  PieChart,
  Store,
} from "lucide-react";

import { NavProjects } from "@/components/nav-projects";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import BPLogo from "./BPLogo";
import Link from "next/link";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Joy and Supply Store",
      logo: Store,
      plan: "Pro",
    },
    {
      name: "Karipap Gorgon Seman",
      logo: Command,
      plan: "Enterprise",
    },
  ],
};

const navMain = [
  {
    name: "Dashboard",
    url: "/app",
    icon: Frame,
    external: false,
  },
  {
    name: "Billing",
    url: "/app/billing",
    icon: PieChart,
    external: false,
  },
  {
    name: "Payment Form",
    url: "/app/payment-form",
    icon: Map,
    external: false,
  },
  {
    name: "Subscription",
    url: "/app/subscription",
    icon: Map,
    external: false,
  },
];

const navFooter = [
  {
    name: "Account Settings",
    url: "/app/account-settings",
    icon: LucideSettings,
    external: false,
  },
  {
    name: "Support",
    url: "https://main.billplz.com/support",
    icon: ExternalLink,
    external: true,
  },
  {
    name: "FAQ",
    url: "https://www.billplz.com/help",
    icon: ExternalLink,
    external: true,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="hidden md:flex">
        <Link href="/app">
          <BPLogo />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <TeamSwitcher teams={data.teams} />
        <NavProjects projects={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavProjects projects={navFooter} />
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
    </Sidebar>
  );
}

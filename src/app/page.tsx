"use client";

import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ExpenseOverviewChart } from "@/components/dashboard/expense-overview-chart";
import { RequestsStatusChart } from "@/components/dashboard/requests-status-chart";
import { RecentRequests } from "@/components/dashboard/recent-requests";
import { PendingApprovalsTable } from "@/components/dashboard/pending-approvals-table";
import { ApprovalWorkflow } from "@/components/dashboard/approval-workflow";
import { useNavigation } from "@/lib/navigation";
import { useAuth } from "@/lib/auth";
import { LoginPage } from "@/components/dashboard/login-page";

import CampagnesPage from "@/components/dashboard/pages/campagnes";
import PhrasesPage from "@/components/dashboard/pages/phrases";
import ImagesPage from "@/components/dashboard/pages/images";
import ModerationPage from "@/components/dashboard/pages/moderation";
import ConsensusPage from "@/components/dashboard/pages/consensus";
import RecompensesPage from "@/components/dashboard/pages/recompenses";
import PaiementsPage from "@/components/dashboard/pages/paiements";
import ExportPage from "@/components/dashboard/pages/export";
import ParametresPage from "@/components/dashboard/pages/parametres";

function DashboardPage() {
  return (
    <div className="space-y-6">
      <StatsCards />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ExpenseOverviewChart />
        <RequestsStatusChart />
        <RecentRequests />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <PendingApprovalsTable />
        </div>
        <div className="lg:col-span-4">
          <ApprovalWorkflow />
        </div>
      </div>
    </div>
  );
}

function PageRenderer() {
  const { activePage } = useNavigation();

  switch (activePage) {
    case "dashboard":
      return <DashboardPage />;
    case "campagnes":
      return <CampagnesPage />;
    case "phrases":
      return <PhrasesPage />;
    case "images":
      return <ImagesPage />;
    case "moderation":
      return <ModerationPage />;
    case "consensus":
      return <ConsensusPage />;
    case "recompenses":
      return <RecompensesPage />;
    case "paiements":
      return <PaiementsPage />;
    case "export":
      return <ExportPage />;
    case "parametres":
      return <ParametresPage />;
    default:
      return <DashboardPage />;
  }
}

export default function Home() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-3 sm:p-6">
          <PageRenderer />
        </main>
      </div>
    </div>
  );
}

import DashboardSidebar from "@/components/dashboard/Layout/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />
      <main>{children}</main>
    </div>
  );
}

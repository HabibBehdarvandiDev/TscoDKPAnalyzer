import Header from "@/app/components/common/header/Header";
import Sidebar from "@/app/components/common/sidebar/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-screen h-screen overflow-hidden">
        <Header />
        <main className="p-3 overflow-x-hidden overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

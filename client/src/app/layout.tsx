import { Route, Routes } from "react-router-dom";
import PublicLayout from "@/app/layouts/public.layout";
import AppLayout from "@/app/layouts/app.layout";
import NotfoundPage from "@/app/pages/notfound.page";
import HomePage from "@/app/pages/home.page";
import { Toaster } from "@/components/ui/sonner";
import WalletProvider from "@/lib/wallet/provider.wallet";
import { QueryProvider } from "@/lib/query/provider.query";

const Layout = () => {
  return (
    <WalletProvider>
      <QueryProvider>
        <section className="w-full min-h-screen flex flex-col bg-midnight-400">
          <Routes>
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<HomePage />} />
            </Route>
            <Route path="/community" element={<AppLayout />}></Route>
            <Route path="*" element={<NotfoundPage />} />
          </Routes>
          <Toaster />
        </section>
      </QueryProvider>
    </WalletProvider>
  );
};

export default Layout;

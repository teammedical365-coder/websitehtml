import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { LeadProvider } from '@/context/LeadContext';
import AppShell from '@/components/AppShell';

export const metadata = {
  title: 'Medical 365 CRM - Healthcare & Patient Lead Management',
  description: 'Enterprise Medical CRM, Patient Pipeline & Hospital Triage System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <LeadProvider>
            <AppShell>
              {children}
            </AppShell>
          </LeadProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

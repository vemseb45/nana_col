import { redirect } from 'next/navigation';
import { getAuthenticatedAdminFromCookies } from '@/backend/modules/auth/server-session';
import AdminLoginView from '@/frontend/modules/admin/AdminLoginView';

export const dynamic = 'force-dynamic';

export default async function AdminLoginPage() {
  const admin = await getAuthenticatedAdminFromCookies();
  if (admin) {
    redirect('/admin');
  }

  return <AdminLoginView />;
}

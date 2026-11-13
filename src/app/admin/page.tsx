import { redirect } from 'next/navigation';
import { getAuthenticatedAdminFromCookies } from '@/backend/modules/auth/server-session';
import { productService } from '@/backend/modules/products/product.service';
import AdminDashboardView from '@/frontend/modules/admin/AdminDashboardView';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const admin = await getAuthenticatedAdminFromCookies();
  if (!admin) {
    redirect('/admin/login');
  }

  const products = await productService.listProducts();

  return (
    <AdminDashboardView
      admin={{
        id: admin.id,
        username: admin.username,
        name: admin.name,
        role: admin.role,
      }}
      initialProducts={products}
    />
  );
}

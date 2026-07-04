import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import RealtimeListener from '@/components/common/RealtimeListener';
import { CartProvider } from '@/components/cart/CartProvider';

export default function PublicLayout({ children }) {
  return (
    <CartProvider>
      <RealtimeListener />
      <Navbar />
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-8">{children}</main>
      <Footer />
    </CartProvider>
  );
}

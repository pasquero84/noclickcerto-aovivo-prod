import Navbar from '@/components/Navbar'
import CheckoutForm from '@/components/CheckoutForm'

export const dynamic = 'force-dynamic'

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#060A14] text-white">
      <Navbar />
      <CheckoutForm />
    </div>
  )
}

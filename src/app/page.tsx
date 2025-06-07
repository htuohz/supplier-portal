import Link from 'next/link';
import {
  BuildingOfficeIcon,
  ShieldCheckIcon,
  GlobeAsiaAustraliaIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Verified Suppliers',
    description:
      'All suppliers are thoroughly vetted and verified to ensure quality and reliability.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Global Reach',
    description:
      'Connect with manufacturers and suppliers from all major industrial regions in China.',
    icon: GlobeAsiaAustraliaIcon,
  },
  {
    name: 'Direct Factory Access',
    description: 'Skip the middlemen and work directly with factories to get the best prices.',
    icon: BuildingOfficeIcon,
  },
  {
    name: 'Logistics Support',
    description: 'Get comprehensive shipping and logistics support for your orders.',
    icon: TruckIcon,
  },
];

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Find Reliable Chinese Suppliers
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Connect with verified manufacturers and get competitive quotes for your sourcing
              needs. Start building reliable supply chains today.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/suppliers"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Find Suppliers
              </Link>
              <Link href="/about" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="mx-auto mt-8 max-w-7xl px-6 sm:mt-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why Choose Our Platform?
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We make it easy to find and connect with reliable suppliers in China, ensuring quality
            products and smooth transactions.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-4 lg:gap-y-16">
            {features.map(feature => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mx-auto mt-32 max-w-7xl sm:mt-40 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Start Sourcing Today
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
            Join thousands of businesses who have found reliable suppliers through our platform.
            Register now to get started.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/register"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Register Now
            </Link>
            <Link href="/contact" className="text-sm font-semibold leading-6 text-white">
              Contact Us <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="mt-32 sm:mt-40"></div>
    </div>
  );
}

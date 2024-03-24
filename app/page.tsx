import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import '/styles/global.css';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: "Begin"
    }
  ],
  image: `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/Qme4FXhoxHHfyzTfRxSpASbMF8kajLEPkRQWhwWu9pkUjm/0.png`,
  post_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame?id=1`,
});

export const metadata: Metadata = {
  title: 'FarSight',
  description: 'Bringing the data revolution to Farcaster',
  openGraph: {
    title: 'FarSight',
    description: 'Bringing the data revolution to Farcaster',
    images: [`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/Qme4FXhoxHHfyzTfRxSpASbMF8kajLEPkRQWhwWu9pkUjm/0.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <header className="py-4">
        <h1 className="text-3xl font-bold">FarSight</h1>
      </header>
      <main className="flex flex-col items-center justify-center flex-grow">
        <div className="flex flex-col items-center space-y-4">
          {/* Display influencer data dashboard */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Dashboard</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Sample metrics */}
              <div className="border border-gray-200 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Followers</h3>
                <p className="text-gray-600">10,000</p>
              </div>
              <div className="border border-gray-200 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Engagement Rate</h3>
                <p className="text-gray-600">15%</p>
              </div>
              <div className="border border-gray-200 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Average Likes</h3>
                <p className="text-gray-600">500</p>
              </div>
              <div className="border border-gray-200 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Comments</h3>
                <p className="text-gray-600">250</p>
              </div>
            </div>
          </div>
          {/* Login button */}
          <Link href="/login" passHref>
            <button className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md transition duration-300 hover:bg-blue-600">
              Login
            </button>
          </Link>
        </div>
      </main>
      <footer className="py-4 text-center">
        <p className="text-gray-500">© 2024 FarSight. All rights reserved.</p>
      </footer>
    </div>
  );
}

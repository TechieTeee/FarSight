import { FrameContainer, FrameImage, FrameButton, FrameInput } from "frames.js/next/server";
import { getPreviousFrame, validateActionSignature } from "frames.js/next/server";
import Link from "next/link";
import Image from "next/image";

const reducer = (state, action) => ({ count: state.count + 1 });

export default async function Home(props) {
  const previousFrame = getPreviousFrame(props.searchParams);
  await validateActionSignature(previousFrame.postBody);

  const [state, dispatch] = useFramesReducer(
    reducer,
    { count: 0 },
    previousFrame
  );

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

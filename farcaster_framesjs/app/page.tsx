import {
  FrameContainer,
  FrameImage,
  FrameButton,
  useFramesReducer,
  getPreviousFrame,
  validateActionSignature,
  FrameInput,
} from "frames.js/next/server";
import Link from "next/link";
import { useState } from "react";
import { NextRequest, NextResponse } from "next/server";
import { PinataFDK } from "pinata-fdk";
import { gql, useQuery } from '@apollo/client';
import '/styles/global.css';

// Define the reducer function
const reducer = (state, action) => ({ count: state.count + 1 });

// GraphQL query to fetch product trends data
const GET_PRODUCT_TRENDS = gql`
  query ProductTrends {
    products {
      id
      name
      sales
      category
    }
  }
`;

// ProductTrends component to display product trends data
const ProductTrends = () => {
  const { loading, error, data } = useQuery(GET_PRODUCT_TRENDS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Product Trends</h2>
      <ul>
        {data.products.map(product => (
          <li key={product.id}>
            {product.name} - Sales: {product.sales}
          </li>
        ))}
      </ul>
    </div>
  );
};

// FarsightPage component
const FarsightPage = (props) => {
  const previousFrame = getPreviousFrame(props.searchParams);
  const [state, dispatch] = useFramesReducer(
    reducer,
    { count: 0 },
    previousFrame
  );

  // State for search input
  const [searchQuery, setSearchQuery] = useState("");

  // Handler for search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handler for search button click
  const handleSearchButtonClick = () => {
    // Perform search action, for example:
    // Redirect to a search page with the searchQuery
    window.location.href = `/search?q=${searchQuery}`;
  };

  // Handler for commerce button click
  const handleCommerceButtonClick = () => {
    // Perform commerce action, for example:
    // Redirect to a commerce page
    window.location.href = "/commerce";
  };

  // Handler for account abstraction button click
  const handleAccountAbstractionButtonClick = () => {
    // Perform account abstraction action, for example:
    // Redirect to an account abstraction page
    window.location.href = "/account-abstraction";
  };

  // Handler for frame button click
  const handleFrameButtonClick = async () => {
    const body = { untrustedData: { buttonIndex: 1 } }; // Assuming buttonIndex is 1
    try {
      const { isValid } = await fdk.validateFrameMessage(body);
      if (isValid) {
        await fdk.sendAnalytics("frame-mint-tutorial-blog", body);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FrameContainer
      postUrl="/frames"
      state={state}
      previousFrame={previousFrame}
    >
      <FrameImage src="https://picsum.photos/seed/frames.js/1146/600" />
      <div className="flex items-center justify-center space-x-4 mt-8">
        {/* Commerce button */}
        <FrameButton onClick={handleCommerceButtonClick}>
          Commerce
        </FrameButton>
        {/* Account Abstraction button */}
        <FrameButton onClick={handleAccountAbstractionButtonClick}>
          Account Abstraction
        </FrameButton>
        {/* Search feature */}
        <div className="flex items-center">
          <FrameInput
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Search..."
          />
          <FrameButton onClick={handleSearchButtonClick}>Search</FrameButton>
        </div>
        {/* Frame button */}
        <FrameButton onClick={handleFrameButtonClick}>
          Frame Button
        </FrameButton>
      </div>
      <FrameButton onClick={dispatch}>{state.count}</FrameButton>
      {/* Product trends */}
      <ProductTrends />
    </FrameContainer>
  );
};

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const buttonId = body.untrustedData.buttonIndex;
  const { isValid, message } = await fdk.validateFrameMessage(body);
  if (buttonId === 1) {
    try {
      if (isValid) {
        await fdk.sendAnalytics("frame-mint-tutorial-blog", body);
      }
      return NextResponse.redirect(
        "https://www.pinata.cloud/blog/how-to-build-a-farcaster-frame-that-mints-nfts",
        { status: 302 }
      );
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: error });
    }
  } else {
    try {
      if (isValid) {
        await fdk.sendAnalytics("frame-mint-tutorial-video", body);
      }
      return NextResponse.redirect("https://youtu.be/5VVOMolm-TA", {
        status: 302,
      });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: error });
    }
  }
}

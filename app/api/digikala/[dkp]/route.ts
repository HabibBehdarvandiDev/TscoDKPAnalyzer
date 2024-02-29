import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prismaConnection";

export async function GET(
  req: NextRequest,
  { params }: { params: { dkp: string } }
) {
  const { dkp } = params;

  console.log("Before sending request to Digikala API");

  try {
    // Send GET request to the Digikala API
    const response = await fetch(`https://api.digikala.com/v2/product/${dkp}/`);

    console.log("After sending request to Digikala API");

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from Digikala API: ${response.statusText}`
      );
    }

    console.log("After checking response.ok");

    // Parse the JSON response
    const data = await response.json();

    console.log("After parsing JSON response");

    // Extract the required information
    // Extract the image URL
    const image_url = data.data.product.images.main.url[0] || "";

    // Extract the product name
    const product_name = data.data.product.title_fa || "";

    // Extract the rating rate
    const rating_rate = data.data.product.rating.rate || "";

    // Extract the rating count
    const rating_count = data.data.product.rating.count || "";

    // Extract the comment count
    const comment_count = data.data.product.last_questions.length || "";

    // Extract the selling price
    const selling_price =
      data.data.product.default_variant.price.selling_price || "";

    // Extract the seller
    const seller = data.data.product.default_variant.seller.title || "";

    console.log("After extracting required information");

    // Extract the product rating statistics
    const rating_stats = data.data.product.default_variant.statistics;

    console.log("After extracting rating statistics");

    // Extract the total number of reviews and the overall rating
    const total_reviews = rating_stats ? rating_stats.total_count : "";
    const overall_rating = rating_stats ? rating_stats.total_rate : "";

    console.log("After extracting total reviews and overall rating");

    // Check for empty values before extracting reviews for each rating category
    const totally_satisfied_reviews = rating_stats
      ? rating_stats.totally_satisfied.rate_count
      : "";
    const satisfied_reviews = rating_stats
      ? rating_stats.satisfied.rate_count
      : "";
    const neutral_reviews = rating_stats ? rating_stats.neutral.rate_count : "";
    const dissatisfied_reviews = rating_stats
      ? rating_stats.dissatisfied.rate_count
      : "";
    const totally_dissatisfied_reviews = rating_stats
      ? rating_stats.totally_dissatisfied.rate_count
      : "";

    console.log("After extracting reviews for each rating category");

    const product = await prisma.product.findFirst({
      where: {
        dkp: parseInt(dkp),
      },
    });

    console.log("After querying Prisma for product");

    if (!product) {
      console.log("Product not found in database");
      return NextResponse.json(
        { error: "The product does not exist!" },
        { status: 400 }
      );
    }

    console.log("After checking if product exists in database");

    // Prepare the response object
    const responseObject = {
      id: product?.id,
      dkp: parseInt(dkp),
      image_url,
      title: product?.product_name,
      product_name,
      rating_count: rating_count,
      rating_rate: rating_rate,
      comments: comment_count,
      digikala_price: selling_price,
      tsco_price: parseInt(product?.price),
      product_category: product?.product_category,
      seller,
      rating_stats: {
        total_reviews,
        overall_rating,
        totally_satisfied_reviews,
        satisfied_reviews,
        neutral_reviews,
        dissatisfied_reviews,
        totally_dissatisfied_reviews,
      },
    };

    console.log("After preparing response object");

    // Return the data as the response
    return NextResponse.json(responseObject, { status: 200 });
  } catch (error) {
    console.error("Error fetching data from Digikala API:", error);
    // Return an error response
    return NextResponse.error();
  }
}

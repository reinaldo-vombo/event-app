import { NextResponse } from 'next/server';
import fetch from 'node-fetch'; // Fetch for Node.js environment
import * as cheerio from 'cheerio'; // For HTML parsing

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Fetch the HTML of the provided URL
    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch the URL' },
        { status: response.status }
      );
    }

    const html = await response.text();

    // Use Cheerio to parse HTML and extract metadata
    const $ = cheerio.load(html);
    const metadata = {
      title:
        $('meta[property="og:title"]').attr('content') ||
        $('title').text() ||
        null,
      description:
        $('meta[property="og:description"]').attr('content') ||
        $('meta[name="description"]').attr('content') ||
        null,
      image: $('meta[property="og:image"]').attr('content') || null,
    };

    return NextResponse.json(metadata);
  } catch (error) {
    console.error('Error scraping metadata:', error);
    return NextResponse.json(
      { error: 'Failed to scrape metadata' },
      { status: 500 }
    );
  }
}

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
    const guestData = {
      name: $("meta[property='og:title']").attr("content") ||
        $("title").text().trim() ||
        null,
      avatar: $("meta[property='og:image']").attr("content") || null,
    };

    return NextResponse.json(guestData);
  } catch (error) {
    console.error('Error scraping site:', error);
    return NextResponse.json(
      { error: 'Failed to scrape data' },
      { status: 500 }
    );
  }
}

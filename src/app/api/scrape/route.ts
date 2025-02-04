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
    const scrapedData = {
      title: $('h1').first().text().trim() || null,
      description: $('meta[name="description"]').attr('content') || null,
      price: $('.price, .cost, .amount').first().text().trim() || null,
      images: $('img')
        .map((_, el) => $(el).attr('src'))
        .get()
        .filter(Boolean), // Collect all image sources
      categories: $('.category, .tags, .breadcrumbs')
        .map((_, el) => $(el).text().trim())
        .get()
        .filter(Boolean),
      location: $('.location, .address, .venue').first().text().trim() || null,
    };

    return NextResponse.json(scrapedData);
  } catch (error) {
    console.error('Error scraping site:', error);
    return NextResponse.json(
      { error: 'Failed to scrape data' },
      { status: 500 }
    );
  }
}

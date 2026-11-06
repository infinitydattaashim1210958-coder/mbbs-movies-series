import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');
  
  const owner = process.env.GITHUB_REPO_OWNER || 'infinitydattaashim1210958-coder';
  const repo = process.env.GITHUB_REPO_NAME || 'mbbs-movies-series';
  const tag = process.env.RELEASE_TAG || 'mbbs-movie-medical-notes-0.0.1';

  if (!file) {
    return NextResponse.json({ error: 'Missing file parameter' }, { status: 400 });
  }

  // Construct GitHub Release asset download URL
  const releaseUrl = `https://github.com/${owner}/${repo}/releases/download/${tag}/${file}`;

  try {
    // Server-side fetch bypasses browser CORS restrictions completely
    const res = await fetch(releaseUrl, { redirect: 'follow', cache: 'force-cache' });
    
    if (!res.ok) {
      return NextResponse.json({ error: `Note '${file}' not found in release ${tag}` }, { status: 404 });
    }
    
    const html = await res.text();
    
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400', // Cache at Vercel Edge for 24h
      },
    });
  } catch (error) {
    console.error('Proxy fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch note from release' }, { status: 500 });
  }
}

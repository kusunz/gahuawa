import { NextResponse } from 'next/server';
import { API_CONFIG } from '../../../lib/config';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const comicId = searchParams.get('comicId') || 'cot-nhan-6317';
  const chapterId = searchParams.get('chapterId') || 'chapter-1-9664';

  try {
    const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.comic}`
      .replace('[comicId]', comicId)
      .replace('[chapterId]', chapterId);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch comic data');
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch comic data' },
      { status: 500 }
    );
  }
}
import { NextResponse } from 'next/server';
import { getAnalyticsData } from '../../lib/analytics';

export async function GET() {
  const data = getAnalyticsData();
  return NextResponse.json(data);
}
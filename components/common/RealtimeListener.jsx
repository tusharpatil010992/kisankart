'use client';

import { useRealtimeRefresh } from '@/hooks/useRealtime';

const WATCHED_TABLES = ['products', 'categories'];

export default function RealtimeListener() {
  useRealtimeRefresh(WATCHED_TABLES);
  return null;
}

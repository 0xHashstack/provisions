export const dynamic = 'force-static';
export const runtime = 'nodejs';

import { redirect } from 'next/navigation';

export default function Home() {
	redirect('/provisions');
}

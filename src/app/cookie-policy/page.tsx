import { LegalPage } from '@/components/LegalPage';
import { cookiePolicy } from '@/content/legal';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: cookiePolicy.title,
  description: cookiePolicy.description,
  path: `/${cookiePolicy.slug}`,
});

export default function CookiePolicyPage() {
  return <LegalPage doc={cookiePolicy} />;
}

import { LegalPage } from '@/components/LegalPage';
import { termsAndConditions } from '@/content/legal';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: termsAndConditions.title,
  description: termsAndConditions.description,
  path: `/${termsAndConditions.slug}`,
});

export default function TermsPage() {
  return <LegalPage doc={termsAndConditions} />;
}

import { LegalPage } from '@/components/LegalPage';
import { privacyPolicy } from '@/content/legal';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: privacyPolicy.title,
  description: privacyPolicy.description,
  path: `/${privacyPolicy.slug}`,
});

export default function PrivacyPolicyPage() {
  return <LegalPage doc={privacyPolicy} />;
}

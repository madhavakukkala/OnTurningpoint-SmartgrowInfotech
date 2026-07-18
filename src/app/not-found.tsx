import { Container } from '@/components/ui/Layout';
import { Heading, Lede } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <Container className="py-24 md:py-30">
      <div className="max-w-2xl">
        <p className="text-eyebrow font-semibold uppercase text-ink-muted">Error 404</p>
        <Heading as="h1" size="display" accent="isn’t here" className="mt-6">
          This page
        </Heading>
        <Lede className="mt-8">
          The page you were looking for has moved or never existed. Try our destinations, or get in
          touch and we will point you to the right guide.
        </Lede>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/">Back to home</Button>
          <Button href="/countries" variant="ghost">
            Browse destinations
          </Button>
        </div>
      </div>
    </Container>
  );
}

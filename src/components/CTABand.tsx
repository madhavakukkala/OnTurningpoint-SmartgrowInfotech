import { Container, Section } from '@/components/ui/Layout';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { ContactBlock } from '@/components/ContactBlock';
import { company } from '@/content/company';

/**
 * The closing CTA + contact band used at the foot of nearly every page
 * (BRIEF §5, §7). One primary CTA only.
 */
export function CTABand({
  heading = 'Admissions are open',
  headingAccent = 'for 2025–2026',
  body = 'Talk to a counselor about your marks, your budget and where you want to practise. The first consultation is free.',
  showContact = true,
}: {
  heading?: string;
  headingAccent?: string;
  body?: string;
  showContact?: boolean;
}) {
  return (
    <Section tone="dark" aria-labelledby="cta-heading">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <Heading id="cta-heading" accent={headingAccent} className="text-white">
              {heading}
            </Heading>
            <p className="mt-8 max-w-prose text-body text-white/70">{body}</p>
            <div className="mt-10">
              <Button href="/contact" variant="onDark">
                {company.primaryCta}
              </Button>
            </div>
          </Reveal>

          {showContact && (
            <Reveal className="lg:col-span-6 lg:pt-2" delay={0.1}>
              <ContactBlock onDark />
            </Reveal>
          )}
        </div>
      </Container>
    </Section>
  );
}

import { Container, Section, Eyebrow } from '@/components/ui/Layout';
import { Heading, Lede } from '@/components/ui/Heading';
import { Reveal } from '@/components/ui/Reveal';
import { ContactBlock } from '@/components/ContactBlock';
import { ContactForm } from '@/components/ContactForm';
import { contact } from '@/content/company';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Contact Us — Book a Free Consultation',
  description:
    'Talk to us about studying MBBS or higher education abroad. Visit our Nellore office, call 8500470231, or send an enquiry and we will reply within 24 hours.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <header className="pb-12 pt-12 md:pb-16 md:pt-20">
        <Container>
          <Reveal className="max-w-4xl">
            <Eyebrow>Contact</Eyebrow>
            <Heading as="h1" size="display" accent="success story together" className="mt-6">
              Let’s create your
            </Heading>
            <Lede className="mt-8">
              Tell us your marks, your budget and where you want to study. The first consultation is
              free, and our team will get back to you within 24 hours.
            </Lede>
          </Reveal>
        </Container>
      </header>

      <Section aria-labelledby="contact-details-heading" compact>
        <Container>
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            {/* Details */}
            <div className="lg:col-span-5">
              <h2 id="contact-details-heading" className="text-display-xs font-bold text-ink">
                Come and see us
              </h2>
              <div className="mt-10">
                <ContactBlock className="sm:grid-cols-1" />
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <h2 className="text-display-xs font-bold text-ink">Send an enquiry</h2>
              <div className="mt-10">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Map */}
      <Section aria-labelledby="map-heading">
        <Container>
          <h2 id="map-heading" className="text-display-xs font-bold text-ink">
            Find the branch
          </h2>
          <p className="mt-4 max-w-prose text-base text-ink-muted">{contact.addressOneLine}</p>

          {/*
            TODO(client): replace this placeholder with the real embed.
            In Google Maps: search the branch → Share → Embed a map → copy the
            <iframe> and paste it in place of the block below. Keep the
            title attribute for screen readers.
          */}
          <Reveal className="mt-10">
            <div className="flex aspect-[16/9] items-center justify-center rounded-card bg-section-cool p-8 text-center md:aspect-[21/9]">
              <div>
                <p className="text-lg font-semibold text-ink">Map embed placeholder</p>
                <p className="mx-auto mt-3 max-w-md text-base text-ink-muted">
                  A Google Maps embed of the Nellore branch goes here. See the note in
                  <code className="mx-1 rounded bg-white/60 px-1.5 py-0.5 text-sm">
                    src/app/contact/page.tsx
                  </code>
                  for how to add it.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

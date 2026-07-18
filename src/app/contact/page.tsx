import { Container, Section, Eyebrow } from '@/components/ui/Layout';
import { Heading, Lede } from '@/components/ui/Heading';
import { Reveal } from '@/components/ui/Reveal';
import { ContactBlock } from '@/components/ContactBlock';
import { ContactForm } from '@/components/ContactForm';
import { company, contact } from '@/content/company';
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
              <h2 id="contact-details-heading" className="text-display-xs font-bold text-heading">
                Come and see us
              </h2>
              <div className="mt-10">
                <ContactBlock className="sm:grid-cols-1" />
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <h2 className="text-display-xs font-bold text-heading">Send an enquiry</h2>
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
          <h2 id="map-heading" className="text-display-xs font-bold text-heading">
            Find the branch
          </h2>
          <p className="mt-4 max-w-prose text-base text-ink-muted">{contact.addressOneLine}</p>

          {/*
            Google Maps embed for the Nellore branch, centred on the Punjabi
            Family Dhaba landmark named in the address.

            To update it: Google Maps → search the branch → Share → Embed a map
            → copy the `src` value out of the supplied <iframe> and replace the
            URL below. Keep `title`, `loading` and `referrerPolicy` as they are.

            Note: this embed is a third party that sets cookies, which is what
            the "Third-party cookies" clause in the Cookie Policy covers.
          */}
          <Reveal className="mt-10">
            <div className="overflow-hidden rounded-card bg-surface">
              <iframe
                // A frame with no accessible name is announced as just "frame";
                // this is what a screen-reader user hears instead.
                title={`Map showing the ${company.name} branch in Nellore`}
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1325.6302460346672!2d79.98544748607935!3d14.415540310227579!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4cf367216887c1%3A0xef13f79174aa8b90!2sPUNJABI%20FAMILY%20DHABA%202025!5e0!3m2!1sen!2sin!4v1784375212818!5m2!1sen!2sin"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                // Fluid width with a fixed ratio — the supplied 600x450 would
                // overflow narrow screens and leave gaps on wide ones.
                className="block h-[22rem] w-full border-0 md:h-[26rem]"
              />
            </div>
          </Reveal>

          {/* Text route out, for anyone who cannot use an embedded map */}
          <Reveal className="mt-5">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Punjabi+Family+Dhaba+Ramalingapuram+Nellore"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-semibold text-heading underline underline-offset-4 transition-colors hover:text-primary"
            >
              Open in Google Maps
            </a>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

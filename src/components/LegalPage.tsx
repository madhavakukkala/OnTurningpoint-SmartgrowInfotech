import { Container, Section } from '@/components/ui/Layout';
import { Heading } from '@/components/ui/Heading';
import { Reveal } from '@/components/ui/Reveal';
import { ContactBlock } from '@/components/ContactBlock';
import type { LegalDoc } from '@/content/legal';

/**
 * Shared long-form template for the three legal documents (BRIEF §6).
 * Deliberately untinted and CTA-free — these pages are read, not sold from.
 * The measure is constrained with `max-w-prose` and the rhythm is generous so
 * a long policy stays scannable.
 */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  const titleId = `${doc.slug}-heading`;

  return (
    <>
      <Section aria-labelledby={titleId}>
        <Container>
          <Reveal className="max-w-prose">
            <Heading as="h1" size="display" id={titleId}>
              {doc.title}
            </Heading>
            <p className="mt-6 text-base text-ink-subtle">Last updated: {doc.updated}</p>
            <p className="mt-8 text-body leading-relaxed text-ink-muted">{doc.intro}</p>
          </Reveal>

          <div className="mt-16 max-w-prose space-y-14 md:mt-20">
            {doc.sections.map((section) => (
              <Reveal as="section" key={section.heading}>
                <h2 className="text-display-xs font-bold text-ink">{section.heading}</h2>

                {section.body.map((paragraph) => (
                  <p key={paragraph} className="mt-6 text-base leading-relaxed text-ink-muted">
                    {paragraph}
                  </p>
                ))}

                {section.list && (
                  <ul className="mt-6 space-y-4">
                    {section.list.map((item) => (
                      <li key={item} className="flex gap-4">
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                        />
                        <span className="text-base leading-relaxed text-ink-muted">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section compact aria-labelledby={`${doc.slug}-contact-heading`}>
        <Container>
          <Heading id={`${doc.slug}-contact-heading`} size="sub" as="h2">
            Get in touch
          </Heading>
          <ContactBlock className="mt-10" />
        </Container>
      </Section>
    </>
  );
}

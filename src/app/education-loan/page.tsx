import { Container, Section } from '@/components/ui/Layout';
import { PageHero } from '@/components/PageHero';
import { SectionHeader } from '@/components/SectionHeader';
import { FeatureGrid, CheckList } from '@/components/FeatureGrid';
import { Reveal } from '@/components/ui/Reveal';
import { CTABand } from '@/components/CTABand';
import { loan } from '@/content/loan';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Education Loan for MBBS Abroad | Eligibility & Bank Tie-Ups',
  description:
    'Secured and unsecured education loans for MBBS abroad — eligibility, document checklist and tie-ups with SBI, Bank of Baroda, HDFC Credila, ICICI and Avanse.',
  path: '/education-loan',
});

export default function EducationLoanPage() {
  return (
    <>
      <PageHero
        eyebrow={loan.hero.eyebrow}
        headline={loan.hero.headline}
        headlineAccent={loan.hero.headlineAccent}
        intro={loan.hero.intro}
        image={loan.hero.image}
        imageAlt={loan.hero.imageAlt}
      />

      <Section tone="surface" aria-labelledby="loan-benefits-heading">
        <Container>
          <SectionHeader
            id="loan-benefits-heading"
            eyebrow="Loan benefits"
            heading="What a well-placed"
            accent="loan gets you"
            lede="The terms that matter most when the fee is in another currency and the course runs six years."
          />
          <FeatureGrid items={loan.benefits} columns={3} tone="plain" className="mt-16" />
        </Container>
      </Section>

      <Section aria-labelledby="loan-includes-heading">
        <Container>
          <SectionHeader
            id="loan-includes-heading"
            eyebrow="What's included"
            heading="From assessment"
            accent="to disbursement"
            lede="We stay on the file from the first eligibility check until the money reaches the university."
          />
          <FeatureGrid items={loan.includes} columns={2} className="mt-16" />
        </Container>
      </Section>

      <Section tone="warm" aria-labelledby="loan-eligibility-heading">
        <Container>
          <SectionHeader
            id="loan-eligibility-heading"
            eyebrow="Eligibility"
            heading="Who can"
            accent="apply"
            lede="Most families qualify on the strength of the admission letter and a co-applicant's income."
          />
          <CheckList items={loan.eligibility} columns={2} className="mt-16" />
        </Container>
      </Section>

      <Section aria-labelledby="loan-documents-heading">
        <Container>
          <SectionHeader
            id="loan-documents-heading"
            eyebrow="Documents"
            heading="What to keep"
            accent="ready"
            lede="Have these to hand and a sanction moves in weeks rather than months."
          />
          <CheckList items={loan.documents} columns={2} className="mt-16" />
        </Container>
      </Section>

      <Section tone="surface" aria-labelledby="loan-lenders-heading">
        <Container>
          <SectionHeader
            id="loan-lenders-heading"
            eyebrow="Lenders & destinations"
            heading="Who we work with,"
            accent="and where"
            lede="Nationalized banks, private banks and NBFCs — funding studies across our destination countries."
          />

          <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <h3 className="text-eyebrow font-semibold uppercase text-ink-muted">Lending partners</h3>
              <ul className="mt-6 flex flex-wrap gap-3">
                {loan.lenders.map((lender) => (
                  <li
                    key={lender}
                    className="rounded-full border border-line px-5 py-2 text-base text-ink-muted"
                  >
                    {lender}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <h3 className="text-eyebrow font-semibold uppercase text-ink-muted">Countries covered</h3>
              <ul className="mt-6 flex flex-wrap gap-3">
                {loan.countries.map((country) => (
                  <li
                    key={country}
                    className="rounded-full border border-line px-5 py-2 text-base text-ink-muted"
                  >
                    {country}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal>
            <p className="mt-12 text-sm text-ink-subtle">{loan.note}</p>
          </Reveal>
        </Container>
      </Section>

      <CTABand />
    </>
  );
}

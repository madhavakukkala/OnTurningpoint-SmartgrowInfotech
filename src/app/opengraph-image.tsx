import { ImageResponse } from 'next/og';

/**
 * Open Graph image, generated at build time from the brand mark + tokens.
 * Rendered as a real PNG because social platforms do not accept SVG.
 * Keep in sync with scripts/process-logo.mjs if the brand changes.
 */
export const alt = 'OnTurningPoint — overseas education consultancy';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const PRIMARY = '#002C83';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#FFFFFF',
          borderTop: `10px solid ${PRIMARY}`,
          padding: '76px 96px',
        }}
      >
        <svg width="90" height="113" viewBox="0 0 130.99 164.6">
          <path
            fill={PRIMARY}
            d="M33.06,164.55l-26.97.02C2.28,164.58,0,161.62,0,158.01v-73.59c0-4.1,2.77-6.54,6.79-6.54l79.11.02c3.18,0,6.11-2.42,6.11-5.61v-27.8c0-3.2-2.95-5.58-6.11-5.58H9.88c-1.89-.01-3.2-1.66-3.6-2.84-.62-1.82-.12-3.42,1.2-4.74L35.33,3.49C37.53,1.3,40.41,0,43.63,0h81.52c3.2,0,5.8,2.77,5.8,5.85v36.49c0,3.26-1.42,6.09-3.69,8.35l-62.94,62.94c-2.07,2.07-5.1,3.17-8.02,3.17l-43.9.03c-1.56,0-2.9,1.26-3.41,2.35-.65,1.4-.73,3.22.52,4.47l26.83,26.81c2.09,2.09,2.73,3.92,2.71,7.01-.02,3.35-1.8,7.1-5.99,7.1Z"
          />
          <circle fill={PRIMARY} cx="108.76" cy="142.37" r="22.23" />
        </svg>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 78,
              fontWeight: 800,
              letterSpacing: -3,
              color: PRIMARY,
              lineHeight: 1,
            }}
          >
            STUDY MBBS ABROAD
          </div>
          <div style={{ fontSize: 34, color: '#40606F', marginTop: 22 }}>
            Expert, transparent, end-to-end guidance.
          </div>
        </div>

        <div style={{ fontSize: 22, letterSpacing: 3, color: '#4C6874' }}>
          ONTURNINGPOINT · OVERSEAS EDUCATION CONSULTANCY · NELLORE, INDIA
        </div>
      </div>
    ),
    size
  );
}

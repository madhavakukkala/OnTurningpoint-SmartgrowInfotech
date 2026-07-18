/**
 * OnTurningPoint — contact form → Google Sheets
 * ============================================================================
 * This file is NOT part of the Next.js build. It is the script you paste into
 * Google Apps Script so the website can write enquiries into a spreadsheet.
 *
 * ----------------------------------------------------------------------------
 * SETUP (about 5 minutes, done once)
 * ----------------------------------------------------------------------------
 * 1. Create a new Google Sheet. Name it something like
 *    "OnTurningPoint — Website Enquiries".
 *
 * 2. In that sheet: Extensions → Apps Script. Delete whatever is in the editor
 *    and paste this entire file in.
 *
 * 3. Change SHARED_SECRET below to a long random string. Invent one, or run
 *    this in a terminal:  node -e "console.log(crypto.randomUUID())"
 *    Keep it — you need the same value in step 6.
 *
 * 4. Click Deploy → New deployment.
 *      - Type:          Web app
 *      - Description:   Contact form
 *      - Execute as:    Me
 *      - Who has access: Anyone            ← required; the site is not signed in
 *    Click Deploy, then Authorize access and approve the permission prompt.
 *    Google will warn that the app is unverified — that is expected for your
 *    own script. Choose Advanced → Go to (project name).
 *
 * 5. Copy the Web app URL. It looks like:
 *      https://script.google.com/macros/s/AKfy..../exec
 *
 * 6. In the website project, create a file named `.env.local` containing:
 *      GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfy..../exec
 *      GOOGLE_SHEETS_SHARED_SECRET=the-same-string-from-step-3
 *    On your host (Vercel/Netlify) add those two as environment variables too.
 *    Never commit .env.local — it is already gitignored.
 *
 * 7. Submit a test enquiry. A row should appear within a second or two.
 *
 * ----------------------------------------------------------------------------
 * IF YOU EDIT THIS SCRIPT LATER
 * ----------------------------------------------------------------------------
 * Apps Script serves the last DEPLOYED version, not the last saved one. After
 * editing you must Deploy → Manage deployments → edit → Version: New version.
 * Forgetting this is the usual reason a change appears to do nothing.
 * ============================================================================
 */

/** Must match GOOGLE_SHEETS_SHARED_SECRET in the website's environment. */
const SHARED_SECRET = 'REPLACE_WITH_A_LONG_RANDOM_STRING';

/** Tab within the spreadsheet. Created automatically if missing. */
const SHEET_NAME = 'Enquiries';

const HEADERS = ['Received at', 'Name', 'Email', 'Phone', 'Message', 'Status', 'Notes'];

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ ok: false, error: 'empty request' });
    }

    const body = JSON.parse(e.postData.contents);

    // Without this, anyone who finds the URL could write rows into the sheet.
    if (body.secret !== SHARED_SECRET) {
      return jsonResponse({ ok: false, error: 'unauthorized' });
    }

    const sheet = getSheet_();

    sheet.appendRow([
      new Date(),
      body.name || '',
      body.email || '',
      body.phone || '',
      body.message || '',
      'New', // Status — for counsellors to update as they work the lead
      '', // Notes
    ]);

    return jsonResponse({ ok: true });
  } catch (err) {
    // Returned to the site, which logs it. The visitor sees a generic message.
    return jsonResponse({ ok: false, error: String(err) });
  }
}

/** Lets you confirm the deployment is live by opening the URL in a browser. */
function doGet() {
  return jsonResponse({ ok: true, service: 'OnTurningPoint contact endpoint' });
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  // Write and freeze the header row the first time only.
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 160); // Received at
    sheet.setColumnWidth(5, 420); // Message
  }

  return sheet;
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

/**
 * Optional: emails you whenever a row is added, so nobody has to watch the
 * sheet. To enable — Triggers (clock icon) → Add trigger → choose
 * onNewEnquiry_, event source "From spreadsheet", type "On change".
 */
function onNewEnquiry_() {
  const sheet = getSheet_();
  const last = sheet.getLastRow();
  if (last < 2) return;

  const [, name, email, phone, message] = sheet.getRange(last, 1, 1, 5).getValues()[0];

  MailApp.sendEmail({
    to: 'onturningpoint@gmail.com',
    subject: 'New website enquiry — ' + name,
    body:
      'Name: ' + name + '\n' +
      'Email: ' + email + '\n' +
      'Phone: ' + phone + '\n\n' +
      message + '\n\n' +
      '— sent automatically from the OnTurningPoint website',
  });
}

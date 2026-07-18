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
 *
 * ----------------------------------------------------------------------------
 * TROUBLESHOOTING
 * ----------------------------------------------------------------------------
 * "This app is blocked — this app tried to access sensitive info in your
 * Google Account"
 *
 *   Apps Script works out which permissions to request by scanning the whole
 *   file, including functions that are never called. If anything in it touches
 *   the mail, Gmail, Drive or Calendar services, it requests a *sensitive* scope, and
 *   Google blocks unverified scripts that do. This file deliberately uses only
 *   SpreadsheetApp, which is not sensitive.
 *
 *   If you hit this screen: make sure nothing has been added to the file that
 *   sends email or touches Drive, save, then Deploy → Manage deployments →
 *   New version and authorise again.
 *
 *   On a Google Workspace account, an administrator may block unverified apps
 *   outright. Two ways through: have the admin allow it, or run the script
 *   from a personal Gmail account that owns the sheet and share the sheet with
 *   the team.
 *
 * "Authorization is required to perform that action" in the response
 *   The deployment's "Execute as" is not set to Me, or authorisation was never
 *   completed. Redeploy and approve the prompt.
 *
 * Rows are not appearing, but the site reports success
 *   You edited the script but did not deploy a New version — see above.
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
 * ============================================================================
 * WANT AN EMAIL ON EVERY NEW ENQUIRY?
 * ============================================================================
 * Use the spreadsheet's own notification rules — NOT a script.
 *
 *   In the Sheet: Tools → Notification settings → Edit notifications
 *   → "Any changes are made" → "Email - right away" → Save.
 *
 * This deliberately does NOT use the mail service. Apps Script determines the
 * permissions it needs by scanning the whole file, including functions that
 * never run, and the mail service requires the *sensitive* send_mail scope. Requesting
 * a sensitive scope from an unverified script is what triggers Google's
 * "This app is blocked — this app tried to access sensitive info in your
 * Google Account" screen during authorisation.
 *
 * Keeping this file to SpreadsheetApp only means it asks for one non-sensitive
 * permission and authorises cleanly. The built-in notification rule gives the
 * same result with no permissions at all.
 * ============================================================================
 */

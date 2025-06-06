
/**
 * Google Apps Script file for handling form submissions
 * 
 * How to use:
 * 1. Go to https://script.google.com/
 * 2. Create a new project
 * 3. Paste this code
 * 4. Deploy as a web app (Publish > Deploy as web app)
 *    - Execute the app as: Me
 *    - Who has access: Anyone, even anonymous
 * 5. Copy the web app URL and update the scriptURL in your Contact.tsx component
 */

// Google Sheets ID - replace with your own
// You can find this in the URL of your Google Sheet:
// https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';
const SHEET_NAME = 'Contact Form Responses';

/**
 * Process POST requests
 */
function doPost(e) {
  try {
    // Get data from POST request
    const data = JSON.parse(e.postData.contents);
    
    // Log the received data for debugging
    console.log("Received form data:", JSON.stringify(data));
    
    // Open spreadsheet and sheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      // Add headers to the sheet
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Subject', 'Message']);
      
      // Format the headers (make them bold and freeze the row)
      sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }
    
    // Append data to sheet
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.email || '',
      data.subject || '',
      data.message || ''
    ]);
    
    // Send email notification
    sendEmailNotification(data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: 'success', 
        message: 'Form submission recorded successfully' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log the error for debugging
    console.error('Error processing form submission:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: 'error', 
        message: 'Failed to process form submission',
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Send an email notification about the new form submission
 */
function sendEmailNotification(data) {
  try {
    const emailAddress = 'mazgouraabdalmounim@gmail.com'; // Update with your email
    const subject = 'New contact form submission: ' + (data.subject || 'No Subject');
    const body = 
      'You received a new message through your portfolio contact form:\n\n' +
      'Name: ' + (data.name || 'Not provided') + '\n' +
      'Email: ' + (data.email || 'Not provided') + '\n' +
      'Subject: ' + (data.subject || 'Not provided') + '\n\n' +
      'Message:\n' + (data.message || 'No message content');
    
    MailApp.sendEmail(emailAddress, subject, body);
    return true;
  } catch (error) {
    console.error('Error sending email notification:', error);
    return false;
  }
}

/**
 * Process GET requests (for testing the deployment)
 */
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: 'online',
      message: 'The form submission API is working correctly' 
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

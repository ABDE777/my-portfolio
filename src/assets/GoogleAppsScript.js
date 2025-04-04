// Google Sheets ID
const SPREADSHEET_ID = "1nw3RVK7kLZ03RW-yj8KC_dWBLnVaGbQ9DjGlEqe4md0";
const SHEET_NAME = "Formulaire Contact"; // Nom correct de la feuille

/**
 * Process POST requests
 */
function doPost(e) {
  try {
    // Vérifier si les données sont bien reçues
    if (!e.postData || !e.postData.contents) {
      throw new Error("No POST data received");
    }

    // Récupérer les données du formulaire
    const data = JSON.parse(e.postData.contents);
    
    // Log pour debugging
    Logger.log("Received form data: " + JSON.stringify(data));
    
    // Ouvrir la feuille de calcul
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Si la feuille n'existe pas, la créer
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      sheet.appendRow(["Timestamp", "Name", "Email", "Subject", "Message"]);
      sheet.getRange(1, 1, 1, 5).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    // Ajouter une ligne avec les données
    sheet.appendRow([
      new Date(), 
      data.name || "", 
      data.email || "", 
      data.subject || "", 
      data.message || ""
    ]);

    // Envoyer une notification par email
    sendEmailNotification(data);

    // Répondre avec succès
    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", message: "Form submission recorded successfully" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("Error processing form submission: " + error);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: "Failed to process form submission", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Send an email notification about the new form submission
 */
function sendEmailNotification(data) {
  try {
    const emailAddress = "mazgouraabdalmounim@gmail.com"; // Ton email
    const subject = "New contact form submission: " + (data.subject || "No Subject");
    const body = `
      You received a new message through your portfolio contact form:
      
      Name: ${data.name || "Not provided"}
      Email: ${data.email || "Not provided"}
      Subject: ${data.subject || "Not provided"}
      
      Message:
      ${data.message || "No message content"}
    `;

    MailApp.sendEmail(emailAddress, subject, body);
    Logger.log("Email sent successfully to " + emailAddress);
    return true;

  } catch (error) {
    Logger.log("Error sending email notification: " + error);
    return false;
  }
}

/**
 * Process GET requests (for testing the deployment)
 */
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "online", message: "The form submission API is working correctly" }))
    .setMimeType(ContentService.MimeType.JSON);
}

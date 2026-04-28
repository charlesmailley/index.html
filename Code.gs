// ═══════════════════════════════════════════════════════════
//  Mariage Charles & Camille — Google Apps Script
//  Coller ce code dans script.google.com, puis déployer
//  comme Application Web (voir instructions README)
// ═══════════════════════════════════════════════════════════

const SHEET_NAME     = 'Réponses';
const SPREADSHEET_ID = '1SBrs6udvgBGw3Ja1FMIlWu-bY4voNj2DNu96TSbdyPc';

const HEADERS = [
  'Date / Heure',
  'Groupe',
  'Prénom',
  'Nom',
  'Nb personnes',
  'Nb enfants',
  'Âges enfants',
  'Allergie',
  'Cérémonie 10h',
  'Déjeuner 12h–16h',
  'Transport 17/07',
  'Dîner vendredi soir',
  'Allergie dîner vendredi'
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss   = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet  = ss.getSheetByName(SHEET_NAME);

    // Crée l'onglet s'il n'existe pas
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    // Ajoute les en-têtes à la première ouverture
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
      headerRange.setBackground('#c9a96e');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      sheet.setFrozenRows(1);
      sheet.setColumnWidth(1, 160); // Date
      sheet.setColumnWidth(3, 120); // Prénom
      sheet.setColumnWidth(4, 120); // Nom
    }

    sheet.appendRow([
      new Date(),
      data.groupe             || '',
      data.prenom             || '',
      data.nom                || '',
      data.nb_personnes       || '',
      data.nb_enfants         || '',
      data.ages_enfants       || '',
      data.allergie           || '',
      data.ceremonie          || '',
      data.dejeuner           || '',
      data.transport          || '',
      data.diner              || '',
      data.allergie_vendredi  || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Point de test — ouvrir l'URL du script dans le navigateur
function doGet() {
  return ContentService
    .createTextOutput('Mariage Charles & Camille — API active ✓')
    .setMimeType(ContentService.MimeType.TEXT);
}

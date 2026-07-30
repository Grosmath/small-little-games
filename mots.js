/* =====================================================================
   LES MOTS DU JEU
   =====================================================================

   Les mots sont encodes en base64 pour ne pas etre lisibles ici d'un simple
   coup d'oeil. Ce n'est pas du chiffrement c'est juste la pour retirer la tentation.

   Format d'une ligne :  "AAAA-MM-JJ": "chaine-encodee",
   ===================================================================== */

const CALENDRIER = {
  "2026-07-30": "eyJtIjoiQ8OCTElOUyIsImkiOlsiQ2UgcXVlIGplIHRlIHZvbGUgbGUgbWF0aW4iLCJFdCBqJ2VuIHZldXggdG91am91cnMgdW4gZGUgcGx1cyJdfQ==",
  "2026-07-31": "eyJtIjoiQkFSQ0VMT05FIiwiaSI6WyJMw6Agb8O5IGxlcyBtb2ppdG9zIHNvbnQgdW4gcGV1IHRyb3AgY2hhcmfDqXMiLCJOb3RyZSBwcmVtaWVyIGRhdGUgKG5vbiBvZmZpY2llbC4uLikiXX0=",
  "2026-08-01": "eyJtIjoiRlJBTlVJIiwiaSI6WyJOb3RyZSBww6ljaMOpIG1pZ25vbiBkZXZhbnQgdW4gZmlsbSIsIk9uIGxlIHByw6lmw6hyZSDDoCBsYSBmcmFtYm9pc2UgZXQgYXUgY2hvY29sYXQgYXUgbGFpdCJdfQ==",
  "2026-08-02": "eyJtIjoiTkVXWU9SSyIsImkiOlsiVW5lIGdyb3NzZSBwb21tZSIsIk5vdHJlIHByb2NoYWluZSBkZXN0aW5hdGlvbiBvdXRyZS1hdGxhbnRpcXVlIl19",
  "2026-08-03": "eyJtIjoiVk9ZQUdFIiwiaSI6WyJDZSBxdSdvbiBwcsOpcGFyZSBlbnNlbWJsZSIsIlZhbGlzZSBvYmxpZ2F0b2lyZSJdfQ==",
  "2026-08-04": "eyJtIjoiVEVORFJFU1NFIiwiaSI6WyJFbmNvcmUgcGx1cyBkb3V4IHF1ZSBsJ2Ftb3VyIiwiTmV1ZiBsZXR0cmVzIGRlIGPDomxpbnMiXX0=",
  "2026-08-05": "eyJtIjoiQk9OSEVVUiIsImkiOlsiQ2UgcXVlIHR1IG0nYXBwb3J0ZXMiLCJTaW1wbGUsIGV0IGltbWVuc2UiXX0=",
};

/* Liste de secours : utilisee automatiquement si aucun mot n'est prevu pour
   la date du jour. Pas besoin d'y toucher. */
const RESERVE = [
  "eyJtIjoiQU1PVVIiLCJpIjpbIkxlIG1vdCBsZSBwbHVzIHNpbXBsZSBkdSBtb25kZSIsIkNpbnEgbGV0dHJlcywgdG91dCB1biBwcm9ncmFtbWUiXX0=",
  "eyJtIjoiQklTT1VTIiwiaSI6WyJDZSBxdWUgamUgdCdlbnZvaWUgcGFyIG1lc3NhZ2UiLCJUb3Vqb3VycyBhdSBwbHVyaWVsIl19",
  "eyJtIjoiQ09NUExJQ0UiLCJpIjpbIkNlIHF1J29uIGVzdCB0b3VzIGxlcyBkZXV4IiwiVW4gcmVnYXJkIHN1ZmZpdCJdfQ==",
  "eyJtIjoiRE9VQ0VVUiIsImkiOlsiTGUgY29udHJhaXJlIGRlIGxhIGJydXNxdWVyaWUiLCJDJ2VzdCB0YSBtYXJxdWUgZGUgZmFicmlxdWUiXX0=",
  "eyJtIjoiUFJJTlRFTVBTIiwiaSI6WyJMYSBzYWlzb24gZGVzIGZsZXVycyIsIkp1c3RlIGFwcsOocyBsJ2hpdmVyIl19",
  "eyJtIjoiUEFQSUxMT04iLCJpIjpbIklsIHZvbGUgZGUgZmxldXIgZW4gZmxldXIiLCJKJ2VuIGFpIGRhbnMgbGUgdmVudHJlIGF2YW50IGRlIHRlIHZvaXIiXX0=",
  "eyJtIjoiw4lURVJOSVTDiSIsImkiOlsiTGUgdGVtcHMgcXVlIGplIHZldXggcGFzc2VyIGF2ZWMgdG9pIiwiUGx1cyBsb25nIHF1ZSB0csOocyBsb25ndGVtcHMiXX0=",
  "eyJtIjoiQ0jDiVJJRSIsImkiOlsiQ29tbWVudCBqZSB0J2FwcGVsbGUiLCJTaXggbGV0dHJlcywgdHLDqHMgc291dmVudCB1dGlsaXPDqWVzIl19",
  "eyJtIjoiUEFTU0lPTiIsImkiOlsiQ2UgcXVpIGJyw7tsZSBldCBuZSBzJ8OpdGVpbnQgcGFzIiwiw4dhIG5lIHNlIGNvbW1hbmRlIHBhcyJdfQ==",
  "eyJtIjoiUFJPTUVTU0UiLCJpIjpbIlF1ZWxxdWUgY2hvc2UgcXUnb24gdGllbnQiLCJKZSB0J2VuIGFpIGZhaXQgcXVlbHF1ZXMtdW5lcyJdfQ==",
  "eyJtIjoiU09MRUlMIiwiaSI6WyJUdSBlcyBsZSBtaWVuIiwiSWwgc2UgbMOodmUgY2hhcXVlIG1hdGluIl19",
  "eyJtIjoiREVTVElOIiwiaSI6WyJDZSBxdWkgbm91cyBhIGZhaXQgbm91cyByZW5jb250cmVyIiwiQ2VydGFpbnMgbid5IGNyb2llbnQgcGFzIl19",
  "eyJtIjoiTUVSVkVJTExFIiwiaSI6WyJMYSBodWl0acOobWUgZHUgbW9uZGUsIGMnZXN0IHRvaSIsIk5ldWYgbGV0dHJlcyBkJ8OpbWVydmVpbGxlbWVudCJdfQ==",
  "eyJtIjoiVE9VSk9VUlMiLCJpIjpbIkNvbWJpZW4gZGUgdGVtcHMgamUgdCdhaW1lcmFpIiwiTGUgY29udHJhaXJlIGRlIGphbWFpcyJdfQ==",
  "eyJtIjoiTUFHSVFVRSIsImkiOlsiQ2UgcXVlIHNvbnQgbm9zIG1vbWVudHMiLCJDb21tZSB1biB0b3VyIGRlIHBhc3NlLXBhc3NlIl19",
  "eyJtIjoiRU1CUkFTU0VSIiwiaSI6WyJMZSB2ZXJiZSBwcsOpZsOpcsOpIGRlcyBhbW91cmV1eCIsIsOHYSBzZSBmYWl0IMOgIGRldXgsIHNhbnMgcGFybGVyIl19",
];

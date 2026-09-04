/* =====================================================================
   LES MOTS DU JEU
   =====================================================================

   CALENDRIER associe une date au mot propose ce jour-la.
   Format d'une ligne :  "AAAA-MM-JJ": "chaine-encodee",

   Chaque chaine encode un objet { m: le mot, i: [indice 1, indice 2] }.
   Les lignes encodees sont produites par admin.html ou par le generateur.

   L'encodage base64 sert uniquement a rendre les mots illisibles a la simple
   lecture du fichier. Ce n'est pas du chiffrement : la chaine reste
   decodable par qui s'en donne la peine.
   ===================================================================== */

const CALENDRIER = {
  "2026-07-30": "eyJtIjoiQ8OCTElOUyIsImkiOlsiQ2UgcXVlIGplIHRlIHZvbGUgbGUgbWF0aW4iLCJFdCBqJ2VuIHZldXggdG91am91cnMgdW4gZGUgcGx1cyJdfQ==",
  "2026-07-31": "eyJtIjoiQkFSQ0VMT05FIiwiaSI6WyJMw6Agb8O5IGxlcyBtb2ppdG9zIHNvbnQgdW4gcGV1IHRyb3AgY2hhcmfDqXMiLCJOb3RyZSBwcmVtaWVyIGRhdGUgKG5vbiBvZmZpY2llbC4uLikiXX0=",
  "2026-08-01": "eyJtIjoiRlJBTlVJIiwiaSI6WyJOb3RyZSBww6ljaMOpIG1pZ25vbiBkZXZhbnQgdW4gZmlsbSIsIk9uIGxlIHByw6lmw6hyZSDDoCBsYSBmcmFtYm9pc2UgZXQgYXUgY2hvY29sYXQgYXUgbGFpdCJdfQ==",
  "2026-08-02": "eyJtIjoiTkVXWU9SSyIsImkiOlsiVW5lIGdyb3NzZSBwb21tZSIsIk5vdHJlIHByb2NoYWluZSBkZXN0aW5hdGlvbiBvdXRyZS1hdGxhbnRpcXVlIl19",
  "2026-08-03": "eyJtIjoiVk9ZQUdFIiwiaSI6WyJDZSBxdSdvbiBwcsOpcGFyZSBlbnNlbWJsZSIsIlZhbGlzZSBvYmxpZ2F0b2lyZSJdfQ==",
  "2026-08-04": "eyJtIjoiVEVORFJFU1NFIiwiaSI6WyJFbmNvcmUgcGx1cyBkb3V4IHF1ZSBsJ2Ftb3VyIiwiTmV1ZiBsZXR0cmVzIGRlIGPDomxpbnMiXX0=",
  "2026-08-05": "eyJtIjoiQk9OSEVVUiIsImkiOlsiQ2UgcXVlIHR1IG0nYXBwb3J0ZXMiLCJTaW1wbGUsIGV0IGltbWVuc2UiXX0=",
  "2026-09-04": "eyJtIjoiUkFZT05OQU5URSIsImkiOlsiTGEgcHJlbWnDqHJlIGNob3NlIHF1ZSBqJ2FpIHJlbWFycXXDqWUgY2hleiB0b2kiLCJUdSBsZSBmYWlzIHNhbnMgdCdlbiByZW5kcmUgY29tcHRlIl19",
  "2026-09-05": "eyJtIjoiUEFSRlVNIiwiaSI6WyJMYSBtZWlsbGV1cmUgZGUgdG91dGVzIGxlcyBvZGV1cnMiLCJQYXJpcy1WZW5pc2UiXX0=",
  "2026-09-06": "eyJtIjoiTU9OVFJFQUwiLCJpIjpbIkluZGllbiBsJ8OpdMOpLCBmcm9pZCBsJ2hpdmVyIiwiVGEgcHJvY2hhaW5lIGRlc3RpbmF0aW9uIHZhY2FuY2VzIGVuIGFtb3VyZXV4Il19",
  "2026-09-07": "eyJtIjoiw4lWSURFTkNFIiwiaSI6WyJDZSBxdWUgYyfDqXRhaXQsIGTDqHMgbGUgcHJlbWllciBqb3VyIiwiSHVpdCBsZXR0cmVzLCBldCBhdWN1bmUgaMOpc2l0YXRpb24iXX0=",
  "2026-09-08": "eyJtIjoiQ09VRVRURSIsImkiOlsiT24gbCdlbmzDqHZlIHZpdGUgcXVhbmQgaWwgZmFpdCB0cm9wIGNoYXVkIiwiSmUgcHLDqWbDqHJlIHF1YW5kIGMnZXN0IHRvaSJdfQ==",
  "2026-09-09": "eyJtIjoiTFVNScOIUkUiLCJpIjpbIkNlIHF1ZSB0dSBtZXRzIGRhbnMgbWVzIGpvdXJuw6llcyIsIkVsbGUgdHJhdmVyc2UgbGVzIHJpZGVhdXggYXUgcsOpdmVpbCJdfQ==",
  "2026-09-10": "eyJtIjoiQVZFTlRVUkUiLCJpIjpbIkNlIHF1J29uIHZpdCB0b3VzIGxlcyBkZXV4IiwiSmUgdmV1eCB0b3V0ZXMgbGVzIGZhaXJlIGF2ZWMgdG9pIl19",
  "2026-09-11": "eyJtIjoiT1VSU09OIiwiaSI6WyJJbWJpYsOpIGRlIHBhcmZ1bSIsIkRlcyBncm9zIGPDomxpbnMgZW4gYXR0ZW5kYW50IGRlIHRlIHJldHJvdXZlciJdfQ==",
  "2026-09-12": "eyJtIjoiUEhPVE9TIiwiaSI6WyJOb3MgbWVpbGxldXJzIHNvdXZlbmlycyBwaHlzaXF1ZXMiLCJQb3VyIGTDqWNvcmVyIG5vcyBjaGFtYnJlcyBldCB0b3Vqb3VycyBwZW5zZXIgw6Agbm91cyJdfQ==",
  "2026-09-13": "eyJtIjoiw4lUT0lMRVMiLCJpIjpbIkNlIGNvbW1lIHF1b2kgdHUgYnJpbGxlcyIsIklsIHkgZW4gYSBwbGVpbiBkYW5zIHRlcyB5ZXV4Il19",
  "2026-09-14": "eyJtIjoiTUFMVEUiLCJpIjpbIk9uIHkgYSDDqWNoYW5nw6kgYmVhdWNvdXAgZGUgYmlzb3VzIGNldCDDqXTDqS4uLiIsIlNvaXLDqWVzLCBwbGFnZXMsIG3DqWRpdGVycmFuw6kiXX0=",
  "2026-09-15": "eyJtIjoiRlJJU1NPTiIsImkiOlsiSidlbiBhaSBwbGVpbiByaWVuIHF1J2VuIHBlbnNhbnQgw6AgdG9pIiwiQ2UgcXVlIHR1IHJlc3NlbnMgcXVhbmQgamUgdGUgY2FyZXNzZSJdfQ==",
};

/* Liste de secours, utilisee automatiquement quand aucun mot n'est prevu pour
   la date du jour. L'index tourne avec le nombre de jours ecoules, ce qui
   garantit qu'une date donnee tombe toujours sur le meme mot. */
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

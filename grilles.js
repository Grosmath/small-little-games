/* =====================================================================
   LES GRILLES DE MOTS CROISES
   =====================================================================

   Une grille par semaine. La cle est le lundi ou la grille entre en service :
   la page retient la grille la plus recente dont la date est deja passee, donc
   une grille reste affichee jusqu'a ce que la suivante prenne le relais.

   Format :  "AAAA-MM-JJ": "chaine-encodee",

   Chaque chaine encode un objet { t: theme, l: lignes, c: colonnes,
   m: [ { m: le mot, r: ligne, c: colonne, d: "h" ou "v", i: indice } ] }.
   La grille affichee et la numerotation sont deduites de cette liste.

   Trois invariants sont verifies avant encodage, et une grille qui en viole
   un n'est pas publiee :
     - les lettres partagees par deux mots qui se croisent coincident ;
     - deux mots paralleles ne se touchent jamais, faute de quoi la lecture
       ferait apparaitre des suites de lettres involontaires ;
     - tous les mots forment un seul bloc relie par leurs croisements.
   ===================================================================== */

const GRILLES = {
  "2026-08-10": "eyJ0IjoiVm95YWdlIGVuIGFtb3VyZXV4IiwibCI6MTAsImMiOjksIm0iOlt7Im0iOiJWQUxJU0UiLCJyIjowLCJjIjoyLCJkIjoidiIsImkiOiJDZSBxdSdvbiBib3VjbGUgdG91am91cnMgw6AgbGEgZGVybmnDqHJlIG1pbnV0ZSBhdmFudCBkZSBwYXJ0aXIuIn0seyJtIjoiSE9URUwiLCJyIjoxLCJjIjo0LCJkIjoidiIsImkiOiJMJ2VuZHJvaXQgb8O5IGwnb24gZG9ydCBxdWFuZCBvbiBuJ2VzdCBwYXMgY2hleiBzb2kuIn0seyJtIjoiVFJBSU4iLCJyIjo0LCJjIjo4LCJkIjoidiIsImkiOiJJbCBwYXJ0IGRlIGxhIGdhcmUsIGV0IGlsIG4nYXR0ZW5kIHBlcnNvbm5lLiJ9LHsibSI6IlBIT1RPIiwiciI6OCwiYyI6MiwiZCI6ImgiLCJpIjoiT24gZW4gcHJlbmQgYmVhdWNvdXAgdHJvcCwgZXQgb24gbGVzIHJlZ2FyZGUgZGVzIG1vaXMgcGx1cyB0YXJkLiJ9LHsibSI6IlBBU1NFUE9SVCIsInIiOjQsImMiOjAsImQiOiJoIiwiaSI6IlNhbnMgbHVpLCBsZSB2b3lhZ2UgcydhcnLDqnRlIGF1IGNvbXB0b2lyIGQnZW5yZWdpc3RyZW1lbnQuIn0seyJtIjoiRVNDQVBBREUiLCJyIjowLCJjIjowLCJkIjoidiIsImkiOiJVbiB3ZWVrLWVuZCDDoCBkZXV4LCBkw6ljaWTDqSBzdXIgdW4gY291cCBkZSB0w6p0ZS4ifSx7Im0iOiJIT1JJWk9OIiwiciI6MywiYyI6NiwiZCI6InYiLCJpIjoiTGEgbGlnbmUgcXUnb24gcmVnYXJkZSBsb25ndGVtcHMgc2FucyByaWVuIGRpcmUsIGFzc2lzIGwndW4gY29udHJlIGwnYXV0cmUuIn0seyJtIjoiVklTQSIsInIiOjYsImMiOjUsImQiOiJoIiwiaSI6IlVuIHRhbXBvbiBzdXIgdW5lIHBhZ2UsIHNhbnMgbGVxdWVsIGNlcnRhaW5lcyBmcm9udGnDqHJlcyByZXN0ZW50IGZlcm3DqWVzLiJ9XX0=",
  "2026-08-17": "eyJ0IjoiREosIGZlc3RpdmFscyAmIGhvdXNlIG11c2ljIiwibCI6MTAsImMiOjgsIm0iOlt7Im0iOiJGRVNUSVZBTCIsInIiOjcsImMiOjAsImQiOiJoIiwiaSI6IlRyb2lzIGpvdXJzIGRlIG11c2lxdWUgbm9uLXN0b3AsIGF2ZWMgdW4gYnJhY2VsZXQgYXUgcG9pZ25ldCBldCBkZXMgYmnDqHJlcyBlbiBtYWluLiJ9LHsibSI6IkZPVUxFIiwiciI6MywiYyI6MSwiZCI6InYiLCJpIjoiTGVzIG1pbGxpZXJzIGRlIGJyYXMgbGV2w6lzIGRldmFudCBsYSBzY8OobmUuIn0seyJtIjoiREFOU0VSIiwiciI6OSwiYyI6MiwiZCI6ImgiLCJpIjoiQ2UgcXUnb24gbmUgcGV1dCBwYXMgcydlbXDDqmNoZXIgZGUgZmFpcmUgZMOocyBxdWUgbGUgc29uIGTDqW1hcnJlLiJ9LHsibSI6IkhPVVNFIiwiciI6MCwiYyI6MywiZCI6InYiLCJpIjoiTsOpZSBkYW5zIGxlcyBjbHVicyBkZSBDaGljYWdvIGF1IGTDqWJ1dCBkZXMgYW5uw6llcyA4MCwgZWxsZSBhIGRvbm7DqSBzb24gbm9tIMOgIHRvdXQgdW4gZ2VucmUuIn0seyJtIjoiRklTSEVSIiwiciI6MywiYyI6MSwiZCI6ImgiLCJpIjoiREogQXVzdHJhbGllbiBzdXJ2b2x0w6kgcXVpIGZhaXQgZGFuc2VyIGxhIHBsYW7DqHRlIHRvdWpvdXJzIGF2ZWMgbGEgcMOqY2hlLi4uIn0seyJtIjoiUFJPU1BBIiwiciI6MSwiYyI6MSwiZCI6ImgiLCJpIjoiTGUgRHVvIGJyaXRhbm5pcXVlIHF1aSDCqyBsaWLDqHJlIHRvbiBlc3ByaXQgwrssIGxlIHBsdXMgZW4gdm9ndWUgZHUgbW9tZW50LiJ9LHsibSI6IlVOVlJTIiwiciI6NSwiYyI6NSwiZCI6InYiLCJpIjoiQ2x1YiBkw6ltZXN1csOpIGQnSWJpemEsIG/DuSBzZSByw6l2w6hsZW50IHBhcmZvaXMgbGVzIHByZW1pw6hyZXMgbHVldXJzIGRlIHNvbGVpbC4ifSx7Im0iOiJCT0lMRVIiLCJyIjo0LCJjIjo3LCJkIjoidiIsImkiOiJTb2lyw6llIGlkw6lhbGUgcG91ciBlbWJyYXNzZXIgbGUgKGZ1dHVyKSBob21tZSBkZSBzYSB2aWUuIn1dfQ==",
};

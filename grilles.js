/* =====================================================================
   LES GRILLES DE MOTS CROISES
   =====================================================================

   Une grille par date. Format :  "AAAA-MM-JJ": "chaine-encodee",

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
  "2026-07-30": "eyJ0IjoiSm9haWxsZXJpZSAmIE1lc3Npa2EiLCJsIjo4LCJjIjoxMSwibSI6W3sibSI6IkRJQU1BTlQiLCJyIjo0LCJjIjowLCJkIjoiaCIsImkiOiJMYSBwbHVzIGR1cmUgZGVzIHBpZXJyZXMgcHLDqWNpZXVzZXMsIGV0IGxhIHJlaW5lIGRlcyBiYWd1ZXMgZGUgZmlhbsOnYWlsbGVzLiJ9LHsibSI6IkVDUklOIiwiciI6MiwiYyI6MCwiZCI6ImgiLCJpIjoiTGEgcGV0aXRlIGJvw650ZSBkYW5zIGxhcXVlbGxlIG9uIG9mZnJlIHVuIGJpam91LiJ9LHsibSI6IkNBUkFUIiwiciI6MCwiYyI6NiwiZCI6InYiLCJpIjoiTCd1bml0w6kgcXVpIHNlcnQgw6AgcGVzZXIgdW4gZGlhbWFudC4ifSx7Im0iOiJFQ0xBVCIsInIiOjcsImMiOjMsImQiOiJoIiwiaSI6IkxhIGx1bWnDqHJlIHF1ZSByZW52b2llIHVuZSBwaWVycmUgYmllbiB0YWlsbMOpZS4ifSx7Im0iOiJNT1ZFIiwiciI6NCwiYyI6MywiZCI6InYiLCJpIjoiVHJvaXMgZGlhbWFudHMgcXVpIGdsaXNzZW50IGxpYnJlbWVudCBsZSBsb25nIGQndW4gcmFpbCA6IGxhIGNvbGxlY3Rpb24gc2lnbmF0dXJlIGRlIGxhIG1haXNvbi4ifSx7Im0iOiJHQVRTQlkiLCJyIjoxLCJjIjo1LCJkIjoiaCIsImkiOiJDb2xsZWN0aW9uIEFydCBkw6ljbyBkZSBsYSBtYWlzb24sIHF1aSBkb2l0IHNvbiBub20gw6AgdW4gaMOpcm9zIGRlIEZpdHpnZXJhbGQuIn0seyJtIjoiU0tJTk5ZIiwiciI6MSwiYyI6OCwiZCI6InYiLCJpIjoiwqsgVG91dCBmaW4gwrsgZW4gYW5nbGFpcywgZXQgbGUgbm9tIGR1IGJyYWNlbGV0IGxlIHBsdXMgbWluY2UgZGUgbGEgbWFpc29uLiJ9LHsibSI6IlZFTkRPTUUiLCJyIjoxLCJjIjowLCJkIjoidiIsImkiOiJMYSBwbGFjZSBwYXJpc2llbm5lIGRlcyBncmFuZHMgam9haWxsaWVycywgY2VsbGUgZGUgbGEgY29sb25uZS4ifV19",
};

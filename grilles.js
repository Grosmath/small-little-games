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
  "2026-08-17": "eyJ0IjoiREosIGZlc3RpdmFscyAmIGhvdXNlIG11c2ljIiwibCI6OCwiYyI6OCwibSI6W3sibSI6IkZFU1RJVkFMIiwiciI6MywiYyI6MCwiZCI6ImgiLCJpIjoiVHJvaXMgam91cnMgZGUgbXVzaXF1ZSBkYW5zIHVuIGNoYW1wLCBhdmVjIHVuIGJyYWNlbGV0IGF1IHBvaWduZXQuIn0seyJtIjoiREFOU0UiLCJyIjoyLCJjIjo2LCJkIjoidiIsImkiOiJDZSBxdSdvbiBzZSByZW1ldCDDoCBmYWlyZSBkw6hzIHF1ZSBsYSBiYXNzZSByZXBhcnQuIn0seyJtIjoiRk9VTEUiLCJyIjozLCJjIjowLCJkIjoidiIsImkiOiJMZXMgbWlsbGllcnMgZGUgYnJhcyBsZXbDqXMgZGV2YW50IGxhIHNjw6huZS4ifSx7Im0iOiJFTlRSRUUiLCJyIjo3LCJjIjowLCJkIjoiaCIsImkiOiJMZSBiaWxsZXQgw6AgbGEgbWFpbiwgYydlc3QgcGFyIGzDoCBxdWUgdG91dCBjb21tZW5jZS4ifSx7Im0iOiJIT1VTRSIsInIiOjAsImMiOjIsImQiOiJ2IiwiaSI6Ik7DqWUgZGFucyBsZXMgY2x1YnMgZGUgQ2hpY2FnbyBhdSBkw6lidXQgZGVzIGFubsOpZXMgODAsIGVsbGUgYSBkb25uw6kgc29uIG5vbSDDoCB0b3V0IHVuIGdlbnJlLiJ9LHsibSI6Ik1JWEFHRSIsInIiOjIsImMiOjQsImQiOiJ2IiwiaSI6IkxlIHZyYWkgdHJhdmFpbCBkdSBESiA6IHBhc3NlciBkJ3VuIG1vcmNlYXUgYXUgc3VpdmFudCBzYW5zIHF1ZSBwZXJzb25uZSBuZSBzJ2VuIGFwZXLDp29pdmUuIn0seyJtIjoiQkFTU0UiLCJyIjo1LCJjIjozLCJkIjoiaCIsImkiOiJMYSBmcsOpcXVlbmNlIHF1J29uIHNlbnQgZGFucyBsZSB2ZW50cmUgYXZhbnQgbcOqbWUgZGUgbCdlbnRlbmRyZS4ifSx7Im0iOiJIWU1ORSIsInIiOjAsImMiOjIsImQiOiJoIiwiaSI6IkxlIG1vcmNlYXUgcXVlIHRvdXRlIGxhIGZvdWxlIHJlcHJlbmQgZW4gY2jFk3VyLCBjZWx1aSBkZSBsJ8OpdMOpLiJ9XX0=",
};

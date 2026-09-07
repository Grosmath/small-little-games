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

   Les placements sont verifies avant encodage : lettres coherentes aux
   croisements, aucun contact entre mots paralleles, et un seul bloc relie.
   ===================================================================== */

const GRILLES = {
  "2026-08-31": "eyJ0IjoiTsO0dHJlIGPDtHTDqSBnb3VybWFuZCIsImwiOjEyLCJjIjo5LCJtIjpbeyJtIjoiTU9aQVJFTExBIiwiciI6NiwiYyI6MCwiZCI6ImgiLCJpIjoiTGUgZnJvbWFnZSBpdGFsaWVuIGJsYW5jIGV0IGZpbGFudCBxdWkgdmEgZGVzc3VzLiJ9LHsibSI6IkNIQU5USUxMWSIsInIiOjAsImMiOjYsImQiOiJ2IiwiaSI6IkNyw6htZSBmb3VldHTDqWUgZXQgc3VjcsOpZSwgZWxsZSBmaW5pdCBzdXIgw6AgcGV1IHByw6hzIHRvdXQuIn0seyJtIjoiQ0hPQ09MQVQiLCJyIjo0LCJjIjoxLCJkIjoidiIsImkiOiJOb2lyLCBhdSBsYWl0IG91IGJsYW5jIDogaWwgbWV0IHRvdXQgbGUgbW9uZGUgZCdhY2NvcmQuIn0seyJtIjoiRkFKSVRBUyIsInIiOjUsImMiOjMsImQiOiJ2IiwiaSI6IkxlcyBnYWxldHRlcyBtZXhpY2FpbmVzIHF1J29uIGdhcm5pdCBzb2ktbcOqbWUgw6AgdGFibGUuIn0seyJtIjoiRlJBTlVJIiwiciI6MywiYyI6MywiZCI6ImgiLCJpIjoiTm90cmUgcMOpY2jDqSBtaWdub24gZGV2YW50IHVuIGZpbG0uIn0seyJtIjoiVEFHQURBIiwiciI6MTAsImMiOjAsImQiOiJoIiwiaSI6IkxhIGZyYWlzZSBlbiBib25ib24sIHJvc2UgZXQgY291dmVydGUgZGUgc3VjcmUuIn0seyJtIjoiUElaWkEiLCJyIjoyLCJjIjo4LCJkIjoidiIsImkiOiJPbiBzZSBkaXNwdXRlIHRvdWpvdXJzIGxhIGRlcm5pw6hyZSBwYXJ0LiJ9LHsibSI6IkdMQUNFIiwiciI6MCwiYyI6MywiZCI6ImgiLCJpIjoiRGV1eCBib3VsZXMgZW4gw6l0w6ksIGV0IHRhbnQgcGlzIHBvdXIgbGUgcmVzdGUuIn1dfQ==",
  "2026-09-07": "eyJ0IjoiTm9zIGZpbG1zIGZhdm9yaXMiLCJsIjoxMywiYyI6MTEsIm0iOlt7Im0iOiJWRVJZQkFEVFJJUCIsInIiOjYsImMiOjAsImQiOiJoIiwiaSI6IlVuIGVudGVycmVtZW50IGRlIHZpZSBkZSBnYXLDp29uIMOgIExhcyBWZWdhcywgZXQgbGUgdHJvdSBub2lyIGF1IHLDqXZlaWwuIn0seyJtIjoiQ09FWElTVEVSIiwiciI6MCwiYyI6NywiZCI6InYiLCJpIjoiVW4gcHJvZHVjdGV1ciBtb250ZSB1biBncm91cGUgYXZlYyB1biByYWJiaW4sIHVuIHByw6p0cmUgZXQgdW4gaW1hbS4ifSx7Im0iOiJaT09UT1BJRSIsInIiOjIsImMiOjAsImQiOiJoIiwiaSI6IkxhIHZpbGxlIG/DuSB1bmUgbGFwaW5lIHBvbGljacOocmUgZmFpdCDDqXF1aXBlIGF2ZWMgdW4gcmVuYXJkLiJ9LHsibSI6IklMTFVTSU9OIiwiciI6NCwiYyI6MiwiZCI6ImgiLCJpIjoiSnVzdGUgdW5lLi4uIDogbGUgdG91dCBwcmVtaWVyIHF1J29uIGVzdCBhbGzDqXMgdm9pciBlbnNlbWJsZSBhdSBjaW7DqW1hLiJ9LHsibSI6IkFTVEVSSVgiLCJyIjo2LCJjIjo1LCJkIjoidiIsImkiOiJMZSBwZXRpdCBHYXVsb2lzIG1vdXN0YWNodSBldCBzYSBwb3Rpb24gbWFnaXF1ZS4ifSx7Im0iOiJTVElUQ0giLCJyIjowLCJjIjozLCJkIjoiaCIsImkiOiJMJ2V4cMOpcmllbmNlIDYyNiwgYmxldWUsIMOgIHNpeCBwYXR0ZXMgZXQgaW5jb250csO0bGFibGUuIn0seyJtIjoiU01JVEgiLCJyIjoxMSwiYyI6MywiZCI6ImgiLCJpIjoiTW9uc2lldXIgZXQgTWFkYW1lIDogbWFyacOpcywgZXQgdHVldXJzIMOgIGdhZ2VzIGNoYWN1biBkZSBzb24gY8O0dMOpLiJ9LHsibSI6IkJSRUYiLCJyIjo5LCJjIjozLCJkIjoiaCIsImkiOiJFbiBkZXV4IG1pbnV0ZXMgZXQgw6AgdG91dGUgdml0ZXNzZSwgbGEgdmllIGQndW4gdHJlbnRlbmFpcmUgcGFyaXNpZW4uIn1dfQ==",
};

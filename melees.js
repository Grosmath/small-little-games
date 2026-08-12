/* =====================================================================
   LES GRILLES DE MOTS MELES
   =====================================================================

   Une grille par semaine. La cle est le mercredi ou la grille entre en
   service : la page retient la grille la plus recente dont la date est
   deja passee, donc une grille reste affichee jusqu'a la suivante.

   Format :  "AAAA-MM-JJ": "chaine-encodee",

   Chaque chaine encode un objet { t: theme, n: cote de la grille,
   g: les n*n lettres bout a bout ligne par ligne,
   m: [ { m: le mot, r: ligne, c: colonne, d: sens } ] }.

   Les sens possibles sont E (horizontal), S (vertical), SE et NE
   (diagonales) : aucun mot ne s'ecrit a l'envers.

   Les placements sont calcules puis verifies par un script : chaque mot
   est relu dans la grille finale avant encodage. Une grille modifiee a la
   main perdrait cette garantie.
   ===================================================================== */

const MELEES = {
  "2026-08-12": "eyJ0IjoiUmllbiBxdWUgbm91cyBkZXV4IiwibiI6OSwiZyI6Ik5FVVNQSEFTRUxaWE9WSFVURUVGU1VDT05IRUdWUlBTU1VBWkxRWElMQ1FDVktBQlJTWFVBTENBUkVTU0VMTUVTSU5NUk9JQ1NGUkVMUlNOUyIsIm0iOlt7Im0iOiJDQVJFU1NFIiwiciI6NiwiYyI6MCwiZCI6IkUifSx7Im0iOiJGUklTU09OIiwiciI6MiwiYyI6MSwiZCI6IlNFIn0seyJtIjoiU09VUElSIiwiciI6MCwiYyI6MywiZCI6IlMifSx7Im0iOiJCSVNPVVMiLCJyIjo1LCJjIjoyLCJkIjoiTkUifSx7Im0iOiJOVVFVRSIsInIiOjIsImMiOjYsImQiOiJTIn0seyJtIjoiQ0FMSU4iLCJyIjo0LCJjIjo3LCJkIjoiUyJ9XX0=",
  "2026-08-19": "eyJ0IjoiUGV0aXRlcyB0ZW50YXRpb25zIiwibiI6OSwiZyI6IlJMQ1FDQ0tPUlJQRUVJSE5UUlFNQVZFQUVJTUlTT1JSTExJQVNGVFJGRVROU0lXVk5EVVNPU0tJVUVBUk1TQVVIUEVBU0VFR0RZQ09RVUlORSIsIm0iOlt7Im0iOiJNQVNTQUdFIiwiciI6MiwiYyI6OCwiZCI6IlMifSx7Im0iOiJDT1FVSU5FIiwiciI6OCwiYyI6MiwiZCI6IkUifSx7Im0iOiJDSEFMRVVSIiwiciI6MCwiYyI6NSwiZCI6IlMifSx7Im0iOiJNT1JEUkUiLCJyIjoyLCJjIjoxLCJkIjoiU0UifSx7Im0iOiJMRVZSRVMiLCJyIjowLCJjIjoxLCJkIjoiU0UifSx7Im0iOiJQQVJGVU0iLCJyIjoxLCJjIjoxLCJkIjoiU0UifV19",
};

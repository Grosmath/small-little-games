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
  "2026-09-02": "eyJ0IjoiU291cyBsYSBjb3VldHRlIiwibiI6OSwiZyI6IklPTkpIRVZTT01VUk1VUkVPQkNPVUVUVEVVSUhGVU5JTkVGU0laQ1NJTEFGT0xDVUxIUUxMVUlDQVJFU1NFU09DUExBSVNJUkVUR0FURVJJRSIsIm0iOlt7Im0iOiJPUkVJTExFUiIsInIiOjAsImMiOjEsImQiOiJTRSJ9LHsibSI6IkNBUkVTU0VTIiwiciI6NiwiYyI6MSwiZCI6IkUifSx7Im0iOiJDT1VFVFRFIiwiciI6MiwiYyI6MCwiZCI6IkUifSx7Im0iOiJNVVJNVVJFIiwiciI6MSwiYyI6MCwiZCI6IkUifSx7Im0iOiJTT1VGRkxFIiwiciI6MCwiYyI6NywiZCI6IlMifSx7Im0iOiJQTEFJU0lSIiwiciI6NywiYyI6MiwiZCI6IkUifSx7Im0iOiJHQVRFUklFIiwiciI6OCwiYyI6MiwiZCI6IkUifSx7Im0iOiJCSVNPVVMiLCJyIjoxLCJjIjo4LCJkIjoiUyJ9LHsibSI6IkNBTElOIiwiciI6NywiYyI6MSwiZCI6Ik5FIn1dfQ==",
  "2026-09-09": "eyJ0IjoiVm95YWdlIGF1IHRyZW1ibGFudCBDYW5hZGllbiIsIm4iOjksImciOiJPQUZRRFJEQU1QREFVVE9NTkVTTUNFUkFCTEVDTFBCUURJTU9PRFVFSVRTVUNQUk5DRFJUUlFKTUFSVUlBU0dDTElPUlBJUlJBUExMTFVZSUEiLCJtIjpbeyJtIjoiUk9BRFRSSVAiLCJyIjowLCJjIjo1LCJkIjoiUyJ9LHsibSI6IkFVVE9NTkUiLCJyIjoxLCJjIjoyLCJkIjoiRSJ9LHsibSI6IlFVRUJFQyIsInIiOjAsImMiOjMsImQiOiJTIn0seyJtIjoiRVJBQkxFIiwiciI6MiwiYyI6MywiZCI6IkUifSx7Im0iOiJPVVJTIiwiciI6NywiYyI6MywiZCI6Ik5FIn0seyJtIjoiUEFSQyIsInIiOjcsImMiOjUsImQiOiJORSJ9LHsibSI6IkxBQyIsInIiOjcsImMiOjEsImQiOiJORSJ9XX0=",
};

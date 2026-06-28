# -*- coding: utf-8 -*-
import json, os
base = os.path.join(os.path.dirname(__file__), "..", "src", "data")
base = os.path.abspath(base)
teams = json.load(open(os.path.join(base, 'mundial-teams.json'), encoding='utf-8'))
es2en = {t['name']['es']: t['name']['en'] for t in teams}

fr = {
 "México": "Mexique", "Corea del Sur": "Corée du Sud", "Chequia": "Tchéquie", "Sudáfrica": "Afrique du Sud",
 "Suiza": "Suisse", "Canadá": "Canada", "Catar": "Qatar", "Bosnia y Herzegovina": "Bosnie-Herzégovine",
 "Brasil": "Brésil", "Marruecos": "Maroc", "Escocia": "Écosse", "Haití": "Haïti",
 "Estados Unidos": "États-Unis", "Australia": "Australie", "Turquía": "Turquie", "Paraguay": "Paraguay",
 "Alemania": "Allemagne", "Ecuador": "Équateur", "Costa de Marfil": "Côte d'Ivoire", "Curazao": "Curaçao",
 "Países Bajos": "Pays-Bas", "Japón": "Japon", "Suecia": "Suède", "Túnez": "Tunisie",
 "Bélgica": "Belgique", "Irán": "Iran", "Egipto": "Égypte", "Nueva Zelanda": "Nouvelle-Zélande",
 "España": "Espagne", "Uruguay": "Uruguay", "Arabia Saudita": "Arabie saoudite", "Cabo Verde": "Cap-Vert",
 "Francia": "France", "Senegal": "Sénégal", "Noruega": "Norvège", "Irak": "Irak",
 "Argentina": "Argentine", "Austria": "Autriche", "Argelia": "Algérie", "Jordania": "Jordanie",
 "Portugal": "Portugal", "Colombia": "Colombie", "RD Congo": "RD Congo", "Uzbekistán": "Ouzbékistan",
 "Inglaterra": "Angleterre", "Croacia": "Croatie", "Panamá": "Panama", "Ghana": "Ghana",
}
code = {
 "México": "mex", "Corea del Sur": "kor", "Chequia": "cze", "Sudáfrica": "rsa",
 "Suiza": "sui", "Canadá": "can", "Catar": "qat", "Bosnia y Herzegovina": "bih",
 "Brasil": "bra", "Marruecos": "mar", "Escocia": "sco", "Haití": "hai",
 "Estados Unidos": "usa", "Australia": "aus", "Turquía": "tur", "Paraguay": "par",
 "Alemania": "ger", "Ecuador": "ecu", "Costa de Marfil": "civ", "Curazao": "cuw",
 "Países Bajos": "ned", "Japón": "jpn", "Suecia": "swe", "Túnez": "tun",
 "Bélgica": "bel", "Irán": "irn", "Egipto": "egy", "Nueva Zelanda": "nzl",
 "España": "esp", "Uruguay": "uru", "Arabia Saudita": "ksa", "Cabo Verde": "cpv",
 "Francia": "fra", "Senegal": "sen", "Noruega": "nor", "Irak": "irq",
 "Argentina": "arg", "Austria": "aut", "Argelia": "alg", "Jordania": "jor",
 "Portugal": "por", "Colombia": "col", "RD Congo": "cod", "Uzbekistán": "uzb",
 "Inglaterra": "eng", "Croacia": "cro", "Panamá": "pan", "Ghana": "gha",
}
mx_slug = {"Ciudad de México": "ciudad-de-mexico", "Guadalajara": "guadalajara", "Zapopan": "guadalajara",
           "Monterrey": "monterrey", "Guadalupe": "monterrey"}


def slug_for(city):
    for k, v in mx_slug.items():
        if k in city:
            return v
    return None


# (date, teamA_es, scoreA, scoreB, teamB_es, city)
data = {
 "B": [("2026-06-12", "Canadá", 1, 1, "Bosnia y Herzegovina", "Toronto"),
       ("2026-06-13", "Catar", 1, 1, "Suiza", "Santa Clara"),
       ("2026-06-18", "Suiza", 4, 1, "Bosnia y Herzegovina", "Inglewood"),
       ("2026-06-18", "Canadá", 6, 0, "Catar", "Vancouver"),
       ("2026-06-24", "Suiza", 2, 1, "Canadá", "Vancouver"),
       ("2026-06-24", "Bosnia y Herzegovina", 3, 1, "Catar", "Seattle")],
 "C": [("2026-06-13", "Brasil", 1, 1, "Marruecos", "East Rutherford"),
       ("2026-06-13", "Haití", 0, 1, "Escocia", "Foxborough"),
       ("2026-06-19", "Escocia", 0, 1, "Marruecos", "Foxborough"),
       ("2026-06-19", "Brasil", 3, 0, "Haití", "Filadelfia"),
       ("2026-06-24", "Escocia", 0, 3, "Brasil", "Miami"),
       ("2026-06-24", "Marruecos", 4, 2, "Haití", "Atlanta")],
 "D": [("2026-06-12", "Estados Unidos", 4, 1, "Paraguay", "Inglewood"),
       ("2026-06-13", "Australia", 2, 0, "Turquía", "Vancouver"),
       ("2026-06-19", "Estados Unidos", 2, 0, "Australia", "Seattle"),
       ("2026-06-19", "Turquía", 0, 1, "Paraguay", "Santa Clara"),
       ("2026-06-25", "Turquía", 3, 2, "Estados Unidos", "Inglewood"),
       ("2026-06-25", "Paraguay", 0, 0, "Australia", "Santa Clara")],
 "E": [("2026-06-14", "Alemania", 7, 1, "Curazao", "Houston"),
       ("2026-06-14", "Costa de Marfil", 1, 0, "Ecuador", "Filadelfia"),
       ("2026-06-20", "Alemania", 2, 1, "Costa de Marfil", "Toronto"),
       ("2026-06-20", "Ecuador", 0, 0, "Curazao", "Kansas City"),
       ("2026-06-25", "Curazao", 0, 2, "Costa de Marfil", "Filadelfia"),
       ("2026-06-25", "Ecuador", 2, 1, "Alemania", "East Rutherford")],
 "F": [("2026-06-14", "Países Bajos", 2, 2, "Japón", "Arlington"),
       ("2026-06-14", "Suecia", 5, 1, "Túnez", "Monterrey"),
       ("2026-06-20", "Países Bajos", 5, 1, "Suecia", "Houston"),
       ("2026-06-20", "Japón", 4, 0, "Túnez", "Monterrey"),
       ("2026-06-25", "Japón", 1, 1, "Suecia", "Arlington"),
       ("2026-06-25", "Países Bajos", 3, 1, "Túnez", "Kansas City")],
 "G": [("2026-06-15", "Bélgica", 1, 1, "Egipto", "Seattle"),
       ("2026-06-15", "Irán", 2, 2, "Nueva Zelanda", "Inglewood"),
       ("2026-06-21", "Bélgica", 0, 0, "Irán", "Inglewood"),
       ("2026-06-21", "Nueva Zelanda", 1, 3, "Egipto", "Vancouver"),
       ("2026-06-26", "Egipto", 1, 1, "Irán", "Seattle"),
       ("2026-06-26", "Nueva Zelanda", 1, 5, "Bélgica", "Vancouver")],
 "H": [("2026-06-15", "España", 0, 0, "Cabo Verde", "Atlanta"),
       ("2026-06-15", "Arabia Saudita", 1, 1, "Uruguay", "Miami"),
       ("2026-06-21", "España", 4, 0, "Arabia Saudita", "Atlanta"),
       ("2026-06-21", "Uruguay", 2, 2, "Cabo Verde", "Miami"),
       ("2026-06-26", "Cabo Verde", 0, 0, "Arabia Saudita", "Houston"),
       ("2026-06-26", "Uruguay", 0, 1, "España", "Guadalajara")],
 "I": [("2026-06-16", "Francia", 3, 1, "Senegal", "East Rutherford"),
       ("2026-06-16", "Irak", 1, 4, "Noruega", "Foxborough"),
       ("2026-06-22", "Francia", 3, 0, "Irak", "Filadelfia"),
       ("2026-06-22", "Noruega", 3, 2, "Senegal", "East Rutherford"),
       ("2026-06-26", "Noruega", 1, 4, "Francia", "Foxborough"),
       ("2026-06-26", "Senegal", 5, 0, "Irak", "Toronto")],
 "J": [("2026-06-16", "Argentina", 3, 0, "Argelia", "Kansas City"),
       ("2026-06-16", "Austria", 3, 1, "Jordania", "Santa Clara"),
       ("2026-06-22", "Argentina", 2, 0, "Austria", "Arlington"),
       ("2026-06-22", "Jordania", 1, 2, "Argelia", "Santa Clara"),
       ("2026-06-27", "Argelia", 3, 3, "Austria", "Kansas City"),
       ("2026-06-27", "Jordania", 1, 3, "Argentina", "Arlington")],
 "K": [("2026-06-17", "Portugal", 1, 1, "RD Congo", "Houston"),
       ("2026-06-17", "Uzbekistán", 1, 3, "Colombia", "Ciudad de México"),
       ("2026-06-23", "Portugal", 5, 0, "Uzbekistán", "Houston"),
       ("2026-06-23", "Colombia", 1, 0, "RD Congo", "Guadalajara"),
       ("2026-06-27", "Colombia", 0, 0, "Portugal", "Miami"),
       ("2026-06-27", "RD Congo", 3, 1, "Uzbekistán", "Atlanta")],
 "L": [("2026-06-17", "Inglaterra", 4, 2, "Croacia", "Arlington"),
       ("2026-06-17", "Ghana", 1, 0, "Panamá", "Toronto"),
       ("2026-06-23", "Inglaterra", 0, 0, "Ghana", "Foxborough"),
       ("2026-06-23", "Panamá", 0, 1, "Croacia", "Toronto"),
       ("2026-06-27", "Panamá", 0, 2, "Inglaterra", "East Rutherford"),
       ("2026-06-27", "Croacia", 2, 1, "Ghana", "Filadelfia")],
}


def team_obj(es):
    o = {"es": es, "en": es2en[es]}
    if es in fr:
        o["fr"] = fr[es]
    return o


existing = json.load(open(os.path.join(base, 'mundial-results.json'), encoding='utf-8'))
out = [m for m in existing if m.get('group') == "A"]

for grp in ["B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"]:
    for (date, a, sa, sb, b, city) in data[grp]:
        out.append({
            "id": grp.lower() + "-" + code[a] + "-" + code[b],
            "group": grp, "date": date, "time": "—",
            "venue": {"es": city, "en": city, "fr": city}, "venueSlug": slug_for(city),
            "isMexicoGame": False,
            "teamA": team_obj(a), "teamB": team_obj(b),
            "scoreA": sa, "scoreB": sb,
        })

ids = [m['id'] for m in out]
dups = set(i for i in ids if ids.count(i) > 1)
assert not dups, "DUP IDS: " + str(dups)
codes = {t['name']['es']: t['code'] for t in teams}
missing = set()
for m in out:
    for s in (m['teamA']['es'], m['teamB']['es']):
        if s not in codes:
            missing.add(s)
assert not missing, "TEAMS NOT IN teams.json: " + str(missing)
json.dump(out, open(os.path.join(base, 'mundial-results.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
print("WROTE", len(out), "matches: 6 in A +", len(out) - 6, "in B-L")

# Vzdalene ovladani vytapeni domu

## Cile MVP

Prvni verze aplikace bude jednoducha, spolehliva a optimalizovana pro mobilni telefon. Jejím hlavnim ukolem bude umoznit bezpecne vzdalené prepinani rezimu vytapeni a zobrazit, jestli Raspberry Pi zmenu skutecne prevzalo a aplikovalo.

MVP zamerne neresi grafy, teplotni dashboardy ani rozsahle nastavovani. Tyto casti budou az v dalsich iteracich.

## Zakladni architektura

Tok dat pro prvni verzi:

`Mobilni prohlizec -> Next.js na Vercel -> Supabase -> Raspberry Pi / Python skript`

Zamer architektury:

- Webova aplikace zapisuje pozadovany rezim do Supabase.
- Raspberry Pi neni verejne dostupne z internetu.
- Raspberry Pi pravidelne cte pozadovany stav ze serveru pres HTTPS API.
- Raspberry Pi potvrzuje, jaky rezim je skutecne aktivni.
- Lokalne rizeni vytapeni zustava na Raspberry Pi i pri vypadku internetu nebo cloudu.

## Technologie

- Frontend: Next.js
- Hosting: Vercel
- Backend a databaze: Supabase
- Autentizace: Supabase Auth
- Databaze: Supabase PostgreSQL s RLS
- Raspberry Pi integrace: existujici Python skript nebo tenka synchronizacni vrstva nad nim

## Funkcni rozsah MVP

Prvni verze ma obsahovat jednu hlavni stranku s temito funkcemi:

- prepnuti pozadovaneho rezimu vytapeni
- zobrazeni pozadovaneho rezimu
- zobrazeni skutecne aktivniho rezimu potvrzeneho Raspberry Pi
- zobrazeni dostupnosti Raspberry Pi
- zobrazeni casu posledni uspesne komunikace
- zobrazeni vysledku posledni pozadovane zmeny

Rezim se nesmi povazovat za aktivni, dokud jeho aplikaci nepotvrdi Raspberry Pi.

## Rezimy

V dosavadnich poznamkach se objevily dve mozne sady rezimu:

Varianta A:

- `AUTO`
- `OFF`
- `MANUAL`
- `FIREPLACE`

Drive zminena varianta B:

- automaticky
- manualni
- vse zapnuto
- vse vypnuto

Aktualne ve stavajicim Python skriptu neni prepinani rezimu samostatne implementovane. Manualni zasahy probiha­ji zakomentovavanim casti ovladani vystupu a natvrdo nastavenymi hodnotami. To znamena, ze webova aplikace nema kopirovat hotovy rezimovy model, ale vytvorit bezpecnou a rozsiritelnou vrstvu, kterou bude mozne postupne doplnit i na strane Raspberry Pi.

Pred implementaci produkcni synchronizace je potreba:

- formalne nadefinovat prvni sadu podporovanych rezimu
- pripravit datovy model tak, aby slo dalsi rezimy pridavat bez zmeny zakladni architektury
- oddelit identifikator rezimu od jeho prezentacniho nazvu a popisu v UI

## Uzivatelske rozhrani

Mobilni telefon je primarni cilove zarizeni. Desktop ma byt podporovany, ale navrh se ma ridit mobile-first pristupem.

Pozadavky na UI:

- velka a prehledna tlacitka pro prepinani rezimu
- vysoka citelnost stavu i na male obrazovce
- jasne oddeleni pozadovaneho rezimu od aktivniho rezimu
- viditelna indikace dostupnosti Raspberry Pi
- minimalni pocet kroku pro zmenu rezimu
- priprava na budouci rozsireni o dalsi stranky a mobilni spodni navigaci

## Bezpecnost a spolehlivost

- pristup do aplikace vyzaduje prihlaseni pres Supabase Auth
- tajne klice nesmi byt dostupne v klientskem JavaScriptu
- pristup k datům bude chranen pres RLS v Supabase
- Raspberry Pi nebude pristupne z verejneho internetu
- pri vypadku internetu musi lokalni regulace fungovat dal podle posledniho platneho stavu
- vzdaleny web nesmi byt podminkou bezpecneho chodu vytapeni

## Minimalni datovy model

Pro prvni verzi staci navrhnout tri zakladni entity:

1. `devices`
   Eviduje registrovane Raspberry Pi zarizeni, jeho identitu, heartbeat a posledni komunikaci.

2. `heating_state`
   Uchovava aktualni serverem evidovany stav systemu, tedy napriklad pozadovany rezim, aktivni rezim, cas posledniho potvrzeni a dostupnost Pi.

3. `mode_change_requests`
   Auditni tabulka pozadavku na zmenu rezimu, jejich stav a vysledek potvrzeni.

Volitelna, ale doporucena ctvrta entita pro dalsi rozvoj:

4. `heating_modes`
   Katalog podporovanych rezimu s poli jako `code`, `label`, `description`, `sort_order`, `is_enabled`. Pro prvni MVP muze byt naplnena staticky nebo seedem, ale schema ma pocitat s budouci rozsiritelnosti.

Tento model umozni drzet oddelene:

- co uzivatel pozadoval
- co Raspberry Pi opravdu aktivovalo
- kdy a jak zmena probehla

## Doporuceny MVP tok zmeny rezimu

1. Prihlaseny uzivatel otevre dashboard.
2. Dashboard nacte aktualni stav z backendu.
3. Uzivatel zvoli novy pozadovany rezim.
4. Server ulozi pozadavek a nastavi novy pozadovany rezim.
5. Raspberry Pi pri dalsim pollingu pozadavek precte.
6. Raspberry Pi aplikuje zmenu podle lokalni logiky Python skriptu.
7. Raspberry Pi potvrdi skutecne aktivni rezim a vysledek operace.
8. UI zobrazi, jestli se pozadavek uspesne projevil.

Pro prvni prototyp je dostacujici polling z Raspberry Pi priblizne kazdych 5 sekund.

## Implementacni kroky

1. Ziskat a analyzovat existujici Python skript, zejmena aktualni zpusob manualnich zasahu, ovladani vystupu a bezpecnostni logiku.
2. Navrhnout prvni sadu rezimu a mapovani na hodnoty v databazi tak, aby bylo mozne bezbolestne pridavat dalsi.
3. Zalozit Next.js projekt s mobile-first layoutem a pripravou pro Vercel.
4. Pridat Supabase Auth a ochranu aplikacnich stranek.
5. Navrhnout a vytvorit minimalni schema Supabase vcetne RLS.
6. Implementovat jednu dashboard stranku pro prepinani rezimu a zobrazeni synchronizace.
7. Implementovat bezpecne serverove endpointy pro cteni stavu a zmenu pozadovaneho rezimu.
8. Implementovat Pi synchronizaci: cteni pozadovaneho rezimu a potvrzovani aktivniho stavu.
9. Otestovat end-to-end scenar zmeny rezimu a chovani pri nedostupnem Raspberry Pi.

## Otevrene body

- chybi existujici Python skript nebo jeho umisteni v repozitari
- finalni sada rezimu zatim neni potvrzena a nema se povazovat za uzavrenou
- neni jeste urceno, jestli bude komunikace Pi realizovana pres Next.js API route nebo pres Supabase Edge Function

Dokud nebude k dispozici Python skript, lze bezpecne rozpracovat webovou kostru, autentizaci, mobilni UI a navrh databaze. Finalni semantiku rezimu je ale potreba uzamknout az po analyze existujici lokalni logiky.
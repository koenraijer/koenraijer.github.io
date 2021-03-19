---
layout: post
author: Koen
category: Gezondheid
tags: Gezondheid Technologie
title: "GPT3/AI/Chatbots in het ziekenhuis?"
---

Ik werd laatst volledig voor de gek gehouden door een robot. Ik luisterde half naar een aflevering van <a target="_blank" href="https://open.spotify.com/episode/782joccUG2sI8i063zOwfT?si=Mek5vJXkTtefRstBGpYR0Q">Podcast over Media</a>, toen na een half uur de aap uit de mouw kwam: alles was door een algoritme dat GPT-3 heet gegeneerd. Ik was om de tuin geleid door een computer. Er flitste een duister toekomstscenario voorbij waarin medische chatbots die op R2D2 lijken te midden van nasmeulende ruïnes met geveinsde menselijkheid gevoelsreflecties rondstrooien. 
Is dat science fiction? Wellicht. Maar dat er een dag komt dat chatbots aangeven dat ze dat toch een wat denigrerende term vinden sluit ik niet uit. Dat ze in de toekomst een rol gaan spelen in de gezondheidszorg ook niet. Moeten we dat überhaupt willen, en onder welke voorwaarden dan? Ik besloot het uit te werken. 

Wat is GPT-3?
- Een deep learning algoritme dat getraind is met grote hoeveelheden tekst afkomstig van het internet en op basis van wat je het voert het meest waarschijnlijke vervolg daarvan genereert. 
- Het is dus een statistisch model, het kan niet denken en het heeft geen bewustzijn. 
- GPT-3 heeft niet als doel, en is ook niet getraind, om de waarheid te zeggen. 
- Klanten gebruiken GPT-3 momenteel om code te voorspellen, een spel te maken, etc. etc. 

Is het niet wat vroeg om daar een blogpost over te schrijven?
- Nee, want de scaling hypothesis is wederom bevestigd met GPT-3, het aantal parameters vertienvoudigd elk jaar en de laatste verbetering leidde tot het passeren van de Türing test voor artikelen van 200 woorden. 

Wat kan GPT-3 in de zorg?
- Experiment in de zorg
- Eigen experimentjes 

Wat vinden mensen daarvan?
- Filmpje David Hoffman over telefoonbandjes
- Indruk chatbots in andere industrieën
- Publieke perceptie chatbots in gezondheidszorg

Moeten we dat willen?
- Het moet ook de waarheid zeggen
- Het moet niet van echt te onderscheiden zijn



Vorig jaar kwam GPT-3 uit: de krachtigste AI tekstgenerator ooit. GPT-3 kan niet denken en het heeft geen bewustzijn. 
Wel <i>voorspelt</i> het op basis van een input het meest waarschijnlijke antwoord. Om dat te kunnen doen is het model getraind met data afkomstig van het internet (code, filmtranscripts, tweets etc.). Er is dus geen garantie dat GPT-3 ook het júíste antwoord gaat geven, maar als de schaalvergroting van deze modellen in de toekomst doorzet, en toekomstige modellen de <i>scaling hypothesis</i> (LINK) blijven bevestigen, zou dat in de toekomst goed anders kunnen zijn. 

Dat vormt ook gelijk de aanleiding voor deze post. Ik ben op zoek gegaan naar de juiste vragen om te stellen, om beter voorbereid te zijn op wat komen gaat. Het lijkt namelijk enkel een kwestie van tijd voordat de eerste voorbeelden van AI in de patiëntenzorg een feit zullen worden. 
<br>Met het oog op GPT-4, tot en met GPT-<i><b>n</b></i>, probeer ik antwoorden op de volgende vragen te geven:

1. Hoe werkt GPT-3?
2. Wat kan GPT-3?
3. Is er al geëxperimenteerd met GPT-3 in de zorg? 
4. Welke vragen moeten we onszelf daarover stellen?

## Hoe werkt GPT-3?
GPT-3 is een <i>deep learning</i> algoritme. Alle deep learning valt onder machine learning, en alle machine learning valt weer onder artificial intelligence (maar niet andersom). Een deep learning algoritme moet getraind worden voordat je er iets mee kunt. Daartoe heeft OpenAI, het bedrijf achter GPT-3, grote hoeveelheden tekst van het internet geplukt, die als <i>input</i> aan het algoritme zijn gevoerd . 

Laten we de volgende zin als voorbeeld beter te begrijpen hoe dat trainen verloopt: <i>mitochondria are the powerhouse of the cell</i>. Daarmee zou je op de volgende manier het algoritme kunnen trainen:
<table>
<tr>
<th>Voorbeeld</th>
<th>Input</th>
<th>Correcte output</th>
</tr>

<tr>
<th>1</th>
<th>Mitochondria</th>
<th>are</th>
</tr>

<tr>
<th>2</th>
<th>Mitochondria are</th>
<th>the</th>
</tr>

<tr>
<th>3</th>
<th>Mitochondria are the</th>
<th>powerhouse</th>
</tr>

<tr>
<th>4</th>
<th>Mitochondria are the powerhouse</th>
<th>of </th>
</tr>
</table>


Bij de eerste input "Mitochondria" is de juiste output "are" maar omdat het algoritme nog niets geleerd heeft krijgt je in werkelijkheid iets willekeurigs, bijvoorbeeld "apple". Het algoritme berekent en kwantificeert vervolgens de grootte van de fout en corrigeert zichzelf. Op deze manier wordt het algoritme bij elke volgende input beter. 

175 miljard parameters, die aanvankelijk uit willekeurige getallen bestaan, worden gedurende de trainingsfase langzaam opgevuld met informatie en maken de <i>outputs</i> van het algoritme steeds beter. 

#### Deep learning
Wat GPT-3 <i>deep learning</i> maakt is de wijze waarop de parameters geordend zijn: in lagen. Elke laag bevat parameters waarmee tijdelijke outputs worden gegenereerd die de volgende laag weer als input kan gebruiken. 

Om een deep learning model te trainen is veel computerkracht, tijd en geld nodig. Zo kostte GPT-3 ongeveer 4,6 miljoen euro om te trainen. Die kosten groeien mee met het aantal parameters. Om efficiënt toepassingen te kunnen ontwikkelen van GPT-3 maakt men gebruik van een techniek die <i>transfer learning</i> heet. Daarbij worden de meeste lagen hergebruikt, en worden de laatste lagen van het model gebruikt om te <i>finetunen</i> voor specifieke toepassingen. 

## Wat kan GPT-3?

GPT-3 heeft vrijwel dezelfde opbouw als de voorganger GPT-2, er zijn alleen meer lagen, bredere lagen en meer data om op te trainen. De grootte van taalmodellen neemt in rap tempo toe. In 2018 had het grootste model 355 miljoen parameters (BERT-Large), in 2019 waren dat er 1.5 miljard (GPT-2) en in datzelfde jaar nog 11 miljard (T5). GPT-3 zorgt opnieuw voor een factor 10 schaalvergroting met 175 miljard parameters. Tegelijkertijd is de architectuur dus niet wezenlijk veranderd. Wat levert al die capaciteit op?

Om daar iets over te kunnen zeggen heeft OpenAI de verschillende versies van zijn model (variërend van 125 miljoen parameters tot 175 miljard) dezelfde opdracht gegeven: genereer artikelen van 200 woorden op basis van een titel en een subtitel. Vervolgens wordt aan mensen gevraagd of ze denken dat het artikel door GPT-3 of door een mens is geschreven. De gemiddelde precisie bij de kleine variant van GPT-3 (die met 125 miljoen parameters) was 76%, maar bij het 175 miljard parameter model was dat 52%: verwaarloosbaar beter dan totale willekeur (50%)! Met andere woorden: <i>GPT-3 passeert de Türing test voor artikelen van 200 woorden </i>. Schijnbaar leidt "simpele" schaalvergroting tot een verbetering van "het werkt de helft van de tijd" naar "het werkt vrijwel altijd". 

Tegelijkertijd genereert GPT-3 nog heel veel (geloofwaardige) onzin. Het is namelijk in de eerste plaats een taalmodel, het is niet gemaakt om de <i>waarheid</i> te vertellen. Het is bovendien getraind met informatie van het internet die niet gecontroleerd is op correctheid. Een groot mankement voor toepassingen in de medische wereld. Onderstaande quote geeft

<blockquote>"The big story about GPT-3 is not that it is smart - it is dumb as a pile of rocks - but that piles of rocks can do many things we thought you needed to be smart for."
– Anders Sandberg, Senior Research Fellow bij Oxford University</blockquote>

#### GPT-3 in het wild
- <a target="_blank" href="https://open.spotify.com/episode/782joccUG2sI8i063zOwfT?si=Mek5vJXkTtefRstBGpYR0Q">deze aflevering</a> van Podcast over Media, waarvan (SPOILER ALERT) de eerste 20 minuten door GPT-3 gegenereerd zijn. Mij namen ze er niet helemaal oplettend in ieder geval mee in de maling. 
- Een gratis te spelen <a target="_blank" href="https://play.aidungeon.io/">text-based spel</a> waar je letterlijk álle kanten mee opkan. Je schets een scenario, vervolgens reageert het algoritme op wat je wil doen of zeggen.
- <a target="_blank" href="https://debuild.co/">debuild.co</a>, beschrijf in normaal Engels hoe je wil dat je website eruit ziet en deze app genereert er code voor. Het demo-filmpje op de website zegt genoeg!


https://lambdalabs.com/blog/demystifying-gpt-3/

https://twitter.com/anderssandberg/status/1285104499531698176?s=20
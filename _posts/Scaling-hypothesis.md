---
layout: post
author: Koen
category: Technologie
tags: Technologie
title: "Scaling hypothesis"
---
Tijdens het schrijven van mijn post over GPT-3, raakte ik gefascineerd door de Scaling Hypothesis. Die stelt dat de prestaties van neurale netwerken zal blijven stijgen met de grootte van het model. Dat riep veel vragen op. Is dat echt zo? En hoe dichtbij artificial general intelligence mogen we hiermee hopen te komen? Of zit er toch een plafond aan, en optimaliseren we alleen voor de zeer nauwe vermogens van neurale netwerken? Wat zijn die vermogens dan? En hoe veel lijken ze op ons?
<!--more-->

Eerst wilde ik beter begrijpen wat natuurkundigen en informatici eigenlijk bedoelen als ze het hebben over scaling laws en machine learning. Ik vond zo gauw eigenlijk geen informatie in gewone taal, dus ik ben uitgeweken naar een praatje van Jared Kaplan, gericht aan natuurkundigen. Kaplan is verbonden aan de Johns Hopkins Universiteit en heeft meegeschreven aan de <a href="https://arxiv.org/abs/2005.14165" target="_blank">publicatie</a> over GPT-3. In de volgende alinea's ga ik een aantal interessante concepten introduceren die ik nog niet kende.  

Taalmodellen zijn autoregressief, ze gebruiken de vorige woorden om één voor één nieuwe woorden te genereren. Telkens als er een nieuw woord is gegenereerd, wordt dat meegewogen bij het voorspellen van het daaropvolgende woord. Het algoritme leert door woorden in vectoren te vertalen en ze vervolgens in een virtuele ruimte, een <i>embedded space</i> te plaatsen. Een vector, zoals wiskunde mij ooit leerde, is een pijl met een richting en een grootte. Woorden met een overeenkomende vector, zullen ons ook als overeenkomstig aandoen. Zo zullen de vectoren koning&#10231;koningin en man&#10231;vrouw overeenkomen, maar ook: zwem&#10231;zwom, loop&#10231;liep. Alle associaties die wij hebben tussen woorden, drukken taalmoddelen dus uit in vectoren.

Dan is er het idee van de architectuur van een model. Elke zoveel jaar wordt een nieuwe architectuur de norm. Het nieuwste type taalmodellen zijn <i>transformer</i> taalmodellen. Hun voorgangers, van de klasse recurrent neural networks, verwerken woorden in de originele woordvolgorde tot een directed acyclic graph<label for="sn-dag" class="margin-toggle">⊕</label><input type="checkbox" id="sn-dag" class="margin-toggle"/>.
<span class="marginnote">
    <img src="/assets/images/2021-05-05-Scaling-hypothesis/DAG.svg" alt="Voorbeeld van een directed acyclic graph.">
    Voorbeeld van een directed acyclic graph.
</span>


De transformer taalmodellen, daarentegen, gebruiken een artificiële vorm van <i>aandacht</i>. Het model weegt de invloed van verschillende tokens (woorden, tekens) uit bijvoorbeeld een zin, en kan daarmee een nadruk leggen op sleutelwoorden. Het gros van de moderne taalmodellen is van de transformer soort. 

## De ingrediënten voor een goed model
De scaling hypothesis is veel meer dan een filosofisch vraagstuk. Scaling laws zijn hele precieze wetten die gebruikt worden om de prestaties van machine learning modellen te optimaliseren. Er zijn twee hele belangrijke knoppen waar je aan kunt draaien: de grootte van het model en de hoeveelheid trainingsdata. Beide variabelen verbruiken stroom en computerkracht, en dat kost geld. Over de verhouding tussen data en modelgrootte moet dus goed worden nagedacht. 

<b>Computerkracht ~ parameters x tokens</b><label for="sn-formula"
       class="margin-toggle sidenote-number">
</label>
<input type="checkbox"
       id="sn-formula"
       class="margin-toggle"/>
<span class="sidenote">"Parameters" betekent de grootte van het model. "Tokens" refereert aan de hoeveelheid trainingsdata; elke token is een woord of symbolenreeks.</span>

Bovenstaande vergelijking klopt, maar strookt niet volledig met de werkelijkheid. Laten we bijvoorbeeld zeggen dat mijn computerkracht voor het komende jaar met 10^9 toeneemt. Daar wil ik zo veel mogelijk profijt uit halen. Om nu de grootst mogelijke verbetering van mijn model te krijgen, blijkt dat ik 10^6 computerkracht aan parameters moet uitgeven, en slechts 10^2 aan data. De grootte van het model is dus veruit het belangrijkst. Ook andere variabelen, zoals de breedte-diepte-verhouding van modellen, lijken niet echt meer verbeterd te kunnen worden: hun optimale instelling kennen we al. Het effect van schaalvergroting wordt duidelijk uit onderstaande grafiek. 

<label for="mn-graph"
       class="margin-toggle">⊕
</label>
<input type="checkbox"
       id="mn-graph"
       class="margin-toggle"/>
<span class="marginnote">Deze grafiek geeft de prestaties van modellen (y-as) met verschillende groottes (kleur) naargelang zij met meer computerkracht getraind zijn (x-as), weer.</span>
![Curve die computerkracht tegen prestatie uitzet.](/assets/images/2021-05-05-Scaling-hypothesis/Compute.png)

Elk model verslaat zijn kleinere voorganger, met op kop GPT-3 in de gele trui. Alle modellen volgen dezelfde lineaire trendlijn, en een afvlakking is niet in zicht. De architectuur van het model vormt op dit moment dus geen limitatie voor de prestatie. Maar dat is dan ook alles wat we hiermee kunnen zeggen. 

## Waar zit het plafond?
Voorlopig zullen modellen dus voornamelijk groter gaan worden. "achieve scaling, avoid bottlenecks" is het devies, volgens Kaplan. Alleen de praktijk kan ons leren of de trend zich voort zal zetten. Scaling laws blijven namelijk experimentele verbanden, die kloppen zolang de data zeggen dat ze kloppen.

Van eerdere generaties modellen weten we bovendien dat architectuur absoluut een bottleneck kan vormen. Zo vlakt de prestatie van de LSTM<label for="sn-lstm" class="margin-toggle sidenote-number"></label>
<input type="checkbox"
       id="sn-lstm"
       class="margin-toggle"/>
<span class="sidenote">Een subtype recurrent neural network. LSTM staat voor Long short-term memory.</span> als functie van het aantal tokens, asymptotisch af, totdat de lijn nagenoeg vlak is en er geen prestatieverbetering meer optreedt. Een groter model presteert dan wel beter, maar investeren in een verbeterde architectuur is op dat punt een slimmere keuze. 

Want die lichte afbuiging die GPT-3 (de gele lijn) laat zien, weg van de trendlijn? Is het een artefact, of een daadwerkelijke afvlakking? En is dat een toevalligheid, of toch het begin van de bottleneck van transformer modellen? Het blijft gissen. Dit zou natuurlijk best een klein stukje kunnen zijn van een veel grotere asymptotische curve. 


## Hoe belangrijk is associatief geheugen?
Bovendien is het belangrijk om na te denken over hetgeen we eigenlijk meten. Wat ik in deze post telkens prestatie noem, is eigenlijk <i>test loss</i>. Test loss is een maat die het verschil meet tussen de output die mijn model genereert, en de correcte output. Hoe kleiner het verschil, hoe accurater het model is, in het voorspellen wat het correcte antwoord is. Maar die accuraatheid kan slechts zo goed worden als die van mijn dataset. Als we die dataset van internet halen, zoals bij GPT-3 het geval was, kunnen we daar dus niet zonder meer vanuit gaan.      
Ik heb een idee. 

Associatief geheugen is zowel een eigenschap van de huidige generatie neurale netwerken, als van ons brein. 
Neurale netwerken zijn niet consistent, ze geven niet altijd hetzelfde antwoord, maar dat doen wij ook niet. Als ik net een 


Hoeveel van menselijke intelligentie bestaat uit associatief geheugen? Hoe ver kun je daarmee komen? 

{{site.baseurl}}
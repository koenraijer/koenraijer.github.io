---
layout: post
author: Koen
category: Technologie
tags: Technologie
title: "Scaling hypothesis"
---

Tijdens het schrijven van mijn post over GPT-3, raakte ik gefascineerd door de Scaling Hypothesis. Die stelt dat de prestaties van neurale netwerken zal blijven stijgen met de grootte van het model. Dat riep veel vragen op. Is dat echt zo? Wil dat zeggen dat steeds grotere modellen ook steeds dichter bij artificial general intelligence komen? Of zit er toch een plafond aan, en blijft de "soort" intelligentie van neurale netwerken beperkt?<!--more-->

Eerst wilde ik beter begrijpen wat natuurkundigen en informatici eigenlijk bedoelen als ze het hebben over scaling laws en machine learning. Ik vond zo gauw eigenlijk geen informatie in gewone taal, dus ik ben uitgeweken naar een praatje van Jared Kaplan, gericht aan natuurkundigen. Kaplan is verbonden aan de Johns Hopkins Universiteit en heeft meegeschreven aan de <a href="https://arxiv.org/abs/2005.14165" target="_blank">publicatie</a> over GPT-3. In de volgende alinea's ga ik een aantal interessante concepten introduceren die ik nog niet kende.  

Taalmodellen zijn autoregressief, ze gebruiken de vorige woorden om één voor één nieuwe woorden te genereren. Telkens als er een nieuw woord is gegenereerd, wordt dat meegewogen bij het voorspellen van het daaropvolgende woord. Het algoritme leert door woorden in vectoren te vertalen en ze vervolgens in een virtuele ruimte, een <i>embedded space</i> te plaatsen. Een vector, zoals wiskunde mij ooit leerde, is een pijl met een richting en een grootte. Woorden met een overeenkomende vector, zullen ons ook als overeenkomstig aandoen. Zo zullen de vectoren koning&#10231;koningin en man&#10231;vrouw overeenkomen, maar ook: zwem&#10231;zwom, loop&#10231;liep. Alle associaties die wij hebben tussen woorden, drukken taalmoddelen dus uit in vectoren.


![Voorbeeld van een directed acyclic graph.](/assets/images/2021-05-05-Scaling-hypothesis/DAG.svg){:style="float: right; max-height: 50vh; margin-left: $spacing-unit;"}
<figcaption>Voorbeeld van een directed acyclic graph.</figcaption>

Dan is er het idee van de architectuur van een model. Elke zoveel jaar wordt een nieuwe architectuur de norm. Het nieuwste type taalmodellen zijn <i>transformer</i> taalmodellen. Hun voorgangers, van de klasse recurrent neural networks, verwerken woorden in de originele woordvolgorde tot een directed acyclic graph, zie onderstaande grafiek. 


De transformer taalmodellen, daarentegen, gebruiken een artificiële vorm van <i>aandacht</i>. Het model weegt de invloed van verschillende tokens (woorden, tekens) uit bijvoorbeeld een zin, en kan daarmee een nadruk leggen op sleutelwoorden. Het gros van de moderne taalmodellen is van de transformer soort. 

## De 3 ingrediënten voor een goed model
De scaling hypothesis is veel meer dan een filosofisch vraagstuk. Scaling laws zijn hele precieze wetten die gebruikt worden om de prestaties van machine learning modellen te optimaliseren. Drie basisingrediënten vormen samen de smaak: de grootte van het model, de grootte van de dataset, totale computerkracht gebruikt om het model te trainen. Om een optimaal resultaat te krijgen, moeten ze in de juiste verhouding worden toegevoegd. Je wil geen groot model zonder data, geen klein model met data en geen groot model met een hoop data dat te kort getraind wordt.

## Het beste taalmodel met beperkte middelen

<b>Computerkracht ~ parameters x tokens</b>

Omdat computerkracht beperkt is, moet goed worden nagedacht over de verdeling ervan. Laten we zeggen dat mijn computerkracht met 10^9 toeneemt. Om de effectiviteitstoename van mijn model te maximaliseren, blijkt dat ik 10^6 daarvan aan parameters moet uitgeven, en slechts 10^2 aan data. De grootte van het model is dus veruit het belangrijkst, zo zegt Kaplan. Andere parameters, zoals de breedte-diepte-verhouding van modellen, lijken niet echt meer verbeterd te kunnen worden: hun optimale afstelling weten we al. Ook de architectuur van het model, in dit geval een transformer model, lijkt voor nu geen beperking te zijn op de prestatie van het model. 

![Curve die computerkracht tegen prestatie uitzet.](/assets/images/2021-05-05-Scaling-hypothesis/Compute.png)
<figcaption>De gekleurde lijnen zijn de prestaties van modellen met verschillende groottes naargelang zij met meer computerkracht getraind zijn. Op de x-as computerkracht, op de y-as prestatie.</figcaption>


## Waar zit het plafond?
Eigenlijk staat ons dus niets in de weg om domweg steeds grotere modellen te gaan maken. "Achieve scaling, avoid bottlenecks" is het mantra van AI onderzoek, volgens Kaplan. Toch blijft het onduidelijk of de scaling hypothesis het houdt. Scaling laws zijn experimentele verbanden, geldend zolang de data dat zeggen. 

Wel weten we van andere soorten modellen dat architectuur best een bottleneck kan zijn voor de prestatie van een model. Zo vlakt de prestaties van de LSTM (een subtype recurrent neural network) asymptotisch af bij een bepaalde grootte dataset. Die architectuur kende dus een limiet. Want die lichte afbuiging die GPT-3 (de gele lijn) laat zien, weg van de trendlijn? Is het een artefact, of een daadwerkelijke afvlakking? En is dat een toevalligheid, of toch het begin van de bottleneck van de transformer modellen? Alleen de tijd kan het ons leren. 

## Hoe belangrijk is associatief geheugen?
Hoeveel van menselijke intelligentie bestaat uit associatief geheugen? Hoe ver kun je daarmee komen? 



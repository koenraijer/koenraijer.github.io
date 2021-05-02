---
layout: post
author: Koen
category: Technologie
tags: Technologie
title: "Scaling hypothesis"
---

Tijdens het schrijven van mijn post over GPT-3, raakte ik gefascineerd door de Scaling Hypothesis. Die stelt dat de prestaties van neurale netwerken zal blijven stijgen met de grootte van het model. Dat riep veel vragen op. Is dat echt zo? Wil dat zeggen dat steeds grotere modellen ook steeds dichter bij artificial general intelligence komen? Of zit er toch een plafond aan, en blijft de "soort" intelligentie van neurale netwerken beperkt?<!--more-->

Eerst wilde ik beter begrijpen wat natuurkundigen en informatici eigenlijk bedoelen als ze het hebben over scaling laws en machine learning. Ik vond zo gauw eigenlijk geen informatie in gewone taal, dus ik ben uitgeweken naar een praatje van Jared Kaplan, gericht aan natuurkundigen. Kaplan is verbonden aan de Johns Hopkins Universiteit en heeft meegeschreven aan de <a href="https://arxiv.org/abs/2005.14165" target="_blank">publicatie</a> over GPT-3. 

Taalmodellen zijn autoregressief, ze gebruiken de vorige woorden om één voor één nieuwe woorden te genereren. Het nieuwe woord wordt dan meegenomen in de volgende predictie. Het algoritme leer door woorden in vectoren te vertalen. Een vector, zoals wiskunde mij ooit leerde, is een pijl met een richting en een grootte. Zo zal de vector koning&#10231;koningin en man&#10231;vrouw overeenkomen, maar ook: zwem&#10231;zwom, loop&#10231;liep. Alle associaties die wij hebben tussen woorden, drukken taalmoddelen kwantitatief uit in vectoren. 

## De 3 ingrediënten voor een goed model
De scaling hypothesis is veel meer dan een filosofisch vraagstuk. Scaling laws zijn hele precieze wetten die gebruikt worden om de prestaties van machine learning modellen te optimaliseren. Drie basisingrediënten vormen samen de smaak: de grootte van het model, de grootte van de dataset, totale computerkracht gebruikt om het model te trainen. Om een optimaal resultaat te krijgen, moeten ze in de juiste verhouding worden toegevoegd. Je wil geen groot model zonder data, geen klein model met data en geen groot model met een hoop data dat te kort getraind wordt.

## Wat maakt een goed taalmodel?
Computerkracht ~ parameters x tokens.

Omdat computerkracht beperkt is, moet goed worden nagedacht over de verdeling ervan. Laten we zeggen dat mijn computerkracht met 10^9 toeneemt. Om de effectiviteitstoename van mijn model te maximaliseren, blijkt dat ik 10^6 daarvan aan parameters moet uitgeven, en slechts 10^2 aan data. De grootte van het model is dus veruit het belangrijkst, zo zegt Kaplan. Andere parameters, zoals de breedte-diepte-verhouding van modellen, lijken niet echt meer verbeterd te kunnen worden: hun optimale afstelling weten we al. 

Eigenlijk staat ons dus niets in de weg om domweg steeds grotere modellen te gaan maken. "Achieve scaling, avoid bottlenecks" zal het mantra van AI onderzoek worden. 

![Curve die computerkracht tegen prestatie uitzet. Bevesting van de scaling hypothesis. ](\assets/images/2021-05-05-Scaling-hypothesis/Compute.png)
<figcaption>Curve die computerkracht tegen prestatie uitzet. Bevesting van de scaling hypothesis.</figcaption>
## Waar zit het plafond?

- Zijn deze resultaten specifiek voor taal?
- Zullen ze op een bepaald punt, bij een bepaalde grootte, niet meer gelden?
- Wat is de validiteit van "test loss" (een theoretische maat die de prestatie van ML modellen moet meten)? Hoe is de <i>carryover</i> naar praktischere toepassingen?
- Hoeveel van menselijke intelligentie bestaat uit associatief geheugen? Hoe ver kun je daarmee komen? 



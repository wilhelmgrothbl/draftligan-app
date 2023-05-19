import React from "react";
import "tailwindcss/tailwind.css";

const people = [
  {
    name: "Björn Gabrielsson",
    role: "Ingen kan diskutera VM-94 utan att höra Björn lyfta fram Stefan Schwarz's namn med en mix av beundran och total förälskelse.",
    imageUrl: "./././bjorn.jpg",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Joel Nordkvist",
    role: "Mångfacetterade fotbollsentusiasten och mästerlig strateg, som spelar rollen som Draftgeneral, Sheriff, Länsman och Pessimistkonsult för att föra ordning, rättvisa och en dos av realistiskt tänkande till fotbollsvärlden.",
    imageUrl: "./././joel.jpg",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Lars Berglund",
    role: "Trogen Aston Villa-supporter, Robbie Savage-beundrare, ölälskare och den före detta mänskliga väggen i målet för Skarplycka SK.",
    imageUrl: "./././lasse.jpg",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: 'Fredrik "Forsen" Torin',
    role: "Fredrik Forsen Forslin, numera Torin, mannen som inte hatar att knycka och som stolt kan kalla sig supporter till nästan alla lag.",
    imageUrl: "./././forsen.jpg",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Wilhelm Groth",
    role: "Den respekterade SM-mästaren i kortspelet Bridge, med en stark lojalitet till Liverpool FC. Utöver sin skicklighet vid Bridge-bordet, njuter han av spänningen med att satsa på travlopp och fotbollsmatcher. ",
    imageUrl: "./././wille.jpg",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Micke Andersson",
    role: "Damernas charmtroll och fotbollsmästaren vars precision har en charmig egen vilja. Med en touch av oväntade kurvor och oförutsägbara skruvar i sina skott får han både motståndarna och fansen att le. Han kan kanske inte alltid träffa målet exakt, men det är just denna oförutsägbarhet som gör honom till en spelare som sprider glädje och spänning på planen.",
    imageUrl: "./././micke.jpg",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Tommy Tompa Forslin",
    role: "Arsenal-älskaren som trots att Arsenal har gjort honom gråhårig denna säsong, inte kan släppa taget om sitt kära lag. Som en anfallare i sina tidiga dar hade Tompa en gång drömmar om att göra mål på Highbury, men nu nöjer han sig med att göra sarkastiska kommentarer från soffan. Trots alla besvikelser och hjärtesorg som Arsenal har gett honom, kan du alltid hitta Tompa iförd sin Arsenal-tröja, hoppande av ilska och förhoppning vid varje match. ",
    imageUrl: "./././tmy.jpg",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Magnus Olofsson",
    role: "Den hängivne Spurs-supportern som har utvecklat en unik överlevnadsstrategi i takt med att hans älskade klubb fortsätter att snubbla på vägen till framgång. Spurs' förmåga att aldrig vinna något stort har blivit som en tragikomisk säkerhet i Magnus' liv. Trots de bittera besvikelserna och förbannelsen av missade chanser, står han kvar som en odödlig länk i Spurs-supporterkedjan, redo att skämta och skvallra om klubbens troliga nästa fadäs över en kall öl. Magnus är en symbol för den outtröttliga lojaliteten hos de lidande Spurs-supportrarna, som är fast beslutna att hålla ut och drömma om den oförutsägbara dagen då Spurs faktiskt vinner något stort.",
    imageUrl: "./././lofsen.jpg",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
];

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-indigo-900 to-red-500 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 flex items-center">
          <div className="mr-6">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              De efterkloka
            </h2>
            <p className="mt-6 text-lg leading-8 text-white">
              De Efterkloka: Kamratföreningen som balanserar klokhet och humor
              sedan 2016 - skämtsamt visdomsfulla med en touch av glimten i
              ögat!
            </p>
          </div>
          <div className="flex-shrink-0">
            <img
              className="h-64"
              src="./././efterkloka.png"
              alt="här var det en ko"
            />
          </div>
        </div>

        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-3 gap-x-8 gap-y-16 sm:grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-4"
        >
          {people.map((person) => (
            <li key={person.name}>
              <img
                className="aspect-[3/2] w-full rounded-2xl object-cover"
                src={person.imageUrl}
                alt=""
              />
              <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-white">
                {person.name}
              </h3>
              <p className="text-base leading-7 text-white">{person.role}</p>
        
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

import React from "react";
import "tailwindcss/tailwind.css";

const people = [
  {
    name: "Björn Gabrielsson",
    role: "Gud",
    imageUrl: "./././bjorn.jpg",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Joel Nordkvist",
    role: "Draftgeneral",
    imageUrl: "./././joel.jpg",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Lars Berglund",
    role: "Villa-fan",
    imageUrl: "./././lasse.jpg",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: 'Fredrik "Forsen" Torin',
    role: "Hatar inte att knycka",
    imageUrl: "./././forsen.jpg",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Wilhelm Groth",
    role: "SM-mästare i bridge",
    imageUrl: "./././wille.jpg",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Micke Andersson",
    role: "Operatör",
    imageUrl: "./././micke.jpg",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Tommy Tompa Forslin",
    role: "Arsenal",
    imageUrl: "./././tmy.jpg",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Magnus Olofsson",
    role: "Lofsen",
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

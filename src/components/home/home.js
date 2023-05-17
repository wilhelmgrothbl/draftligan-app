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
    name: "Joel Nordqvist",
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
      <div className="bg-gradient-to-r from-indigo-900 to-red-500 py-8 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <img
              className="h-48 sm:h-64 mb-4"
              src="./././efterkloka.png"
              alt="här var det en ko"
            />
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-center">
              De efterkloka
            </h2>
            <p className="mt-4 text-lg leading-7 text-white text-center">
              De Efterkloka: Kamratföreningen som balanserar klokhet och humor sedan 2016 - skämtsamt visdomsfulla med en touch av glimten i ögat!
            </p>
          </div>
  
          <ul
            role="list"
            className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-y-8 sm:grid-cols-2 sm:max-w-none"
          >
            {people.map((person) => (
              <li key={person.name} className="flex flex-col items-center">
                <img
                  className="aspect-[3/2] w-full rounded-2xl object-cover"
                  src={person.imageUrl}
                  alt=""
                />
                <h3 className="mt-4 text-lg font-semibold leading-7 text-white text-center">
                  {person.name}
                </h3>
                <p className="mt-1 text-base leading-6 text-white text-center">
                  {person.role}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  
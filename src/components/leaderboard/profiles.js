import React from 'react'



export default function Profiles({ Standings }) {
  return (
    <div className="flex flex-col items-center min-h-screen p-5">
      <div className="w-full bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-400 to-gray-500">
            <tr>
              <th className="py-3 px-2 sm:px-4 font-semibold text-right"></th>
              <th className="py-3 px-2 sm:px-4 font-semibold text-left">Namn</th>
              <th className="py-3 px-2 sm:px-4 font-semibold text-left">Lag</th>
              <th className="py-3 px-2 sm:px-4 font-semibold text-right">Poäng</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {Standings.map((value, index) => (
              <tr key={index}>
                <td className="py-2 sm:py-4 px-2 sm:px-7">
                  <div className="flex justify-center items-center h-16 sm:h-24 w-16 sm:w-24">
                    <img
                      src={value.img}
                      alt="här var det en ko"
                      className="h-auto w-full rounded-full object-cover object-center"
                    />
                  </div>
                </td>
                <td className="py-2 sm:py-4 px-2 sm:px-6">{value.name}</td>
                <td className="py-2 sm:py-5 px-2 sm:px-6">{value.team}</td>
                <td className="py-2 sm:py-4 px-2 sm:px-6 text-right">
                  {value.score.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

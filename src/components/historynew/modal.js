import React from "react";

export default function Modal({ onCloseModal, data }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="bg-gradient-to-r from-red-200 to-white w-full md:w-3/4 lg:w-1/2 p-4 rounded-lg shadow-lg overflow-y-auto max-h-screen">
        <div className="grid md:grid-cols-1 gap-4">
          <table className="mb-4 md:mb-0">
           
            <tbody>
              {data &&
                data.table &&
                data.table.map((item, index) => {
                  if (item.titleTop) {
                    return ( 
                      <div className="text-2xl text-center p-2 mb-2"> {item.titleTop}</div>
                    )
                  }
                  if (item.title) {
                    return (
                      <tr key={index}>
                        <td colSpan="3" className="font-bold text-center">
                          {item.title}
                        </td>
                      </tr>
                    );
                  } else if (item.label && item.points) {
                    return (
                      <tr key={index}>
                        <td className="">{item.label}</td>
                        <td className="font-bold">{item.points}</td>
                        {item.player && (
                          <td className="">
                            <div className="text-lg">{item.player}</div>
                            <div>{item.labelReward}</div>
                          </td>
                        )}
                      </tr>
                    );
                  }
                  return null;
                })}
            </tbody>
          </table>

          <div class="inline-flex items-center justify-center w-full">
    <hr class="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700"></hr>
    <div class="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
    </div>
</div>
          <div className="grid grid-cols-2 gap-4">
            {data &&
              data.itemsReward &&
              data.itemsReward.map((item, index) => (
                <div key={index} className="text-center">
                  <span className="text-lg font-bold">{item.labelReward}</span>
                  {item.player && (
                    <div className="font-bold text-sm">{item.player}</div>
                  )}
                  <div className="text-sm italic">{item.description}</div>
                </div>
              ))}
          </div>
          <div className="flex justify-center"> {/* Centrering */}
            <button
              className="mb-16 w-1/3 px-4 py-2 bg-indigo-900 text-white rounded hover:bg-gradient-to-r hover:from-[#ff2882] hover:to-[#37003c] transition-colors duration-300"
              onClick={onCloseModal}
            >
              Stäng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

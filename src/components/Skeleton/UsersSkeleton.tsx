const UsersSkeleton = () => {
  return (
    <>
      <div className="bg-white p-2 flex justify-between items-center mb-[5rem]">
        <div className="h-6 w-32 bg-gray-300 rounded animate-pulse"></div>
        <div className="flex gap-4">
          <div className="h-10 w-40 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-10 w-24 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="bg-white p-2 rounded-lg shadow-lg min-h-[600px] px-8">
        <div className="flex gap-4 mb-4 px-8">
          <div className="h-10 w-24 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-10 w-24 bg-gray-300 rounded animate-pulse"></div>
        </div>

        <div className="border rounded-lg overflow-hidden ">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">First Name</th>
                <th className="p-3 text-left">Last Name</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b">
                  <td className="p-3 flex items-center gap-2">
                    <div className="h-10 w-10 bg-gray-300 rounded-full animate-pulse"></div>
                    <div className="h-4 w-40 bg-gray-300 rounded animate-pulse"></div>
                  </td>
                  <td className="p-3">
                    <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
                  </td>
                  <td className="p-3">
                    <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
                  </td>
                  <td className="p-3 flex gap-2">
                    <div className="h-8 w-16 bg-gray-300 rounded animate-pulse"></div>
                    <div className="h-8 w-16 bg-gray-300 rounded animate-pulse"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end mt-4 gap-2 mr-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-8 w-8 bg-gray-300 rounded animate-pulse"
          ></div>
        ))}
      </div>
    </>
  );
};

export default UsersSkeleton;

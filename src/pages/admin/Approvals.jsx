import { useEffect, useState } from "react";
import { getAllUsers, updateUser } from "../../api/userApi";

const Approvals = () => {
  const [pending, setPending] = useState([]);

  useEffect(() => {
    getAllUsers().then((res) => {
      setPending(res.data.filter((u) => u.approvalStatus === "pending"));
    });
  }, []);

  const approve = (email) =>
    updateUser(email, { approvalStatus: "approved" });

  const reject = (email) =>
    updateUser(email, {
      approvalStatus: "rejected",
      role: "patient",
    });

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex justify-center">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Pending Approvals
        </h2>

        {pending.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No pending approval requests.
          </p>
        ) : (
          <div className="space-y-5">
            {pending.map((u) => (
              <div
                key={u._id}
                className="border border-gray-300 rounded-lg p-5 shadow-sm bg-gray-50 flex justify-between items-center"
              >
                {/* Left: User Info */}
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {u._id}
                  </p>
                  <span className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {u.role}
                  </span>
                </div>

                {/* Right: Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => approve(u._id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => reject(u._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Approvals;

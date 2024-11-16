import React from "react";

const AuditTrail = () => {
  const auditTrail = [
    {
      actor: "John Doe",
      action: "Logged in",
      timestamp: "2024-11-13, 09:00 AM",
    },
    {
      actor: "Admin Jane",
      action: "Added new product",
      timestamp: "2024-11-13, 08:50 AM",
    },
    {
      actor: "John Doe",
      action: "Logged out",
      timestamp: "2024-11-13, 08:45 AM",
    },
    {
      actor: "John Doe",
      action: "Failed login attempt",
      timestamp: "2024-11-13, 08:30 AM",
    },
    {
      actor: "Admin Jane",
      action: "Updated product stock",
      timestamp: "2024-11-13, 08:20 AM",
    },
  ];

  return (
    <div className="px-3">
      <ul className="space-y-3">
        {auditTrail.map((item, index) => (
          <li
            key={index}
            className={`flex items-start space-x-4 p-3 rounded-md ${
              item.action === "Failed login attempt"
                ? "bg-red-100"
                : "bg-zinc-50"
            }`}
          >
            <div className="flex-shrink-0">
              <span
                className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                  item.action === "Failed login attempt"
                    ? "bg-red-600 text-white"
                    : "bg-blue-600 text-white"
                }`}
              >
                {item.actor[0]}
              </span>
            </div>
            <div className="flex-grow">
              <p className="text-sm text-zinc-900">
                <span className="font-semibold">{item.actor}</span> -{" "}
                {item.action}
              </p>
              <p className="text-xs text-zinc-400">{item.timestamp}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuditTrail;

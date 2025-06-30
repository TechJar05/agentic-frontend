import React from "react";

const UserGuide = () => {
  const sections = [
    {
      title: "Welcome to EA BOT Platform",
      content: [
        "This platform helps MDs manage employee tasks efficiently while enabling employees to interact with the system through a smart WhatsApp-based assistant.",
        "Our system blends task automation, voice interaction, and AI-driven assistance into a seamless experience for task assignment and status tracking.",
        "<span class='text-green-600 font-semibold text-base'>Connect with EA BOT on WhatsApp: (+1) 97335 55570</span>",
      ],
    },
    {
      title: "Platform Workflow",
      content: [
        "1. A user registers on the platform.",
        "2. The admin reviews and approves the registration, assigning the MD role.",
        "3. Once approved, the MD can log in and access their dashboard.",
        "4. From the dashboard, MDs can manage employees, assign tasks, and monitor progress.",
        "5. Employees receive tasks and respond via WhatsApp with the EA BOT assistant.",
      ],
    },
    {
      title: "Core Features",
      content: [
        "Employee management: Add, update, delete employees, and track their statuses.",
        "Task management: Assign tasks, set deadlines, and view status updates.",
        "Voice commands: Assign tasks or reply to requests using voice (Hindi/English).",
        "AI Bot Assistance: Employees can ask questions related to tasks via WhatsApp.",
        "Real-time WhatsApp notifications for new task assignments.",
      ],
    },
    {
  title: "Using the Platform",
  content: [
    "To Add an Employee: Go to 'Employee Management' → click 'Add New Employee' → fill in details → click 'Add'.",
    "To Update Employee Details: Click 'Edit' next to an employee → update name or phone → click 'Update'.",
    "To Track Tasks: Navigate to 'Task Logs' → view task details like title, assignee, priority, and status.",
    "To Search Employees: Use the search bar in 'Employee Management' to find an employee by name.",
    "To Update Your Profile: Click your profile icon (top-right) → select 'Update Your Profile' → edit your name or phone number.",
    "To Create a Task via WhatsApp: MDs can send a message to the EA BOT like —",
    "<span class='text-gray-700 italic'>Create task for Omkar, description to develop a website for restaurant, priority high, deadline 2025-06-24 15:00, department IT</span>",
  ],
},

    {
      title: "Voice & AI Interaction",
      content: [
        "MDs can assign tasks by speaking in Hindi or English.",
        "Employees can reply or ask task-related questions via voice messages.",
        "The EA BOT responds with helpful AI-generated insights on tasks.",
        "Task completion requests can also be sent by employees via voice.",
      ],
    },
    {
      title: "Support",
      content: [
        "For help with technical issues or onboarding assistance, please contact the system administrator or support team.",
        "Ensure your WhatsApp is registered to receive notifications from EA BOT.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 text-gray-800">
      <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-[#00968a] mb-8">
          User Guide
        </h1>

        {sections.map((section, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {section.title}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm sm:text-base">
              {section.content.map((item, i) =>
                item.includes("<span") ? (
                  <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                ) : (
                  <li key={i}>{item}</li>
                )
              )}
            </ul>
          </div>
        ))}

        <p className="text-center text-xs text-gray-400 mt-10">
          For additional documentation or help, contact support.
        </p>
      </div>
    </div>
  );
};

export default UserGuide;

import React from "react";

const UserGuide = () => {
  const sections = [
    {
      title: "1. How to Add an Employee",
      content: [
        "Navigate to 'Employee Management' from the sidebar.",
        "Click on the 'Add New Employee' button.",
        "Fill in the employee's name, 10-digit phone number, task capacity, and department.",
        "Click 'Add' to save the new employee."
      ],
    },
    {
      title: "2. How to Update Employee's Name or Phone Number",
      content: [
        "In the 'Employee Management' table, find the employee you want to update.",
        "Click the 'Edit' button in the Actions column.",
        "Enter the new name and/or phone number.",
        "Click 'Update' to save changes."
      ],
    },
    {
      title: "3. How to View All Employees",
      content: [
        "Open the 'Employee Management' page.",
        "You'll see a list of all employees with their names, phone numbers, and statuses.",
        "Use the search bar at the top to find specific employees by name."
      ],
    },
    {
      title: "4. How to Track Tasks Assigned to Employees",
      content: [
        "Go to the 'Task Logs' section from the sidebar.",
        "You'll see a list of all tasks with assigned employee names.",
        "Each task row shows the task title, assigned employee, status (Pending/In Progress/Completed), and deadline.",
        "You can filter or sort tasks as needed."
      ],
    },
    {
      title: "5. How to update Your Phone Number",
      content: [
       "Navigate to the top-right corner of the page where your profile icon is located.",
    "Click on the profile icon to open the dropdown menu.",
    "Select 'Update Your Profile' from the dropdown.",
    "In the popup modal, enter your new name or 10-digit phone number.",
    "Click on 'Update' to save changes. A confirmation message will appear."
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 text-gray-800">
      <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-[#00968a]">
          EA BOT – User Guide
        </h1>

        {sections.map((section, idx) => (
          <div key={idx} className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">
              {section.title}
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              {section.content.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}

        {/* <p className="text-xs text-gray-500 mt-8 text-center">
          If you have any questions or face issues, please contact the admin.
        </p> */}
      </div>
    </div>
  );
};

export default UserGuide;

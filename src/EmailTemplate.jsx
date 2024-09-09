const EmailTemplate = ({ recipientName }) => {
  return (
    <div className="bg-gray-100 font-sans">
      <div className="max-w-xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="bg-blue-500 text-white text-center py-5">
          <h1 className="text-2xl m-0">Welcome to Our Service</h1>
        </div>
        <div className="p-5">
          <h2 className="text-gray-800 text-xl">Hi {recipientName},</h2>
          <p className="text-gray-600 leading-relaxed mt-3">
            We are thrilled to have you on board. Our service offers the best solutions to cater to
            your needs. We are committed to providing you with excellent service and an unmatched
            experience.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3">
            Please click the button below to get started.
          </p>
          <a
            href="#"
            className="block w-48 mx-auto text-center py-2 mt-5 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Get Started
          </a>
        </div>
        <div className="bg-gray-200 text-gray-600 text-center py-5 text-sm">
          <p className="m-0">&copy; 2024 Your Company. All rights reserved.</p>
          <p>1234 Street Address, City, State, Zip</p>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplate;

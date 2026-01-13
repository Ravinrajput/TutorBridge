export default function Footer() {
  return (
   <footer className="bg-blue-100 text-gray-700 pt-12 pb-6 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">

        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-blue-800">TutorBridge</h2>
          <p className="mt-3 text-gray-600">
            Connecting parents with trusted home tutors. Quality education starts here.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg text-blue-800">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li><a href="/" className="hover:text-blue-900 transition">Home</a></li>
            <li><a href="/request-tutor" className="hover:text-blue-900 transition">Request Tutor</a></li>
            <li><a href="#" className="hover:text-blue-900 transition">Become a Tutor</a></li>
            <li><a href="#" className="hover:text-blue-900 transition">Contact</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-lg text-blue-800">Support</h3>
          <ul className="mt-3 space-y-2">
            <li><a href="#" className="hover:text-blue-900 transition">FAQs</a></li>
            <li><a href="#" className="hover:text-blue-900 transition">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-blue-900 transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-lg text-blue-800">Contact</h3>
          <p className="mt-3">📞 +91 9587147260</p>
          <p>📧 support@tutorbridge.com</p>
          <p>📍 India</p>
        </div>

      </div>

      {/* Bottom */}
      <div className="text-center text-gray-500 mt-10 border-t border-blue-200 pt-4 text-sm">
        © {new Date().getFullYear()} TutorBridge. All Rights Reserved.
      </div>
    </footer>
  );
}

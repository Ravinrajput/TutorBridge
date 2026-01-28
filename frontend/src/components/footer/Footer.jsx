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
            <li><a href="/become-tutor" className="hover:text-blue-900 transition">Become a Tutor</a></li>
            <li><a href="/contact" className="hover:text-blue-900 transition">Contact</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-lg text-blue-800">Support</h3>
          <ul className="mt-3 space-y-2">
            <li><a href="/faqs" className="hover:text-blue-900 transition">FAQs</a></li>
            <li><a href="/terms" className="hover:text-blue-900 transition">Terms & Conditions</a></li>
            <li><a href="/privacy" className="hover:text-blue-900 transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-lg text-blue-800">Contact</h3>
          <p className="mt-3">📞 +91 95871xxxxx</p>
          <p>📧 support@tutorbridge.com</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-blue-800">Deavloper</h3>
          <p className="mt-3">Devlopped by Ravi Singh</p>

        </div>
      </div>
    </footer>
  );
}
 


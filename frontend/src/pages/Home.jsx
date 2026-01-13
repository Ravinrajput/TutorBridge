import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="w-full">
      <section className="bg-blue-50 py-24 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700">Find Verified Home Tutors Near You</h1>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">Trusted tutors for all subjects & grades — we connect parents with the best tutors in their area.</p>

        <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
                  onClick={() => window.location.href="/request-tutor"}>
            Request a Tutor
          </button>
        </div>
      </section>

      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Why Choose TutorBridge?</h2>
        <div className="mt-10 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 shadow-lg rounded-xl bg-white">
            <h3 className="text-xl font-semibold text-blue-600">✅ Verified Tutors</h3>
            <p className="mt-3 text-gray-600">All tutors are verified & background-checked.</p>
          </div>
          <div className="p-6 shadow-lg rounded-xl bg-white">
            <h3 className="text-xl font-semibold text-blue-600">📍 Local Matching</h3>
            <p className="mt-3 text-gray-600">We connect you with tutors near your location.</p>
          </div>
          <div className="p-6 shadow-lg rounded-xl bg-white">
            <h3 className="text-xl font-semibold text-blue-600">👨‍👦 Personalized Support</h3>
            <p className="mt-3 text-gray-600">Our team helps match the best tutor for your child.</p>
          </div>
        </div>
      </section>

      <section className="bg-blue-50 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800">How It Works</h2>
        <div className="mt-10 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-blue-600">1️⃣ Submit Request</h3>
            <p className="mt-2 text-gray-600">Tell us your tutoring requirement.</p>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-blue-600">2️⃣ Get Tutor</h3>
            <p className="mt-2 text-gray-600">Our Team Will Get Back to you with best tutor.</p>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-blue-600">3️⃣ Start Learning</h3>
            <p className="mt-2 text-gray-600">Begin learning with the perfect tutor.</p>
          </div>
        </div>
      </section>
    </div>
      <Footer />
    </>
  );
}

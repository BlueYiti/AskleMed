import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#08c7cf]/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0566bb]/20 blur-3xl rounded-full" />

      {/* Navbar */}
      <header className="w-full px-6 md:px-12 py-5 relative z-20">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo/site-logo.png"
              alt="AskleMed Logo"
              width={180}
              height={50}
              priority
              className="object-contain"
            />
          </div>

          {/* Signup Button */}
          <button className="bg-[#ff3131] hover:bg-red-600 transition-all duration-300 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105">
            Sign Up
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10">
        <section className="max-w-7xl mx-auto px-6 md:px-12 pt-10 md:pt-16 pb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-[#08c7cf]/10 border border-[#08c7cf]/20 px-4 py-2 rounded-full">
                <span className="w-2 h-2 bg-[#08c7cf] rounded-full animate-pulse" />
                <p className="text-sm font-semibold text-[#0566bb]">
                  Modern Telehealth Platform
                </p>
              </div>

              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
                  <span className="text-[#0566bb]"> Health</span>
                  
                  , Just an 
                  <span className="text-[#08c7cf]"> Ask </span>
                   Away
                </h1>

                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
                  Connect with licensed doctors online, book appointments,
                  access medical records, and manage consultations seamlessly
                  through AskleMed.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#0566bb] hover:bg-blue-700 transition-all duration-300 text-white px-8 py-4 rounded-full font-semibold shadow-xl hover:scale-105">
                  Get Started
                </button>

                <button className="border-2 border-[#0566bb] text-[#0566bb] hover:bg-[#0566bb] hover:text-white transition-all duration-300 px-8 py-4 rounded-full font-semibold">
                  Learn More
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div>
                  <h2 className="text-3xl font-bold text-[#0566bb]">500+</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Online Consultations
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#ff3131]">100+</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Licensed Doctors
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#08c7cf]">24/7</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Medical Support
                  </p>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="relative flex items-center justify-center">
              {/* Main Doctor Illustration */}
              <div className="relative">
                <div className="absolute inset-0 bg-[#0566bb]/20 blur-3xl rounded-full scale-110" />

                <div className="relative bg-gradient-to-br from-[#0566bb] to-[#08c7cf] p-2 rounded-[2rem] shadow-2xl">
                  <div className="bg-white rounded-[1.8rem] p-6">
                    <Image
                      src="/images/illustrations/doc-illus3.png"
                      alt="Doctor Illustration"
                      width={520}
                      height={520}
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>

                {/* Floating Cards */}
                <div className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#08c7cf]/20 p-3 rounded-xl">
                      <span className="text-[#08c7cf] text-xl">💬</span>
                    </div>

                    <div>
                      <p className="font-bold text-gray-900">Live Consult</p>
                      <p className="text-sm text-gray-500">
                        Video Appointment
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#ff3131]/20 p-3 rounded-xl">
                      <span className="text-[#ff3131] text-xl">❤️</span>
                    </div>

                    <div>
                      <p className="font-bold text-gray-900">Health Records</p>
                      <p className="text-sm text-gray-500">
                        Secure & Private
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Learn More Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 bg-[#0566bb]/10 border border-[#0566bb]/20 px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-[#0566bb] rounded-full animate-pulse" />
              <p className="text-sm font-semibold text-[#0566bb]">
                Everything You Need in One Platform
              </p>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              A Better Way to Access
              <span className="text-[#0566bb]"> Healthcare </span>
              Online
            </h2>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              AskleMed simplifies consultations, appointment booking,
              prescriptions, and medical record management into one secure
              digital healthcare experience.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-white border border-gray-100 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-[#0566bb]/10 flex items-center justify-center mb-6">
                <span className="text-3xl">🩺</span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Discover Doctors
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Search and filter doctors by specialization, availability,
                and ratings to find the right healthcare professional
                for your needs.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white border border-gray-100 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-[#08c7cf]/10 flex items-center justify-center mb-6">
                <span className="text-3xl">📅</span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Easy Appointment Booking
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Book, reschedule, or cancel appointments seamlessly with
                real-time doctor availability and instant confirmation
                notifications.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white border border-gray-100 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-[#ff3131]/10 flex items-center justify-center mb-6">
                <span className="text-3xl">💻</span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Online Consultations
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Join secure video consultations online through integrated
                telehealth sessions powered by modern communication tools.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group bg-white border border-gray-100 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-[#0566bb]/10 flex items-center justify-center mb-6">
                <span className="text-3xl">📄</span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Medical Records
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Access appointment history, prescriptions, and consultation
                notes anytime through a secure and centralized patient dashboard.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group bg-white border border-gray-100 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-[#08c7cf]/10 flex items-center justify-center mb-6">
                <span className="text-3xl">🔔</span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Smart Notifications
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Receive reminders, confirmations, and appointment updates
                instantly through email and real-time push notifications.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group bg-white border border-gray-100 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-[#ff3131]/10 flex items-center justify-center mb-6">
                <span className="text-3xl">🤖</span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                AI Symptom Recommender
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Describe your symptoms and get AI-assisted recommendations
                for the most suitable specialists and healthcare services.
              </p>
            </div>
          </div>

          {/* Process Section */}
          <div className="mt-28">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900">
                How AskleMed Works
              </h2>

              <p className="mt-4 text-lg text-gray-600">
                Get healthcare support in just a few simple steps.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="relative">
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 h-full">
                  <div className="w-14 h-14 rounded-full bg-[#0566bb] text-white flex items-center justify-center text-xl font-bold mb-6">
                    1
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Create Account
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    Register your patient account securely with your
                    personal information and health profile.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 h-full">
                  <div className="w-14 h-14 rounded-full bg-[#08c7cf] text-white flex items-center justify-center text-xl font-bold mb-6">
                    2
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Find a Doctor
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    Browse specialists, check availability,
                    and choose the healthcare professional you need.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 h-full">
                  <div className="w-14 h-14 rounded-full bg-[#ff3131] text-white flex items-center justify-center text-xl font-bold mb-6">
                    3
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Book Consultation
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    Schedule your appointment and receive instant
                    confirmations and reminders.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative">
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 h-full">
                  <div className="w-14 h-14 rounded-full bg-[#0566bb] text-white flex items-center justify-center text-xl font-bold mb-6">
                    4
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Join Online Session
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    Meet with your doctor virtually and access
                    prescriptions and consultation notes afterward.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="mt-28 relative overflow-hidden rounded-[3rem] bg-linear-to-r from-[#0566bb] to-[#08c7cf] p-10 md:p-16">
            <div className="absolute top-0 right-0 opacity-60">
              <Image
                src="/images/doctors/doc6.png"
                alt="Doctor"
                width={400}
                height={400}
              />
            </div>

            <div className="relative z-10 max-w-3xl">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                Start Your Digital Healthcare Journey Today
              </h2>

              <p className="mt-6 text-lg text-white/90 leading-relaxed">
                Experience secure and convenient online healthcare with
                AskleMed. Book consultations, manage appointments,
                and connect with trusted doctors from anywhere.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-[#0566bb] hover:bg-gray-100 transition-all duration-300 font-semibold px-8 py-4 rounded-full shadow-xl">
                  Create Account
                </button>

                <button className="border-2 border-white text-white hover:bg-white hover:text-[#0566bb] transition-all duration-300 font-semibold px-8 py-4 rounded-full">
                  Explore Doctors
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
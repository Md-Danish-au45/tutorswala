import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { BookOpen, Calendar, CheckCircle, Clock, GraduationCap, MessageSquare, Star, Users } from "lucide-react"
import ContactWidget from "@/components/contact-widget"
import landingpage from '../public/landingpage.png'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-emerald-600" />
            <span className="text-xl font-bold">Tutorswala.com</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Features
            </Link>
            <Link href="#tutors" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Our Tutors
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Testimonials
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button className="bg-emerald-600 hover:bg-emerald-700">Get Started</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-8 md:py-12 lg:py-16 bg-gradient-to-b from-white to-emerald-50">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-flex items-center px-3 py-1 mb-2 text-sm font-medium rounded-full bg-emerald-100 text-emerald-700">
                  <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-emerald-600"></span>
                  Trusted by 10,000+ students
                </div>
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Quality Tutoring for <span className="text-emerald-600">Your Child's Success</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Tutorswala connects your child with experienced tutors for personalized learning that builds
                    confidence and improves grades.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row mt-4">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-base">
                    Find a Tutor
                  </Button>
                  <Button size="lg" variant="outline" className="text-base">
                    How It Works
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm mt-4">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                    <span>Qualified Tutors</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                    <span>Flexible Scheduling</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                    <span>Satisfaction Guaranteed</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center relative">
                <div className="absolute inset-0 bg-emerald-200 rounded-full blur-3xl opacity-20 transform -rotate-6"></div>
                <Image
                  src={landingpage}
                  width={500}
                  height={500}
                  alt="Student learning with tutor"
                  className="rounded-lg object-cover relative z-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-28">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-flex items-center px-3 py-1 mb-2 text-sm font-medium rounded-full bg-emerald-100 text-emerald-700">
                Why Choose Us
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl max-w-[800px]">
                Designed for <span className="text-emerald-600">Parents & Students</span>
              </h2>
              <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We make finding and scheduling tutoring sessions simple, so you can focus on what matters most - your
                child's education.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-8 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center group">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 group-hover:bg-emerald-200 transition-colors duration-300">
                  <GraduationCap className="h-10 w-10 text-emerald-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Expert Tutors</h3>
                  <p className="text-muted-foreground">
                    All our tutors are thoroughly vetted, experienced, and specialized in their subject areas.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center group">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 group-hover:bg-emerald-200 transition-colors duration-300">
                  <Calendar className="h-10 w-10 text-emerald-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Flexible Scheduling</h3>
                  <p className="text-muted-foreground">
                    Book sessions at times that work for your family, including evenings and weekends.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center group">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 group-hover:bg-emerald-200 transition-colors duration-300">
                  <MessageSquare className="h-10 w-10 text-emerald-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Regular Updates</h3>
                  <p className="text-muted-foreground">
                    Receive progress reports and stay informed about your child's academic development.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="w-full py-12 md:py-24 lg:py-28 bg-emerald-50">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-flex items-center px-3 py-1 mb-2 text-sm font-medium rounded-full bg-emerald-100 text-emerald-700">
                Simple Process
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                How <span className="text-emerald-600">Tutorswala</span> Works
              </h2>
              <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Getting started with Tutorswala is easy and straightforward.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 md:grid-cols-3 md:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg">
                  <span className="text-xl font-bold">1</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Tell Us Your Needs</h3>
                  <p className="text-muted-foreground">
                    Share your child's subject requirements, schedule preferences, and learning goals.
                  </p>
                </div>
                <div className="hidden md:block absolute top-8 right-0 w-full h-0.5 bg-emerald-200"></div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg">
                  <span className="text-xl font-bold">2</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Match with a Tutor</h3>
                  <p className="text-muted-foreground">
                    We'll connect you with tutors who match your requirements and schedule a free consultation.
                  </p>
                </div>
                <div className="hidden md:block absolute top-8 right-0 w-full h-0.5 bg-emerald-200"></div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg">
                  <span className="text-xl font-bold">3</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Start Learning</h3>
                  <p className="text-muted-foreground">
                    Begin personalized tutoring sessions online or in-person and track progress along the way.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tutors Section */}
        <section id="tutors" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                  Our Team
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Meet Our Expert Tutors</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our tutors are passionate educators committed to helping students achieve their full potential.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex flex-col items-center space-y-4 rounded-lg border p-4">
                  <Image
                    src={`/placeholder.svg?height=200&width=200&text=Tutor+${i}`}
                    width={100}
                    height={100}
                    alt={`Tutor ${i}`}
                    className="rounded-full object-cover"
                  />
                  <div className="space-y-2 text-center">
                    <h3 className="text-xl font-bold">Tutor Name</h3>
                    <p className="text-sm text-emerald-600 font-medium">
                      {["Mathematics", "Science", "English", "History", "Computer Science", "Languages"][i - 1]}{" "}
                      Specialist
                    </p>
                    <div className="flex justify-center">
                      <div className="flex">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className="h-4 w-4 fill-current text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {Math.floor(Math.random() * 10) + 3} years experience
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Button className="bg-emerald-600 hover:bg-emerald-700">View All Tutors</Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-emerald-50">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Parents Say</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Don't just take our word for it. Here's what parents have to say about Tutorswala.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col justify-between space-y-4 rounded-xl bg-white p-6 shadow-sm">
                  <div className="space-y-2">
                    <div className="flex">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-current text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      "Tutorswala has been a game-changer for my child. Their grades have improved significantly, and
                      they actually look forward to their tutoring sessions now!"
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Image
                      src={`/placeholder.svg?height=40&width=40&text=P${i}`}
                      width={40}
                      height={40}
                      alt="Parent"
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium">Parent Name</p>
                      <p className="text-xs text-muted-foreground">
                        Parent of a Grade {Math.floor(Math.random() * 12) + 1} Student
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-28 bg-emerald-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-white"></div>
          </div>
          <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Child's Learning Experience?
                </h2>
                <p className="mx-auto max-w-[700px] md:text-xl/relaxed">
                  Join thousands of satisfied parents who have seen their children thrive with Tutorswala.
                </p>
              </div>
              <div className="flex flex-col gap-3 min-[400px]:flex-row">
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50 text-base">
                  Find a Tutor Now
                </Button>
                <Button size="lg" variant="outline" className="bg-white text-emerald-600 hover:bg-emerald-50 text-base">
                  Schedule a Free Consultation
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">FAQ</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Frequently Asked Questions</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find answers to common questions about our tutoring services.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2">
              {[
                {
                  q: "How are tutors selected?",
                  a: "All tutors undergo a rigorous selection process including background checks, subject knowledge tests, and teaching demonstrations.",
                },
                {
                  q: "Can I change tutors if needed?",
                  a: "Yes, if you feel the tutor is not a good fit, we'll match you with another tutor at no additional cost.",
                },
                {
                  q: "Are sessions online or in-person?",
                  a: "We offer both online and in-person tutoring options depending on your preference and location.",
                },
                {
                  q: "How do I track my child's progress?",
                  a: "You'll receive regular progress reports and can schedule check-in meetings with tutors to discuss your child's development.",
                },
                {
                  q: "What ages do you serve?",
                  a: "We provide tutoring for students from elementary school through college level.",
                },
                {
                  q: "What subjects do you cover?",
                  a: "We cover all major academic subjects including Math, Science, English, History, Languages, and test preparation.",
                },
              ].map((faq, i) => (
                <div key={i} className="space-y-2">
                  <h3 className="text-xl font-bold">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-emerald-50">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                  Contact Us
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get in Touch</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Have questions? We're here to help. Reach out to our team.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                    <MessageSquare className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email Us</p>
                    <p className="text-sm text-muted-foreground">info@tutorswala.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                    <Clock className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Business Hours</p>
                    <p className="text-sm text-muted-foreground">Monday - Friday: 9am - 6pm</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                    <Users className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Social Media</p>
                    <div className="flex space-x-2 pt-1">
                      {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((social, i) => (
                        <Link key={i} href="#" className="text-xs text-emerald-600 hover:underline">
                          {social}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <input
                      id="name"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <input
                    id="subject"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Subject"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Your message"
                    rows={4}
                  ></textarea>
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Send Message</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-background py-6">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-emerald-600" />
                <span className="text-xl font-bold">Tutorswala.com</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Connecting students with expert tutors for academic success.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-emerald-600 hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="text-muted-foreground hover:text-emerald-600 hover:underline">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#tutors" className="text-muted-foreground hover:text-emerald-600 hover:underline">
                    Our Tutors
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-muted-foreground hover:text-emerald-600 hover:underline">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-emerald-600 hover:underline">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-emerald-600 hover:underline">
                    Study Tips
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-emerald-600 hover:underline">
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-emerald-600 hover:underline">
                    Parent Resources
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-emerald-600 hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-emerald-600 hover:underline">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-emerald-600 hover:underline">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Tutorswala.com. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Contact Widget */}
      <ContactWidget />
    </div>
  )
}

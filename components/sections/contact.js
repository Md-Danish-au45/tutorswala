"use client"; // This directive marks the component as a client component

// Removed 'import Link from "next/link";' as it's not supported in this environment.
// Using standard 'a' tags for links instead.
import { MessageSquare, Clock, Users, Phone } from "lucide-react"; // Import Phone icon
import { useState } from "react"; // Import useState for form handling

const ContactSection = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // State for showing a message (e.g., success/error) instead of alert()
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    const formEndpoint = "http://localhost:5006/api/contact"; // Your backend

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(response, "data");

      if (response.ok) {
        setMessage("Message sent successfully!");
        setMessageType("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setMessage("Failed to send message. Please try again.");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessage("An error occurred. Please try again later.");
      setMessageType("error");
    }
  };

  return (
    <section
      id="contact"
      className="w-full py-12 md:py-24 lg:py-32 bg-emerald-50"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
              Contact Us
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Get in Touch
            </h2>
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
                <p className="text-sm text-muted-foreground">
                  info@tutorswala.com
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                <Clock className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Business Hours</p>
                <p className="text-sm text-muted-foreground">
                  Monday - Friday: 9am - 6pm
                </p>
              </div>
            </div>

            {/* Mobile Number Setup */}
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                <Phone className="h-5 w-5 text-emerald-600" />{" "}
                {/* Phone icon */}
              </div>
              <div>
                <p className="text-sm font-medium">Mobile Number</p>
                <p className="text-sm text-muted-foreground">
                  <a href="tel:+918920942943" className="hover:underline">
                    {" "}
                    {/* Added tel: link for click-to-call */}
                    +91 8920942943
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                <Users className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Social Media</p>
                <div className="flex space-x-2 pt-1">
                  {["Facebook", "Twitter", "Instagram", "LinkedIn"].map(
                    (social, i) => (
                      // Changed Link to a standard 'a' tag
                      <a
                        key={i}
                        href="#" // Placeholder for actual social media links
                        className="text-xs text-emerald-600 hover:underline"
                      >
                        {social}
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {/* Add onSubmit to the form element */}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Your name"
                    value={formData.name} // Bind value to state
                    onChange={handleChange} // Add onChange handler
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
                    value={formData.email} // Bind value to state
                    onChange={handleChange} // Add onChange handler
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
                  value={formData.subject} // Bind value to state
                  onChange={handleChange} // Add onChange handler
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
                  value={formData.message} // Bind value to state
                  onChange={handleChange} // Add onChange handler
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Send Message
              </button>
              {/* Display message based on form submission */}
              {message && (
                <p
                  className={`mt-4 text-center ${
                    messageType === "success"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

// app/tuition/[slug]/page.js
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  SEO_KEYWORDS,
  findKeywordBySlug,
  generateContentData,
  getRelatedKeywords,
  createSlug,
} from "../../../utils/seoData";

export default function TuitionPage({ params }) {
  const { slug } = params;
  const keyword = findKeywordBySlug(slug);

  if (!keyword) {
    notFound();
  }

  const content = generateContentData(keyword);
  const relatedKeywords = getRelatedKeywords(keyword);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {content.hero.title}
            </h1>
            <p className="text-xl md:text-2xl mb-6 opacity-90">
              {content.hero.subtitle}
            </p>
            <p className="text-lg mb-8 max-w-3xl mx-auto opacity-80">
              {content.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#contact"
                className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Find Tutors Now
              </Link>
              <Link
                href="#features"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose Tutorswala in {content.location}?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive {content.serviceType} with a focus on
              academic excellence and student success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.content.features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-emerald-600 rounded"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature}
                </h3>
                <p className="text-gray-600">
                  {index % 2 === 0
                    ? `Professional ${feature.toLowerCase()} to ensure quality education in ${
                        content.location
                      }.`
                    : `Comprehensive ${feature.toLowerCase()} for better learning outcomes.`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subjects Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Subjects We Cover
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive tutoring for all major subjects in{" "}
              {content.location}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {content.content.subjects.map((subject, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 rounded-lg text-center hover:bg-emerald-50 transition-colors"
              >
                <h3 className="font-semibold text-gray-800">{subject}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grades Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Classes & Grades
            </h2>
            <p className="text-lg text-gray-600">
              Tutoring services for all educational levels in {content.location}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.content.grades.map((grade, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {grade}
                </h3>
                <p className="text-gray-600">
                  Specialized tutoring for {grade.toLowerCase()} students with
                  customized curriculum.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Services Section */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Related Services
            </h2>
            <p className="text-lg text-gray-600">
              Explore other tutoring services in nearby areas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedKeywords.map((relatedKeyword, index) => {
              const relatedContent = generateContentData(relatedKeyword);
              return (
                <Link
                  key={index}
                  href={`/tuition/${createSlug(relatedKeyword)}`}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                    {relatedContent.serviceType.charAt(0).toUpperCase() +
                      relatedContent.serviceType.slice(1)}{" "}
                    in {relatedContent.location}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {relatedContent.description.substring(0, 100)}...
                  </p>
                  <div className="mt-3 text-emerald-600 text-sm font-medium group-hover:underline">
                    Learn More →
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="py-16 bg-emerald-600">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white opacity-90 mb-8">
            Contact us today to find the perfect tutor in {content.location}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/register"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              About {content.serviceType} in {content.location}
            </h2>
            <p className="text-gray-600 mb-4">
              Tutorswala is the leading platform for {content.serviceType} in{" "}
              {content.location}. We connect students with qualified and
              experienced tutors who provide personalized attention to help
              students achieve their academic goals.
            </p>
            <p className="text-gray-600 mb-4">
              Our tutors in {content.location} are carefully selected and
              verified to ensure they meet our high standards of teaching
              excellence. Whether you need help with specific subjects, exam
              preparation, or overall academic improvement, we have the right
              tutor for you.
            </p>
            {content.isOnlineOffline && (
              <p className="text-gray-600 mb-4">
                We offer both online and offline tutoring modes in{" "}
                {content.location}, giving you the flexibility to choose the
                learning method that works best for you. Our online classes are
                interactive and engaging, while our offline sessions provide
                face-to-face interaction.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }) {
  const slug = params?.slug;
  const keyword = findKeywordBySlug(slug);

  if (!keyword) {
    return {
      title: "Page Not Found",
      description: "The page you are looking for does not exist.",
    };
  }

  const content = generateContentData(keyword);

  return {
    title: `${content.hero.title} | Tutorswala`,
    description: content.description,
    keywords: `${keyword}, tutoring, education, ${content.location}, home tuition, online tutoring`,
    openGraph: {
      title: `${content.hero.title} | Tutorswala`,
      description: content.description,
      type: "website",
    },
  };
}

// Generate static params for all SEO keywords
export async function generateStaticParams() {
  return SEO_KEYWORDS.map((keyword) => ({
    slug: createSlug(keyword),
  }));
}

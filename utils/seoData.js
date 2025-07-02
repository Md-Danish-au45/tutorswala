// utils/seoData.js

export const SEO_KEYWORDS = [
  // Delhi Areas
  "Home Tuition Tutors Brar Square Online Offline Mode",
  "Home Tuition Tutors Karol Bagh Online Offline Mode",
  "Home Tuition Tutors Near Dev Nagar",
  "Home Tuition Tutors Near Paschim Vihar",
  "Home Tuition Tutors Near Pusa Road",
  "Home Tuition Tutors Near Rajouri Garden",
  "Home Tuition Tutors Near Regar Pura",
  "Home Tuition Tutors Near Sarai Rohilla",
  "Home Tuition Tutors Uttam Nagar Online Offline Mode",
  "Home Tutoring services Near Inderpuri",
  "Home Tutoring services Near Kirti Nagar",
  "Home Tutoring services Near Moti Nagar",
  "Home Tutors Subhash Nagar, Home Tuition Subhash Nagar",
  "Home Tutors Tagore Garden, Home Tuition Tagore Garden",
  "Home Tutors Uttam Nagar, Home Tuition Uttam Nagar",
  "Home Tutors Vikas Puri, Home Tuition Vikas Puri",
  "Home Tutors West Delhi, Home Tuition West Delhi, Tution West Delhi",

  // NCR & Nearby Areas
  "Home Tuition Tutors Baird Place Online Offline Mode",
  "Home Tuition Tutors in Anand Parbat",
  "Home Tuition Tutors Near Bijwasan",
  "Home Tuition Tutors Near Gopi Nath",
  "Home Tuition Tutors Near Prasad Nagar",
  "Home Tuition Tutors Near Raja Garden",
  "Home Tuition Tutors Near Ramjas Road",
  "Home Tuition Tutors Near Rohtak Road",
  "Home Tuition Tutors Near Subroto Park",
  "Home Tutoring Near Hari Nagar",
  "Home Tutoring services Near Kapashera",
  "Home Tutoring services Near Maya Enclave",
  "Home Tutors in Delhi, Home Tuition in Delhi",
  "Home Tutors Sunder Vihar, Home Tuition Sunder Vihar",
  "Home Tutors Tilak Nagar, Home Tuition Tilak Nagar",
  "Home Tutors Vikas Kunj, Home Tuition Vikas Kunj",
  "Home Tutors Vishnu Garden, Home Tuition Vishnu Garden",
];

export const SEO_CATEGORIES = {
  "Delhi Areas": [
    "Home Tuition Tutors Brar Square Online Offline Mode",
    "Home Tuition Tutors Karol Bagh Online Offline Mode",
    "Home Tuition Tutors Near Dev Nagar",
    "Home Tuition Tutors Near Paschim Vihar",
    "Home Tuition Tutors Near Pusa Road",
    "Home Tuition Tutors Near Rajouri Garden",
    "Home Tuition Tutors Near Regar Pura",
    "Home Tuition Tutors Near Sarai Rohilla",
    "Home Tuition Tutors Uttam Nagar Online Offline Mode",
    "Home Tutoring services Near Inderpuri",
    "Home Tutoring services Near Kirti Nagar",
    "Home Tutoring services Near Moti Nagar",
    "Home Tutors Subhash Nagar, Home Tuition Subhash Nagar",
    "Home Tutors Tagore Garden, Home Tuition Tagore Garden",
    "Home Tutors Uttam Nagar, Home Tuition Uttam Nagar",
    "Home Tutors Vikas Puri, Home Tuition Vikas Puri",
    "Home Tutors West Delhi, Home Tuition West Delhi, Tution West Delhi",
  ],
  "NCR & Nearby Areas": [
    "Home Tuition Tutors Baird Place Online Offline Mode",
    "Home Tuition Tutors in Anand Parbat",
    "Home Tuition Tutors Near Bijwasan",
    "Home Tuition Tutors Near Gopi Nath",
    "Home Tuition Tutors Near Prasad Nagar",
    "Home Tuition Tutors Near Raja Garden",
    "Home Tuition Tutors Near Ramjas Road",
    "Home Tuition Tutors Near Rohtak Road",
    "Home Tuition Tutors Near Subroto Park",
    "Home Tutoring Near Hari Nagar",
    "Home Tutoring services Near Kapashera",
    "Home Tutoring services Near Maya Enclave",
    "Home Tutors in Delhi, Home Tuition in Delhi",
    "Home Tutors Sunder Vihar, Home Tuition Sunder Vihar",
    "Home Tutors Tilak Nagar, Home Tuition Tilak Nagar",
    "Home Tutors Vikas Kunj, Home Tuition Vikas Kunj",
    "Home Tutors Vishnu Garden, Home Tuition Vishnu Garden",
  ],
};

// Utility functions
export const createSlug = (keyword) => {
  return keyword
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const extractLocation = (keyword) => {
  const locationMatches = keyword.match(
    /Near ([A-Za-z\s]+)|in ([A-Za-z\s]+)|([A-Za-z\s]+) Online|([A-Za-z\s]+),/
  );
  if (locationMatches) {
    return (
      locationMatches[1] ||
      locationMatches[2] ||
      locationMatches[3] ||
      locationMatches[4] ||
      "Delhi NCR"
    );
  }
  return "Delhi NCR";
};

export const getServiceType = (keyword) => {
  if (keyword.includes("Tutoring services")) return "tutoring services";
  if (keyword.includes("Home Tutors")) return "home tutors";
  return "home tuition";
};

export const isOnlineOfflineMode = (keyword) => {
  return keyword.includes("Online Offline");
};

export const generateContentData = (keyword) => {
  const location = extractLocation(keyword);
  const serviceType = getServiceType(keyword);
  const onlineOffline = isOnlineOfflineMode(keyword);

  return {
    title: keyword,
    location: location,
    serviceType: serviceType,
    isOnlineOffline: onlineOffline,
    hero: {
      // This `hero` object was moved up in the original `generateContentData`
      title: `Best ${
        serviceType.charAt(0).toUpperCase() + serviceType.slice(1)
      } in ${location}`,
      subtitle: `Connect with qualified tutors in ${location} for personalized learning experience`,
      description: `Tutorswala provides premium ${serviceType} in ${location} with verified tutors, flexible scheduling, and guaranteed results. ${
        onlineOffline
          ? "Choose from online or offline tutoring modes."
          : "Customized learning plans for every student."
      }`,
    },
    description: `Find the best ${serviceType} in ${location}. Professional tutors for all subjects and grades. ${
      onlineOffline
        ? "Both online and offline modes available."
        : "Flexible learning options available."
    }`,
    content: {
      features: [
        "Verified & Experienced Tutors",
        "Flexible Scheduling",
        "All Subjects Coverage",
        "Personalized Learning Plans",
        "Regular Progress Tracking",
        "Affordable Pricing",
        ...(onlineOffline
          ? ["Online & Offline Modes", "Interactive Digital Classes"]
          : ["One-on-One Attention", "Home Visit Facility"]),
      ],
      subjects: [
        "Mathematics",
        "Science",
        "English",
        "Social Studies",
        "Hindi",
        "Physics",
        "Chemistry",
        "Biology",
        "Economics",
        "Accountancy",
        "Computer Science",
        "Business Studies",
        "Geography",
        "History",
      ],
      grades: [
        "Class 1-5 (Primary)",
        "Class 6-8 (Middle School)",
        "Class 9-10 (Secondary)",
        "Class 11-12 (Senior Secondary)",
        "Competitive Exams",
        "College Level",
      ],
      benefits: [
        "Personalized attention for each student",
        "Flexible timing to suit your schedule",
        "Regular assessments and progress reports",
        "Experienced and qualified tutors",
        "Affordable pricing packages",
        "Free demo classes available",
      ],
    },
  };
};

export const findKeywordBySlug = (slug) => {
  return SEO_KEYWORDS.find((keyword) => createSlug(keyword) === slug);
};

export const getRelatedKeywords = (currentKeyword, limit = 6) => {
  const currentLocation = extractLocation(currentKeyword);
  const related = SEO_KEYWORDS.filter((keyword) => keyword !== currentKeyword)
    .filter((keyword) => {
      const keywordLocation = extractLocation(keyword);
      return (
        keywordLocation === currentLocation ||
        keyword.includes("Delhi") ||
        currentKeyword.includes("Delhi")
      );
    })
    .slice(0, limit);

  return related;
};

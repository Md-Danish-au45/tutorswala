// "use client"; // Keep this line

// import Link from "next/link";
// import Image from "next/image";
// import ContactWidget from "../widgets/contact-widget";
// // import logo from "../../public/images/logo/logo.png"; // If not used directly, can remove
// import bringmarkLogo from "../../public/images/logo/logo.png";
// import useFooterKeywords from "../../hooks/useFooterKeywords";

// // You might also need a createSlug function if it's not imported elsewhere
// // For now, let's assume it exists or needs to be provided.
// // If createSlug is not defined anywhere, you'll need to define it or
// // adjust how the slug is generated for the "More Locations" sections.
// // If the data from the API already has 'slug', then you should use item.slug instead of createSlug(keyword)

// const Footer = () => {
//   const { delhiKeywords, ncrKeywords } = useFooterKeywords();

//   // Define createSlug if it's not imported or globally available
//   // This is a common way to create slugs from titles.
//   const createSlug = (text) => {
//     return text
//       .toString()
//       .normalize("NFD")
//       .replace(/[\u0300-\u036f]/g, "")
//       .toLowerCase()
//       .trim()
//       .replace(/\s+/g, "-")
//       .replace(/[^\w-]+/g, "")
//       .replace(/--+/g, "-");
//   };

//   return (
//     <div>
//       <footer className="w-full border-t bg-background py-8">
//         <div className="container mx-auto px-4 md:px-6 max-w-7xl">
//           <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
//             {/* Brand Section */}
//             <div className="space-y-4 lg:col-span-1">
//               <div className="flex items-center gap-2">
//                 <Image
//                   src="/images/logo/logod.png"
//                   alt="Tutorswala Logo"
//                   width={32}
//                   height={32}
//                   className="h-8 w-8"
//                 />
//                 <span className="text-xl font-bold">Tutorswala.com</span>
//               </div>
//               <p className="text-sm text-muted-foreground">
//                 Connecting students with expert tutors for academic success
//                 across Delhi NCR.
//               </p>
//             </div>

//             {/* Quick Links */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-medium">Quick Links</h3>
//               <ul className="space-y-2 text-sm">
//                 <li>
//                   <Link
//                     href="/"
//                     className="text-muted-foreground hover:text-emerald-600 hover:underline"
//                   >
//                     Home
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="#features"
//                     className="text-muted-foreground hover:text-emerald-600 hover:underline"
//                   >
//                     Features
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="#tutors"
//                     className="text-muted-foreground hover:text-emerald-600 hover:underline"
//                   >
//                     Our Tutors
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="#pricing"
//                     className="text-muted-foreground hover:text-emerald-600 hover:underline"
//                   >
//                     Pricing
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             {/* Resources */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-medium">Resources</h3>
//               <ul className="space-y-2 text-sm">
//                 <li>
//                   <Link
//                     href="/blog"
//                     className="text-muted-foreground hover:text-emerald-600 hover:underline"
//                   >
//                     Blog
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/study-tips"
//                     className="text-muted-foreground hover:text-emerald-600 hover:underline"
//                   >
//                     Study Tips
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/success-stories"
//                     className="text-muted-foreground hover:text-emerald-600 hover:underline"
//                   >
//                     Success Stories
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/parent-resources"
//                     className="text-muted-foreground hover:text-emerald-600 hover:underline"
//                   >
//                     Parent Resources
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             {/* SEO Links - Delhi Areas */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-medium">Delhi Areas</h3>
//               <ul className="space-y-1 text-xs max-h-64 overflow-y-auto">
//                 {/* Corrected: Use delhiKeywords directly */}
//                 {delhiKeywords.slice(0, 12).map((item, index) => (
//                   <li key={index}>
//                     <Link
//                       href={`/tuition/${item.slug}`}
//                       className="text-muted-foreground hover:text-emerald-600 hover:underline transition-colors duration-200 line-clamp-1"
//                       title={item.title}
//                     >
//                       {item.title.length > 35
//                         ? item.title.slice(0, 35) + "..."
//                         : item.title}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* SEO Links - NCR Areas */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-medium">NCR & Nearby</h3>
//               <ul className="space-y-1 text-xs max-h-64 overflow-y-auto">
//                 {/* Corrected: Use ncrKeywords directly */}
//                 {ncrKeywords.slice(0, 12).map((item, index) => (
//                   <li key={index}>
//                     <Link
//                       href={`/tuition/${item.slug}`}
//                       className="text-muted-foreground hover:text-emerald-600 hover:underline transition-colors duration-200 line-clamp-1"
//                       title={item.title}
//                     >
//                       {item.title.length > 35
//                         ? item.title.slice(0, 35) + "..."
//                         : item.title}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {/* Extended SEO Links Section */}
//           <div className="mt-8 border-t pt-6">
//             <div className="grid gap-6 md:grid-cols-2">
//               <div className="space-y-3">
//                 <h4 className="text-sm font-medium text-muted-foreground">
//                   More Delhi Locations
//                 </h4>
//                 <div className="flex flex-wrap gap-2">
//                   {/* Corrected: Use delhiKeywords directly */}
//                   {delhiKeywords.slice(12).map((item, index) => (
//                     <Link
//                       key={index}
//                       href={`/tuition/${item.slug}`} // Assuming item.slug exists from API
//                       className="text-xs px-2 py-1 bg-muted rounded-md hover:bg-emerald-100 hover:text-emerald-700 transition-colors duration-200"
//                       title={item.title}
//                     >
//                       {item.title.split(" ").slice(0, 3).join(" ")}
//                     </Link>
//                   ))}
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 <h4 className="text-sm font-medium text-muted-foreground">
//                   More NCR Locations
//                 </h4>
//                 <div className="flex flex-wrap gap-2">
//                   {/* Corrected: Use ncrKeywords directly */}
//                   {ncrKeywords.slice(12).map((item, index) => (
//                     <Link
//                       key={index}
//                       href={`/tuition/${item.slug}`} // Assuming item.slug exists from API
//                       className="text-xs px-2 py-1 bg-muted rounded-md hover:bg-emerald-100 hover:text-emerald-700 transition-colors duration-200"
//                       title={item.title}
//                     >
//                       {item.title.split(" ").slice(0, 3).join(" ")}
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Legal Links */}
//           <div className="mt-6 pt-4 border-t">
//             <div className="flex flex-wrap gap-4 text-sm text-muted-foreground justify-center mb-4">
//               <Link
//                 href="/privacy-policy"
//                 className="hover:text-emerald-600 hover:underline"
//               >
//                 Privacy Policy
//               </Link>
//               <span>•</span>
//               <Link
//                 href="/terms-of-service"
//                 className="hover:text-emerald-600 hover:underline"
//               >
//                 Terms of Service
//               </Link>
//               <span>•</span>
//               <Link
//                 href="/cookie-policy"
//                 className="hover:text-emerald-600 hover:underline"
//               >
//                 Cookie Policy
//               </Link>
//             </div>
//           </div>

//           {/* Footer Bottom */}
//           <div className="border-t pt-6">
//             <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-muted-foreground">
//               <div className="flex items-center gap-1">
//                 &copy; {new Date().getFullYear()} Tutorswala.com. All rights
//                 reserved
//               </div>
//               <div className="hidden sm:block">|</div>
//               <div className="flex items-center gap-2">
//                 Developed by{" "}
//                 <a
//                   href="https://bringmark.com"
//                   target="_blank"
//                   rel="noopener"
//                   className="text-emerald-600 hover:underline"
//                 >
//                   Bringmark
//                 </a>
//                 <a
//                   href="https://bringmark.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-1 hover:opacity-80 transition-opacity"
//                 >
//                   <Image
//                     src={bringmarkLogo}
//                     alt="Bringmark Logo"
//                     width={90}
//                     height={90}
//                     className="h-5 w-auto rounded-full"
//                   />
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>
//       <ContactWidget />
//     </div>
//   );
// };

// export default Footer;
"use client";

import Link from "next/link";
import Image from "next/image";
import ContactWidget from "../widgets/contact-widget";
import bringmarkLogo from "../../public/images/logo/logo.png";
import useFooterKeywords from "../../hooks/useFooterKeywords";

const Footer = () => {
  const { delhiKeywords, ncrKeywords } = useFooterKeywords();

  const createSlug = (text) => {
    return text
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-");
  };

  return (
    <div>
      <footer className="w-full border-t bg-background py-8">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
            {/* Brand Section */}
            <div className="space-y-4 lg:col-span-1">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/logo/logod.png"
                  alt="Tutorswala Logo"
                  width={82}
                  height={82}
                  className="h-8 w-8"
                />
                <span className="text-xl font-bold">TutorsWala</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Connecting students with expert tutors for academic success
                across Delhi NCR.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-emerald-600 hover:underline"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#features"
                    className="text-muted-foreground hover:text-emerald-600 hover:underline"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#tutors"
                    className="text-muted-foreground hover:text-emerald-600 hover:underline"
                  >
                    Our Tutors
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="text-muted-foreground hover:text-emerald-600 hover:underline"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/blog"
                    className="text-muted-foreground hover:text-emerald-600 hover:underline"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/study-tips"
                    className="text-muted-foreground hover:text-emerald-600 hover:underline"
                  >
                    Study Tips
                  </Link>
                </li>
                <li>
                  <Link
                    href="/success-stories"
                    className="text-muted-foreground hover:text-emerald-600 hover:underline"
                  >
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link
                    href="/parent-resources"
                    className="text-muted-foreground hover:text-emerald-600 hover:underline"
                  >
                    Parent Resources
                  </Link>
                </li>
              </ul>
            </div>

            {/* SEO Links - Delhi Areas */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Delhi Areas</h3>
              <ul className="space-y-1 text-xs max-h-64 overflow-y-auto">
                {delhiKeywords.slice(0, 12).map((item, index) => (
                  <li key={index}>
                    <Link
                      href={`/tuition/${item.slug || createSlug(item.title)}`}
                      className="text-muted-foreground hover:text-emerald-600 hover:underline transition-colors duration-200 line-clamp-1"
                      title={item.title}
                    >
                      {item.title.length > 35
                        ? item.title.slice(0, 35) + "..."
                        : item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* SEO Links - NCR Areas */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">NCR & Nearby</h3>
              <ul className="space-y-1 text-xs max-h-64 overflow-y-auto">
                {ncrKeywords.slice(0, 12).map((item, index) => (
                  <li key={index}>
                    <Link
                      href={`/tuition/${item.slug || createSlug(item.title)}`}
                      className="text-muted-foreground hover:text-emerald-600 hover:underline transition-colors duration-200 line-clamp-1"
                      title={item.title}
                    >
                      {item.title.length > 35
                        ? item.title.slice(0, 35) + "..."
                        : item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Extended SEO Links Section */}
          <div className="mt-8 border-t pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">
                  More Delhi Locations
                </h4>
                <div className="flex flex-wrap gap-2">
                  {delhiKeywords.slice(12).map((item, index) => (
                    <Link
                      key={index}
                      href={`/tuition/${item.slug || createSlug(item.title)}`}
                      className="text-xs px-2 py-1 bg-muted rounded-md hover:bg-emerald-100 hover:text-emerald-700 transition-colors duration-200"
                      title={item.title}
                    >
                      {item.title.split(" ").slice(0, 3).join(" ")}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">
                  More NCR Locations
                </h4>
                <div className="flex flex-wrap gap-2">
                  {ncrKeywords.slice(12).map((item, index) => (
                    <Link
                      key={index}
                      href={`/tuition/${item.slug || createSlug(item.title)}`}
                      className="text-xs px-2 py-1 bg-muted rounded-md hover:bg-emerald-100 hover:text-emerald-700 transition-colors duration-200"
                      title={item.title}
                    >
                      {item.title.split(" ").slice(0, 3).join(" ")}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Legal Links */}
          <div className="mt-6 pt-4 border-t">
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground justify-center mb-4">
              <Link
                href="/privacy-policy"
                className="hover:text-emerald-600 hover:underline"
              >
                Privacy Policy
              </Link>
              <span>•</span>
              <Link
                href="/terms-of-service"
                className="hover:text-emerald-600 hover:underline"
              >
                Terms of Service
              </Link>
              <span>•</span>
              <Link
                href="/cookie-policy"
                className="hover:text-emerald-600 hover:underline"
              >
                Cookie Policy
              </Link>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t pt-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                &copy; {new Date().getFullYear()} Tutorswala.com. All rights
                reserved
              </div>
              <div className="hidden sm:block">|</div>
              <div className="flex items-center gap-2">
                Developed by{" "}
                <a
                  href="https://bringmark.com"
                  target="_blank"
                  rel="noopener"
                  className="text-emerald-600 hover:underline"
                >
                  Bringmark
                </a>
                <a
                  href="https://bringmark.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:opacity-80 transition-opacity"
                >
                  <Image
                    src={bringmarkLogo}
                    alt="Bringmark Logo"
                    width={90}
                    height={90}
                    className="h-5 w-auto rounded-full"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <ContactWidget />
    </div>
  );
};

export default Footer;

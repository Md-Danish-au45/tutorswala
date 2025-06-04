import { GraduationCap, Calendar, MessageSquare } from "lucide-react"

export default function FeaturesSection() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-28">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-flex items-center px-3 py-1 mb-2 text-sm font-medium rounded-full bg-emerald-100 text-emerald-700">
            Why Choose Us
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl max-w-[800px]">
            Designed for <span className="text-emerald-600">Parents & Students</span>
          </h2>
          <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed">
            We make finding and scheduling tutoring sessions simple.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-8 py-12 lg:grid-cols-3 lg:gap-12">
          {[
            {
              icon: <GraduationCap className="h-10 w-10 text-emerald-600" />,
              title: "Expert Tutors",
              description: "All our tutors are thoroughly vetted and experienced."
            },
            {
              icon: <Calendar className="h-10 w-10 text-emerald-600" />,
              title: "Flexible Scheduling",
              description: "Book sessions at times that work for your family."
            },
            {
              icon: <MessageSquare className="h-10 w-10 text-emerald-600" />,
              title: "Regular Updates",
              description: "Receive progress reports about your child's development."
            }
          ].map((feature, index) => (
            <div key={index} className="flex flex-col items-center space-y-4 text-center group">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 group-hover:bg-emerald-200 transition-colors duration-300">
                {feature.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
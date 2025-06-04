import Image from "next/image"
import { Button } from '@/components/ui/button'
import { CheckCircle } from "lucide-react"
import landingpage from '../../public/images/landing/landingpage.png'

export default function HeroSection() {
  return (
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
                Tutorswala connects your child with experienced tutors for personalized learning.
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
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
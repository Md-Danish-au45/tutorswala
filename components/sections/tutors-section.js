import Image from "next/image"
import { tutorsData } from '../../data/tutors'

export default function TutorsSection() {
  return (
    <section id="tutors" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
            Our Team
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Meet Our Expert Tutors</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
            Our tutors are passionate educators committed to helping students.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {tutorsData.map((tutor) => (
            <div key={tutor.id} className="flex flex-col items-center space-y-4 rounded-lg border hover:bg-[#eefdf6] p-4 hover:shadow-md transition-shadow">
              <Image
                src={tutor.image}
                width={100}
                height={100}
                alt={tutor.name}
                className="rounded-full object-cover h-24 w-24"
              />
              <div className="space-y-2 text-center">
                <h3 className="text-xl font-bold">{tutor.name}</h3>
                <p className="text-sm text-emerald-600 font-medium">
                  {tutor.subject} Specialist
                </p>
                <p className="text-xs text-muted-foreground">
                  {tutor.experience} years experience
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
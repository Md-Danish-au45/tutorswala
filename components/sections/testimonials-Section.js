import Image from 'next/image';
import {testimonialsData} from '../../data/testimonials'

const Testimonials = () => {
  return (
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
          {testimonialsData.map((testimonial, i) => (
            <div key={i} className="flex flex-col justify-between space-y-4 rounded-xl bg-white p-6 shadow-sm">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {testimonial.quote}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Image
                  src={testimonial.image || `/placeholder.svg?height=40&width=40&text=${testimonial.name.charAt(0)}`}
                  width={40}
                  height={40}
                  alt={testimonial.name}
                  className="rounded-full aspect-square object-cover"
                />
                <div>
                  <p className="text-sm font-medium">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Parent of a Grade {testimonial.grade} Student
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
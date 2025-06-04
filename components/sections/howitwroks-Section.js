const HowItWorks = () => {
    return (
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
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg">
                <span className="text-xl font-bold">1</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Tell Us Your Needs</h3>
                <p className="text-muted-foreground">
                  Share your child's subject requirements, schedule preferences, and learning goals.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg">
                <span className="text-xl font-bold">2</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Match with a Tutor</h3>
                <p className="text-muted-foreground">
                  We'll connect you with tutors who match your requirements and schedule a free consultation.
                </p>
              </div>
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
    );
  };
  
  export default HowItWorks;
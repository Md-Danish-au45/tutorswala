const CTASection = () => {
    return (
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
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-11 px-8 bg-white text-emerald-600 hover:bg-emerald-50 text-base">
                Find a Tutor Now
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-11 px-8 bg-white text-emerald-600 hover:bg-emerald-50 text-base">
                Schedule a Free Consultation
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default CTASection;
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    text: "Found my perfect companion! The quiz matched me with a Golden Retriever and it's been amazing.",
    rating: 5,
    dogBreed: "Golden Retriever"
  },
  {
    name: "Mike T.",
    text: "As a first-time owner, this helped me choose the right breed. My Labrador is everything they predicted!",
    rating: 5,
    dogBreed: "Labrador"
  },
  {
    name: "Emma L.",
    text: "Living in an apartment, I wasn't sure what breed would work. My Cavalier is the perfect fit!",
    rating: 5,
    dogBreed: "Cavalier King Charles"
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Happy Paw-rents Love Us!
          </h2>
          <p className="text-xl text-muted-foreground">
            See how Pawfect Match helped them find their ideal companions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="shadow-elegant hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <div className="flex justify-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent fill-current" />
                  ))}
                </div>
                
                <p className="text-muted-foreground italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                <div className="space-y-2">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-hero">Matched with: {testimonial.dogBreed}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface PaymentSectionProps {
  onPaymentComplete: () => void;
}

export const PaymentSection = ({ onPaymentComplete }: PaymentSectionProps) => {
  const handlePayment = () => {
    // For now, we'll simulate payment completion
    // TODO: Integrate with Stripe when Supabase is connected
    setTimeout(() => {
      onPaymentComplete();
    }, 1000);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary/20 to-accent/10 px-4 py-16">
      <div className="max-w-md mx-auto w-full">
        <Card className="shadow-elegant border-2">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-success" />
            </div>
            <CardTitle className="text-2xl">Unlock Your Perfect Match!</CardTitle>
            <p className="text-muted-foreground">
              Get your personalized dog breed recommendation with detailed insights about your perfect companion.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span>AI-Powered Breed Match</span>
                <span className="font-semibold">$1.00</span>
              </div>
              <div className="text-sm text-muted-foreground">
                • Personalized breed recommendation
              </div>
              <div className="text-sm text-muted-foreground">
                • Detailed personality traits
              </div>
              <div className="text-sm text-muted-foreground">
                • Care instructions & tips
              </div>
            </div>
            
            <Button 
              variant="hero" 
              className="w-full"
              onClick={handlePayment}
            >
              Get My Match for $1 💳
            </Button>
            
            <p className="text-xs text-center text-muted-foreground">
              Secure payment powered by Stripe. Your data is safe and encrypted.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
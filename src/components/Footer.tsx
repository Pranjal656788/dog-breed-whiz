export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-2xl">🐾</span>
            <h3 className="text-2xl font-bold">Pawfect Match</h3>
          </div>
          
          <p className="text-primary-foreground/80 max-w-md mx-auto">
            Helping first-time dog owners find their perfect companion through AI-powered matching.
          </p>
          
          <div className="flex justify-center space-x-8 text-sm">
            <a href="#about" className="hover:text-accent transition-colors">
              About
            </a>
            <a href="#contact" className="hover:text-accent transition-colors">
              Contact
            </a>
            <a href="#privacy" className="hover:text-accent transition-colors">
              Privacy Policy
            </a>
          </div>
          
          <div className="pt-6 border-t border-primary-foreground/20 text-sm text-primary-foreground/60">
            © 2024 Pawfect Match. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
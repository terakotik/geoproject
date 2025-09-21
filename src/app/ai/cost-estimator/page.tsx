import { CostEstimatorForm } from './CostEstimatorForm';
import { Calculator } from 'lucide-react';

export default function CostEstimatorPage() {
  return (
    <div className="py-16 md:py-24 bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="mx-auto bg-primary/20 text-primary rounded-full p-4 w-fit mb-4">
               <Calculator className="h-10 w-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-headline">AI Cost Estimator</h1>
            <p className="mt-4 text-muted-foreground">
              Provide details about your geodesy project to receive an AI-powered cost estimation. This tool helps in preliminary budget planning.
            </p>
          </div>
          <CostEstimatorForm />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { estimateCost, CostEstimationOutput } from '@/ai/flows/cost-estimation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, AlertCircle, BadgeDollarSign, FileText, Activity } from 'lucide-react';

type ServerActionResult = {
  data: CostEstimationOutput | null;
  error: string | null;
  timestamp: number;
};

async function formAction(prevState: ServerActionResult, formData: FormData): Promise<ServerActionResult> {
  const projectType = formData.get('projectType') as string;
  const projectSize = formData.get('projectSize') as string;
  const location = formData.get('location') as string;
  const complexity = formData.get('complexity') as string;
  const additionalServices = formData.get('additionalServices') as string;

  if (!projectType || !projectSize || !location || !complexity) {
    return { data: null, error: "Please fill all required fields.", timestamp: Date.now() };
  }
  
  try {
    const result = await estimateCost({ projectType, projectSize, location, complexity, additionalServices });
    return { data: result, error: null, timestamp: Date.now() };
  } catch (e) {
    const error = e instanceof Error ? e.message : "An unknown error occurred.";
    return { data: null, error, timestamp: Date.now() };
  }
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? "Estimating..." : "Estimate Cost"}
    </Button>
  );
}

export function CostEstimatorForm() {
  const [state, action] = useFormState(formAction, { data: null, error: null, timestamp: 0 });

  return (
    <Card className="shadow-lg bg-card">
      <CardHeader>
        <CardTitle>Project Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="projectType">Project Type</Label>
              <Input id="projectType" name="projectType" placeholder="e.g., Land Surveying" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectSize">Project Size (sq. meters)</Label>
              <Input id="projectSize" name="projectSize" type="number" placeholder="e.g., 5000" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" placeholder="e.g., City, State" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="complexity">Project Complexity</Label>
            <Select name="complexity" required>
                <SelectTrigger id="complexity">
                    <SelectValue placeholder="Select complexity" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="additionalServices">Additional Services</Label>
            <Textarea id="additionalServices" name="additionalServices" placeholder="e.g., Drone mapping, 3D modeling" />
          </div>
          <SubmitButton />
        </form>

        {state.error && (
          <Card className="mt-6 bg-destructive/10 border-destructive text-destructive">
            <CardHeader className="flex-row items-center gap-4">
              <AlertCircle className="h-6 w-6" />
              <CardTitle>Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{state.error}</p>
            </CardContent>
          </Card>
        )}
        
        {state.data && (
          <Card className="mt-6 bg-card" key={state.timestamp}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <BadgeDollarSign className="h-8 w-8 text-green-600" />
                <CardTitle>Cost Estimation Results</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground">Estimated Cost</p>
                <p className="text-3xl font-bold">${state.data.estimatedCost.toLocaleString()}</p>
              </div>
              <div className="space-y-2">
                 <h3 className="font-semibold flex items-center gap-2"><FileText className="h-5 w-5" /> Cost Breakdown</h3>
                 <p className="text-muted-foreground bg-secondary/50 p-4 rounded-md border">{state.data.costBreakdown}</p>
              </div>
              <div className="space-y-2">
                 <h3 className="font-semibold flex items-center gap-2"><Activity className="h-5 w-5" /> Confidence Level</h3>
                 <p className="text-muted-foreground font-medium capitalize">{state.data.confidenceLevel}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}

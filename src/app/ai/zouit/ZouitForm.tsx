"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { zouitIdentification, ZouitIdentificationOutput } from '@/ai/flows/zouit-identification';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, AlertCircle, CheckCircle, FileText } from 'lucide-react';

type ServerActionResult = {
  data: ZouitIdentificationOutput | null;
  error: string | null;
  timestamp: number;
};

async function formAction(prevState: ServerActionResult, formData: FormData): Promise<ServerActionResult> {
  const location = formData.get('location') as string;
  if (!location || location.length < 5) {
    return { data: null, error: "Please enter a valid location or address.", timestamp: Date.now() };
  }
  try {
    const result = await zouitIdentification({ location });
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
      {pending ? "Analyzing..." : "Identify Zone"}
    </Button>
  );
}

export function ZouitForm() {
  const [state, action] = useFormState(formAction, { data: null, error: null, timestamp: 0 });

  return (
    <Card className="shadow-lg bg-card">
      <CardHeader>
        <CardTitle>Check Location</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="location" className="text-lg">Location or Address</Label>
            <Input id="location" name="location" placeholder="e.g., 123 Main St, Anytown, USA" required minLength={5} />
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
                {state.data.isInZouit ? 
                  <CheckCircle className="h-8 w-8 text-green-600" /> : 
                  <AlertCircle className="h-8 w-8 text-amber-600" />
                }
                <CardTitle>
                  {state.data.isInZouit ? "This location IS in a ZOUIT zone." : "This location IS NOT in a ZOUIT zone."}
                </CardTitle>
              </div>
            </CardHeader>
            {state.data.isInZouit && (
              <CardContent>
                <div className="space-y-4">
                   <h3 className="font-semibold flex items-center gap-2"><FileText className="h-5 w-5" /> Applicable Regulations Summary</h3>
                   <p className="text-muted-foreground bg-secondary/50 p-4 rounded-md border">{state.data.regulations}</p>
                </div>
              </CardContent>
            )}
          </Card>
        )}
      </CardContent>
    </Card>
  );
}

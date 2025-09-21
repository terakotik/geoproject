import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, FileText, PlusCircle } from "lucide-react";

export default function DashboardPage() {
  const projects = [
    { name: "Downtown Tower Construction", status: "In Progress", lastUpdate: "2 hours ago" },
    { name: "Suburban Subdivision Survey", status: "Completed", lastUpdate: "3 days ago" },
    { name: "Coastal Erosion Study", status: "On Hold", lastUpdate: "1 week ago" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-headline">Welcome back, Client!</h1>
          <p className="text-muted-foreground">Here's a summary of your projects.</p>
        </div>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Project Request
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Card key={index} className="bg-card">
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>Status: <span className="font-semibold">{project.status}</span></CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <Activity className="mr-2 h-4 w-4" />
                <span>Last update: {project.lastUpdate}</span>
              </div>
              <Button variant="outline" className="mt-4 w-full">View Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Recent Documents</CardTitle>
          <CardDescription>Your latest files and reports are available here.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <span>Final_Report_Downtown_Tower.pdf</span>
              </div>
              <Button variant="ghost" size="sm">Download</Button>
            </li>
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <span>Topographic_Map_Subdivision.dwg</span>
              </div>
              <Button variant="ghost" size="sm">Download</Button>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

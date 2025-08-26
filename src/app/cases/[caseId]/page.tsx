"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function CaseDetailPage() {
  const params = useParams();
  const caseId = params.caseId as string;
  const [newNote, setNewNote] = useState("");
  const [showFeeDialog, setShowFeeDialog] = useState(false);
  const [fees, setFees] = useState([
    {
      id: "1",
      type: "court",
      description: "Filing fee for initial complaint",
      amount: 450.00,
      date: "2024-01-15",
      billable: true,
      invoiceId: "INV-001"
    },
    {
      id: "2",
      type: "translation",
      description: "Document translation services",
      amount: 125.00,
      date: "2024-01-20",
      billable: true,
      invoiceId: null
    },
    {
      id: "3",
      type: "authentication",
      description: "Document authentication and notarization",
      amount: 75.00,
      date: "2024-01-25",
      billable: true,
      invoiceId: null
    }
  ]);

  const [newFee, setNewFee] = useState({
    type: "court",
    description: "",
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    billable: true,
    notes: ""
  });

  // Mock data - in a real app, this would be fetched based on caseId
  const caseData = {
    id: caseId,
    title: "Johnson vs. Smith",
    client: "Michael Johnson",
    status: "Active",
    type: "Personal Injury",
    dateCreated: "2024-01-15",
    nextHearing: "2024-02-20",
    description: "Motor vehicle accident case involving rear-end collision on Highway 101. Client sustained injuries including whiplash and back pain. Seeking compensation for medical expenses, lost wages, and pain and suffering.",
    attorney: "John Doe",
    courtLocation: "Superior Court of California, County of San Francisco",
    caseNumber: "CV-2024-001234",
  };

  const documents = [
    {
      id: "1",
      name: "Initial Complaint",
      type: "Legal Document",
      uploadDate: "2024-01-15",
      size: "2.3 MB",
    },
    {
      id: "2",
      name: "Medical Records",
      type: "Evidence",
      uploadDate: "2024-01-18",
      size: "5.7 MB",
    },
    {
      id: "3",
      name: "Police Report",
      type: "Evidence",
      uploadDate: "2024-01-20",
      size: "1.2 MB",
    },
  ];

  const timeline = [
    {
      date: "2024-01-15",
      event: "Case opened",
      description: "Initial consultation completed and case file created",
    },
    {
      date: "2024-01-18",
      event: "Documents received",
      description: "Medical records and police report obtained",
    },
    {
      date: "2024-01-25",
      event: "Complaint filed",
      description: "Initial complaint filed with the court",
    },
    {
      date: "2024-02-01",
      event: "Discovery phase",
      description: "Discovery requests sent to opposing counsel",
    },
  ];

  const notes = [
    {
      id: "1",
      date: "2024-01-15",
      author: "John Doe",
      content: "Client reports severe back pain following the accident. Recommended immediate medical attention.",
    },
    {
      id: "2",
      date: "2024-01-20",
      author: "John Doe",
      content: "Reviewed police report. Clear evidence of defendant's fault. Proceeding with case preparation.",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Review":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Pending":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      // In a real app, this would make an API call
      console.log("Adding note:", newNote);
      setNewNote("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/cases" className="text-muted-foreground hover:text-foreground">
              Cases
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">{caseData.title}</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">{caseData.title}</h1>
          <p className="text-muted-foreground mt-2">Case #{caseData.caseNumber}</p>
        </div>
        <div className="flex gap-2">
          <Badge className={getStatusColor(caseData.status)}>
            {caseData.status}
          </Badge>
          <Button variant="outline">Edit Case</Button>
        </div>
      </div>

      {/* Case Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Client Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm font-medium text-foreground">Name</p>
              <p className="text-sm text-muted-foreground">{caseData.client}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Case Type</p>
              <p className="text-sm text-muted-foreground">{caseData.type}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Attorney</p>
              <p className="text-sm text-muted-foreground">{caseData.attorney}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Case Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm font-medium text-foreground">Date Created</p>
              <p className="text-sm text-muted-foreground">{caseData.dateCreated}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Next Hearing</p>
              <p className="text-sm text-muted-foreground">{caseData.nextHearing}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Court</p>
              <p className="text-sm text-muted-foreground">{caseData.courtLocation}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              Schedule Hearing
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Upload Document
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Generate Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Case Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{caseData.description}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Case Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex justify-between items-center p-3 border border-border rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {doc.type} • {doc.size} • Uploaded {doc.uploadDate}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View</Button>
                      <Button variant="outline" size="sm">Download</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Case Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeline.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      {index < timeline.length - 1 && (
                        <div className="w-px h-12 bg-border mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-foreground">{item.event}</p>
                          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{item.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Add New Note</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Enter your note here..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    rows={3}
                  />
                  <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                    Add Note
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Case Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notes.map((note) => (
                    <div key={note.id} className="p-4 border border-border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-medium text-foreground">{note.author}</p>
                        <span className="text-xs text-muted-foreground">{note.date}</span>
                      </div>
                      <p className="text-sm text-foreground">{note.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="fees">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Case Fees</h2>
              <Button onClick={() => setShowFeeDialog(true)}>
                Add New Fee
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Fee Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Total Fees</p>
                    <p className="text-2xl font-bold text-foreground">
                      ${fees.reduce((sum, fee) => sum + fee.amount, 0).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Billable Fees</p>
                    <p className="text-2xl font-bold text-foreground">
                      ${fees.filter(f => f.billable).reduce((sum, fee) => sum + fee.amount, 0).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Unbilled Fees</p>
                    <p className="text-2xl font-bold text-foreground">
                      ${fees.filter(f => f.billable && !f.invoiceId).reduce((sum, fee) => sum + fee.amount, 0).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Fee Count</p>
                    <p className="text-2xl font-bold text-foreground">{fees.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fee Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Billable</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fees.map((fee) => (
                      <TableRow key={fee.id}>
                        <TableCell className="capitalize">{fee.type}</TableCell>
                        <TableCell>{fee.description}</TableCell>
                        <TableCell>${fee.amount.toLocaleString()}</TableCell>
                        <TableCell>{fee.date}</TableCell>
                        <TableCell>{fee.billable ? "Yes" : "No"}</TableCell>
                        <TableCell>
                          {fee.invoiceId ? (
                            <Badge variant="outline" className="bg-green-100 text-green-800">
                              Invoiced
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                              Pending
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">Delete</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {fees.filter(f => f.billable && !f.invoiceId).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Add Unbilled Fees to Invoice</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <p className="text-muted-foreground">
                      {fees.filter(f => f.billable && !f.invoiceId).length} unbilled fees totaling $
                      {fees.filter(f => f.billable && !f.invoiceId).reduce((sum, fee) => sum + fee.amount, 0).toLocaleString()}
                    </p>
                    <Button onClick={() => alert('Invoice integration feature - would open invoice selection dialog')}>
                      Add to Invoice
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

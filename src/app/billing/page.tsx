"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function BillingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewInvoiceForm, setShowNewInvoiceForm] = useState(false);

  const invoices = [
    {
      id: "INV-001",
      client: "Michael Johnson",
      case: "Johnson vs. Smith",
      amount: 5500.00,
      date: "2024-01-15",
      dueDate: "2024-02-15",
      status: "paid",
      description: "Legal services for personal injury case",
      hoursWorked: 22,
      hourlyRate: 250,
    },
    {
      id: "INV-002",
      client: "Sarah Williams",
      case: "Williams Estate Planning",
      amount: 3200.00,
      date: "2024-01-20",
      dueDate: "2024-02-20",
      status: "pending-approval",
      description: "Estate planning and will preparation",
      hoursWorked: 16,
      hourlyRate: 200,
    },
    {
      id: "INV-003",
      client: "TechCorp Inc.",
      case: "Corporate Legal Review",
      amount: 8750.00,
      date: "2024-01-25",
      dueDate: "2024-02-25",
      status: "overdue",
      description: "Contract review and legal consultation",
      hoursWorked: 35,
      hourlyRate: 250,
    },
    {
      id: "INV-004",
      client: "Jennifer Davis",
      case: "Davis Divorce Proceedings",
      amount: 4200.00,
      date: "2024-01-28",
      dueDate: "2024-02-28",
      status: "sent",
      description: "Family law services and court representation",
      hoursWorked: 21,
      hourlyRate: 200,
    },
    {
      id: "INV-005",
      client: "Robert Chen",
      case: "Chen Business Formation",
      amount: 2800.00,
      date: "2024-01-30",
      dueDate: "2024-03-01",
      status: "draft",
      description: "Business formation and incorporation services",
      hoursWorked: 14,
      hourlyRate: 200,
    },
    {
      id: "INV-006",
      client: "Emma Thompson",
      case: "Thompson IP Litigation",
      amount: 6800.00,
      date: "2024-01-18",
      dueDate: "2024-02-18",
      status: "paid",
      description: "Patent infringement defense",
      hoursWorked: 27,
      hourlyRate: 250,
    },
    {
      id: "INV-007",
      client: "Global Consulting Ltd",
      case: "Contract Dispute Resolution",
      amount: 9500.00,
      date: "2024-01-22",
      dueDate: "2024-02-22",
      status: "sent",
      description: "Commercial litigation services",
      hoursWorked: 38,
      hourlyRate: 250,
    },
  ];

  const timeEntries = [
    {
      id: "1",
      date: "2024-01-30",
      client: "Michael Johnson",
      case: "Johnson vs. Smith",
      description: "Review medical records and prepare case summary",
      hours: 3.5,
      rate: 250,
      amount: 875.00,
      billable: true,
    },
    {
      id: "2",
      date: "2024-01-30",
      client: "Sarah Williams",
      case: "Williams Estate Planning",
      description: "Draft will and trust documents",
      hours: 2.0,
      rate: 200,
      amount: 400.00,
      billable: true,
    },
    {
      id: "3",
      date: "2024-01-29",
      client: "TechCorp Inc.",
      case: "Corporate Legal Review",
      description: "Contract negotiation meeting",
      hours: 4.0,
      rate: 250,
      amount: 1000.00,
      billable: true,
    },
    {
      id: "4",
      date: "2024-01-29",
      client: "Jennifer Davis",
      case: "Davis Divorce Proceedings",
      description: "Court hearing preparation",
      hours: 2.5,
      rate: 200,
      amount: 500.00,
      billable: true,
    },
  ];

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.case.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "Sent":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Overdue":
        return "bg-red-100 text-red-800 border-red-200";
      case "Draft":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const totalRevenue = invoices.filter(inv => inv.status === "Paid").reduce((sum, inv) => sum + inv.amount, 0);
  const pendingAmount = invoices.filter(inv => inv.status === "Pending" || inv.status === "Sent").reduce((sum, inv) => sum + inv.amount, 0);
  const overdueAmount = invoices.filter(inv => inv.status === "Overdue").reduce((sum, inv) => sum + inv.amount, 0);

  const handleNewInvoice = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real app, this would create a new invoice
    console.log("Creating new invoice");
    setShowNewInvoiceForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Billing</h1>
          <p className="text-muted-foreground mt-2">
            Manage invoices, track payments, and monitor revenue
          </p>
        </div>
        <Button 
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => setShowNewInvoiceForm(true)}
        >
          Create Invoice
        </Button>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">
              ${totalRevenue.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">
              ${pendingAmount.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">Pending Payments</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              ${overdueAmount.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">Overdue Amount</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">
              {invoices.length}
            </div>
            <p className="text-sm text-muted-foreground">Total Invoices</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <Input
          placeholder="Search invoices by client, case, or invoice number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* New Invoice Form */}
      {showNewInvoiceForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Invoice</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleNewInvoice} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="client">Client</Label>
                  <Input id="client" placeholder="Select client" required />
                </div>
                <div>
                  <Label htmlFor="case">Case</Label>
                  <Input id="case" placeholder="Select case" required />
                </div>
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" type="number" step="0.01" placeholder="0.00" required />
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input id="dueDate" type="date" required />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Invoice description" rows={3} />
              </div>
              <div className="flex gap-2">
                <Button type="submit">Create Invoice</Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowNewInvoiceForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      <Tabs defaultValue="invoices" className="space-y-4">
        <TabsList>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="time-tracking">Time Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((invoice) => (
                <Card key={invoice.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{invoice.id}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {invoice.client}
                        </p>
                      </div>
                      <Badge className={getStatusColor(invoice.status)}>
                        {invoice.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">Case</p>
                        <p className="text-sm text-muted-foreground">{invoice.case}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-foreground">Description</p>
                        <p className="text-sm text-muted-foreground">{invoice.description}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-foreground">Amount</p>
                          <p className="text-lg font-bold text-foreground">
                            ${invoice.amount.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Hours</p>
                          <p className="text-muted-foreground">
                            {invoice.hoursWorked}h @ ${invoice.hourlyRate}/hr
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-foreground">Invoice Date</p>
                          <p className="text-muted-foreground">{invoice.date}</p>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Due Date</p>
                          <p className="text-muted-foreground">{invoice.dueDate}</p>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Send
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No invoices found matching your search.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="time-tracking">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Time Entries</CardTitle>
                <Button variant="outline">Add Time Entry</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeEntries.map((entry) => (
                  <div key={entry.id} className="flex justify-between items-center p-4 border border-border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{entry.description}</p>
                        {entry.billable && (
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            Billable
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {entry.client} • {entry.case}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {entry.date} • {entry.hours} hours @ ${entry.rate}/hr
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground">
                        ${entry.amount.toLocaleString()}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Delete</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

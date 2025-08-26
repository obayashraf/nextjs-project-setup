"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const clients = [
    {
      id: "1",
      name: "Michael Johnson",
      email: "michael.johnson@email.com",
      phone: "(555) 123-4567",
      company: "Johnson Enterprises",
      status: "Active",
      activeCases: 2,
      totalCases: 3,
      dateAdded: "2024-01-10",
      lastContact: "2024-01-28",
    },
    {
      id: "2",
      name: "Sarah Williams",
      email: "sarah.williams@email.com",
      phone: "(555) 234-5678",
      company: "Williams Family Trust",
      status: "Active",
      activeCases: 1,
      totalCases: 1,
      dateAdded: "2024-01-08",
      lastContact: "2024-01-25",
    },
    {
      id: "3",
      name: "TechCorp Inc.",
      email: "legal@techcorp.com",
      phone: "(555) 345-6789",
      company: "TechCorp Inc.",
      status: "Active",
      activeCases: 1,
      totalCases: 5,
      dateAdded: "2023-12-15",
      lastContact: "2024-01-30",
    },
    {
      id: "4",
      name: "Jennifer Davis",
      email: "jennifer.davis@email.com",
      phone: "(555) 456-7890",
      company: null,
      status: "Inactive",
      activeCases: 0,
      totalCases: 2,
      dateAdded: "2023-11-20",
      lastContact: "2024-01-15",
    },
    {
      id: "5",
      name: "Robert Chen",
      email: "robert.chen@email.com",
      phone: "(555) 567-8901",
      company: "Chen & Associates",
      status: "Active",
      activeCases: 3,
      totalCases: 4,
      dateAdded: "2024-01-05",
      lastContact: "2024-01-29",
    },
  ];

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (client.company && client.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200";
      case "Inactive":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Clients</h1>
          <p className="text-muted-foreground mt-2">
            Manage your client relationships and contact information
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Add New Client
        </Button>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <Input
          placeholder="Search clients by name, email, or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">
              {clients.filter(c => c.status === "Active").length}
            </div>
            <p className="text-sm text-muted-foreground">Active Clients</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">
              {clients.length}
            </div>
            <p className="text-sm text-muted-foreground">Total Clients</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">
              {clients.reduce((sum, client) => sum + client.activeCases, 0)}
            </div>
            <p className="text-sm text-muted-foreground">Active Cases</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">
              {clients.filter(c => {
                const lastContact = new Date(c.lastContact);
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return lastContact >= weekAgo;
              }).length}
            </div>
            <p className="text-sm text-muted-foreground">Recent Contacts</p>
          </CardContent>
        </Card>
      </div>

      {/* Clients List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClients.length > 0 ? (
          filteredClients.map((client) => (
            <Card key={client.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{client.name}</CardTitle>
                    {client.company && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {client.company}
                      </p>
                    )}
                  </div>
                  <Badge className={getStatusColor(client.status)}>
                    {client.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">Contact</p>
                    <p className="text-sm text-muted-foreground">{client.email}</p>
                    <p className="text-sm text-muted-foreground">{client.phone}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-foreground">Active Cases</p>
                      <p className="text-muted-foreground">{client.activeCases}</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Total Cases</p>
                      <p className="text-muted-foreground">{client.totalCases}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-foreground">Added</p>
                      <p className="text-muted-foreground">{client.dateAdded}</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Last Contact</p>
                      <p className="text-muted-foreground">{client.lastContact}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Link href={`/clients/${client.id}`}>
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No clients found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

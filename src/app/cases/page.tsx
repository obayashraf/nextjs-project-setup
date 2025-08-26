"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CasesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // Initialize selected status from URL params
  useEffect(() => {
    const statusParam = searchParams.get("status");
    if (statusParam) {
      setSelectedStatus(statusParam);
    }
  }, [searchParams]);

  const statusCategories = ["All", "Active", "In Review", "Pending", "Concluded"];

  const cases = [
    {
      id: "1",
      title: "Johnson vs. Smith",
      client: "Michael Johnson",
      status: "Active",
      type: "Personal Injury",
      dateCreated: "2024-01-15",
      nextHearing: "2024-02-20",
      description: "Motor vehicle accident case involving rear-end collision",
    },
    {
      id: "2",
      title: "Estate Planning - Williams",
      client: "Sarah Williams",
      status: "In Review",
      type: "Estate Planning",
      dateCreated: "2024-01-10",
      nextHearing: null,
      description: "Comprehensive estate planning including will and trust setup",
    },
    {
      id: "3",
      title: "Corporate Law - TechCorp",
      client: "TechCorp Inc.",
      status: "Active",
      type: "Corporate Law",
      dateCreated: "2024-01-05",
      nextHearing: "2024-02-15",
      description: "Contract negotiation and compliance review",
    },
    {
      id: "4",
      title: "Divorce Proceedings - Davis",
      client: "Jennifer Davis",
      status: "Pending",
      type: "Family Law",
      dateCreated: "2024-01-20",
      nextHearing: "2024-02-25",
      description: "Uncontested divorce with child custody arrangements",
    },
    {
      id: "5",
      title: "Contract Dispute - ABC Corp",
      client: "ABC Corporation",
      status: "Concluded",
      type: "Corporate Law",
      dateCreated: "2023-12-01",
      nextHearing: null,
      description: "Contract dispute resolved through mediation",
    },
  ];

  // Handle status tab change
  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    // Update URL query parameter
    if (status === "All" || status === "") {
      router.push("/cases");
    } else {
      router.push(`/cases?status=${status}`);
    }
  };

  // Filter cases based on search term and status filter
  const filteredCases = cases.filter((case_) => {
    const matchesSearch =
      case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = selectedStatus === "" || selectedStatus === "All"
      ? true
      : case_.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Review":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Pending":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Concluded":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cases</h1>
          <p className="text-muted-foreground mt-2">
            Manage and track all your legal cases
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          New Case
        </Button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 border-b border-border">
        {statusCategories.map((status) => (
          <button
            key={status}
            onClick={() => handleStatusChange(status)}
            className={`px-4 py-2 font-medium rounded-t-lg border-b-2 transition-colors ${
              (selectedStatus === status) || (selectedStatus === "" && status === "All")
                ? "border-primary text-primary bg-background"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <Input
          placeholder="Search cases, clients, or case types..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCases.length > 0 ? (
          filteredCases.map((case_) => (
            <Card key={case_.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{case_.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Client: {case_.client}
                    </p>
                  </div>
                  <Badge className={getStatusColor(case_.status)}>
                    {case_.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">Case Type</p>
                    <p className="text-sm text-muted-foreground">{case_.type}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-foreground">Description</p>
                    <p className="text-sm text-muted-foreground">{case_.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-foreground">Created</p>
                      <p className="text-muted-foreground">{case_.dateCreated}</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Next Hearing</p>
                      <p className="text-muted-foreground">
                        {case_.nextHearing || "Not scheduled"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Link href={`/cases/${case_.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
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
            <p className="text-muted-foreground">No cases found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

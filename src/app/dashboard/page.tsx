"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileText, DollarSign, TrendingUp, AlertCircle } from "lucide-react";

export default function EnhancedDashboardPage() {
  const [timeFilter, setTimeFilter] = useState("7d");
  const [loading, setLoading] = useState(false);

  const stats = [
    {
      title: "Active Cases",
      value: "12",
      change: "+2",
      trend: "up",
      description: "Currently in progress",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      href: "/cases?status=Active"
    },
    {
      title: "Upcoming Appointments",
      value: "5",
      change: "+1",
      trend: "up",
      description: "Next 7 days",
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-50",
      href: "/calendar?filter=upcoming"
    },
    {
      title: "Pending Documents",
      value: "8",
      change: "-3",
      trend: "down",
      description: "Awaiting review",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      href: "/documents"
    },
    {
      title: "Outstanding Invoices",
      value: "$24,500",
      change: "+$5,200",
      trend: "up",
      description: "Total amount due",
      icon: DollarSign,
      color: "text-red-600",
      bgColor: "bg-red-50",
      href: "/billing?filter=overdue"
    },
  ];

  const caseProgress = [
    {
      name: "Johnson vs. Smith",
      progress: 75,
      status: "Discovery Phase",
      deadline: "2024-02-15",
      priority: "high"
    },
    {
      name: "Estate Planning - Williams",
      progress: 45,
      status: "Document Review",
      deadline: "2024-02-20",
      priority: "medium"
    },
    {
      name: "Corporate Merger - TechCorp",
      progress: 90,
      status: "Final Review",
      deadline: "2024-02-10",
      priority: "high"
    },
  ];

  const recentActivity = [
    {
      action: "New case filed",
      client: "Johnson vs. Smith",
      time: "2 hours ago",
      href: "/cases/1",
      type: "case",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      action: "Document uploaded",
      client: "Estate Planning - Williams",
      time: "4 hours ago",
      href: "/documents",
      type: "document",
      icon: FileText,
      color: "text-green-600"
    },
    {
      action: "Appointment scheduled",
      client: "Corporate Law - TechCorp",
      time: "1 day ago",
      href: "/calendar",
      type: "appointment",
      icon: Calendar,
      color: "text-purple-600"
    },
    {
      action: "Invoice sent",
      client: "Personal Injury - Davis",
      time: "2 days ago",
      href: "/billing",
      type: "invoice",
      icon: DollarSign,
      color: "text-orange-600"
    },
  ];

  const revenueData = {
    thisMonth: "$45,200",
    lastMonth: "$38,900",
    growth: "+16.2%",
    outstanding: "$24,500"
  };

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Welcome back! Here's your practice overview for today.
          </p>
        </div>
        <div className="flex gap-2">
          <select 
            value={timeFilter} 
            onChange={(e) => setTimeFilter(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link key={index} href={stat.href} className="group">
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-3">
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <Link key={index} href={activity.href} className="block">
                  <div className="flex justify-between items-start p-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-foreground">
                        {activity.action}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.client}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link href="/dashboard/quick-actions/new-case" className="block">
                <div className="w-full text-left p-3 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                  <div className="font-medium">Create New Case</div>
                  <div className="text-sm text-muted-foreground">Start a new legal case</div>
                </div>
              </Link>
              <Link href="/dashboard/quick-actions/new-client" className="block">
                <div className="w-full text-left p-3 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                  <div className="font-medium">Add Client</div>
                  <div className="text-sm text-muted-foreground">Register a new client</div>
                </div>
              </Link>
              <Link href="/tasks" className="block">
                <div className="w-full text-left p-3 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                  <div className="font-medium">Create Task</div>
                  <div className="text-sm text-muted-foreground">Add a new legal task</div>
                </div>
              </Link>
              <Link href="/dashboard/quick-actions/new-appointment" className="block">
                <div className="w-full text-left p-3 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                  <div className="font-medium">Schedule Appointment</div>
                  <div className="text-sm text-muted-foreground">Book a meeting</div>
                </div>
              </Link>
              <Link href="/dashboard/quick-actions/new-invoice" className="block">
                <div className="w-full text-left p-3 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                  <div className="font-medium">Generate Invoice</div>
                  <div className="text-sm text-muted-foreground">Create billing invoice</div>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface UserProfileProps {
  user?: {
    name: string;
    email: string;
    image?: string;
    bio?: string;
    phone?: string;
    location?: string;
  };
  statistics?: {
    coursesCompleted: number;
    totalCourses: number;
    averageScore: number;
    hoursSpent: number;
  };
  certificates?: Array<{
    id: string;
    title: string;
    date: string;
    course: string;
  }>;
}

export default function UserProfile({
  user = {
    name: "John Doe",
    email: "john.doe@example.com",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    bio: "Passionate learner and software developer with interests in web development and machine learning.",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
  },
  statistics = {
    coursesCompleted: 8,
    totalCourses: 12,
    averageScore: 92,
    hoursSpent: 156,
  },
  certificates = [
    {
      id: "cert1",
      title: "Web Development Fundamentals",
      date: "2023-05-15",
      course: "Full-Stack Web Development",
    },
    {
      id: "cert2",
      title: "React Advanced Concepts",
      date: "2023-07-22",
      course: "Modern Frontend Development",
    },
    {
      id: "cert3",
      title: "Node.js and Express",
      date: "2023-09-10",
      course: "Backend Development",
    },
  ],
}: UserProfileProps) {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio || "",
    phone: user.phone || "",
    location: user.location || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the updated profile data to your backend
    console.log("Updated profile data:", formData);
    setEditMode(false);
  };

  const completionPercentage = statistics
    ? Math.round((statistics.coursesCompleted / statistics.totalCourses) * 100)
    : 0;

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-background">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList
          className={`grid w-full ${isAdmin ? "grid-cols-5" : "grid-cols-4"} mb-8`}
        >
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          {isAdmin && <TabsTrigger value="admin">Admin</TabsTrigger>}
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  View and update your profile details
                </CardDescription>
              </div>
              <Button
                variant={editMode ? "destructive" : "outline"}
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? "Cancel" : "Edit Profile"}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback>
                      {user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {editMode && (
                    <Button variant="outline" size="sm">
                      Change Photo
                    </Button>
                  )}
                </div>

                {editMode ? (
                  <form onSubmit={handleSubmit} className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={4}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button type="submit">Save Changes</Button>
                    </div>
                  </form>
                ) : (
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Full Name
                        </h3>
                        <p className="text-base">{user.name}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Email
                        </h3>
                        <p className="text-base">{user.email}</p>
                      </div>
                      {user.phone && (
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">
                            Phone
                          </h3>
                          <p className="text-base">{user.phone}</p>
                        </div>
                      )}
                      {user.location && (
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">
                            Location
                          </h3>
                          <p className="text-base">{user.location}</p>
                        </div>
                      )}
                    </div>
                    {user.bio && (
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Bio
                        </h3>
                        <p className="text-base">{user.bio}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Statistics Tab */}
        <TabsContent value="statistics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Learning Statistics</CardTitle>
              <CardDescription>Your progress and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Course Completion
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          {statistics.coursesCompleted} of{" "}
                          {statistics.totalCourses} courses
                        </span>
                        <span className="text-sm font-medium">
                          {completionPercentage}%
                        </span>
                      </div>
                      <Progress value={completionPercentage} />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Average Score</h3>
                    <div className="flex items-center gap-2">
                      <div className="text-3xl font-bold">
                        {statistics.averageScore}%
                      </div>
                      <Badge
                        variant={
                          statistics.averageScore >= 90
                            ? "default"
                            : "secondary"
                        }
                      >
                        {statistics.averageScore >= 90 ? "Excellent" : "Good"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Time Invested</h3>
                    <div className="text-3xl font-bold">
                      {statistics.hoursSpent} hours
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Total learning time
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Learning Streak
                    </h3>
                    <div className="text-3xl font-bold">14 days</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Current streak
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Certificates Tab */}
        <TabsContent value="certificates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Certificates</CardTitle>
              <CardDescription>
                Certificates earned from completed courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {certificates.length > 0 ? (
                  certificates.map((certificate) => (
                    <Card key={certificate.id} className="overflow-hidden">
                      <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <h3 className="text-lg font-medium">
                            {certificate.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {certificate.course}
                          </p>
                          <p className="text-sm mt-1">
                            Issued on{" "}
                            {new Date(certificate.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No certificates earned yet.
                    </p>
                    <p className="mt-2">
                      Complete courses to earn certificates!
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Admin Tab */}
        {isAdmin && (
          <TabsContent value="admin" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Admin Dashboard</CardTitle>
                <CardDescription>
                  Administrative tools and platform management
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Platform Statistics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span>Total Users:</span>
                          <span className="font-bold">1,247</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Active Courses:</span>
                          <span className="font-bold">24</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Revenue:</span>
                          <span className="font-bold">$12,450</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Completion Rate:</span>
                          <span className="font-bold">87%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Button className="w-full justify-start">
                          Add New Course
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          Manage Users
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          View Analytics
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          System Settings
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="text-sm">
                          New user registered: john.doe@example.com
                        </span>
                        <span className="text-xs text-muted-foreground">
                          2 hours ago
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="text-sm">
                          Course completed: React Fundamentals
                        </span>
                        <span className="text-xs text-muted-foreground">
                          4 hours ago
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="text-sm">
                          New course published: Advanced JavaScript
                        </span>
                        <span className="text-xs text-muted-foreground">
                          1 day ago
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="course-updates">Course updates</Label>
                    <input
                      type="checkbox"
                      id="course-updates"
                      defaultChecked
                      className="toggle"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="new-courses">
                      New course recommendations
                    </Label>
                    <input
                      type="checkbox"
                      id="new-courses"
                      defaultChecked
                      className="toggle"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="promotions">Promotions and discounts</Label>
                    <input type="checkbox" id="promotions" className="toggle" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="reminders">Learning reminders</Label>
                    <input
                      type="checkbox"
                      id="reminders"
                      defaultChecked
                      className="toggle"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Password</h3>
                <Button variant="outline">Change Password</Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Danger Zone</h3>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete Account</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove all your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-destructive text-destructive-foreground">
                        Delete Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

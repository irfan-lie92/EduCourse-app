import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import EnrolledCourses from "@/components/dashboard/EnrolledCourses";
import UserProfile from "@/components/dashboard/UserProfile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { authOptions } from "@/lib/auth";

export default async function DashboardPage() {
  // Get the user session
  const session = await getServerSession(authOptions);

  // Redirect to login if no session
  if (!session) {
    redirect("/login");
  }

  const isAdmin = session.user?.role === "admin";

  return (
    <div className="container mx-auto py-8 bg-background">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {isAdmin ? "Admin Dashboard" : "Dashboard"}
            </h1>
            <p className="text-muted-foreground">
              Welcome back, {session.user?.name || session.user?.email}!
              {isAdmin
                ? " Manage your platform."
                : " Here's your learning progress."}
            </p>
          </div>
          {isAdmin && (
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link href="/">View Landing Page</Link>
              </Button>
              <Button asChild>
                <Link href="/admin/courses">Manage Courses</Link>
              </Button>
            </div>
          )}
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-1 md:col-span-3">
            <CardHeader>
              <CardTitle>
                {isAdmin ? "Platform Overview" : "Learning Progress"}
              </CardTitle>
              <CardDescription>
                {isAdmin
                  ? "Monitor your platform's performance and statistics"
                  : "Track your course completion and achievements"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {isAdmin ? (
                  <>
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <h3 className="font-medium text-lg">Total Users</h3>
                      <p className="text-3xl font-bold">1,247</p>
                    </div>
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <h3 className="font-medium text-lg">Active Courses</h3>
                      <p className="text-3xl font-bold">24</p>
                    </div>
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <h3 className="font-medium text-lg">Revenue</h3>
                      <p className="text-3xl font-bold">$12,450</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <h3 className="font-medium text-lg">Courses Enrolled</h3>
                      <p className="text-3xl font-bold">5</p>
                    </div>
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <h3 className="font-medium text-lg">Completed</h3>
                      <p className="text-3xl font-bold">2</p>
                    </div>
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <h3 className="font-medium text-lg">Certificates</h3>
                      <p className="text-3xl font-bold">2</p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue={isAdmin ? "admin" : "courses"} className="w-full">
          <TabsList className="mb-4">
            {isAdmin ? (
              <>
                <TabsTrigger value="admin">Admin Panel</TabsTrigger>
                <TabsTrigger value="users">User Management</TabsTrigger>
                <TabsTrigger value="courses">Course Management</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
              </>
            ) : (
              <>
                <TabsTrigger value="courses">My Courses</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="recommendations">
                  Recommendations
                </TabsTrigger>
              </>
            )}
          </TabsList>

          {isAdmin && (
            <TabsContent value="admin" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Admin Controls</CardTitle>
                  <CardDescription>
                    Quick access to administrative functions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Button asChild className="h-20 flex-col">
                      <Link href="/admin/courses">
                        <span className="text-lg font-semibold">
                          Manage Courses
                        </span>
                        <span className="text-sm opacity-80">
                          Add, edit, delete courses
                        </span>
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="h-20 flex-col">
                      <Link href="/admin/users">
                        <span className="text-lg font-semibold">
                          Manage Users
                        </span>
                        <span className="text-sm opacity-80">
                          View and manage users
                        </span>
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="h-20 flex-col">
                      <Link href="/admin/analytics">
                        <span className="text-lg font-semibold">Analytics</span>
                        <span className="text-sm opacity-80">
                          View platform statistics
                        </span>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {isAdmin && (
            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    Manage registered users and their permissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Test User</h3>
                          <p className="text-sm text-muted-foreground">
                            test@example.com
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm">
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Admin User</h3>
                          <p className="text-sm text-muted-foreground">
                            admin@courseapp.com
                          </p>
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                            Admin
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          <TabsContent value="courses" className="space-y-4">
            {isAdmin ? (
              <Card>
                <CardHeader>
                  <CardTitle>Course Management</CardTitle>
                  <CardDescription>
                    Manage all courses on the platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">All Courses</h3>
                    <Button>Add New Course</Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <div
                        key={item}
                        className="border rounded-lg overflow-hidden"
                      >
                        <div className="aspect-video bg-muted relative">
                          <img
                            src={`https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=75`}
                            alt="Course thumbnail"
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium">Course Title {item}</h3>
                          <p className="text-sm text-muted-foreground">
                            Course description
                          </p>
                          <div className="mt-2 flex gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="destructive" size="sm">
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <EnrolledCourses />
            )}
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <UserProfile />
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Courses</CardTitle>
                <CardDescription>
                  Based on your interests and learning history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="border rounded-lg overflow-hidden"
                    >
                      <div className="aspect-video bg-muted relative">
                        <img
                          src={`https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=75`}
                          alt="Course thumbnail"
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">
                          Advanced Web Development
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Learn modern web development techniques
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-sm font-medium">$49.99</span>
                          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                            Bestseller
                          </span>
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
    </div>
  );
}

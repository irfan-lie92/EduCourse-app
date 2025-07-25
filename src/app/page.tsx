import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CourseList from "@/components/courses/CourseList";
import { ArrowRight, BookOpen, CheckCircle, Star, Users } from "lucide-react";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.role === "admin";

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Admin Navigation Bar */}
      {isAdmin && (
        <div className="bg-red-600 text-white py-2 px-4">
          <div className="container mx-auto flex justify-between items-center">
            <span className="text-sm font-medium">Admin Mode</span>
            <div className="flex gap-4">
              <Link href="/dashboard" className="text-sm hover:underline">
                Admin Dashboard
              </Link>
              <Link href="/admin/courses" className="text-sm hover:underline">
                Manage Courses
              </Link>
              <Link href="/admin/users" className="text-sm hover:underline">
                Manage Users
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container px-4 md:px-6 mx-auto flex flex-col items-center text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
            Expand Your Knowledge with Our Online Courses
          </h1>
          <p className="text-xl md:text-2xl max-w-[700px] text-white/80">
            Learn from industry experts and advance your career with our
            comprehensive course library.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            {session ? (
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-600 hover:bg-white/90"
              >
                <Link href="/dashboard">
                  {isAdmin ? "Admin Dashboard" : "My Dashboard"}
                </Link>
              </Button>
            ) : (
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-600 hover:bg-white/90"
              >
                <Link href="/register">Get Started</Link>
              </Button>
            )}
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-transparent border-white text-white hover:bg-white/20"
            >
              <Link href="#courses">Browse Courses</Link>
            </Button>
          </div>
          {!session && (
            <div className="mt-4">
              <p className="text-white/80 text-sm">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-white underline hover:no-underline"
                >
                  Sign in here
                </Link>
              </p>
              <p className="text-white/60 text-xs mt-2">
                Admin login: admin@courseapp.com / admin123
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Courses Section */}
      <section id="courses" className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Featured Courses
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover our most popular courses and start learning today.
            </p>
          </div>
          <CourseList />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="w-full py-12 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Simple, Transparent Pricing
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the plan that's right for you and start learning today.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {/* Basic Plan */}
            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>Basic</CardTitle>
                <CardDescription>For casual learners</CardDescription>
                <div className="mt-4 text-4xl font-bold">
                  $9.99
                  <span className="text-sm font-normal text-muted-foreground">
                    /month
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {[
                    "Access to 10 courses",
                    "Basic course materials",
                    "Community forum access",
                    "30-day money-back guarantee",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Get Started</Button>
              </CardFooter>
            </Card>

            {/* Pro Plan */}
            <Card className="flex flex-col h-full border-blue-500 shadow-lg">
              <CardHeader className="bg-blue-50 dark:bg-blue-900/20 rounded-t-lg">
                <div className="py-1 px-3 text-xs font-bold bg-blue-500 text-white rounded-full w-fit mx-auto mb-4">
                  MOST POPULAR
                </div>
                <CardTitle>Pro</CardTitle>
                <CardDescription>For dedicated students</CardDescription>
                <div className="mt-4 text-4xl font-bold">
                  $19.99
                  <span className="text-sm font-normal text-muted-foreground">
                    /month
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {[
                    "Access to 50+ courses",
                    "Advanced course materials",
                    "Priority community support",
                    "Course completion certificates",
                    "Downloadable resources",
                    "30-day money-back guarantee",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Get Started
                </Button>
              </CardFooter>
            </Card>

            {/* Premium Plan */}
            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>Premium</CardTitle>
                <CardDescription>For professional development</CardDescription>
                <div className="mt-4 text-4xl font-bold">
                  $39.99
                  <span className="text-sm font-normal text-muted-foreground">
                    /month
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {[
                    "Unlimited access to all courses",
                    "Premium course materials",
                    "1-on-1 mentoring sessions",
                    "Course completion certificates",
                    "Downloadable resources",
                    "Career guidance",
                    "Lifetime access",
                    "30-day money-back guarantee",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Get Started</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              What Our Students Say
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Don't just take our word for it. Here's what our students have to
              say about their learning experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {[
              {
                name: "Sarah Johnson",
                role: "UX Designer",
                content:
                  "The courses here completely transformed my career. I went from knowing nothing about UX design to landing my dream job in just 6 months.",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
              },
              {
                name: "Michael Chen",
                role: "Software Developer",
                content:
                  "The instructors are industry experts who provide practical knowledge that you can immediately apply. Best investment I've made in my education.",
                avatar:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
              },
              {
                name: "Emily Rodriguez",
                role: "Marketing Specialist",
                content:
                  "I've tried many online learning platforms, but this one stands out for its quality content and supportive community. Highly recommended!",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
              },
            ].map((testimonial, i) => (
              <Card key={i} className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="flex justify-center mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <CardTitle>{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "{testimonial.content}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              {
                icon: <Users className="mx-auto h-10 w-10 text-primary mb-4" />,
                value: "10,000+",
                label: "Students",
              },
              {
                icon: (
                  <BookOpen className="mx-auto h-10 w-10 text-primary mb-4" />
                ),
                value: "200+",
                label: "Courses",
              },
              {
                icon: <Star className="mx-auto h-10 w-10 text-primary mb-4" />,
                value: "4.8",
                label: "Average Rating",
              },
              {
                icon: (
                  <CheckCircle className="mx-auto h-10 w-10 text-primary mb-4" />
                ),
                value: "95%",
                label: "Completion Rate",
              },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                {stat.icon}
                <h3 className="text-3xl font-bold">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-blue-600 text-white">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
            Ready to Start Learning?
          </h2>
          <p className="max-w-[700px] mx-auto text-white/80 md:text-xl/relaxed mb-8">
            Join thousands of students who are already advancing their careers
            with our courses.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-blue-600 hover:bg-white/90"
          >
            <Link href="/register" className="flex items-center">
              Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

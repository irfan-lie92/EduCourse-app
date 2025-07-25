"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Star, Clock, Users } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  rating: number;
  price: number;
  image: string;
  category: string;
  duration: string;
  students: number;
}

interface CourseListProps {
  courses?: Course[];
}

const CourseList = ({ courses = [] }: CourseListProps) => {
  // Default courses if none are provided
  const defaultCourses: Course[] = [
    {
      id: "1",
      title: "Introduction to Web Development",
      description:
        "Learn the fundamentals of web development including HTML, CSS, and JavaScript.",
      instructor: "Jane Smith",
      rating: 4.8,
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
      category: "Web Development",
      duration: "8 weeks",
      students: 1245,
    },
    {
      id: "2",
      title: "Advanced React Patterns",
      description:
        "Master advanced React concepts and patterns for building scalable applications.",
      instructor: "John Doe",
      rating: 4.9,
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
      category: "React",
      duration: "6 weeks",
      students: 892,
    },
    {
      id: "3",
      title: "Data Science Fundamentals",
      description:
        "Introduction to data analysis, visualization, and machine learning concepts.",
      instructor: "Alex Johnson",
      rating: 4.7,
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      category: "Data Science",
      duration: "10 weeks",
      students: 1578,
    },
    {
      id: "4",
      title: "UI/UX Design Principles",
      description:
        "Learn the core principles of user interface and user experience design.",
      instructor: "Sarah Williams",
      rating: 4.6,
      price: 69.99,
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
      category: "Design",
      duration: "5 weeks",
      students: 723,
    },
    {
      id: "5",
      title: "Mobile App Development with Flutter",
      description:
        "Build cross-platform mobile applications using Flutter and Dart.",
      instructor: "Michael Chen",
      rating: 4.5,
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&q=80",
      category: "Mobile Development",
      duration: "9 weeks",
      students: 1032,
    },
    {
      id: "6",
      title: "Backend Development with Node.js",
      description:
        "Learn server-side programming with Node.js, Express, and MongoDB.",
      instructor: "David Wilson",
      rating: 4.7,
      price: 69.99,
      image:
        "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80",
      category: "Backend Development",
      duration: "7 weeks",
      students: 876,
    },
  ];

  const displayCourses = courses.length > 0 ? courses : defaultCourses;
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [sortBy, setSortBy] = React.useState("popular");

  // Filter courses based on search term and category
  const filteredCourses = displayCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "" ||
      selectedCategory === "all" ||
      course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort courses based on selected sort option
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    // Default: sort by popularity (student count)
    return b.students - a.students;
  });

  // Get unique categories for filter dropdown
  const categories = Array.from(
    new Set(displayCourses.map((course) => course.category)),
  );

  return (
    <div className="bg-background w-full p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Available Courses</h2>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCourses.map((course) => (
            <Card
              key={course.id}
              className="overflow-hidden flex flex-col h-full"
            >
              <div className="relative h-48 w-full">
                <img
                  src={course.image}
                  alt={course.title}
                  className="object-cover w-full h-full"
                />
                <Badge className="absolute top-2 right-2">
                  {course.category}
                </Badge>
              </div>

              <CardHeader>
                <h3 className="text-xl font-bold">{course.title}</h3>
                <p className="text-sm text-muted-foreground">
                  by {course.instructor}
                </p>
              </CardHeader>

              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground mb-4">
                  {course.description}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {course.students.toLocaleString("en-US")}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                    {course.rating}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between items-center">
                <span className="text-lg font-bold">
                  ${course.price.toFixed(2)}
                </span>
                <Button>Enroll Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Empty state */}
        {sortedCourses.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium">No courses found</h3>
            <p className="text-muted-foreground mt-2">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;

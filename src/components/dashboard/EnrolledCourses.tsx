import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, BookOpen } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  progress: number;
  nextLesson: string;
  estimatedTimeToComplete: string;
}

interface EnrolledCoursesProps {
  courses?: Course[];
}

const EnrolledCourses = ({ courses = [] }: EnrolledCoursesProps) => {
  // Default courses if none are provided
  const defaultCourses: Course[] = [
    {
      id: "1",
      title: "Introduction to Web Development",
      description:
        "Learn the fundamentals of HTML, CSS, and JavaScript to build modern websites.",
      image:
        "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&q=80",
      progress: 45,
      nextLesson: "CSS Flexbox Layout",
      estimatedTimeToComplete: "3 hours",
    },
    {
      id: "2",
      title: "React for Beginners",
      description:
        "Master React.js fundamentals and build interactive user interfaces.",
      image:
        "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&q=80",
      progress: 72,
      nextLesson: "State Management with Context API",
      estimatedTimeToComplete: "2 hours",
    },
    {
      id: "3",
      title: "Advanced JavaScript Concepts",
      description:
        "Deep dive into closures, prototypes, async programming and more.",
      image:
        "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80",
      progress: 18,
      nextLesson: "Promises and Async/Await",
      estimatedTimeToComplete: "4 hours",
    },
  ];

  const displayCourses = courses.length > 0 ? courses : defaultCourses;

  return (
    <div className="bg-background w-full p-6 rounded-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">My Enrolled Courses</h2>
        <p className="text-muted-foreground">
          Continue learning where you left off
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <div className="relative h-48 w-full">
              <img
                src={course.image}
                alt={course.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium">
                {course.progress}% Complete
              </div>
            </div>

            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Next: {course.nextLesson}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Est. time: {course.estimatedTimeToComplete}</span>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button className="w-full">Continue Learning</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EnrolledCourses;

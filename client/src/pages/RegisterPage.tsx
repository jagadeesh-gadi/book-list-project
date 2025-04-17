
import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, BookOpen } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string(),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  // async function onSubmit(values: z.infer<typeof formSchema>) {
  //   setIsSubmitting(true);
    
  //   // This would be replaced with actual API call in a real implementation
  //   console.log(values);
    
  //   // Simulate API call delay
  //   await new Promise(resolve => setTimeout(resolve, 1500));
    
  //   setIsSubmitting(false);
    
  //   // This would navigate to login page after successful registration
  //   // navigate("/login");
  //   alert("Registration successful! You can now log in.");
  // }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
  
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
  
    // Now log the values to the console
    console.log("Submitted values:", values);
  
    setIsSubmitting(false);
  
    alert("Registration successful! You can now log in.");
  }
  

  return (
    <div className="container mx-auto flex flex-col md:flex-row min-h-[calc(100vh-4rem)] mb-8">
      {/* Left Column - Registration Form */}
      <div className="flex-1 p-4 md:p-8 flex items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-serif text-book-primary">Join Read & Rate Realm</h1>
            <p className="text-muted-foreground mt-2">
              Create your account to start reviewing and discovering books
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                          <span className="sr-only">
                            {showPassword ? "Hide password" : "Show password"}
                          </span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Must be at least 8 characters long
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                          <span className="sr-only">
                            {showConfirmPassword ? "Hide password" : "Show password"}
                          </span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to the{" "}
                        <Link
                          to="/terms"
                          className="text-book-primary hover:underline"
                        >
                          terms of service
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/privacy"
                          className="text-book-primary hover:underline"
                        >
                          privacy policy
                        </Link>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-book-primary hover:bg-book-secondary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </Button>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-book-primary hover:underline font-medium">
                  Log in
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* Right Column - Image and Caption */}
      <div className="hidden md:flex flex-1 bg-book-neutral">
        <div className="flex flex-col h-full justify-center p-8 items-center">
          <div className="max-w-md text-center">
            <BookOpen size={48} className="mx-auto mb-6 text-book-primary" />
            <h2 className="text-2xl font-bold mb-4 font-serif text-book-primary">
              Your Literary Journey Begins Here
            </h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of readers who share their thoughts, discover new favorites,
              and connect with a community of book lovers.
            </p>
            <img
              src="https://images.unsplash.com/photo-1474932430478-367dbb6832c1?q=80&w=1740&auto=format&fit=crop"
              alt="Stack of books with reading glasses"
              className="rounded-lg shadow-lg max-h-96 mx-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}


import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, BookOpen } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
  rememberMe: z.boolean().optional(),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // This would be replaced with actual API call in a real implementation
    console.log(values);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    
    // This would navigate to homepage after successful login
    // navigate("/");
    alert("Login successful!");
  }

  return (
    <div className="container mx-auto flex flex-col md:flex-row min-h-[calc(100vh-4rem)] mb-8">
      {/* Left Column - Login Form */}
      <div className="flex-1 p-4 md:p-8 flex items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-serif text-book-primary">Welcome Back</h1>
            <p className="text-muted-foreground mt-2">
              Sign in to continue your reading journey
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-book-primary hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="h-4 w-4 rounded border-gray-300 text-book-primary focus:ring-book-primary"
                  {...form.register("rememberMe")}
                />
                <label
                  htmlFor="remember-me"
                  className="text-sm text-muted-foreground"
                >
                  Remember me for 30 days
                </label>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-book-primary hover:bg-book-secondary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </Button>

              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="text-book-primary hover:underline font-medium">
                  Sign up
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
              Continue Your Reading Journey
            </h2>
            <p className="text-muted-foreground mb-6">
              Your next great book adventure awaits. Log in to see your reviews, reading lists, and personalized recommendations.
            </p>
            <img
              src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1740&auto=format&fit=crop"
              alt="Person reading a book in a cozy chair"
              className="rounded-lg shadow-lg max-h-96 mx-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

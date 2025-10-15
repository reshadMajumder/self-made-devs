import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4">
      <Card className="max-w-2xl w-full border-2">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-3xl">Application Submitted Successfully!</CardTitle>
          <CardDescription className="text-lg">
            Welcome to the Self Made Devs community. We're excited to have you on this journey!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 text-center">
            <p className="text-muted-foreground">
              Your application has been received and our team will review it shortly. Here's what happens next:
            </p>

            <div className="space-y-3 text-left max-w-md mx-auto">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">1</span>
                </div>
                <div>
                  <p className="font-medium">Application Review</p>
                  <p className="text-sm text-muted-foreground">
                    We'll review your application within 3-5 business days
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">2</span>
                </div>
                <div>
                  <p className="font-medium">Email Confirmation</p>
                  <p className="text-sm text-muted-foreground">
                    You'll receive an email with next steps and program details
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-pink-600 dark:text-pink-400">3</span>
                </div>
                <div>
                  <p className="font-medium">Start Your Journey</p>
                  <p className="text-sm text-muted-foreground">
                    Join our community and begin building your first production-ready project
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="outline" size="lg">
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

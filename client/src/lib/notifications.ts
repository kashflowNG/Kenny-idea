
import { toast } from "@/hooks/use-toast";

export function showError(message: string, description?: string) {
  toast({
    title: message,
    description: description,
    variant: "destructive",
  });
}

export function showSuccess(message: string, description?: string) {
  toast({
    title: message,
    description: description,
  });
}

export function showInfo(message: string, description?: string) {
  toast({
    title: message,
    description: description,
  });
}

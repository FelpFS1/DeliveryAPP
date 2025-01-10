import { Label } from "./ui/label";
import { RadioGroupItem } from "./ui/radio-group";

interface FlavorProps {
  value: string;
}

export default function FlavorProductItem({ value }: FlavorProps) {
  return (
    <div className="flex items-center justify-between border-b-2 bg-transparent p-4">
      <Label htmlFor={value} className="w-full text-base">
        {value}
      </Label>
      <RadioGroupItem value={value} id={value} className="h-5 w-5" />
    </div>
  );
}

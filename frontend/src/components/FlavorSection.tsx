import { Check } from "lucide-react";
import { RadioGroup } from "./ui/radio-group";
import FlavorProductItem from "./FlavorProductItem";
import { dbTypes } from "@/db/fakedb";
import { useEffect, useState } from "react";
import { ProductToCartType } from "./CardProduct";

interface FlavorSectionProps {
  db: dbTypes;
  handleCreateProductToCart: (data: ProductToCartType) => void;
}

export default function FlavorSection({
  db,
  handleCreateProductToCart,
}: FlavorSectionProps) {
  const [flavorValue, setFlavorValue] = useState<string>();
  useEffect(() => {
    if (flavorValue) {
      handleCreateProductToCart({ flavor: flavorValue });
    }
  }, [flavorValue, handleCreateProductToCart]);
  return (
    <section>
      <header className="mt-4 grid w-full grid-cols-2 rounded-md bg-gray-200 p-3">
        <div>
          <h4 className="text-lg">Sabores</h4>
          <p>Escolha até 1 sabor</p>
        </div>
        <div className="flex items-center justify-end gap-4">
          <span
          // className={`${quantityComplements > 0 ? "text-green-400 opacity-100" : "opacity-0"}`}
          >
            <Check />
          </span>
        </div>
      </header>
      <RadioGroup
        value={flavorValue}
        onValueChange={(value) => setFlavorValue(value)}
      >
        {db.additional.flavor.map((flavor) => (
          <FlavorProductItem key={flavor.name} value={flavor.name} />
        ))}
      </RadioGroup>
    </section>
  );
}

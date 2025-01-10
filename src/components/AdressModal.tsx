import AddAdressForm from "./AdressForm";
import { DialogContent, DialogTitle } from "./ui/dialog";

export default function AdressModal() {
  return (
    <DialogContent
      className="flex h-[98dvh] max-h-[95vh] w-[95vw] flex-col rounded-sm p-0 xl:w-[70vw] xl:p-4"
      aria-describedby={undefined}
    >
      <header className="w-full">
        <DialogTitle className="text-center text-xl">
          Adicione seu endereço
        </DialogTitle>
      </header>
      <main className="flex justify-center">
        <AddAdressForm />
      </main>
    </DialogContent>
  );
}

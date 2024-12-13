import AddAdressForm from "./AdressForm";
import { DialogContent, DialogTitle } from "./ui/dialog";

export default function AdressModal() {
  return (
    <DialogContent
      className="flex w-[60vw] flex-col p-4"
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

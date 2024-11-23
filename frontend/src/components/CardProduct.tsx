import { User } from "lucide-react";

export default function CardProduct() {
  return (
    <div className="grid h-48 w-full cursor-pointer grid-cols-2 items-center rounded-2xl border-2 bg-white p-2 text-left shadow-md hover:bg-zinc-50">
      <div className="flex flex-col gap-2">
        <h4 className="text-black">Açai 300ml</h4>
        <p className="text-gray-500">
          Obs: Os complementos não são separados. Todos virão dentro do açai.
        </p>
        <span className="flex gap-1 font-bold text-black">
          <User />
          Serve 1 pessoa
        </span>
        <span className="font-bold text-black">R$16,00</span>
      </div>
      <div className="mr-4 flex justify-end">
        <img
          className="h-44"
          src="https://jusacai.com.br/assets/uploads/produtos/2/648765695540fic1iud.png"
          alt=""
        />
      </div>
    </div>
  );
}

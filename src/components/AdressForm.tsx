import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Mapbox from "./Mapbox";
import { useCallback, useState } from "react";
import { LoaderCircle } from "lucide-react";

const adressForm = z.object({
  adress: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  complement: z.string().min(8, "Coloque sua rua, número, casa"),
  neighborhood: z.string().optional(),
  zipcode: z.coerce.string().min(8, "Digite um CEP válido"),
});

type AdressForm = z.infer<typeof adressForm>;

export interface CoordinatesType {
  latitude: number;
  longitude: number;
}

export default function AdressForm() {
  const [coordinates, setCoordinates] = useState<CoordinatesType>();
  const [markedcoordinates, setMarkedcoordinates] = useState<CoordinatesType>();
  const [isLoadingAdress, setLoadingAdress] = useState<boolean>();
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AdressForm>({
    mode: "all",
    criteriaMode: "all",
    defaultValues: { zipcode: "", complement: "" },

    resolver: zodResolver(adressForm),
  });

  const zipCodeValue = watch("zipcode");
  const complementAdressValue = watch("complement");

  const handleFindAdress = async () => {
    resetState();

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${zipCodeValue}/json/`,
      );
      const data = await response.json();

      if (data.erro) {
        setShowErrorMessage(true);
        return;
      }

      setValue("adress", data.logradouro);
      setValue("city", data.localidade);
      setValue("state", data.estado);
      setValue("neighborhood", data.bairro);
      setValue("zipcode", data.cep);

      const adress = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}, ${data.cep}`;
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: adress }, (results, status) => {
        if (status === "OK" && results) {
          const location = results[0].geometry.location;
          const latitude = location.lat();
          const longitude = location.lng();

          setCoordinates({
            latitude,
            longitude,
          });
          setLoadingAdress(false);
        }
      });
    } catch (err) {
      console.error(err);

      setShowErrorMessage(true);
    }
  };

  const handleSubmitData = (updateData: AdressForm) => {
    const adressData = { ...updateData, ...markedcoordinates };
    console.log(adressData);
  };

  const handlesetCoordinates = useCallback(
    ({ latitude, longitude }: CoordinatesType) => {
      setMarkedcoordinates({
        latitude,
        longitude,
      });
    },
    [],
  );
  const resetState = () => {
    setCoordinates(undefined);
    setLoadingAdress(true);
    setShowErrorMessage(false);
  };
  return (
    <form
      action=""
      className="w-10/12"
      onSubmit={handleSubmit(handleSubmitData)}
    >
      <div>
        <label htmlFor="adress">Endereço</label>
        <Input id="adress" readOnly {...register("adress")} disabled />
      </div>
      <div className="flex justify-between gap-2">
        <div className="w-1/2">
          <label htmlFor="complement">Complemento</label>
          <Input
            id="complement"
            {...register("complement")}
            placeholder="Rua,Casa e número"
            type="text"
            required
          />
          {errors.complement && (
            <p className="mt-1 text-sm text-primary">
              {errors.complement.message}
            </p>
          )}
        </div>
        <div className="w-1/2">
          <label htmlFor="neighborhood">Bairro</label>
          <Input id="neighborhood" {...register("neighborhood")} disabled />
        </div>
      </div>
      <div className="flex justify-between gap-2">
        <div className="w-1/2">
          <label htmlFor="city">Cidade</label>
          <Input id="city" {...register("city")} disabled />
        </div>
        <div className="w-1/2">
          <label htmlFor="state">Estado</label>
          <Input {...register("state")} disabled />
        </div>
      </div>
      <div>
        <label htmlFor="zipcode">CEP</label>
        <Input
          id="zipcode"
          type="text"
          {...register("zipcode")}
          placeholder="Digite seu CEP..."
          required
        />
        {errors.zipcode && (
          <p className="mt-1 text-sm text-primary">{errors.zipcode.message}</p>
        )}
      </div>
      <Button
        className={`${zipCodeValue.length < 8 ? "disabled:pointer-events-auto disabled:cursor-not-allowed" : "cursor-pointer"} mt-2`}
        onClick={() => handleFindAdress()}
        type="button"
        disabled={zipCodeValue.length < 8}
      >
        Buscar
      </Button>

      {isLoadingAdress && !coordinates ? (
        <div className="flex h-96 items-center justify-center">
          {showErrorMessage ? (
            <p>CEP INVÁLIDO</p>
          ) : (
            <LoaderCircle className="animate-spin text-center font-bold text-primary" />
          )}
        </div>
      ) : (
        <div>
          {coordinates && (
            <div className="my-2 flex flex-col">
              <Mapbox
                coordinates={coordinates}
                handlesetCoordinates={handlesetCoordinates}
              />
              <Button
                className={`${complementAdressValue.length < 8 ? "disabled:pointer-events-auto disabled:cursor-not-allowed" : "cursor-pointer"} mt-5`}
                disabled={
                  complementAdressValue.length < 8 || zipCodeValue.length <= 8
                }
              >
                Salvar
              </Button>
            </div>
          )}
        </div>
      )}
    </form>
  );
}

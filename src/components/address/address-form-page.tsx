import { AddressForm } from "./address-form";

type AddressFormPageProps = {
  title: string;
  mode: "create" | "edit";
  addressId?: string;
};

export function AddressFormPage({
  title,
  mode,
  addressId,
}: AddressFormPageProps) {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <div className="mx-auto flex w-full max-w-[850px] flex-col px-[50px] pb-[50px] pt-[50px] lg:px-0">
        <h1 className="pb-[50px] text-[36px] font-medium text-foreground">
          {title}
        </h1>
        <AddressForm mode={mode} addressId={addressId} />
      </div>
    </div>
  );
}

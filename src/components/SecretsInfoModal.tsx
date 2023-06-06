import Button from "@/components/Button";
import CopyToClick from "@/components/CopyToClickText";
import clsx from "clsx";
type props = {
  secret: string;
  closeModal: () => void;
};

export default function SecretsModal({ secret, closeModal }: props) {
  // implementation
  // const [showSecretsModal, setShowSecretsModal] = useState(false);
  // {showSecretsModal && <SecretsModal secret={secret} closeModal={() => {setShowSecretsModal(false)}} />}
  return (
    <div
      className={clsx(
        "bg-black",
        "bg-opacity-70",
        "absolute w-screen h-screen top-0 left-0 min-w-min",
        "flex flex-col justify-center items-center"
      )}
    >
      <div
        className={clsx(
          "p-4 bg-white rounded",
          "mx-4",
          "md:w-1/3",
          "flex flex-col justify-center gap-4"
        )}
      >
        <h1 className="text-2xl text-center font-semibold">Secret</h1>
        <p className="">
          To later change your bid, you will need this secret. In case your
          browser deletes it, please keep this secret somewhere. You will not be
          able to change your bid later on without it.
        </p>
        <CopyToClick text={secret} />

        <Button label="Ok, done!" onClick={closeModal} className="self-end" />
      </div>
    </div>
  );
}

import { randomUrl } from "@/utils";
import appConfig from "../../beetl.config.js";

type Props = {
  beetlUrl: string;
  setBeetlUrl: Function;
  urlRandomizer: string;
  setUrlRandomizer: Function;
};

export default function BeetlInput({
  beetlUrl,
  setBeetlUrl,
  urlRandomizer,
  setUrlRandomizer,
}: Props) {
  return (
    <div className="flex focus-within:border-primary-dark text-secondary-dark border border-secondary rounded-md py-2 px-2 w-full justify-center">
      <span className="text-secondary">
        {appConfig.domainName}/b/{urlRandomizer}/
      </span>
      <input
        className="flex-shrink-0 w-1/2 min-w-0 focus:outline-none"
        onChange={(event) => {
          const value = (event.target as HTMLInputElement).value.replaceAll(
            " ",
            "-"
          );
          setBeetlUrl(value);
          setUrlRandomizer(randomUrl(5));
        }}
        maxLength={40}
        type="text"
        value={beetlUrl}
      />
    </div>
  );
}

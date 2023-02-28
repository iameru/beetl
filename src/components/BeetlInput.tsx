import { PostBeetl } from "@/types.js";
import { randomUrl } from "@/utils";
import appConfig from "../../beetl.config.js";

type Props = {
  state: PostBeetl;
  setState: Function;
};

export default function BeetlInput({ state, setState }: Props) {
  return (
    <div className="flex focus-within:border-primary-dark text-secondary-dark border border-secondary rounded-md py-2 px-2 w-full justify-center">
      <span className="text-secondary">
        {appConfig.domainName}/b/{state.obfuscation}/
      </span>
      <input
        className="flex-shrink-0 w-1/2 min-w-0 focus:outline-none"
        onChange={(event) => {
          const value = (event.target as HTMLInputElement).value.replaceAll(
            " ",
            "-"
          );
          setState((prev: PostBeetl) => ({
            ...prev,
            slug: value,
            obfuscation: randomUrl(5),
          }));
        }}
        maxLength={40}
        type="text"
        value={state.slug}
      />
    </div>
  );
}

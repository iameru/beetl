import {useState} from "react";
import appConfig from "../../beetl.config.js"

type Props = {
  onChange?: () => void;
};

export default function BeetlInput({ onChange }: Props) {

  const [url, setUrl] = useState(randomUrl())

  return (
    <div className="flex focus-within:border-primary-dark text-secondary-dark border border-secondary rounded-md py-2 px-2 w-full justify-center">
      <span
        className="text-secondary"
        >{appConfig.domainName}/b/</span>
      <input 
        className="flex-shrink-0 w-1/2 min-w-0 focus:outline-none"
        onChange={(e) => {
         setUrl(e.target.value)
         }}
        maxLength={18}
        type='text' value={url} />

    </div>


  );
}

function randomUrl() {
  const length = 14
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let url = "";
  for (let i = 0; i < length; i++) {
    url += chars[Math.floor(Math.random() * chars.length)];
  }
  return url;
}

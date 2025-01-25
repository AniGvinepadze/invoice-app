import Image from "next/image";
import {loginImg} from "../../../index"

export default function LogingIcon() {
  return (
    <div className="max-w-[800px] w-full max-900:hidden">
      <Image src={loginImg} alt="LogingImg" width={800} height={960} />
    </div>
  );
}

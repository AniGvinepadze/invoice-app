import Image from "next/image";
import {loginImg} from "../../../index"

export default function LogingIcon() {
  return (
    <div className="max-w-[560px] w-full max-900:hidden">
      <Image src={loginImg} alt="LogingImg" width={560} height={920} />
    </div>
  );
}

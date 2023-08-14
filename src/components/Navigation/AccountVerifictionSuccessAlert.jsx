/* This example requires Tailwind CSS v2.0+ */
import { BsFillCircleFill } from "react-icons/bs";

export default function AccountVerificationSuccessAlert() {
  return (
    <div className="rounded-md bg-green-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <BsFillCircleFill
            className="h-5 w-5 text-green-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-green-800">
            Email is successfully sent to your Email
          </p>
        </div>
      </div>
    </div>
  );
}

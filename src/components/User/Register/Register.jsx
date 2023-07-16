import FormSection from "./FormSection";
import HeadingSection from "./HeadingSection";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterSchema = z.object({
  firstName: z.string().min(3, "First Name is required").max(50),
  lastName: z.string().min(3, "Last Name is Required").max(50),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password is Required").max(50),
});

const Register = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });

  // submit the form
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <section className="relative py-20 2xl:py-40 bg-gradient-to-r from-blue-900 to-blue-600 overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center -mx-4">
            <HeadingSection />
            <FormSection
              handleSubmit={handleSubmit}
              register={register}
              reset={reset}
              errors={errors}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;

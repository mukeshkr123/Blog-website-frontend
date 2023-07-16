import FormSection from "./FormSection";
import HeadingSection from "./HeadingSection";

const Register = () => {
  return (
    <section className="relative py-20 2xl:py-40 bg-gradient-to-r from-blue-900 to-blue-600 overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center -mx-4">
            <HeadingSection />
            <FormSection />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;

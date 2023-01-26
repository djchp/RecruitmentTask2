import BasicContainer from "../components/BasicContainer";
import { useForm } from "react-hook-form";
import { Inputs } from "./EditIntern";
import { ErrorMessage } from "@hookform/error-message";
import { addIntern } from "../utils/FetchFuntcions";
import LogoArrowComp from "../components/LogoArrowComp";

const AddIntern = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    getValues,
    trigger,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      internshipStart: "",
      internshipEnd: "",
    },
  });
  const onSubmit = async (data: Inputs) => {
    const dateStart = new Date(data.internshipStart)
      .toJSON()
      .slice(0, 10)
      .split("-")
      .join("-");
    const dateEnd = new Date(data.internshipEnd)
      .toJSON()
      .slice(0, 10)
      .split("-")
      .join("-");
    const isDone = await addIntern(data.name!, data.email!, dateStart, dateEnd);
    if (isDone) {
      alert("Intern successfully added");
    }
  };

  const isDateCorrect = (startDate: any, endDate: any) => {
    if (
      startDate !== "Invalid Date" &&
      endDate !== "Invalid Date" &&
      startDate < endDate
    ) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <>
      <LogoArrowComp />
      <BasicContainer mainPage={false}>
        <div className="flex justify-between">
          <h2 className="text-3xl font-semibold">Add Intern</h2>
        </div>
        <div className="pt-8">
          <form
            className="flex flex-col gap-12"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col">
              <label className="font-medium">Full Name *</label>
              <input
                placeholder="Full Name"
                className={`border-2 ${
                  errors.name ? "border-red-600" : "border-black"
                }  bg-[#F7F7F7] p-2`}
                {...register("name", { required: "This field is required" })}
                aria-invalid={errors.name ? "true" : "false"}
              />
              <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => (
                  <p className="text-red-700">{message}</p>
                )}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Email Address *</label>
              <input
                className={`border-2 ${
                  errors.email ? "border-red-600" : "border-black"
                }  bg-[#F7F7F7] p-2`}
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Please enter a valid email",
                  },
                })}
                aria-invalid={errors.email ? "true" : "false"}
              />
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => (
                  <p className="text-red-700">{message}</p>
                )}
              />
            </div>
            <div className="flex w-full gap-2">
              <div className="w-1/2 flex flex-col">
                <label className="font-medium">Work Start *</label>
                <input
                  type="date"
                  placeholder=""
                  className={`border-2 ${
                    errors.internshipStart ? "border-red-600" : "border-black"
                  }  bg-[#F7F7F7] p-2`}
                  {...register("internshipStart", {
                    required: "Date is required",
                    valueAsDate: true,
                    validate: (data) =>
                      isDateCorrect(
                        getValues("internshipStart"),
                        getValues("internshipEnd")
                      ) || "Start date should be before End Date",
                    onChange: () => {
                      trigger(["internshipEnd", "internshipStart"]);
                    },
                  })}
                  aria-invalid={errors.internshipStart ? "true" : "false"}
                />
                <ErrorMessage
                  errors={errors}
                  name="internshipStart"
                  render={({ message }) => (
                    <p className="text-red-700">{message}</p>
                  )}
                />
              </div>
              <div className="w-1/2 flex flex-col">
                <label className="font-medium">Work End *</label>
                <input
                  type="date"
                  className={`border-2 ${
                    errors.internshipEnd ? "border-red-600" : "border-black"
                  }  bg-[#F7F7F7] p-2`}
                  {...register("internshipEnd", {
                    required: "Date is required",
                    valueAsDate: true,
                    validate: (data) =>
                      isDateCorrect(
                        getValues("internshipStart"),
                        getValues("internshipEnd")
                      ) || "End date should be after Start Date",
                    onChange: () => {
                      trigger(["internshipEnd", "internshipStart"]);
                    },
                  })}
                  aria-invalid={errors.internshipEnd ? "true" : "false"}
                />
                <ErrorMessage
                  errors={errors}
                  name="internshipEnd"
                  render={({ message }) => (
                    <p className="text-red-700">{message}</p>
                  )}
                />
              </div>
            </div>
            <button
              type="submit"
              className={`${
                isDirty ? "bg-black" : "bg-slate-700"
              } text-white  py-2 px-16 w-fit`}
              disabled={isDirty ? false : true}
            >
              Submit
            </button>
          </form>
        </div>
      </BasicContainer>
    </>
  );
};

export default AddIntern;

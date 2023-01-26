import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import BasicContainer from "../components/BasicContainer";
import { editIntern, fetchSignleIntern } from "../utils/FetchFuntcions";
import { ErrorMessage } from "@hookform/error-message";
import LogoArrowComp from "../components/LogoArrowComp";

export interface Inputs {
  name: string | undefined;
  email: string | undefined;
  internshipStart: string | number | Date;
  internshipEnd: string | number | Date;
}

export const EditIntern: React.FC = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
    trigger
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      internshipStart: "",
      internshipEnd: "",
    },
  });
  useEffect(() => {
    const fetch = async () => {
      const fetchedIntern = await fetchSignleIntern(parseInt(id!));
      setValue("name", fetchedIntern[0].name);
      setValue("email", fetchedIntern[0].email);
      setValue("internshipStart", fetchedIntern[0].internshipStart);
      setValue("internshipEnd", fetchedIntern[0].internshipEnd);
    };
    fetch();
    console.log(`I want to get intern with id: ${id}!`);
  }, [id, setValue]);

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

    const isDone = await editIntern(id!, data.name!, data.email!, dateStart, dateEnd);
    if (isDone) {
      alert("Intern data successfully edited")
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
      <BasicContainer>
        <div className="flex justify-between">
          <h2 className="text-3xl font-semibold">Edit Intern</h2>
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
                      onChange: () => {trigger(["internshipEnd", "internshipStart"])}
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
                      onChange: () => {trigger(["internshipEnd", "internshipStart"])}
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
              className="text-white bg-black py-2 px-16 w-fit"
            >
              Submit
            </button>
          </form>
        </div>
      </BasicContainer>
    </>
  );
};

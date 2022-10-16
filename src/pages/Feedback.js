import React, { useState } from "react";
import Button from "../components/Common/Button";
import FeedbackSuccessModal from "../components/Common/Modals/FeedbackSuccessModal";
import FeedbackAddForm from "../components/Form/FeedbackAddForm";

const Feedback = () => {
  const [opened, setOpened] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormDate] = useState({
    name: "",
    email: "",
    phone: "",
    serviceQuality: "",
    beverageQuality: "",
    restaurantClean: "",
    diningExperience: "",
  });

  const resetForm = () => {
    setFormDate({
      name: "",
      email: "",
      phone: "",
      serviceQuality: "",
      beverageQuality: "",
      restaurantClean: "",
      diningExperience: "",
    });
  };

  const handleOnChange = (e, name) => {
    console.log(typeof e);
    if (typeof e === "object") {
      const newData = { ...formData };
      newData[e.target.name] = e.target.value;
      setFormDate(newData);
    }
    if (typeof e === "string") {
      console.log(e.toString());
      const newData = { ...formData };
      newData[name] = e;
      setFormDate(newData);
    }
  };

  console.log(formData);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.phone === "") {
      setError(true);
      return;
    }
    const getData = localStorage.getItem("allFeedback");
    const allFeedback = JSON.parse(getData);
    if (allFeedback) {
      localStorage.setItem(
        "allFeedback",
        JSON.stringify([...allFeedback, formData])
      );
      resetForm();
      setOpened(true);
    } else {
      localStorage.setItem("allFeedback", JSON.stringify([formData]));
      resetForm();
      setOpened(true);
    }
  };

  const controlModal = () => {
    setOpened((prevState) => !prevState);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <form onSubmit={handleFormSubmit}>
          <div className="bg-slate-100 mx-8 mt-8 mb-4 p-5">
            {/* Header section */}
            <header className="px-8 py-7 bg-white rounded-md">
              <h1 className="text-2xl font-bold mb-2 leading-none">
                Aromatic Bar
              </h1>
              <p>
                We are committed to providing you with the best dining
                experience possible, so we welcome your comments. <br /> Please
                fill out this questionnaire. Thank you.
              </p>
            </header>
            {/* Feedback add form section */}
            <div className="px-8 pt-7 pb-20 mt-5 bg-white rounded-md">
              <FeedbackAddForm
                handleOnChange={handleOnChange}
                formData={formData}
                setFormDate={setFormDate}
                error={error}
                setError={setError}
              />
            </div>
          </div>
          <div className="mx-8 mb-8 flex justify-end">
            <Button type="submit" name="Submit Review" color="green" />
          </div>
        </form>
      </div>
      {/* Modal */}
      <FeedbackSuccessModal opened={opened} controlModal={controlModal} />
    </>
  );
};

export default Feedback;

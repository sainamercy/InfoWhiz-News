export function feedback() {
  // getting elements from the DOM
  const feedbackForm = document.querySelector("#feedback");
  const feedbackEmail = document.querySelector("#fbEmail");
  const feedbackNames = document.querySelector("#name");
  const feedbackMessage = document.querySelector("#fbMessage");

  // getting feedback from user input
  function getFeedback() {
    const email = feedbackEmail.value;
    const name = feedbackNames.value;
    const message = feedbackMessage.value;

    if (
      feedbackEmail.value === "" ||
      feedbackNames.value === "" ||
      feedbackMessage.value === ""
    ) {
      alert("please fill all fields!");
    } else {
      alert("Thank you for your feedback 🤗");
    }
  }

  // executing feedback on submit of the form
  feedbackForm.addEventListener("submit", (e) => {
    e.preventDefault();
    getFeedback();
    feedbackForm.reset()
  });
}

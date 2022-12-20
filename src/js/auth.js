export function authentication() {
  // getting elements from the DOM
  const authSection = document.querySelector("#authentication");
  const signUpForm = document.querySelector("#signUp");
  const loginForm = document.querySelector("#login");
  const signUpEmail = document.querySelector("#signupEmail");
  const signUpUserName = document.querySelector("#signupUserName");
  const signUpPassword = document.querySelector("#signUpPass");
  const loginEmail = document.querySelector("#loginEmail");
  const loginPassword = document.querySelector("#loginPass");
  const mainPage = document.querySelector("#main");
  const navList = document.querySelector("#navList")
  const contactSection = document.querySelector("#contact")
  // hide login form and main section
  loginForm.style.display = mainPage.style.display = contactSection.style.display = "none"

  // initializing signup details to be derived from user input
  let signDetails;

  // signup function
  function signup() {
    signDetails = {
      email: signUpEmail.value,
      userName: signUpUserName.value,
      password: signUpPassword.value,
    };
    if(signUpEmail.value==="" || signUpUserName.value==="" || signUpPassword.value===""){
      alert("please fill in all fields!")
    }else{
    signUpForm.style.display = "none";
    loginForm.style.display = "flex";
    }
    return signDetails;
  }
  // executing signup on submit of the form
  signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    signup();
  });

  // login function
  function login(e) {
    e.preventDefault();

    console.log(signDetails);
    const email = loginEmail.value;
    const password = loginPassword.value;

    //   using information from signup to login user
    if (email === signDetails.email && password === signDetails.password) {
      authSection.style.display = "none";
      mainPage.style.display = contactSection.style.display = "flex";
      navList.insertAdjacentHTML("beforeend", `<li class="user"><i class="fa-solid fa-user"></i> ${signDetails.userName}</li>`)
    } else {
      alert("please enter correct credentials");
      loginForm.reset();
    }
  }

  // executing login function on submit of the form
  loginForm.addEventListener("submit", login);
}


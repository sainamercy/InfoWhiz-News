# InfoWhiz News

## Description

InfoWhiz News is a news application that allows users to access diverse categorical news updates. 

# Author

- [Mercy Saina](https://github.com/sainamercy)

# Built with
- HTML_CSS
- JavaScript
- [Inshorts News API](https://github.com/cyberboysumanjay/Inshorts-News-API)
- Parcel

# Live link

- [Click to open application](info-whiz-news.vercel.app)

## Features

### Aunthentication 

#### Sign-up
- On load of the page `sign-up form` will be displayed.
- Fill in the provided fields. `note:` you can input fake data.
- Make sure you memorize the provided data, since you will use it in `log-in` section.
- Click `sign-up button` to complete sign-up`.
- `log-in form` will be displayed.

#### Log-in
- Use data from sign-up to `log-in`.
- Incase of `forgotten` data, reload page and sign up once again.
- Click `log-in button` to complete log-in.
- `Main Section` and `Contact Section` will be displayed.

- `Note:` sign-up and log-in data is not persistent. Hence, on page reload, authentication process is repeated.


### Main Section

#### News list and News Content
- On display of the section, News from `all` category will be displayed.
- To display news from different `categories`, hover over `select-category` option on the navigation bar, then click on category of your choice to display the news.
- On the left side of the page, a list of `news briefs `is displayed in form of cards, click on a card to display `news content` on the right side of the page.
- The `news content` has a `read more` link that will redirect you to the original source page of the news for further details of the news.

#### Search feature
- On `search` option on the navigation bar, enter key word or specific news title in the input field provided.
- Click on `search icon` or `enter key` to display results.
- `Note:` This feature does not give robust results due to limited data and data structure provided by the `API`. The feature also works by category, i.e news search is limited to the selected category. I would recommend using `select-category` option. 

#### Bookmarks feature
- This feature uses `windows local storage` to persist bookmarks data.
- Click on  `+ to bookmark` on the news content section to add news to bookmark section.
- Hover over `bookmarks` option on the navigation bar to display bookmarked news list.
- Then click on desired news to be redirected to the news source page.
- `Note:` on page reload, the bookmarked data persists.

#### Clear windows local storage
- Open `developer console` on your browser by right clicking on the page then navigating to `inspect` option.
- Navigate to `Application` option on developer console, then to `local storage` option. 
- Click on the option that has been saved using this project's site url.
- Click on `X` icon to delete data.

### Contact section
- Click on `contact` option on the navigation bar to navigate to contact section
- The section cotains dummy contact information and a feedback form
- The section also has a return to top button to return to the main section

#### feedback feature
- Enter data in the fields provided.
- On submit of the form, you'll be notified with an alert message.


# Development installation

## Requirements

In order for you to use the content on this repo ensure you have the following:

- A computer that runs on either of the following; (Windows 7+, Linux, Mac OS).
-  nodejs 9.0+
- Visual Studio Code.
- Live server extension.

### Alternative One

- Open a terminal / command line interface on your computer.
- Clone the repo by using the following to create a copy on your local machine:

        git clone https://github.com/sainamercy/InfoWhiz-News
       
- Change directory to the repo folder:

        cd InfoWhiz-News

- Open it in ``Visual Studio Code``

        code .

### Alternative Two

- On the top right corner of this page there is a button labelled ``Fork``.
- Click on that button to fork the repo to your own account.
- Take on the process in ``Alternative One`` above.
- Remember to replace your username when cloning.

        git clone https://github.com/your-username-here/InfoWhiz-News

## Running the application

To run the application, you can use the following steps to run the app.

- Install required dependencies from npm

      npm install

- Run the application

      npm run start
  
- Click on the link provided, to open the application on your browser.
- Repeat the steps on the `Features` section above.

# License

- The project is licensed by `ISC`.



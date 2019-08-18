# A React Native Sample

Here is my first react native app, it is a mini social app based on the [JSON Placeholder](https://jsonplaceholder.typicode.com) API

This project runs on the [Expo CLI](https://docs.expo.io/versions/latest/workflow/expo-cli/)

## Main Components

### Home page: Card Swipe (a la Tinder)

* Swiping **left** discards the profile
* Swiping **right** opens their profile page

<img width="386" alt="Screenshot 2019-08-18 at 5 35 26 PM" src="https://user-images.githubusercontent.com/1822532/63222860-96009880-c1df-11e9-82af-6f38a3312501.png">

### Profile Page

--> This page opens up when you swipe **right** on a card

It contains the following tabs:
- A TODO list
- The user's posts
- The users photos, categorized in albums

<img width="373" alt="Screenshot 2019-08-18 at 5 36 53 PM" src="https://user-images.githubusercontent.com/1822532/63222882-ce07db80-c1df-11e9-969f-1757780282a8.png">

## Requirements

- `YARN`
- `NODE`

## Running the app

Install the dependencies:

`$> yarn install`

Run the app:

`$> yarn start`

This will run an expo live server that can be used to load the app on either a simulator or a phone

## Notes on testing

Given that the Swipe feature is pretty animation-heavy. I'd recommend testing on a phone, as the simulator can possibly get a bit sluggish.

Steps:

- Install the `Expo` app on your phone
- Ensure your phone and computer are on the same network
- Run the server using `yarn start`
- A QR Code will appear on the screen, scan it with the Expo app
- The app will load and start on your phone

## Notes on the code

- Given it's a demo, the strings have not been stored in any localization file
- Despite the API returning static data, the pages were still written as if the data was susceptible to change. Meaning there is not a single preload at startup. The pages can still request data multiple time over the lifecycle of the application (although I added a cache to avoid pointless latency) 





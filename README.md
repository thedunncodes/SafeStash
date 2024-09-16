# SafeStash Finance
SafeStash Finance is a digital wallet that grants a user complete control over all their digital assests in one safe wallet. SafeStash grants you access to internetional market to exchange their currencies freely without an hiccup through the TbDEX network.
As a tbDEX network participant making cross-border payments might be easy, but receiving them might prove difficult, SafeStash provides its users access to create USD, GBP and EUR account with international ACH transfers. This helps Africans like content creators and freelancers to have access to their earned money without any restrictions.

## Technologies
* **Back-end:** JavaScript(ES6), TypeScript, Node.js, Express.js
* **Front-end:** React Native
* **Database:** PostgresSql, Redis 

## Setup and Installation

1. **Prerequisites:**
    - Node.js (version 20.x.x)
    - Postgresql
    - SendChamp API key
    - Ngrok
    - Expo go

2. **Clone the repository:**
    ```sh
    git clone https://github.com/thedunncodes/SafeStash.git
    cd SafeStash
    ```

3. **Install dependencies:**
    - There are two directories with different dependencies to be installed
        ```sh
        cd server
        npm install
        cd ..
        cd safestash
        npm install
        ```

4. **Environment Variables:**
    Create a `.env` file in the root directory and set the following variables:
    - `PORT`: Port for the server (default: 5000)  
    - `DB_HOST`: Postgresql host (default: localhost)
    - `DB_PORT`: Postgresql port (default: 5432)
    - `DB_USER`: Postgresql database user
    - `DB_NAME`: Database name
    - `DB_PASSWORD`: Postgresql database password
    - `JWT_SECRET_KEY`: Randomly generated key to be used for session security(you can use `UUID4` to generate a random key)
    - `OTP_API_KEY`: Send champ API key in form of `Bearer API_KEY_`
    - `NGROK_TUNNEL`: Set this whenever you are connected, if you also have a stable domain for ngrok its better, you won't be changing it everytime you are connected


5. **Running the application:**
    - Start the server:
        ```sh
        cd server
        npm run start-server
        ```
    - Start expo server for react native :
        ```sh
        cd server
        npm run start-server
        ```
    - To view the application on your mobile:
        Make sure you have downloaded expo go then after starting the expo server a qr code will be generated for you to scan and view the app
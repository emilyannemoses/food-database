let GoogleAuth;
const SCOPE = 'https://www.googleapis.com/auth/drive.metadata.readonly';
function handleClientLoad() {
    // Load the API's client and auth2 modules.
    // Call the initClient function after the modules load.
    gapi.load('client:auth2', initClient);
}

function initClient() {
    // Retrieve the discovery document for version 3 of Google Drive API.
    // In practice, your app can retrieve one or more discovery documents.
    const discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
    // Initialize the gapi.client object, which app uses to make API requests.
    // Get API key and client ID from API Console.
    // 'scope' field specifies space-delimited list of access scopes.
    gapi.client.init({
        'apiKey': API_KEY,
        'discoveryDocs': [discoveryUrl],
        'clientId': CLIENT_ID,
        'scope': SCOPE
    }).then(function () {
        GoogleAuth = gapi.auth2.getAuthInstance();
        // Listen for sign-in state changes.
        GoogleAuth.isSignedIn.listen(updateSigninStatus);
        // Handle initial sign-in state. (Determine if user is already signed in.)
        let user = GoogleAuth.currentUser.get();
        setSigninStatus();
        handleAuthClick();
        // Call handleAuthClick function when user clicks on
        //      "Sign In/Authorize" button.
        // if (GoogleAuth.isSignedIn.get()){
        //     document.getElementById('signOut').addEventListener('click', function() {
        //         // handleAuthClick();
        //         // User is authorized and has clicked 'Sign out' button.
        //         GoogleAuth.signOut();
        //     });
        // } else {
        //     document.getElementById('signIn').addEventListener('click', function() {
        //         // handleAuthClick();
        //         // User is not signed in. Start Google auth flow.
        //         GoogleAuth.signIn();
        //     });
        // }
    });
}

function handleAuthClick() {
    if (GoogleAuth.isSignedIn.get()){
        document.getElementById('signOut').addEventListener('click', function() {
            // handleAuthClick();
            // User is authorized and has clicked 'Sign out' button.
            GoogleAuth.signOut();
        });
    } else {
        document.getElementById('signIn').addEventListener('click', function() {
            // handleAuthClick();
            // User is not signed in. Start Google auth flow.
            GoogleAuth.signIn();
        });
    }
}

function revokeAccess() {
    GoogleAuth.disconnect();
}

function setSigninStatus(isSignedIn) {
    const user = GoogleAuth.currentUser.get();
    let isAuthorized = user.hasGrantedScopes(SCOPE);
    const signIn = document.getElementById('signIn');
    const signOut = document.getElementById('signOut');
    const authStatus = document.getElementById('authStatus');
    if (isAuthorized) {
        signOut.innerHTML = 'Sign out';
        signIn.style.display = 'none';
        authStatus.innerHTML = `${user.w3.ig} is currently signed in and has granted access to this app.`;
    } else {
        signIn.innerHTML = 'Sign in';
        signOut.style.display = 'none';
        authStatus.innerHTML = 'You have not authorized this app or you are signed out.';
    }
}

function updateSigninStatus(isSignedIn) {
    setSigninStatus();
}
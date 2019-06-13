var GoogleAuth;
var SCOPE = 'https://www.googleapis.com/auth/drive.metadata.readonly';
function handleClientLoad() {
    // Load the API's client and auth2 modules.
    // Call the initClient function after the modules load.
    gapi.load('client:auth2', initClient);
}

function initClient() {
    // Retrieve the discovery document for version 3 of Google Drive API.
    // In practice, your app can retrieve one or more discovery documents.
    var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

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
        var user = GoogleAuth.currentUser.get();
        setSigninStatus();

        // Call handleAuthClick function when user clicks on
        //      "Sign In/Authorize" button.
        $('#sign-in-or-out-button').click(function() {
            handleAuthClick();
        });
        $('#revoke-access-button').click(function() {
            revokeAccess();
        });
    });
}

function handleAuthClick() {
    if (GoogleAuth.isSignedIn.get()) {
        // User is authorized and has clicked 'Sign out' button.
        GoogleAuth.signOut();
    } else {
        // User is not signed in. Start Google auth flow.
        GoogleAuth.signIn();
    }
}

function revokeAccess() {
    GoogleAuth.disconnect();
}

function setSigninStatus(isSignedIn) {
    user = GoogleAuth.currentUser.get();
    // Is signed in true/false: GoogleAuth.isSignedIn.Ab;
    // First name: user.w3.ofa
    // Last name: user.w3.wea
    // Full name: user.w3.ig
    isAuthorized = user.hasGrantedScopes(SCOPE);
    console.log(isAuthorized)
    if (isAuthorized) {
        // window.location.hash = ""
        window.location.hash = "#U"
        update()
        // document.getElementById('sign-in-or-out-button').innerHTML = 'Sign out';
        // document.getElementById('revoke-access-button').innerHTML = 'Revoke access';
        // document.getElementById('revoke-access-button').style.display = 'inline-block';
        // document.getElementById('auth-status').innerHTML = `${user.w3.ofa}, you are currently signed in and have granted access to this app.`;
    } else {
        window.location.hash = "#SignIn"
        // document.getElementById('sign-in-or-out-button').innerHTML = 'Sign in';
        // document.getElementById('revoke-access-button').style.display = 'none';
        // document.getElementById('auth-status').innerHTML = 'You have not authorized this app or you are signed out.'
    }
}

function updateSigninStatus(isSignedIn) {
    setSigninStatus();
}















































































































API_KEY = 'AIzaSyD8bnI_HZqGLiuUuxvpQPgo4b2a4-J3JPM';
CLIENT_ID = '575322948483-4jbs6767t559anqfgi2and82rctt0g1s.apps.googleusercontent.com';
# ThingsSDK Flasher Client
React App for connecting to the [ThingsSDK Flasher API, version 2](https://github.com/joelkraft/flasher.thingssdk.com/tree/dev).

## Done
* Login/logout
* User profile page
* User profile editable
* Flash message component
* Manifest page
* Manifest page shows user-authored manifests
* Side bar controls manifest list filter
* Implement React Router 4
* Implement Redux
* Show manifest details in a modal

## To-do
### Login:
* Show spinner during login request phase
* Enable login with github
### Profile Page:
* Disable form during submission
* Enable user to change password
* Send email notice about password changes
* Diff app state against local state before submitting edits, or cancelling to save api call/ui update
### Manifest Page:
* If user authored, make editable
* If admin, make editable
* New manifest form
* Email notification to admins on new manifest submission
### Admin interface
* View and edit usership
* View / approve / edit / delete manifests
### Signup page:
* Create
* Only enable verified accounts, show notice
### Tests


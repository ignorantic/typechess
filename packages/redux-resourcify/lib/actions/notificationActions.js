"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SHOW_NOTIFICATION = 'RA/SHOW_NOTIFICATION';
/**
 * Shows a snackbar/toast notification on the screen
 *
 * @see {@link https://material-ui.com/api/snackbar/|Material ui snackbar component}
 * @see {@link https://material.io/guidelines/components/snackbars-toasts.html|Material ui reference document on snackbar}
 */
exports.showNotification = (
// A translatable label or text to display on notification
message, 
// The type of the notification
type = 'info', 
// Specify additional parameters of notification
notificationOptions) => ({
    type: exports.SHOW_NOTIFICATION,
    payload: {
        ...notificationOptions,
        type,
        message,
    },
});
exports.HIDE_NOTIFICATION = 'RA/HIDE_NOTIFICATION';
exports.hideNotification = () => ({
    type: exports.HIDE_NOTIFICATION,
});

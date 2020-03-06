"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOGGLE_SIDEBAR = 'RA/TOGGLE_SIDEBAR';
exports.toggleSidebar = () => ({
    type: exports.TOGGLE_SIDEBAR,
});
exports.SET_SIDEBAR_VISIBILITY = 'RA/SET_SIDEBAR_VISIBILITY';
exports.setSidebarVisibility = (isOpen) => ({
    type: exports.SET_SIDEBAR_VISIBILITY,
    payload: isOpen,
});
exports.REFRESH_VIEW = 'RA/REFRESH_VIEW';
exports.refreshView = () => ({
    type: exports.REFRESH_VIEW,
});

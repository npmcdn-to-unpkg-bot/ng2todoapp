System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var listType, listMode, modalOptions, modalType, modalPromptType;
    return {
        setters:[],
        execute: function() {
            (function (listType) {
                listType[listType["public"] = 0] = "public";
                listType[listType["private"] = 1] = "private";
            })(listType || (listType = {}));
            exports_1("listType", listType);
            ; //public is 0 and private is 1
            (function (listMode) {
                listMode[listMode["none"] = 0] = "none";
                listMode[listMode["add"] = 1] = "add";
                listMode[listMode["edit"] = 2] = "edit";
            })(listMode || (listMode = {}));
            exports_1("listMode", listMode);
            ;
            modalOptions = (function () {
                function modalOptions() {
                }
                return modalOptions;
            }());
            exports_1("modalOptions", modalOptions);
            (function (modalType) {
                modalType[modalType["success"] = 0] = "success";
                modalType[modalType["info"] = 1] = "info";
                modalType[modalType["danger"] = 2] = "danger";
                modalType[modalType["warning"] = 3] = "warning";
            })(modalType || (modalType = {}));
            exports_1("modalType", modalType);
            (function (modalPromptType) {
                modalPromptType[modalPromptType["alert"] = 0] = "alert";
                modalPromptType[modalPromptType["confirm"] = 1] = "confirm";
            })(modalPromptType || (modalPromptType = {}));
            exports_1("modalPromptType", modalPromptType);
        }
    }
});
//# sourceMappingURL=app_interfaces.js.map
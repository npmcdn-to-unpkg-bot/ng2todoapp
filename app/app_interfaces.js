System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var listMeta, listType;
    return {
        setters:[],
        execute: function() {
            listMeta = (function () {
                function listMeta() {
                }
                return listMeta;
            }());
            exports_1("listMeta", listMeta);
            (function (listType) {
                listType[listType["public"] = 0] = "public";
                listType[listType["private"] = 1] = "private";
            })(listType || (listType = {}));
            exports_1("listType", listType);
            ; //public is 0 and private is 1
        }
    }
});
//# sourceMappingURL=app_interfaces.js.map